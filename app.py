import os
import random
import sqlite3
from datetime import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf


DB_PATH = "trades.db"
STARTING_BALANCE = 5_000.00


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize SQLite database with trades and user_balance tables."""
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS trades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL,
            ticker TEXT NOT NULL,
            action TEXT NOT NULL,
            price REAL NOT NULL,
            quantity REAL NOT NULL,
            amount REAL NOT NULL
        );
        """
    )

    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS user_balance (
            id INTEGER PRIMARY KEY CHECK (id = 1),
            balance REAL NOT NULL,
            status TEXT NOT NULL DEFAULT 'RUNNING'
        );
        """
    )

    # In case the DB already exists without the status column, add it safely.
    cur.execute("PRAGMA table_info(user_balance);")
    columns = [row[1] for row in cur.fetchall()]
    if "status" not in columns:
        cur.execute(
            "ALTER TABLE user_balance ADD COLUMN status TEXT NOT NULL DEFAULT 'RUNNING';"
        )

    # Ensure we have a single user row with starting balance
    cur.execute("SELECT balance, status FROM user_balance WHERE id = 1;")
    row = cur.fetchone()
    if row is None:
        cur.execute(
            "INSERT INTO user_balance (id, balance, status) VALUES (1, ?, 'RUNNING');",
            (STARTING_BALANCE,),
        )

    conn.commit()
    conn.close()


def get_btc_usd_price():
    """
    Get real-time-ish BTC-USD price using yfinance.
    Uses recent 1-minute interval data for robustness.
    """
    ticker = yf.Ticker("BTC-USD")
    hist = ticker.history(period="1d", interval="1m")
    if hist.empty:
        raise RuntimeError("Could not fetch BTC-USD data from yfinance")
    price = float(hist["Close"].iloc[-1])
    return round(price, 2)


def get_mock_iam_price():
    """
    MOCK price generator for Morocco Telecom (IAM).
    Base price: 100.00 MAD
    Random fluctuation between -0.5 and +0.5 on EACH API call.
    No scraping or external data sources.
    """
    base_price = 100.00
    fluctuation = random.uniform(-0.5, 0.5)
    price = base_price + fluctuation
    return round(price, 4)


@app.route("/api/market-data", methods=["GET"])
def market_data():
    """
    Return market data for BTC-USD (real via yfinance)
    and Morocco Telecom (IAM) (mocked).
    """
    try:
        btc_price = get_btc_usd_price()
    except Exception as e:
        # In case yfinance fails, return an error message for BTC price
        return (
            jsonify(
                {
                    "success": False,
                    "error": f"Failed to fetch BTC-USD price: {e}",
                }
            ),
            500,
        )

    iam_price = get_mock_iam_price()

    return jsonify(
        {
            "success": True,
            "data": {
                "btc_usd": {
                    "ticker": "BTC-USD",
                    "name": "Bitcoin / US Dollar",
                    "price": btc_price,
                    "currency": "USD",
                },
                "iam_mad": {
                    "ticker": "IAM",
                    "name": "Morocco Telecom (IAM)",
                    "price": iam_price,
                    "currency": "MAD",
                    "note": "MOCK price: base 100.00 MAD +/- 0.5 per call",
                },
            },
        }
    )


def get_current_balance(conn: sqlite3.Connection) -> float:
    cur = conn.cursor()
    cur.execute("SELECT balance FROM user_balance WHERE id = 1;")
    row = cur.fetchone()
    if row is None:
        raise RuntimeError("User balance not initialized")
    return float(row["balance"])


def get_current_status(conn: sqlite3.Connection) -> str:
    cur = conn.cursor()
    cur.execute("SELECT status FROM user_balance WHERE id = 1;")
    row = cur.fetchone()
    if row is None:
        raise RuntimeError("User balance not initialized")
    return str(row["status"])


@app.route("/api/submit-trade", methods=["POST"])
def submit_trade():
    """
    Simulate a trade.
    Expects JSON: { "ticker": str, "action": "buy" | "sell", "price": number, "quantity": number (optional, default 1) }
    Saves the trade and updates the user's balance in SQLite.
    """
    payload = request.get_json(silent=True) or {}

    ticker = str(payload.get("ticker", "")).strip().upper()
    action = str(payload.get("action", "")).strip().lower()
    price = payload.get("price")
    quantity = payload.get("quantity", 1)

    if not ticker:
        return jsonify({"success": False, "error": "ticker is required"}), 400
    if action not in {"buy", "sell"}:
        return (
            jsonify(
                {
                    "success": False,
                    "error": "action must be 'buy' or 'sell'",
                }
            ),
            400,
        )

    try:
        price = float(price)
    except (TypeError, ValueError):
        return jsonify({"success": False, "error": "price must be a number"}), 400

    try:
        quantity = float(quantity)
    except (TypeError, ValueError):
        return jsonify({"success": False, "error": "quantity must be a number"}), 400

    if price <= 0:
        return jsonify({"success": False, "error": "price must be positive"}), 400
    if quantity <= 0:
        return jsonify({"success": False, "error": "quantity must be positive"}), 400

    amount = price * quantity
    if action == "buy":
        balance_delta = -amount
    else:  # sell
        balance_delta = amount

    conn = get_db_connection()
    try:
        cur = conn.cursor()

        current_balance = get_current_balance(conn)
        new_balance = current_balance + balance_delta

        # Optional: enforce no negative balance
        if new_balance < 0:
            return (
                jsonify(
                    {
                        "success": False,
                        "error": "Insufficient balance for this trade",
                        "balance": current_balance,
                        "status": get_current_status(conn),
                    }
                ),
                400,
            )

        now_str = datetime.utcnow().isoformat() + "Z"

        cur.execute(
            """
            INSERT INTO trades (created_at, ticker, action, price, quantity, amount)
            VALUES (?, ?, ?, ?, ?, ?);
            """,
            (now_str, ticker, action, price, quantity, amount),
        )

        cur.execute(
            "UPDATE user_balance SET balance = ? WHERE id = 1;",
            (new_balance,),
        )

        # Risk / evaluation logic based on current equity (here: balance)
        # Rules:
        # - Starting balance: 5000
        # - If equity < 4750 (5% daily loss): FAILED
        # - If equity < 4500 (10% max loss): FAILED
        # - If equity > 5500 (10% profit): PASSED
        status = "RUNNING"
        if new_balance < 4500:
            status = "FAILED"
        elif new_balance < 4750:
            status = "FAILED"
        elif new_balance > 5500:
            status = "PASSED"

        if status != "RUNNING":
            cur.execute(
                "UPDATE user_balance SET status = ? WHERE id = 1;",
                (status,),
            )

        conn.commit()

        return jsonify(
            {
                "success": True,
                "trade": {
                    "ticker": ticker,
                    "action": action,
                    "price": price,
                    "quantity": quantity,
                    "amount": amount,
                    "created_at": now_str,
                },
                "balance": new_balance,
                "status": status,
            }
        )
    except Exception as e:
        conn.rollback()
        return (
            jsonify(
                {
                    "success": False,
                    "error": f"Failed to submit trade: {e}",
                }
            ),
            500,
        )
    finally:
        conn.close()


@app.route("/api/balance", methods=["GET"])
def get_balance():
    """Simple helper route to check the current simulated user balance and status."""
    conn = get_db_connection()
    try:
        balance = get_current_balance(conn)
        status = get_current_status(conn)
        return jsonify({"success": True, "balance": balance, "status": status})
    except Exception as e:
        return (
            jsonify(
                {
                    "success": False,
                    "error": f"Failed to fetch balance: {e}",
                }
            ),
            500,
        )
    finally:
        conn.close()


if __name__ == "__main__":
    # Make sure DB exists and is initialized before the server starts
    init_db()

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)


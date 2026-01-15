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
CORS(app)  # Allow all origins; can be restricted to your React origin if needed.


def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Initialize SQLite database for TradeSense."""
    conn = get_db_connection()
    cur = conn.cursor()

    # Users table: a single demo user with balance, equity, and status.
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            balance REAL NOT NULL,
            equity REAL NOT NULL,
            status TEXT NOT NULL
        );
        """
    )

    # Trades table: record each simulated trade.
    cur.execute(
        """
        CREATE TABLE IF NOT EXISTS trades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            symbol TEXT NOT NULL,
            type TEXT NOT NULL,
            price REAL NOT NULL,
            timestamp TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        );
        """
    )

    # Ensure default user exists (id=1)
    cur.execute("SELECT id FROM users WHERE id = 1;")
    row = cur.fetchone()
    if row is None:
        cur.execute(
            "INSERT INTO users (id, balance, equity, status) VALUES (?, ?, ?, ?);",
            (1, STARTING_BALANCE, STARTING_BALANCE, "RUNNING"),
        )

    conn.commit()
    conn.close()


def get_default_user(conn: sqlite3.Connection) -> sqlite3.Row:
    cur = conn.cursor()
    cur.execute("SELECT id, balance, equity, status FROM users WHERE id = 1;")
    row = cur.fetchone()
    if row is None:
        raise RuntimeError("Default user not initialized")
    return row


def update_user_state(
    conn: sqlite3.Connection, balance: float, equity: float, status: str
) -> None:
    cur = conn.cursor()
    cur.execute(
        "UPDATE users SET balance = ?, equity = ?, status = ? WHERE id = 1;",
        (balance, equity, status),
    )


def compute_status_from_equity(equity: float) -> str:
    """
    Compute prop-firm style status from equity.

    Rules (starting at 5000):
      - equity < 4750 -> FAILED (5% loss)
      - equity > 5500 -> PASSED (10% profit)
      - otherwise     -> RUNNING
    """
    if equity < 4750:
        return "FAILED"
    if equity > 5500:
        return "PASSED"
    return "RUNNING"


def get_btc_usd_price() -> float:
    """Get real BTC-USD price via yfinance."""
    ticker = yf.Ticker("BTC-USD")
    hist = ticker.history(period="1d", interval="1m")
    if hist.empty:
        raise RuntimeError("Could not fetch BTC-USD data from yfinance")
    price = float(hist["Close"].iloc[-1])
    return round(price, 2)


def get_iam_ma_price() -> float:
    """
    Generate a realistic mock price for IAM.MA (Maroc Telecom).
    Around 100.00 MAD, between 99.50 and 100.50 per call.
    No scraping, just randomness.
    """
    return round(random.uniform(99.50, 100.50), 4)


@app.route("/api/data", methods=["GET"])
def market_data():
    """
    Return market data for BTC-USD (real via yfinance)
    and IAM.MA (mocked), plus current user state.
    """
    conn = get_db_connection()
    try:
        user = get_default_user(conn)

        try:
            btc_price = get_btc_usd_price()
        except Exception as e:
            # If yfinance fails, still return IAM.MA and user data.
            return (
                jsonify(
                    {
                        "success": False,
                        "error": f"Failed to fetch BTC-USD price: {e}",
                    }
                ),
                500,
            )

        iam_price = get_iam_ma_price()

        return jsonify(
            {
                "success": True,
                "data": {
                    "btc_usd": {
                        "symbol": "BTC-USD",
                        "name": "Bitcoin / US Dollar",
                        "price": btc_price,
                        "currency": "USD",
                    },
                    "iam_ma": {
                        "symbol": "IAM.MA",
                        "name": "Maroc Telecom (IAM)",
                        "price": iam_price,
                        "currency": "MAD",
                        "note": "MOCK price between 99.50 and 100.50 MAD per call",
                    },
                },
                "user": {
                    "balance": float(user["balance"]),
                    "equity": float(user["equity"]),
                    "status": user["status"],
                },
            }
        )
    finally:
        conn.close()


@app.route("/api/trade", methods=["POST"])
def submit_trade():
    """
    Simulate a trade.

    Expects JSON: { "action": "BUY" | "SELL", "symbol": str }
    - BUY  -> +150$ on balance
    - SELL -> -200$ on balance (simulated loss)

    Applies prop-firm rules on equity:
      - equity < 4750 -> FAILED
      - equity > 5500 -> PASSED
    """
    payload = request.get_json(silent=True) or {}

    action = str(payload.get("action", "")).strip().upper()
    symbol = str(payload.get("symbol", "")).strip().upper()

    if action not in {"BUY", "SELL"}:
        return (
            jsonify(
                {
                    "success": False,
                    "error": "action must be 'BUY' or 'SELL'",
                }
            ),
            400,
        )
    if not symbol:
        return jsonify({"success": False, "error": "symbol is required"}), 400

    conn = get_db_connection()
    try:
        user = get_default_user(conn)

        # If user already FAILED or PASSED, you can choose to block further trades.
        if user["status"] in {"FAILED", "PASSED"}:
            return jsonify(
                {
                    "success": False,
                    "error": "Account is no longer active",
                    "balance": float(user["balance"]),
                    "equity": float(user["equity"]),
                    "status": user["status"],
                }
            )

        # Apply simple PnL simulation.
        if action == "BUY":
            delta = 150.0
        else:  # SELL
            delta = -200.0

        new_balance = float(user["balance"]) + delta
        # In this simple model, equity == balance (no open positions).
        new_equity = new_balance
        new_status = compute_status_from_equity(new_equity)

        # Determine a reference price to store with the trade.
        price = 0.0
        if symbol == "BTC-USD":
            try:
                price = get_btc_usd_price()
            except Exception:
                price = 0.0
        elif symbol == "IAM.MA":
            price = get_iam_ma_price()

        now_str = datetime.utcnow().isoformat() + "Z"

        cur = conn.cursor()

        # Insert trade record
        cur.execute(
            """
            INSERT INTO trades (user_id, symbol, type, price, timestamp)
            VALUES (?, ?, ?, ?, ?);
            """,
            (1, symbol, action, price, now_str),
        )

        # Update user state
        update_user_state(conn, new_balance, new_equity, new_status)

        conn.commit()

        return jsonify(
            {
                "success": True,
                "balance": new_balance,
                "equity": new_equity,
                "status": new_status,
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


@app.route("/api/reset", methods=["POST"])
def reset_account():
    """
    Reset the demo account to the initial state.
    - balance = 5000
    - equity  = 5000
    - status  = RUNNING
    - clears all trades
    """
    conn = get_db_connection()
    try:
        cur = conn.cursor()

        # Reset user state
        update_user_state(conn, STARTING_BALANCE, STARTING_BALANCE, "RUNNING")

        # Clear trades for this demo user
        cur.execute("DELETE FROM trades WHERE user_id = 1;")

        conn.commit()

        return jsonify(
            {
                "success": True,
                "balance": STARTING_BALANCE,
                "equity": STARTING_BALANCE,
                "status": "RUNNING",
            }
        )
    except Exception as e:
        conn.rollback()
        return (
            jsonify(
                {
                    "success": False,
                    "error": f"Failed to reset account: {e}",
                }
            ),
            500,
        )
    finally:
        conn.close()


if __name__ == "__main__":
    # Ensure database is ready before starting the server.
    init_db()

    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)


"use client"

import { useState } from "react"
import { Bot, ChevronLeft, ChevronRight, TrendingDown, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

const signals = [
  {
    id: 1,
    symbol: "BTC/USD",
    type: "buy",
    confidence: 92,
    entry: "97,500",
    target: "102,000",
    stop: "95,000",
    time: "2 min ago",
  },
  {
    id: 2,
    symbol: "ETH/USD",
    type: "buy",
    confidence: 87,
    entry: "3,450",
    target: "3,800",
    stop: "3,200",
    time: "15 min ago",
  },
  {
    id: 3,
    symbol: "EUR/USD",
    type: "sell",
    confidence: 78,
    entry: "1.0850",
    target: "1.0720",
    stop: "1.0920",
    time: "32 min ago",
  },
  {
    id: 4,
    symbol: "NVDA",
    type: "buy",
    confidence: 95,
    entry: "890.00",
    target: "950.00",
    stop: "850.00",
    time: "1 hour ago",
  },
  {
    id: 5,
    symbol: "GBP/USD",
    type: "sell",
    confidence: 72,
    entry: "1.2680",
    target: "1.2550",
    stop: "1.2750",
    time: "2 hours ago",
  },
]

export function AiSignalsSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  if (collapsed) {
    return (
      <div className="flex w-12 flex-col items-center border-r border-border/50 bg-sidebar py-4">
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCollapsed(false)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <div className="mt-4 flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
          <Bot className="h-4 w-4 text-accent" />
        </div>
        <div className="mt-4 flex flex-col gap-2">
          {signals.slice(0, 4).map((signal) => (
            <div
              key={signal.id}
              className={`h-2 w-2 rounded-full ${signal.type === "buy" ? "bg-primary" : "bg-destructive"}`}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <aside className="flex w-72 flex-col border-r border-border/50 bg-sidebar">
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Bot className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h2 className="font-semibold">AI Signals</h2>
            <p className="text-xs text-muted-foreground">Real-time analysis</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setCollapsed(true)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2 p-3">
          {signals.map((signal) => (
            <div
              key={signal.id}
              className="rounded-lg border border-border/50 bg-card/30 p-3 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-semibold">{signal.symbol}</span>
                  <Badge
                    variant={signal.type === "buy" ? "default" : "destructive"}
                    className={`text-xs ${
                      signal.type === "buy" ? "bg-primary/20 text-primary" : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {signal.type === "buy" ? (
                      <TrendingUp className="mr-1 h-3 w-3" />
                    ) : (
                      <TrendingDown className="mr-1 h-3 w-3" />
                    )}
                    {signal.type.toUpperCase()}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground">{signal.time}</span>
              </div>

              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-muted-foreground">Entry</p>
                  <p className="font-mono font-medium">{signal.entry}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Target</p>
                  <p className="font-mono font-medium text-primary">{signal.target}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Stop</p>
                  <p className="font-mono font-medium text-destructive">{signal.stop}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${signal.confidence}%` }} />
                  </div>
                  <span className="text-xs text-accent">{signal.confidence}%</span>
                </div>
                <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                  Trade
                </Button>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t border-border/50 p-3">
        <div className="rounded-lg bg-accent/5 p-3 text-center">
          <p className="text-xs text-muted-foreground">AI Model Accuracy</p>
          <p className="text-2xl font-bold text-accent">94.7%</p>
          <p className="text-xs text-muted-foreground">Based on last 30 days</p>
        </div>
      </div>
    </aside>
  )
}

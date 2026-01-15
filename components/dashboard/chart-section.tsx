"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { BarChart3, CandlestickChart, LineChart, Maximize2, Minus, Plus, Settings } from "lucide-react"

const timeframes = ["1m", "5m", "15m", "1H", "4H", "1D", "1W"]

export function ChartSection() {
  const [activeTimeframe, setActiveTimeframe] = useState("1H")
  const [chartType, setChartType] = useState<"candle" | "line" | "bar">("candle")

  return (
    <Card className="flex h-full flex-col border-border/50 bg-card/30">
      <CardHeader className="flex-row items-center justify-between space-y-0 border-b border-border/50 p-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Button
              variant={chartType === "candle" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setChartType("candle")}
            >
              <CandlestickChart className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "line" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setChartType("line")}
            >
              <LineChart className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "bar" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setChartType("bar")}
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={activeTimeframe === tf ? "secondary" : "ghost"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setActiveTimeframe(tf)}
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Minus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="relative flex-1 p-0">
        {/* Candlestick Chart Placeholder */}
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/professional-candlestick-trading-chart-dark-theme-.jpg"
            alt="BTC/USD Candlestick Chart"
            className="h-full w-full object-cover opacity-90"
          />

          {/* Chart Overlay Data */}
          <div className="absolute left-4 top-4 rounded-lg bg-background/80 p-3 backdrop-blur-sm">
            <div className="text-xs text-muted-foreground">BTC/USD • {activeTimeframe}</div>
            <div className="mt-1 flex items-center gap-4 font-mono text-sm">
              <span>
                O <span className="text-foreground">97,750.00</span>
              </span>
              <span>
                H <span className="text-primary">98,120.00</span>
              </span>
              <span>
                L <span className="text-destructive">97,200.00</span>
              </span>
              <span>
                C <span className="text-foreground">97,842.50</span>
              </span>
            </div>
          </div>

          {/* Volume indicator */}
          <div className="absolute bottom-4 left-4 rounded-lg bg-background/80 px-3 py-2 backdrop-blur-sm">
            <span className="text-xs text-muted-foreground">Vol: </span>
            <span className="font-mono text-xs text-foreground">24,582 BTC</span>
          </div>

          {/* Price levels */}
          <div className="absolute right-4 top-4 flex flex-col gap-1 rounded-lg bg-background/80 p-3 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground">Resistance</span>
              <span className="font-mono text-destructive">99,500</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-muted-foreground">Support</span>
              <span className="font-mono text-primary">96,200</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

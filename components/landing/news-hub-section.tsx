import { Clock, ExternalLink, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const newsItems = [
  {
    category: "Market Analysis",
    title: "Fed signals potential rate cuts in Q2 2026",
    time: "2 min ago",
    impact: "high",
    trend: "bullish",
  },
  {
    category: "Crypto",
    title: "Bitcoin breaks $150K resistance level",
    time: "15 min ago",
    impact: "high",
    trend: "bullish",
  },
  {
    category: "Forex",
    title: "EUR/USD volatility expected ahead of ECB meeting",
    time: "32 min ago",
    impact: "medium",
    trend: "neutral",
  },
  {
    category: "Commodities",
    title: "Gold reaches all-time high amid geopolitical tensions",
    time: "1 hour ago",
    impact: "high",
    trend: "bullish",
  },
  {
    category: "Tech Stocks",
    title: "NVIDIA announces next-gen AI chips, stock surges",
    time: "2 hours ago",
    impact: "high",
    trend: "bullish",
  },
]

export function NewsHubSection() {
  return (
    <section id="news" className="border-t border-border/50 bg-secondary/20 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Live <span className="text-accent">News Hub</span>
            </h2>
            <p className="mt-2 text-muted-foreground">Real-time market news and AI-powered sentiment analysis</p>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
            <span className="text-sm text-primary">Live</span>
          </div>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {/* Featured News */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <Badge variant="outline" className="border-accent/50 text-accent">
              Breaking
            </Badge>
            <h3 className="mt-4 text-xl font-semibold">
              Major market shift expected as global central banks coordinate policy
            </h3>
            <p className="mt-3 text-muted-foreground">
              Multiple central banks are signaling coordinated policy moves that could significantly impact forex and
              equity markets. Our AI predicts increased volatility...
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Just now
              </span>
              <span className="flex items-center gap-1 text-primary">
                <TrendingUp className="h-4 w-4" />
                High Impact
              </span>
            </div>
          </div>

          {/* News List */}
          <div className="space-y-3">
            {newsItems.map((item, index) => (
              <div
                key={index}
                className="group flex items-start justify-between rounded-lg border border-border/50 bg-card/30 p-4 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card/50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.category}
                    </Badge>
                    {item.trend === "bullish" && <TrendingUp className="h-3 w-3 text-primary" />}
                  </div>
                  <h4 className="mt-2 font-medium leading-snug">{item.title}</h4>
                  <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </span>
                </div>
                <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

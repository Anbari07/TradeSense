import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, AlertTriangle, Target, Wallet } from "lucide-react"

export function UserStatsCard() {
  return (
    <Card className="border-border/50 bg-card/30">
      <CardHeader className="border-b border-border/50 p-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Wallet className="h-4 w-4 text-accent" />
          Account Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-3">
        {/* Equity */}
        <div className="rounded-lg bg-secondary/30 p-3">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3" />
              Equity
            </span>
            <span className="text-xs text-primary">+$245.00 today</span>
          </div>
          <p className="mt-1 text-2xl font-bold">$5,000.00</p>
        </div>

        {/* Daily Loss */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-muted-foreground">
              <AlertTriangle className="h-3 w-3" />
              Daily Loss Limit
            </span>
            <span className="font-mono text-primary">0%</span>
          </div>
          <Progress value={0} className="h-2 bg-secondary" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$0 / $250</span>
            <span>5% max</span>
          </div>
        </div>

        {/* Profit Target */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Target className="h-3 w-3" />
              Profit Target
            </span>
            <span className="font-mono text-accent">10%</span>
          </div>
          <Progress value={49} className="h-2 bg-secondary [&>div]:bg-accent" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>$245 / $500</span>
            <span>49% complete</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <div className="rounded-lg bg-secondary/30 p-2 text-center">
            <p className="text-xs text-muted-foreground">Win Rate</p>
            <p className="text-lg font-bold text-primary">68%</p>
          </div>
          <div className="rounded-lg bg-secondary/30 p-2 text-center">
            <p className="text-xs text-muted-foreground">Trades</p>
            <p className="text-lg font-bold">24</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Bot, TrendingUp, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-neon-green/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-4 py-1.5 text-sm text-primary">
            <Zap className="h-4 w-4" />
            AI-Powered Trading Platform
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Trade Smarter with{" "}
            <span className="bg-gradient-to-r from-neon-green to-neon-purple bg-clip-text text-transparent">
              AI Intelligence
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Get real-time AI signals, market analysis, and automated trading insights. Join thousands of traders
            leveraging cutting-edge technology to maximize profits.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/dashboard">
              <Button size="lg" className="group bg-primary text-primary-foreground hover:bg-primary/90">
                Start Trading Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border hover:bg-secondary bg-transparent">
              View Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 border-t border-border/50 pt-8">
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="mt-1 text-sm text-muted-foreground">Signal Accuracy</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-foreground">10K+</div>
              <div className="mt-1 text-sm text-muted-foreground">Active Traders</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">$50M+</div>
              <div className="mt-1 text-sm text-muted-foreground">Trading Volume</div>
            </div>
          </div>
        </div>

        {/* Feature cards preview */}
        <div className="mt-20 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
            <Bot className="h-10 w-10 text-primary" />
            <h3 className="mt-4 font-semibold">AI Assistant</h3>
            <p className="mt-2 text-sm text-muted-foreground">24/7 intelligent trading companion</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-accent/30">
            <TrendingUp className="h-10 w-10 text-accent" />
            <h3 className="mt-4 font-semibold">Real-time Signals</h3>
            <p className="mt-2 text-sm text-muted-foreground">Instant buy/sell recommendations</p>
          </div>
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-colors hover:border-primary/30">
            <Zap className="h-10 w-10 text-primary" />
            <h3 className="mt-4 font-semibold">Fast Execution</h3>
            <p className="mt-2 text-sm text-muted-foreground">Sub-millisecond order processing</p>
          </div>
        </div>
      </div>
    </section>
  )
}

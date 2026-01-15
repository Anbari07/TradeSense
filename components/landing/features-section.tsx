import { Bot, Brain, LineChart, Shield, Target, Zap } from "lucide-react"

const features = [
  {
    icon: Bot,
    title: "AI Trading Assistant",
    description:
      "Our advanced AI analyzes market patterns, sentiment, and technical indicators to provide personalized trading recommendations.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Brain,
    title: "Smart Analysis",
    description:
      "Machine learning models trained on millions of data points to predict market movements with high accuracy.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: LineChart,
    title: "Advanced Charts",
    description: "Professional-grade charting tools with multiple timeframes, indicators, and drawing tools.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Target,
    title: "Precision Signals",
    description: "Get precise entry and exit points with clear risk/reward ratios for every trade signal.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Built-in risk controls including daily loss limits, position sizing, and automated stop-losses.",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Zap,
    title: "Real-time Execution",
    description: "Lightning-fast order execution with direct market access and smart order routing.",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="border-t border-border/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            AI Trading <span className="text-primary">Assistant</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to give you an edge in the markets
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-border/50 bg-card/30 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card/50"
            >
              <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${feature.bgColor}`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

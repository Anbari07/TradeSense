import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "200",
    currency: "DH",
    period: "/month",
    description: "Perfect for beginners exploring AI-powered trading",
    features: [
      "5 AI signals per day",
      "Basic charting tools",
      "News feed access",
      "Email support",
      "1 trading account",
    ],
    cta: "Get Started",
    popular: false,
    color: "border-border/50 hover:border-primary/30",
  },
  {
    name: "Pro",
    price: "500",
    currency: "DH",
    period: "/month",
    description: "For serious traders who want an edge",
    features: [
      "Unlimited AI signals",
      "Advanced charting suite",
      "Real-time news & alerts",
      "Priority support",
      "5 trading accounts",
      "Risk management tools",
      "API access",
    ],
    cta: "Start Pro Trial",
    popular: true,
    color: "border-primary/50 hover:border-primary",
  },
  {
    name: "Elite",
    price: "1000",
    currency: "DH",
    period: "/month",
    description: "Maximum power for professional traders",
    features: [
      "Everything in Pro",
      "Custom AI models",
      "Dedicated account manager",
      "VIP Slack community",
      "Unlimited accounts",
      "White-glove onboarding",
      "Custom integrations",
      "Performance analytics",
    ],
    cta: "Contact Sales",
    popular: false,
    color: "border-accent/30 hover:border-accent/50",
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-border/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent <span className="text-primary">Pricing</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Choose the plan that fits your trading style</p>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-card/30 p-8 backdrop-blur-sm transition-all ${plan.color}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-primary px-4 py-1 text-xs font-medium text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mt-6 flex items-baseline">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="ml-1 text-lg text-muted-foreground">{plan.currency}</span>
                <span className="ml-1 text-muted-foreground">{plan.period}</span>
              </div>

              <ul className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link href="/dashboard">
                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : plan.name === "Elite"
                          ? "bg-accent text-accent-foreground hover:bg-accent/90"
                          : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

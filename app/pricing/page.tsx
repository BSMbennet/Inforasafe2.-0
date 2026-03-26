import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out our CV builder",
    features: [
      "AI-generated CV content",
      "1 CV preview",
      "Watermarked preview",
      "Basic templates",
    ],
    cta: "Get Started",
    href: "/builder",
    popular: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "one-time",
    description: "Everything you need to land your dream job",
    features: [
      "AI-generated CV content",
      "Unlimited CV downloads",
      "PDF export (no watermark)",
      "AI cover letter generation",
      "All professional templates",
      "Priority formatting",
    ],
    cta: "Upgrade to Pro",
    href: "/builder",
    popular: true,
  },
  {
    name: "Pro Plus",
    price: "$19",
    period: "one-time",
    description: "For serious job seekers who want the best",
    features: [
      "Everything in Pro",
      "Unlimited regenerations",
      "Multiple CV versions",
      "Cover letter customization",
      "Premium template designs",
      "Priority support",
    ],
    cta: "Get Pro Plus",
    href: "/builder",
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-background to-secondary/30 py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight md:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="text-pretty text-lg text-muted-foreground">
                Choose the plan that works best for you. No hidden fees, no
                subscriptions.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {plans.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative flex flex-col ${
                    plan.popular
                      ? "border-primary shadow-lg"
                      : "border-border"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-muted-foreground">
                          {" "}
                          / {plan.period}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-3">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      <Link href={plan.href}>{plan.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="mx-auto mt-16 max-w-2xl text-center">
              <p className="text-sm text-muted-foreground">
                All plans include a 30-day money-back guarantee. No questions
                asked.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

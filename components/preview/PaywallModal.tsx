"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Crown, Sparkles } from "lucide-react"

interface PaywallModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const plans = [
  {
    id: "pro",
    name: "Pro",
    price: "$9",
    description: "One-time payment",
    features: [
      "PDF download (no watermark)",
      "AI cover letter generation",
      "All professional templates",
    ],
    popular: true,
  },
  {
    id: "pro-plus",
    name: "Pro Plus",
    price: "$19",
    description: "One-time payment",
    features: [
      "Everything in Pro",
      "Unlimited regenerations",
      "Multiple CV versions",
      "Priority support",
    ],
    popular: false,
  },
]

export function PaywallModal({ open, onOpenChange }: PaywallModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("pro")
  const [isProcessing, setIsProcessing] = useState(false)

  const handlePurchase = async () => {
    setIsProcessing(true)
    
    // Simulate payment processing - in production, this would integrate with Stripe
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // For now, just show an alert that payment integration is coming soon
    alert(
      "Payment integration coming soon! In the meantime, enjoy your CV preview."
    )
    
    setIsProcessing(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Crown className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-2xl">
            Unlock Your Professional CV
          </DialogTitle>
          <DialogDescription>
            Remove the watermark and download your CV as a polished PDF ready
            for applications.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <button
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative flex flex-col rounded-lg border-2 p-4 text-left transition-all ${
                selectedPlan === plan.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-2.5 right-3 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
                  Popular
                </span>
              )}
              <div className="mb-2 flex items-baseline gap-1">
                <span className="text-2xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">
                  {plan.description}
                </span>
              </div>
              <p className="mb-3 font-medium">{plan.name}</p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <Button
            onClick={handlePurchase}
            disabled={isProcessing}
            className="w-full gap-2"
            size="lg"
          >
            {isProcessing ? (
              "Processing..."
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Upgrade to {selectedPlan === "pro" ? "Pro" : "Pro Plus"}
              </>
            )}
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Secure payment powered by Stripe. 30-day money-back guarantee.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

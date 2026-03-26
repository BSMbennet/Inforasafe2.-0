"use client"

import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  name: string
  description: string
}

interface WizardStepperProps {
  steps: Step[]
  currentStep: number
}

export function WizardStepper({ steps, currentStep }: WizardStepperProps) {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center justify-center">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              "relative",
              index !== steps.length - 1 ? "pr-8 sm:pr-20" : ""
            )}
          >
            {/* Connector line */}
            {index !== steps.length - 1 && (
              <div
                className="absolute right-0 top-4 hidden h-0.5 w-full sm:block"
                aria-hidden="true"
              >
                <div
                  className={cn(
                    "h-full w-full",
                    step.id < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              </div>
            )}

            <div className="group relative flex flex-col items-center">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                  step.id < currentStep
                    ? "bg-primary text-primary-foreground"
                    : step.id === currentStep
                      ? "border-2 border-primary bg-background text-primary"
                      : "border-2 border-border bg-background text-muted-foreground"
                )}
              >
                {step.id < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  step.id
                )}
              </span>
              <span
                className={cn(
                  "mt-2 hidden text-center text-xs font-medium sm:block",
                  step.id <= currentStep
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {step.name}
              </span>
            </div>
          </li>
        ))}
      </ol>
      
      {/* Mobile step indicator */}
      <div className="mt-4 text-center sm:hidden">
        <p className="text-sm font-medium">
          Step {currentStep} of {steps.length}
        </p>
        <p className="text-xs text-muted-foreground">
          {steps[currentStep - 1]?.name}
        </p>
      </div>
    </nav>
  )
}

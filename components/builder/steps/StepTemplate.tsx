"use client"

import { CVFormData } from "@/lib/types/cv"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface StepTemplateProps {
  data: CVFormData
  updateData: (data: Partial<CVFormData>) => void
}

const templates = [
  {
    id: "modern" as const,
    name: "Modern",
    description: "Clean lines with a contemporary feel. Great for tech and creative roles.",
    preview: (
      <div className="space-y-2 p-3">
        <div className="h-3 w-16 rounded bg-primary" />
        <div className="h-2 w-24 rounded bg-muted-foreground/30" />
        <div className="mt-3 space-y-1">
          <div className="h-2 w-full rounded bg-muted" />
          <div className="h-2 w-3/4 rounded bg-muted" />
        </div>
        <div className="mt-2 flex gap-1">
          <div className="h-4 w-12 rounded bg-primary/20" />
          <div className="h-4 w-10 rounded bg-primary/20" />
        </div>
      </div>
    ),
  },
  {
    id: "professional" as const,
    name: "Professional",
    description: "Traditional layout trusted by Fortune 500 companies. Perfect for corporate roles.",
    preview: (
      <div className="space-y-2 p-3">
        <div className="text-center">
          <div className="mx-auto h-3 w-20 rounded bg-foreground" />
          <div className="mx-auto mt-1 h-2 w-24 rounded bg-muted-foreground/30" />
        </div>
        <div className="mt-3 border-t border-border pt-2">
          <div className="h-2 w-12 rounded bg-foreground" />
          <div className="mt-1 h-2 w-full rounded bg-muted" />
        </div>
        <div className="border-t border-border pt-2">
          <div className="h-2 w-12 rounded bg-foreground" />
          <div className="mt-1 h-2 w-full rounded bg-muted" />
        </div>
      </div>
    ),
  },
  {
    id: "minimal" as const,
    name: "Minimal",
    description: "Simple and elegant. Lets your experience speak for itself.",
    preview: (
      <div className="space-y-2 p-3">
        <div className="h-3 w-20 rounded bg-foreground" />
        <div className="h-2 w-16 rounded bg-muted-foreground/30" />
        <div className="mt-4 space-y-1">
          <div className="h-2 w-full rounded bg-muted" />
          <div className="h-2 w-full rounded bg-muted" />
          <div className="h-2 w-2/3 rounded bg-muted" />
        </div>
        <div className="mt-3 space-y-1">
          <div className="h-2 w-full rounded bg-muted" />
          <div className="h-2 w-5/6 rounded bg-muted" />
        </div>
      </div>
    ),
  },
]

export function StepTemplate({ data, updateData }: StepTemplateProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Choose Your Template</h2>
        <p className="mt-2 text-muted-foreground">
          Select a professional template that matches your style.
        </p>
      </div>

      <div className="mx-auto grid max-w-3xl gap-4 md:grid-cols-3">
        {templates.map((template) => (
          <button
            key={template.id}
            type="button"
            onClick={() => updateData({ template: template.id })}
            className={cn(
              "relative flex flex-col overflow-hidden rounded-lg border-2 bg-card text-left transition-all hover:shadow-md",
              data.template === template.id
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/50"
            )}
          >
            {data.template === template.id && (
              <div className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                <Check className="h-3 w-3 text-primary-foreground" />
              </div>
            )}
            <div className="aspect-[3/4] border-b border-border bg-background">
              {template.preview}
            </div>
            <div className="p-3">
              <h3 className="font-semibold">{template.name}</h3>
              <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                {template.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

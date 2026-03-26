import { Brain, FileDown, Layout, Sparkles, Target, Zap } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Writing",
    description:
      "Our AI analyzes your experience and crafts compelling bullet points that highlight your achievements.",
  },
  {
    icon: Layout,
    title: "Professional Templates",
    description:
      "Choose from beautifully designed templates that are proven to get past ATS systems.",
  },
  {
    icon: FileDown,
    title: "Instant PDF Download",
    description:
      "Download your polished CV as a perfectly formatted PDF, ready to send to employers.",
  },
  {
    icon: Target,
    title: "ATS Optimization",
    description:
      "Every CV is optimized to pass Applicant Tracking Systems used by top companies.",
  },
  {
    icon: Sparkles,
    title: "Cover Letter Generation",
    description:
      "Generate tailored cover letters that complement your CV and match the job description.",
  },
  {
    icon: Zap,
    title: "Fast and Simple",
    description:
      "Complete your professional CV in under 10 minutes with our intuitive step-by-step wizard.",
  },
]

export function FeaturesSection() {
  return (
    <section className="border-t border-border bg-card py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Everything You Need to Land Your Dream Job
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            Our AI-powered platform gives you all the tools to create a
            standout CV that gets results.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative rounded-xl border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="border-t border-border bg-background py-20 md:py-28">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-2xl bg-primary px-6 py-16 text-center md:px-16">
          <div className="relative z-10">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
              Ready to Build Your Professional CV?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-primary-foreground/80">
              Join thousands of job seekers who have landed their dream jobs
              with AI-powered CVs. Start building yours today.
            </p>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="gap-2 font-semibold"
            >
              <Link href="/builder">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Background decoration */}
          <div
            className="absolute inset-0 -z-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>
    </section>
  )
}

"use client"
export const dynamic = "force-dynamic"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CVPreview } from "@/components/preview/CVPreview"
import { PaywallModal } from "@/components/preview/PaywallModal"
import { CVFormData, GeneratedCV, initialCVFormData } from "@/lib/types/cv"
import {
  FileText,
  Download,
  ArrowLeft,
  RefreshCw,
  FileEdit,
  Crown,
} from "lucide-react"

export default function PreviewPage() {
  const router = useRouter()
  const [formData, setFormData] = useState<CVFormData | null>(null)
  const [generatedCV, setGeneratedCV] = useState<GeneratedCV | null>(null)
  const [showPaywall, setShowPaywall] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load data from sessionStorage
    const storedFormData = sessionStorage.getItem("cvFormData")
    const storedCV = sessionStorage.getItem("generatedCV")

    if (storedFormData && storedCV) {
      setFormData(JSON.parse(storedFormData))
      setGeneratedCV(JSON.parse(storedCV))
    }
    setIsLoading(false)
  }, [])

  const handleDownload = () => {
    // Show paywall for free users
    setShowPaywall(true)
  }

  const handleRegenerate = async () => {
    if (!formData) return

    setIsLoading(true)
    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to regenerate")

      const newCV = await response.json()
      setGeneratedCV(newCV)
      sessionStorage.setItem("generatedCV", JSON.stringify(newCV))
    } catch (error) {
      console.error("Regeneration error:", error)
      alert("Failed to regenerate. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading your CV...</p>
        </div>
      </div>
    )
  }

  if (!formData || !generatedCV) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>No CV Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              It looks like you haven&apos;t created a CV yet. Start building
              your professional resume now.
            </p>
            <Button asChild>
              <Link href="/builder">Create Your CV</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              ResumeAI
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/builder">
                <FileEdit className="mr-2 h-4 w-4" />
                Edit
              </Link>
            </Button>
            <Button onClick={handleDownload} size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/builder">
              <ArrowLeft className="h-4 w-4" />
              Back to Editor
            </Link>
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRegenerate}
              disabled={isLoading}
              className="gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              Regenerate
            </Button>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* CV Preview */}
          <div className="lg:col-span-2">
            <div className="mx-auto max-w-xl">
              <CVPreview
                formData={formData}
                generatedCV={generatedCV}
                showWatermark={true}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Crown className="h-5 w-5 text-primary" />
                  Upgrade to Download
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  Your CV looks great! Upgrade to remove the watermark and
                  download a polished PDF.
                </p>
                <Button onClick={handleDownload} className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">CV Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Target Role</p>
                  <p className="font-medium">{formData.jobTitle}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Industry</p>
                  <p className="font-medium">{formData.industry}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Template</p>
                  <p className="font-medium capitalize">{formData.template}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Skills</p>
                  <p className="font-medium">{formData.skills.length} skills</p>
                </div>
              </CardContent>
            </Card>

            {generatedCV.coverLetter && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Cover Letter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {generatedCV.coverLetter}
                  </p>
                  <Button
                    variant="link"
                    className="mt-2 h-auto p-0 text-sm"
                    onClick={handleDownload}
                  >
                    View Full Cover Letter
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <PaywallModal open={showPaywall} onOpenChange={setShowPaywall} />
    </div>
  )
}

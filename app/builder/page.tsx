"use client"
export const dynamic = "force-dynamic"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { WizardStepper } from "@/components/builder/WizardStepper"
import { StepJob } from "@/components/builder/steps/StepJob"
import { StepExperience } from "@/components/builder/steps/StepExperience"
import { StepSkills } from "@/components/builder/steps/StepSkills"
import { StepEducation } from "@/components/builder/steps/StepEducation"
import { StepTemplate } from "@/components/builder/steps/StepTemplate"
import { CVFormData, initialCVFormData } from "@/lib/types/cv"
import { FileText, ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react"

const steps = [
  { id: 1, name: "Target Job", description: "What role are you targeting?" },
  { id: 2, name: "Experience", description: "Your work history" },
  { id: 3, name: "Skills", description: "Your key abilities" },
  { id: 4, name: "Education", description: "Your academic background" },
  { id: 5, name: "Template", description: "Choose your style" },
]

export default function BuilderPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<CVFormData>(initialCVFormData)
  const [isGenerating, setIsGenerating] = useState(false)

  const updateFormData = (data: Partial<CVFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.jobTitle.trim() !== "" && formData.industry !== ""
      case 2:
        return (
          formData.experienceLevel !== "" &&
          formData.yearsOfExperience !== "" &&
          formData.currentRole.trim() !== ""
        )
      case 3:
        return formData.skills.length >= 3
      case 4:
        return (
          formData.educationLevel !== "" &&
          formData.institution.trim() !== ""
        )
      case 5:
        return formData.template !== ""
      default:
        return false
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleGenerate = async () => {
    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to generate CV")
      }

      const generatedCV = await response.json()

      // Store the generated CV and form data in sessionStorage for the preview page
      sessionStorage.setItem("cvFormData", JSON.stringify(formData))
      sessionStorage.setItem("generatedCV", JSON.stringify(generatedCV))

      router.push("/preview")
    } catch (error) {
      console.error("Error generating CV:", error)
      alert("Failed to generate CV. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepJob data={formData} updateData={updateFormData} />
      case 2:
        return <StepExperience data={formData} updateData={updateFormData} />
      case 3:
        return <StepSkills data={formData} updateData={updateFormData} />
      case 4:
        return <StepEducation data={formData} updateData={updateFormData} />
      case 5:
        return <StepTemplate data={formData} updateData={updateFormData} />
      default:
        return null
    }
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

          <Button asChild variant="ghost">
            <Link href="/dashboard">Save & Exit</Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <WizardStepper steps={steps} currentStep={currentStep} />

        <Card className="mb-6">
          <CardContent className="p-6 md:p-8">{renderStep()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>

          {currentStep < steps.length ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleGenerate}
              disabled={!canProceed() || isGenerating}
              className="gap-2"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Generate My CV
                </>
              )}
            </Button>
          )}
        </div>

        {/* Progress hint */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {currentStep < steps.length
            ? `Fill in the details and click Next to continue`
            : `Click "Generate My CV" to create your AI-powered resume`}
        </p>
      </main>
    </div>
  )
}

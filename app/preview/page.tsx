"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CVPreview } from "@/components/preview/CVPreview";
import { PaywallModal } from "@/components/preview/PaywallModal";
import { CVFormData, GeneratedCV } from "@/lib/types/cv";
import {
  FileText,
  Download,
  ArrowLeft,
  RefreshCw,
  FileEdit,
  Crown,
} from "lucide-react";

export default function PreviewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<CVFormData | null>(null);
  const [generatedCV, setGeneratedCV] = useState<GeneratedCV | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1️⃣ Try loading from sessionStorage (main flow)
    const storedFormData = sessionStorage.getItem("cvFormData");
    const storedCV = sessionStorage.getItem("generatedCV");

    if (storedFormData && storedCV) {
      setFormData(JSON.parse(storedFormData));
      setGeneratedCV(JSON.parse(storedCV));
      setIsLoading(false);
      return;
    }

    // 2️⃣ Fallback: CV passed via query param (?cv=...)
    const cvFromQuery = searchParams.get("cv");
    if (cvFromQuery) {
      setGeneratedCV({ content: cvFromQuery });
    }

    setIsLoading(false);
  }, [searchParams]);

const handleDownload = async () => {
  if (!generatedCV || !formData) return;

  try {
    const response = await fetch("/api/generate-pdf", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cvText: generatedCV.content ?? generatedCV.cvText ?? "",
        fullName: formData.fullName || "cv",
      }),
    });

    if (!response.ok) {
      throw new Error("PDF generation failed");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.fullName || "cv"}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error) {
    console.error(error);
    alert("Failed to download PDF. Please try again.");
  }
};
  const handleRegenerate = async () => {
    if (!formData) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-cv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to regenerate");

      const newCV = await response.json();
      setGeneratedCV(newCV);
      sessionStorage.setItem("generatedCV", JSON.stringify(newCV));
    } catch (error) {
      console.error("Regeneration error:", error);
      alert("Failed to regenerate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Loading your CV...</p>
        </div>
      </div>
    );
  }

  if (!generatedCV) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <Card className="max-w-md text-center">
          <CardHeader>
            <CardTitle>No CV Found</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-muted-foreground">
              It looks like you haven&apos;t created a CV yet.
            </p>
            <Button asChild>
              /builderCreate Your CV</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          /dashboard
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <FileText className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">ResumeAI</span>
          </Link>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              /builder
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
        <div className="grid gap-8 lg:grid-cols-3">
          {/* CV Preview */}
          <div className="lg:col-span-2">
            <CVPreview
              formData={formData}
              generatedCV={generatedCV}
              showWatermark={true}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Upgrade to Download
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button onClick={handleDownload} className="w-full gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>

            {generatedCV.coverLetter && (
              <Card>
                <CardHeader>
                  <CardTitle>Cover Letter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-4">
                    {generatedCV.coverLetter}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <PaywallModal open={showPaywall} onOpenChange={setShowPaywall} />
    </div>
  );
}

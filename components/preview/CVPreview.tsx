"use client"

import { CVFormData, GeneratedCV } from "@/lib/types/cv"
import { cn } from "@/lib/utils"

interface CVPreviewProps {
  formData: CVFormData
  generatedCV: GeneratedCV
  showWatermark?: boolean
}

export function CVPreview({
  formData,
  generatedCV,
  showWatermark = true,
}: CVPreviewProps) {
  const { template } = formData

  return (
    <div className="relative">
      {/* Watermark overlay for free users */}
      {showWatermark && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="rotate-[-30deg] text-6xl font-bold tracking-widest text-muted-foreground/10 select-none">
            PREVIEW
          </div>
        </div>
      )}

      <div
        className={cn(
          "relative aspect-[8.5/11] w-full overflow-hidden rounded-lg border border-border bg-white text-foreground shadow-lg",
          template === "modern" && "font-sans",
          template === "professional" && "font-serif",
          template === "minimal" && "font-sans"
        )}
      >
        {template === "modern" && (
          <ModernTemplate formData={formData} generatedCV={generatedCV} />
        )}
        {template === "professional" && (
          <ProfessionalTemplate formData={formData} generatedCV={generatedCV} />
        )}
        {template === "minimal" && (
          <MinimalTemplate formData={formData} generatedCV={generatedCV} />
        )}
      </div>
    </div>
  )
}

function ModernTemplate({
  formData,
  generatedCV,
}: {
  formData: CVFormData
  generatedCV: GeneratedCV
}) {
  return (
    <div className="flex h-full text-[10px] leading-tight text-gray-900">
      {/* Sidebar */}
      <div className="w-1/3 bg-primary p-4 text-primary-foreground">
        <div className="mb-4">
          <h1 className="text-lg font-bold">
            {formData.currentRole || "Your Name"}
          </h1>
          <p className="text-xs opacity-90">{formData.jobTitle}</p>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-80">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1">
            {generatedCV.skills.slice(0, 8).map((skill, i) => (
              <span
                key={i}
                className="rounded bg-white/20 px-1.5 py-0.5 text-[8px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide opacity-80">
            Education
          </h2>
          {generatedCV.education.map((edu, i) => (
            <div key={i} className="mb-2">
              <p className="font-medium">{edu.degree}</p>
              <p className="text-[8px] opacity-80">{edu.institution}</p>
              <p className="text-[8px] opacity-60">{edu.year}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="mb-1 text-xs font-semibold text-primary">
            Professional Summary
          </h2>
          <p className="text-gray-700">{generatedCV.professionalSummary}</p>
        </div>

        <div>
          <h2 className="mb-2 text-xs font-semibold text-primary">Experience</h2>
          {generatedCV.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{exp.title}</p>
                  <p className="text-gray-600">{exp.company}</p>
                </div>
                <p className="text-[8px] text-gray-500">{exp.period}</p>
              </div>
              <ul className="mt-1 list-inside list-disc text-gray-700">
                {exp.achievements.slice(0, 3).map((achievement, j) => (
                  <li key={j}>{achievement}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProfessionalTemplate({
  formData,
  generatedCV,
}: {
  formData: CVFormData
  generatedCV: GeneratedCV
}) {
  return (
    <div className="h-full p-6 text-[10px] leading-tight text-gray-900">
      {/* Header */}
      <div className="mb-4 border-b-2 border-gray-800 pb-3 text-center">
        <h1 className="text-xl font-bold tracking-wide">
          {formData.currentRole || "YOUR NAME"}
        </h1>
        <p className="text-sm text-gray-600">{formData.jobTitle}</p>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <h2 className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-800">
          Professional Summary
        </h2>
        <p className="text-gray-700">{generatedCV.professionalSummary}</p>
      </div>

      {/* Experience */}
      <div className="mb-4">
        <h2 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-800">
          Professional Experience
        </h2>
        {generatedCV.experience.map((exp, i) => (
          <div key={i} className="mb-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{exp.title}</p>
                <p className="italic text-gray-600">{exp.company}</p>
              </div>
              <p className="text-gray-500">{exp.period}</p>
            </div>
            <ul className="mt-1 list-inside list-disc text-gray-700">
              {exp.achievements.slice(0, 3).map((achievement, j) => (
                <li key={j}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education & Skills Row */}
      <div className="flex gap-6">
        <div className="flex-1">
          <h2 className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-800">
            Education
          </h2>
          {generatedCV.education.map((edu, i) => (
            <div key={i}>
              <p className="font-medium">{edu.degree}</p>
              <p className="text-gray-600">
                {edu.institution} | {edu.year}
              </p>
            </div>
          ))}
        </div>
        <div className="flex-1">
          <h2 className="mb-1 text-xs font-bold uppercase tracking-wider text-gray-800">
            Skills
          </h2>
          <p className="text-gray-700">
            {generatedCV.skills.slice(0, 10).join(" • ")}
          </p>
        </div>
      </div>
    </div>
  )
}

function MinimalTemplate({
  formData,
  generatedCV,
}: {
  formData: CVFormData
  generatedCV: GeneratedCV
}) {
  return (
    <div className="h-full p-6 text-[10px] leading-tight text-gray-900">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-lg font-light tracking-wide">
          {formData.currentRole || "Your Name"}
        </h1>
        <p className="text-gray-500">{formData.jobTitle}</p>
      </div>

      {/* Summary */}
      <div className="mb-5">
        <p className="text-gray-700 leading-relaxed">
          {generatedCV.professionalSummary}
        </p>
      </div>

      {/* Experience */}
      <div className="mb-5">
        <h2 className="mb-3 text-[9px] font-medium uppercase tracking-widest text-gray-400">
          Experience
        </h2>
        {generatedCV.experience.map((exp, i) => (
          <div key={i} className="mb-3">
            <p className="font-medium">
              {exp.title} — {exp.company}
            </p>
            <p className="mb-1 text-[8px] text-gray-500">{exp.period}</p>
            <ul className="list-inside list-disc text-gray-600">
              {exp.achievements.slice(0, 2).map((achievement, j) => (
                <li key={j}>{achievement}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="mb-5">
        <h2 className="mb-2 text-[9px] font-medium uppercase tracking-widest text-gray-400">
          Education
        </h2>
        {generatedCV.education.map((edu, i) => (
          <p key={i} className="text-gray-700">
            {edu.degree}, {edu.institution} ({edu.year})
          </p>
        ))}
      </div>

      {/* Skills */}
      <div>
        <h2 className="mb-2 text-[9px] font-medium uppercase tracking-widest text-gray-400">
          Skills
        </h2>
        <p className="text-gray-600">
          {generatedCV.skills.slice(0, 8).join(" / ")}
        </p>
      </div>
    </div>
  )
}

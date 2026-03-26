"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CVFormData, industries } from "@/lib/types/cv"

interface StepJobProps {
  data: CVFormData
  updateData: (data: Partial<CVFormData>) => void
}

export function StepJob({ data, updateData }: StepJobProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">What role are you targeting?</h2>
        <p className="mt-2 text-muted-foreground">
          Tell us about the job you&apos;re applying for so we can tailor your CV.
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Target Job Title</Label>
          <Input
            id="jobTitle"
            placeholder="e.g., Software Engineer, Marketing Manager"
            value={data.jobTitle}
            onChange={(e) => updateData({ jobTitle: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry">Industry</Label>
          <Select
            value={data.industry}
            onValueChange={(value) => updateData({ industry: value })}
          >
            <SelectTrigger id="industry">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

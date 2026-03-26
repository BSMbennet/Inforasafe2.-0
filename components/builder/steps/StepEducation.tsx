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
import { CVFormData, educationLevels } from "@/lib/types/cv"

interface StepEducationProps {
  data: CVFormData
  updateData: (data: Partial<CVFormData>) => void
}

export function StepEducation({ data, updateData }: StepEducationProps) {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Educational Background</h2>
        <p className="mt-2 text-muted-foreground">
          Add your highest level of education to strengthen your CV.
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="educationLevel">Education Level</Label>
          <Select
            value={data.educationLevel}
            onValueChange={(value) => updateData({ educationLevel: value })}
          >
            <SelectTrigger id="educationLevel">
              <SelectValue placeholder="Select your education level" />
            </SelectTrigger>
            <SelectContent>
              {educationLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution">Institution Name</Label>
          <Input
            id="institution"
            placeholder="e.g., University of California"
            value={data.institution}
            onChange={(e) => updateData({ institution: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="fieldOfStudy">Field of Study</Label>
          <Input
            id="fieldOfStudy"
            placeholder="e.g., Computer Science"
            value={data.fieldOfStudy}
            onChange={(e) => updateData({ fieldOfStudy: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="graduationYear">Graduation Year</Label>
          <Select
            value={data.graduationYear}
            onValueChange={(value) => updateData({ graduationYear: value })}
          >
            <SelectTrigger id="graduationYear">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}

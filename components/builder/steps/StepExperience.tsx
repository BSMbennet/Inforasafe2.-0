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
import { CVFormData, experienceLevels } from "@/lib/types/cv"

interface StepExperienceProps {
  data: CVFormData
  updateData: (data: Partial<CVFormData>) => void
}

export function StepExperience({ data, updateData }: StepExperienceProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Tell us about your experience</h2>
        <p className="mt-2 text-muted-foreground">
          Share your work history to help our AI craft compelling achievements.
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select
            value={data.experienceLevel}
            onValueChange={(value) =>
              updateData({
                experienceLevel: value as CVFormData["experienceLevel"],
              })
            }
          >
            <SelectTrigger id="experienceLevel">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="yearsOfExperience">Years of Experience</Label>
          <Input
            id="yearsOfExperience"
            type="number"
            min="0"
            max="50"
            placeholder="e.g., 5"
            value={data.yearsOfExperience}
            onChange={(e) => updateData({ yearsOfExperience: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentRole">Current/Most Recent Role</Label>
          <Input
            id="currentRole"
            placeholder="e.g., Senior Developer"
            value={data.currentRole}
            onChange={(e) => updateData({ currentRole: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentCompany">Current/Most Recent Company</Label>
          <Input
            id="currentCompany"
            placeholder="e.g., Tech Corp Inc."
            value={data.currentCompany}
            onChange={(e) => updateData({ currentCompany: e.target.value })}
          />
        </div>
      </div>
    </div>
  )
}

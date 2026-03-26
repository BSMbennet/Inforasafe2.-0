"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CVFormData } from "@/lib/types/cv"
import { Plus, X } from "lucide-react"

interface StepSkillsProps {
  data: CVFormData
  updateData: (data: Partial<CVFormData>) => void
}

const suggestedSkills = [
  "Project Management",
  "Communication",
  "Leadership",
  "Problem Solving",
  "Data Analysis",
  "Team Collaboration",
  "Strategic Planning",
  "Time Management",
]

export function StepSkills({ data, updateData }: StepSkillsProps) {
  const [newSkill, setNewSkill] = useState("")

  const addSkill = (skill: string) => {
    const trimmedSkill = skill.trim()
    if (trimmedSkill && !data.skills.includes(trimmedSkill)) {
      updateData({ skills: [...data.skills, trimmedSkill] })
    }
    setNewSkill("")
  }

  const removeSkill = (skillToRemove: string) => {
    updateData({ skills: data.skills.filter((skill) => skill !== skillToRemove) })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(newSkill)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">What are your key skills?</h2>
        <p className="mt-2 text-muted-foreground">
          Add your most relevant skills. Our AI will highlight them effectively.
        </p>
      </div>

      <div className="mx-auto max-w-md space-y-4">
        <div className="space-y-2">
          <Label htmlFor="skill">Add Skills</Label>
          <div className="flex gap-2">
            <Input
              id="skill"
              placeholder="Type a skill and press Enter"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => addSkill(newSkill)}
              disabled={!newSkill.trim()}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {data.skills.length > 0 && (
          <div className="space-y-2">
            <Label>Your Skills</Label>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="gap-1 pr-1"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkill(skill)}
                    className="ml-1 rounded-full p-0.5 hover:bg-muted"
                    aria-label={`Remove ${skill}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Suggested Skills</Label>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills
              .filter((skill) => !data.skills.includes(skill))
              .map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="cursor-pointer hover:bg-accent"
                  onClick={() => addSkill(skill)}
                >
                  <Plus className="mr-1 h-3 w-3" />
                  {skill}
                </Badge>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

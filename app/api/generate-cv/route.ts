import { generateText, Output } from "ai"
import { z } from "zod"
import type { CVFormData, GeneratedCV } from "@/lib/types/cv"

// Schema for the generated CV structure
const generatedCVSchema = z.object({
  professionalSummary: z
    .string()
    .describe(
      "A compelling 2-3 sentence professional summary highlighting key qualifications"
    ),
  skills: z
    .array(z.string())
    .describe("List of relevant skills, including both provided and inferred skills"),
  experience: z.array(
    z.object({
      title: z.string().describe("Job title"),
      company: z.string().describe("Company name"),
      period: z.string().describe("Employment period, e.g., '2020 - Present'"),
      achievements: z
        .array(z.string())
        .describe(
          "3-4 quantifiable achievement bullet points using action verbs"
        ),
    })
  ),
  education: z.array(
    z.object({
      degree: z.string().describe("Degree name"),
      institution: z.string().describe("School or institution name"),
      year: z.string().describe("Graduation year"),
      details: z
        .string()
        .nullable()
        .describe("Optional relevant details like honors or GPA"),
    })
  ),
  coverLetter: z
    .string()
    .nullable()
    .describe("A tailored cover letter for the target role"),
})

export async function POST(req: Request) {
  try {
    const formData: CVFormData = await req.json()

    const {
      jobTitle,
      industry,
      experienceLevel,
      yearsOfExperience,
      currentRole,
      currentCompany,
      skills,
      educationLevel,
      institution,
      fieldOfStudy,
      graduationYear,
    } = formData

    const prompt = `Generate a professional CV and cover letter for the following candidate:

TARGET POSITION: ${jobTitle} in the ${industry} industry

CANDIDATE PROFILE:
- Experience Level: ${experienceLevel} (${yearsOfExperience} years)
- Current/Most Recent Role: ${currentRole} at ${currentCompany}
- Skills: ${skills.join(", ")}
- Education: ${educationLevel} in ${fieldOfStudy} from ${institution} (${graduationYear})

REQUIREMENTS:
1. Write a compelling professional summary (2-3 sentences) that highlights their fit for the target role
2. Expand and optimize their skill list with relevant industry keywords for ATS systems
3. Generate realistic work experience entries with quantifiable achievements using strong action verbs
4. Format education appropriately
5. Write a tailored cover letter (3 paragraphs) that connects their experience to the target role

Make the content professional, achievement-focused, and optimized for Applicant Tracking Systems (ATS).
Use metrics and numbers where appropriate to demonstrate impact.`

    const { output } = await generateText({
      model: "openai/gpt-4o-mini",
      output: Output.object({
        schema: generatedCVSchema,
      }),
      prompt,
    })

    // Transform the output to match our GeneratedCV interface
    const generatedCV: GeneratedCV = {
      professionalSummary: output.professionalSummary,
      skills: output.skills,
      experience: output.experience,
      education: output.education.map((edu) => ({
        ...edu,
        details: edu.details || undefined,
      })),
      coverLetter: output.coverLetter || undefined,
    }

    return Response.json(generatedCV)
  } catch (error) {
    console.error("CV generation error:", error)
    return Response.json(
      { error: "Failed to generate CV. Please try again." },
      { status: 500 }
    )
  }
}

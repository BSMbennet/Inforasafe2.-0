import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      full_name,
      target_job_title,
      industry,
      experience_level,
      years_of_experience,
      skills,
      education,
    } = body;

    const cvPrompt = `
You are a professional CV writer with deep knowledge of ATS systems.

Create a modern, ATS-optimized CV using the information below.

Rules:
- Do not mention AI
- Do not invent employers or experience
- Focus on achievements
- Use bullet points
- Keep tone professional and human

Candidate:
Name: ${full_name}
Target Role: ${target_job_title}
Industry: ${industry}
Experience Level: ${experience_level}
Years of Experience: ${years_of_experience}
Skills: ${skills}
Education: ${education}

Use this structure exactly:
1. Professional Summary
2. Core Skills
3. Professional Experience
4. Education
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // cheap + high quality
      temperature: 0.6,
      messages: [{ role: "user", content: cvPrompt }],
    });

    const cvText = completion.choices[0].message.content;

    return NextResponse.json({ cvText });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate CV" },
      { status: 500 }
    );
  }
}

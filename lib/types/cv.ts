export interface CVFormData {
  // Step 1: Target Job
  jobTitle: string
  industry: string
  
  // Step 2: Experience
  experienceLevel: "entry" | "mid" | "senior" | "executive"
  yearsOfExperience: string
  currentRole: string
  currentCompany: string
  
  // Step 3: Skills
  skills: string[]
  
  // Step 4: Education
  educationLevel: string
  institution: string
  fieldOfStudy: string
  graduationYear: string
  
  // Step 5: Template
  template: "modern" | "professional" | "minimal"
}

export interface GeneratedCV {
  professionalSummary: string
  skills: string[]
  experience: {
    title: string
    company: string
    period: string
    achievements: string[]
  }[]
  education: {
    degree: string
    institution: string
    year: string
    details?: string
  }[]
  coverLetter?: string
}

export const initialCVFormData: CVFormData = {
  jobTitle: "",
  industry: "",
  experienceLevel: "mid",
  yearsOfExperience: "",
  currentRole: "",
  currentCompany: "",
  skills: [],
  educationLevel: "",
  institution: "",
  fieldOfStudy: "",
  graduationYear: "",
  template: "modern",
}

export const industries = [
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Education",
  "Marketing & Advertising",
  "Consulting",
  "Manufacturing",
  "Retail",
  "Government",
  "Non-profit",
  "Legal",
  "Real Estate",
  "Media & Entertainment",
  "Other",
]

export const experienceLevels = [
  { value: "entry", label: "Entry Level (0-2 years)" },
  { value: "mid", label: "Mid Level (3-5 years)" },
  { value: "senior", label: "Senior Level (6-10 years)" },
  { value: "executive", label: "Executive (10+ years)" },
]

export const educationLevels = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate / PhD",
  "Professional Certification",
  "Other",
]

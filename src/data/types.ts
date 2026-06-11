export interface ContactLink {
  label: string
  url: string
  icon?: string
}

export interface Role {
  company: string
  title: string
  start: string
  end: string | null
  bullets: string[]
}

export interface SkillGroup {
  name: string
  skills: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  url?: string
}

export interface Award {
  name: string
  year: number
}

export interface EducationItem {
  institution: string
  degree: string
  start: string
  end: string
  gpa?: number
}

export interface Profile {
  name: string
  title: string
  summary: string
  location?: string
}

export interface PortfolioContent {
  profile: Profile
  contact: ContactLink[]
  experience: Role[]
  skills: SkillGroup[]
  projects: Project[]
  education: EducationItem[]
  awards: Award[]
}

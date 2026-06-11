import rawContent from './content.json'
import type {
  PortfolioContent,
  Profile,
  ContactLink,
  Role,
  SkillGroup,
  Project,
  Award,
  EducationItem,
} from './types'

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`[content] Validation error: ${message}`)
  }
}

function assertString(val: unknown, field: string): asserts val is string {
  assert(typeof val === 'string' && val.length > 0, `${field} must be a non-empty string`)
}

function assertArray(val: unknown, field: string): asserts val is unknown[] {
  assert(Array.isArray(val), `${field} must be an array`)
}

function validateProfile(p: unknown): asserts p is Profile {
  assert(typeof p === 'object' && p !== null, 'profile must be an object')
  const obj = p as Record<string, unknown>
  assertString(obj.name, 'profile.name')
  assertString(obj.title, 'profile.title')
  assertString(obj.summary, 'profile.summary')
}

function validateContactLinks(c: unknown): asserts c is ContactLink[] {
  assertArray(c, 'contact')
  ;(c as unknown[]).forEach((item, i) => {
    const obj = item as Record<string, unknown>
    assertString(obj.label, `contact[${i}].label`)
    assertString(obj.url, `contact[${i}].url`)
  })
}

function validateExperience(e: unknown): asserts e is Role[] {
  assertArray(e, 'experience')
  ;(e as unknown[]).forEach((item, i) => {
    const obj = item as Record<string, unknown>
    assertString(obj.company, `experience[${i}].company`)
    assertString(obj.title, `experience[${i}].title`)
    assertString(obj.start, `experience[${i}].start`)
    assert(
      obj.end === null || typeof obj.end === 'string',
      `experience[${i}].end must be string or null`
    )
    assertArray(obj.bullets, `experience[${i}].bullets`)
  })
}

function validateSkills(s: unknown): asserts s is SkillGroup[] {
  assertArray(s, 'skills')
  ;(s as unknown[]).forEach((item, i) => {
    const obj = item as Record<string, unknown>
    assertString(obj.name, `skills[${i}].name`)
    assertArray(obj.skills, `skills[${i}].skills`)
  })
}

function validateProjects(p: unknown): asserts p is Project[] {
  assertArray(p, 'projects')
  ;(p as unknown[]).forEach((item, i) => {
    const obj = item as Record<string, unknown>
    assertString(obj.id, `projects[${i}].id`)
    assertString(obj.name, `projects[${i}].name`)
    assertString(obj.description, `projects[${i}].description`)
    assertArray(obj.tags, `projects[${i}].tags`)
  })
}

function validateAwards(a: unknown): asserts a is Award[] {
  assertArray(a, 'awards')
  ;(a as unknown[]).forEach((item, i) => {
    const obj = item as Record<string, unknown>
    assertString(obj.name, `awards[${i}].name`)
    assert(typeof obj.year === 'number', `awards[${i}].year must be a number`)
  })
}

function validateEducation(e: unknown): asserts e is EducationItem[] {
  assertArray(e, 'education')
  ;(e as unknown[]).forEach((item, i) => {
    const obj = item as Record<string, unknown>
    assertString(obj.institution, `education[${i}].institution`)
    assertString(obj.degree, `education[${i}].degree`)
    assertString(obj.start, `education[${i}].start`)
    assertString(obj.end, `education[${i}].end`)
  })
}

function validateContent(raw: unknown): PortfolioContent {
  assert(typeof raw === 'object' && raw !== null, 'content.json root must be an object')
  const obj = raw as Record<string, unknown>

  validateProfile(obj.profile)
  validateContactLinks(obj.contact)
  validateExperience(obj.experience)
  validateSkills(obj.skills)
  validateProjects(obj.projects)
  validateAwards(obj.awards)
  validateEducation(obj.education)

  return raw as PortfolioContent
}

export const content: PortfolioContent = validateContent(rawContent)

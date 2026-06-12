// EducationCard — server component; content from data/content.ts
import { content } from '@/data/content'

const { education } = content.about

export default function EducationCard() {
  return (
    <div className="edu">
      <div className="gl">Education</div>
      <h3>{education.degree}</h3>
      <div className="sch">{education.school}</div>
      <div className="det">{education.detail}</div>
    </div>
  )
}

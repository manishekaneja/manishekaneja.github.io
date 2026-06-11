// Job — server component; one .job row per §2 contract
import { ReactNode } from 'react'

interface JobProps {
  tag?: string
  company: string
  meta: string[]
  title: string
  titleline: string
  bullets: ReactNode[]
}

export default function Job({ tag, company, meta, title, titleline, bullets }: JobProps) {
  return (
    <article className="job">
      <div className="when">
        {tag && <span className="tag">{tag}</span>}
        <span className="co">{company}</span>
        {meta.map((m, i) => (
          <span key={i} className="yr">{m}</span>
        ))}
      </div>
      <div className="body">
        <h3>{title}</h3>
        <div className="titleline">{titleline}</div>
        <ul>
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </article>
  )
}

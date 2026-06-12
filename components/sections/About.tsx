// About section — content from data/content.ts
import EducationCard from '@/components/EducationCard'
import { content } from '@/data/content'

const { about } = content

export default function About() {
  return (
    <section id="about" className="block">
      <div className="sec-head">
        <span className="num">04</span>
        <h2>About</h2>
        <span className="line"></span>
      </div>
      <div className="about-grid">
        <div>
          {about.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <EducationCard />
      </div>
    </section>
  )
}

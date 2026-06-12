// Stack section — content from data/content.ts
import SkillGroup from '@/components/SkillGroup'
import { content } from '@/data/content'

const { groups } = content.stack

export default function Stack() {
  return (
    <section id="stack" className="block">
      <div className="sec-head">
        <span className="num">03</span>
        <h2>Stack</h2>
        <span className="line"></span>
      </div>
      <div className="stack-grid">
        {groups.map((g, i) => (
          <SkillGroup key={i} label={g.label} chips={g.chips} />
        ))}
      </div>
    </section>
  )
}

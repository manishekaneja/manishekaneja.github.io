// Intro section — content from data/content.ts
import { content, richText } from '@/data/content'

const { intro } = content

export default function Intro() {
  return (
    <section id="intro" className="block">
      <p className="lead">
        {richText(intro.lead)}
      </p>
      <p className="lead-sub">
        {intro.leadSub}
      </p>
    </section>
  )
}

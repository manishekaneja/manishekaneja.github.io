// About section — verbatim from A2 Portfolio.html lines 300–315
import EducationCard from '@/components/EducationCard'

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
          <p>
            I&apos;m an Android engineer who likes building the foundations other engineers build
            on — rendering, state, design systems and server-driven UI — and then making them
            measurably fast and safe to ship.
          </p>
          <p>
            At Blinkit I work where the stakes are highest: cart and payments, the surfaces
            between a customer deciding and a customer paying. The work spans Compose adoption,
            virtualized rendering, performance instrumentation, and release gating with real
            dashboards and post-mortems behind it.
          </p>
          <p>
            I lead a four-engineer Android team, run sprint planning and reviews, and have
            mentored engineers to promotion. Outside the day job I write Kotlin, Go and
            TypeScript, and tinker with side projects.
          </p>
        </div>
        <EducationCard />
      </div>
    </section>
  )
}

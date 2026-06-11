// Contact section — verbatim from A2 Portfolio.html lines 317–336
import { MailIcon } from '@/lib/icons'

export default function Contact() {
  return (
    <section id="contact">
      <div className="contact">
        <div className="eyebrow" style={{ marginBottom: '14px' }}>Let&apos;s talk</div>
        <h2>Building something at scale?</h2>
        <p>
          I&apos;m open to senior and staff Android roles where rendering, performance and
          platform foundations matter. Happy to chat.
        </p>
        <div className="cta-row">
          <a className="cta primary" href="mailto:manishekaneja@gmail.com">
            <MailIcon width={17} height={17} />
            manishekaneja@gmail.com
          </a>
          <a
            className="cta ghost"
            href="https://linkedin.com/in/manishaneja"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="cta ghost"
            href="https://github.com/manishekaneja"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
      <div className="colophon">
        <span>© 2026 Manish Aneja</span>
        <span>Gurgaon, IN · +91 99115 78586</span>
        <span>Built with care · A2</span>
      </div>
    </section>
  )
}

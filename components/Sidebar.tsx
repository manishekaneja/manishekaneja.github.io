import ThemeToggle from './ThemeToggle'
import ScrollSpyNav from './ScrollSpyNav'
import { GitHubIcon, LinkedInIcon, DocIcon } from '@/lib/icons'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* ---- top: avatar + theme toggle ---- */}
      <div className="sb-top">
        <div className="mono-avatar">MA</div>
        <ThemeToggle />
      </div>

      {/* ---- name block ---- */}
      <div className="name-block">
        <h1>Manish<br />Aneja</h1>
        <div className="role">
          Senior Android Engineer{' '}
          <span className="at">· Blinkit</span>
        </div>
      </div>

      {/* ---- meta ---- */}
      <div className="meta">
        <span><i className="dot"></i> Gurgaon, India</span>
        <a href="mailto:manishekaneja@gmail.com"><i className="dot"></i> manishekaneja@gmail.com</a>
        <a href="tel:+919911578586"><i className="dot"></i> +91 99115 78586</a>
      </div>

      {/* ---- status pill ---- */}
      <div className="status">
        <span className="pulse"></span>
        <div className="status-lines">
          <span style={{color:'var(--ink)',fontWeight:500}}>7+ years</span>
          <span style={{color:'var(--ink-3)'}}>Open to senior &amp; staff roles</span>
        </div>
      </div>

      {/* ---- scroll-spy nav ---- */}
      <ScrollSpyNav />

      {/* ---- footer: socials + résumé ---- */}
      <div className="sb-foot">
        <div className="socials">
          <a
            href="https://github.com/manishekaneja"
            target="_blank"
            rel="noopener"
          >
            <GitHubIcon />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/manishaneja"
            target="_blank"
            rel="noopener"
          >
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>
        {/* TODO: switch href to /resume.pdf once the file is dropped at public/resume.pdf (§10) */}
        <a className="resume-btn" href="mailto:manishekaneja@gmail.com">
          <DocIcon />
          Download Resume
        </a>
      </div>
    </aside>
  )
}

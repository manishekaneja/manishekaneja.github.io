'use client'

import { useEffect } from 'react'

const SECTIONS = ['intro', 'impact', 'work', 'stack', 'about'] as const
const NAV_LINKS = [
  { id: 'intro',  idx: '00', label: 'Intro'  },
  { id: 'impact', idx: '01', label: 'Impact' },
  { id: 'work',   idx: '02', label: 'Work'   },
  { id: 'stack',  idx: '03', label: 'Stack'  },
  { id: 'about',  idx: '04', label: 'About'  },
] as const

export default function ScrollSpyNav() {
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('.sb-nav a[data-sec]')
    )
    const map: Record<string, HTMLAnchorElement> = {}
    links.forEach(l => {
      const sec = l.dataset.sec
      if (sec) map[sec] = l
    })

    const secs = SECTIONS
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    // Observe impact/work/stack/about with the prototype rootMargin.
    // #intro is handled by the scroll fallback below because the section
    // is shorter than the ~45px detection band on typical viewports.
    const impactEl = document.getElementById('impact')
    const nonIntroSecs = secs.filter(s => s.id !== 'intro')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            links.forEach(l => l.classList.remove('active'))
            const active = map[entry.target.id]
            if (active) active.classList.add('active')
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )

    nonIntroSecs.forEach(s => io.observe(s))

    // Scroll fallback: when scrollY is above the start of #impact, force intro active.
    function onScroll() {
      if (!impactEl) return
      if (window.scrollY < impactEl.offsetTop) {
        links.forEach(l => l.classList.remove('active'))
        if (map['intro']) map['intro'].classList.add('active')
      }
    }

    // Fire once on mount so intro is active at page load.
    onScroll()

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <nav className="sb-nav" id="nav">
      {NAV_LINKS.map(({ id, idx, label }) => (
        <a key={id} href={`#${id}`} data-sec={id}>
          <span className="idx">{idx}</span>
          {' '}{label}{' '}
          <span className="rule"></span>
        </a>
      ))}
    </nav>
  )
}

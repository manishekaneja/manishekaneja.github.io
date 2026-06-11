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

    secs.forEach(s => io.observe(s))
    return () => io.disconnect()
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

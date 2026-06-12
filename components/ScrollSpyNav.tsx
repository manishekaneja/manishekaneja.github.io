'use client'

import { useEffect } from 'react'
import Link from 'next/link'

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

    let ticking = false
    let rafId = 0

    function update() {
      const line = window.innerHeight * 0.45
      // Find the last section whose top edge is at or above the detection line.
      // Default to intro (first section) if none qualifies.
      let activeId: string = SECTIONS[0]
      for (const sec of secs) {
        if (sec.getBoundingClientRect().top <= line) {
          activeId = sec.id
        }
      }
      links.forEach(l => l.classList.remove('active'))
      const activeLink = map[activeId]
      if (activeLink) activeLink.classList.add('active')
      ticking = false
    }

    function onScrollOrResize() {
      if (!ticking) {
        ticking = true
        rafId = requestAnimationFrame(update)
      }
    }

    // Run once on mount so intro is active at page load.
    update()

    window.addEventListener('scroll', onScrollOrResize, { passive: true })
    window.addEventListener('resize', onScrollOrResize, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScrollOrResize)
      window.removeEventListener('resize', onScrollOrResize)
      cancelAnimationFrame(rafId)
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
      {/* 05 Projects — internal route link, no data-sec so scroll-spy ignores it */}
      <Link href="/projects" className="ext">
        <span className="idx">05</span>
        {' '}Projects{' '}
        <span className="rule"></span>
        <span className="arr">↗</span>
      </Link>
    </nav>
  )
}

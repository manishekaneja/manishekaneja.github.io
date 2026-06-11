'use client'

import { useEffect } from 'react'
import { SunIcon, MoonIcon } from '@/lib/icons'

// localStorage key — must match the anti-FOUC head script in app/layout.tsx
const THEME_KEY = 'ma-portfolio-theme'

export default function ThemeToggle() {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggle()
      }
    }

    const el = document.getElementById('themeToggle')
    el?.addEventListener('keydown', handleKey)
    return () => el?.removeEventListener('keydown', handleKey)
  }, [])

  function toggle() {
    const html = document.documentElement
    const current = html.getAttribute('data-theme')
    const next = current === 'dark' ? 'light' : 'dark'
    html.setAttribute('data-theme', next)
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch (_) {
      // storage blocked — no-op
    }
  }

  return (
    // Render static markup — CSS shows sun/moon based on data-theme attribute
    // which the anti-FOUC head script already set before first paint.
    // Listeners are attached in useEffect to avoid hydration mismatch.
    <div
      className="theme-toggle"
      id="themeToggle"
      role="button"
      tabIndex={0}
      onClick={toggle}
    >
      <SunIcon className="ico light-only" />
      <MoonIcon className="ico dark-only" />
      <span className="light-only">Light</span>
      <span className="dark-only">Dark</span>
    </div>
  )
}

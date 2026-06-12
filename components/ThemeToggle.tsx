'use client'

import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@/lib/icons'

// localStorage key — must match the anti-FOUC head script in app/layout.tsx
const THEME_KEY = 'ma-portfolio-theme'
const DURATION = 800

export default function ThemeToggle() {
  // aria-pressed is set after mount to avoid hydration mismatch
  const [isDark, setIsDark] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Sync aria-pressed from the current data-theme (set by anti-FOUC script)
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark')

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

  function applyTheme(next: string) {
    document.documentElement.setAttribute('data-theme', next)
    setIsDark(next === 'dark')
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch (_) {
      // storage blocked — no-op
    }
  }

  function toggle() {
    const html = document.documentElement
    const current = html.getAttribute('data-theme')
    const next = current === 'dark' ? 'light' : 'dark'

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Fallback: no View Transitions support OR reduced motion → direct apply
    if (typeof document.startViewTransition === 'undefined' || prefersReducedMotion) {
      applyTheme(next)
      return
    }

    // Curtain: new theme drops in from the top over the old (vertical reveal)
    const vt = document.startViewTransition(() => {
      applyTheme(next)
    })
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: ['inset(0 0 100% 0)', 'inset(0 0 0 0)'] },
        {
          duration: DURATION,
          easing: 'cubic-bezier(.4,.05,.2,1)',
          pseudoElement: '::view-transition-new(root)',
        }
      )
    })
  }

  return (
    // Render static markup — CSS shows the correct slot based on data-theme attribute
    // which the anti-FOUC head script already set before first paint.
    // Slot shown in LIGHT mode (.light-only): MoonIcon + "Switch to dark" (target theme)
    // Slot shown in DARK mode (.dark-only): SunIcon + "Switch to light" (target theme)
    // Listeners and aria-pressed are set in useEffect to avoid hydration mismatch.
    <div
      className="theme-toggle"
      id="themeToggle"
      role="button"
      tabIndex={0}
      onClick={toggle}
      aria-pressed={isDark}
    >
      <MoonIcon className="ico light-only" />
      <SunIcon className="ico dark-only" />
      <span className="light-only">Switch to dark</span>
      <span className="dark-only">Switch to light</span>
    </div>
  )
}

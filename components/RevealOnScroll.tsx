'use client'

import { useEffect } from 'react'

/**
 * Adds `.js` to <html> (enabling reveal CSS) and wires IntersectionObserver
 * to add `.in` to every `.reveal` element when it enters the viewport.
 *
 * The CSS in globals.css gates `.reveal` opacity ONLY under `.js`, so cards
 * remain visible if JS fails or is blocked.
 */
export default function RevealOnScroll() {
  useEffect(() => {
    // Mark JS as active — CSS now hides .reveal cards until .in is applied
    document.documentElement.classList.add('js')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )

    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [])

  return null
}

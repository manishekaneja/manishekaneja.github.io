/**
 * Static copy for the /projects listing page.
 * All hardcoded strings live here — never inline them in JSX.
 * Mirrors the pattern established in data/content.ts.
 */

export const projectsPage = {
  hero: {
    eyebrow: 'Project Exhibition · Side work',
    h1: 'Small things I build',
    h1Accent: 'for fun.',
    sub:
      'A gallery of side projects and experiments — the places I go to try an idea, learn a stack, or scratch an itch outside the day job. Code for most of these lives on GitHub.',
    techLine: 'React · React Native · Java · Angular · Vanilla JS',
  },
  footer: {
    ftitle: 'More on the day job?',
    fsub: 'These are the after-hours builds. For the production work — cart, payments and rendering at Blinkit — see the',
    fsubLinkLabel: 'main portfolio →',
    fsubLinkHref: '/',
    socials: [
      { label: 'GitHub',   href: 'https://github.com/manishekaneja',       icon: 'github'   },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/manishaneja',     icon: 'linkedin' },
      { label: 'Hashnode', href: 'https://manishaneja.hashnode.dev',        icon: 'hashnode' },
    ] as const,
    colophon: {
      copy: '© 2026 Manish Aneja',
      location: 'Gurgaon, IN · manishekaneja@gmail.com',
    },
  },
} as const

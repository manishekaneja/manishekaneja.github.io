import type { Metadata } from 'next'
import { Space_Grotesk, Hanken_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const display = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const body = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://manishekaneja.github.io'),
  title: 'Manish Aneja — Senior Android Engineer',
  description:
    'Senior Android engineer at Blinkit. Cart, payments, server-driven UI and design systems for surfaces serving 4M orders/day at 99.98% crash-free.',
  openGraph: {
    title: 'Manish Aneja — Senior Android Engineer',
    description:
      'Senior Android engineer at Blinkit. Cart, payments, server-driven UI and design systems for surfaces serving 4M orders/day at 99.98% crash-free.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(function(){try{var k='ma-portfolio-theme',s=localStorage.getItem(k);` +
              `if(s==='dark'||s==='light'){document.documentElement.setAttribute('data-theme',s);}` +
              `else if(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches){` +
              `document.documentElement.setAttribute('data-theme','dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

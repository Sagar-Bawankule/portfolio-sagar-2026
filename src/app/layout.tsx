import type { Metadata } from 'next'
import { Space_Grotesk, Playfair_Display } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Sagar Vinod Bawankule — AI & Software Developer',
  description: 'Portfolio of Sagar Vinod Bawankule — Student developer & AI enthusiast crafting intelligent applications and full-stack web solutions.',
  keywords: 'AI Developer, Software Developer, Student, FarmCareAI, Portfolio, Projects, Machine Learning, Full Stack',
  authors: [{ name: 'Sagar Vinod Bawankule' }],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${playfairDisplay.variable} ${spaceGrotesk.className} min-h-screen antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {/* Background Elements Container */}
          <div className="theme-background">
            <div className="mesh-gradient" />
            <div className="grid-pattern" />
            <div className="noise-overlay" />
            <div className={`gradient-orb gradient-orb-1`} />
            <div className={`gradient-orb gradient-orb-2`} />
            <div className={`gradient-orb gradient-orb-3`} />
          </div>

          {/* Cinematic Vignette — fixed frame around all content */}
          <div className="vignette" aria-hidden="true" />

          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

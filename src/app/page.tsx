'use client'

import { useState, useCallback } from 'react'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Education from '@/components/Education'
import Projects from '@/components/Projects'
import Skills from '@/components/Skills'
import Certifications from '@/components/Certifications'
import Internships from '@/components/Internships'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import IntroAnimation from '@/components/IntroAnimation'
import Marquee from '@/components/Marquee'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  return (
    <>
      {/* Intro Animation — shown once on page load */}
      {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

      {/* Custom Cursor — desktop only */}
      <CustomCursor />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      <main className={`min-h-screen transition-opacity duration-700 ${introComplete ? 'opacity-100' : 'opacity-0'}`}>
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <Education />
        <Marquee />
        <Internships />
        <Projects />
        <Marquee />
        <Skills />
        <Certifications />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

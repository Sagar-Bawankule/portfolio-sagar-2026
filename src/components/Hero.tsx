'use client'

import { Download, Mail, ArrowDownRight, ArrowRight } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

interface HeroData {
  name: string
  tagline: string
  description: string
  resumeUrl: string
}

export default function Hero() {
  const [heroData, setHeroData] = useState<HeroData | null>(null)
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const response = await fetch('/api/hero')
        const data = await response.json()
        if (data.success && data.data) {
          setHeroData(data.data)
        }
      } catch (err) {
        console.error('Error fetching hero:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHero()
  }, [])

  const displayData = heroData || {
    name: "Sagar Bawankule",
    tagline: "Full Stack Developer & AI Enthusiast",
    description: "Available for work",
    resumeUrl: "/resume.pdf"
  }

  const fadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section
      className={`w-full min-h-screen flex items-center justify-center relative overflow-hidden transition-colors duration-400 ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="home"
    >
      {/* Subtle ambient — single, no heavy blur */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full ${isDark ? 'bg-[#d4a853]/6' : 'bg-[#c47a4a]/4'}`}
          style={{ filter: 'blur(60px)' }}
        />
      </div>

      <div className="container mx-auto px-5 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Tagline / Introduction */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.1}
            className="mb-4 sm:mb-6 flex items-center gap-3"
          >
            <span className={`font-serif italic text-lg sm:text-2xl ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
              hello
            </span>
            <div className={`h-px w-10 sm:w-12 ${isDark ? 'bg-[#d4a853]/30' : 'bg-[#c47a4a]/30'}`} />
          </motion.div>

          {/* Main Headline — simple fade up, no letter-by-letter */}
          <motion.div
            className="relative mb-6 sm:mb-10"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
              <h1 className={`font-serif font-black text-[clamp(2.8rem,10vw,11rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-white' : 'text-[#1a1612]'}`}>
                WELCOME
              </h1>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={0.5}
                className="lg:pb-6 lg:text-right"
              >
                <p className={`font-serif italic text-xl sm:text-2xl xl:text-3xl ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                  to my portfolio
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Navigation / Actions */}
          <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 sm:gap-8 mt-8 sm:mt-12 border-t pt-6 sm:pt-10 ${isDark ? 'border-white/5' : 'border-black/8'}`}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.6}
              className="flex flex-col gap-4 sm:gap-5"
            >
              <a
                href={displayData.resumeUrl}
                download
                className={`group relative flex items-center gap-3 text-base sm:text-lg font-medium transition-colors duration-300 ${isDark
                  ? 'text-white hover:text-[#d4a853]'
                  : 'text-[#1a1612] hover:text-[#c47a4a]'
                }`}
              >
                <span className="relative pb-1">
                  Download Resume
                  <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-400 group-hover:w-full ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`} />
                </span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-300" />
              </a>

              <a
                href="#contact"
                className={`group relative flex items-center gap-3 text-base sm:text-lg font-medium transition-colors duration-300 ${isDark
                  ? 'text-white hover:text-[#d4a853]'
                  : 'text-[#1a1612] hover:text-[#c47a4a]'
                }`}
              >
                <span className="relative pb-1">
                  Work With Me
                  <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-400 group-hover:w-full ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`} />
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0.8}
              className="sm:text-right"
            >
              <h2 className={`text-sm font-mono tracking-[0.3em] uppercase mb-2 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                {displayData.name}
              </h2>
              <p className={`max-w-xs text-sm font-light leading-relaxed ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                Specializing in building intelligent digital solutions with modern web standards.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className={`text-[10px] uppercase tracking-[0.3em] font-medium ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>Scroll</span>
        <div
          className={`w-[1px] h-8 sm:h-10 bg-gradient-to-b to-transparent ${isDark ? 'from-[#d4a853]' : 'from-[#c47a4a]'}`}
        />
      </motion.div>
    </section>
  )
}

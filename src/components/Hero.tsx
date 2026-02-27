'use client'

import { Download, Mail, ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { motion, useTransform, AnimatePresence, useScroll, useSpring } from 'framer-motion'
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
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-driven compress-in-place effect (simplified — no blur filter)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.5 })

  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.88])
  const heroOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0])
  const heroBorderRadius = useTransform(smoothProgress, [0, 0.9], [0, 32])

  // Tech stack rotator
  const techStack = [
    { name: "React", color: isDark ? "text-sky-400" : "text-sky-600" },
    { name: "Next.js", color: isDark ? "text-white" : "text-[#1a1612]" },
    { name: "TypeScript", color: isDark ? "text-blue-400" : "text-blue-600" },
    { name: "Node.js", color: isDark ? "text-green-400" : "text-green-600" },
    { name: "MongoDB", color: isDark ? "text-emerald-400" : "text-emerald-600" }
  ]

  const [activeTechIndex, setActiveTechIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTechIndex((prev) => (prev + 1) % techStack.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

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

  const welcomeText = "WELCOME"

  // Staggered letter animation variants
  const letterVariants = {
    hidden: {
      opacity: 0,
      y: 80,
      rotateX: -60,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1.2,
        delay: 0.5 + i * 0.08,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-screen z-0"
    >
      <motion.section
        className={`w-full h-full flex items-center justify-center relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
        id="home"
        style={{
          scale: heroScale,
          opacity: heroOpacity,
          borderRadius: heroBorderRadius,
          transformOrigin: 'center center',
        }}
      >
        {/* Subtle ambient orbs (static CSS, no framer-motion animation) */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full ${isDark ? 'bg-[#d4a853]/8' : 'bg-[#c47a4a]/6'}`}
            style={{ filter: 'blur(120px)' }}
          />
          <div
            className={`absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full ${isDark ? 'bg-[#c47a4a]/6' : 'bg-[#d4a853]/5'}`}
            style={{ filter: 'blur(100px)' }}
          />
        </div>

        <div className="container mx-auto px-5 sm:px-12 lg:px-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Tagline / Introduction */}
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={0.2}
              className="mb-4 sm:mb-6 flex items-center gap-3 sm:gap-4"
            >
              <span className={`font-serif italic text-lg sm:text-2xl ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                hello
              </span>
              <div className={`h-px w-10 sm:w-12 ${isDark ? 'bg-[#d4a853]/30' : 'bg-[#c47a4a]/30'}`} />
              {/* Rotating Tech Stack */}
              <div className="h-7 sm:h-8 overflow-hidden relative w-36 sm:w-48">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeTechIndex}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`absolute left-0 text-xs sm:text-sm font-mono tracking-widest uppercase ${techStack[activeTechIndex].color}`}
                  >
                    {techStack[activeTechIndex].name}
                  </motion.span>
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Main Typographic Headline */}
            <div className="relative mb-8 sm:mb-12">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
                <div
                  className="flex flex-nowrap overflow-hidden relative"
                  style={{ perspective: '1200px' }}
                >
                  {welcomeText.split('').map((letter, i) => (
                    <motion.span
                      key={i}
                      custom={i}
                      variants={letterVariants}
                      initial="hidden"
                      animate="visible"
                      className={`font-serif font-black text-[clamp(3.2rem,12vw,13rem)] leading-[0.8] tracking-[-0.03em] select-none ${isDark ? 'text-white' : 'text-[#1a1612]'}`}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1.8}
                  className="lg:pb-8 lg:text-right"
                >
                  <div className="flex flex-col items-start lg:items-end gap-2">
                    <p className={`font-serif italic text-2xl sm:text-3xl xl:text-4xl ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                      to my portfolio
                    </p>
                    <motion.div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-sm ${isDark
                        ? 'bg-white/5 border-white/10'
                        : 'bg-black/5 border-black/10'
                      }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className={`w-3 h-3 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`} />
                      <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                        Premium Experience
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Navigation / Actions */}
            <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 sm:gap-10 mt-12 sm:mt-16 border-t pt-8 sm:pt-12 ${isDark ? 'border-white/5' : 'border-black/8'}`}>
              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={2.2}
                className="flex flex-col gap-5 sm:gap-6"
              >
                <a
                  href={displayData.resumeUrl}
                  download
                  className={`group relative flex items-center gap-3 sm:gap-4 text-lg sm:text-xl font-medium transition-all duration-500 hover-sweep ${isDark
                    ? 'text-white hover:text-[#d4a853]'
                    : 'text-[#1a1612] hover:text-[#c47a4a]'
                  }`}
                >
                  <span className="relative pb-1">
                    Download Resume
                    <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`} />
                  </span>
                  <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
                </a>

                <a
                  href="#contact"
                  className={`group relative flex items-center gap-3 sm:gap-4 text-lg sm:text-xl font-medium transition-all duration-500 hover-sweep ${isDark
                    ? 'text-white hover:text-[#d4a853]'
                    : 'text-[#1a1612] hover:text-[#c47a4a]'
                  }`}
                >
                  <span className="relative pb-1">
                    Work With Me
                    <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-500 group-hover:w-full ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`} />
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>
              </motion.div>

              <motion.div
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                custom={2.5}
                className="sm:text-right"
              >
                <h2 className={`text-sm font-mono tracking-[0.4em] uppercase mb-2 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                  {displayData.name}
                </h2>
                <p className={`max-w-xs text-sm font-light leading-relaxed ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                  Specializing in building intelligent digital solutions with high-end magazine aesthetics and modern web standards.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Background Decorative Line */}
        <motion.div
          className={`absolute bottom-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent to-transparent ${isDark ? 'via-white/5' : 'via-black/5'}`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2, delay: 2 }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <span className={`text-[10px] uppercase tracking-[0.4em] font-medium ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>Scroll</span>
          <motion.div
            className="w-[1px] h-10 sm:h-12 bg-gradient-to-b from-[#d4a853] to-transparent"
            animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ originY: 0 }}
          />
        </motion.div>
      </motion.section>
    </div>
  )
}

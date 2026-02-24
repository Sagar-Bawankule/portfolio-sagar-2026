'use client'

import { Download, Mail, ArrowDownRight, ArrowRight, Sparkles } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useScroll } from 'framer-motion'
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
  const [hoveredLetter, setHoveredLetter] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll-driven compress-in-place effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Smooth the scroll progress with a spring so motion feels organic
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20, mass: 0.5 })

  const heroScale = useTransform(smoothProgress, [0, 1], [1, 0.82])
  const heroOpacity = useTransform(smoothProgress, [0, 0.65], [1, 0])
  const heroBorderRadius = useTransform(smoothProgress, [0, 0.9], [0, 36])
  const heroBlur = useTransform(smoothProgress, [0, 0.7], [0, 18])

  // Tech stack as requested
  const techStack = [
    { name: "React", color: "text-sky-400" },
    { name: "Next.js", color: "text-white" },
    { name: "TypeScript", color: "text-blue-500" },
    { name: "Node.js", color: "text-green-500" },
    { name: "MongoDB", color: "text-emerald-500" }
  ]

  const [activeTechIndex, setActiveTechIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTechIndex((prev) => (prev + 1) % techStack.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Mouse position for interactive effects
  const mouseX = useMotionValue(0.5)
  const mouseY = useMotionValue(0.5)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width)
        mouseY.set((e.clientY - rect.top) / rect.height)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

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
      y: 100,
      rotateX: -90,
      filter: 'blur(20px)',
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.5,
        delay: 0.5 + i * 0.1,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 1.2,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  }

  // Parallax offsets
  const bgOffsetX = useTransform(smoothMouseX, [0, 1], [-30, 30])
  const bgOffsetY = useTransform(smoothMouseY, [0, 1], [-20, 20])

  return (
    <div
      ref={containerRef}
      className="sticky top-0 h-screen z-0"
    >
    <motion.section
      className="w-full h-full flex items-center justify-center relative overflow-hidden bg-black"
      id="home"
      style={{
        scale: heroScale,
        opacity: heroOpacity,
        borderRadius: heroBorderRadius,
        filter: useTransform(heroBlur, (v) => `blur(${v}px)`),
        transformOrigin: 'center center',
      }}
    >
      {/* Cinematic Smoke / Blur blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] bg-[#d4a853]/10"
          style={{ x: bgOffsetX, y: bgOffsetY }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] bg-[#c47a4a]/8"
          style={{ x: useTransform(smoothMouseX, [0, 1], [30, -30]), y: useTransform(smoothMouseY, [0, 1], [20, -20]) }}
        />
      </div>

      {/* Cinematic scanline texture */}
      <div className="scanline-overlay" aria-hidden="true" />

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Tagline / Introduction */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            custom={0.2}
            className="mb-6 flex items-center gap-4"
          >
            <span className="font-serif italic text-xl sm:text-2xl text-[#a89f94]">
              hello
            </span>
            <div className="h-px w-12 bg-[#d4a853]/30" />
            {/* Rotating Tech Stack */}
            <div className="h-8 overflow-hidden relative w-48">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeTechIndex}
                  initial={{ y: 20, opacity: 0, filter: 'blur(5px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -20, opacity: 0, filter: 'blur(5px)' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`absolute left-0 text-sm font-mono tracking-widest uppercase ${techStack[activeTechIndex].color}`}
                >
                  {techStack[activeTechIndex].name}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Main Typographic Headline */}
          <div className="relative mb-12">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              <div
                className="flex flex-nowrap overflow-hidden"
                style={{ perspective: '1200px' }}
              >
                {welcomeText.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className={`font-serif font-black text-[clamp(4rem,13vw,13rem)] leading-[0.8] tracking-[-0.03em] select-none cursor-default transition-all duration-700 ${
                      hoveredLetter === i
                        ? 'text-[#d4a853] hero-letter-glow-active'
                        : 'text-white hero-letter-glow'
                    }`}
                    onMouseEnter={() => setHoveredLetter(i)}
                    onMouseLeave={() => setHoveredLetter(null)}
                    whileHover={{
                      scale: 1.1,
                      y: -10,
                      rotateZ: i % 2 === 0 ? 2 : -2,
                      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                    }}
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
                  <p className="font-serif italic text-3xl xl:text-4xl text-[#a89f94]">
                    to my portfolio
                  </p>
                  <motion.div
                    className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  >
                    <Sparkles className="w-3 h-3 text-[#d4a853]" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#d4a853]">Premium Experience</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigation / Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10 mt-16 border-t border-white/5 pt-12">
            <motion.div
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              custom={2.2}
              className="flex flex-col gap-6"
            >
              <a
                href={displayData.resumeUrl}
                download
                className="group relative flex items-center gap-4 text-xl font-medium text-white transition-colors duration-500 hover:text-[#d4a853]"
              >
                <span className="relative pb-1">
                  Download Resume
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#d4a853] transition-all duration-500 group-hover:w-full" />
                </span>
                <ArrowDownRight className="w-5 h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="group relative flex items-center gap-4 text-xl font-medium text-white transition-colors duration-500 hover:text-[#d4a853]"
              >
                <span className="relative pb-1">
                  Work With Me
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-[#d4a853] transition-all duration-500 group-hover:w-full" />
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
              <h2 className="text-sm font-mono tracking-[0.4em] uppercase text-[#d4a853] mb-2">
                {displayData.name}
              </h2>
              <p className="max-w-xs text-sm font-light leading-relaxed text-[#6b6259]">
                Specializing in building intelligent digital solutions with high-end magazine aesthetics and modern web standards.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Background Decorative Lines */}
      <motion.div
        className="absolute bottom-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 2 }}
      />

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-medium text-[#6b6259]">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-[#d4a853] to-transparent"
          animate={{ scaleY: [0.5, 1, 0.5], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </motion.section>
    </div>
  )
}

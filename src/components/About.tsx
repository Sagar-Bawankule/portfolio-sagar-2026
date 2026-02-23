'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from '@/context/ThemeContext'
import { ArrowRight, Sparkles } from 'lucide-react'

interface AboutData {
  name: string
  title: string
  introduction: string
  quote: string
  coreTechnologies: string[]
  profileImage: string
}

const defaultAboutData: AboutData = {
  name: "Sagar Vinod Bawankule",
  title: "AI & Software Developer",
  introduction: "I am a passionate AI and Software Developer currently pursuing B.Tech in Artificial Intelligence at G.H. Raisoni College of Engineering, Nagpur. With a strong foundation in computer technology and a keen interest in cutting-edge technologies, I specialize in building intelligent applications and full-stack web solutions.",
  quote: "Building the future with AI, one line of code at a time.",
  coreTechnologies: ["Python", "Machine Learning", "Deep Learning", "React", "Next.js", "Node.js", "TypeScript", "MongoDB"],
  profileImage: "/profilephoto.webp"
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
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

export default function About() {
  const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData)
  const [loading, setLoading] = useState(true)
  const [hoveredTech, setHoveredTech] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const response = await fetch('/api/about')
        const data = await response.json()
        if (data.success && data.data) {
          setAboutData(data.data)
        }
      } catch (err) {
        console.error('Error fetching about:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAbout()
  }, [])

  if (loading) {
    return (
      <section className="min-h-screen relative" id="about">
        <div className="container mx-auto px-6 py-32">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="h-20 bg-white/5 rounded w-96 mb-16" />
            <div className="grid lg:grid-cols-2 gap-20">
              <div className="h-[500px] bg-white/5 rounded-2xl" />
              <div className="space-y-6">
                <div className="h-6 bg-white/5 rounded w-full" />
                <div className="h-6 bg-white/5 rounded w-3/4" />
                <div className="h-6 bg-white/5 rounded w-1/2" />
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const aboutHeading = "ABOUT"

  return (
    <section
      className={`relative py-32 overflow-hidden ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="about"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[150px] ${isDark ? 'bg-[#d4a853]/5' : 'bg-[#c47a4a]/3'}`}
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className={`absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] ${isDark ? 'bg-[#c47a4a]/4' : 'bg-[#d4a853]/3'}`}
          animate={{ x: [0, -15, 0], y: [0, 20, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Editorial Section Header */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="section-label">01 &mdash; get to know</span>
            </motion.div>

            {/* Big Serif Heading — same style as Hero */}
            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {aboutHeading.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif font-black text-[clamp(4rem,13vw,11rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Main Content Grid — Photo + Text */}
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">

            {/* Left Column — Photo (editorial framing) */}
            <motion.div
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="relative group">
                {/* Warm ambient glow */}
                <motion.div
                  className={`absolute -inset-6 rounded-3xl blur-3xl ${isDark ? 'bg-[#d4a853]/8' : 'bg-[#c47a4a]/5'}`}
                  animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.03, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Photo Container */}
                <div className="relative overflow-hidden rounded-2xl">
                  {/* Gradient border top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#d4a853] via-[#c47a4a] to-[#e8985a] z-10" />

                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={aboutData.profileImage || "/profilephoto.webp"}
                      alt={`${aboutData.name} — ${aboutData.title}`}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      priority
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />

                    {/* Cinematic overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className={`absolute inset-0 ${isDark ? 'bg-[#d4a853]/3' : 'bg-[#c47a4a]/3'} mix-blend-overlay`} />

                    {/* Bottom overlay with name */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                      >
                        <p className="text-[10px] uppercase tracking-[0.4em] font-mono text-[#d4a853] mb-2">
                          {aboutData.title}
                        </p>
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                          {aboutData.name}
                        </h3>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <motion.div
                  className={`absolute -bottom-4 -right-4 flex items-center gap-2 px-4 py-2.5 rounded-full backdrop-blur-md shadow-lg border ${isDark
                    ? 'bg-[#0c0a09]/80 border-[#d4a853]/20 text-[#d4a853]'
                    : 'bg-white/90 border-[#c47a4a]/20 text-[#c47a4a]'
                    }`}
                  initial={{ scale: 0, rotate: 10 }}
                  whileInView={{ scale: 1, rotate: -2 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1, type: 'spring', bounce: 0.4 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                >
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs font-bold tracking-wide">Available for Work</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column — Content (editorial typography) */}
            <motion.div
              className="lg:col-span-7 space-y-12"
              initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Introduction */}
              <div>
                <p className={`text-xl sm:text-2xl leading-[1.7] font-light ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                  {aboutData.introduction}
                </p>
              </div>

              {/* Editorial Quote — full width, big italic serif */}
              <motion.div
                className={`relative py-8 border-y ${isDark ? 'border-[#d4a853]/10' : 'border-[#c47a4a]/10'}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7, duration: 1 }}
              >
                <p className={`font-serif italic text-3xl sm:text-4xl leading-[1.3] ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}>
                  &ldquo;{aboutData.quote}&rdquo;
                </p>
                <motion.div
                  className="absolute -top-3 -left-2 w-8 h-8 text-[#d4a853]/20 font-serif text-6xl leading-none select-none"
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  &ldquo;
                </motion.div>
              </motion.div>

              {/* Core Technologies — editorial minimal style */}
              <div>
                <motion.div
                  className="flex items-center gap-4 mb-8"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  <span className={`text-[10px] uppercase tracking-[0.4em] font-mono ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                    Core Technologies
                  </span>
                  <div className={`h-px flex-1 ${isDark ? 'bg-[#d4a853]/10' : 'bg-[#c47a4a]/10'}`} />
                </motion.div>

                <div className="flex flex-wrap gap-4">
                  {aboutData.coreTechnologies.map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + index * 0.05, duration: 0.6 }}
                      onMouseEnter={() => setHoveredTech(index)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`relative text-lg font-medium cursor-default transition-all duration-500 pb-1 ${hoveredTech === index
                        ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                        : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                        }`}
                      whileHover={{ y: -3 }}
                    >
                      {tech}
                      {/* Underline on hover */}
                      <motion.span
                        className={`absolute bottom-0 left-0 h-px ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`}
                        initial={{ width: 0 }}
                        animate={{ width: hoveredTech === index ? '100%' : 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                      {index < aboutData.coreTechnologies.length - 1 && (
                        <span className={`ml-4 ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>·</span>
                      )}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Bottom CTA line — editorial */}
              <motion.div
                className={`flex items-center justify-between pt-8 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2 }}
              >
                <a
                  href="#projects"
                  className={`group flex items-center gap-3 text-lg font-medium transition-colors duration-500 ${isDark ? 'text-[#f5f0eb] hover:text-[#d4a853]' : 'text-[#1a1612] hover:text-[#c47a4a]'}`}
                >
                  <span className="relative pb-1">
                    View My Work
                    <span className={`absolute bottom-0 left-0 w-0 h-px ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'} transition-all duration-500 group-hover:w-full`} />
                  </span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </a>

                <div className={`flex items-center gap-2 text-sm font-light ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                  <Sparkles className={`w-4 h-4 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`} />
                  <span>Crafting since 2021</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

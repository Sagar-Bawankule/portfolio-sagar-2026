'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ExternalLink, Github, Brain, Leaf, Zap, Monitor, ArrowUpRight } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useTheme } from '@/context/ThemeContext'

interface Project {
  _id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image?: string
  featured: boolean
  status?: string
  icon?: string
  color?: string
}

const iconMap: Record<string, any> = {
  Brain,
  Leaf,
  Zap,
  Monitor,
}

// Per-project accent colors — cycles through the palette
const PROJECT_COLORS = [
  { dark: '#2dd4bf', light: '#0d9488', glow: 'rgba(45,212,191,0.06)' },  // teal
  { dark: '#d4a853', light: '#c47a4a', glow: 'rgba(212,168,83,0.06)' },  // gold
  { dark: '#c084fc', light: '#7c3aed', glow: 'rgba(192,132,252,0.06)' }, // violet
  { dark: '#fb7185', light: '#e11d48', glow: 'rgba(251,113,133,0.06)' }, // rose
  { dark: '#818cf8', light: '#4f46e5', glow: 'rgba(129,140,248,0.06)' }, // indigo
  { dark: '#fbbf24', light: '#d97706', glow: 'rgba(251,191,36,0.06)' },  // amber
]

// — Scroll-driven featured project row —
function FeaturedRow({
  project, index, isDark, hoveredIndex, setHoveredIndex, accentColor
}: {
  project: Project
  index: number
  isDark: boolean
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
  accentColor: { dark: string; light: string; glow: string }
}) {
  const IconComponent = project.icon ? (iconMap[project.icon] || Zap) : Zap
  const rowRef = useRef<HTMLDivElement>(null)
  const accent = isDark ? accentColor.dark : accentColor.light

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start 0.9', 'start 0.2'],
  })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 55, damping: 22, mass: 0.5 })

  // Title slides in from left
  const titleX = useTransform(smoothProgress, [0, 1], [-60, 0])
  const titleOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1])

  // Stack slides in from right
  const stackX = useTransform(smoothProgress, [0, 1], [60, 0])
  const stackOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1])

  // Number scales up from tiny
  const numScale = useTransform(smoothProgress, [0, 1], [0.3, 1])
  const numOpacity = useTransform(smoothProgress, [0, 0.6], [0, 1])

  // Row itself fades in
  const rowOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1])

  const isHovered = hoveredIndex === index

  return (
    <motion.div
      ref={rowRef}
      style={{
        opacity: rowOpacity,
        borderColor: isHovered ? `${accent}33` : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
      }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      data-cursor="view"
      className="group relative overflow-hidden border-t transition-colors duration-500"
    >
      {/* Colored hover sweep background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{ background: `linear-gradient(135deg, ${accentColor.glow} 0%, transparent 60%)` }}
      />

      <div className="py-6 sm:py-10 grid grid-cols-12 gap-6 lg:gap-10 items-start">

        {/* Number — scales up on scroll */}
        <motion.div
          className="col-span-1 hidden sm:block"
          style={{ scale: numScale, opacity: numOpacity }}
        >
          <span
            className="text-sm font-mono transition-colors duration-500"
            style={{ color: isHovered ? accent : isDark ? '#6b6259' : '#8a8178' }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
        </motion.div>

        {/* Title & Description — slides from left */}
        <motion.div
          className="col-span-12 sm:col-span-5"
          style={{ x: titleX, opacity: titleOpacity }}
        >
          <div className="flex items-center gap-3 mb-3">
            <h3
              className="text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-500"
              style={{ color: isHovered ? accent : isDark ? '#f5f0eb' : '#1a1612' }}
            >
              {project.title}
            </h3>
            {project.status && (
              <span
                className="text-[10px] font-mono uppercase tracking-widest flex items-center gap-1.5 px-2 py-0.5 rounded-full border"
                style={{
                  color: accent,
                  borderColor: `${accent}40`,
                  backgroundColor: `${accent}10`,
                  boxShadow: isHovered ? `0 0 10px ${accent}30` : 'none',
                  transition: 'box-shadow 0.4s ease',
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ backgroundColor: accent }}
                />
                {project.status}
              </span>
            )}
          </div>
          <p className={`text-base font-light leading-relaxed ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
            {project.description}
          </p>
        </motion.div>

        {/* Technologies — slides from right */}
        <motion.div
          className="col-span-12 sm:col-span-4"
          style={{ x: stackX, opacity: stackOpacity }}
        >
          <p className="text-[10px] uppercase tracking-[0.3em] font-mono mb-3" style={{ color: accent }}>
            Stack
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className={`text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#a89f94] hover:text-[#f5f0eb]' : 'text-[#5c5449] hover:text-[#1a1612]'}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          className="col-span-12 sm:col-span-2 flex sm:flex-col sm:items-end gap-4 relative z-20"
          style={{ opacity: titleOpacity }}
        >
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#a89f94] hover:text-[#d4a853]' : 'text-[#5c5449] hover:text-[#c47a4a]'}`}
              whileHover={{ x: 3 }}
            >
              <span className="relative pb-0.5">
                Code
                <span className={`absolute bottom-0 left-0 w-full h-px ${isDark ? 'bg-[#6b6259]/30' : 'bg-[#8a8178]/30'}`} />
              </span>
              <Github className="w-4 h-4" />
            </motion.a>
          )}
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#f5f0eb] hover:text-[#d4a853]' : 'text-[#1a1612] hover:text-[#c47a4a]'}`}
              whileHover={{ x: 3 }}
            >
              <span className="relative pb-0.5">
                Live
                <span className={`absolute bottom-0 left-0 w-full h-px ${isDark ? 'bg-[#d4a853]/40' : 'bg-[#c47a4a]/40'}`} />
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          )}
        </motion.div>
      </div>

      {/* Hover image reveal */}
      {project.image && (
        <motion.div
          className="absolute top-0 right-4 h-full w-56 sm:w-72 pointer-events-none z-10"
          initial={{ x: '110%', opacity: 0 }}
          animate={{ x: isHovered ? '0%' : '110%', opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative h-full w-full">
            <Image src={project.image} alt={project.title} fill className="object-cover" sizes="288px" />
            <div className={`absolute inset-y-0 left-0 w-28 bg-gradient-to-r ${isDark ? 'from-[#080604]' : 'from-[#faf8f5]'} to-transparent`} />
            <div className={`absolute inset-y-0 right-0 w-16 bg-gradient-to-l ${isDark ? 'from-[#080604]' : 'from-[#faf8f5]'} to-transparent`} />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#d4a853]/60 to-transparent" />
          </div>
        </motion.div>
      )}

      {/* Hover bottom line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px]"
        style={{ backgroundColor: accent }}
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const rowRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        const data = await response.json()
        if (data.success) {
          setProjects(data.data)
        }
      } catch (err) {
        console.error('Error fetching projects:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  if (loading) {
    return (
      <section className={`relative py-32 ${isDark ? 'bg-[#0f0d0a]' : 'bg-[#f5f2ed]'}`} id="projects">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="h-20 bg-white/5 rounded w-96 mb-20" />
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-white/3 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`relative py-12 sm:py-16 lg:py-20 overflow-hidden ${isDark ? 'bg-[#0f0d0a]' : 'bg-[#f5f2ed]'}`}
      id="projects"
    >
      {/* Section top divider */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-[#4f46e5]/22 to-transparent'}`} />

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full ${isDark ? 'bg-[#818cf8]/8' : 'bg-[#4f46e5]/5'}`}
          style={{ filter: 'blur(120px)' }}
        />
        <div
          className={`absolute bottom-0 left-1/4 w-[250px] h-[250px] rounded-full ${isDark ? 'bg-[#6366f1]/5' : 'bg-[#6366f1]/3'}`}
          style={{ filter: 'blur(100px)' }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Editorial Section Header */}
          <div className="mb-8 sm:mb-10 lg:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="section-label">04 &mdash; selected work</span>
            </motion.div>

            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {"PROJECTS".split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif font-black text-[clamp(2.2rem,8vw,7rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Featured Projects — Scroll-driven rows */}
          <div className="space-y-0 mb-16">
            {featuredProjects.map((project, index) => (
              <FeaturedRow
                key={project._id}
                project={project}
                index={index}
                isDark={isDark}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
                accentColor={PROJECT_COLORS[index % PROJECT_COLORS.length]}
              />
            ))}
            <div className={`border-t ${isDark ? 'border-white/5' : 'border-black/5'}`} />
          </div>

          {/* Other Projects — Compact Grid */}
          {otherProjects.length > 0 && (
            <div>
              <motion.div
                className="flex items-center gap-4 mb-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
              >
                <span className={`text-[10px] uppercase tracking-[0.4em] font-mono ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                  More Projects
                </span>
                <div className={`h-px flex-1 ${isDark ? 'bg-[#d4a853]/10' : 'bg-[#c47a4a]/10'}`} />
              </motion.div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30, rotateX: 10 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    style={{ transformPerspective: 800 }}
                    whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
                    className={`group relative p-6 rounded-xl border transition-colors duration-500 ${isDark
                      ? 'border-white/5 hover:border-[#d4a853]/25 bg-white/[0.01] hover:bg-white/[0.03]'
                      : 'border-black/5 hover:border-[#c47a4a]/25 bg-black/[0.01] hover:bg-black/[0.03]'
                    }`}
                  >
                    {/* Animated gold top border on hover */}
                    <motion.div
                      className={`absolute top-0 left-0 h-[2px] rounded-t-xl ${isDark ? 'bg-gradient-to-r from-[#d4a853] to-[#c47a4a]' : 'bg-gradient-to-r from-[#c47a4a] to-[#d4a853]'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '40%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: index * 0.1 + 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <h4 className={`text-lg font-bold tracking-tight mb-2 transition-colors duration-300 ${isDark
                      ? 'text-[#f5f0eb] group-hover:text-[#d4a853]'
                      : 'text-[#1a1612] group-hover:text-[#c47a4a]'
                    }`}>
                      {project.title}
                    </h4>
                    <p className={`text-sm font-light leading-relaxed mb-4 line-clamp-2 ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className={`text-xs ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className={`text-xs ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-4">
                      {project.githubUrl && (
                        <motion.a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className={`text-xs transition-colors ${isDark ? 'text-[#6b6259] hover:text-[#d4a853]' : 'text-[#8a8178] hover:text-[#c47a4a]'}`}
                          whileHover={{ scale: 1.2 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.a>
                      )}
                      {project.liveUrl && (
                        <motion.a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className={`text-xs transition-colors ${isDark ? 'text-[#6b6259] hover:text-[#d4a853]' : 'text-[#8a8178] hover:text-[#c47a4a]'}`}
                          whileHover={{ scale: 1.2, rotate: -10 }}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </motion.a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Projects

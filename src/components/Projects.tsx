'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github, Brain, Leaf, Zap, Monitor, ArrowUpRight } from 'lucide-react'
import { useEffect, useState } from 'react'
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

// — Simple whileInView featured project row (no per-row scroll listeners) —
function FeaturedRow({
  project, index, isDark, hoveredIndex, setHoveredIndex
}: {
  project: Project
  index: number
  isDark: boolean
  hoveredIndex: number | null
  setHoveredIndex: (i: number | null) => void
}) {
  const IconComponent = project.icon ? (iconMap[project.icon] || Zap) : Zap
  const isHovered = hoveredIndex === index

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
      data-cursor="view"
      className={`group relative overflow-hidden border-t transition-all duration-500 ${isDark ? 'border-white/10 hover:border-[#818cf8]/25' : 'border-black/8 hover:border-[#4f46e5]/25'}`}
    >
      <div className="py-4 sm:py-6 grid grid-cols-12 gap-4 lg:gap-8 items-start">

        {/* Number */}
        <div className="col-span-1 hidden sm:block">
          <span className={`text-sm font-mono transition-colors duration-500 ${isHovered
            ? isDark ? 'text-[#818cf8]' : 'text-[#4f46e5]'
            : isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'
          }`}>
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>

        {/* Title & Description */}
        <div className="col-span-12 sm:col-span-5">
          <div className="flex items-center gap-3 mb-3">
            <h3 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-500 ${isHovered
              ? isDark ? 'text-[#818cf8]' : 'text-[#4f46e5]'
              : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
            }`}>
              {project.title}
            </h3>
            {project.status && (
              <span className="text-emerald-400 text-[10px] font-mono uppercase tracking-widest flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                {project.status}
              </span>
            )}
          </div>
          <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
            {project.description}
          </p>
        </div>

        {/* Technologies */}
        <div className="col-span-12 sm:col-span-4">
          <p className={`text-[10px] uppercase tracking-[0.3em] font-mono mb-3 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
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
        </div>

        {/* Links */}
        <div className="col-span-12 sm:col-span-2 flex sm:flex-col sm:items-end gap-4 relative z-20">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#a89f94] hover:text-[#d4a853]' : 'text-[#5c5449] hover:text-[#c47a4a]'}`}
            >
              <span className="relative pb-0.5">
                Code
                <span className={`absolute bottom-0 left-0 w-full h-px ${isDark ? 'bg-[#6b6259]/30' : 'bg-[#8a8178]/30'}`} />
              </span>
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/link inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#f5f0eb] hover:text-[#d4a853]' : 'text-[#1a1612] hover:text-[#c47a4a]'}`}
            >
              <span className="relative pb-0.5">
                Live
                <span className={`absolute bottom-0 left-0 w-full h-px ${isDark ? 'bg-[#d4a853]/40' : 'bg-[#c47a4a]/40'}`} />
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Hover image reveal — CSS transition only */}
      {project.image && (
        <div
          className={`absolute top-0 right-4 h-full w-56 sm:w-72 pointer-events-none z-10 transition-all duration-500 ease-out ${isHovered ? 'translate-x-0 opacity-100' : 'translate-x-[110%] opacity-0'}`}
        >
          <div className="relative h-full w-full">
            <Image src={project.image} alt={project.title} fill className="object-cover" sizes="288px" />
            <div className={`absolute inset-y-0 left-0 w-28 bg-gradient-to-r ${isDark ? 'from-[#080604]' : 'from-[#faf8f5]'} to-transparent`} />
            <div className={`absolute inset-y-0 right-0 w-16 bg-gradient-to-l ${isDark ? 'from-[#080604]' : 'from-[#faf8f5]'} to-transparent`} />
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#818cf8]/60 to-transparent" />
          </div>
        </div>
      )}

      {/* Hover bottom line — CSS only */}
      <div
        className={`absolute bottom-0 left-0 h-[1px] transition-all duration-500 ease-out ${isDark ? 'bg-[#818cf8]' : 'bg-[#4f46e5]'} ${isHovered ? 'w-full' : 'w-0'}`}
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
      className={`relative py-8 sm:py-10 lg:py-14 overflow-hidden ${isDark ? 'bg-[#0f0d0a]' : 'bg-[#f5f2ed]'}`}
      id="projects"
    >
      {/* Section top divider */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#818cf8]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-[#4f46e5]/22 to-transparent'}`} />

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full ${isDark ? 'bg-[#818cf8]/8' : 'bg-[#4f46e5]/5'}`}
          style={{ filter: 'blur(80px)' }}
        />
        <div
          className={`absolute bottom-0 left-1/4 w-[250px] h-[250px] rounded-full ${isDark ? 'bg-[#6366f1]/5' : 'bg-[#6366f1]/3'}`}
          style={{ filter: 'blur(80px)' }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Editorial Section Header */}
          <div className="mb-5 sm:mb-6 lg:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="section-label">04 &mdash; selected work</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`font-serif font-black text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
            >
              PROJECTS
            </motion.h2>
          </div>

          {/* Featured Projects — Scroll-driven rows */}
          <div className="space-y-0 mb-8">
            {featuredProjects.map((project, index) => (
              <FeaturedRow
                key={project._id}
                project={project}
                index={index}
                isDark={isDark}
                hoveredIndex={hoveredIndex}
                setHoveredIndex={setHoveredIndex}
              />
            ))}
            <div className={`border-t ${isDark ? 'border-white/10' : 'border-black/8'}`} />
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

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherProjects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className={`group relative p-4 rounded-xl border transition-all duration-300 card-glow-indigo ${isDark
                      ? 'border-white/10 hover:border-[#818cf8]/30 bg-white/[0.04] hover:bg-white/[0.07]'
                      : 'border-black/8 hover:border-[#4f46e5]/30 bg-black/[0.03] hover:bg-black/[0.05]'
                    }`}
                  >
                    {/* Animated gold top border on hover */}
                    <motion.div
                      className={`absolute top-0 left-0 h-[2px] rounded-t-xl ${isDark ? 'bg-gradient-to-r from-[#818cf8] to-[#6366f1]' : 'bg-gradient-to-r from-[#4f46e5] to-[#818cf8]'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '40%' }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: index * 0.1 + 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <h4 className={`text-lg font-bold tracking-tight mb-2 transition-colors duration-300 ${isDark
                      ? 'text-[#f5f0eb] group-hover:text-[#818cf8]'
                      : 'text-[#1a1612] group-hover:text-[#4f46e5]'
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
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className={`text-xs transition-colors duration-300 ${isDark ? 'text-[#6b6259] hover:text-[#818cf8]' : 'text-[#8a8178] hover:text-[#4f46e5]'}`}
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className={`text-xs transition-colors duration-300 ${isDark ? 'text-[#6b6259] hover:text-[#818cf8]' : 'text-[#8a8178] hover:text-[#4f46e5]'}`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
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

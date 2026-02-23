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
      <section className={`relative py-32 ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`} id="projects">
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
      className={`relative py-32 overflow-hidden ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="projects"
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[150px] ${isDark ? 'bg-[#d4a853]/4' : 'bg-[#c47a4a]/3'}`}
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
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
              <span className="section-label">04 &mdash; selected work</span>
            </motion.div>

            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {"PROJECTS".split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif font-black text-[clamp(4rem,13vw,12rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Featured Projects — Editorial Cards */}
          <div className="space-y-6 mb-24">
            {featuredProjects.map((project, index) => {
              const IconComponent = project.icon ? (iconMap[project.icon] || Zap) : Zap

              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group relative border-t transition-colors duration-500 ${isDark ? 'border-white/5 hover:border-[#d4a853]/20' : 'border-black/5 hover:border-[#c47a4a]/20'}`}
                >
                  <div className="py-10 sm:py-14 grid grid-cols-12 gap-6 lg:gap-10 items-start">

                    {/* Number */}
                    <div className="col-span-1 hidden sm:block">
                      <span className={`text-sm font-mono transition-colors duration-500 ${hoveredIndex === index
                        ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                        : isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'
                        }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="col-span-12 sm:col-span-5">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-500 ${hoveredIndex === index
                          ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
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
                      <p className={`text-base font-light leading-relaxed ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="col-span-12 sm:col-span-4">
                      <p className={`text-[10px] uppercase tracking-[0.3em] font-mono mb-3 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                        Stack
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {project.technologies.map((tech, techIndex) => (
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
                    <div className="col-span-12 sm:col-span-2 flex sm:flex-col sm:items-end gap-4">
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
                    </div>
                  </div>

                  {/* Hover line effect */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-[1px] ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`}
                    initial={{ width: 0 }}
                    animate={{ width: hoveredIndex === index ? '100%' : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              )
            })}
            {/* Final border */}
            <div className={`border-t ${isDark ? 'border-white/5' : 'border-black/5'}`} />
          </div>

          {/* Other Projects — Compact Grid */}
          {otherProjects.length > 0 && (
            <div>
              <motion.div
                className="flex items-center gap-4 mb-12"
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
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    className={`group relative p-6 rounded-xl border transition-all duration-500 ${isDark
                      ? 'border-white/5 hover:border-[#d4a853]/20 bg-white/[0.01] hover:bg-white/[0.02]'
                      : 'border-black/5 hover:border-[#c47a4a]/20 bg-black/[0.01] hover:bg-black/[0.02]'
                      }`}
                  >
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
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className={`text-xs transition-colors ${isDark ? 'text-[#6b6259] hover:text-[#d4a853]' : 'text-[#8a8178] hover:text-[#c47a4a]'}`}>
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className={`text-xs transition-colors ${isDark ? 'text-[#6b6259] hover:text-[#d4a853]' : 'text-[#8a8178] hover:text-[#c47a4a]'}`}>
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

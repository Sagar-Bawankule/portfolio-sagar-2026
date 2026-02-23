'use client'

import { motion } from 'framer-motion'
import { Code2, Database, Brain, Wrench, Cloud, Shield, Zap, Globe } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

interface Skill {
  name: string
  icon: string
  color: string
}

interface SkillCategory {
  _id: string
  title: string
  icon: string
  description: string
  skills: Skill[]
}

const iconMap: Record<string, any> = {
  Code2,
  Database,
  Brain,
  Wrench,
  Cloud,
  Shield,
  Zap,
  Globe
}

const currentlyLearning = [
  { name: "Rust", color: "text-orange-400" },
  { name: "Go", color: "text-cyan-400" },
  { name: "Kubernetes", color: "text-blue-400" },
  { name: "Web3", color: "text-purple-400" },
  { name: "System Design", color: "text-emerald-400" },
]

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills')
        const data = await response.json()
        if (data.success) {
          setSkillCategories(data.data)
        }
      } catch (err) {
        console.error('Error fetching skills:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section className={`relative py-32 ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`} id="skills">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="h-20 bg-white/5 rounded w-80 mb-20" />
            <div className="space-y-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 bg-white/3 rounded" />
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
      id="skills"
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute bottom-1/3 left-0 w-[400px] h-[400px] rounded-full blur-[140px] ${isDark ? 'bg-[#c47a4a]/4' : 'bg-[#d4a853]/3'}`}
          animate={{ x: [0, 20, 0], y: [0, -12, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
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
              <span className="section-label">05 &mdash; technical expertise</span>
            </motion.div>

            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {"SKILLS".split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif font-black text-[clamp(4rem,13vw,12rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Skill Categories — Editorial Accordion Style */}
          <div>
            {skillCategories.map((category, catIndex) => {
              const IconComponent = iconMap[category.icon] || Code2

              return (
                <motion.div
                  key={category._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: catIndex * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredCategory(catIndex)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className={`group relative border-t transition-colors duration-500 ${isDark ? 'border-white/5 hover:border-[#d4a853]/20' : 'border-black/5 hover:border-[#c47a4a]/20'}`}
                >
                  <div className="py-10 sm:py-12">
                    {/* Category Header */}
                    <div className="grid grid-cols-12 gap-6 items-start mb-8">
                      {/* Number */}
                      <div className="col-span-1 hidden sm:block">
                        <span className={`text-sm font-mono transition-colors duration-500 ${hoveredCategory === catIndex
                          ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                          : isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'
                          }`}>
                          {String(catIndex + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Category Name */}
                      <div className="col-span-12 sm:col-span-4">
                        <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-500 ${hoveredCategory === catIndex
                          ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                          : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                          }`}>
                          {category.title}
                        </h3>
                        <p className={`text-sm font-light mt-1 ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                          {category.description}
                        </p>
                      </div>

                      {/* Skills — displayed as editorial text list */}
                      <div className="col-span-12 sm:col-span-7">
                        <div className="flex flex-wrap gap-x-5 gap-y-3">
                          {category.skills.map((skill) => (
                            <motion.span
                              key={skill.name}
                              onMouseEnter={() => setHoveredSkill(skill.name)}
                              onMouseLeave={() => setHoveredSkill(null)}
                              className={`relative text-lg font-medium cursor-default transition-all duration-400 pb-1 ${hoveredSkill === skill.name
                                ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                                : isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'
                                }`}
                              whileHover={{ y: -2 }}
                            >
                              {skill.name}
                              <motion.span
                                className={`absolute bottom-0 left-0 h-px ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`}
                                initial={{ width: 0 }}
                                animate={{ width: hoveredSkill === skill.name ? '100%' : 0 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                              />
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover line effect */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-[1px] ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`}
                    initial={{ width: 0 }}
                    animate={{ width: hoveredCategory === catIndex ? '100%' : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </motion.div>
              )
            })}
            {/* Final bottom border */}
            <div className={`border-t ${isDark ? 'border-white/5' : 'border-black/5'}`} />
          </div>

          {/* Currently Learning — Editorial Bottom Section */}
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <div className="flex items-center gap-4 mb-10">
              <span className={`text-[10px] uppercase tracking-[0.4em] font-mono ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                Currently Exploring
              </span>
              <div className={`h-px flex-1 ${isDark ? 'bg-[#d4a853]/10' : 'bg-[#c47a4a]/10'}`} />
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {currentlyLearning.map((tech, index) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + index * 0.08 }}
                  className={`text-2xl sm:text-3xl font-serif italic cursor-default transition-all duration-500 ${isDark ? 'text-[#6b6259] hover:text-[#d4a853]' : 'text-[#8a8178] hover:text-[#c47a4a]'}`}
                  whileHover={{ y: -4, scale: 1.05 }}
                >
                  {tech.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Skills

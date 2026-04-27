'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Database, Brain, Wrench, Cloud, Shield, Zap, Globe, ChevronUp, ChevronDown } from 'lucide-react'
import { useEffect, useState, useCallback } from 'react'
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
  Code2, Database, Brain, Wrench, Cloud, Shield, Zap, Globe
}

const currentlyLearning = [
  "Rust", "Go", "Kubernetes", "Web3", "System Design", "LLM Fine-tuning", "WebAssembly",
]

const Skills = () => {
  const [skillCategories, setSkillCategories] = useState<SkillCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<number>(0)
  const [direction, setDirection] = useState<1 | -1>(1) // 1 = down/next, -1 = up/prev
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

  // Navigate categories
  const goTo = useCallback((index: number, dir: 1 | -1) => {
    setDirection(dir)
    setActiveCategory(index)
  }, [])

  if (loading) {
    return (
      <section className={`relative py-32 ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`} id="skills">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="h-20 bg-white/5 rounded w-80 mb-20" />
            <div className="flex gap-6">
              <div className="w-64 shrink-0 space-y-3">
                {[1, 2, 3, 4].map(i => <div key={i} className="h-14 bg-white/3 rounded-xl" />)}
              </div>
              <div className="flex-1 h-80 bg-white/3 rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  const active = skillCategories[activeCategory]
  const ActiveIcon = active ? (iconMap[active.icon] || Code2) : Code2

  // Slide variants: direction-aware
  const panelVariants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] },
    }),
  }

  return (
    <section
      className={`relative py-8 sm:py-10 lg:py-14 overflow-hidden ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="skills"
    >
      {/* Section top divider */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#fbbf24]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-[#d97706]/22 to-transparent'}`} />

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full ${isDark ? 'bg-[#fbbf24]/7' : 'bg-[#d97706]/5'}`}
          style={{ filter: 'blur(80px)' }}
        />
        <div
          className={`absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full ${isDark ? 'bg-[#f59e0b]/5' : 'bg-[#b45309]/4'}`}
          style={{ filter: 'blur(80px)' }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-5 sm:mb-6 lg:mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="section-label">05 &mdash; technical expertise</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`font-serif font-black text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
            >
              SKILLS
            </motion.h2>
          </div>

          {/* Main layout: sidebar tabs + panel */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

            {/* --- LEFT: Category tab list --- */}
            <div className="lg:w-64 shrink-0 flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1 scrollbar-none"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {skillCategories.map((cat, i) => {
                const Icon = iconMap[cat.icon] || Code2
                const isActive = activeCategory === i
                return (
                  <motion.button
                    key={cat._id}
                    onClick={() => goTo(i, i > activeCategory ? 1 : -1)}
                    whileHover={{ x: 4 }}
                    className={`relative shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-400 border overflow-hidden ${
                      isActive
                        ? isDark
                          ? 'border-[#fbbf24]/30 bg-[#fbbf24]/[0.07] text-[#fbbf24]'
                          : 'border-[#d97706]/30 bg-[#d97706]/[0.07] text-[#d97706]'
                        : isDark
                          ? 'border-white/8 bg-transparent text-[#6b6259] hover:text-[#a89f94] hover:border-white/12'
                          : 'border-black/8 bg-transparent text-[#8a8178] hover:text-[#5c5449] hover:border-black/12'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeBar"
                        className={`absolute left-0 top-0 h-full w-[3px] rounded-r-full ${isDark ? 'bg-[#fbbf24]' : 'bg-[#d97706]'}`}
                      />
                    )}
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-sm font-semibold tracking-tight whitespace-nowrap">{cat.title}</span>
                    <span className={`ml-auto text-[10px] font-mono shrink-0 ${
                      isActive
                        ? isDark ? 'text-[#fbbf24]/60' : 'text-[#d97706]/60'
                        : isDark ? 'text-[#3a3228]' : 'text-[#d4c5b0]'
                    }`}>
                      {cat.skills.length}
                    </span>
                  </motion.button>
                )
              })}

              {/* Progress dots — desktop only */}
              <div className="hidden lg:flex flex-col items-center gap-1.5 mt-4 pl-1">
                {skillCategories.map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      width: activeCategory === i ? 20 : 6,
                      opacity: activeCategory === i ? 1 : 0.3,
                    }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-1.5 rounded-full cursor-pointer ${isDark ? 'bg-[#fbbf24]' : 'bg-[#d97706]'}`}
                    onClick={() => goTo(i, i > activeCategory ? 1 : -1)}
                  />
                ))}
              </div>
            </div>

            {/* --- RIGHT: Scroll-hijacked panel --- */}
            <div className="flex-1 min-w-0 flex gap-3 items-stretch">

              {/* Panel with AnimatePresence slide */}
              <div
                className="flex-1 min-w-0 relative overflow-hidden rounded-2xl"
              >
                <AnimatePresence custom={direction} mode="wait">
                  {active && (
                    <motion.div
                      key={active._id}
                      custom={direction}
                      variants={panelVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                    >
                      <div
                        className={`group relative overflow-hidden rounded-2xl border p-5 sm:p-6 ${
                          isDark ? 'border-white/10 bg-white/[0.05]' : 'border-black/8 bg-black/[0.04]'
                        }`}
                      >
                        {/* Panel header */}
                        <div className="relative z-10 flex items-start justify-between mb-5">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`p-2 rounded-lg border ${isDark ? 'border-[#fbbf24]/20 bg-[#fbbf24]/8 text-[#fbbf24]' : 'border-[#d97706]/20 bg-[#d97706]/8 text-[#d97706]'}`}>
                                <ActiveIcon className="w-5 h-5" />
                              </div>
                              <h3 className={`text-2xl font-bold tracking-tight ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}>
                                {active.title}
                              </h3>
                            </div>
                            <p className={`text-sm font-light max-w-lg ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                              {active.description}
                            </p>
                          </div>
                          {/* Ghost index */}
                          <span className={`text-[4rem] font-black font-serif leading-none select-none pointer-events-none ${isDark ? 'text-[#fbbf24]/4' : 'text-[#d97706]/4'}`}>
                            {String(activeCategory + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Skills list with animated fill bars */}
                        <div className="relative z-10 space-y-2">
                          {active.skills.map((skill, si) => (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.45, delay: si * 0.05, ease: [0.16, 1, 0.3, 1] }}
                              className={`group/skill flex items-center gap-3 px-3 py-2 rounded-xl border transition-all duration-300 cursor-default ${
                                isDark
                                  ? 'border-white/8 bg-white/[0.03] hover:border-[#fbbf24]/25 hover:bg-[#fbbf24]/[0.07]'
                                  : 'border-black/6 bg-black/[0.02] hover:border-[#d97706]/25 hover:bg-[#d97706]/[0.06]'
                              }`}
                            >
                              <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 ${isDark ? 'bg-[#3a3228] group-hover/skill:bg-[#fbbf24]' : 'bg-[#d4c5b0] group-hover/skill:bg-[#d97706]'}`} />
                              <span className={`text-sm font-medium w-36 shrink-0 transition-colors duration-300 ${isDark ? 'text-[#a89f94] group-hover/skill:text-[#fbbf24]' : 'text-[#5c5449] group-hover/skill:text-[#d97706]'}`}>
                                {skill.name}
                              </span>
                              <div className={`flex-1 h-[3px] rounded-full overflow-hidden ${isDark ? 'bg-white/8' : 'bg-black/8'}`}>
                                <motion.div
                                  initial={{ scaleX: 0 }}
                                  animate={{ scaleX: 1 }}
                                  transition={{ duration: 0.9, delay: 0.2 + si * 0.06, ease: [0.16, 1, 0.3, 1] }}
                                  style={{ originX: 0 }}
                                  className={`h-full rounded-full ${isDark ? 'bg-gradient-to-r from-[#fbbf24] to-[#f59e0b]' : 'bg-gradient-to-r from-[#d97706] to-[#fbbf24]'}`}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Scroll hint pill — bottom of panel */}
                        <div className="relative z-10 mt-4 flex items-center justify-center">
                          <div
                            className={`flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] opacity-50 ${isDark ? 'text-[#3a3228]' : 'text-[#d4c5b0]'}`}
                          >
                            <ChevronUp className="w-3 h-3" />
                            click tabs to navigate
                            <ChevronDown className="w-3 h-3" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* --- Arrow nav column (desktop) --- */}
              <div className="hidden lg:flex flex-col justify-center gap-3">
                <motion.button
                  onClick={() => activeCategory > 0 && goTo(activeCategory - 1, -1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ opacity: activeCategory > 0 ? 1 : 0.2 }}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? activeCategory > 0
                        ? 'border-[#fbbf24]/30 text-[#fbbf24] hover:bg-[#fbbf24]/10'
                        : 'border-white/5 text-[#3a3228] cursor-not-allowed'
                      : activeCategory > 0
                        ? 'border-[#d97706]/30 text-[#d97706] hover:bg-[#d97706]/10'
                        : 'border-black/5 text-[#d4c5b0] cursor-not-allowed'
                  }`}
                >
                  <ChevronUp className="w-4 h-4" />
                </motion.button>

                <motion.button
                  onClick={() => activeCategory < skillCategories.length - 1 && goTo(activeCategory + 1, 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{ opacity: activeCategory < skillCategories.length - 1 ? 1 : 0.2 }}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    isDark
                      ? activeCategory < skillCategories.length - 1
                        ? 'border-[#fbbf24]/30 text-[#fbbf24] hover:bg-[#fbbf24]/10'
                        : 'border-white/5 text-[#3a3228] cursor-not-allowed'
                      : activeCategory < skillCategories.length - 1
                        ? 'border-[#d97706]/30 text-[#d97706] hover:bg-[#d97706]/10'
                        : 'border-black/5 text-[#d4c5b0] cursor-not-allowed'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Currently Exploring — full-width ticker strip */}
          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className={`border-t border-b py-3 ${isDark ? 'border-white/10' : 'border-black/8'} overflow-hidden relative`}>
              {/* Label */}
              <span className={`absolute left-0 top-0 h-full flex items-center px-4 text-[9px] uppercase tracking-[0.4em] font-mono z-10 ${isDark ? 'text-[#d4a853] bg-[#080604]' : 'text-[#c47a4a] bg-[#faf8f5]'}`}>
                Exploring
              </span>

              {/* Scrolling strip */}
              <div className="flex gap-10 pl-28 animate-[marquee_20s_linear_infinite]">
                {[...currentlyLearning, ...currentlyLearning].map((tech, i) => (
                  <span
                    key={i}
                    className={`text-lg font-serif italic whitespace-nowrap shrink-0 ${isDark ? 'text-[#4a4038]' : 'text-[#c5b9a8]'}`}
                  >
                    {tech}
                    <span className={`ml-10 not-italic font-sans text-xs ${isDark ? 'text-[#2a2018]' : 'text-[#e0d5c5]'}`}>✦</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Skills

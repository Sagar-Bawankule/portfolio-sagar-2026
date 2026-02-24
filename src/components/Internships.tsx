'use client'

import { motion } from 'framer-motion'
import { Calendar, Award, ArrowUpRight, Briefcase } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useState } from 'react'

const internships = [
  {
    id: 1,
    number: "01",
    title: "AI & Data Analytics Intern",
    company: "AICTE × Shell India × Edunet",
    program: "Skills4Future Program",
    duration: "July – August 2025",
    type: "Virtual Internship",
    focus: ["Artificial Intelligence", "Data Analytics", "Green Skills"],
    description: "Focused on AI and Data Analytics with emphasis on sustainable Green Skills as part of the collaborative Skills4Future initiative.",
    status: "Completed"
  },
  {
    id: 2,
    number: "02",
    title: "Web Development Intern",
    company: "HEAL BHARAT × CODELEVATE",
    duration: "February 2025",
    type: "Intensive Program",
    focus: ["Frontend Development", "Backend APIs", "Full Stack"],
    achievement: "Best Achievement Award",
    description: "One-month intensive web development program recognized with the Best Achievement Award for outstanding performance.",
    status: "Top Performer"
  }
]

export default function Internships() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const sectionHeading = "INTERNSHIPS"

  return (
    <section
      className={`relative py-32 overflow-hidden ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="internships"
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full blur-[150px] ${isDark ? 'bg-[#c47a4a]/4' : 'bg-[#d4a853]/3'}`}
          animate={{ x: [0, -20, 0], y: [0, 15, 0] }}
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
              <span className="section-label">03 &mdash; professional experience</span>
            </motion.div>

            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {"EXPERIENCE".split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif font-black text-[clamp(4rem,13vw,12rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Internship Entries — Full-width cards with ghost watermark */}
          <div className="space-y-6">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 ${isDark
                  ? hoveredIndex === index ? 'border-[#d4a853]/30 bg-[#d4a853]/[0.04]' : 'border-white/5 bg-white/[0.015]'
                  : hoveredIndex === index ? 'border-[#c47a4a]/30 bg-[#c47a4a]/[0.04]' : 'border-black/5 bg-black/[0.015]'
                }`}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                {/* Ghost large number watermark */}
                <motion.span
                  className={`absolute -right-4 -bottom-4 text-[10rem] sm:text-[14rem] font-black font-serif pointer-events-none select-none leading-none transition-all duration-700 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}
                  animate={{ opacity: hoveredIndex === index ? 0.07 : 0.03 }}
                >
                  {internship.number}
                </motion.span>

                <div className="relative z-10 p-8 sm:p-10">
                  {/* Top row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <div className={`text-[10px] uppercase tracking-[0.35em] font-mono mb-3 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                        {internship.type}
                      </div>
                      <h3 className={`text-2xl sm:text-4xl font-bold tracking-tight transition-colors duration-500 ${hoveredIndex === index
                        ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                        : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                      }`}>
                        {internship.title}
                      </h3>
                      <p className={`text-lg font-light mt-1 ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                        {internship.company}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest ${
                        internship.achievement
                          ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                          : 'text-emerald-400'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          internship.achievement
                            ? isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'
                            : 'bg-emerald-400'
                        }`} />
                        {internship.status}
                      </span>
                      <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                        <Calendar className="w-3.5 h-3.5" />
                        {internship.duration}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-px mb-6 ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {internship.focus.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors duration-300 ${isDark
                          ? 'border-white/8 text-[#a89f94] group-hover:border-[#d4a853]/20 group-hover:text-[#d4a853]'
                          : 'border-black/8 text-[#5c5449] group-hover:border-[#c47a4a]/20 group-hover:text-[#c47a4a]'
                        }`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Expand hint */}
                  <div className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-opacity duration-300 ${
                    hoveredIndex === index ? 'opacity-100' : 'opacity-40'
                  } ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                    <motion.span
                      animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-base leading-none"
                    >+</motion.span>
                    {expandedIndex === index ? 'collapse' : 'expand details'}
                  </div>

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{ height: expandedIndex === index ? 'auto' : 0, opacity: expandedIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className={`mt-6 pt-6 border-t ${isDark ? 'border-white/5' : 'border-black/5'}`}>
                      <p className={`text-base font-light leading-relaxed mb-6 ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                        {internship.description}
                      </p>
                      {internship.achievement && (
                        <span className={`inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                          <Award className="w-4 h-4" />
                          {internship.achievement}
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom editorial note */}
          <motion.div
            className="mt-16 flex items-center justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className={`flex items-center gap-3 text-sm ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
              <Briefcase className={`w-4 h-4 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`} />
              <span className="font-light">Open to new opportunities & collaborations</span>
            </div>
            <a
              href="#contact"
              className={`group flex items-center gap-2 text-sm font-medium transition-colors duration-300 ${isDark ? 'text-[#f5f0eb] hover:text-[#d4a853]' : 'text-[#1a1612] hover:text-[#c47a4a]'}`}
            >
              <span className="relative pb-0.5">
                Let&apos;s Connect
                <span className={`absolute bottom-0 left-0 w-0 h-px ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'} transition-all duration-500 group-hover:w-full`} />
              </span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

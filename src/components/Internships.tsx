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
      className={`relative py-12 sm:py-16 lg:py-20 overflow-hidden ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="internships"
    >
      {/* Section top divider */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#4ade80]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-[#16a34a]/20 to-transparent'}`} />

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute bottom-1/4 right-0 w-[380px] h-[380px] rounded-full ${isDark ? 'bg-[#4ade80]/7' : 'bg-[#16a34a]/5'}`}
          style={{ filter: 'blur(120px)' }}
        />
        <div
          className={`absolute top-1/4 left-0 w-[220px] h-[220px] rounded-full ${isDark ? 'bg-[#86efac]/4' : 'bg-[#22c55e]/3'}`}
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
              <span className="section-label">03 &mdash; professional experience</span>
            </motion.div>

            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {"EXPERIENCE".split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif font-black text-[clamp(2rem,7vw,7rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
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
                className={`group relative overflow-hidden rounded-2xl border cursor-pointer transition-all duration-500 hover-sweep card-glow-emerald ${isDark
                  ? hoveredIndex === index ? 'border-[#4ade80]/30 bg-[#4ade80]/[0.04] -translate-y-1' : 'border-white/5 bg-white/[0.015]'
                  : hoveredIndex === index ? 'border-[#16a34a]/30 bg-[#16a34a]/[0.04] -translate-y-1' : 'border-black/5 bg-black/[0.015]'
                }`}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                {/* Ghost large number watermark */}
                <motion.span
                  className={`absolute -right-4 -bottom-4 text-[7rem] sm:text-[10rem] lg:text-[14rem] font-black font-serif pointer-events-none select-none leading-none transition-all duration-700 ${isDark ? 'text-[#4ade80]' : 'text-[#16a34a]'}`}
                  animate={{ opacity: hoveredIndex === index ? 0.07 : 0.03 }}
                >
                  {internship.number}
                </motion.span>

                <div className="relative z-10 p-4 sm:p-6 lg:p-8">
                  {/* Top row */}
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className={`text-[10px] uppercase tracking-[0.35em] font-mono mb-3 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                        {internship.type}
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-500 ${hoveredIndex === index
                        ? isDark ? 'text-[#4ade80]' : 'text-[#16a34a]'
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
                  <div className={`h-px mb-4 ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {internship.focus.map((tag) => (
                      <span
                        key={tag}
                        className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors duration-300 ${isDark
                          ? 'border-white/8 text-[#a89f94] group-hover:border-[#4ade80]/20 group-hover:text-[#4ade80]'
                          : 'border-black/8 text-[#5c5449] group-hover:border-[#16a34a]/20 group-hover:text-[#16a34a]'
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
            className="mt-10 flex items-center justify-between"
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

'use client'

import { motion } from 'framer-motion'
import { Calendar, Award, ArrowUpRight } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useState } from 'react'

const educationData = [
  {
    institution: "G.H. Raisoni College of Engineering, Nagpur",
    period: "Sep 2023 – May 2026",
    degree: "B.Tech in Artificial Intelligence",
    score: "CGPA 8.63",
    status: "Pursuing",
    number: "01"
  },
  {
    institution: "Government Polytechnic, Sakoli",
    period: "Nov 2021 – May 2023",
    degree: "Diploma in Computer Technology",
    score: "81.20%",
    number: "02"
  },
  {
    institution: "Govind Jr College Palandur",
    period: "July 2018 – March 2020",
    degree: "Higher Secondary Certificate (HSC) — Science",
    score: "62.62%",
    number: "03"
  },
  {
    institution: "Shri Pagaji Vidyalay Kolari",
    period: "June 2017 – March 2018",
    degree: "Secondary School Certificate (SSC)",
    score: "78.60%",
    number: "04"
  }
]

export default function Education() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const sectionHeading = "EDUCATION"

  return (
    <section
      className={`relative py-32 overflow-hidden ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="education"
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute top-1/3 left-0 w-[400px] h-[400px] rounded-full blur-[140px] ${isDark ? 'bg-[#d4a853]/4' : 'bg-[#c47a4a]/3'}`}
          animate={{ x: [0, 15, 0], y: [0, -10, 0] }}
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
              <span className="section-label">02 &mdash; academic journey</span>
            </motion.div>

            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {sectionHeading.split('').map((letter, i) => (
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

          {/* Education Entries — Vertical Timeline */}
          <div className="relative">
            {/* Spine line */}
            <motion.div
              className={`absolute left-[11px] sm:left-[23px] top-0 bottom-0 w-px ${isDark ? 'bg-gradient-to-b from-[#d4a853]/40 via-[#d4a853]/10 to-transparent' : 'bg-gradient-to-b from-[#c47a4a]/40 via-[#c47a4a]/10 to-transparent'}`}
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="relative pl-10 sm:pl-16 pb-14 last:pb-0 group cursor-default"
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-0 sm:left-3 top-2 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-colors duration-500 ${hoveredIndex === index
                    ? isDark ? 'border-[#d4a853] bg-[#d4a853]/15' : 'border-[#c47a4a] bg-[#c47a4a]/15'
                    : isDark ? 'border-[#3a3228] bg-[#080604]' : 'border-[#d4c5b0] bg-[#faf8f5]'
                  }`}
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                >
                  <span className={`w-2 h-2 rounded-full transition-colors duration-500 ${hoveredIndex === index
                    ? isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'
                    : isDark ? 'bg-[#3a3228]' : 'bg-[#d4c5b0]'
                  }`} />
                </motion.div>

                {/* Card */}
                <div className={`relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 ${isDark
                  ? hoveredIndex === index ? 'border-[#d4a853]/25 bg-[#d4a853]/[0.04]' : 'border-white/5 bg-white/[0.015]'
                  : hoveredIndex === index ? 'border-[#c47a4a]/25 bg-[#c47a4a]/[0.04]' : 'border-black/5 bg-black/[0.015]'
                }`}>
                  {/* Period pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold transition-all duration-500 ${
                      hoveredIndex === index
                        ? isDark ? 'border-[#d4a853]/30 text-[#d4a853] bg-[#d4a853]/10' : 'border-[#c47a4a]/30 text-[#c47a4a] bg-[#c47a4a]/10'
                        : isDark ? 'border-white/8 text-[#a89f94]' : 'border-black/8 text-[#5c5449]'
                    }`}>
                      <Award className="w-3 h-3" />
                      {edu.score}
                    </div>
                  </div>

                  <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-2 transition-colors duration-500 ${hoveredIndex === index
                    ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                    : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                  }`}>
                    {edu.degree}
                  </h3>

                  <p className={`text-sm font-light ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                    {edu.institution}
                  </p>

                  {edu.status && (
                    <span className="inline-flex items-center gap-1.5 mt-3 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                      {edu.status}
                    </span>
                  )}

                  {/* Ghost number */}
                  <span className={`absolute bottom-3 right-5 text-6xl font-black font-serif pointer-events-none select-none leading-none transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-[0.06]' : 'opacity-[0.03]'} ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                    {edu.number}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

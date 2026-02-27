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
      className={`relative py-12 sm:py-16 lg:py-20 overflow-hidden ${isDark ? 'bg-[#0f0d0a]' : 'bg-[#f5f2ed]'}`}
      id="education"
    >
      {/* Section top divider */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#2dd4bf]/35 to-transparent' : 'bg-gradient-to-r from-transparent via-[#0d9488]/25 to-transparent'}`} />

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-0 w-[380px] h-[380px] rounded-full ${isDark ? 'bg-[#2dd4bf]/7' : 'bg-[#0d9488]/5'}`}
          style={{ filter: 'blur(110px)' }}
        />
        <div
          className={`absolute bottom-0 right-0 w-[250px] h-[250px] rounded-full ${isDark ? 'bg-[#14b8a6]/5' : 'bg-[#0f766e]/4'}`}
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
              <span className="section-label">02 &mdash; academic journey</span>
            </motion.div>

            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {sectionHeading.split('').map((letter, i) => (
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
                className="relative pl-10 sm:pl-16 pb-8 last:pb-0 group cursor-default"
              >
                {/* Timeline dot */}
                <motion.div
                  className={`absolute left-0 sm:left-3 top-2 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center transition-all duration-500 ${hoveredIndex === index
                    ? isDark ? 'border-[#2dd4bf] bg-[#2dd4bf]/15 shadow-[0_0_12px_rgba(45,212,191,0.3)]' : 'border-[#0d9488] bg-[#0d9488]/15 shadow-[0_0_12px_rgba(13,148,136,0.2)]'
                    : isDark ? 'border-[#3a3228] bg-[#0f0d0a]' : 'border-[#d4c5b0] bg-[#f5f2ed]'
                  }`}
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                >
                  <span className={`w-2 h-2 rounded-full transition-all duration-500 ${hoveredIndex === index
                    ? isDark ? 'bg-[#2dd4bf] scale-110' : 'bg-[#0d9488] scale-110'
                    : isDark ? 'bg-[#3a3228]' : 'bg-[#d4c5b0]'
                  }`} />
                </motion.div>

                {/* Card */}
                <div className={`relative p-4 sm:p-6 rounded-2xl border transition-all duration-500 hover-sweep card-glow-teal ${isDark
                  ? hoveredIndex === index ? 'border-[#2dd4bf]/25 bg-[#2dd4bf]/[0.04] -translate-y-1' : 'border-white/5 bg-white/[0.015]'
                  : hoveredIndex === index ? 'border-[#0d9488]/25 bg-[#0d9488]/[0.04] -translate-y-1' : 'border-black/5 bg-black/[0.015]'
                }`}>
                  {/* Period pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                      <Calendar className="w-3.5 h-3.5" />
                      {edu.period}
                    </div>
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold transition-all duration-500 ${
                      hoveredIndex === index
                        ? isDark ? 'border-[#2dd4bf]/30 text-[#2dd4bf] bg-[#2dd4bf]/10' : 'border-[#0d9488]/30 text-[#0d9488] bg-[#0d9488]/10'
                        : isDark ? 'border-white/8 text-[#a89f94]' : 'border-black/8 text-[#5c5449]'
                    }`}>
                      <Award className="w-3 h-3" />
                      {edu.score}
                    </div>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold tracking-tight mb-1 transition-colors duration-500 ${hoveredIndex === index
                    ? isDark ? 'text-[#2dd4bf]' : 'text-[#0d9488]'
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

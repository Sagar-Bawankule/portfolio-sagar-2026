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
      className={`relative py-8 sm:py-10 lg:py-14 overflow-hidden ${isDark ? 'bg-[#0f0d0a]' : 'bg-[#f5f2ed]'}`}
      id="education"
    >
      {/* Section top divider */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#2dd4bf]/35 to-transparent' : 'bg-gradient-to-r from-transparent via-[#0d9488]/25 to-transparent'}`} />

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-0 w-[380px] h-[380px] rounded-full ${isDark ? 'bg-[#2dd4bf]/7' : 'bg-[#0d9488]/5'}`}
          style={{ filter: 'blur(80px)' }}
        />
        <div
          className={`absolute bottom-0 right-0 w-[250px] h-[250px] rounded-full ${isDark ? 'bg-[#14b8a6]/5' : 'bg-[#0f766e]/4'}`}
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
              <span className="section-label">02 &mdash; academic journey</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`font-serif font-black text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
            >
              {sectionHeading}
            </motion.h2>
          </div>

          {/* Education Entries — 2×2 Grid */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group cursor-default"
              >
                {/* Card */}
                <div className={`relative h-full p-4 sm:p-5 rounded-xl border transition-all duration-500 hover-sweep card-glow-teal backdrop-blur-sm ${isDark
                  ? hoveredIndex === index ? 'border-[#2dd4bf]/30 bg-[#2dd4bf]/[0.08] -translate-y-1' : 'border-white/10 bg-white/[0.04]'
                  : hoveredIndex === index ? 'border-[#0d9488]/30 bg-[#0d9488]/[0.06] -translate-y-1' : 'border-black/8 bg-black/[0.03]'
                }`}>
                  {/* Top row: period + score */}
                  <div className="flex items-center justify-between mb-3">
                    <div className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.15em] ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                      <Calendar className="w-3 h-3" />
                      {edu.period}
                    </div>
                    <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-bold transition-all duration-500 ${
                      hoveredIndex === index
                        ? isDark ? 'border-[#2dd4bf]/30 text-[#2dd4bf] bg-[#2dd4bf]/10' : 'border-[#0d9488]/30 text-[#0d9488] bg-[#0d9488]/10'
                        : isDark ? 'border-white/12 text-[#a89f94]' : 'border-black/10 text-[#5c5449]'
                    }`}>
                      <Award className="w-2.5 h-2.5" />
                      {edu.score}
                    </div>
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold tracking-tight mb-1 transition-colors duration-500 leading-tight ${hoveredIndex === index
                    ? isDark ? 'text-[#2dd4bf]' : 'text-[#0d9488]'
                    : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                  }`}>
                    {edu.degree}
                  </h3>

                  <p className={`text-xs font-light leading-snug ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                    {edu.institution}
                  </p>

                  {edu.status && (
                    <span className="inline-flex items-center gap-1 mt-2 text-emerald-400 text-[10px] font-mono uppercase tracking-widest">
                      <span className="w-1 h-1 bg-emerald-400 rounded-full animate-pulse" />
                      {edu.status}
                    </span>
                  )}

                  {/* Ghost number */}
                  <span className={`absolute bottom-2 right-4 text-4xl font-black font-serif pointer-events-none select-none leading-none transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-[0.06]' : 'opacity-[0.03]'} ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
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

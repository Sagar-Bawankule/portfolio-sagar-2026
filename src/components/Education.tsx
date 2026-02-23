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

          {/* Education Entries — Editorial List Style */}
          <div>
            {educationData.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative border-t transition-colors duration-500 ${isDark ? 'border-white/5 hover:border-[#d4a853]/20' : 'border-black/5 hover:border-[#c47a4a]/20'}`}
              >
                <div className="py-10 sm:py-12 grid grid-cols-12 gap-6 items-start cursor-default">

                  {/* Number */}
                  <div className="col-span-1 hidden sm:block">
                    <span className={`text-sm font-mono transition-colors duration-500 ${hoveredIndex === index
                      ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                      : isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'
                      }`}>
                      {edu.number}
                    </span>
                  </div>

                  {/* Degree */}
                  <div className="col-span-12 sm:col-span-5">
                    <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-500 ${hoveredIndex === index
                      ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                      : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                      }`}>
                      {edu.degree}
                    </h3>
                    {edu.status && (
                      <span className="inline-flex items-center gap-1.5 mt-2 text-emerald-400 text-xs font-mono uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                        {edu.status}
                      </span>
                    )}
                  </div>

                  {/* Institution */}
                  <div className="col-span-12 sm:col-span-4">
                    <p className={`text-base font-light leading-relaxed ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                      {edu.institution}
                    </p>
                    <div className={`flex items-center gap-2 mt-2 text-sm ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{edu.period}</span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="col-span-12 sm:col-span-2 sm:text-right">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-500 ${hoveredIndex === index
                      ? isDark
                        ? 'bg-[#d4a853]/10 border-[#d4a853]/30 text-[#d4a853]'
                        : 'bg-[#c47a4a]/10 border-[#c47a4a]/30 text-[#c47a4a]'
                      : isDark
                        ? 'bg-white/3 border-white/8 text-[#a89f94]'
                        : 'bg-black/3 border-black/8 text-[#5c5449]'
                      }`}>
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-bold">{edu.score}</span>
                    </div>
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
            ))}

            {/* Final bottom border */}
            <div className={`border-t ${isDark ? 'border-white/5' : 'border-black/5'}`} />
          </div>
        </div>
      </div>
    </section>
  )
}

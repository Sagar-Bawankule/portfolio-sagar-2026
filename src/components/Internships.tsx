'use client'

import { motion } from 'framer-motion'
import { Calendar, Award, ArrowUpRight } from 'lucide-react'
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

  const sectionHeading = "INTERNSHIPS"

  return (
    <section
      className={`relative py-8 sm:py-10 lg:py-14 overflow-hidden ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="internships"
    >
      {/* Section top divider */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#4ade80]/30 to-transparent' : 'bg-gradient-to-r from-transparent via-[#16a34a]/20 to-transparent'}`} />

      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute bottom-1/4 right-0 w-[380px] h-[380px] rounded-full ${isDark ? 'bg-[#4ade80]/7' : 'bg-[#16a34a]/5'}`}
          style={{ filter: 'blur(80px)' }}
        />
        <div
          className={`absolute top-1/4 left-0 w-[220px] h-[220px] rounded-full ${isDark ? 'bg-[#86efac]/4' : 'bg-[#22c55e]/3'}`}
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
              <span className="section-label">03 &mdash; professional experience</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`font-serif font-black text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
            >
              EXPERIENCE
            </motion.h2>
          </div>

          {/* Internship Entries — Side-by-side compact cards */}
          <div className="grid sm:grid-cols-2 gap-4 lg:gap-5">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative overflow-hidden rounded-xl border transition-all duration-500 hover-sweep card-glow-emerald backdrop-blur-sm ${isDark
                  ? hoveredIndex === index ? 'border-[#4ade80]/35 bg-[#4ade80]/[0.08] -translate-y-1' : 'border-white/10 bg-white/[0.04]'
                  : hoveredIndex === index ? 'border-[#16a34a]/35 bg-[#16a34a]/[0.06] -translate-y-1' : 'border-black/8 bg-black/[0.03]'
                }`}
              >
                <div className="relative z-10 p-4 sm:p-5">
                  {/* Type label + status */}
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[9px] uppercase tracking-[0.3em] font-mono ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                      {internship.type}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest ${
                      internship.achievement
                        ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                        : 'text-emerald-400'
                    }`}>
                      <span className={`w-1 h-1 rounded-full animate-pulse ${
                        internship.achievement ? isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]' : 'bg-emerald-400'
                      }`} />
                      {internship.status}
                    </span>
                  </div>

                  {/* Title & Company */}
                  <h3 className={`text-lg font-bold tracking-tight transition-colors duration-500 ${hoveredIndex === index
                    ? isDark ? 'text-[#4ade80]' : 'text-[#16a34a]'
                    : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                  }`}>
                    {internship.title}
                  </h3>
                  <p className={`text-sm font-light mt-0.5 ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                    {internship.company}
                  </p>

                  {/* Duration */}
                  <div className={`flex items-center gap-1.5 mt-2 text-xs ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                    <Calendar className="w-3 h-3" />
                    {internship.duration}
                  </div>

                  {/* Divider */}
                  <div className={`h-px my-3 ${isDark ? 'bg-white/8' : 'bg-black/8'}`} />

                  {/* Description */}
                  <p className={`text-xs font-light leading-relaxed mb-3 line-clamp-2 ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                    {internship.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {internship.focus.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors duration-300 ${isDark
                          ? 'border-white/12 text-[#a89f94] group-hover:border-[#4ade80]/25 group-hover:text-[#4ade80]'
                          : 'border-black/10 text-[#5c5449] group-hover:border-[#16a34a]/25 group-hover:text-[#16a34a]'
                        }`}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Achievement badge */}
                  {internship.achievement && (
                    <div className={`inline-flex items-center gap-1.5 mt-3 text-xs font-mono uppercase tracking-widest ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                      <Award className="w-3.5 h-3.5" />
                      {internship.achievement}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom editorial note */}
          <motion.div
            className="mt-6 flex items-center justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
              <span className={`w-4 h-4 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>✦</span>
              <span className="font-light">Open to new opportunities</span>
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

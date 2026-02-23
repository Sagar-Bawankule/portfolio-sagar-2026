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

          {/* Internship Entries — Editorial List */}
          <div>
            {internships.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative border-t transition-colors duration-500 cursor-pointer ${isDark ? 'border-white/5 hover:border-[#d4a853]/20' : 'border-black/5 hover:border-[#c47a4a]/20'}`}
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              >
                <div className="py-10 sm:py-14">
                  {/* Top Row — Number, Title, Company, Duration */}
                  <div className="grid grid-cols-12 gap-6 items-start">
                    {/* Number */}
                    <div className="col-span-1 hidden sm:block">
                      <span className={`text-sm font-mono transition-colors duration-500 ${hoveredIndex === index
                        ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                        : isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'
                        }`}>
                        {internship.number}
                      </span>
                    </div>

                    {/* Title */}
                    <div className="col-span-12 sm:col-span-5">
                      <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight transition-colors duration-500 ${hoveredIndex === index
                        ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                        : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                        }`}>
                        {internship.title}
                      </h3>
                      {internship.achievement && (
                        <span className={`inline-flex items-center gap-1.5 mt-3 text-xs font-mono uppercase tracking-widest ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                          <Award className="w-3.5 h-3.5" />
                          {internship.achievement}
                        </span>
                      )}
                    </div>

                    {/* Company */}
                    <div className="col-span-12 sm:col-span-4">
                      <p className={`text-base font-light ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                        {internship.company}
                      </p>
                      <div className={`flex items-center gap-3 mt-2 text-sm ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{internship.duration}</span>
                        </div>
                        <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#6b6259]' : 'bg-[#8a8178]'}`} />
                        <span>{internship.type}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="col-span-12 sm:col-span-2 sm:text-right">
                      <span className={`inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest ${internship.achievement
                        ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                        : 'text-emerald-400'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${internship.achievement
                          ? isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'
                          : 'bg-emerald-400'
                          }`} />
                        {internship.status}
                      </span>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <motion.div
                    initial={false}
                    animate={{
                      height: expandedIndex === index ? 'auto' : 0,
                      opacity: expandedIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid grid-cols-12 gap-6 mt-8 pt-8" style={{ borderTop: isDark ? '1px solid rgba(255,255,255,0.03)' : '1px solid rgba(0,0,0,0.03)' }}>
                      <div className="col-span-1 hidden sm:block" />

                      {/* Description */}
                      <div className="col-span-12 sm:col-span-5">
                        <p className={`text-lg font-light leading-relaxed ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                          {internship.description}
                        </p>
                      </div>

                      {/* Focus Areas */}
                      <div className="col-span-12 sm:col-span-4">
                        <p className={`text-[10px] uppercase tracking-[0.3em] font-mono mb-4 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                          Focus Areas
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {internship.focus.map((skill) => (
                            <span
                              key={skill}
                              className={`text-sm font-medium transition-colors duration-300 cursor-default ${isDark ? 'text-[#f5f0eb] hover:text-[#d4a853]' : 'text-[#1a1612] hover:text-[#c47a4a]'}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* View Certificate */}
                      <div className="col-span-12 sm:col-span-2 sm:text-right">
                        <motion.a
                          href="#"
                          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 group/link ${isDark ? 'text-[#d4a853] hover:text-[#f0b429]' : 'text-[#c47a4a] hover:text-[#e8985a]'}`}
                          whileHover={{ x: 3 }}
                        >
                          <span className="relative pb-0.5">
                            Certificate
                            <span className={`absolute bottom-0 left-0 w-full h-px ${isDark ? 'bg-[#d4a853]/40' : 'bg-[#c47a4a]/40'}`} />
                          </span>
                          <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Expand hint */}
                  <motion.div
                    className={`mt-4 text-xs font-mono uppercase tracking-widest transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                      } ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}
                  >
                    {expandedIndex === index ? '− collapse' : '+ expand'}
                  </motion.div>
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

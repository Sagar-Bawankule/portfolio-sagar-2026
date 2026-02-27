'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, ArrowUpRight, Plus, Minus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

interface Certification {
  _id: string
  title: string
  issuer: string
  date: string
  skills: string[]
  description: string
  certificateUrl: string
}

const Certifications = () => {
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch('/api/certifications')
        const data = await response.json()
        if (data.success) {
          setCertifications(data.data)
        }
      } catch (err) {
        console.error('Error fetching certifications:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCertifications()
  }, [])

  if (loading) {
    return (
      <section className={`relative py-32 ${isDark ? 'bg-[#0f0d0a]' : 'bg-[#f5f2ed]'}`} id="certifications">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="h-20 bg-white/5 rounded w-96 mb-20" />
            <div className="space-y-px">
              {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/3" />)}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      className={`relative py-20 sm:py-28 lg:py-32 overflow-hidden ${isDark ? 'bg-[#0f0d0a]' : 'bg-[#f5f2ed]'}`}
      id="certifications"
    >
      {/* Section top divider */}
      <div className={`absolute top-0 left-0 right-0 h-px ${isDark ? 'bg-gradient-to-r from-transparent via-[#d4a853]/20 to-transparent' : 'bg-gradient-to-r from-transparent via-[#c47a4a]/15 to-transparent'}`} />

      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full ${isDark ? 'bg-[#d4a853]/3' : 'bg-[#c47a4a]/2'}`}
          style={{ filter: 'blur(160px)' }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="section-label">06 &mdash; achievements</span>
            </motion.div>

            <div className="flex flex-nowrap overflow-hidden" style={{ perspective: '1200px' }}>
              {"CERTIFICATES".split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.03 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif font-black text-[clamp(1.8rem,6vw,9rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
                >
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Stacked accordion list */}
          <div className={`border-t ${isDark ? 'border-white/8' : 'border-black/8'}`}>
            {certifications.map((cert, index) => {
              const isOpen = openIndex === index
              const isHovered = hoveredIndex === index

              return (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`border-b transition-colors duration-300 ${
                    isDark ? 'border-white/8' : 'border-black/8'
                  }`}
                >
                  {/* Row trigger */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left"
                  >
                    <div className={`flex items-center gap-6 py-7 px-2 sm:px-4 transition-all duration-300 ${
                      isHovered || isOpen
                        ? isDark ? 'bg-white/[0.015]' : 'bg-black/[0.015]'
                        : ''
                    }`}>
                      {/* Index */}
                      <span className={`font-mono text-xs shrink-0 w-8 transition-colors duration-300 ${
                        isOpen
                          ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                          : isDark ? 'text-[#3a3228]' : 'text-[#d4c5b0]'
                      }`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {/* Issuer pill */}
                      <span className={`hidden sm:inline-flex text-[9px] font-mono uppercase tracking-[0.25em] px-2.5 py-1 rounded-full border shrink-0 transition-all duration-300 ${
                        isOpen
                          ? isDark ? 'border-[#d4a853]/30 bg-[#d4a853]/8 text-[#d4a853]' : 'border-[#c47a4a]/30 bg-[#c47a4a]/8 text-[#c47a4a]'
                          : isDark ? 'border-white/8 text-[#6b6259]' : 'border-black/8 text-[#8a8178]'
                      }`}>
                        {cert.issuer}
                      </span>

                      {/* Title */}
                      <h3 className={`flex-1 text-base sm:text-lg font-bold tracking-tight transition-colors duration-300 ${
                        isOpen
                          ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                          : isHovered
                            ? isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                            : isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'
                      }`}>
                        {cert.title}
                      </h3>

                      {/* Date */}
                      <span className={`hidden md:flex items-center gap-1.5 text-xs font-light shrink-0 ${isDark ? 'text-[#4a4038]' : 'text-[#c5b9a8]'}`}>
                        <Calendar className="w-3 h-3" />
                        {cert.date}
                      </span>

                      {/* Expand icon */}
                      <motion.div
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? isDark ? 'border-[#d4a853]/40 bg-[#d4a853]/10 text-[#d4a853]' : 'border-[#c47a4a]/40 bg-[#c47a4a]/10 text-[#c47a4a]'
                            : isDark ? 'border-white/10 text-[#6b6259]' : 'border-black/10 text-[#8a8178]'
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>
                  </button>

                  {/* Expanded content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className={`mx-2 sm:mx-4 mb-7 pl-14 sm:pl-[calc(2rem+2.5rem+1.5rem)] flex flex-col sm:flex-row gap-6 sm:gap-12`}>
                          {/* Description */}
                          <div className="flex-1">
                            {cert.description && (
                              <p className={`text-sm leading-relaxed mb-5 ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                                {cert.description}
                              </p>
                            )}
                            {/* Skills */}
                            <div className="flex flex-wrap gap-2">
                              {cert.skills.map((skill, si) => (
                                <motion.span
                                  key={si}
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: si * 0.04, duration: 0.3 }}
                                  className={`text-xs font-mono px-3 py-1 rounded-full border transition-colors duration-300 ${
                                    isDark
                                      ? 'border-white/8 text-[#6b6259] hover:border-[#d4a853]/30 hover:text-[#d4a853]'
                                      : 'border-black/8 text-[#8a8178] hover:border-[#c47a4a]/30 hover:text-[#c47a4a]'
                                  }`}
                                >
                                  {skill}
                                </motion.span>
                              ))}
                            </div>
                          </div>

                          {/* CTA */}
                          {cert.certificateUrl && cert.certificateUrl !== '#' && (
                            <motion.a
                              href={cert.certificateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                              className={`group/link self-start flex items-center gap-2 text-sm font-semibold tracking-wide px-5 py-2.5 rounded-full border transition-all duration-400 ${
                                isDark
                                  ? 'border-[#d4a853]/25 text-[#d4a853] hover:bg-[#d4a853]/8 hover:border-[#d4a853]/50'
                                  : 'border-[#c47a4a]/25 text-[#c47a4a] hover:bg-[#c47a4a]/8 hover:border-[#c47a4a]/50'
                              }`}
                              onClick={e => e.stopPropagation()}
                            >
                              View Certificate
                              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>

          {/* Footer stat row */}
          <motion.div
            className="mt-16 flex flex-wrap items-center justify-between gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="flex items-center gap-3">
              <span className={`text-5xl font-black font-serif ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                {certifications.length}
              </span>
              <span className={`text-sm font-light ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                certificates<br />earned
              </span>
            </div>
            <div className={`h-px flex-1 mx-4 ${isDark ? 'bg-white/6' : 'bg-black/6'}`} />
            <span className={`text-[10px] uppercase tracking-[0.3em] font-mono ${isDark ? 'text-[#3a3228]' : 'text-[#d4c5b0]'}`}>
              Continuously Learning
            </span>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Certifications

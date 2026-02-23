'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Award, Calendar, ExternalLink, ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react'
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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)
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
      <section className={`relative py-32 ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`} id="certifications">
        <div className="container mx-auto px-6 sm:px-12 lg:px-20">
          <div className="max-w-7xl mx-auto animate-pulse">
            <div className="h-20 bg-white/5 rounded w-96 mb-20" />
            <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-white/3 rounded" />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  const sectionHeading = "CERTIFICATES"
  const visibleCertifications = showAll ? certifications : certifications.slice(0, 3)
  const hasMore = certifications.length > 3

  return (
    <section
      className={`relative py-32 overflow-hidden ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="certifications"
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className={`absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full blur-[160px] ${isDark ? 'bg-[#d4a853]/3' : 'bg-[#c47a4a]/2'}`}
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
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
              <span className="section-label">06 &mdash; achievements</span>
            </motion.div>

            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {sectionHeading.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, rotateX: -30, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif font-black text-[clamp(2.5rem,8vw,11.5rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Certifications Entries — Editorial List */}
          <div className="relative">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCertifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Title & Issuer */}
                    <div className="col-span-12 sm:col-span-5">
                      <h3 className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-500 mb-2 ${hoveredIndex === index
                          ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                          : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                        }`}>
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-medium ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                          {cert.issuer}
                        </span>
                        <span className={`w-1 h-1 rounded-full ${isDark ? 'bg-[#6b6259]' : 'bg-[#8a8178]'}`} />
                        <div className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{cert.date}</span>
                        </div>
                      </div>
                    </div>

                    {/* Skills/Focus */}
                    <div className="col-span-12 sm:col-span-4">
                      <p className={`text-[10px] uppercase tracking-[0.3em] font-mono mb-3 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                        Focus
                      </p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {cert.skills.slice(0, 4).map((skill, sIndex) => (
                          <span
                            key={sIndex}
                            className={`text-sm font-light transition-colors duration-300 ${isDark ? 'text-[#6b6259] hover:text-[#a89f94]' : 'text-[#8a8178] hover:text-[#5c5449]'}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="col-span-12 sm:col-span-2 sm:text-right">
                      {cert.certificateUrl && cert.certificateUrl !== '#' ? (
                        <motion.a
                          href={cert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors duration-300 group/link ${isDark ? 'text-[#d4a853] hover:text-[#f0b429]' : 'text-[#c47a4a] hover:text-[#e8985a]'}`}
                          whileHover={{ x: 3 }}
                        >
                          <span className="relative pb-0.5">
                            Certificate
                            <span className={`absolute bottom-0 left-0 w-full h-px ${isDark ? 'bg-[#d4a853]/40' : 'bg-[#c47a4a]/40'}`} />
                          </span>
                          <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                        </motion.a>
                      ) : (
                        <span className={`text-xs font-mono uppercase tracking-widest ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                          Processing
                        </span>
                      )}
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
            </AnimatePresence>

            {/* Final bottom border */}
            <div className={`border-t ${isDark ? 'border-white/5' : 'border-black/5'}`} />

            {/* View More Button — Editorial Style */}
            {hasMore && (
              <motion.div
                className="mt-12 flex justify-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className={`group relative flex items-center gap-3 px-8 py-4 rounded-full border transition-all duration-500 overflow-hidden ${isDark
                      ? 'border-[#d4a853]/20 hover:border-[#d4a853]/50 text-[#d4a853]'
                      : 'border-[#c47a4a]/20 hover:border-[#c47a4a]/50 text-[#c47a4a]'
                    }`}
                >
                  {/* Subtle background slide */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`} />

                  <span className="relative text-sm font-bold uppercase tracking-[0.2em]">
                    {showAll ? 'Show Less' : `View All (${certifications.length})`}
                  </span>

                  <motion.div
                    animate={{ rotate: showAll ? 180 : 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {showAll ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </motion.div>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certifications

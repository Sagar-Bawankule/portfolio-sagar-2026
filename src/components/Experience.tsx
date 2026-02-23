'use client'

import { motion } from 'framer-motion'
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Users } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

interface Experience {
  _id: string
  type: string
  title: string
  institution: string
  location: string
  duration: string
  description: string
  gpa: string
  highlights: string[]
  icon: string
  color: string
}

const iconMap: Record<string, any> = {
  GraduationCap,
  BookOpen,
  Award,
  Users
}

export default function Experience() {
  const [experienceData, setExperienceData] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch('/api/experience')
        const data = await response.json()
        if (data.success) {
          setExperienceData(data.data)
        }
      } catch (err) {
        console.error('Error fetching experience:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchExperience()
  }, [])

  if (loading) {
    return (
      <section id="experience" className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className={`h-12 ${isDark ? 'bg-[#d4a853]/10' : 'bg-[#c47a4a]/10'} rounded w-64 mx-auto mb-4`}></div>
            <div className={`h-6 ${isDark ? 'bg-[#d4a853]/10' : 'bg-[#c47a4a]/10'} rounded w-96 mx-auto mb-12`}></div>
            <div className="space-y-8">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-48 ${isDark ? 'bg-[#d4a853]/5' : 'bg-[#c47a4a]/5'} rounded-xl`}></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="section-heading mb-4">
            My Experience
          </h2>
          <p className="section-subheading">
            My academic and professional journey in technology and AI
          </p>
        </motion.div>

        <div className="space-y-16">
          {experienceData.map((experience, index) => {
            const IconComponent = iconMap[experience.icon] || GraduationCap

            return (
              <motion.div
                key={experience._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="professional-card rounded-2xl overflow-hidden">
                  <div className="h-[2px] bg-gradient-to-r from-[#d4a853] via-[#f0b429] to-[#c47a4a]" />
                  <div className="p-8">
                    <div className="grid lg:grid-cols-12 gap-8 items-center">
                      {/* Left - Icon and Type */}
                      <div className="lg:col-span-2">
                        <div className="flex flex-col items-center lg:items-start space-y-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-[#d4a853] to-[#c47a4a] rounded-xl flex items-center justify-center shadow-lg shadow-[#d4a853]/15">
                            <IconComponent className="w-8 h-8 text-[#0c0a09]" />
                          </div>
                          <div className="text-center lg:text-left">
                            <div className={`text-sm font-bold tracking-wider ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                              {experience.type.toUpperCase()}
                            </div>
                            <div className={`text-xs mt-1 ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                              {experience.duration}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Center - Main Content */}
                      <div className="lg:col-span-8">
                        <div className="space-y-4">
                          <div>
                            <h3 className={`text-2xl lg:text-3xl font-bold mb-2 tracking-tight ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}>
                              {experience.title}
                            </h3>
                            <p className={`text-lg mb-2 ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                              {experience.institution}
                            </p>
                            <div className={`flex items-center gap-4 text-sm ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                <span>{experience.location}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{experience.duration}</span>
                              </div>
                            </div>
                          </div>

                          <p className={`text-base leading-relaxed font-light ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                            {experience.description}
                          </p>

                          {/* Highlights */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {experience.highlights.map((highlight, highlightIndex) => (
                              <div
                                key={highlightIndex}
                                className={`px-3 py-2 text-sm font-medium rounded-lg border ${isDark
                                  ? 'bg-[#d4a853]/5 text-[#a89f94] border-[#d4a853]/10'
                                  : 'bg-[#c47a4a]/5 text-[#5c5449] border-[#c47a4a]/10'
                                  }`}
                              >
                                {highlight}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right - Score */}
                      <div className="lg:col-span-2">
                        <div className="text-center lg:text-right">
                          <div className={`text-4xl font-bold ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
                            {experience.gpa}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                            {experience.type === "Education" ? "GPA/Score" : "Certifications"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-20"
        >
          <div className={`p-12 max-w-4xl mx-auto rounded-2xl professional-card overflow-hidden relative`}>
            <div className="h-[2px] bg-gradient-to-r from-[#d4a853] via-[#f0b429] to-[#c47a4a] absolute top-0 left-0 right-0" />
            <h3 className={`text-2xl font-bold mb-4 tracking-tight ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}>
              CONTINUOUS LEARNING
            </h3>
            <p className={`text-base mb-8 max-w-2xl mx-auto font-light ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
              I believe in staying updated with the latest technologies and industry best practices.
              My journey is marked by continuous learning and skill development.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "AI & Machine Learning",
                "Cloud Computing",
                "Web Development",
                "Database Management",
                "Software Engineering"
              ].map((skill) => (
                <span
                  key={skill}
                  className={`px-4 py-2 text-sm font-medium border rounded-lg ${isDark
                    ? 'bg-[#d4a853]/8 text-[#d4a853] border-[#d4a853]/15'
                    : 'bg-[#c47a4a]/8 text-[#c47a4a] border-[#c47a4a]/15'
                    }`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Logic for actual email submission would go here (e.g. EmailJS or a backend route)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "sagarbawankule334@gmail.com",
      href: "mailto:sagarbawankule334@gmail.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91 9158680071",
      href: "tel:+919158680071",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Nagpur, Maharashtra, India",
    }
  ]

  const socials = [
    { name: 'Github', icon: Github, href: 'https://github.com/Sagar-Bawankule' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/sagar-bawankule-856a79264/' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/thee_sagar_?igsh=c3doaXMyczhiMzRr' },
  ]

  const sectionHeading = "CONTACT"

  return (
    <section
      className={`relative py-20 sm:py-28 lg:py-32 overflow-hidden ${isDark ? 'bg-[#080604]' : 'bg-[#faf8f5]'}`}
      id="contact"
    >
      {/* Background ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full ${isDark ? 'bg-[#d4a853]/4' : 'bg-[#c47a4a]/3'}`}
          style={{ filter: 'blur(150px)' }}
        />
      </div>

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Editorial Section Header */}
          <div className="mb-14 sm:mb-20 lg:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="section-label">07 &mdash; get in touch</span>
            </motion.div>

            <div className="flex flex-nowrap" style={{ perspective: '1200px' }}>
              {sectionHeading.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif font-black text-[clamp(3rem,12vw,13rem)] leading-[0.85] tracking-[-0.03em] select-none ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">

            {/* Left Column — Contact Info & Socials */}
            <motion.div
              className="lg:col-span-12 xl:col-span-5 space-y-16"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="space-y-10">
                <p className={`text-2xl sm:text-3xl leading-[1.4] font-light ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>
                  Have a vision for a project? Need an AI specialist? Or just want to talk tech? <span className={`font-serif italic ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}>My inbox is always open.</span>
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-12 pt-8 border-t border-current/5">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="group cursor-default">
                      <p className={`text-[10px] uppercase tracking-[0.4em] font-mono mb-4 transition-colors ${isDark ? 'text-[#6b6259] group-hover:text-[#d4a853]' : 'text-[#8a8178] group-hover:text-[#c47a4a]'}`}>
                        {info.title}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className={`text-xl sm:text-2xl font-medium transition-colors hover:text-[#d4a853] ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className={`text-xl sm:text-2xl font-medium ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}>
                          {info.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links Editorial Style */}
              <div className="pt-12 border-t border-current/5">
                <p className={`text-[10px] uppercase tracking-[0.4em] font-mono mb-8 ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                  Digital Spaces
                </p>
                <div className="flex flex-wrap gap-x-12 gap-y-6">
                  {socials.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-xl font-medium relative group transition-colors ${isDark ? 'text-[#a89f94] hover:text-[#d4a853]' : 'text-[#5c5449] hover:text-[#c47a4a]'}`}
                      whileHover={{ y: -3 }}
                    >
                      {social.name}
                      <span className={`absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-500 group-hover:w-full ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column — Contact Form Editorial Style */}
            <motion.div
              className="lg:col-span-12 xl:col-span-7"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your Name"
                      className={`w-full bg-transparent border-b py-4 focus:outline-none transition-all placeholder-transparent focus:placeholder-opacity-0 ${isDark
                          ? 'border-[#a89f94]/20 focus:border-[#d4a853] text-[#f5f0eb]'
                          : 'border-[#5c5449]/20 focus:border-[#c47a4a] text-[#1a1612]'
                        }`}
                    />
                    <label htmlFor="name" className={`absolute left-0 top-4 transition-all duration-300 pointer-events-none origin-left ${formData.name
                        ? '-translate-y-8 scale-75'
                        : 'translate-y-0 scale-100 group-focus-within:-translate-y-8 group-focus-within:scale-75'
                      } ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                      Your Name
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="Email Address"
                      className={`w-full bg-transparent border-b py-4 focus:outline-none transition-all placeholder-transparent focus:placeholder-opacity-0 ${isDark
                          ? 'border-[#a89f94]/20 focus:border-[#d4a853] text-[#f5f0eb]'
                          : 'border-[#5c5449]/20 focus:border-[#c47a4a] text-[#1a1612]'
                        }`}
                    />
                    <label htmlFor="email" className={`absolute left-0 top-4 transition-all duration-300 pointer-events-none origin-left ${formData.email
                        ? '-translate-y-8 scale-75'
                        : 'translate-y-0 scale-100 group-focus-within:-translate-y-8 group-focus-within:scale-75'
                      } ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                      Email Address
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Subject"
                    className={`w-full bg-transparent border-b py-4 focus:outline-none transition-all placeholder-transparent focus:placeholder-opacity-0 ${isDark
                        ? 'border-[#a89f94]/20 focus:border-[#d4a853] text-[#f5f0eb]'
                        : 'border-[#5c5449]/20 focus:border-[#c47a4a] text-[#1a1612]'
                      }`}
                  />
                  <label htmlFor="subject" className={`absolute left-0 top-4 transition-all duration-300 pointer-events-none origin-left ${formData.subject
                      ? '-translate-y-8 scale-75'
                      : 'translate-y-0 scale-100 group-focus-within:-translate-y-8 group-focus-within:scale-75'
                    } ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                    Subject
                  </label>
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Your Message"
                    className={`w-full bg-transparent border-b py-4 focus:outline-none transition-all resize-none placeholder-transparent focus:placeholder-opacity-0 ${isDark
                        ? 'border-[#a89f94]/20 focus:border-[#d4a853] text-[#f5f0eb]'
                        : 'border-[#5c5449]/20 focus:border-[#c47a4a] text-[#1a1612]'
                      }`}
                  />
                  <label htmlFor="message" className={`absolute left-0 top-4 transition-all duration-300 pointer-events-none origin-left ${formData.message
                      ? '-translate-y-8 scale-75'
                      : 'translate-y-0 scale-100 group-focus-within:-translate-y-8 group-focus-within:scale-75'
                    } ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                    Your Message
                  </label>
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex items-center gap-4 text-2xl font-medium pt-4 outline-none"
                  whileHover={{ x: 10 }}
                >
                  <span className="relative">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    <span className={`absolute bottom-0 left-0 w-full h-[1.5px] transition-all duration-500 scale-x-100 ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`} />
                  </span>
                  {!isSubmitting && (
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowUpRight className={`w-6 h-6 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`} />
                    </motion.div>
                  )}
                </motion.button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 text-emerald-500 pt-4"
                    >
                      <CheckCircle2 size={20} />
                      <span className="text-sm font-medium tracking-wide">Message sent! I&apos;ll be in touch soon.</span>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3 text-red-500 pt-4"
                    >
                      <AlertCircle size={20} />
                      <span className="text-sm font-medium tracking-wide">Something went wrong. Please try again.</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

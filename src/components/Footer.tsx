'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Instagram, ArrowUp } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { useState, useEffect } from 'react'

const Footer = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Education', href: '#education' },
    { name: 'Experience', href: '#internships' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ]

  const socials = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/Sagar-Bawankule' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/sagar-bawankule-856a79264/' },
    { name: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/thee_sagar_?igsh=c3doaXMyczhiMzRr' },
    { name: 'Email', icon: Mail, href: 'mailto:sagarbawankule334@gmail.com' },
  ]

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // Live IST clock
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const ist = new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(now)
      setTime(ist)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <footer className={`relative overflow-hidden ${isDark ? 'bg-[#0f0d0a]' : 'bg-[#f5f2ed]'}`}>
      {/* Top divider */}
      <div className={`h-px mx-6 sm:mx-12 lg:mx-20 ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />

      <div className="container mx-auto px-6 sm:px-12 lg:px-20 pt-20 pb-12">

        {/* Big editorial wordmark */}
        <motion.div
          className="mb-14 overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Single-line name: "SAGAR" outlined + "BAWANKULE" filled, scales to fit */}
          <h2 className="whitespace-nowrap flex items-baseline gap-[0.12em] leading-none select-none overflow-hidden"
            style={{ fontSize: 'clamp(2.4rem, 8.5vw, 10rem)' }}
          >
            <span
              className="font-serif font-black tracking-[-0.03em]"
              style={{
                WebkitTextStroke: isDark ? '2px #d4a853' : '2px #c47a4a',
                color: 'transparent',
              }}
            >
              SAGAR
            </span>
            <span className={`font-sans font-black tracking-[-0.04em] ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}>
              ✦
            </span>
            <span
              className="font-serif font-black tracking-[-0.03em]"
              style={{
                WebkitTextStroke: isDark ? '2px #d4a853' : '2px #c47a4a',
                color: 'transparent',
              }}
            >
              BAWANKULE
            </span>
          </h2>
          <div className={`flex items-center gap-4 mt-3`}>
            <div className={`h-px w-12 ${isDark ? 'bg-[#d4a853]/30' : 'bg-[#c47a4a]/30'}`} />
            <p className={`text-xs uppercase tracking-[0.35em] font-mono ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
              AI &amp; Software Developer
            </p>
          </div>
        </motion.div>

        {/* Main grid — nav links + info + socials */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-16 py-12 border-y ${isDark ? 'border-white/5' : 'border-black/5'}`}>

          {/* Nav Links */}
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className={`text-[10px] uppercase tracking-[0.4em] font-mono mb-8 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
              Navigate
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className={`relative group text-base font-medium transition-colors duration-300 pb-0.5 ${isDark ? 'text-[#6b6259] hover:text-[#f5f0eb]' : 'text-[#8a8178] hover:text-[#1a1612]'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-400 ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            <p className={`text-[10px] uppercase tracking-[0.4em] font-mono mb-8 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
              Available
            </p>
            <div className="space-y-6">
              <div>
                <a
                  href="mailto:sagarbawankule334@gmail.com"
                  className={`text-base font-medium transition-colors ${isDark ? 'text-[#a89f94] hover:text-[#d4a853]' : 'text-[#5c5449] hover:text-[#c47a4a]'}`}
                >
                  sagarbawankule334@gmail.com
                </a>
              </div>
              <div>
                <p className={`text-base ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>Nagpur, India</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-emerald-400 text-sm font-mono tracking-wide">Open to work</span>
              </div>
            </div>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <p className={`text-[10px] uppercase tracking-[0.4em] font-mono mb-8 ${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>
              Connect
            </p>
            <div className="space-y-4">
              {socials.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 text-base font-medium transition-colors duration-300 ${isDark ? 'text-[#6b6259] hover:text-[#f5f0eb]' : 'text-[#8a8178] hover:text-[#1a1612]'}`}
                  whileHover={{ x: 5 }}
                >
                  <social.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="relative pb-0.5">
                    {social.name}
                    <span className={`absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full transition-all duration-400 ${isDark ? 'bg-[#d4a853]' : 'bg-[#c47a4a]'}`} />
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-10">
          <motion.p
            className={`text-sm font-light ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            &copy; {currentYear} <span className={`font-serif italic ${isDark ? 'text-[#a89f94]' : 'text-[#5c5449]'}`}>Sagar Bawankule</span> &mdash; Crafted with intention.
          </motion.p>

          {/* Live IST Clock */}
          {time && (
            <motion.div
              className={`flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] uppercase ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Nagpur, India</span>
              <span className={`${isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'}`}>{time} IST</span>
            </motion.div>
          )}

          <motion.button
            onClick={scrollToTop}
            aria-label="Back to top"
            className={`group flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] transition-colors ${isDark ? 'text-[#6b6259] hover:text-[#d4a853]' : 'text-[#8a8178] hover:text-[#c47a4a]'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            whileHover={{ y: -2 }}
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

export default Footer

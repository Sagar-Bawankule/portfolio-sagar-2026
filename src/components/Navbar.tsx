'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Shield, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#internships' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Contact', href: '#contact' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const scrollPos = window.scrollY + 120
      for (let i = navItems.length - 1; i >= 0; i--) {
        const id = navItems[i].href.substring(1)
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
          ? isDark
            ? 'bg-[#080604]/85 backdrop-blur-2xl'
            : 'bg-[#faf8f5]/85 backdrop-blur-2xl'
          : 'bg-transparent'
        }`}
    >
      {/* Thin top accent line — always visible */}
      <div className={`h-[1px] w-full ${isDark ? 'bg-[#d4a853]/15' : 'bg-[#c47a4a]/12'}`} />

      <div className="container mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex items-center justify-between h-[72px]">

          {/* ── LOGO: Typographic Monogram ── */}
          <motion.button
            onClick={() => handleNavClick('#home')}
            className="flex items-center gap-3 group"
            whileHover="hover"
          >
            {/* Monogram block */}
            <div className="relative flex items-center justify-center w-10 h-10">
              {/* Background ring that fills on hover */}
              <motion.div
                className={`absolute inset-0 rounded-full border ${isDark ? 'border-[#d4a853]/30' : 'border-[#c47a4a]/30'}`}
                variants={{ hover: { scale: 1.15, borderColor: isDark ? 'rgba(212,168,83,0.6)' : 'rgba(196,122,74,0.6)' } }}
                transition={{ duration: 0.4 }}
              />
              <span className="font-serif font-black text-xl bg-gradient-to-br from-[#d4a853] via-[#f0b429] to-[#c47a4a] bg-clip-text text-transparent leading-none select-none">
                SB
              </span>
            </div>

            {/* Name stack — hides on small screens */}
            <div className="hidden sm:flex flex-col leading-none">
              <span className={`font-serif font-bold text-base tracking-tight transition-colors duration-300 ${isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'}`}>
                Sagar Bawankule
              </span>
              <span className={`text-[9px] font-mono uppercase tracking-[0.35em] mt-[3px] transition-colors duration-300 ${isDark ? 'text-[#6b6259] group-hover:text-[#d4a853]' : 'text-[#8a8178] group-hover:text-[#c47a4a]'}`}>
                AI · Developer
              </span>
            </div>
          </motion.button>

          {/* ── DESKTOP NAV: indexed minimal links ── */}
          <div className="hidden lg:flex items-center">
            {/* Vertical separator */}
            <div className={`w-px h-8 mr-8 ${isDark ? 'bg-[#d4a853]/10' : 'bg-[#c47a4a]/10'}`} />

            <div className="flex items-center gap-0">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                    className={`group relative flex flex-col items-center px-4 py-2 transition-all duration-300 ${isActive
                        ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                        : isDark ? 'text-[#5c5449] hover:text-[#a89f94]' : 'text-[#8a8178] hover:text-[#5c5449]'
                      }`}
                  >
                    {/* Index number */}
                    <span className={`text-[9px] font-mono mb-0.5 transition-all duration-300 leading-none ${isActive
                        ? isDark ? 'opacity-100 text-[#d4a853]' : 'opacity-100 text-[#c47a4a]'
                        : 'opacity-0 group-hover:opacity-50'
                      }`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Label */}
                    <span className="text-[11px] font-mono uppercase tracking-[0.18em] leading-none">
                      {item.name}
                    </span>
                    {/* Bottom active/hover indicator */}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-[1.5px] rounded-full transition-all duration-400 ${isActive
                        ? isDark ? 'w-1/2 bg-[#d4a853]' : 'w-1/2 bg-[#c47a4a]'
                        : 'w-0 group-hover:w-1/3 ' + (isDark ? 'bg-[#5c5449]' : 'bg-[#8a8178]')
                      }`} />
                  </a>
                )
              })}
            </div>

            {/* Vertical separator */}
            <div className={`w-px h-8 ml-8 ${isDark ? 'bg-[#d4a853]/10' : 'bg-[#c47a4a]/10'}`} />
          </div>

          {/* ── RIGHT CONTROLS ── */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <motion.button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-8 h-8 flex items-center justify-center transition-colors rounded-full ${isDark ? 'text-[#5c5449] hover:text-[#d4a853]' : 'text-[#8a8178] hover:text-[#c47a4a]'
                }`}
              whileTap={{ scale: 0.88 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.div key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Sun className="w-[18px] h-[18px]" />
                  </motion.div>
                ) : (
                  <motion.div key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Moon className="w-[18px] h-[18px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Admin — icon only on mobile, text+icon on sm+ */}
            <a
              href="/admin/login"
              className={`hidden sm:flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-[0.25em] px-3.5 py-2 border transition-all duration-400 ${isDark
                  ? 'border-[#d4a853]/15 text-[#6b6259] hover:text-[#d4a853] hover:border-[#d4a853]/35'
                  : 'border-[#c47a4a]/15 text-[#8a8178] hover:text-[#c47a4a] hover:border-[#c47a4a]/35'
                }`}
            >
              <Shield className="w-3 h-3" />
              Admin
            </a>

            {/* Mobile burger */}
            <button
              onClick={() => setIsOpen(v => !v)}
              className={`lg:hidden w-8 h-8 flex items-center justify-center transition-colors ${isDark ? 'text-[#a89f94] hover:text-[#f5f0eb]' : 'text-[#5c5449] hover:text-[#1a1612]'
                }`}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div key="x"
                    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div key="menu"
                    initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom separator */}
      <div className={`h-[1px] w-full transition-opacity duration-700 ${scrolled
          ? isDark ? 'bg-[#d4a853]/8 opacity-100' : 'bg-[#c47a4a]/8 opacity-100'
          : 'opacity-0'
        }`} />

      {/* ── MOBILE FULL-SCREEN DRAWER ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className={`lg:hidden fixed inset-0 top-[74px] z-40 ${isDark ? 'bg-[#080604]/98' : 'bg-[#faf8f5]/98'
              } backdrop-blur-2xl`}
          >
            <div className="container mx-auto px-6 sm:px-12 pt-10 pb-16 h-full overflow-y-auto">
              <div className="space-y-0 border-t border-current/5">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleNavClick(item.href) }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 + i * 0.06, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
                      className={`group flex items-center justify-between py-5 border-b transition-colors duration-300 ${isDark ? 'border-white/4' : 'border-black/4'
                        }`}
                    >
                      <div className="flex items-baseline gap-4">
                        <span className={`text-[10px] font-mono transition-colors ${isActive
                            ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                            : isDark ? 'text-[#3d3630]' : 'text-[#c0b8b0]'
                          }`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className={`font-serif font-bold text-3xl sm:text-4xl tracking-tight transition-colors duration-300 ${isActive
                            ? isDark ? 'text-[#d4a853]' : 'text-[#c47a4a]'
                            : isDark ? 'text-[#f5f0eb]' : 'text-[#1a1612]'
                          }`}>
                          {item.name}
                        </span>
                      </div>
                      <motion.span
                        className={`text-2xl font-serif transition-opacity duration-300 ${isActive
                            ? isDark ? 'text-[#d4a853] opacity-100' : 'text-[#c47a4a] opacity-100'
                            : 'opacity-0 group-active:opacity-100'
                          }`}
                      >
                        →
                      </motion.span>
                    </motion.a>
                  )
                })}
              </div>

              {/* Mobile page bottom */}
              <motion.div
                className="mt-12 pt-8 border-t border-current/5 flex items-center justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span className={`text-xs font-mono uppercase tracking-[0.3em] ${isDark ? 'text-[#3d3630]' : 'text-[#c0b8b0]'}`}>
                  Sagar · Portfolio
                </span>
                <a
                  href="/admin/login"
                  className={`flex items-center gap-2 text-xs font-mono uppercase tracking-widest transition-colors ${isDark ? 'text-[#5c5449] hover:text-[#d4a853]' : 'text-[#8a8178] hover:text-[#c47a4a]'}`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar

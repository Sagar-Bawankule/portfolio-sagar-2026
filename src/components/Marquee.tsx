'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const items = [
  { text: 'Full Stack Developer', type: 'label' },
  { text: '✦', type: 'dot' },
  { text: 'AI Enthusiast', type: 'label' },
  { text: '✦', type: 'dot' },
  { text: 'React & Next.js', type: 'label' },
  { text: '✦', type: 'dot' },
  { text: 'Open to Work', type: 'highlight' },
  { text: '✦', type: 'dot' },
  { text: 'Machine Learning', type: 'label' },
  { text: '✦', type: 'dot' },
  { text: 'TypeScript', type: 'label' },
  { text: '✦', type: 'dot' },
  { text: 'Sagar Bawankule', type: 'highlight' },
  { text: '✦', type: 'dot' },
  { text: 'MongoDB & Node.js', type: 'label' },
  { text: '✦', type: 'dot' },
  { text: 'Deep Learning', type: 'label' },
  { text: '✦', type: 'dot' },
  { text: 'Available for Hire', type: 'highlight' },
  { text: '✦', type: 'dot' },
  { text: 'Python & TensorFlow', type: 'label' },
  { text: '✦', type: 'dot' },
]

const Marquee = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const doubled = [...items, ...items]

  return (
    <div className={`relative overflow-hidden ${isDark ? 'bg-[#0a0806]' : 'bg-[#f5f2ef]'}`}>
      {/* Top gold border */}
      <div className={`h-px w-full bg-gradient-to-r from-transparent via-[#d4a853]/40 to-transparent`} />

      <div className="py-5">
        {/* Left fade */}
        <div className={`absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-r from-[#0a0806] to-transparent' : 'bg-gradient-to-r from-[#f5f2ef] to-transparent'}`} />
        {/* Right fade */}
        <div className={`absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-l from-[#0a0806] to-transparent' : 'bg-gradient-to-l from-[#f5f2ef] to-transparent'}`} />

        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ x: { duration: 35, repeat: Infinity, ease: 'linear' } }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="flex items-center flex-shrink-0">
              {item.type === 'dot' ? (
                <span className={`px-4 text-xs ${isDark ? 'text-[#d4a853]/50' : 'text-[#c47a4a]/50'}`}>
                  {item.text}
                </span>
              ) : item.type === 'highlight' ? (
                <span className="px-2 text-sm font-bold font-serif italic tracking-wide bg-gradient-to-r from-[#d4a853] via-[#f0b429] to-[#c47a4a] bg-clip-text text-transparent">
                  {item.text}
                </span>
              ) : (
                <span className={`px-2 text-sm font-mono tracking-[0.15em] uppercase ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                  {item.text}
                </span>
              )}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Bottom gold border */}
      <div className={`h-px w-full bg-gradient-to-r from-transparent via-[#d4a853]/40 to-transparent`} />
    </div>
  )
}

export default Marquee

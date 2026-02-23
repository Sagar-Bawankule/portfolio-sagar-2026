'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const items = [
    'AI Developer',
    'React',
    'Next.js',
    'Python',
    'Machine Learning',
    'TypeScript',
    'MongoDB',
    'Full Stack',
    'Open to Work',
    'Deep Learning',
    'TensorFlow',
    'Node.js',
]

const Marquee = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    // Double the items for seamless loop
    const doubled = [...items, ...items]

    return (
        <div className={`relative overflow-hidden py-6 ${isDark ? 'bg-[#0a0806]' : 'bg-[#f5f2ef]'}`}>
            {/* Left fade */}
            <div className={`absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-r from-[#0a0806] to-transparent' : 'bg-gradient-to-r from-[#f5f2ef] to-transparent'}`} />
            {/* Right fade */}
            <div className={`absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none ${isDark ? 'bg-gradient-to-l from-[#0a0806] to-transparent' : 'bg-gradient-to-l from-[#f5f2ef] to-transparent'}`} />

            <motion.div
                className="flex whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{
                    x: {
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    },
                }}
            >
                {doubled.map((item, i) => (
                    <span key={i} className="flex items-center flex-shrink-0">
                        <span className={`text-sm sm:text-base font-serif italic tracking-wide px-6 ${isDark ? 'text-[#6b6259]' : 'text-[#8a8178]'}`}>
                            {item}
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? 'bg-[#d4a853]/30' : 'bg-[#c47a4a]/30'}`} />
                    </span>
                ))}
            </motion.div>
        </div>
    )
}

export default Marquee

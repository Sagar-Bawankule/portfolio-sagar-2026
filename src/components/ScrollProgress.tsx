'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const ScrollProgress = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 50, restDelta: 0.001 })

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
            style={{
                scaleX,
                background: isDark
                    ? 'linear-gradient(90deg, #d4a853, #f0b429, #c47a4a)'
                    : 'linear-gradient(90deg, #c47a4a, #e8985a, #d4a853)',
            }}
        />
    )
}

export default ScrollProgress

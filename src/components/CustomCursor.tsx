'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const CustomCursor = () => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'
    const [isHovering, setIsHovering] = useState(false)
    const [isClicking, setIsClicking] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isMobile, setIsMobile] = useState(true) // default true to hide on SSR
    const cursorRef = useRef({ x: 0, y: 0 })

    // Smooth spring physics for trailing
    const springConfig = { damping: 28, stiffness: 350, mass: 0.5 }
    const dotX = useSpring(0, springConfig)
    const dotY = useSpring(0, springConfig)
    const ringX = useSpring(0, { damping: 20, stiffness: 200, mass: 0.8 })
    const ringY = useSpring(0, { damping: 20, stiffness: 200, mass: 0.8 })

    useEffect(() => {
        // Check if touch device
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
        }
        checkMobile()
        window.addEventListener('resize', checkMobile)

        const onMouseMove = (e: MouseEvent) => {
            cursorRef.current = { x: e.clientX, y: e.clientY }
            dotX.set(e.clientX)
            dotY.set(e.clientY)
            ringX.set(e.clientX)
            ringY.set(e.clientY)
            if (!isVisible) setIsVisible(true)
        }

        const onMouseDown = () => setIsClicking(true)
        const onMouseUp = () => setIsClicking(false)
        const onMouseLeave = () => setIsVisible(false)
        const onMouseEnter = () => setIsVisible(true)

        // Listen for hovers on interactive elements
        const addHoverListeners = () => {
            const interactives = document.querySelectorAll('a, button, input, textarea, [role="button"], .cursor-hover')
            interactives.forEach(el => {
                el.addEventListener('mouseenter', () => setIsHovering(true))
                el.addEventListener('mouseleave', () => setIsHovering(false))
            })
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mousedown', onMouseDown)
        window.addEventListener('mouseup', onMouseUp)
        document.documentElement.addEventListener('mouseleave', onMouseLeave)
        document.documentElement.addEventListener('mouseenter', onMouseEnter)

        // Set up hover listeners with a small delay for dynamic content
        addHoverListeners()
        const observer = new MutationObserver(() => addHoverListeners())
        observer.observe(document.body, { childList: true, subtree: true })

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mousedown', onMouseDown)
            window.removeEventListener('mouseup', onMouseUp)
            document.documentElement.removeEventListener('mouseleave', onMouseLeave)
            document.documentElement.removeEventListener('mouseenter', onMouseEnter)
            window.removeEventListener('resize', checkMobile)
            observer.disconnect()
        }
    }, [dotX, dotY, ringX, ringY, isVisible])

    // Don't render on mobile / touch devices
    if (isMobile) return null

    const accentColor = isDark ? '#d4a853' : '#c47a4a'

    return (
        <>
            {/* Hide default cursor globally */}
            <style jsx global>{`
        * { cursor: none !important; }
      `}</style>

            {/* Inner dot — fast tracking */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicking ? 0.6 : isHovering ? 0.5 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.15 }}
            >
                <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: accentColor }}
                />
            </motion.div>

            {/* Outer ring — trails slightly behind */}
            <motion.div
                className="fixed top-0 left-0 z-[9998] pointer-events-none"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isClicking ? 0.8 : isHovering ? 1.8 : 1,
                    opacity: isVisible ? (isHovering ? 0.6 : 0.3) : 0,
                }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
                <div
                    className="w-10 h-10 rounded-full border"
                    style={{ borderColor: accentColor }}
                />
            </motion.div>
        </>
    )
}

export default CustomCursor

'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, useSpring } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const CustomCursor = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [cursorState, setCursorState] = useState<'default' | 'hover'>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)

  // Single spring for cursor position — fast and responsive
  const x = useSpring(0, { damping: 30, stiffness: 400, mass: 0.2 })
  const y = useSpring(0, { damping: 30, stiffness: 400, mass: 0.2 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    // Use event delegation instead of MutationObserver — much cheaper
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, input, textarea, [data-cursor]')) {
        setCursorState('hover')
      }
    }

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, input, textarea, [data-cursor]')) {
        setCursorState('default')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onMouseOver, { passive: true })
    document.addEventListener('mouseout', onMouseOut, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('resize', checkMobile)
    }
  }, [x, y, isVisible])

  // Don't render anything on mobile — no cursor, no styles
  if (isMobile) return null

  const gold = isDark ? '#d4a853' : '#c47a4a'
  const size = cursorState === 'hover' ? 40 : 8

  return (
    <>
      {/* Only hide cursor on desktop — this style tag is not injected on mobile */}
      <style jsx global>{`@media (pointer: fine) { * { cursor: none !important; } }`}</style>

      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          width: size,
          height: size,
          backgroundColor: cursorState === 'hover' ? 'transparent' : gold,
          border: cursorState === 'hover' ? `1.5px solid ${gold}` : 'none',
          opacity: isVisible ? 1 : 0,
          transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease, border 0.2s ease, opacity 0.15s ease',
        }}
      />
    </>
  )
}

export default CustomCursor

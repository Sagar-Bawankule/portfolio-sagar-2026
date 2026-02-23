'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, AnimatePresence } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const CustomCursor = () => {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'click' | 'link' | 'project' | 'text'>('default')
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const [label, setLabel] = useState<string | null>(null)

  // Tight spring for dot
  const dotX = useSpring(0, { damping: 30, stiffness: 400, mass: 0.4 })
  const dotY = useSpring(0, { damping: 30, stiffness: 400, mass: 0.4 })
  // Looser spring for outer blob (trails behind for magnetic feel)
  const blobX = useSpring(0, { damping: 18, stiffness: 150, mass: 1.2 })
  const blobY = useSpring(0, { damping: 18, stiffness: 150, mass: 1.2 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX)
      dotY.set(e.clientY)
      blobX.set(e.clientX)
      blobY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)
    const onDown = () => setCursorState('click')
    const onUp = () => setCursorState('default')

    const attachHover = () => {
      // Project cards → "VIEW"
      document.querySelectorAll('[data-cursor="view"]').forEach(el => {
        el.addEventListener('mouseenter', () => { setCursorState('project'); setLabel('VIEW') })
        el.addEventListener('mouseleave', () => { setCursorState('default'); setLabel(null) })
      })
      // External links → "OPEN"
      document.querySelectorAll('a[target="_blank"]').forEach(el => {
        el.addEventListener('mouseenter', () => { setCursorState('link'); setLabel('OPEN') })
        el.addEventListener('mouseleave', () => { setCursorState('default'); setLabel(null) })
      })
      // Buttons & nav links → hover state
      document.querySelectorAll('button, a:not([target="_blank"]), input, textarea').forEach(el => {
        el.addEventListener('mouseenter', () => { if (cursorState !== 'project' && cursorState !== 'link') setCursorState('hover') })
        el.addEventListener('mouseleave', () => setCursorState('default'))
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    attachHover()
    const obs = new MutationObserver(attachHover)
    obs.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
      window.removeEventListener('resize', checkMobile)
      obs.disconnect()
    }
  }, [dotX, dotY, blobX, blobY, isVisible, cursorState])

  if (isMobile) return null

  const gold = isDark ? '#d4a853' : '#c47a4a'

  // Blob sizing per state
  const blobSize = {
    default: 36,
    hover: 56,
    click: 24,
    link: 64,
    project: 72,
    text: 48,
  }[cursorState]

  const blobOpacity = {
    default: 0.25,
    hover: 0.45,
    click: 0.6,
    link: 0.55,
    project: 0.65,
    text: 0.35,
  }[cursorState]

  return (
    <>
      <style jsx global>{`* { cursor: none !important; }`}</style>

      {/* ── Inner dot — precise, fast ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: cursorState === 'click' ? 0.4 : cursorState === 'project' || cursorState === 'link' ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: gold }}
        />
      </motion.div>

      {/* ── Outer magnetic blob — trails, morphs ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9998] pointer-events-none flex items-center justify-center"
        style={{ x: blobX, y: blobY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: blobSize,
          height: blobSize,
          opacity: isVisible ? blobOpacity : 0,
          borderRadius: cursorState === 'project' || cursorState === 'link' ? '12px' : '50%',
          rotate: cursorState === 'project' ? 45 : 0,
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="w-full h-full rounded-[inherit] border"
          style={{ borderColor: gold }}
        />

        {/* Label inside blob */}
        <AnimatePresence>
          {label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.2 }}
              className="absolute text-[8px] font-mono font-bold tracking-[0.2em] uppercase"
              style={{ color: gold }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── Trailing glow halo — very slow, atmospheric ── */}
      <motion.div
        className="fixed top-0 left-0 z-[9997] pointer-events-none rounded-full"
        style={{
          x: blobX,
          y: blobY,
          translateX: '-50%',
          translateY: '-50%',
          width: 120,
          height: 120,
          background: `radial-gradient(circle, ${gold}18 0%, transparent 70%)`,
        }}
        animate={{ opacity: isVisible && (cursorState === 'project' || cursorState === 'link' || cursorState === 'hover') ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
    </>
  )
}

export default CustomCursor

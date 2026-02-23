'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')

    useEffect(() => {
        // Phase timing: enter → hold → exit → done
        const holdTimer = setTimeout(() => setPhase('hold'), 600)
        const exitTimer = setTimeout(() => setPhase('exit'), 2200)
        const doneTimer = setTimeout(() => onComplete(), 3200)

        return () => {
            clearTimeout(holdTimer)
            clearTimeout(exitTimer)
            clearTimeout(doneTimer)
        }
    }, [onComplete])

    return (
        <AnimatePresence>
            {phase !== 'exit' ? null : null}
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080604] overflow-hidden"
                initial={{ opacity: 1 }}
                animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
                {/* Ambient glow */}
                <div className="absolute inset-0">
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px] bg-[#d4a853]/8"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 3, ease: 'easeInOut' }}
                    />
                </div>

                <div className="relative flex flex-col items-center">
                    {/* Top monogram line */}
                    <motion.div
                        className="flex items-center gap-4 mb-6"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="h-px w-12 bg-[#d4a853]/30" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#d4a853]/60">
                            Portfolio
                        </span>
                        <div className="h-px w-12 bg-[#d4a853]/30" />
                    </motion.div>

                    {/* Main Name — cinematic reveal */}
                    <div className="overflow-hidden">
                        <motion.h1
                            className="font-serif font-black text-[clamp(2.5rem,9vw,8rem)] leading-[0.9] tracking-[-0.03em] text-center bg-gradient-to-r from-[#d4a853] via-[#f0b429] to-[#c47a4a] bg-clip-text text-transparent"
                            initial={{ y: '110%', rotateX: -15 }}
                            animate={
                                phase === 'exit'
                                    ? { y: '-20%', scale: 0.4, opacity: 0, filter: 'blur(8px)' }
                                    : { y: '0%', rotateX: 0 }
                            }
                            transition={{
                                duration: phase === 'exit' ? 0.7 : 1.2,
                                delay: phase === 'exit' ? 0 : 0.1,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ perspective: '1000px' }}
                        >
                            Sagar Bawankule
                        </motion.h1>
                    </div>

                    {/* Subtitle */}
                    <motion.p
                        className="mt-4 text-[13px] font-mono uppercase tracking-[0.4em] text-[#6b6259]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            phase === 'exit'
                                ? { opacity: 0, y: -10 }
                                : { opacity: 1, y: 0 }
                        }
                        transition={{
                            delay: phase === 'exit' ? 0 : 0.8,
                            duration: phase === 'exit' ? 0.3 : 0.8,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        AI &amp; Software Developer
                    </motion.p>

                    {/* Horizontal rule below */}
                    <motion.div
                        className="mt-8 h-px bg-gradient-to-r from-transparent via-[#d4a853]/30 to-transparent"
                        initial={{ width: 0 }}
                        animate={
                            phase === 'exit'
                                ? { width: 0, opacity: 0 }
                                : { width: 200 }
                        }
                        transition={{
                            delay: phase === 'exit' ? 0 : 1,
                            duration: phase === 'exit' ? 0.3 : 0.8,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    />
                </div>

                {/* Progress bar at bottom */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#d4a853] via-[#f0b429] to-[#c47a4a]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5, ease: 'linear' }}
                />
            </motion.div>
        </AnimatePresence>
    )
}

export default IntroAnimation

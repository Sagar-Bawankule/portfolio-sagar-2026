'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter')

    useEffect(() => {
        // Much faster: enter → hold → exit → done (total ~1.6s)
        const holdTimer = setTimeout(() => setPhase('hold'), 300)
        const exitTimer = setTimeout(() => setPhase('exit'), 1000)
        const doneTimer = setTimeout(() => onComplete(), 1600)

        return () => {
            clearTimeout(holdTimer)
            clearTimeout(exitTimer)
            clearTimeout(doneTimer)
        }
    }, [onComplete])

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080604] overflow-hidden"
                initial={{ opacity: 1 }}
                animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="relative flex flex-col items-center">
                    {/* Main Name — clean fade in */}
                    <motion.h1
                        className="font-serif font-black text-[clamp(2rem,7vw,5rem)] leading-[0.9] tracking-[-0.03em] text-center bg-gradient-to-r from-[#d4a853] via-[#f0b429] to-[#c47a4a] bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 20 }}
                        animate={
                            phase === 'exit'
                                ? { opacity: 0, y: -10 }
                                : { opacity: 1, y: 0 }
                        }
                        transition={{
                            duration: phase === 'exit' ? 0.4 : 0.6,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        Sagar Bawankule
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        className="mt-3 text-[12px] font-mono uppercase tracking-[0.3em] text-[#6b6259]"
                        initial={{ opacity: 0 }}
                        animate={
                            phase === 'exit'
                                ? { opacity: 0 }
                                : { opacity: 1 }
                        }
                        transition={{
                            delay: phase === 'exit' ? 0 : 0.3,
                            duration: 0.4,
                        }}
                    >
                        AI &amp; Software Developer
                    </motion.p>
                </div>

                {/* Progress bar at bottom */}
                <motion.div
                    className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#d4a853] via-[#f0b429] to-[#c47a4a]"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1.2, ease: 'linear' }}
                />
            </motion.div>
        </AnimatePresence>
    )
}

export default IntroAnimation

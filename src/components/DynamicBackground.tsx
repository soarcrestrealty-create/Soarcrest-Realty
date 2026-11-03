import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Ambient3DHouseCanvas } from './Ambient3DHouseCanvas';

export const DynamicBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 22,
    restDelta: 0.001,
  });

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only track mouse on devices with fine pointer (mouse/trackpad), saving battery and CPU on mobile
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    let rafId: number | null = null;
    const handleMove = (e: MouseEvent) => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 40;
        const y = (e.clientY / window.innerHeight - 0.5) * 40;
        setMouse({ x, y });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu" aria-hidden="true">
      {/* Ambient Procedural 3D Wireframe House Rotating with Scroll */}
      <Ambient3DHouseCanvas />

      {/* Dynamic Ambient Radiant Light Shafts */}
      <motion.div
        animate={{
          x: mouse.x * -1.6,
          y: mouse.y * -1.6,
          scale: [1, 1.08, 1],
          opacity: [0.65, 0.85, 0.65],
        }}
        transition={{
          x: { type: 'spring', damping: 35, stiffness: 40 },
          y: { type: 'spring', damping: 35, stiffness: 40 },
          scale: { duration: 9, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-white/20 via-[#B8925A]/25 to-transparent blur-3xl"
      />

      <motion.div
        animate={{
          x: mouse.x * 1.8,
          y: mouse.y * 1.8,
          scale: [1, 1.12, 1],
          opacity: [0.55, 0.75, 0.55],
        }}
        transition={{
          x: { type: 'spring', damping: 40, stiffness: 35 },
          y: { type: 'spring', damping: 40, stiffness: 35 },
          scale: { duration: 11, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="absolute top-1/3 -right-48 w-[650px] h-[650px] rounded-full bg-gradient-to-bl from-[#D4AF37]/30 via-white/10 to-transparent blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-10 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-t from-[#B8925A]/20 via-white/10 to-transparent blur-3xl"
      />

      {/* Floating 3D Geometric Architectural Nodes */}
      <motion.div
        animate={{
          rotate: [0, 360],
          x: mouse.x * 0.8,
          y: mouse.y * 0.8,
        }}
        transition={{
          rotate: { duration: 60, repeat: Infinity, ease: 'linear' },
          x: { type: 'spring', damping: 50 },
          y: { type: 'spring', damping: 50 },
        }}
        className="absolute top-28 right-[10%] w-48 h-48 opacity-40 hidden md:block"
      >
        <div className="w-full h-full border border-[#D4AF37]/50 rounded-3xl transform rotate-12" />
        <div className="absolute inset-4 border border-white/40 rounded-2xl transform -rotate-6" />
        <div className="absolute inset-10 border border-[#B8925A]/60 rounded-xl transform rotate-45" />
      </motion.div>

      <motion.div
        animate={{
          rotate: [360, 0],
          x: mouse.x * -0.6,
          y: mouse.y * -0.6,
        }}
        transition={{
          rotate: { duration: 75, repeat: Infinity, ease: 'linear' },
          x: { type: 'spring', damping: 50 },
          y: { type: 'spring', damping: 50 },
        }}
        className="absolute bottom-32 left-[8%] w-40 h-40 opacity-35 hidden md:block"
      >
        <div className="w-full h-full border border-white/35 rounded-full" />
        <div className="absolute inset-3 border border-[#B8925A]/50 rounded-2xl transform rotate-45" />
        <div className="absolute inset-8 border border-[#D4AF37]/60 rounded-lg transform -rotate-12" />
      </motion.div>

      {/* Prominent & Dynamic 3D Journey Connector SVG */}
      <svg
        viewBox="0 0 1000 2400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full object-cover"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="journeyGoldGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FAF8F4" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="1" />
            <stop offset="75%" stopColor="#B8925A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.85" />
          </linearGradient>

          <linearGradient id="journeySecondary" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B8925A" stopOpacity="0.3" />
          </linearGradient>

          <filter id="intenseLineGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="wideSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" result="blur" />
          </filter>
        </defs>

        {/* Faint journey roadbed and guide coordinates */}
        <path
          d="M 120 0 Q 320 400, 160 800 T 840 1450 T 220 1950 T 780 2400"
          stroke="rgba(250, 248, 244, 0.12)"
          strokeWidth="3"
          strokeDasharray="12 12"
        />

        {/* Outer wide neon aura */}
        <motion.path
          d="M 120 0 Q 320 400, 160 800 T 840 1450 T 220 1950 T 780 2400"
          stroke="url(#journeyGoldGlow)"
          strokeWidth="12"
          filter="url(#wideSoftGlow)"
          style={{ pathLength: smoothProgress }}
          strokeLinecap="round"
          className="opacity-70"
        />

        {/* The active Animated Journey Line drawing forward with scroll */}
        <motion.path
          d="M 120 0 Q 320 400, 160 800 T 840 1450 T 220 1950 T 780 2400"
          stroke="url(#journeyGoldGlow)"
          strokeWidth="5"
          filter="url(#intenseLineGlow)"
          style={{ pathLength: smoothProgress }}
          strokeLinecap="round"
          className="opacity-95"
        />

        {/* High-contrast core specular beam */}
        <motion.path
          d="M 120 0 Q 320 400, 160 800 T 840 1450 T 220 1950 T 780 2400"
          stroke="#FFFFFF"
          strokeWidth="2"
          style={{ pathLength: smoothProgress }}
          strokeLinecap="round"
          className="opacity-90"
        />

        {/* Secondary intertwining 3D resonance ribbon */}
        <motion.path
          d="M 160 0 Q 280 400, 210 800 T 800 1450 T 270 1950 T 730 2400"
          stroke="url(#journeySecondary)"
          strokeWidth="2.5"
          style={{ pathLength: smoothProgress }}
          strokeLinecap="round"
          strokeDasharray="8 6"
          className="opacity-60"
        />

        {/* Waypoint Milestone Pulse Rings along the journey */}
        {[
          { cx: 120, cy: 0, label: 'Discovery' },
          { cx: 160, cy: 800, label: 'Vetting' },
          { cx: 840, cy: 1450, label: 'Verification' },
          { cx: 220, cy: 1950, label: 'Completion' },
        ].map((node, i) => (
          <g key={i}>
            <circle
              cx={node.cx}
              cy={node.cy}
              r="9"
              fill="#07152F"
              stroke="#D4AF37"
              strokeWidth="3"
              filter="url(#intenseLineGlow)"
            />
            <circle cx={node.cx} cy={node.cy} r="4" fill="#FFFFFF" />
          </g>
        ))}
      </svg>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

export const DynamicBackground: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setMouse({ x, y });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Subtle crisp white & gold ambient light shafts in the background */}
      <motion.div
        animate={{
          x: mouse.x * -1.2,
          y: mouse.y * -1.2,
        }}
        transition={{ type: 'spring', damping: 40, stiffness: 45 }}
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-white/10 via-[#FAF8F4]/5 to-transparent blur-3xl opacity-60"
      />

      <motion.div
        animate={{
          x: mouse.x * 1.5,
          y: mouse.y * 1.5,
        }}
        transition={{ type: 'spring', damping: 50, stiffness: 40 }}
        className="absolute top-1/3 -right-40 w-[550px] h-[550px] rounded-full bg-gradient-to-bl from-[#B8925A]/15 via-white/5 to-transparent blur-3xl opacity-50"
      />

      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-t from-white/5 to-transparent blur-3xl opacity-40" />

      {/* 3D Dynamic SVG Journey Connector Line drawing based on scroll percentage */}
      <svg
        viewBox="0 0 1000 2000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full object-cover opacity-35"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="journeyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="30%" stopColor="#B8925A" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FAF8F4" stopOpacity="0.4" />
          </linearGradient>
          <filter id="lineNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Faint journey guide track (undulating 3D connector path) */}
        <path
          d="M 120 0 Q 300 350, 150 700 T 800 1250 T 200 1700 T 750 2000"
          stroke="rgba(250, 248, 244, 0.06)"
          strokeWidth="2"
          strokeDasharray="8 8"
        />

        {/* The active Animated Journey Line drawing forward with scroll */}
        <motion.path
          d="M 120 0 Q 300 350, 150 700 T 800 1250 T 200 1700 T 750 2000"
          stroke="url(#journeyGlow)"
          strokeWidth="3.5"
          filter="url(#lineNeonGlow)"
          style={{
            pathLength: smoothProgress,
          }}
          strokeLinecap="round"
        />

        {/* Secondary subtle resonant echo line for 3D depth */}
        <motion.path
          d="M 140 0 Q 320 350, 170 700 T 820 1250 T 220 1700 T 770 2000"
          stroke="rgba(184, 146, 90, 0.25)"
          strokeWidth="1.2"
          style={{
            pathLength: smoothProgress,
          }}
          strokeLinecap="round"
        />
      </svg>

      {/* Floating 3D Geometric Isometric Accent in the corner */}
      <motion.div
        animate={{
          rotateX: [15, 25, 15],
          rotateY: [20, 35, 20],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="absolute top-24 right-12 w-32 h-32 opacity-25 hidden lg:block"
      >
        <div className="w-full h-full border border-white/40 rounded-2xl transform rotate-45 backdrop-blur-[1px]" />
        <div className="absolute inset-2 border border-[#B8925A]/60 rounded-xl transform -rotate-12" />
      </motion.div>
    </div>
  );
};

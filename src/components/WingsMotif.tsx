import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export const WingsMotif: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 20;
      const y = (e.clientY / innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      animate={{
        x: mousePos.x,
        y: mousePos.y,
      }}
      transition={{ type: 'spring', damping: 30, stiffness: 60 }}
      className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-30 select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1200 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[120%] max-w-none h-auto md:w-[90%]"
      >
        <defs>
          <linearGradient id="wingGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8925A" stopOpacity="0" />
            <stop offset="50%" stopColor="#B8925A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#B8925A" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wingNavyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0B1F44" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Central Halo Rings */}
        <motion.circle
          cx="600"
          cy="300"
          r="160"
          stroke="url(#wingGoldGrad)"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 2.5, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="600"
          cy="300"
          r="90"
          stroke="#B8925A"
          strokeWidth="1"
          strokeOpacity="0.4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 1.8 }}
        />

        {/* Left Wing Architectural Sweeps */}
        <motion.path
          d="M 600 300 C 480 200, 320 160, 80 220 C 260 260, 420 320, 520 380 Z"
          stroke="#B8925A"
          strokeWidth="1.2"
          strokeOpacity="0.5"
          fill="url(#wingNavyGrad)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.8, ease: 'easeOut' }}
        />
        <motion.path
          d="M 600 300 C 440 140, 240 120, 20 200 C 220 230, 380 280, 560 330 Z"
          stroke="#B8925A"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.2, delay: 0.2, ease: 'easeOut' }}
        />
        <motion.path
          d="M 600 300 C 400 100, 200 90, 0 170 C 200 200, 340 240, 580 300 Z"
          stroke="#B8925A"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          strokeDasharray="4 6"
        />

        {/* Right Wing Architectural Sweeps */}
        <motion.path
          d="M 600 300 C 720 200, 880 160, 1120 220 C 940 260, 780 320, 680 380 Z"
          stroke="#B8925A"
          strokeWidth="1.2"
          strokeOpacity="0.5"
          fill="url(#wingNavyGrad)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.8, ease: 'easeOut' }}
        />
        <motion.path
          d="M 600 300 C 760 140, 960 120, 1180 200 C 980 230, 820 280, 640 330 Z"
          stroke="#B8925A"
          strokeWidth="0.8"
          strokeOpacity="0.3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.2, delay: 0.2, ease: 'easeOut' }}
        />
        <motion.path
          d="M 600 300 C 800 100, 1000 90, 1200 170 C 1000 200, 860 240, 620 300 Z"
          stroke="#B8925A"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          strokeDasharray="4 6"
        />

        {/* Subtle Architectural Horizontal Axes */}
        <line x1="100" y1="300" x2="1100" y2="300" stroke="#B8925A" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="8 8" />
        <line x1="600" y1="80" x2="600" y2="520" stroke="#B8925A" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="8 8" />
      </svg>
    </motion.div>
  );
};

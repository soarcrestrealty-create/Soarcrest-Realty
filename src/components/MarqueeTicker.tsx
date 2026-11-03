import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const TRUST_ITEMS = [
  'Inspected.',
  'Documented.',
  'Solicitor-checked.',
  'Traceable payments.',
  'No guesswork.',
  'Verified title before payment.',
  'Physical or live-video inspection.',
  'Direct seller relationships.',
];

export const MarqueeTicker: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`relative overflow-hidden border-y border-[#B8925A]/25 bg-[#07152F] py-3.5 select-none ${className}`}>
      {/* Subtle fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#07152F] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#07152F] to-transparent z-10" />

      <motion.div
        className="flex gap-12 whitespace-nowrap text-sm font-medium tracking-wider uppercase text-[#FAF8F4]/80"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: 28,
        }}
      >
        {/* Render twice for seamless continuous loop */}
        {[...TRUST_ITEMS, ...TRUST_ITEMS].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span className="text-[#B8925A] flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.2]" />
            </span>
            <span className="font-serif tracking-widest text-xs md:text-sm font-semibold text-[#FAF8F4]/90">
              {item}
            </span>
            <span className="text-[#B8925A]/40 text-xs">/</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

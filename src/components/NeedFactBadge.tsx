import React from 'react';

interface NeedFactBadgeProps {
  fact: string;
  className?: string;
  inline?: boolean;
}

export const NeedFactBadge: React.FC<NeedFactBadgeProps> = ({ fact, className = '', inline = true }) => {
  return (
    <span
      title="Pending verification from brand owner before public release"
      className={`group relative inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-mono font-medium tracking-wide bg-[#B8925A]/15 text-[#D4AF37] border border-[#B8925A]/35 hover:bg-[#B8925A]/25 transition-colors cursor-help ${
        inline ? 'align-middle my-0.5' : 'block my-1'
      } ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A] shrink-0" />
      <span>[NEED FACT: {fact}]</span>
    </span>
  );
};

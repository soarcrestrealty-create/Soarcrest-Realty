import React from 'react';
import { ASSETS } from '../config';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'gold';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const containerClasses = {
    sm: 'h-9',
    md: 'h-11',
    lg: 'h-16',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Official Soarcrest Realty Logo with white rounded badge for perfect crispness */}
      <div className={`relative ${containerClasses} overflow-hidden rounded-lg bg-white p-1 shadow-sm border border-[#B8925A]/40 shrink-0 flex items-center justify-center`}>
        <img
          src={ASSETS.LOGO}
          alt="Soarcrest Realty Logo"
          className="h-full w-auto object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className="font-serif font-bold tracking-wider text-[#FAF8F4] text-base md:text-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            SOARCREST
          </span>
          <span className="font-sans font-semibold text-[#B8925A] uppercase text-[10px] tracking-[0.32em] mt-0.5">
            REALTY
          </span>
        </div>
      )}
    </div>
  );
};

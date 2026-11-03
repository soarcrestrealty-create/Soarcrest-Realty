import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface MobileBottomBarProps {
  onOpenBooking: (buttonLabel: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07152F]/95 backdrop-blur-md border-t border-[#B8925A]/35 px-4 py-2.5 shadow-2xl">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="leading-tight">
          <p className="text-xs font-serif font-bold text-[#FAF8F4]">Free Discovery Call</p>
          <p className="text-[10px] text-[#B8925A]">Zero cost · No obligation</p>
        </div>
        <button
          onClick={() => onOpenBooking('Book a Free Discovery Call (Mobile Bar)')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] text-xs font-bold uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all"
        >
          <span>Book Call</span>
          <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

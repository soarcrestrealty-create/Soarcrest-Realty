import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck } from 'lucide-react';
import { ThreeDHouseInspector } from './ThreeDHouseInspector';

interface ThreeDHouseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: (label: string) => void;
}

export const ThreeDHouseModal: React.FC<ThreeDHouseModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#07152F]/90 backdrop-blur-md"
      />

      <div className="relative z-10 w-full max-w-5xl my-auto bg-[#07152F] border border-[#B8925A]/40 rounded-3xl shadow-2xl p-4 sm:p-6 text-[#FAF8F4] overflow-hidden">
        <div className="flex items-center justify-between border-b border-[#B8925A]/20 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-base sm:text-lg font-serif font-bold text-[#FAF8F4]">
              3D Architectural Structure & Vetting Inspector
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ThreeDHouseInspector
          onOpenBooking={(label) => {
            onClose();
            onOpenBooking(label);
          }}
        />
      </div>
    </div>
  );
};

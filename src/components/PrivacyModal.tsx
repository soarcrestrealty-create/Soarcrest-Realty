import React from 'react';
import { motion } from 'motion/react';
import { X, Shield } from 'lucide-react';

export const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#07152F]/85 backdrop-blur-md"
      />

      <div className="relative z-10 w-full max-w-2xl my-auto bg-[#07152F] border border-[#B8925A]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#FAF8F4] max-h-[85vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-[#B8925A]/20 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#B8925A]" />
            <h2 className="text-xl font-serif font-bold text-[#FAF8F4]">
              Privacy & Consent Notice
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-[#FAF8F4]/80 leading-relaxed">
          <p>
            At Soarcrest Realty, we treat your confidential investment intentions and personal details with utmost discretion.
          </p>
          <h4 className="font-semibold text-[#FAF8F4] uppercase tracking-wider text-xs text-[#B8925A]">
            1. Information Collection
          </h4>
          <p>
            When you complete our discovery call request, we collect your name, contact details (phone, email), investment goals, budget parameters, and time preferences.
          </p>
          <h4 className="font-semibold text-[#FAF8F4] uppercase tracking-wider text-xs text-[#B8925A]">
            2. Purpose of Use
          </h4>
          <p>
            We use these details solely to arrange your discovery call, prepare preliminary market notes relevant to your specific brief, and follow up directly with you. We do not sell, share, or broadcast your number to third-party marketing brokers or lists.
          </p>
          <h4 className="font-semibold text-[#FAF8F4] uppercase tracking-wider text-xs text-[#B8925A]">
            3. Free & Zero Obligation
          </h4>
          <p>
            Booking and attending this discovery call is completely free. No commitment or deposit is requested prior to or during this consultation.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#B8925A]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] text-xs font-bold uppercase tracking-wider"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

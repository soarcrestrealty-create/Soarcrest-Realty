import React from 'react';
import { motion } from 'motion/react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, FileText, Download, MapPin } from 'lucide-react';
import { ASSETS } from '../config';

interface SampleReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SampleReportModal: React.FC<SampleReportModalProps> = ({ isOpen, onClose }) => {
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

      <div className="relative z-10 w-full max-w-3xl my-auto bg-[#07152F] border border-[#B8925A]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#FAF8F4] max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between border-b border-[#B8925A]/20 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8925A]">
              <ShieldCheck className="w-4 h-4" />
              <span>Sample Anonymised Vetting Report</span>
              <span aria-hidden="true">·</span>
              <span>Document Ref: SC-VET-2604</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF8F4] mt-1">
              Physical Condition & Document Audit
            </h2>
            <p className="text-xs text-[#FAF8F4]/70 mt-1">
              Property: 4-Bedroom Semi-Detached Terrace, Guzape Corridor, Abuja (Anonymised for client privacy)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real Aerial Survey Beacon Photo */}
        <div className="mb-6 rounded-xl overflow-hidden border border-[#B8925A]/30 relative h-56">
          <img
            src={ASSETS.SURVEY_DRONE_PLOT}
            alt="Drone site survey beacon and boundary verification"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] px-2.5 py-1 rounded bg-[#07152F]/90 border border-[#B8925A]/40">
              Drone Aerial Survey & Coordinate Check
            </span>
            <span className="text-[10px] font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
              Beacon Verified
            </span>
          </div>
        </div>

        {/* 5-Point Vetting Checklist Breakdown */}
        <div className="space-y-5 text-sm">
          {/* Summary status */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#0B1F44] border border-[#B8925A]/20">
            <div>
              <span className="text-xs text-[#FAF8F4]/60 block">Overall Condition</span>
              <span className="font-serif font-bold text-base text-[#D4AF37]">Sound / Minor Snagging</span>
            </div>
            <div>
              <span className="text-xs text-[#FAF8F4]/60 block">Title Verification</span>
              <span className="font-serif font-bold text-base text-emerald-400">AGIS Searched · Clear</span>
            </div>
            <div>
              <span className="text-xs text-[#FAF8F4]/60 block">Estimated Remediation</span>
              <span className="font-serif font-bold text-base text-[#FAF8F4]">₦1.45M (Factored in Offer)</span>
            </div>
          </div>

          {/* Section: What We Checked */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
              1. Five-Pillar Physical Inspection
            </h3>
            
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-lg bg-[#0B1F44]/70 border border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF8F4]">Roofing & Flashing</h4>
                  <p className="text-xs text-[#FAF8F4]/75 mt-0.5">
                    Trusses inspected via access hatch. Zero sagging. Parapet water-proofing tested under artificial flood test; drainage scuppers clear.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B1F44]/70 border border-slate-700/60 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF8F4]">Plumbing & Water Pressure</h4>
                  <p className="text-xs text-[#FAF8F4]/75 mt-0.5">
                    Central pressure pump operational. Master en-suite shower mixer loose (requires washer replacement, est. ₦35,000). Borehole yield tested at 45L/min.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B1F44]/70 border border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF8F4]">Electrical Systems & Earthing</h4>
                  <p className="text-xs text-[#FAF8F4]/75 mt-0.5">
                    Distribution boards properly segmented with surge arrestors. Earth resistance measured at 4.2 ohms (within compliant 5-ohm limit). Inverter cabling pre-wired.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B1F44]/70 border border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF8F4]">Structure & Foundation Integrity</h4>
                  <p className="text-xs text-[#FAF8F4]/75 mt-0.5">
                    No diagonal settlement cracks. Retaining wall behind rear terrace structurally sound with adequate weep holes.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-lg bg-[#0B1F44]/70 border border-slate-700/60 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-[#FAF8F4]">Interior Finishes & Joinery</h4>
                  <p className="text-xs text-[#FAF8F4]/75 mt-0.5">
                    POP ceilings dry, no staining. Wardrobes aligned. Kitchen quartz countertop sealed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Title & Legal Verification */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
              2. Title & Legal Search Findings (Solicitor Opinion)
            </h3>
            <div className="p-4 rounded-xl bg-[#0B1F44] border border-[#B8925A]/30 space-y-2 text-xs">
              <p className="text-[#FAF8F4]/90 leading-relaxed">
                <strong>Registry Search at AGIS (Abuja Geographic Information Systems):</strong> Root of title confirmed via Certificate of Occupancy registered under file number FCT/AGIS/MISC/XXXXX. Ground rent fully discharged through 2025.
              </p>
              <p className="text-[#FAF8F4]/90 leading-relaxed">
                <strong>Survey Coordinates:</strong> Verified against beacon marks. Boundaries conform exactly to the approved site plan with no municipal road setbacks or government acquisition notices.
              </p>
              <p className="text-[#FAF8F4]/90 leading-relaxed">
                <strong>Vendor Due Diligence:</strong> Seller identity matched BVN and title documents. No court litigation or bank lis pendens registered against this parcel.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#B8925A]/20 flex items-center justify-between">
          <span className="text-xs text-[#FAF8F4]/60 italic">
            This is an anonymised sample of the report provided to our clients before money moves.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] text-xs font-bold uppercase tracking-wider"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};

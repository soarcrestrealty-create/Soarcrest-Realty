import React from 'react';
import { Logo } from './Logo';
import { PageRoute } from '../types';
import { ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';
import { OFFICIAL_PHONE_DISPLAY, OFFICIAL_WHATSAPP_NUMBER, OFFICIAL_EMAIL, OFFICIAL_ADDRESS } from '../config';

interface FooterProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: (buttonLabel: string) => void;
  onOpenConditionReport: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenConditionReport,
}) => {
  return (
    <footer className="relative bg-[#040C1A] text-[#FAF8F4] border-t border-[#B8925A]/30 pt-16 pb-20 md:pb-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#B8925A]/20">
          {/* Column 1: Brand & Core Statement */}
          <div className="lg:col-span-6 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-[#FAF8F4]/80 max-w-md leading-relaxed mt-3">
              Soarcrest Realty is an Abuja-based property brokerage helping Nigerians at home and abroad buy vetted, income-generating residential property.
            </p>
            <p className="font-serif italic text-base text-[#D4AF37] tracking-wide">
              We find it. We verify it. We negotiate it. We stay beside you after.
            </p>

            {/* Public verification tag */}
            <div className="pt-2">
              <button
                onClick={onOpenConditionReport}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1F44] border border-[#B8925A]/40 text-[#FAF8F4]/90 hover:text-white hover:border-[#B8925A] transition-colors text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#B8925A]" />
                <span>View Sample Vetting Report</span>
              </button>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="text-xs font-mono uppercase tracking-widest text-[#B8925A] font-semibold">
              Navigation
            </p>
            <ul className="space-y-2 text-sm text-[#FAF8F4]/75">
              {(['home', 'about', 'services', 'properties', 'contact'] as PageRoute[]).map((p) => (
                <li key={p}>
                  <button
                    onClick={() => {
                      onNavigate(p);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-[#FAF8F4] hover:underline capitalize transition-colors"
                  >
                    {p}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Corporate Details & Credentials */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#FAF8F4]/75">
            <p className="text-xs font-mono uppercase tracking-widest text-[#B8925A] font-semibold">
              Corporate Credentials
            </p>
            <div className="space-y-2.5">
              <div>
                <span className="text-[#FAF8F4]/50 flex items-center gap-1 mb-0.5">
                  <MapPin className="w-3 h-3 text-[#B8925A]" /> Office Address:
                </span>
                <span className="text-[#FAF8F4]/90 leading-snug block">
                  {OFFICIAL_ADDRESS}
                </span>
              </div>
              <div>
                <span className="text-[#FAF8F4]/50 flex items-center gap-1 mb-0.5">
                  <Phone className="w-3 h-3 text-[#B8925A]" /> Phone / WhatsApp:
                </span>
                <a
                  href={`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FAF8F4] font-medium hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{OFFICIAL_PHONE_DISPLAY}</span>
                </a>
              </div>
              <div>
                <span className="text-[#FAF8F4]/50 flex items-center gap-1 mb-0.5">
                  <Mail className="w-3 h-3 text-[#B8925A]" /> Email:
                </span>
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="text-[#FAF8F4] font-medium hover:text-[#D4AF37] transition-colors inline-block"
                >
                  {OFFICIAL_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="pt-8 space-y-4">
          <p className="text-[11px] leading-relaxed text-[#FAF8F4]/50 text-justify">
            <strong className="text-[#FAF8F4]/70">Disclaimer:</strong> This website is for information only. It is not legal, tax or investment advice. Rental yields and property values are never guaranteed, and figures shown are estimates with their assumptions stated. Every transaction should be reviewed by a qualified Nigerian solicitor, and tax questions belong with a qualified tax adviser.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#FAF8F4]/40 pt-4 border-t border-slate-900 gap-2">
            <p>© {new Date().getFullYear()} Soarcrest Realty. All rights reserved. Abuja, Nigeria.</p>
            <p>Designed for clarity, protection, and investor confidence.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

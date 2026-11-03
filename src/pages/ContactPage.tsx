import React from 'react';
import { motion } from 'motion/react';
import { BookingForm } from '../components/BookingForm';
import { Mail, Phone, MapPin, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { OFFICIAL_PHONE, OFFICIAL_PHONE_DISPLAY, OFFICIAL_WHATSAPP_NUMBER, OFFICIAL_EMAIL, OFFICIAL_ADDRESS } from '../config';

interface ContactPageProps {
  onOpenPrivacy: () => void;
  onOpenConditionReport: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenPrivacy,
  onOpenConditionReport,
}) => {
  return (
    <div className="relative overflow-hidden bg-[#0B1F44] text-[#FAF8F4] pt-28 pb-20">
      {/* SECTION 1: HERO */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-4 pb-12 border-b border-[#B8925A]/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B8925A]/40 bg-[#07152F]/80 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
          <span>Start With A Conversation</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F4] leading-tight tracking-tight">
          Let's talk. No pitch, no pressure.
        </h1>

        <p className="text-base sm:text-xl text-[#FAF8F4]/80 max-w-2xl mx-auto leading-relaxed">
          Fill in the short form below. A named person at Soarcrest will get back to you to arrange your free discovery call.
        </p>
      </section>

      {/* SECTION 2: WHAT HAPPENS NEXT */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Clear Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F4]">
            Here's exactly what happens after you hit submit.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
              <span className="text-xs font-mono font-bold text-[#D4AF37]">STAGE 01</span>
              <h3 className="font-serif font-bold text-base text-[#FAF8F4]">
                1. You get a confirmation.
              </h3>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                On screen, and by email, straight away.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
              <span className="text-xs font-mono font-bold text-[#D4AF37]">STAGE 02</span>
              <h3 className="font-serif font-bold text-base text-[#FAF8F4]">
                2. A real person reaches out.
              </h3>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                We'll contact you within 24 hours using the method and time you choose.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
              <span className="text-xs font-mono font-bold text-[#D4AF37]">STAGE 03</span>
              <h3 className="font-serif font-bold text-base text-[#FAF8F4]">
                3. We have the conversation.
              </h3>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                We'll talk about what you want to buy, what you want it to earn, your timeline and any doubts. If you're abroad, we'll schedule around your time zone.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
              <span className="text-xs font-mono font-bold text-[#D4AF37]">STAGE 04</span>
              <h3 className="font-serif font-bold text-base text-[#FAF8F4]">
                4. You decide what's next.
              </h3>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                If we're a fit, we explain how a search works and what the search and vetting fee covers. If we're not, we'll tell you honestly, and point you somewhere useful where we can.
              </p>
            </div>
          </div>

          <p className="p-4 rounded-xl bg-[#07152F] border border-[#B8925A]/30 text-center text-sm font-serif italic text-[#D4AF37]">
            At no point before or during this call are you asked to pay anything.
          </p>
        </div>
      </section>

      {/* SECTION 3 & 4: THE FORM & REASSURANCE BESIDE THE FORM */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Booking Form (Inline) */}
          <div className="lg:col-span-8">
            <BookingForm
              inline={true}
              sourcePage="contact"
              buttonLabel="Book My Free Discovery Call (Contact Page)"
              onOpenPrivacy={onOpenPrivacy}
              onOpenConditionReport={onOpenConditionReport}
            />
          </div>

          {/* Section 4: Reassurance beside the form */}
          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#07152F] border border-[#B8925A]/35 space-y-5">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8925A]">
                <ShieldCheck className="w-4 h-4" />
                <span>Reassurance</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div>
                  <h4 className="font-serif font-bold text-[#FAF8F4] text-sm">
                    "Is this for real?"
                  </h4>
                  <p className="text-[#FAF8F4]/75 mt-0.5">
                    Yes. You can ask for our registration documents on the call.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#B8925A]/15">
                  <h4 className="font-serif font-bold text-[#FAF8F4] text-sm">
                    "Will you spam me?"
                  </h4>
                  <p className="text-[#FAF8F4]/75 mt-0.5">
                    No. We use your details to arrange your call and follow up on it. That's it.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#B8925A]/15">
                  <h4 className="font-serif font-bold text-[#FAF8F4] text-sm">
                    "What if I'm not ready to buy yet?"
                  </h4>
                  <p className="text-[#FAF8F4]/75 mt-0.5">
                    Most people on a first call aren't. It's a conversation, not a commitment.
                  </p>
                </div>

                <div className="pt-2 border-t border-[#B8925A]/15">
                  <h4 className="font-serif font-bold text-[#FAF8F4] text-sm">
                    "What if I'm not sure what I want?"
                  </h4>
                  <p className="text-[#FAF8F4]/75 mt-0.5">
                    Then say that in the form. That's the exact situation the call is built for.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: OTHER WAYS TO REACH US */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-[#B8925A]/20">
        <div className="space-y-4 text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Direct Channels
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF8F4]">
            Other ways to reach us
          </h2>
          <p className="text-xs text-[#FAF8F4]/60 max-w-md mx-auto">
            The booking form above is the primary action and fast tracks your request directly to a named advisor.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-4 text-left">
            <div className="p-3.5 rounded-xl bg-[#07152F] border border-[#B8925A]/20 space-y-1">
              <span className="text-[#FAF8F4]/50 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#B8925A]" /> Phone / WhatsApp
              </span>
              <div className="pt-0.5">
                <a
                  href={`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#FAF8F4] hover:text-[#D4AF37] transition-colors"
                >
                  {OFFICIAL_PHONE_DISPLAY}
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07152F] border border-[#B8925A]/20 space-y-1">
              <span className="text-[#FAF8F4]/50 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#B8925A]" /> Email
              </span>
              <div className="pt-0.5">
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="font-medium text-[#FAF8F4] hover:text-[#D4AF37] transition-colors break-all"
                >
                  {OFFICIAL_EMAIL}
                </a>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07152F] border border-[#B8925A]/20 space-y-1">
              <span className="text-[#FAF8F4]/50 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B8925A]" /> Office Address
              </span>
              <div className="pt-0.5 text-[#FAF8F4]/90 font-medium leading-snug">
                {OFFICIAL_ADDRESS}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07152F] border border-[#B8925A]/20 space-y-1">
              <span className="text-[#FAF8F4]/50 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#B8925A]" /> Hours
              </span>
              <div className="pt-0.5 text-[#FAF8F4]/90 font-medium">
                Mon – Sat: 9:00 AM – 6:00 PM (WAT)
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

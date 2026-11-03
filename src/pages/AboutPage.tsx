import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CheckCircle2, ArrowRight, Building, Award, Target, Compass, MapPin, Phone, Mail } from 'lucide-react';
import { ASSETS, OFFICIAL_PHONE_DISPLAY, OFFICIAL_WHATSAPP_NUMBER, OFFICIAL_EMAIL, OFFICIAL_ADDRESS } from '../config';

interface AboutPageProps {
  onOpenBooking: (buttonLabel: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="relative overflow-hidden text-[#FAF8F4] pt-28 pb-20">
      {/* SECTION 1: HERO */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6 pb-16 border-b border-[#B8925A]/20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B8925A]/40 bg-[#07152F]/80 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
          <span>Our Foundation</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F4] leading-tight tracking-tight">
          We started with one belief: more people should be able to own property.
        </h1>

        <p className="text-base sm:text-xl text-[#FAF8F4]/80 max-w-2xl mx-auto leading-relaxed">
          And one uncomfortable observation: most people who want to invest in Nigerian property have been scared off by the process, not by the price.
        </p>

        {/* Hero Architectural Image */}
        <div className="pt-6 max-w-3xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-[#B8925A]/40 shadow-2xl h-64 sm:h-80">
            <img
              src={ASSETS.HILLSIDE_MANSION}
              alt="Abuja hillside prime residential property"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/20 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-left">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] px-2 py-0.5 rounded bg-[#07152F]/90 border border-[#B8925A]/40">
                Capital Protection Thesis
              </span>
              <p className="text-sm font-serif font-bold text-white mt-1">
                Protecting investor capital in Nigeria's most resilient locations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY SOARCREST EXISTS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            The Problem We Couldn't Ignore
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            The problem we couldn't ignore.
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-[#FAF8F4]/80 leading-relaxed">
            <p>
              Talk to enough people about buying property in Nigeria and you hear the same stories.
            </p>
            <div className="p-5 rounded-2xl bg-[#07152F] border border-[#B8925A]/25 space-y-2 text-sm sm:text-base italic text-[#D4AF37]">
              <p>A plot that was sold twice.</p>
              <p>A project that stopped halfway.</p>
              <p>A document that turned out not to mean what everyone said it meant.</p>
              <p>An agent who vanished the day after the commission landed.</p>
            </div>
            <p>
              For a lot of people, those stories became the whole reason not to try. Property felt like something that happened to other people: wealthier ones, better connected ones, people with someone "inside".
            </p>
            <p>
              We didn't think that was a fair outcome. The problem isn't that Nigerians can't invest in property. It's that too many have been asked to trust people who haven't earned it.
            </p>
            <p className="text-xl font-serif text-[#FAF8F4] font-semibold pt-2">
              So we built a brokerage around earning it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: WHAT WE STAND FOR */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Core Convictions
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Four things we won't trade for a sale.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-7 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-3">
            <span className="text-xs font-mono text-[#D4AF37]">01 / INTEGRITY</span>
            <h3 className="text-xl font-serif font-bold text-[#FAF8F4]">
              Integrity over the close.
            </h3>
            <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
              We don't exaggerate to push a deal. If a nearby landmark doesn't move the value much, we won't pretend it does.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-3">
            <span className="text-xs font-mono text-[#D4AF37]">02 / PROTECTION</span>
            <h3 className="text-xl font-serif font-bold text-[#FAF8F4]">
              Protection is intentional.
            </h3>
            <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
              Deals can go wrong. That's real estate. They won't go wrong because we cared more about closing than about you.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-3">
            <span className="text-xs font-mono text-[#D4AF37]">03 / OPENNESS</span>
            <h3 className="text-xl font-serif font-bold text-[#FAF8F4]">
              Transparency, to the limit of the law.
            </h3>
            <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
              You see the condition report, the search results and the receipts.
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-3">
            <span className="text-xs font-mono text-[#D4AF37]">04 / CONTINUITY</span>
            <h3 className="text-xl font-serif font-bold text-[#FAF8F4]">
              We stay after the deal.
            </h3>
            <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
              If something goes wrong after completion, we're the hand that helps you sort it out.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: HOW WE THINK (THE INVESTOR MINDSET) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Analytical Rigor
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            We talk about property the way an investor would.
          </h2>

          <div className="p-7 sm:p-9 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-5 text-base sm:text-lg text-[#FAF8F4]/80 leading-relaxed">
            <p className="text-xl font-serif text-[#D4AF37]">
              Not "4 minutes from the airport." Not "dream home." We talk in income, strategy and timeline.
            </p>
            <p>
              A neighbourhood isn't a lifestyle. It's a thesis: who rents here, what's driving demand, what the infrastructure is doing, what the watch-outs are. Some districts trade yield for capital security. Others trade security for growth. The right answer depends on what you want your money to do.
            </p>
            <p>
              And we'll never hand you one glossy number with no source. When we quote a figure, we label it gross or net, show the range and explain the assumption.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHY PEOPLE TRUST THE PROCESS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Concrete Verification
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Trust isn't a slogan. It's a checklist.
          </h2>
          <p className="text-base text-[#FAF8F4]/80">
            Here's what sits behind every property we put in front of a client:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              'Physical or virtual site vetting before it ever reaches you',
              'A written condition report: structural, plumbing, electrical and aesthetic',
              'Independent title verification by a qualified solicitor, shared in writing',
              'Direct relationships with owners and developers, rather than layers of sub-agents',
              'Partnerships only with developers who have delivered projects',
              'Legally structured co-ownership agreements where several investors share a property',
              "Payments only through traceable, documented channels, into accounts in the name of the verified seller or developer, or a solicitor's client account",
            ].map((check, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#07152F] border border-[#B8925A]/25 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B8925A] shrink-0 mt-0.5" />
                <span className="text-sm text-[#FAF8F4]/85 leading-relaxed">{check}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6: STRAIGHT TALK ABOUT MONEY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Remuneration Transparency
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            How we get paid.
          </h2>
          <p className="text-base text-[#FAF8F4]/80">
            You deserve to know where our incentives sit.
          </p>

          <div className="space-y-4">
            <div className="p-5 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#D4AF37]">
                Search & Vetting Fee
              </h4>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                Serious buyers pay a search and vetting fee that funds a dedicated, accountable process. This fee is refundable only if we don't deliver.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#D4AF37]">
                Brokerage Commission
              </h4>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                When a deal completes, Soarcrest earns a commission, paid according to the written agreement. We'll tell you in writing who pays it.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
              <h4 className="font-serif font-bold text-base text-[#D4AF37]">
                Ongoing Management
              </h4>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                On co-investment deals we may also manage the asset for an ongoing fee, agreed upfront.
              </p>
            </div>
          </div>

          <p className="text-sm text-[#FAF8F4]/90 font-serif italic pt-2">
            Nothing is hidden, and nothing is a surprise on completion day.
          </p>
        </div>
      </section>

      {/* SECTION 7: CORPORATE DETAILS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Corporate Presence
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Who we are on paper.
          </h2>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-4 text-sm text-[#FAF8F4]/80">
            <div>
              <span className="text-[#FAF8F4]/50 block text-xs">Brokerage:</span>
              <span className="text-[#FAF8F4] font-medium text-base">Soarcrest Realty</span>
            </div>

            <div>
              <span className="text-[#FAF8F4]/50 block text-xs">Office Address:</span>
              <span className="text-[#FAF8F4] font-medium flex items-start gap-1.5 mt-0.5">
                <MapPin className="w-4 h-4 text-[#B8925A] shrink-0 mt-0.5" />
                <span>{OFFICIAL_ADDRESS}</span>
              </span>
            </div>

            <div>
              <span className="text-[#FAF8F4]/50 block text-xs">Official Contact & WhatsApp:</span>
              <a
                href={`https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4AF37] hover:underline font-medium inline-flex items-center gap-1.5 mt-0.5"
              >
                <Phone className="w-4 h-4 text-[#B8925A]" />
                <span>{OFFICIAL_PHONE_DISPLAY}</span>
              </a>
            </div>

            <div>
              <span className="text-[#FAF8F4]/50 block text-xs">Official Email:</span>
              <a
                href={`mailto:${OFFICIAL_EMAIL}`}
                className="text-[#D4AF37] hover:underline font-medium inline-flex items-center gap-1.5 mt-0.5"
              >
                <Mail className="w-4 h-4 text-[#B8925A]" />
                <span>{OFFICIAL_EMAIL}</span>
              </a>
            </div>

            <p className="text-sm font-semibold text-[#D4AF37] pt-2 border-t border-[#B8925A]/20">
              Ask us for any verification documents or title search audits at any time. We'd rather you check.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: WHERE THIS IS GOING */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#07152F] border border-[#B8925A]/35 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            The Horizon
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            The long game.
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#FAF8F4]/80 leading-relaxed">
            <p>
              Our ambition is to become the most trusted name in African real estate investment, and to change how value is measured: not just by the price of land, but by what a property makes possible. Income. Opportunity. Entrepreneurship.
            </p>
            <p>
              One day, that includes Soarcrest City: a planned, solar-powered estate where homes, offices, a startup community, dining and recreation share one address. Founders could live inside it while they build. Further out, we hope to help make affordable housing and long-term home financing realistic across Africa.
            </p>
            <p className="text-sm sm:text-base text-[#FAF8F4]/70 italic pt-2 border-t border-[#B8925A]/20">
              To be clear: those are directions, not products. We won't date them, price them or take deposits for them until each is real and documented. For now, the work is simple. Vet properly, verify properly, protect the client.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9: CLOSING CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF8F4] tracking-tight">
          Come and talk to us. See if it feels right.
        </h2>
        <p className="text-base sm:text-lg text-[#FAF8F4]/80 max-w-xl mx-auto">
          Bring your budget, your goal and your doubts. Especially the doubts.
        </p>

        <div className="pt-2">
          <button
            onClick={() => onOpenBooking('Book a Free Discovery Call (About Closing)')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] font-bold text-sm tracking-wide uppercase hover:brightness-110 active:scale-95 transition-all shadow-xl gold-glow"
          >
            <span>Book a Free Discovery Call</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </section>
    </div>
  );
};

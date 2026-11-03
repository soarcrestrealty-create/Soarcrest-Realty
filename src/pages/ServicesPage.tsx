import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  FileText, 
  Search, 
  Wrench, 
  Scale, 
  Handshake, 
  Users, 
  Globe, 
  Activity, 
  Home as HomeIcon,
  CheckCircle2,
  Camera,
  XCircle,
  Eye
} from 'lucide-react';
import { ASSETS } from '../config';

interface ServicesPageProps {
  onOpenBooking: (buttonLabel: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [activeServiceId, setActiveServiceId] = useState<number>(1);

  const services = [
    {
      id: 1,
      num: '01',
      title: 'Discovery and Investment Brief',
      headline: 'We start with you, not with a listing.',
      icon: FileText,
      description: 'Before we show you anything, we sit down (on a call, wherever you are) and work out: what income you want, over what period, how much risk you can stomach and what you\'re not willing to risk. All of it goes into a one-page brief that you sign off.',
      whatYouGet: 'a written brief that every search, shortlist and negotiation is measured against.',
    },
    {
      id: 2,
      num: '02',
      title: 'Dedicated Search and Shortlist',
      headline: 'A managed search, not a list of ads.',
      icon: Search,
      description: 'We source options against your brief, including properties from our direct relationships with owners and developers, and from other brokerages. You score each shortlisted property from 1 to 10. Below your threshold, we keep searching. Above it, we move to full vetting.',
      feeNote: 'Serious buyers fund this with a dedicated search and vetting fee. This fee is refundable only if we don\'t deliver.',
      whatYouGet: 'a scored shortlist with reasons, and an accountable search.',
    },
    {
      id: 3,
      num: '03',
      title: 'Property Vetting',
      headline: 'We go and look at the plumbing.',
      icon: Wrench,
      image: ASSETS.CONTEMPORARY_DUPLEX,
      imageLabel: 'Physical Site Vetting in Progress',
      description: 'Every property is inspected, in person or by live video, before it\'s shown to you as a serious option. We check: Roofing, Plumbing, Electrical systems, Structure, Interior condition. Then we write it all up.',
      whatYouGet: 'a written condition report, photos, a video walk-through and a virtual tour. If a property is unfinished, we may show an architectural visualization so you can picture the finished result. It will always be clearly labelled as a visualization, never passed off as the real thing.',
    },
    {
      id: 4,
      num: '04',
      title: 'Title and Legal Verification',
      headline: 'Paper checks before money moves.',
      icon: Scale,
      image: ASSETS.APARTMENT_BLOCK,
      imageLabel: 'AGIS Boundary & Registry Title Verification',
      description: 'A property can look perfect and still carry a problem in its documents. So an independent solicitor reviews the document chain, and the title is searched at the land registry (AGIS, in the FCT) before further payment is made.\n\nThings the check looks at include: whether the seller\'s ID matches the name on the title, whether ground rent is current, whether the survey plan matches the plot, what consents exist and what\'s still outstanding, and whether there are any encumbrances or acquisition notices.',
      extraNote: 'A note we\'ll always repeat: we coordinate verification, and the solicitor on your deal decides what applies. We don\'t give legal advice.',
      whatYouGet: 'the registry search results and a written solicitor\'s opinion, shared with you before the main payment.',
    },
    {
      id: 5,
      num: '05',
      title: 'Negotiation and Deal Structuring',
      headline: 'Strong terms, fairly won.',
      icon: Handshake,
      description: 'We negotiate price and basic terms on your behalf, push for fixed-price contracts with a written variation clause, and, where it makes sense, payments staged against milestones rather than one big transfer.',
      whatYouGet: 'an offer letter, receipts, and terms you understand before you sign.',
    },
    {
      id: 6,
      num: '06',
      title: 'Co-Investment Structuring',
      headline: 'Own a share of a real property, with people you can name.',
      icon: Users,
      description: 'Pooling money is how many people get into property. We make it safe: a written co-ownership agreement covering each person\'s share, how decisions are made, who manages the property, what happens when someone wants out or stops contributing, and how income and costs are split.\n\nSoarcrest can then manage the asset and the relationship between co-owners on an ongoing basis.',
      feeNote: 'Management terms and profit distribution structures are agreed upfront in writing before pooling funds.',
      whatYouGet: 'a structured, documented, managed shared purchase.',
    },
    {
      id: 7,
      num: '07',
      title: 'Diaspora Remote Buying',
      headline: 'Buy from abroad without trusting a stranger\'s WhatsApp.',
      icon: Globe,
      image: ASSETS.VETTED_COMMUNITY,
      imageLabel: 'Live Ground Representation & Video Walkthrough',
      description: 'Video call with a named advisor. Live video inspections you can watch as they happen. Registry search and solicitor\'s opinion before you pay. Payment instructions confirmed on a recorded call and in writing. Receipts returned within one working day. A photographed handover.\n\nIf powers of attorney, foreign-currency payments or tax in your country of residence come up, we\'ll refer you to qualified professionals, not guess.',
      whatYouGet: 'the whole process, handled end-to-end, with proof at each stage.',
    },
    {
      id: 8,
      num: '08',
      title: 'Transaction Tracker',
      headline: '"What\'s happening with my property?" Never a mystery.',
      icon: Activity,
      description: 'You can see every stage of your purchase: search, vetting, title, payment, consent, handover. Documents attached to each stage.',
      whatYouGet: 'a real-time transparent timeline with verified deeds and inspection reports.',
    },
    {
      id: 9,
      num: '09',
      title: 'After-Sale Care and Property Management (optional)',
      headline: 'We don\'t disappear after the commission.',
      icon: HomeIcon,
      description: 'A dedicated check-in after completion.',
      extraNote: 'If you\'d like us to keep looking after the asset, an optional management agreement covers maintenance and periodic owner reports, with photos and an income statement.',
      whatYouGet: 'ongoing tenant management, quarterly condition inspections, and transparent yield disbursements.',
    },
  ];

  return (
    <div className="relative overflow-hidden text-[#FAF8F4] pt-28 pb-20">
      {/* SECTION 1: HERO */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6 pb-16 border-b border-[#B8925A]/20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B8925A]/40 bg-[#07152F]/80 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
          <span>Our Services</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F4] leading-tight tracking-tight">
          What you're actually paying us to do.
        </h1>

        <p className="text-base sm:text-xl text-[#FAF8F4]/80 max-w-2xl mx-auto leading-relaxed">
          Finding the property is the easy part. Making sure it's real, sound, fairly priced and properly transferred is the part that protects your money. Here's the whole job, laid out.
        </p>

        <div className="pt-2">
          <button
            onClick={() => onOpenBooking('Book a Free Discovery Call (Services Hero)')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#B8925A] via-[#C5A059] to-[#D4AF37] text-[#07152F] font-bold text-sm tracking-wide uppercase hover:brightness-110 active:scale-95 transition-all shadow-xl gold-glow"
          >
            <span>Book a Free Discovery Call</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </section>

      {/* SECTION 2: THE ONE-LINE VERSION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            The One-Line Version
          </span>
          <p className="text-base sm:text-lg text-[#FAF8F4]/90 leading-relaxed">
            We're a property brokerage. That means we sit between sellers (owners and developers) and buyers, and we earn a commission when a deal completes. Our niche is investment-grade residential property: homes bought for rental income, short-let income or appreciation.
          </p>
          <p className="text-lg sm:text-xl font-serif font-semibold text-[#D4AF37]">
            What makes us different is the order we do things in, and how much of it you can see.
          </p>
        </div>
      </section>

      {/* SECTION 3: THE SERVICES (STICKY-SIDE / INTERACTIVE LAYOUT) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-[#B8925A]/20">
        <div className="mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A] block">
            End-To-End Protection
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            The Services
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Navigation Column */}
          <div className="lg:col-span-4 sticky top-28 space-y-2 max-h-[80vh] overflow-y-auto pr-2">
            {services.map((s) => {
              const isActive = activeServiceId === s.id;
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveServiceId(s.id);
                    const el = document.getElementById(`service-card-${s.id}`);
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left border transition-all ${
                    isActive
                      ? 'bg-[#07152F] border-[#B8925A] text-[#FAF8F4] shadow-md'
                      : 'bg-transparent border-slate-800 text-[#FAF8F4]/60 hover:text-[#FAF8F4] hover:bg-[#07152F]/40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#B8925A] font-bold">{s.num}</span>
                    <span className="text-xs font-semibold">{s.title}</span>
                  </div>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Service Presentation */}
          <div className="lg:col-span-8 space-y-8">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  id={`service-card-${s.id}`}
                  key={s.id}
                  className={`p-7 sm:p-9 rounded-2xl bg-[#07152F] border transition-all ${
                    activeServiceId === s.id
                      ? 'border-[#B8925A] shadow-xl'
                      : 'border-[#B8925A]/25'
                  }`}
                >
                  <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-[#B8925A] mb-3">
                    <span className="w-6 h-6 rounded-md bg-[#0B1F44] border border-[#B8925A]/40 flex items-center justify-center font-bold">
                      {s.num}
                    </span>
                    <span>Service {s.id} of 9</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF8F4]">
                    {s.title}
                  </h3>
                  <h4 className="font-serif italic text-base sm:text-lg text-[#D4AF37] mt-1 mb-4">
                    Headline: {s.headline}
                  </h4>

                  {/* Optional authentic service visual */}
                  {s.image && (
                    <div className="mb-5 rounded-xl overflow-hidden border border-[#B8925A]/30 h-52 relative group">
                      <img
                        src={s.image}
                        alt={s.imageLabel || s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-transparent to-transparent" />
                      {s.imageLabel && (
                        <div className="absolute bottom-3 left-3 text-[11px] font-mono text-[#D4AF37] bg-[#07152F]/90 px-2.5 py-1 rounded border border-[#B8925A]/35">
                          {s.imageLabel}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="space-y-4 text-sm sm:text-base text-[#FAF8F4]/80 leading-relaxed">
                    <p className="whitespace-pre-line">{s.description}</p>

                    {s.feeNote && (
                      <div className="p-4 rounded-xl bg-[#0B1F44] border border-[#B8925A]/30 text-xs sm:text-sm text-[#FAF8F4]/85">
                        <p>{s.feeNote}</p>
                      </div>
                    )}

                    {s.extraNote && (
                      <p className="text-xs sm:text-sm italic text-[#FAF8F4]/70 border-l-2 border-[#B8925A] pl-3 py-1">
                        {s.extraNote}
                      </p>
                    )}

                    {/* What you get */}
                    <div className="pt-3 border-t border-[#B8925A]/20">
                      <p className="text-sm font-semibold text-[#FAF8F4]">
                        <strong className="text-[#D4AF37]">What you get:</strong> {s.whatYouGet}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROFESSIONAL MEDIA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            <Camera className="w-4 h-4" />
            <span>Professional Media</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F4]">
            See it properly before you commit.
          </h2>
          <p className="text-base text-[#FAF8F4]/85 leading-relaxed">
            Our in-house photography, video and virtual tours exist for a practical reason: so you can make a confident decision, wherever you are. Not so a house can look better than it is.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-xl overflow-hidden border border-[#B8925A]/30 h-48 relative">
              <img
                src={ASSETS.APARTMENT_BLOCK}
                alt="Architectural audit photography"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/60 px-2 py-0.5 rounded">
                Unfiltered Structural State
              </div>
            </div>
            <div className="rounded-xl overflow-hidden border border-[#B8925A]/30 h-48 relative">
              <img
                src={ASSETS.TERRACES_STREET}
                alt="Surrounding neighborhood context"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-[10px] font-mono text-white bg-black/60 px-2 py-0.5 rounded">
                Street Access & Paved Infrastructure
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHAT THIS COSTS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-4 mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Clear Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Let's talk about money, because you're wondering.
          </h2>
          <p className="text-base text-[#FAF8F4]/80">
            Here's the structure, in plain terms:
          </p>
        </div>

        {/* Cost Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#B8925A]/35 bg-[#07152F]">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#B8925A]/30 bg-[#0B1F44] text-[#D4AF37] text-xs font-mono uppercase tracking-wider">
                <th className="py-4 px-5">What</th>
                <th className="py-4 px-5">Who normally pays</th>
                <th className="py-4 px-5">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#B8925A]/15 text-[#FAF8F4]/85">
              <tr>
                <td className="py-4 px-5 font-semibold text-[#FAF8F4]">Discovery call</td>
                <td className="py-4 px-5 text-emerald-400 font-medium">Nobody. It's free</td>
                <td className="py-4 px-5">No obligation</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-semibold text-[#FAF8F4]">Search and vetting fee</td>
                <td className="py-4 px-5">You, if you proceed</td>
                <td className="py-4 px-5 text-xs text-[#FAF8F4]/80">
                  <span className="font-medium text-[#D4AF37]">Refundable only if we don't deliver.</span> Funds an exhaustive, dedicated inspection and documentation vetting process.
                </td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-semibold text-[#FAF8F4]">Brokerage commission</td>
                <td className="py-4 px-5">Per agreement, often the seller, sometimes shared</td>
                <td className="py-4 px-5">We state it in writing</td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-semibold text-[#FAF8F4]">Legal, consent, registration, stamp duty, survey</td>
                <td className="py-4 px-5">Usually the buyer</td>
                <td className="py-4 px-5">
                  Fees vary. We'll get fixed quotes and confirm current FCT charges before quoting numbers
                </td>
              </tr>
              <tr>
                <td className="py-4 px-5 font-semibold text-[#FAF8F4]">Property management (optional)</td>
                <td className="py-4 px-5">You, if you choose it</td>
                <td className="py-4 px-5">Agreed upfront</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-[#FAF8F4]/75 leading-relaxed">
          Beyond the price of the property itself, expect additional purchase costs. We'll walk through them on the call so nothing surprises you on completion day. We won't quote a percentage until it's been confirmed against current Abuja schedules.
        </p>
      </section>

      {/* SECTION 6: HONEST LIMITS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Honest Limits
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            What we don't do.
          </h2>

          <div className="space-y-3">
            {[
              "We don't guarantee returns. Nobody honest can.",
              "We don't give legal or tax advice. We bring in solicitors and tax advisers who do.",
              "We don't take payments into personal accounts, ever.",
              "We don't take reservations or deposits for Soarcrest City. It's a plan, not a product.",
            ].map((limit, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#07152F] border border-red-500/25 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base text-[#FAF8F4]/85 leading-relaxed font-medium">
                  {limit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: CLOSING CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF8F4] tracking-tight">
          Not sure which of these you need? Good. That's what the call is for.
        </h2>
        <p className="text-base sm:text-lg text-[#FAF8F4]/80 max-w-xl mx-auto">
          Tell us where you are, and we'll tell you where to start.
        </p>

        <div className="pt-2">
          <button
            onClick={() => onOpenBooking('Book a Free Discovery Call (Services Closing)')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#B8925A] via-[#C5A059] to-[#D4AF37] text-[#07152F] font-bold text-sm tracking-wide uppercase hover:brightness-110 active:scale-95 transition-all shadow-xl gold-glow"
          >
            <span>Book a Free Discovery Call</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </section>
    </div>
  );
};

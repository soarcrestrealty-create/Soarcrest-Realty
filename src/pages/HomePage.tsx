import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  ShieldCheck, 
  Scale, 
  Globe, 
  Users, 
  Building2, 
  ChevronDown, 
  FileSearch,
  Eye,
  FileCheck,
  Compass,
  MapPin
} from 'lucide-react';
import { PageRoute } from '../types';
import { WingsMotif } from '../components/WingsMotif';
import { MarqueeTicker } from '../components/MarqueeTicker';
import { NeedFactBadge } from '../components/NeedFactBadge';
import { ASSETS } from '../config';

interface HomePageProps {
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: (buttonLabel: string) => void;
  onOpenConditionReport: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenConditionReport,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToTimeline = () => {
    const el = document.getElementById('how-it-works-timeline');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden text-[#FAF8F4]">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#B8925A]/25">
        {/* Subtle grid pattern & Wings motif */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
        <WingsMotif />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          {/* Small caps kicker */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B8925A]/40 bg-[#07152F]/90 text-[#D4AF37] text-xs font-mono tracking-widest uppercase shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8925A]" />
            <span>Abuja Investment Property Brokerage</span>
          </motion.div>

          {/* Headline reveals line by line */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F4] leading-[1.14] tracking-tight max-w-4xl mx-auto"
            style={{ textWrap: 'balance' }}
          >
            Yes, you can buy property in Nigeria. And you can know it's real before you pay.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg lg:text-xl text-[#FAF8F4]/80 max-w-2xl mx-auto leading-relaxed"
          >
            Soarcrest Realty finds, vets and negotiates income-generating homes for Nigerians at home and abroad. Then we stay beside you after the deal is done.
          </motion.p>

          {/* Gold Hairline Sweep */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.45 }}
            className="w-36 h-[1.5px] mx-auto gold-hairline"
          />

          {/* Primary CTA + Under Button Note */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="pt-2 space-y-2"
          >
            <button
              onClick={() => onOpenBooking('Book a Free Discovery Call (Hero)')}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#B8925A] via-[#C5A059] to-[#D4AF37] text-[#07152F] font-bold text-sm sm:text-base tracking-wide uppercase hover:brightness-110 active:scale-95 transition-all shadow-xl gold-glow hover:gold-glow-hover"
            >
              <span>Book a Free Discovery Call</span>
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
            <p className="text-xs text-[#FAF8F4]/60 font-sans">
              A conversation, not a sales pitch. Booking costs nothing.
            </p>
          </motion.div>

          {/* Hero Architectural Visual Showcase: Abuja City Gate & Modern Terraces */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.65 }}
            className="pt-8 grid grid-cols-1 md:grid-cols-12 gap-4 max-w-4xl mx-auto text-left"
          >
            <div className="md:col-span-7 relative rounded-2xl overflow-hidden border border-[#B8925A]/40 shadow-2xl group h-64 sm:h-72">
              <img
                src={ASSETS.ABUJA_GATE}
                alt="Abuja City Gate Welcome"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] px-2 py-0.5 rounded bg-[#07152F]/80 border border-[#B8925A]/40">
                  Federal Capital Territory, Abuja
                </span>
                <p className="text-sm font-serif font-bold text-white mt-1">
                  Nigeria's premier capital security & property growth corridor
                </p>
              </div>
            </div>

            <div className="md:col-span-5 relative rounded-2xl overflow-hidden border border-[#B8925A]/40 shadow-2xl group h-64 sm:h-72">
              <img
                src={ASSETS.TERRACES_STREET}
                alt="Contemporary Abuja Terraces"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 px-2 py-0.5 rounded bg-[#07152F]/80 border border-emerald-500/40">
                  Vetted Residential Enclaves
                </span>
                <p className="text-sm font-serif font-bold text-white mt-1">
                  Physical condition & title verified before payment
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE TRUST TICKER */}
      <MarqueeTicker />

      {/* SECTION 2: THE HONEST OPENING */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A] block">
            The Honest Opening
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Let's be honest about what you're probably thinking.
          </h2>

          <div className="space-y-5 text-base sm:text-lg text-[#FAF8F4]/80 leading-relaxed">
            <p>
              You've been thinking about property for a while. Maybe you've got savings that aren't doing enough. Maybe you're abroad, sending money home, wanting something solid to show for it. Maybe you've got a lump sum and a sinking feeling that the wrong decision could cost you years.
            </p>
            <p className="text-[#FAF8F4] font-medium">
              And then there's the voice in the back of your head:
            </p>

            {/* Direct quoted objections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 pb-2">
              <div className="p-4 rounded-xl bg-[#07152F] border border-[#B8925A]/30 italic text-sm text-[#D4AF37]">
                "What if the documents are fake?"
              </div>
              <div className="p-4 rounded-xl bg-[#07152F] border border-[#B8925A]/30 italic text-sm text-[#D4AF37]">
                "What if someone else already sold it?"
              </div>
              <div className="p-4 rounded-xl bg-[#07152F] border border-[#B8925A]/30 italic text-sm text-[#D4AF37]">
                "What if I pay, and the project never gets finished?"
              </div>
            </div>

            <p>
              Those aren't silly questions. They're the right ones. Forged documents, double sales and abandoned projects are real problems in this market, and anyone who tells you otherwise is selling you something.
            </p>
            <p className="text-lg sm:text-xl font-serif text-[#FAF8F4] font-semibold pt-2">
              So we're not going to ask you to ignore the doubt. We're going to build the whole company around it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: THE SHIFT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A] block">
              The Shift
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
              Here's what we do differently.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#FAF8F4]/80 leading-relaxed">
              <p className="text-xl sm:text-2xl font-serif text-[#FAF8F4] font-semibold">
                Most agents show you listings and hope you fall in love.
              </p>
              <p>
                We start somewhere else. Before we show you a single property, we ask what income you want, over how long, and what you're not willing to risk. Then we go and look at the plumbing.
              </p>
              <p>
                That's not a figure of speech. Every property we put in front of you has been inspected: roofing, plumbing, electrical, structure, interior. You get the findings in writing, with photos and video, before you decide anything.
              </p>
              <p>
                Then the title gets checked by an independent solicitor, and you see the result in writing before the main payment moves.
              </p>

              <div className="pt-2">
                <button
                  onClick={scrollToTimeline}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-[#B8925A] text-[#D4AF37] hover:bg-[#B8925A]/15 text-sm font-semibold transition-colors"
                >
                  <span>See How the Process Works</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden border border-[#B8925A]/40 shadow-2xl">
            <img
              src={ASSETS.VETTED_COMMUNITY}
              alt="Physical site inspection in progress"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] px-2 py-0.5 rounded bg-[#07152F]/90 border border-[#B8925A]/40">
                On-Site Vetting
              </span>
              <p className="text-xs text-white/90 mt-1">
                Real engineers and advisors on site verifying access roads and infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: WHAT YOU GET */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto border-b border-[#B8925A]/20">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Core Framework
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Find. Verify. Negotiate. Stay.
          </h2>
          <div className="w-24 h-[1px] mx-auto gold-hairline mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {/* Card 1 */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 flex flex-col justify-between hover:border-[#B8925A] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0B1F44] border border-[#B8925A]/40 flex items-center justify-center text-[#D4AF37] font-serif text-xl font-bold">
                01
              </div>
              <h3 className="text-xl font-serif font-bold text-[#FAF8F4]">
                1. We find.
              </h3>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                We work from your budget, your goal and your timeline, not from whatever we happen to have in stock. You score every shortlisted property from 1 to 10. If it doesn't clear your bar, we keep looking.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 flex flex-col justify-between hover:border-[#B8925A] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0B1F44] border border-[#B8925A]/40 flex items-center justify-center text-[#D4AF37] font-serif text-xl font-bold">
                02
              </div>
              <h3 className="text-xl font-serif font-bold text-[#FAF8F4]">
                2. We verify.
              </h3>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                Physical or live-video inspection. A written condition report. A title search and a solicitor's written opinion. You see the evidence, not our assurance.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 flex flex-col justify-between hover:border-[#B8925A] transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#0B1F44] border border-[#B8925A]/40 flex items-center justify-center text-[#D4AF37] font-serif text-xl font-bold">
                03
              </div>
              <h3 className="text-xl font-serif font-bold text-[#FAF8F4]">
                3. We negotiate and stay.
              </h3>
              <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
                We negotiate the terms, track every stage of the transaction, and remain involved after completion. If something needs sorting out later, you're not on your own.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: HOW IT WORKS (8-STEP TIMELINE) */}
      <section id="how-it-works-timeline" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            The 8-Step Buying Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            From first call to keys in hand. No guesswork.
          </h2>
          <p className="text-sm sm:text-base text-[#FAF8F4]/75">
            We built the process so you never wonder what's happening. At every step, you can see the proof.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative pl-8 sm:pl-10 space-y-10 border-l-2 border-[#B8925A]/35">
          {[
            {
              step: 'Step 1',
              title: 'Book a call.',
              desc: 'Fill in a short form. A named person gets back to you. No complicated onboarding.',
            },
            {
              step: 'Step 2',
              title: 'We write your brief.',
              desc: 'Budget, goal, income type, timeline, risk tolerance, on one page. You sign it off.',
            },
            {
              step: 'Step 3',
              title: 'We search and shortlist.',
              desc: 'You get options with scores and reasons.',
            },
            {
              step: 'Step 4',
              title: 'We vet.',
              desc: 'Inspection, photos, video walk-through, written condition report.',
            },
            {
              step: 'Step 5',
              title: 'You decide.',
              desc: "Review the report and the tour. We negotiate basic terms. You pay a deposit only when you're ready.",
            },
            {
              step: 'Step 6',
              title: 'We verify the title.',
              desc: 'An independent solicitor checks the document chain and gives you a written opinion before further payment.',
            },
            {
              step: 'Step 7',
              title: 'Completion.',
              desc: 'Payment per the contract, deed executed, consent and registration tracked, keys handed over.',
            },
            {
              step: 'Step 8',
              title: 'We stay.',
              desc: 'Optional property management and periodic owner reports, so someone is still looking after the asset.',
            },
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[41px] sm:-left-[49px] top-1.5 w-5 h-5 rounded-full bg-[#07152F] border-2 border-[#B8925A] flex items-center justify-center group-hover:scale-125 transition-transform">
                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
              </div>

              <div className="p-5 sm:p-6 rounded-xl bg-[#07152F] border border-[#B8925A]/25 group-hover:border-[#B8925A]/70 transition-all">
                <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
                  {item.step}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#FAF8F4] mt-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#FAF8F4]/80 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section 5 conclusion box */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#07152F] border border-[#B8925A]/35 text-center space-y-4">
          <p className="text-base sm:text-lg text-[#FAF8F4]/90 font-serif italic max-w-2xl mx-auto">
            The idea running through all eight steps: you carry none of the operational load. You pay us to find the house, vet the house and make sure the deal goes smoothly, without the endless back-and-forth.
          </p>
          <div>
            <button
              onClick={() => onOpenBooking('Book a Free Discovery Call (Timeline)')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              <span>Book a Free Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: OPPORTUNITY AND RISK, SIDE BY SIDE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-4 mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Transparent Risk Analysis
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            We'll tell you what can go wrong. In the same breath as what can go right.
          </h2>
          <p className="text-base text-[#FAF8F4]/80 leading-relaxed max-w-3xl">
            You'll hear the upside from us: rental income, short-let income, long-term appreciation. You'll also hear the part most people skip.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#D4AF37]">
              Yields are never guaranteed.
            </h3>
            <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
              Quoted gross yields in Abuja's investor areas are typically in the mid single digits, and net yields are lower after service charges, repairs, vacancy and tax. We'll show you the assumptions behind every number.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
            <h3 className="font-serif font-bold text-lg text-[#D4AF37]">
              Short-let isn't automatically better.
            </h3>
            <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
              Some Abuja buildings are oversaturated with short-stay units. We model long-let and short-let for every property, and short-let only wins if it clears the bar after costs.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
            <div className="h-32 mb-3 rounded-lg overflow-hidden border border-[#B8925A]/30">
              <img
                src={ASSETS.CONTEMPORARY_DUPLEX}
                alt="Off-plan construction milestone vetting"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#D4AF37]">
              Off-plan carries the highest risk.
            </h3>
            <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
              Delays, cost overruns and non-delivery happen. We only work with developers who have delivered projects, and we advise on staged payments tied to milestones.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#07152F] border border-[#B8925A]/25 space-y-2">
            <div className="h-32 mb-3 rounded-lg overflow-hidden border border-[#B8925A]/30">
              <img
                src={ASSETS.SURVEY_DRONE_PLOT}
                alt="Survey beacon and perimeter demarcation"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif font-bold text-lg text-[#D4AF37]">
              Title is not a formality.
            </h3>
            <p className="text-sm text-[#FAF8F4]/80 leading-relaxed">
              A Certificate of Occupancy on its own isn't the end of the story. Consent and registration matter too, and we check what actually exists.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-sm sm:text-base font-serif italic text-[#FAF8F4]/80">
          If that sounds more cautious than you expected from a property company, good. That's the point.
        </p>
      </section>

      {/* SECTION 7: IS THIS FOR YOU? */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Client Fit
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Fair question. Here's who we're built for.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Good fit */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#07152F] border border-emerald-500/30 space-y-4">
            <h3 className="text-xl font-serif font-bold text-emerald-300">
              We're a good fit if you:
            </h3>
            <ul className="space-y-3 text-sm text-[#FAF8F4]/85">
              {[
                'are buying primarily as an investment, for rental income, short-let income or appreciation',
                'have, or can pool with others, roughly ₦50 million or more',
                'would rather pay for proper vetting than chase the cheapest listing',
                'think in strategy and timelines ("I want to buy in a growth corridor now and build in five years")',
                'live abroad and need a trustworthy partner on the ground',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not the right fit */}
          <div className="p-7 sm:p-8 rounded-2xl bg-[#07152F] border border-slate-700 space-y-4">
            <h3 className="text-xl font-serif font-bold text-[#FAF8F4]/60">
              We're probably not the right fit if you:
            </h3>
            <ul className="space-y-3 text-sm text-[#FAF8F4]/70">
              {[
                'are buying a one-off personal home with no investment angle',
                'want the lowest price above all, and would rather skip vetting, photography or a proper process',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="text-slate-500 font-bold">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="pt-4 border-t border-slate-800 text-xs text-[#FAF8F4]/55 italic">
              Our priority is protection over transaction volume.
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-[#FAF8F4]/75 max-w-2xl mx-auto leading-relaxed">
          No judgement either way. It's a focus decision. Our whole way of working is built for people who value process and invest for a return. And if you're not sure which side you're on, that's exactly what the discovery call is for.
        </p>
      </section>

      {/* SECTION 8: DIASPORA BLOCK */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#07152F] to-[#040C1A] border border-[#B8925A]/40 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
            <Globe className="w-4 h-4" />
            <span>Diaspora Remote Investment</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Living abroad? We're your eyes, hands and lawyer on the ground.
          </h2>

          <p className="text-base sm:text-lg text-[#FAF8F4]/80 leading-relaxed">
            You can't pop over on a Saturday to check the plot. You shouldn't have to trust a relative's word, or an agent's WhatsApp photos, either.
          </p>

          <p className="font-semibold text-sm text-[#FAF8F4] pt-2">
            Here's what working with us looks like from wherever you are:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#FAF8F4]/85">
            {[
              'A video call with a named advisor, scheduled around your time zone',
              'A short video for every shortlisted property, with honest pros and cons',
              'A live video inspection with you watching',
              "A copy of the registry search and a solicitor's written opinion before you pay",
              'Payment instructions confirmed on a recorded call and in writing, paid only to the verified seller or developer\'s account, or a solicitor\'s client account. Never to an individual.',
              'Receipts back to you within one working day',
            ].map((point, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0B1F44]/60 border border-[#B8925A]/20">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <button
              onClick={() => onOpenBooking('Book a Call That Fits Your Time Zone')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md"
            >
              <span>Book a Call That Fits Your Time Zone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9: CO-INVESTMENT BLOCK */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="p-8 sm:p-10 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            <Users className="w-4 h-4" />
            <span>Structured Co-Investment</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Not enough for a property on your own? Pool it. Properly.
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#FAF8F4]/80 leading-relaxed">
            <p>
              Friends, family and colleagues buy property together all the time. They also fall out over it, because the agreement was a handshake.
            </p>
            <p>
              We structure shared-ownership purchases the way they should be structured: a written co-ownership agreement setting each person's share, how decisions are made, who manages the property, what happens if someone wants out, and how income and costs are split.
            </p>
            <div className="p-4 rounded-xl bg-[#0B1F44] border border-[#B8925A]/40 font-serif text-base sm:text-lg text-[#D4AF37]">
              Four people at ₦25M each is a ₦100M property, owned by people who can name each other, under a contract they all understand.
            </div>
          </div>

          <div>
            <button
              onClick={() => onOpenBooking('Talk Through a Pooled Purchase')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#B8925A] text-[#D4AF37] hover:bg-[#B8925A]/15 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>Talk Through a Pooled Purchase</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 10: PROOF */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="space-y-4 mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Process Verification
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Don't take our word for it.
          </h2>
          <div>
            <NeedFactBadge
              fact="client testimonials with written permission to use names and faces. Do not use placeholders live. Use only real, approved testimonials."
              inline={false}
            />
          </div>
          <p className="text-sm text-[#FAF8F4]/70 italic">
            Until real testimonials exist, replace this section with the sample condition report and the verification checklist. Proof of process is still proof.
          </p>
        </div>

        {/* Sample Condition Report Showcase Card */}
        <div className="p-7 sm:p-9 rounded-2xl bg-[#07152F] border border-[#B8925A]/40 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-[#B8925A] transition-all">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4AF37]">
              <FileSearch className="w-4 h-4" />
              <span>Full Technical Audit Sample</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF8F4]">
              See what a vetting report looks like.
            </h3>
            <p className="text-xs sm:text-sm text-[#FAF8F4]/75 max-w-xl">
              Inspect our anonymised 5-point engineering assessment: roofing, plumbing pressure, electrical load, foundation integrity, and independent AGIS registry search notes.
            </p>
          </div>

          <button
            onClick={onOpenConditionReport}
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <Eye className="w-4 h-4" />
            <span>Open Sample Report</span>
          </button>
        </div>
      </section>

      {/* SECTION 11: QUICK ANSWERS (FAQ) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-[#B8925A]/20">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            The questions you're about to ask.
          </h2>
        </div>

        <div className="space-y-4">
          {[
            {
              q: 'Is it actually safe to buy property in Nigeria?',
              a: 'It can be, when the process is followed. The risks are real: forged documents, double sales, unfinished projects. The protection is verification before payment: check the title, check the seller, inspect the property, pay through traceable channels.',
            },
            {
              q: 'Why would I pay a search fee?',
              a: (
                <span>
                  Because proper search and vetting take paid time from people who actually go and look. The fee funds a process that protects you, and it's what separates a managed search from a list of ads.{' '}
                  <NeedFactBadge fact="fee amount, what it covers, and the exact refund terms" />
                </span>
              ),
            },
            {
              q: 'Do I have to pay anything to book the call?',
              a: 'No. The discovery call is free, and nothing is asked of you before it.',
            },
            {
              q: "What if I don't know much about property investment?",
              a: "Then you're in the right place. We explain every term the first time it comes up, in plain words.",
            },
            {
              q: 'What happens after I buy?',
              a: 'We stay involved. If something comes up, we help resolve it with the seller or developer and refer legal disputes to qualified counsel. Optional property management is available too.',
            },
          ].map((item, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-[#B8925A]/25 bg-[#07152F] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#B8925A]"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#FAF8F4]">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B8925A] shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-sm text-[#FAF8F4]/80 leading-relaxed border-t border-[#B8925A]/15 pt-4">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onOpenBooking('Still Have Questions? Ask Us on a Call')}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-[#D4AF37] hover:underline"
          >
            <span>Still Have Questions? Ask Us on a Call</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* SECTION 12: THE BIGGER PICTURE (SOARCREST CITY TEASER) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#07152F] border border-[#B8925A]/35 space-y-6">
          <div className="relative rounded-2xl overflow-hidden h-64 border border-[#B8925A]/30 mb-6">
            <img
              src={ASSETS.ESTATE_AERIAL}
              alt="Planned Soarcrest City aerial vision"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] px-2.5 py-0.5 rounded bg-[#07152F]/90 border border-[#B8925A]/40">
                Future Horizon
              </span>
              <p className="text-base font-serif font-bold text-white mt-1">
                Solar-powered integrated estate vision
              </p>
            </div>
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A] block">
            Long-Term Vision
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            And yes, we're thinking bigger than one house.
          </h2>

          <div className="space-y-4 text-base sm:text-lg text-[#FAF8F4]/80 leading-relaxed">
            <p>
              Over time, we want to build something that proves property can create value far beyond bricks and land: a solar-powered estate where homes, workspaces and a startup community live together.
            </p>
            <p>
              It's a plan and a direction, not a product on sale, and we're not taking reservations or deposits for it. What earns us the right to dream is the standard we hold today: vet first, verify first, protect the client first.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-white transition-colors"
            >
              <span>Read our story</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 13: FINAL CALL TO ACTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
          Direct Invitation
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF8F4] tracking-tight">
          Ready to find out what's actually possible for you?
        </h2>

        <p className="text-base sm:text-lg text-[#FAF8F4]/80 max-w-2xl mx-auto leading-relaxed">
          Tell us your budget, your goal and your timeline. We'll tell you what's realistic, what to watch out for and what we'd do next. No pressure and no pitch. Just a straight conversation with a person who knows this market.
        </p>

        <div className="pt-4">
          <button
            onClick={() => onOpenBooking('Book a Free Discovery Call (Home Final)')}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#B8925A] via-[#C5A059] to-[#D4AF37] text-[#07152F] font-bold text-sm sm:text-base tracking-wide uppercase hover:brightness-110 active:scale-95 transition-all shadow-xl gold-glow hover:gold-glow-hover"
          >
            <span>Book a Free Discovery Call</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </section>
    </div>
  );
};

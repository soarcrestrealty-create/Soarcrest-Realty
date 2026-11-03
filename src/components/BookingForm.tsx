import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, AlertCircle, ArrowRight, ArrowLeft, ShieldCheck, Clock, FileCheck, Copy, MessageCircle, ExternalLink, Phone } from 'lucide-react';
import { ENDPOINT, OFFICIAL_PHONE, OFFICIAL_PHONE_DISPLAY, OFFICIAL_WHATSAPP_NUMBER } from '../config';
import { LeadPayload } from '../types';
import { NeedFactBadge } from './NeedFactBadge';

interface BookingFormProps {
  isOpen?: boolean;
  onClose?: () => void;
  inline?: boolean;
  sourcePage?: string;
  buttonLabel?: string;
  listingId?: string;
  listingTitle?: string;
  initialRole?: string;
  onOpenPrivacy?: () => void;
  onOpenConditionReport?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  isOpen = true,
  onClose,
  inline = false,
  sourcePage = 'home',
  buttonLabel = 'Book a Free Discovery Call',
  listingId = '',
  listingTitle = '',
  initialRole = '',
  onOpenPrivacy,
  onOpenConditionReport,
}) => {
  // Step state (1, 2, 3, or 'success')
  const [step, setStep] = useState<number | 'success'>(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string>('');
  const [copied, setCopied] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [basedIn, setBasedIn] = useState<'I\'m in Nigeria' | 'I\'m outside Nigeria' | ''>('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [role, setRole] = useState(initialRole || '');

  // Step 2
  const [servicesNeeded, setServicesNeeded] = useState<string[]>([]);
  const [mainGoal, setMainGoal] = useState('');
  const [budget, setBudget] = useState('');
  const [pooling, setPooling] = useState<'On my own' | 'With others (pooling funds)' | 'Not sure yet' | ''>('');
  const [poolSize, setPoolSize] = useState<number | ''>('');
  const [timeline, setTimeline] = useState('');
  const [areas, setAreas] = useState<string[]>([]);
  const [propertyStage, setPropertyStage] = useState<string[]>([]);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [notes, setNotes] = useState('');

  // Step 3
  const [contactMethod, setContactMethod] = useState('');
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
  const [preferredTime, setPreferredTime] = useState<string[]>([]);
  const [timezone, setTimezone] = useState('');
  const [heardFrom, setHeardFrom] = useState('');
  const [consent, setConsent] = useState(false);

  // Honeypot
  const [websiteHoneypot, setWebsiteHoneypot] = useState('');

  // Validation errors map
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Auto-detect timezone and URL params on mount
  const [urlParams, setUrlParams] = useState({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    referrer: '',
  });

  useEffect(() => {
    try {
      const detectedTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (detectedTz) setTimezone(detectedTz);
    } catch {
      setTimezone('Africa/Lagos');
    }

    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      setUrlParams({
        utm_source: search.get('utm_source') || '',
        utm_medium: search.get('utm_medium') || '',
        utm_campaign: search.get('utm_campaign') || '',
        referrer: document.referrer || '',
      });
    }
  }, []);

  useEffect(() => {
    if (initialRole) {
      setRole(initialRole);
    }
  }, [initialRole]);

  // Validation routines per step
  const validateStep1 = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'We need this one so we can reach you.';
    }
    if (!email.trim() || !email.includes('@') || !email.includes('.')) {
      errs.email = "That email address doesn't look quite right. Mind checking it?";
    }
    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone.length < 7 || (!cleanPhone.startsWith('+') && !cleanPhone.startsWith('0'))) {
      errs.phone = 'Please include your country code, like +234 or +44.';
    }
    if (!basedIn) {
      errs.basedIn = 'Please tell us where you are based.';
    }
    if (basedIn === "I'm outside Nigeria" && (!country || country.trim().length < 2)) {
      errs.country = 'We need this one so we can reach you.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs: { [key: string]: string } = {};
    if (!mainGoal) {
      errs.mainGoal = 'Please choose what you want the property to do.';
    }
    if (!budget) {
      errs.budget = 'Please choose a budget range.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep3 = () => {
    const errs: { [key: string]: string } = {};
    if (!consent) {
      errs.consent = 'Please tick this so we can contact you about your call.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateStep1()) setStep(2);
    } else if (step === 2) {
      if (validateStep2()) setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    if (step === 3) setStep(2);
  };

  const toggleMultiSelect = (
    item: string,
    state: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (state.includes(item)) {
      setter(state.filter((i) => i !== item));
    } else {
      setter([...state, item]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    if (!validateStep3()) return;

    setSubmitting(true);
    setSubmitError(null);

    const payload: LeadPayload = {
      full_name: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      based_in: basedIn,
      country: country.trim(),
      city: city.trim(),
      role: role || undefined,
      services_needed: servicesNeeded,
      main_goal: mainGoal,
      budget: budget,
      pooling: pooling || undefined,
      pool_size: poolSize ? poolSize : undefined,
      timeline: timeline || undefined,
      areas: areas,
      property_stage: propertyStage,
      concerns: concerns,
      notes: notes.trim(),
      contact_method: contactMethod || 'Phone call',
      preferred_days: preferredDays,
      preferred_time: preferredTime,
      timezone: timezone || 'Africa/Lagos',
      heard_from: heardFrom || undefined,
      consent: consent,
      listing_id: listingId || undefined,
      listing_title: listingTitle || undefined,
      source_page: sourcePage,
      button_label: buttonLabel,
      utm_source: urlParams.utm_source,
      utm_medium: urlParams.utm_medium,
      utm_campaign: urlParams.utm_campaign,
      referrer: urlParams.referrer,
      website: websiteHoneypot, // hidden honeypot
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(text);
      } catch {
        // If Google Apps Script returned HTML error
        if (text.includes('PASTE_SHEET_ID_HERE') || text.includes('Illegal spreadsheet')) {
          setSubmitError('Configuration notice: Your Google Apps Script currently has PASTE_SHEET_ID_HERE. Please update your script in Extensions → Apps Script to use getActiveSpreadsheet().');
          return;
        }
      }

      if ((data && data.ok === true) || (text && text.includes('"ok":true'))) {
        if (data && data.lead_id) {
          setLeadId(data.lead_id);
        }
        setStep('success');
      } else if (data && data.error) {
        setSubmitError(data.error);
      } else {
        setSubmitError('Server error from Google Sheets script. Please ensure the script has permission and is deployed to "Anyone".');
      }
    } catch {
      setSubmitError('Connection to Google Apps Script failed. Please ensure the Web App is deployed with "Who has access: Anyone".');
    } finally {
      setSubmitting(false);
    }
  };

  const firstName = fullName.trim().split(' ')[0] || 'Friend';

  const locationSummary = basedIn === "I'm outside Nigeria"
    ? `Outside Nigeria (${[country.trim(), city.trim()].filter(Boolean).join(', ') || 'Diaspora'})`
    : `Nigeria${city.trim() ? ` (${city.trim()})` : ''}`;

  const summaryMessage = `Hi Soarcrest, I just filled your discovery call form on your website. Here's a brief summary:

• Name: ${fullName.trim()}
• Phone: ${phone.trim()}
• Email: ${email.trim()}
• Location: ${locationSummary}
• Role: ${role || 'Investor'}
• Main Goal: ${mainGoal || 'Not specified'}
• Budget Range: ${budget || 'Not specified'}
• Timeline: ${timeline || 'Not specified'}${servicesNeeded.length > 0 ? `\n• Services Needed: ${servicesNeeded.join(', ')}` : ''}${areas.length > 0 ? `\n• Preferred Areas: ${areas.join(', ')}` : ''}${listingTitle ? `\n• Property Reference: ${listingTitle}${listingId ? ` (${listingId})` : ''}` : ''}${preferredDays.length > 0 || preferredTime.length > 0 ? `\n• Preferred Call Time: ${[preferredDays.join(', '), preferredTime.join(', ')].filter(Boolean).join(' | ')}` : ''}${contactMethod ? `\n• Preferred Contact Channel: ${contactMethod}` : ''}${notes.trim() ? `\n• Notes: ${notes.trim()}` : ''}${leadId ? `\n• Lead Reference: ${leadId}` : ''}

I will be looking forward to hearing from you.`;

  const whatsappUrl = `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${encodeURIComponent(summaryMessage)}`;

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  const content = (
    <div className={`relative ${inline ? 'w-full' : 'max-w-2xl w-full mx-auto'} bg-[#07152F] border border-[#B8925A]/30 rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 text-[#FAF8F4]`}>
      {!inline && onClose && (
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8925A]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header Info */}
      {step !== 'success' && (
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#B8925A] mb-2">
            <span>Free Discovery Call</span>
            <span aria-hidden="true">·</span>
            <span>Zero Obligation</span>
            {listingTitle && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-[#FAF8F4]/80 truncate max-w-[200px]">Ref: {listingTitle}</span>
              </>
            )}
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Book your free discovery call
          </h2>
          <p className="mt-1 text-sm text-[#FAF8F4]/70">
            Tell us a little about what you're after. The more you share, the more useful our first conversation will be. Skip anything you're not sure about.
          </p>

          {/* Progress Bar */}
          <div className="mt-5">
            <div className="flex items-center justify-between text-xs text-[#FAF8F4]/60 mb-2">
              <span className={step >= 1 ? 'text-[#B8925A] font-medium' : ''}>1. About you</span>
              <span className={step >= 2 ? 'text-[#B8925A] font-medium' : ''}>2. What you're looking for</span>
              <span className={step >= 3 ? 'text-[#B8925A] font-medium' : ''}>3. Your call</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#B8925A] to-[#D4AF37]"
                initial={{ width: '33.3%' }}
                animate={{
                  width: step === 1 ? '33.3%' : step === 2 ? '66.6%' : '100%',
                }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Honeypot hidden input */}
      <input
        type="text"
        name="website"
        value={websiteHoneypot}
        onChange={(e) => setWebsiteHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <AnimatePresence mode="wait">
        {/* STEP 1 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-serif font-semibold text-[#FAF8F4] border-b border-[#B8925A]/20 pb-2">
              Step 1 of 3: First, who are we talking to?
            </h3>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                Full name <span className="text-[#B8925A]">*</span>
              </label>
              <input
                type="text"
                placeholder="As you'd like us to address you"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: '' });
                }}
                className={`w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border text-[#FAF8F4] placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#B8925A] focus:ring-1 focus:ring-[#B8925A] transition-all ${
                  errors.fullName ? 'border-red-400/80 ring-1 ring-red-400' : 'border-[#B8925A]/30'
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                Email address <span className="text-[#B8925A]">*</span>
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                className={`w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border text-[#FAF8F4] placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#B8925A] focus:ring-1 focus:ring-[#B8925A] transition-all ${
                  errors.email ? 'border-red-400/80 ring-1 ring-red-400' : 'border-[#B8925A]/30'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                Phone / WhatsApp number <span className="text-[#B8925A]">*</span>
              </label>
              <input
                type="tel"
                placeholder="+234 803 000 0000 or +44 7000 000000"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                className={`w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border text-[#FAF8F4] placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#B8925A] focus:ring-1 focus:ring-[#B8925A] transition-all ${
                  errors.phone ? 'border-red-400/80 ring-1 ring-red-400' : 'border-[#B8925A]/30'
                }`}
              />
              <p className="mt-1 text-xs text-[#FAF8F4]/60">
                Include your country code. We'll only use this to arrange your call.
              </p>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-2">
                Where are you based? <span className="text-[#B8925A]">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "I'm in Nigeria", label: "I'm in Nigeria" },
                  { value: "I'm outside Nigeria", label: "I'm outside Nigeria" },
                ].map((item) => (
                  <label
                    key={item.value}
                    className={`flex items-center gap-2.5 p-3 rounded-lg border cursor-pointer transition-colors ${
                      basedIn === item.value
                        ? 'border-[#B8925A] bg-[#B8925A]/15 text-[#FAF8F4]'
                        : 'border-[#B8925A]/25 bg-[#0B1F44]/60 hover:bg-[#0B1F44] text-[#FAF8F4]/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="basedIn"
                      value={item.value}
                      checked={basedIn === item.value}
                      onChange={() => {
                        setBasedIn(item.value as any);
                        if (errors.basedIn) setErrors({ ...errors, basedIn: '' });
                      }}
                      className="accent-[#B8925A]"
                    />
                    <span className="text-sm font-medium">{item.label}</span>
                  </label>
                ))}
              </div>
              {errors.basedIn && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.basedIn}
                </p>
              )}
            </div>

            {/* Conditional Which Country? */}
            {basedIn === "I'm outside Nigeria" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                  Which country? <span className="text-[#B8925A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. United Kingdom, United States, Canada, UAE"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                    if (errors.country) setErrors({ ...errors, country: '' });
                  }}
                  className={`w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border text-[#FAF8F4] placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#B8925A] focus:ring-1 focus:ring-[#B8925A] transition-all ${
                    errors.country ? 'border-red-400/80 ring-1 ring-red-400' : 'border-[#B8925A]/30'
                  }`}
                />
                {errors.country && (
                  <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.country}
                  </p>
                )}
              </motion.div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                  City (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. London, Abuja, Toronto"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#B8925A]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                  I'm reaching out as...
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-sm focus:outline-none focus:border-[#B8925A]"
                >
                  <option value="">Select an option</option>
                  <option value="A buyer or investor">A buyer or investor</option>
                  <option value="A group pooling funds to buy together">A group pooling funds to buy together</option>
                  <option value="A property owner or seller">A property owner or seller</option>
                  <option value="A developer">A developer</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-serif font-semibold text-[#FAF8F4] border-b border-[#B8925A]/20 pb-2">
              Step 2 of 3: Now, what are you hoping to do?
            </h3>

            {/* Services needed (Multi-select) */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-2">
                What would you like help with? (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  'Finding a property to buy',
                  "Vetting a property I've already found",
                  'Checking title and documents',
                  'Buying with others (co-investment)',
                  'Buying from abroad',
                  'Property management after purchase',
                  'Listing a property with Soarcrest',
                  "I'm not sure yet, I need guidance",
                ].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => toggleMultiSelect(s, servicesNeeded, setServicesNeeded)}
                    className={`flex items-start gap-2 text-left p-2.5 rounded-lg border transition-colors ${
                      servicesNeeded.includes(s)
                        ? 'border-[#B8925A] bg-[#B8925A]/20 text-[#FAF8F4]'
                        : 'border-[#B8925A]/20 bg-[#0B1F44]/50 hover:bg-[#0B1F44] text-[#FAF8F4]/75'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 mt-0.5 rounded border flex items-center justify-center shrink-0 ${
                        servicesNeeded.includes(s)
                          ? 'bg-[#B8925A] border-[#B8925A] text-[#07152F]'
                          : 'border-slate-500'
                      }`}
                    >
                      {servicesNeeded.includes(s) && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Goal (Radio, Required) */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-2">
                What do you want the property to do for you? <span className="text-[#B8925A]">*</span>
              </label>
              <div className="space-y-1.5">
                {[
                  'Long-term rental income',
                  'Short-let income',
                  'Long-term appreciation',
                  'A mix of these',
                  "I'm not sure yet",
                ].map((goal) => (
                  <label
                    key={goal}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border cursor-pointer text-sm transition-colors ${
                      mainGoal === goal
                        ? 'border-[#B8925A] bg-[#B8925A]/15 text-[#FAF8F4]'
                        : 'border-[#B8925A]/20 bg-[#0B1F44]/40 hover:bg-[#0B1F44] text-[#FAF8F4]/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="mainGoal"
                      value={goal}
                      checked={mainGoal === goal}
                      onChange={() => {
                        setMainGoal(goal);
                        if (errors.mainGoal) setErrors({ ...errors, mainGoal: '' });
                      }}
                      className="accent-[#B8925A]"
                    />
                    <span>{goal}</span>
                  </label>
                ))}
              </div>
              {errors.mainGoal && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.mainGoal}
                </p>
              )}
            </div>

            {/* Budget (Dropdown, Required) */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                Roughly what budget are you working with? <span className="text-[#B8925A]">*</span>
              </label>
              <select
                value={budget}
                onChange={(e) => {
                  setBudget(e.target.value);
                  if (errors.budget) setErrors({ ...errors, budget: '' });
                }}
                className={`w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border text-[#FAF8F4] text-sm focus:outline-none focus:border-[#B8925A] ${
                  errors.budget ? 'border-red-400' : 'border-[#B8925A]/30'
                }`}
              >
                <option value="">Select a budget range</option>
                <option value="Under ₦50M (we'll talk about pooling options)">Under ₦50M (we'll talk about pooling options)</option>
                <option value="₦50M to ₦100M">₦50M to ₦100M</option>
                <option value="₦100M to ₦250M">₦100M to ₦250M</option>
                <option value="₦250M to ₦500M">₦250M to ₦500M</option>
                <option value="₦500M to ₦1B">₦500M to ₦1B</option>
                <option value="Above ₦1B">Above ₦1B</option>
                <option value="I'd rather discuss it on the call">I'd rather discuss it on the call</option>
              </select>
              {errors.budget && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.budget}
                </p>
              )}
            </div>

            {/* Pooling with others */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                  Are you investing alone or with others?
                </label>
                <select
                  value={pooling}
                  onChange={(e) => setPooling(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-sm focus:outline-none focus:border-[#B8925A]"
                >
                  <option value="">Select option</option>
                  <option value="On my own">On my own</option>
                  <option value="With others (pooling funds)">With others (pooling funds)</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              {pooling === 'With others (pooling funds)' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                    How many people are pooling?
                  </label>
                  <input
                    type="number"
                    min="2"
                    max="50"
                    placeholder="e.g. 3 or 4"
                    value={poolSize}
                    onChange={(e) => setPoolSize(e.target.value ? Number(e.target.value) : '')}
                    className="w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-sm focus:outline-none focus:border-[#B8925A]"
                  />
                </motion.div>
              )}
            </div>

            {/* Timeline */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                When are you hoping to buy?
              </label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-sm focus:outline-none focus:border-[#B8925A]"
              >
                <option value="">Select timeline</option>
                <option value="Within 3 months">Within 3 months</option>
                <option value="3 to 6 months">3 to 6 months</option>
                <option value="6 to 12 months">6 to 12 months</option>
                <option value="More than a year away">More than a year away</option>
                <option value="Just exploring">Just exploring</option>
              </select>
            </div>

            {/* Notes / Anything else */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                Anything else we should know? (optional)
              </label>
              <textarea
                rows={2}
                maxLength={1000}
                placeholder="A property you've seen, a situation you're in, a question that keeps you up at night..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#B8925A]"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#B8925A]/30 text-[#FAF8F4]/80 text-sm hover:bg-[#0B1F44]"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] font-semibold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <motion.form
            key="step3"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-5"
          >
            <h3 className="text-lg font-serif font-semibold text-[#FAF8F4] border-b border-[#B8925A]/20 pb-2">
              Step 3 of 3: Last step. When suits you?
            </h3>

            {/* How would you like us to call you? */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-2">
                How would you like us to call you?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {['Phone call', 'WhatsApp call', 'Video call (Google Meet or Zoom)'].map((method) => (
                  <label
                    key={method}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer text-xs transition-colors ${
                      contactMethod === method
                        ? 'border-[#B8925A] bg-[#B8925A]/20 text-[#FAF8F4]'
                        : 'border-[#B8925A]/20 bg-[#0B1F44]/50 hover:bg-[#0B1F44] text-[#FAF8F4]/80'
                    }`}
                  >
                    <input
                      type="radio"
                      name="contactMethod"
                      value={method}
                      checked={contactMethod === method}
                      onChange={() => setContactMethod(method)}
                      className="accent-[#B8925A]"
                    />
                    <span className="font-medium">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Days & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                  Which days work best?
                </label>
                <div className="flex gap-2">
                  {['Weekdays', 'Weekends', 'Either'].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => toggleMultiSelect(d, preferredDays, setPreferredDays)}
                      className={`flex-1 py-2 px-2 text-xs rounded border transition-colors ${
                        preferredDays.includes(d)
                          ? 'border-[#B8925A] bg-[#B8925A] text-[#07152F] font-semibold'
                          : 'border-[#B8925A]/20 bg-[#0B1F44] text-[#FAF8F4]/80'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                  What time of day?
                </label>
                <div className="flex gap-2">
                  {['Morning', 'Afternoon', 'Evening'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleMultiSelect(t, preferredTime, setPreferredTime)}
                      className={`flex-1 py-2 px-2 text-xs rounded border transition-colors ${
                        preferredTime.includes(t)
                          ? 'border-[#B8925A] bg-[#B8925A] text-[#07152F] font-semibold'
                          : 'border-[#B8925A]/20 bg-[#0B1F44] text-[#FAF8F4]/80'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Timezone and Heard From */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                  Your time zone
                </label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  placeholder="e.g. Africa/Lagos, Europe/London"
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-sm focus:outline-none focus:border-[#B8925A]"
                />
                <p className="mt-1 text-[11px] text-[#FAF8F4]/60">
                  Especially useful if you're abroad. We'll schedule around you.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-[#FAF8F4]/80 mb-1.5">
                  How did you hear about Soarcrest?
                </label>
                <select
                  value={heardFrom}
                  onChange={(e) => setHeardFrom(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-sm focus:outline-none focus:border-[#B8925A]"
                >
                  <option value="">Select source</option>
                  <option value="Instagram">Instagram</option>
                  <option value="X (Twitter)">X (Twitter)</option>
                  <option value="YouTube">YouTube</option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Google search">Google search</option>
                  <option value="A friend or colleague">A friend or colleague</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Consent Checkbox (Required) */}
            <div className="pt-2">
              <label
                className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                  errors.consent
                    ? 'border-red-400 bg-red-950/20'
                    : consent
                    ? 'border-[#B8925A]/70 bg-[#B8925A]/10'
                    : 'border-[#B8925A]/25 bg-[#0B1F44]/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => {
                    setConsent(e.target.checked);
                    if (errors.consent) setErrors({ ...errors, consent: '' });
                  }}
                  className="mt-0.5 w-4 h-4 rounded accent-[#B8925A]"
                />
                <span className="text-xs text-[#FAF8F4]/85 leading-relaxed">
                  I agree that Soarcrest Realty can contact me about my enquiry and store the details I've shared. I understand this call is free and that I'm not committing to anything.{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="text-[#D4AF37] underline hover:text-white"
                  >
                    Privacy Notice
                  </button>
                </span>
              </label>
              {errors.consent && (
                <p className="mt-1 text-xs text-red-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {errors.consent}
                </p>
              )}
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-xs text-red-200">
                {submitError}
              </div>
            )}

            {/* Buttons */}
            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={handleBack}
                disabled={submitting}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#B8925A]/30 text-[#FAF8F4]/80 text-sm hover:bg-[#0B1F44] disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-[#B8925A] via-[#C5A059] to-[#D4AF37] text-[#07152F] font-bold text-sm tracking-wide uppercase hover:brightness-110 active:scale-95 transition-all shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-[#07152F] border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Book My Free Discovery Call</span>
                )}
              </button>
            </div>

            <p className="text-center text-[11px] text-[#FAF8F4]/55 mt-2">
              We'll use your details to arrange your call and follow up on it. No spam, no handing your number around.
            </p>
          </motion.form>
        )}

        {/* SUCCESS STATE */}
        {step === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="py-6 text-center space-y-6"
          >
            {/* Animated Gold Checkmark Drawing Itself */}
            <div className="mx-auto w-16 h-16 rounded-full bg-[#B8925A]/20 border border-[#B8925A] flex items-center justify-center text-[#D4AF37]">
              <motion.svg
                viewBox="0 0 24 24"
                className="w-9 h-9"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <motion.path
                  d="M 5 12 L 10 17 L 19 6"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                />
              </motion.svg>
            </div>

            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#B8925A]">Request Received</span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F4]">
                You're booked in. Well, almost. Here's what happens now.
              </h2>
              <p className="mt-3 text-base text-[#FAF8F4]/90 font-medium">
                Thanks, {firstName}. Your details have reached us.
              </p>
              <div className="mt-2 text-sm text-[#FAF8F4]/75 max-w-lg mx-auto">
                <span>A named person at Soarcrest will contact you </span>
                <NeedFactBadge fact="response window" inline={true} />
                <span> by {contactMethod || 'your chosen method'} to confirm a time for your free discovery call.</span>
              </div>
            </div>

            {/* Official WhatsApp Dispatch Card */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0B1F44] border-2 border-[#B8925A]/50 text-left max-w-lg mx-auto shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-[11px] font-mono tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>OFFICIAL LINE: {OFFICIAL_PHONE_DISPLAY}</span>
                </div>
                {leadId && (
                  <span className="text-[11px] font-mono text-[#FAF8F4]/60">
                    Ref: <strong className="text-[#D4AF37]">{leadId}</strong>
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-[#FAF8F4]">
                  Send this summary directly to our official line
                </h3>
                <p className="mt-1 text-xs text-[#FAF8F4]/80 leading-relaxed">
                  We've prepared a custom brief of everything you filled. Click below to open WhatsApp with your message ready to send straight to Soarcrest's verified line.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 text-center"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Send on WhatsApp</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border text-xs font-semibold transition-all ${
                    copied
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : 'bg-[#07152F] border-[#B8925A]/40 text-[#FAF8F4] hover:bg-[#040C1A] hover:border-[#B8925A]'
                  }`}
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#B8925A]" />
                      <span>Copy Summary</span>
                    </>
                  )}
                </button>
              </div>

              {/* Message Preview Box */}
              <div className="rounded-xl bg-[#040C1A] border border-[#B8925A]/25 p-3.5 space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#B8925A]">
                  <span>Generated Message Preview:</span>
                  <a
                    href={`tel:${OFFICIAL_PHONE}`}
                    className="inline-flex items-center gap-1 text-[11px] text-[#FAF8F4]/60 hover:text-white"
                  >
                    <Phone className="w-3 h-3 text-[#B8925A]" />
                    <span>Call: {OFFICIAL_PHONE_DISPLAY}</span>
                  </a>
                </div>
                <div className="text-[11px] text-[#FAF8F4]/85 whitespace-pre-wrap font-sans leading-relaxed select-all bg-black/30 p-2.5 rounded-lg border border-slate-800/80 max-h-48 overflow-y-auto">
                  {summaryMessage}
                </div>
              </div>
            </div>

            {/* The 3 strategic questions from copy */}
            <div className="p-5 rounded-xl bg-[#0B1F44] border border-[#B8925A]/30 text-left max-w-lg mx-auto space-y-3">
              <p className="text-xs uppercase font-mono tracking-wider text-[#B8925A] font-medium">
                To make the most of it, think about three things:
              </p>
              <ol className="space-y-2 text-sm text-[#FAF8F4]/90">
                <li className="flex items-start gap-2">
                  <span className="font-serif font-bold text-[#B8925A]">1.</span>
                  <span>What income do you want your property to produce?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-serif font-bold text-[#B8925A]">2.</span>
                  <span>Over how long?</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-serif font-bold text-[#B8925A]">3.</span>
                  <span>What are you absolutely not willing to risk?</span>
                </li>
              </ol>
              <p className="text-xs text-[#FAF8F4]/60 italic pt-1">
                No need to prepare an answer. Just have the questions in mind.
              </p>
            </div>

            {/* While you wait */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  if (onOpenConditionReport) onOpenConditionReport();
                }}
                className="inline-flex items-center gap-2 text-xs font-medium text-[#D4AF37] hover:text-white underline"
              >
                <FileCheck className="w-4 h-4" />
                <span>While you wait: See what a vetting report looks like</span>
              </button>
            </div>

            {!inline && onClose && (
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-lg bg-slate-800 text-[#FAF8F4] text-xs font-semibold hover:bg-slate-700 transition-colors"
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (inline) {
    return content;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-[#07152F]/85 backdrop-blur-md"
      />
      <div className="relative z-10 w-full max-w-2xl my-auto">
        {content}
      </div>
    </div>
  );
};

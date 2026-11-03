import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Search, 
  Filter, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Eye, 
  X, 
  MapPin, 
  BedDouble, 
  TrendingUp, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { PropertyListing } from '../types';
import { ENDPOINT, ASSETS } from '../config';

interface PropertiesPageProps {
  onOpenBooking: (buttonLabel: string, listingId?: string, listingTitle?: string, initialRole?: string) => void;
  onOpenConditionReport: () => void;
}

// Sample real-standard vetted properties for preview/testing with authentic client photography
const SAMPLE_VETTED_PROPERTIES: PropertyListing[] = [
  {
    listing_id: 'SC-PROP-001',
    published: true,
    title: '4-Bedroom Contemporary Terrace with BQ',
    district: 'Guzape Corridor',
    price_ngn: '₦185M',
    property_type: 'Terrace',
    bedrooms: 4,
    size: '320 sqm',
    stage: 'Completed',
    inspection_status: 'Inspected, report available',
    title_status: "Solicitor's opinion available",
    rent_ngn_per_year: '₦14.5M',
    rent_basis: 'gross',
    rent_status: 'asking',
    thesis: 'High-executive tenant corridor with strong diplomat/corporate rental appeal.',
    risk_note: 'Steep hill road access requires checking drainage during peak rainy season.',
    net_income_estimate: 'Estimated ₦12.2M net after service charge & management.',
    service_charge: 'Est. ₦1.8M/year',
    condition_summary: 'Roofing and structural integrity certified. Minor snagging on en-suite mixer taps noted in report.',
    is_render: false,
    image_urls: ASSETS.TERRACES_STREET,
  },
  {
    listing_id: 'SC-PROP-002',
    published: true,
    title: '3-Bedroom Smart Apartment',
    district: 'Jabi Lake District',
    price_ngn: '₦110M',
    property_type: 'Apartment',
    bedrooms: 3,
    size: '190 sqm',
    stage: 'Completed',
    inspection_status: 'Inspected, report available',
    title_status: "Solicitor's opinion available",
    rent_ngn_per_year: '₦9.5M',
    rent_basis: 'gross',
    rent_status: 'achieved',
    thesis: 'High-density short-let yield catchment near Jabi Lake commercial promenade.',
    risk_note: 'Short-let competition in building is moderate; differentiation requires premium furnishing.',
    net_income_estimate: 'Long-let baseline ₦8.2M net; short-let model up to ₦14M net with 68% occupancy.',
    service_charge: 'Est. ₦1.2M/year',
    condition_summary: 'Electrical sub-panels tested with surge arrestors. Plumbing lines clear.',
    is_render: false,
    image_urls: ASSETS.APARTMENT_BLOCK,
  },
  {
    listing_id: 'SC-PROP-003',
    published: true,
    title: '5-Bedroom Fully Detached Duplex with Private Pool',
    district: 'Maitama Extension',
    price_ngn: '₦460M',
    property_type: 'Detached Duplex',
    bedrooms: 5,
    size: '650 sqm',
    stage: 'Completed',
    inspection_status: 'Inspected, report available',
    title_status: "Solicitor's opinion available",
    rent_ngn_per_year: '₦32M',
    rent_basis: 'gross',
    rent_status: 'asking',
    thesis: 'Prime capital preservation play with blue-chip institutional tenant profile.',
    risk_note: 'Higher initial capital entry; secondary resale liquidity is slower than terrace units.',
    net_income_estimate: '₦28.5M net projected.',
    service_charge: 'Independent facility; borehole & generator maintenance by tenant.',
    condition_summary: 'Perimeter retaining walls structurally sound. Transformer step-down verified.',
    is_render: false,
    image_urls: ASSETS.HILLSIDE_MANSION,
  },
  {
    listing_id: 'SC-PROP-004',
    published: true,
    title: 'Off-Plan 4-Bed Eco Townhouse in Gated Development',
    district: 'Katampe Main',
    price_ngn: '₦140M',
    property_type: 'Terrace',
    bedrooms: 4,
    size: '280 sqm',
    stage: 'Off-plan',
    inspection_status: 'Inspection pending',
    title_status: 'Search in progress',
    rent_ngn_per_year: '₦11M',
    rent_basis: 'gross',
    rent_status: 'asking',
    thesis: 'Milestone-staged capital growth in Katampe corridor prior to infrastructure delivery.',
    risk_note: 'Delivery risk mitigated via 5 milestone escrow disbursements.',
    net_income_estimate: 'Projected completion Q4 2027.',
    service_charge: 'Subject to residents association schedule.',
    condition_summary: 'Substructure piling verified by structural engineer. Architectural render.',
    is_render: true,
    image_urls: ASSETS.CONTEMPORARY_DUPLEX,
  },
];

export const PropertiesPage: React.FC<PropertiesPageProps> = ({
  onOpenBooking,
  onOpenConditionReport,
}) => {
  const [listings, setListings] = useState<PropertyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);

  // Filters
  const [filterDistrict, setFilterDistrict] = useState('All');
  const [filterPrice, setFilterPrice] = useState('All');
  const [filterType, setFilterType] = useState('All');
  const [filterBedrooms, setFilterBedrooms] = useState('All');
  const [filterStage, setFilterStage] = useState('All');
  const [filterInspection, setFilterInspection] = useState('All');

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const res = await fetch(`${ENDPOINT}?action=listings`, { method: 'GET' });
        const data = await res.json();
        if (data && data.ok && Array.isArray(data.listings) && data.listings.length > 0) {
          setListings(data.listings);
          setDemoMode(false);
        } else {
          setListings(SAMPLE_VETTED_PROPERTIES);
        }
      } catch {
        setListings(SAMPLE_VETTED_PROPERTIES);
      } finally {
        setLoading(false);
      }
    }

    fetchListings();
  }, []);

  // Filter computation
  const activeListings = demoMode ? SAMPLE_VETTED_PROPERTIES : listings;

  const filteredProperties = activeListings.filter((prop) => {
    if (filterDistrict !== 'All' && prop.district !== filterDistrict) return false;
    if (filterType !== 'All' && prop.property_type !== filterType) return false;
    if (filterBedrooms !== 'All' && String(prop.bedrooms) !== filterBedrooms) return false;
    if (filterStage !== 'All' && prop.stage !== filterStage) return false;
    if (filterInspection !== 'All' && prop.inspection_status !== filterInspection) return false;
    return true;
  });

  const resetFilters = () => {
    setFilterDistrict('All');
    setFilterPrice('All');
    setFilterType('All');
    setFilterBedrooms('All');
    setFilterStage('All');
    setFilterInspection('All');
  };

  return (
    <div className="relative overflow-hidden text-[#FAF8F4] pt-28 pb-20">
      {/* SECTION 1: HERO */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6 pb-16 border-b border-[#B8925A]/20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B8925A]/40 bg-[#07152F]/80 text-[#D4AF37] text-xs font-mono tracking-widest uppercase">
          <span>Vetted Real Estate Inventory</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#FAF8F4] leading-tight tracking-tight">
          Properties we'd put our own name on.
        </h1>

        <p className="text-base sm:text-xl text-[#FAF8F4]/80 max-w-2xl mx-auto leading-relaxed">
          Every property here has been looked at by a person, not just photographed by one. Each one shows what we've checked, and what we haven't yet.
        </p>

        {/* Live vs Preview switch */}
        <div className="pt-2 flex items-center justify-center gap-4 text-xs font-mono">
          <span className="text-[#FAF8F4]/60">Data Source:</span>
          <button
            onClick={() => setDemoMode(!demoMode)}
            className="px-3.5 py-1.5 rounded-lg border border-[#B8925A]/40 bg-[#07152F] text-[#D4AF37] hover:bg-[#B8925A]/20 transition-colors shadow-sm"
          >
            {demoMode ? 'Previewing Vetted Portfolio (Switch to Live Google Sheet)' : 'Connected to Live Google Sheet'}
          </button>
        </div>
      </section>

      {/* SECTION 2: HOW TO READ THESE LISTINGS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-b border-[#B8925A]/20">
        <div className="p-7 sm:p-9 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Due Diligence Guide
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FAF8F4]">
            A quick guide, so you read these like an investor.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#FAF8F4]/80 leading-relaxed pt-2">
            <div className="p-3.5 rounded-lg bg-[#0B1F44]/70 border border-[#B8925A]/20 space-y-1">
              <strong className="text-[#FAF8F4] block font-semibold">Inspection Status:</strong>
              <p>Tells you whether we have physically or virtually inspected the property, and whether the written condition report is available.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B1F44]/70 border border-[#B8925A]/20 space-y-1">
              <strong className="text-[#FAF8F4] block font-semibold">Title Status:</strong>
              <p>Tells you the truth: Not yet searched, Search in progress or Solicitor's opinion available. We only say "title verified" when a written opinion exists.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B1F44]/70 border border-[#B8925A]/20 space-y-1">
              <strong className="text-[#FAF8F4] block font-semibold">Rent Figures:</strong>
              <p>Always labelled gross or net, and marked as asking, agreed or achieved. Gross is before costs. Net is after service charges, repairs, vacancy and tax.</p>
            </div>

            <div className="p-3.5 rounded-lg bg-[#0B1F44]/70 border border-[#B8925A]/20 space-y-1">
              <strong className="text-[#FAF8F4] block font-semibold">Renders & Visuals:</strong>
              <p>Renders (computer-generated images of finished homes) are always labelled as renders. Never passed off as existing construction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: FILTERS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="p-5 rounded-2xl bg-[#07152F] border border-[#B8925A]/30 space-y-4">
          <div className="flex items-center justify-between gap-4 border-b border-[#B8925A]/20 pb-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#B8925A]">
              <Filter className="w-4 h-4" />
              <span>Filter Inventory</span>
            </div>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-[#FAF8F4]/60 hover:text-[#FAF8F4] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            {/* Location (District) */}
            <div>
              <label className="block text-[#FAF8F4]/70 mb-1">District</label>
              <select
                value={filterDistrict}
                onChange={(e) => setFilterDistrict(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-xs focus:outline-none focus:border-[#B8925A]"
              >
                <option value="All">All Districts</option>
                <option value="Guzape Corridor">Guzape Corridor</option>
                <option value="Jabi Lake District">Jabi Lake District</option>
                <option value="Maitama Extension">Maitama Extension</option>
                <option value="Katampe Main">Katampe Main</option>
                <option value="Wuse II">Wuse II</option>
                <option value="Asokoro">Asokoro</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <label className="block text-[#FAF8F4]/70 mb-1">Property Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-xs focus:outline-none focus:border-[#B8925A]"
              >
                <option value="All">All Types</option>
                <option value="Terrace">Terrace</option>
                <option value="Apartment">Apartment</option>
                <option value="Detached Duplex">Detached Duplex</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-[#FAF8F4]/70 mb-1">Bedrooms</label>
              <select
                value={filterBedrooms}
                onChange={(e) => setFilterBedrooms(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-xs focus:outline-none focus:border-[#B8925A]"
              >
                <option value="All">Any Beds</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5">5 Bedrooms</option>
              </select>
            </div>

            {/* Stage */}
            <div>
              <label className="block text-[#FAF8F4]/70 mb-1">Status</label>
              <select
                value={filterStage}
                onChange={(e) => setFilterStage(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-xs focus:outline-none focus:border-[#B8925A]"
              >
                <option value="All">All Stages</option>
                <option value="Completed">Completed</option>
                <option value="Off-plan">Off-plan</option>
              </select>
            </div>

            {/* Inspection Status */}
            <div>
              <label className="block text-[#FAF8F4]/70 mb-1">Inspection</label>
              <select
                value={filterInspection}
                onChange={(e) => setFilterInspection(e.target.value)}
                className="w-full p-2 rounded-lg bg-[#0B1F44] border border-[#B8925A]/30 text-[#FAF8F4] text-xs focus:outline-none focus:border-[#B8925A]"
              >
                <option value="All">All Vetting</option>
                <option value="Inspected, report available">Inspected, report available</option>
                <option value="Inspection pending">Inspection pending</option>
              </select>
            </div>

            {/* Quick Count */}
            <div className="flex flex-col justify-end">
              <span className="text-[11px] text-[#FAF8F4]/60 mb-1">Showing</span>
              <div className="p-2 rounded-lg bg-[#0B1F44] border border-[#B8925A]/20 text-center font-mono font-bold text-[#D4AF37]">
                {filteredProperties.length} Properties
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 & 6: LISTINGS GRID OR EMPTY STATE */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {filteredProperties.length === 0 ? (
          /* SECTION 6: EMPTY STATE */
          <div className="p-10 sm:p-14 rounded-3xl bg-[#07152F] border border-[#B8925A]/35 text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
              Purity of Inventory
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF8F4]">
              Nothing here yet? That's on purpose.
            </h2>
            <div className="space-y-4 text-base text-[#FAF8F4]/80 leading-relaxed max-w-xl mx-auto">
              <p>
                We'd rather show you three properties we've properly vetted than thirty we haven't. New properties appear here as they pass inspection.
              </p>
              <p>
                In the meantime, the fastest route is to tell us what you're looking for. We search against your brief, and sometimes the right property isn't listed publicly yet.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={() => onOpenBooking("Tell Us What You're Looking For (Empty State)")}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-lg"
              >
                <span>Tell Us What You're Looking For</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* SECTION 4: LISTING CARD TEMPLATE GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProperties.map((prop) => (
              <div
                key={prop.listing_id}
                className="rounded-2xl bg-[#07152F] border border-[#B8925A]/30 overflow-hidden flex flex-col justify-between hover:border-[#B8925A] transition-all hover:shadow-2xl group"
              >
                {/* Visual Header with authentic photography */}
                <div className="relative h-64 bg-slate-900 overflow-hidden border-b border-[#B8925A]/20">
                  {prop.image_urls ? (
                    <img
                      src={prop.image_urls}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0B1F44] to-[#040C1A] bg-grid-pattern opacity-40" />
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07152F] via-[#07152F]/40 to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                    {/* Render badge if applicable */}
                    {prop.is_render ? (
                      <span className="px-2.5 py-1 rounded text-[11px] font-mono tracking-wider uppercase bg-[#07152F]/90 text-amber-300 border border-amber-500/50 backdrop-blur-sm">
                        Architectural Render
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded text-[11px] font-mono tracking-wider uppercase bg-[#07152F]/90 text-emerald-300 border border-emerald-500/50 backdrop-blur-sm">
                        Physical Site Inspected
                      </span>
                    )}

                    <span className="text-xs font-mono text-white/80 bg-[#07152F]/90 px-2 py-0.5 rounded border border-white/20">
                      ID: {prop.listing_id}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37] block">
                      {prop.district}, Abuja
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#FAF8F4] group-hover:text-[#D4AF37] transition-colors mt-0.5">
                      {prop.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Details */}
                <div className="p-6 sm:p-7 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Price and size strip */}
                    <div className="flex items-baseline justify-between border-b border-[#B8925A]/15 pb-3">
                      <div>
                        <span className="text-xs text-[#FAF8F4]/60 block">Price</span>
                        <span className="font-serif text-2xl font-bold text-[#D4AF37]">
                          {prop.price_ngn}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-[#FAF8F4]/60 block">Configuration</span>
                        <span className="text-xs font-medium text-[#FAF8F4]">
                          {prop.bedrooms}-bed {prop.property_type} {prop.size && `· ${prop.size}`}
                        </span>
                      </div>
                    </div>

                    {/* Badges strip (Status, Inspection, Title) */}
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between text-[#FAF8F4]/75">
                        <span>Status:</span>
                        <span className="font-semibold text-[#FAF8F4]">{prop.stage}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#FAF8F4]/75">
                        <span>Inspection:</span>
                        <span className="text-emerald-400 font-semibold">{prop.inspection_status}</span>
                      </div>
                      <div className="flex items-center justify-between text-[#FAF8F4]/75">
                        <span>Title:</span>
                        <span className="text-[#D4AF37] font-semibold">{prop.title_status}</span>
                      </div>
                    </div>

                    {/* Income snapshot */}
                    {prop.rent_ngn_per_year && (
                      <div className="p-3 rounded-lg bg-[#0B1F44] border border-[#B8925A]/25 text-xs">
                        <span className="text-[#FAF8F4]/60 block mb-0.5">Income Snapshot:</span>
                        <span className="font-serif text-sm font-semibold text-[#FAF8F4]">
                          "Quoted rent: {prop.rent_ngn_per_year}/year ({prop.rent_status}, {prop.rent_basis})"
                        </span>
                      </div>
                    )}

                    {/* One-line investment thesis */}
                    <div className="text-xs text-[#FAF8F4]/80 leading-relaxed italic">
                      <strong className="text-[#D4AF37] not-italic">Thesis: </strong>
                      {prop.thesis}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-[#B8925A]/20 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedProperty(prop)}
                      className="text-xs text-[#FAF8F4]/80 hover:text-[#FAF8F4] underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Audit Detail</span>
                    </button>

                    <button
                      onClick={() =>
                        onOpenBooking('Ask About This Property', prop.listing_id, prop.title)
                      }
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md"
                    >
                      <span>Ask About This Property</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 5: LISTING DETAIL MODAL */}
      <AnimatePresence>
        {selectedProperty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProperty(null)}
              className="fixed inset-0 bg-[#07152F]/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 w-full max-w-3xl my-auto bg-[#07152F] border border-[#B8925A]/40 rounded-2xl shadow-2xl p-6 sm:p-8 text-[#FAF8F4] max-h-[90vh] overflow-y-auto space-y-6"
            >
              <div className="flex items-start justify-between border-b border-[#B8925A]/20 pb-4">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
                    Listing Detail Audit · {selectedProperty.listing_id}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-[#FAF8F4] mt-1">
                    {selectedProperty.title}, {selectedProperty.district}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProperty(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Detail Photo */}
              {selectedProperty.image_urls && (
                <div className="rounded-xl overflow-hidden h-64 border border-[#B8925A]/30">
                  <img
                    src={selectedProperty.image_urls}
                    alt={selectedProperty.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* The Numbers */}
              <div className="p-4 rounded-xl bg-[#0B1F44] border border-[#B8925A]/30 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                  The Numbers
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-[#FAF8F4]/60 block">Price:</span>
                    <span className="font-serif text-lg font-bold text-[#FAF8F4]">
                      {selectedProperty.price_ngn}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#FAF8F4]/60 block">Quoted Rent:</span>
                    <span className="font-semibold text-[#FAF8F4]">
                      {selectedProperty.rent_ngn_per_year || 'Negotiated'} ({selectedProperty.rent_basis || 'gross'}, {selectedProperty.rent_status || 'asking'})
                    </span>
                  </div>
                  <div>
                    <span className="text-[#FAF8F4]/60 block">Net Income Est:</span>
                    <span className="text-[#FAF8F4]/90">
                      {selectedProperty.net_income_estimate || 'Available upon request based on strategy'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#FAF8F4]/60 block">Service Charge:</span>
                    <span className="text-[#FAF8F4]/90">
                      {selectedProperty.service_charge || 'Confirmed during discovery call'}
                    </span>
                  </div>
                </div>
              </div>

              {/* What we found */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
                  What we found
                </h3>
                <p className="text-sm text-[#FAF8F4]/85 leading-relaxed bg-[#0B1F44]/50 p-4 rounded-xl border border-slate-700">
                  {selectedProperty.condition_summary || 'Short summary of the condition report: structural, plumbing, electrical and aesthetic state certified.'}
                </p>
              </div>

              {/* What we've checked on the title */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
                  What we've checked on the title
                </h3>
                <p className="text-sm text-[#FAF8F4]/85 leading-relaxed bg-[#0B1F44]/50 p-4 rounded-xl border border-slate-700">
                  Status: <strong>{selectedProperty.title_status}</strong>. Independent AGIS registry search records and solicitor's written opinion prepared before final execution.
                </p>
              </div>

              {/* The honest bit */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>The honest bit</span>
                </h3>
                <p className="text-sm text-amber-200/90 leading-relaxed bg-amber-950/20 p-4 rounded-xl border border-amber-500/30">
                  {selectedProperty.risk_note || 'At least one real risk or watch-out for this specific property, and how we check it.'}
                </p>
              </div>

              {/* Who it suits */}
              <div className="text-xs text-[#FAF8F4]/75">
                <strong className="text-[#FAF8F4]">Who it suits: </strong>
                <span>Long-let investor / short-let investor / appreciation play / pooled purchase.</span>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-[#B8925A]/20 flex items-center justify-between">
                <button
                  onClick={() => {
                    setSelectedProperty(null);
                    onOpenConditionReport();
                  }}
                  className="text-xs text-[#D4AF37] underline"
                >
                  View Sample Condition Report Format
                </button>

                <button
                  onClick={() => {
                    const prop = selectedProperty;
                    setSelectedProperty(null);
                    onOpenBooking('Book a Call About This Property', prop.listing_id, prop.title);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] font-bold text-xs uppercase tracking-wider"
                >
                  <span>Book a Call About This Property</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SECTION 7: FOR SELLERS AND DEVELOPERS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-b border-[#B8925A]/20">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#07152F] border border-[#B8925A]/35 space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#B8925A]">
            Developers & Property Owners
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#FAF8F4] tracking-tight">
            Own or develop property? Let's talk.
          </h2>
          <div className="space-y-4 text-base sm:text-lg text-[#FAF8F4]/80 leading-relaxed">
            <p>
              We bring qualified, serious, pre-educated buyers to properly presented property. In-house photography, video and virtual tours, direct communication and a buyer base that understands process.
            </p>
            <p>
              If you have a property you'd like us to represent, tell us about it.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onOpenBooking('List a Property With Us', undefined, undefined, 'A property owner or seller')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#B8925A] text-[#D4AF37] hover:bg-[#B8925A]/15 text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <span>List a Property With Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8: CLOSING CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#FAF8F4] tracking-tight">
          Found something you like? Don't pay a kobo yet.
        </h2>
        <p className="text-base sm:text-lg text-[#FAF8F4]/80 max-w-xl mx-auto">
          Talk to us first. We'll tell you what we know, what we don't yet and what we'd check next.
        </p>

        <div className="pt-2">
          <button
            onClick={() => onOpenBooking('Book a Free Discovery Call (Properties Closing)')}
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

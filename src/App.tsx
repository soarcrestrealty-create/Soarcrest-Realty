import React, { useState, useEffect } from 'react';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { BookingForm } from './components/BookingForm';
import { SampleReportModal } from './components/SampleReportModal';
import { PrivacyModal } from './components/PrivacyModal';
import { DynamicBackground } from './components/DynamicBackground';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingButtonLabel, setBookingButtonLabel] = useState('Book a Free Discovery Call');
  const [bookingListingId, setBookingListingId] = useState<string | undefined>(undefined);
  const [bookingListingTitle, setBookingListingTitle] = useState<string | undefined>(undefined);
  const [bookingInitialRole, setBookingInitialRole] = useState<string | undefined>(undefined);

  // Informational Modals
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Handle URL hash changes or routing
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      if (['home', 'about', 'services', 'properties', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: PageRoute) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenBooking = (
    label: string,
    listingId?: string,
    listingTitle?: string,
    initialRole?: string
  ) => {
    setBookingButtonLabel(label);
    setBookingListingId(listingId);
    setBookingListingTitle(listingTitle);
    setBookingInitialRole(initialRole);
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen w-full max-w-full overflow-x-hidden bg-[#0B1F44] text-[#FAF8F4] flex flex-col font-sans selection:bg-[#B8925A] selection:text-[#0B1F44]">
      {/* 3D Dynamic Background with Scroll-drawn Journey Connector Line & White Ambient Light */}
      <DynamicBackground />

      {/* Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={(label) => handleOpenBooking(label)}
      />

      {/* Main Page View */}
      <main className="relative z-10 flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            onOpenConditionReport={() => setIsReportOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage === 'properties' && (
          <PropertiesPage
            onOpenBooking={handleOpenBooking}
            onOpenConditionReport={() => setIsReportOpen(true)}
          />
        )}

        {currentPage === 'contact' && (
          <ContactPage
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenConditionReport={() => setIsReportOpen(true)}
          />
        )}
      </main>

      {/* Persistent Mobile Bottom CTA Bar */}
      <MobileBottomBar onOpenBooking={(label) => handleOpenBooking(label)} />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenBooking}
        onOpenConditionReport={() => setIsReportOpen(true)}
      />

      {/* Booking Form Modal */}
      <BookingForm
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        inline={false}
        sourcePage={currentPage}
        buttonLabel={bookingButtonLabel}
        listingId={bookingListingId}
        listingTitle={bookingListingTitle}
        initialRole={bookingInitialRole}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenConditionReport={() => {
          setIsBookingOpen(false);
          setIsReportOpen(true);
        }}
      />

      {/* Sample Condition Report Modal */}
      <SampleReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
      />

      {/* Privacy Notice Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}

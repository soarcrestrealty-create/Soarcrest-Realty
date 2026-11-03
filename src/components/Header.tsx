import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { PageRoute } from '../types';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  onOpenBooking: (buttonLabel: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Solid background after 40px
      if (currentScrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: { id: PageRoute; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'properties', label: 'Properties' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          visible ? 'translate-y-0' : '-translate-y-full'
        } ${
          scrolled
            ? 'bg-[#07152F]/92 backdrop-blur-md border-b border-[#B8925A]/25 py-3 shadow-lg'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark & Icon */}
            <button
              onClick={() => handleLinkClick('home')}
              className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8925A] rounded"
            >
              <Logo size="md" />
            </button>

            {/* Zone 2: Navigation Links (5 single-line clean text items) */}
            <nav className="hidden md:flex items-center gap-7 lg:gap-8">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className={`relative text-xs lg:text-sm font-medium tracking-wide whitespace-nowrap transition-colors py-1 ${
                      isActive
                        ? 'text-[#FAF8F4]'
                        : 'text-[#FAF8F4]/70 hover:text-[#FAF8F4]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#B8925A] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: 1 Primary Action (Persistent Gold Button) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenBooking('Book a Free Discovery Call')}
                className="hidden sm:inline-flex items-center gap-2 px-4 lg:px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all shadow-md"
              >
                <span>Book a Free Discovery Call</span>
                <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[#FAF8F4] hover:bg-[#0B1F44] border border-[#B8925A]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8925A]"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#07152F] border-b border-[#B8925A]/30 px-5 pt-3 pb-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`block w-full text-left py-2.5 px-3 rounded-lg text-sm font-medium ${
                  currentPage === item.id
                    ? 'bg-[#B8925A]/20 text-[#FAF8F4] font-semibold'
                    : 'text-[#FAF8F4]/80 hover:bg-[#0B1F44]'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking('Book a Free Discovery Call');
                }}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#B8925A] to-[#D4AF37] text-[#07152F] text-xs font-bold uppercase tracking-wider text-center"
              >
                Book a Free Discovery Call
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

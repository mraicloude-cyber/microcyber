import React, { useState } from 'react';
import { MessageCircle, Calendar, Menu, X, Flame } from 'lucide-react';
import { CONTACT_INFO } from '../data/productsData';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenProducts: () => void;
  activeSection?: string;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenProducts }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#why-us' },
    { label: 'Products', href: '#products-section' },
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Booking', href: '#booking-flow' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070709]/95 backdrop-blur-md border-b border-neutral-900/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo Zone - Exactly matching Shisha Rent emblem in poster */}
          <a href="#home" className="flex items-center gap-3.5 group shrink-0">
            <div className="relative flex items-center justify-center w-12 h-12 rounded-full border border-red-600/40 bg-gradient-to-br from-red-950/60 to-black p-0.5 shadow-lg shadow-red-900/30 group-hover:border-red-500 transition-colors">
              <div className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center bg-black/80">
                {/* Stylized Hookah Icon */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500 fill-current drop-shadow">
                  <path d="M12 2a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2.18c2.28.46 4 2.47 4 4.82v1a4 4 0 0 1-2.5 3.7V20a2 2 0 1 1-4 0v-1.3A4 4 0 0 1 8 15v-1c0-2.35 1.72-4.36 4-4.82V7H10a1 1 0 0 1 0-2h2V3a1 1 0 0 1 1-1zm-2 13a2 2 0 0 0 4 0v-1a2 2 0 0 0-4 0v1z"/>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">SHISHA</span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-red-600 font-heading">RENT</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-[1px] w-3 bg-red-600/70"></span>
                <span className="text-[10px] tracking-[0.28em] uppercase text-neutral-400 font-medium">K O L K A T A</span>
                <span className="h-[1px] w-3 bg-red-600/70"></span>
              </div>
            </div>
          </a>

          {/* Nav Links Zone (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-neutral-300 hover:text-white transition-colors duration-150 py-1 relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Action Zone (WhatsApp + Book Now) */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            {/* WhatsApp Direct Contact Button */}
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-600/40 hover:border-emerald-500/80 hover:bg-emerald-900/30 transition-all group"
              title="Chat on WhatsApp"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-white shrink-0 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left leading-tight pr-1">
                <span className="text-xs font-semibold text-white tracking-wide">{CONTACT_INFO.phone}</span>
                <span className="text-[10px] text-emerald-400">Chat on WhatsApp</span>
              </div>
            </a>

            {/* Book Now Primary Button */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold shadow-lg shadow-red-700/30 hover:shadow-red-600/40 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white/90" />
              <span>Book Now</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900/80 border border-neutral-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-900 bg-[#0b0b10] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-neutral-200 hover:bg-neutral-900 hover:text-red-400 border border-neutral-900/80 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-900 flex flex-col gap-2.5">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-950/50 border border-emerald-600/50 text-emerald-300 text-sm font-medium"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: {CONTACT_INFO.phone}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProducts();
              }}
              className="w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-sm font-medium flex items-center justify-center gap-2"
            >
              <Flame className="w-4 h-4 text-red-500" />
              <span>Explore Products & Flavours</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

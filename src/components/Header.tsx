import React, { useState } from 'react';
import { MessageCircle, Calendar, Menu, X, Shield, Search, ShoppingBag } from 'lucide-react';
import { CONTACT_INFO } from '../data/productsData';
import { useCart } from '../context/CartContext';
import { useNavigation, PageId } from '../context/NavigationContext';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenTracker: () => void;
  currentDomain?: string;
  onSelectDomain?: (domain: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenAdmin,
  onOpenTracker,
}) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { currentPage, navigateTo } = useNavigation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageId }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Marketplace', page: 'products' },
    { label: 'Services', page: 'services' },
    { label: 'About Us', page: 'about' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Track Order', page: 'track' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#070709]/95 backdrop-blur-md border-b border-neutral-900 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Wordmark & Emblem */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3.5 group shrink-0 cursor-pointer text-left"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-full border border-red-600/40 bg-gradient-to-br from-red-950/60 to-black p-0.5 shadow-lg shadow-red-900/30 group-hover:border-red-500 transition-colors">
              <div className="w-9 h-9 rounded-full border border-red-500/30 flex items-center justify-center bg-black/90">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-red-500 fill-current">
                  <path d="M12 2a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2.18c2.28.46 4 2.47 4 4.82v1a4 4 0 0 1-2.5 3.7V20a2 2 0 1 1-4 0v-1.3A4 4 0 0 1 8 15v-1c0-2.35 1.72-4.36 4-4.82V7H10a1 1 0 0 1 0-2h2V3a1 1 0 0 1 1-1z"/>
                </svg>
              </div>
            </div>
            
            <div className="flex flex-col text-left">
              <div className="flex items-baseline gap-1.5 leading-none">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-heading">SHISHA</span>
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-red-600 font-heading">RENT</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="h-[1px] w-3 bg-red-600/70"></span>
                <span className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 font-medium">K O L K A T A</span>
                <span className="h-[1px] w-3 bg-red-600/70"></span>
              </div>
            </div>
          </button>

          {/* Clean Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-sm font-medium">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => navigateTo(link.page)}
                  className={`transition-colors duration-150 py-1 relative group whitespace-nowrap cursor-pointer text-sm ${
                    isActive ? 'text-white font-semibold' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-red-600 transition-all duration-200 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Action Zone: WhatsApp + Track + Cart + Admin + Book Now */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick Track Icon */}
            <button
              onClick={() => navigateTo('track')}
              title="Track Booking Status"
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                currentPage === 'track'
                  ? 'text-amber-400 bg-neutral-900 border-amber-500/50'
                  : 'text-neutral-400 hover:text-amber-400 hover:bg-neutral-900 border-neutral-800/80'
              }`}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              title="View Cart"
              className="relative p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800/80 transition-colors cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center shadow-md animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Admin Key Icon */}
            <button
              onClick={onOpenAdmin}
              title="Admin Portal"
              className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-900 border border-neutral-800/80 transition-colors cursor-pointer"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* WhatsApp Contact */}
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-950/40 border border-emerald-600/40 hover:border-emerald-500/80 hover:bg-emerald-900/30 transition-all text-xs font-semibold text-emerald-300"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>WhatsApp</span>
            </a>

            {/* Primary CTA */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-red-700/30 hover:shadow-red-600/40 transition-all active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-white/90" />
              <span>Book Now</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-neutral-900 border border-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-900 bg-[#0b0b10] px-4 pt-3 pb-5 space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigateTo(link.page);
                }}
                className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-center transition-colors ${
                  currentPage === link.page
                    ? 'bg-neutral-900 text-red-400 border-red-900/60 font-bold'
                    : 'text-neutral-300 hover:bg-neutral-900 hover:text-white border-neutral-900'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-900 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('track');
              }}
              className="py-2.5 rounded-lg bg-neutral-900 text-amber-400 border border-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="py-2.5 rounded-lg bg-neutral-900 text-neutral-300 border border-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-red-500" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

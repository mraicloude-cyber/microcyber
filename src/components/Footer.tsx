import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Shield, Scale } from 'lucide-react';
import { CONTACT_INFO } from '../data/productsData';

interface FooterProps {
  onOpenTerms: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenTerms, onOpenBooking }) => {
  return (
    <footer id="contact" className="bg-[#050508] border-t border-neutral-900 pt-16 pb-12 text-neutral-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Brand & Overview (col-span-4) */}
          <div className="lg:col-span-4 space-y-4 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-red-600/50 bg-black flex items-center justify-center text-red-500 shadow-md">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2.18c2.28.46 4 2.47 4 4.82v1a4 4 0 0 1-2.5 3.7V20a2 2 0 1 1-4 0v-1.3A4 4 0 0 1 8 15v-1c0-2.35 1.72-4.36 4-4.82V7H10a1 1 0 0 1 0-2h2V3a1 1 0 0 1 1-1z"/>
                </svg>
              </div>
              <div>
                <div className="text-xl font-extrabold tracking-tight text-white font-heading">
                  SHISHA <span className="text-red-600">RENT</span>
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 font-semibold">
                  K O L K A T A
                </div>
              </div>
            </div>

            <p className="text-neutral-400 leading-relaxed text-xs">
              Kolkata's premier luxury hookah rental and hospitality event provider. Supplying authentic flavour brands, crystal Bohemian hookahs, professional mixologists and gourmet chefs for private parties, birthdays, bachelors, and weddings.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-950/60 border border-emerald-600/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/50 transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp: {CONTACT_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation (col-span-2) */}
          <div className="lg:col-span-2 space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-red-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-red-400 transition-colors">
                  About Us & Why Choose Us
                </a>
              </li>
              <li>
                <a href="#products-section" className="hover:text-red-400 transition-colors">
                  Hookah, Flavours & Accessories
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-red-400 transition-colors">
                  Bartenders & Cook Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-red-400 transition-colors">
                  Gallery & Party Setups
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenTerms}
                  className="hover:text-red-400 transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Products & Flavours Highlight (col-span-3) */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Available Brands
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Al Fakir · Al Fuse · Aladdin · Afreen · Al Fazila · Afzal · Aroma · Royal · Ayaan · Keva · Makai · Maya · Exotic · Harval · Al Akbar
            </p>
            <div className="pt-2 text-neutral-300 text-xs space-y-1">
              <p className="text-amber-400 font-semibold">Available Models:</p>
              <p className="text-[11px] text-neutral-400">
                Maya Hookah, Coco Aaya Hookah, Afreen Hookah, SR Series, Clay & Silicone Chilam, Coconut Coal & Heater Burners.
              </p>
            </div>
          </div>

          {/* Contact & Kolkata Coverage (col-span-3) */}
          <div className="lg:col-span-3 space-y-3 text-left">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Kolkata Service Hub
            </h4>
            <div className="space-y-2.5 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="text-neutral-400 leading-snug">
                  {CONTACT_INFO.areasServed}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 shrink-0" />
                <a href={`tel:${CONTACT_INFO.phone}`} className="hover:text-white">
                  {CONTACT_INFO.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 shrink-0" />
                <span>{CONTACT_INFO.email}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-amber-400/90">{CONTACT_INFO.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar & Legal Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 text-center sm:text-left">
          <div className="space-y-1">
            <p>© 2026 Shisha Rent Kolkata. All rights reserved.</p>
            <p className="text-[11px] text-neutral-600">
              Disclaimer: Hookah equipment rental is intended for adults aged 18+ only. 100% tobacco-free herbal shisha options are available upon customer request.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenTerms}
              className="text-neutral-400 hover:text-white underline cursor-pointer text-xs"
            >
              Terms & Customer Choice Policy
            </button>
            <button
              onClick={onOpenBooking}
              className="px-3.5 py-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-semibold"
            >
              Book Online
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

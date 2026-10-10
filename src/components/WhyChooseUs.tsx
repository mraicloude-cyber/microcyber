import React from 'react';
import { Crown, ShieldCheck, UserCheck, Clock, Sparkles, ArrowRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenBooking: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenBooking }) => {
  return (
    <section id="why-us" className="py-16 sm:py-20 bg-[#070709] border-t border-neutral-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-10">
          <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold tracking-wider uppercase mb-2">
            <Crown className="w-4 h-4 text-amber-400" />
            <span>WHY CHOOSE US?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-heading">
            Your Perfect Hookah Experience{' '}
            <span className="text-red-600">Partner</span>
          </h2>
        </div>

        {/* 4 Pillars + Custom Quote Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 4 Pillars Grid (col-span-7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 text-left">
            
            {/* 1. Premium Quality */}
            <div className="p-5 rounded-xl border border-neutral-800/80 bg-neutral-950/60 hover:border-red-900/60 transition-colors flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Premium Quality</h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">Original Brands</p>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  100% authentic tobacco & herbal flavours, crystal Bohemian glass hookahs, sanitized silicone hoses, and food-grade accessories.
                </p>
              </div>
            </div>

            {/* 2. Professional Staff */}
            <div className="p-5 rounded-xl border border-neutral-800/80 bg-neutral-950/60 hover:border-amber-900/60 transition-colors flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Professional Staff</h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">Trained & Experienced</p>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Skilled shisha masters, certified mixologist bartenders, and gourmet chefs dedicated to making your private event flawless.
                </p>
              </div>
            </div>

            {/* 3. On-Time Delivery */}
            <div className="p-5 rounded-xl border border-neutral-800/80 bg-neutral-950/60 hover:border-red-900/60 transition-colors flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-red-500 shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">On-Time Delivery</h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">Safe & Secure</p>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Punctual delivery to your doorstep, resort, banquet hall or terrace across Kolkata with full setup and safety briefing.
                </p>
              </div>
            </div>

            {/* 4. Custom Packages */}
            <div className="p-5 rounded-xl border border-neutral-800/80 bg-neutral-950/60 hover:border-amber-900/60 transition-colors flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Custom Packages</h3>
                <p className="text-xs text-amber-400 font-medium mt-0.5">For Every Occasion</p>
                <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                  Flexible options from a single chill hookah for a cozy movie night to 25+ VIP hookah setups for weddings & corporate galas.
                </p>
              </div>
            </div>

          </div>

          {/* Right Callout Banner - Exactly matching "BOOKING MADE EASY - Get Your Custom Quote" in poster */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-red-900/60 bg-gradient-to-r from-black via-neutral-950 to-neutral-900 p-6 sm:p-7 shadow-2xl flex flex-col sm:flex-row items-center gap-6 text-left">
              
              {/* Luxury Drink Photo */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-neutral-700 shadow-md">
                <img
                  src="/src/assets/images/quote_cocktail_drink_1791648736985.jpg"
                  alt="Craft Cocktail Lounge"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text & CTA */}
              <div className="space-y-2 flex-1">
                <div className="text-[11px] font-bold tracking-[0.2em] text-red-500 uppercase">
                  BOOKING MADE EASY
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                  Get Your Custom Quote
                </h3>
                <p className="text-xs text-neutral-400">
                  Select your flavours, hardware, staff requirements, and receive an instant quote with Cash on Delivery or QR payment.
                </p>

                <div className="pt-2">
                  <button
                    onClick={onOpenBooking}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-900/40 transition-all cursor-pointer active:scale-95 group"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

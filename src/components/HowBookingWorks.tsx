import React from 'react';
import { Sparkles, Calendar, Truck, PartyPopper } from 'lucide-react';

interface HowBookingWorksProps {
  onOpenBooking: () => void;
}

export const HowBookingWorks: React.FC<HowBookingWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      title: 'Choose Flavours & Hardware',
      description: 'Select your favourite brand (Al Fakir, Afzal, Royal, etc.), preferred Hookah model, chilam, and accessories.',
      icon: <Sparkles className="w-5 h-5 text-red-500" />,
    },
    {
      number: '02',
      title: 'Set Date & Services',
      description: 'Pick your event date, time slot, delivery location in Kolkata, and add optional Bartenders or Cooks.',
      icon: <Calendar className="w-5 h-5 text-amber-400" />,
    },
    {
      number: '03',
      title: 'Confirm via WhatsApp or COD',
      description: 'Review your custom quote, choose Cash on Delivery or UPI QR code, and get immediate dispatch confirmation.',
      icon: <Truck className="w-5 h-5 text-red-500" />,
    },
    {
      number: '04',
      title: 'Relax & Enjoy the Smoke',
      description: 'Our team delivers and sets up your hookah with glowing coals. Later, we collect the gear without any cleanup needed.',
      icon: <PartyPopper className="w-5 h-5 text-amber-400" />,
    },
  ];

  return (
    <section id="booking-flow" className="py-16 sm:py-24 bg-[#0a0a10] border-t border-neutral-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-semibold tracking-wider uppercase">
            <span>EFFORTLESS PROCESS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            How Booking <span className="text-red-600">Works</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base">
            From picking your favourite flavour brand to doorstep setup in 4 simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 hover:border-red-900/60 transition-all text-left relative flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-neutral-700 group-hover:text-red-600/70 transition-colors font-mono">
                    {step.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-heading">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-900 text-[11px] text-neutral-500 font-medium">
                Step {step.number} of 04
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold text-sm shadow-xl shadow-red-900/40 hover:shadow-red-600/50 transition-all cursor-pointer"
          >
            <span>Start Your Booking Now</span>
          </button>
        </div>

      </div>
    </section>
  );
};

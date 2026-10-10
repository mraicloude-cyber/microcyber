import React from 'react';
import { GlassWater, Utensils, Sparkles, Truck, ShieldCheck, Check, Calendar } from 'lucide-react';

interface ServicesSectionProps {
  onOpenBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenBooking }) => {
  const serviceCards = [
    {
      id: 'hookah-rental',
      title: 'Premium Hookah Rental',
      subtitle: 'VIP Glass & Bohemian Setups',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current text-red-500">
          <path d="M12 2a1 1 0 0 1 1 1v2h2a1 1 0 1 1 0 2h-2v2.18c2.28.46 4 2.47 4 4.82v1a4 4 0 0 1-2.5 3.7V20a2 2 0 1 1-4 0v-1.3A4 4 0 0 1 8 15v-1c0-2.35 1.72-4.36 4-4.82V7H10a1 1 0 0 1 0-2h2V3a1 1 0 0 1 1-1z"/>
        </svg>
      ),
      description: 'Rent the finest Maya, Coco Aaya, Afreen and signature SR hookahs with premium clay chilams, high-airflow pipes, and natural coconut coal.',
      features: [
        'Sanitized food-grade equipment',
        'Choice of 15+ flavour brands',
        'Free coal burner & safety tongs',
        'Setup & fire-lighting guidance',
      ],
      tag: 'Most Popular',
    },
    {
      id: 'bartender',
      title: 'Bartender & Mixologist Services',
      subtitle: 'Artisanal Craft Cocktails & Mocktails',
      icon: <GlassWater className="w-6 h-6 text-amber-400" />,
      description: 'Elevate your party with certified flair bartenders and cocktail artisans. Custom cocktail menus, smoky presentations, and bar station setup.',
      features: [
        'Certified & groomed professionals',
        'Signature smoked cocktail options',
        'Barware & glassware support',
        'Custom themed drink menus',
      ],
      tag: 'VIP Add-on',
    },
    {
      id: 'cooks',
      title: 'Cook & Private Chef Services',
      subtitle: 'Multi-Cuisine Party Catering',
      icon: <Utensils className="w-6 h-6 text-red-500" />,
      description: 'From sizzling charcoal kebabs and Mughlai platters to gourmet continental finger foods, our experienced cooks cater delicious hot party menus.',
      features: [
        'Live barbecue & tandoor counters',
        'Customized party snack menus',
        'Hygiene-first food preparation',
        'Serving staff & plating assistance',
      ],
      tag: 'Chef Grade',
    },
    {
      id: 'events',
      title: 'Parties, Weddings & Event Setup',
      subtitle: 'Complete VIP Shisha Lounge Experience',
      icon: <Sparkles className="w-6 h-6 text-amber-400" />,
      description: 'Comprehensive hookah lounge setups for weddings, sangeet nights, bachelors, private birthdays, terrace parties, and corporate celebrations.',
      features: [
        'Multi-pot bulk discounts',
        'Dedicated on-site shisha master',
        'Continuous coal rotation & bowl refills',
        'Luxury lounge furniture accents',
      ],
      tag: 'Full Event',
    },
    {
      id: 'delivery',
      title: 'Doorstep 24/7 Delivery & Setup',
      subtitle: 'Punctual & Discreet Delivery',
      icon: <Truck className="w-6 h-6 text-red-500" />,
      description: 'Prompt delivery straight to your apartment, farmhouse, villa or banquet anywhere in Kolkata. We assemble the hookah and test draw quality.',
      features: [
        'Late-night & party-hour delivery',
        'Leak-proof transport cases',
        'Quick 45–60 min dispatch available',
        'Live tracking & WhatsApp alerts',
      ],
      tag: 'All Kolkata',
    },
    {
      id: 'pickup',
      title: 'Effortless Pickup Service',
      subtitle: 'Zero Hassle Return Handling',
      icon: <ShieldCheck className="w-6 h-6 text-amber-400" />,
      description: 'After your event is complete, our pickup team arrives at your chosen time, inspects and packs up the equipment with zero cleaning required by you.',
      features: [
        'Flexible next-day pickup timings',
        'No messy washing needed by host',
        'Instant deposit settlement',
        'Friendly & courteous team',
      ],
      tag: 'Carefree',
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-[#070709] border-t border-neutral-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-semibold tracking-wider uppercase">
            <span>OUR SERVICES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Comprehensive Luxury <span className="text-red-600">Event Services</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            We don't just provide hookahs — we create an entire luxury lounge atmosphere with skilled staff, gourmet food, and handcrafted drinks.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCards.map((service) => (
            <div
              key={service.id}
              className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800/90 hover:border-red-600/60 transition-all duration-300 shadow-xl flex flex-col justify-between text-left group"
            >
              <div>
                {/* Header with icon and tag */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {service.icon}
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300">
                    {service.tag}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors font-heading">
                  {service.title}
                </h3>
                <p className="text-xs text-amber-400/90 font-medium mt-0.5">
                  {service.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-neutral-400 mt-3 leading-relaxed">
                  {service.description}
                </p>

                {/* Features list */}
                <div className="mt-5 space-y-2 border-t border-neutral-900 pt-4">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <Check className="w-3.5 h-3.5 text-red-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card CTA */}
              <div className="mt-6 pt-4 border-t border-neutral-900">
                <button
                  onClick={onOpenBooking}
                  className="w-full py-2.5 rounded-lg bg-neutral-900 hover:bg-red-600 text-neutral-200 hover:text-white border border-neutral-800 hover:border-red-600 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book This Service</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

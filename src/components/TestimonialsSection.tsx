import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Rohan Sen',
      role: 'Private Birthday Host',
      location: 'Salt Lake, Kolkata',
      quote:
        'Requested 4 Maya Hookahs with Al Fakir & Royal flavours along with their bartender for my 30th birthday. The staff was super professional, setup was on time, and the smoked cocktails were incredible!',
      rating: 5,
      date: 'Party in October 2026',
    },
    {
      name: 'Ananya Mukherjee',
      role: 'Wedding Cocktail Organizer',
      location: 'Alipore, Kolkata',
      quote:
        'The SR Premium hookah setup was the highlight of our sangeet evening. They brought clean silicone chilams, coconut coals that lasted for hours, and replaced bowls seamlessly. Zero headaches for us.',
      rating: 5,
      date: 'Wedding in September 2026',
    },
    {
      name: 'Vikramaditya Roy',
      role: 'Terrace Chill Session',
      location: 'New Town Action Area 1',
      quote:
        'I requested the Coco Aaya Hookah and Mud Mitti Chilam with Afzal paan flavour. They arrived within 45 minutes, properly set it up, and picked it up the next afternoon. Honest pricing with COD.',
      rating: 5,
      date: 'Weekend Chill in August 2026',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#0a0a10] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-red-500 font-semibold">
            <span>CLIENT REVIEWS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Loved by Kolkata's <span className="text-red-600">Party Hosts</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base">
            Read what our clients say about our equipment quality, flavour choices, and professional staff.
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-neutral-950 border border-neutral-800 text-left flex flex-col justify-between hover:border-neutral-700 transition-all shadow-lg relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-neutral-800" />
                </div>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-neutral-900 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white font-heading">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-amber-400 font-medium">
                    {item.role} · {item.location}
                  </p>
                </div>
                <span className="text-[10px] text-neutral-500">
                  {item.date}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

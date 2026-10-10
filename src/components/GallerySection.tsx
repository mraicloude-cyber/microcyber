import React, { useState } from 'react';
import { Camera, ZoomIn } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const galleryItems = [
    {
      title: 'VIP Lounge Setup with Exotic Fruits',
      subtitle: 'Park Street Private Terrace Event',
      src: '/src/assets/images/hero_luxury_hookah_1791648599431.jpg',
      aspect: 'col-span-1 md:col-span-2 row-span-2',
    },
    {
      title: 'Artisanal Smoked Cocktails & Bar Station',
      subtitle: 'Cocktail Mixologist Catering',
      src: '/src/assets/images/quote_cocktail_drink_1791648736985.jpg',
      aspect: 'col-span-1',
    },
    {
      title: 'Exclusive SR Signature Collection',
      subtitle: 'Matte Black & Gold VIP Series',
      src: '/src/assets/images/category_sr_products_1791648725022.jpg',
      aspect: 'col-span-1',
    },
    {
      title: 'Clay Chilams & Natural Coal Preparation',
      subtitle: 'Even Heat Distribution & Zero Harshness',
      src: '/src/assets/images/category_chilam_bowls_1791648639938.jpg',
      aspect: 'col-span-1',
    },
    {
      title: 'Bohemian Glass Bases & Precision Stems',
      subtitle: 'Maya & Coco Aaya Hookahs',
      src: '/src/assets/images/category_hookah_bases_1791648627967.jpg',
      aspect: 'col-span-1',
    },
    {
      title: 'Fresh Fruit Infused Herbal Molasses',
      subtitle: 'Top 15+ Global Flavour Brands',
      src: '/src/assets/images/category_flavours_1791648613614.jpg',
      aspect: 'col-span-1 md:col-span-2',
    },
  ];

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-[#070709] border-t border-neutral-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-400 font-semibold">
            <Camera className="w-4 h-4 text-amber-400" />
            <span>VISUAL PORTFOLIO</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            The Shisha Rent <span className="text-red-600">Experience</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base">
            Take a glimpse into our luxury party setups, glowing coal burners, and premium presentations across Kolkata.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActiveImage(item.src)}
              className="relative group rounded-xl overflow-hidden border border-neutral-800/80 bg-neutral-950 aspect-[4/3] cursor-pointer shadow-lg hover:border-red-600/60 transition-all duration-300"
            >
              <img
                src={item.src}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-0 p-4 flex flex-col justify-end text-left">
                <span className="text-[11px] text-amber-400 font-medium">
                  {item.subtitle}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                  {item.title}
                </h3>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                <ZoomIn className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-neutral-700">
            <img
              src={activeImage}
              alt="Enlarged view"
              className="max-w-full max-h-[85vh] object-contain"
            />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-black/70 text-white text-xs font-semibold hover:bg-red-600 transition-colors"
            >
              Close ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PRODUCT_CATEGORIES, ProductCategory } from '../data/productsData';

interface ProductCategoriesPreviewProps {
  onSelectCategory: (categoryId: ProductCategory['id']) => void;
  onViewAllProducts: () => void;
}

export const ProductCategoriesPreview: React.FC<ProductCategoriesPreviewProps> = ({
  onSelectCategory,
  onViewAllProducts,
}) => {
  return (
    <section id="categories-preview" className="py-14 sm:py-20 bg-[#070709] border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column Callout - Exactly matching poster */}
          <div className="lg:col-span-4 space-y-5 text-left lg:sticky lg:top-28">
            <div className="inline-flex items-center gap-2">
              <span className="h-[2px] w-6 bg-red-600"></span>
              <p className="text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase text-red-500">
                EXPLORE OUR
              </p>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight font-heading">
              HOOKAH, FLAVOURS &{' '}
              <span className="text-red-600">ACCESSORIES</span>
            </h2>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
              Premium brands, wide variety and everything you need for the perfect hookah experience.
            </p>

            <div className="pt-2">
              <button
                onClick={onViewAllProducts}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm font-semibold shadow-lg shadow-red-900/30 hover:shadow-red-600/40 transition-all cursor-pointer group"
              >
                <span>View All Products</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick trust snippet */}
            <div className="pt-4 text-xs text-neutral-500 space-y-1 border-t border-neutral-900">
              <p>✓ All requested items provided as per booking choice</p>
              <p>✓ 100% genuine brands & food-grade silicone accessories</p>
            </div>
          </div>

          {/* Right Column: 6 Category Cards matching the screenshot */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
              {PRODUCT_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className="group relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950/70 hover:border-red-600/70 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-red-950/30 flex flex-col"
                >
                  {/* Category Image with dark gradient overlay */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-900">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-85" />

                    {/* Bottom Title & Subtitle Badge */}
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        {cat.title}
                      </h3>
                      <div className="flex items-center justify-between mt-0.5">
                        <span className="text-xs text-neutral-300 font-medium">
                          {cat.subtitle}
                        </span>
                        <div className="w-6 h-6 rounded-full bg-red-600/20 group-hover:bg-red-600 text-neutral-300 group-hover:text-white flex items-center justify-center transition-colors">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Description Footer */}
                  <div className="p-3 bg-neutral-950/90 text-left border-t border-neutral-900/60 flex-1 flex flex-col justify-between">
                    <p className="text-xs text-neutral-400 line-clamp-2">
                      {cat.description}
                    </p>
                    <div className="mt-2 text-[11px] font-semibold text-neutral-500 group-hover:text-red-400 transition-colors flex items-center gap-1">
                      <span>Explore {cat.countLabel}</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

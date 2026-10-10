import React, { useState, useMemo } from 'react';
import { Search, Flame, CheckCircle2, AlertCircle, Sparkles, Plus, Check } from 'lucide-react';
import { ALL_PRODUCTS, PRODUCT_CATEGORIES, CUSTOMER_POLICY, ProductItem } from '../data/productsData';

interface ProductsCatalogSectionProps {
  selectedCategoryId: string;
  onSelectCategoryTab: (id: string) => void;
  onRequestItemInBooking: (item: ProductItem) => void;
  selectedBookingItems: ProductItem[];
  onOpenBookingModal: () => void;
}

export const ProductsCatalogSection: React.FC<ProductsCatalogSectionProps> = ({
  selectedCategoryId,
  onSelectCategoryTab,
  onRequestItemInBooking,
  selectedBookingItems,
  onOpenBookingModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTypeFilter, setActiveTypeFilter] = useState<'all' | string>('all');

  // Filtered product items
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategoryId === 'all' || item.category === selectedCategoryId;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryId, searchQuery]);

  // Check if an item is already added to booking request
  const isSelected = (itemId: string) => {
    return selectedBookingItems.some((item) => item.id === itemId);
  };

  return (
    <section id="products-section" className="py-16 sm:py-24 bg-[#0a0a0f] border-t border-neutral-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-xs font-semibold tracking-wider uppercase">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Complete Customer-Facing Inventory</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Hookah, Flavours & <span className="text-red-600">Accessories</span>
          </h2>

          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            All premium flavours, hookah models, chilams, pipes, and coal accessories available for your Kolkata event or home rental. Request your exact preferred brands when placing your booking.
          </p>
        </div>

        {/* Highlighted Customer Choice & Availability Rule Box */}
        <div className="mb-10 p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-red-950/25 via-[#120a0d] to-amber-950/20 border border-red-800/50 shadow-xl text-left relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-red-900/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/50 flex items-center justify-center text-red-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {CUSTOMER_POLICY.title}
                </h3>
                <p className="text-xs text-amber-400 font-medium">
                  Transparent Availability & 100% Customer Confirmation Rule
                </p>
              </div>
            </div>

            {selectedBookingItems.length > 0 && (
              <button
                onClick={onOpenBookingModal}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-md shadow-red-900/30 transition-all cursor-pointer shrink-0"
              >
                <span>Selected Items ({selectedBookingItems.length})</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="pt-4 space-y-2.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
            <p className="text-neutral-200 font-medium">
              <strong className="text-white">Customer Request Rule: </strong>
              {CUSTOMER_POLICY.ruleHindiEnglish}
            </p>
            <p className="text-neutral-300">
              <strong className="text-amber-300">Choice Guarantee: </strong>
              {CUSTOMER_POLICY.exampleExplanation}
            </p>
            <div className="p-3 rounded-lg bg-black/60 border border-red-900/50 flex items-start gap-2.5 mt-2 text-xs text-neutral-200">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-red-400">Strict Policy: </strong>
                {CUSTOMER_POLICY.guaranteeRule}
              </span>
            </div>
          </div>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="space-y-4 mb-8">
          
          {/* Search bar & count */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Al Fakir, Coco Aaya, Silicone Chilam, Magic Coal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-neutral-900/90 border border-neutral-800 text-neutral-200 placeholder-neutral-500 text-sm focus:outline-none focus:border-red-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="text-xs text-neutral-400 font-medium text-left sm:text-right">
              Showing <span className="text-white font-bold">{filteredProducts.length}</span> of {ALL_PRODUCTS.length} total catalog items
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none text-xs font-medium">
            <button
              onClick={() => onSelectCategoryTab('all')}
              className={`px-4 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${
                selectedCategoryId === 'all'
                  ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-900/40'
                  : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-neutral-800'
              }`}
            >
              All Items ({ALL_PRODUCTS.length})
            </button>
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategoryTab(cat.id)}
                className={`px-4 py-2 rounded-lg transition-all shrink-0 cursor-pointer ${
                  selectedCategoryId === cat.id
                    ? 'bg-red-600 text-white font-semibold shadow-md shadow-red-900/40'
                    : 'bg-neutral-900 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
            <p className="text-neutral-300 font-medium">No items matched your search "{searchQuery}"</p>
            <p className="text-xs text-neutral-500">Try searching for Al Fakir, Maya, Mud Chilam, Coconut Coal, or SR Hookah</p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategoryTab('all');
              }}
              className="mt-2 px-4 py-2 rounded-lg bg-neutral-800 text-xs text-neutral-200 hover:bg-neutral-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredProducts.map((item) => {
              const active = isSelected(item.id);
              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 relative group ${
                    active
                      ? 'bg-red-950/20 border-red-600/80 shadow-lg shadow-red-950/40'
                      : 'bg-neutral-950/80 border-neutral-800/80 hover:border-neutral-700 hover:bg-neutral-900/40'
                  }`}
                >
                  <div>
                    {/* Category Label and Type */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                        {item.categoryLabel}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                        {item.type}
                      </span>
                    </div>

                    {/* Product Name (Exact spelling, single instance) */}
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors font-heading">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Footer: Availability status & Request button */}
                  <div className="pt-4 mt-4 border-t border-neutral-900 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{item.rentalOrSale}</span>
                    </div>

                    <button
                      onClick={() => onRequestItemInBooking(item)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-red-600 text-white shadow-sm'
                          : 'bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 hover:border-red-600/50'
                      }`}
                    >
                      {active ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Request</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5 text-red-400" />
                          <span>Request in Booking</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Extra Varieties Note (Mandatory requirement from user brief) */}
        <div className="mt-8 p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-center">
          <p className="text-xs sm:text-sm text-neutral-300">
            <span className="text-red-400 font-semibold">Special Note: </span>
            Inke alawa bhi hamare paas aur bhi bahut saari flavour varieties available hain. Agar aapko koi specific international blend ya custom mix chahiye, to booking time par mention kar sakte hain.
          </p>
        </div>

      </div>
    </section>
  );
};

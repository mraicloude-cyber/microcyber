/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { QuickServicesBar } from './components/QuickServicesBar';
import { ProductCategoriesPreview } from './components/ProductCategoriesPreview';
import { ProductsCatalogSection } from './components/ProductsCatalogSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ServicesSection } from './components/ServicesSection';
import { HowBookingWorks } from './components/HowBookingWorks';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { TermsModal } from './components/TermsModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductItem } from './data/productsData';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [selectedBookingItems, setSelectedBookingItems] = useState<ProductItem[]>([]);

  // Smooth scroll to catalog section
  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // When clicking a category card from the preview section
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    scrollToProducts();
  };

  // View all products handler
  const handleViewAllProducts = () => {
    setSelectedCategoryId('all');
    scrollToProducts();
  };

  // When user clicks "Request in Booking" on a product card
  const handleRequestItemInBooking = (item: ProductItem) => {
    setSelectedBookingItems((prev) => {
      const exists = prev.some((p) => p.id === item.id);
      if (exists) {
        return prev.filter((p) => p.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  // Quick service click handler
  const handleSelectQuickService = (serviceName: string) => {
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-neutral-100 flex flex-col selection:bg-red-600 selection:text-white">
      {/* Top Header Navigation */}
      <Header
        onOpenBooking={() => setIsBookingOpen(true)}
        onOpenProducts={scrollToProducts}
      />

      <main className="flex-1">
        {/* Full-width Luxury Hero */}
        <Hero
          onOpenBooking={() => setIsBookingOpen(true)}
          onOpenProducts={scrollToProducts}
        />

        {/* 7 Quick Services Ribbon */}
        <QuickServicesBar onSelectService={handleSelectQuickService} />

        {/* Explore Hookah, Flavours & Accessories Categories Preview */}
        <ProductCategoriesPreview
          onSelectCategory={handleSelectCategory}
          onViewAllProducts={handleViewAllProducts}
        />

        {/* Customer-Facing Products, Flavours & Accessories Complete Catalog */}
        <ProductsCatalogSection
          selectedCategoryId={selectedCategoryId}
          onSelectCategoryTab={(id) => setSelectedCategoryId(id)}
          onRequestItemInBooking={handleRequestItemInBooking}
          selectedBookingItems={selectedBookingItems}
          onOpenBookingModal={() => setIsBookingOpen(true)}
        />

        {/* Why Choose Us & Custom Quote Card */}
        <WhyChooseUs onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Premium Event Services (Bartenders, Cooks, Lounge Setup) */}
        <ServicesSection onOpenBooking={() => setIsBookingOpen(true)} />

        {/* How Booking Works (4 Steps) */}
        <HowBookingWorks onOpenBooking={() => setIsBookingOpen(true)} />

        {/* Visual Gallery */}
        <GallerySection />

        {/* Testimonials & Reviews */}
        <TestimonialsSection />
      </main>

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />

      {/* Footer */}
      <Footer
        onOpenTerms={() => setIsTermsOpen(true)}
        onOpenBooking={() => setIsBookingOpen(true)}
      />

      {/* Interactive Booking & Custom Quote Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialSelectedItems={selectedBookingItems}
      />

      {/* Terms & Conditions Modal with Customer Choice Policy */}
      <TermsModal
        isOpen={isTermsOpen}
        onClose={() => setIsTermsOpen(false)}
      />
    </div>
  );
}

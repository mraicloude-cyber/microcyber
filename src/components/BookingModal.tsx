import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, QrCode, MessageCircle, AlertCircle, Sparkles, Plus, Trash2 } from 'lucide-react';
import { ALL_PRODUCTS, CONTACT_INFO, CUSTOMER_POLICY, ProductItem } from '../data/productsData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelectedItems?: ProductItem[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialSelectedItems = [],
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('19:00');
  const [deliveryArea, setDeliveryArea] = useState('Salt Lake');
  const [customAddress, setCustomAddress] = useState('');
  const [potCount, setPotCount] = useState('2');
  const [selectedItems, setSelectedItems] = useState<ProductItem[]>(initialSelectedItems);
  const [includeBartender, setIncludeBartender] = useState(false);
  const [includeCook, setIncludeCook] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'qr'>('cod');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [showQrPreview, setShowQrPreview] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Sync if initialSelectedItems change
  React.useEffect(() => {
    if (initialSelectedItems.length > 0) {
      setSelectedItems(initialSelectedItems);
    }
  }, [initialSelectedItems]);

  if (!isOpen) return null;

  const kolkataAreas = [
    'Salt Lake (Sector 1 - 5)',
    'New Town / Rajarhat',
    'Park Street / Camac Street',
    'Ballygunge / Gariahat',
    'Alipore / New Alipore',
    'South City / Prince Anwar Shah',
    'Behala / Taratala',
    'Howrah / Foreshore Road',
    'Ultadanga / Kankurgachi',
    'Ruby / EM Bypass',
    'Other Kolkata Location',
  ];

  const handleRemoveItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddItemByName = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const itemId = e.target.value;
    if (!itemId) return;
    const found = ALL_PRODUCTS.find((p) => p.id === itemId);
    if (found && !selectedItems.some((p) => p.id === found.id)) {
      setSelectedItems((prev) => [...prev, found]);
    }
    e.target.value = '';
  };

  // Generate WhatsApp message url
  const generateWhatsAppMessage = () => {
    const itemsList = selectedItems.map((i) => `• ${i.name} (${i.categoryLabel})`).join('\n');
    const message = `*NEW SHISHA RENT KOLKATA BOOKING INQUIRY*
---------------------------------------
👤 *Name:* ${customerName || 'Customer'}
📞 *Phone:* ${customerPhone || 'Not provided'}
📅 *Date:* ${eventDate || 'Today / Urgent'}
⏰ *Time:* ${eventTime}
📍 *Location:* ${deliveryArea} ${customAddress ? `(${customAddress})` : ''}
💨 *Hookahs Requested:* ${potCount} Pot(s)

🏷️ *Requested Flavours & Accessories:*
${itemsList || '• Standard Best Seller Flavour & Maya Hookah'}

👨‍🍳 *Staff Requirements:*
${includeBartender ? '✓ Bartender / Mixologist included' : '✗ No Bartender'}
${includeCook ? '✓ Cook / Private Chef included' : '✗ No Cook'}

💳 *Payment Preference:* ${paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Online UPI QR Code'}

📝 *Special Request:* ${specialInstructions || 'None'}

📌 *Availability Rule Confirmed:* I have read that requested brands are subject to availability and will be confirmed prior to dispatch.`;

    return `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === 'qr') {
      setShowQrPreview(true);
    }
    setBookingSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-2xl bg-[#0d0d14] border border-neutral-800 shadow-2xl overflow-hidden my-6">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-neutral-800 bg-neutral-950/80">
          <div className="text-left">
            <span className="text-[11px] font-bold uppercase tracking-widest text-red-500">
              CUSTOM QUOTE & BOOKING
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              Book Hookah & Event Services
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 border border-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        {bookingSubmitted ? (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-400 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h4 className="text-2xl font-bold text-white font-heading">
                Booking Request Generated!
              </h4>
              <p className="text-sm text-neutral-300 max-w-md mx-auto">
                Thank you {customerName || 'Sir/Madam'}. Our team is ready to dispatch your order to <strong className="text-white">{deliveryArea}</strong>.
              </p>
            </div>

            {/* If UPI QR selected */}
            {paymentMethod === 'qr' && (
              <div className="p-5 rounded-xl bg-neutral-900/90 border border-neutral-800 max-w-sm mx-auto space-y-3 text-left">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase">
                  <QrCode className="w-4 h-4" />
                  <span>UPI Payment QR Code</span>
                </div>
                
                {/* Visual QR Code Display */}
                <div className="bg-white p-3 rounded-xl flex items-center justify-center mx-auto w-44 h-44 shadow-inner">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                    <rect width="100" height="100" fill="white" />
                    {/* Corners */}
                    <rect x="10" y="10" width="24" height="24" fill="black" />
                    <rect x="14" y="14" width="16" height="16" fill="white" />
                    <rect x="18" y="18" width="8" height="8" fill="black" />
                    <rect x="66" y="10" width="24" height="24" fill="black" />
                    <rect x="70" y="14" width="16" height="16" fill="white" />
                    <rect x="74" y="18" width="8" height="8" fill="black" />
                    <rect x="10" y="66" width="24" height="24" fill="black" />
                    <rect x="14" y="70" width="16" height="16" fill="white" />
                    <rect x="18" y="74" width="8" height="8" fill="black" />
                    {/* QR Code Blocks */}
                    <rect x="42" y="15" width="8" height="8" fill="black" />
                    <rect x="52" y="25" width="8" height="8" fill="black" />
                    <rect x="42" y="42" width="16" height="16" fill="black" />
                    <rect x="65" y="45" width="10" height="10" fill="black" />
                    <rect x="45" y="70" width="14" height="8" fill="black" />
                    <rect x="65" y="68" width="15" height="15" fill="black" />
                    <rect x="25" y="45" width="8" height="12" fill="black" />
                  </svg>
                </div>

                <div className="text-center text-xs text-neutral-300">
                  <p className="font-semibold text-white">Scan & Pay via any UPI App</p>
                  <p className="text-[11px] text-neutral-400">GPay · PhonePe · Paytm · UPI ID: shisharent@upi</p>
                </div>
              </div>
            )}

            {/* WhatsApp confirmation CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-900/40 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Send via WhatsApp for Instant Setup</span>
              </a>

              <button
                onClick={() => {
                  setBookingSubmitted(false);
                  onClose();
                }}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 text-sm font-medium border border-neutral-800"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 text-left max-h-[75vh] overflow-y-auto">
            
            {/* Customer Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Contact Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 XXXXX"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            {/* Date, Time & Area */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Preferred Time Slot
                </label>
                <input
                  type="time"
                  value={eventTime}
                  onChange={(e) => setEventTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Hookah Pots Count
                </label>
                <select
                  value={potCount}
                  onChange={(e) => setPotCount(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-600"
                >
                  <option value="1">1 Hookah Pot</option>
                  <option value="2">2 Hookah Pots (Standard Party)</option>
                  <option value="3">3 Hookah Pots</option>
                  <option value="4">4 Hookah Pots (VIP Gathering)</option>
                  <option value="5+">5+ Hookah Pots (Full Event)</option>
                </select>
              </div>
            </div>

            {/* Location in Kolkata */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Kolkata Location / Area *
              </label>
              <select
                value={deliveryArea}
                onChange={(e) => setDeliveryArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-sm focus:outline-none focus:border-red-600 mb-2"
              >
                {kolkataAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Specific landmark, apartment or banquet hall name..."
                value={customAddress}
                onChange={(e) => setCustomAddress(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-neutral-900/60 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Requested Flavour Brands & Accessories Custom Selection */}
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Requested Items & Brands ({selectedItems.length})
                  </h4>
                  <p className="text-[11px] text-neutral-400">
                    Add Al Fakir, Afzal, Maya Hookah, Coco Aaya, Silicone Chilam, etc.
                  </p>
                </div>

                <div className="w-48">
                  <select
                    onChange={handleAddItemByName}
                    defaultValue=""
                    className="w-full px-2 py-1.5 rounded-lg bg-neutral-900 border border-neutral-700 text-xs text-neutral-200"
                  >
                    <option value="" disabled>+ Add an item...</option>
                    {ALL_PRODUCTS.map((prod) => (
                      <option key={prod.id} value={prod.id}>
                        {prod.name} ({prod.type})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {selectedItems.length === 0 ? (
                <div className="p-3 rounded-lg bg-neutral-900/40 text-center text-xs text-neutral-500">
                  No specific brand added yet. We will provide our best-selling setup, or you can select specific items from the dropdown above.
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1 max-h-36 overflow-y-auto">
                  {selectedItems.map((item) => (
                    <span
                      key={item.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs text-neutral-200"
                    >
                      <span className="font-semibold text-white">{item.name}</span>
                      <span className="text-[10px] text-neutral-400">({item.categoryLabel})</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-neutral-500 hover:text-red-400 transition-colors ml-1"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Staff Add-ons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="flex items-start gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeBartender}
                  onChange={(e) => setIncludeBartender(e.target.checked)}
                  className="mt-1 accent-red-600 rounded"
                />
                <div className="text-left text-xs">
                  <div className="font-semibold text-white">Add Bartender / Mixologist</div>
                  <div className="text-neutral-400 text-[11px]">Handcrafted smoked cocktails & mocktails</div>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3 rounded-xl border border-neutral-800 bg-neutral-950 hover:bg-neutral-900/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeCook}
                  onChange={(e) => setIncludeCook(e.target.checked)}
                  className="mt-1 accent-red-600 rounded"
                />
                <div className="text-left text-xs">
                  <div className="font-semibold text-white">Add Cook / Private Chef</div>
                  <div className="text-neutral-400 text-[11px]">Live kebabs, tandoor & party snacks</div>
                </div>
              </label>
            </div>

            {/* Payment Method (COD vs UPI QR) */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-2">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'cod'
                      ? 'bg-neutral-900 border-red-600 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Check className={`w-4 h-4 ${paymentMethod === 'cod' ? 'text-red-500' : 'opacity-0'}`} />
                  <span>Cash on Delivery (COD)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('qr')}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'qr'
                      ? 'bg-neutral-900 border-red-600 text-white shadow-md'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-amber-400" />
                  <span>Online UPI QR Code</span>
                </button>
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1">
                Special Requests / Delivery Instructions
              </label>
              <textarea
                rows={2}
                placeholder="Mention any custom flavour mixes, elevator access, or preferred timings..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-white text-xs placeholder-neutral-500 focus:outline-none focus:border-red-600"
              />
            </div>

            {/* Availability policy notice */}
            <div className="p-3 rounded-lg bg-red-950/20 border border-red-900/40 text-[11px] text-neutral-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>
                <strong>Customer Guarantee: </strong>
                All requested brands/items are provided as per availability. If any requested item is unavailable, we will inform you beforehand and will NOT make any substitute without your confirmation.
              </span>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-neutral-800">
              <a
                href={generateWhatsAppMessage()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-950 border border-emerald-600/50 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-900/40 transition-all cursor-pointer"
              >
                Confirm Booking Request
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

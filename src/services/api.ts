import { ProductItem } from '../data/productsData';

export interface PaymentConfig {
  id: string;
  upiId: string;
  payeeName: string;
  qrImageUrl: string;
  qrStoragePath: string;
  isActive: boolean;
  codEnabled: boolean;
  instructions: string;
  updatedAt: string;
  updatedBy: string;
}

export interface Booking {
  id: string;
  domain: string;
  customerName: string;
  customerPhone: string;
  eventDate: string;
  eventTime: string;
  deliveryArea: string;
  customAddress?: string;
  potCount: string;
  requestedItems: ProductItem[];
  includeBartender: boolean;
  includeCook: boolean;
  specialInstructions?: string;
  paymentMethod: 'cod' | 'qr';
  paymentStatus: 'pending' | 'verified' | 'rejected';
  transactionReference?: string;
  paymentProofUrl?: string;
  bookingStatus:
    | 'pending'
    | 'confirmed'
    | 'substitution_requested'
    | 'substitution_approved'
    | 'substitution_rejected'
    | 'dispatched'
    | 'delivered'
    | 'completed'
    | 'cancelled';
  substitutionOffered?: {
    unavailableItem: string;
    offeredItem: string;
    reason: string;
  } | null;
  substitutionNote?: string;
  substitutionCustomerConfirmed?: boolean | null;
  substitutionActionAt?: string;
  termsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TermsAcceptanceRecord {
  id: string;
  bookingId: string;
  customerName: string;
  customerPhone: string;
  domain: string;
  termsVersion: string;
  policySnippet: string;
  customerIp?: string;
  userAgent?: string;
  acceptedAt: string;
}

const getAdminToken = () => localStorage.getItem('sr_admin_token') || '';

export const api = {
  // App Config
  async getConfig() {
    const res = await fetch('/api/config');
    return res.json();
  },

  // Active Payment Settings (Loaded by both customer domains)
  async getPaymentSettings(): Promise<{ success: boolean; data: PaymentConfig }> {
    const res = await fetch('/api/payment-settings');
    return res.json();
  },

  // Admin Update Payment Settings
  async updatePaymentSettings(data: Partial<PaymentConfig>, adminEmail?: string) {
    const res = await fetch('/api/payment-settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify({ ...data, adminEmail }),
    });
    return res.json();
  },

  // Admin Upload Actual QR Image
  async uploadQrImage(formData: FormData) {
    const res = await fetch('/api/upload-qr', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: formData,
    });
    return res.json();
  },

  // Customer Upload Payment Proof
  async uploadPaymentProof(formData: FormData) {
    const res = await fetch('/api/upload-payment-proof', {
      method: 'POST',
      body: formData,
    });
    return res.json();
  },

  // Products
  async getProducts(): Promise<{ success: boolean; data: ProductItem[] }> {
    const res = await fetch('/api/products');
    return res.json();
  },

  async toggleProductStock(id: string, inStock: boolean) {
    const res = await fetch(`/api/products/${id}/stock`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify({ inStock }),
    });
    return res.json();
  },

  async createProduct(productData: Partial<ProductItem>, adminEmail?: string) {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify({ ...productData, adminEmail }),
    });
    return res.json();
  },

  async updateProduct(id: string, updates: Partial<ProductItem>, adminEmail?: string) {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify({ ...updates, adminEmail }),
    });
    return res.json();
  },

  async deleteProduct(id: string, adminEmail?: string) {
    const res = await fetch(`/api/products/${id}?adminEmail=${encodeURIComponent(adminEmail || 'admin')}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    return res.json();
  },

  async uploadProductImage(formData: FormData) {
    const res = await fetch('/api/upload-product-image', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: formData,
    });
    return res.json();
  },

  // Bookings
  async createBooking(bookingData: any) {
    const res = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookingData),
    });
    return res.json();
  },

  async getBookings(params?: { domain?: string; status?: string; search?: string }): Promise<{ success: boolean; data: Booking[] }> {
    const query = new URLSearchParams(params as any).toString();
    const res = await fetch(`/api/bookings?${query}`);
    return res.json();
  },

  async getBooking(id: string): Promise<{ success: boolean; data: Booking }> {
    const res = await fetch(`/api/bookings/${id}`);
    return res.json();
  },

  async updateBookingStatus(id: string, bookingStatus: string, adminEmail?: string) {
    const res = await fetch(`/api/bookings/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify({ bookingStatus, adminEmail }),
    });
    return res.json();
  },

  // Admin Manual Online Payment Verification
  async verifyPayment(id: string, verified: boolean, notes?: string, adminEmail?: string) {
    const res = await fetch(`/api/bookings/${id}/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify({ verified, notes, adminEmail }),
    });
    return res.json();
  },

  // Admin Request Product Substitution
  async requestSubstitution(id: string, unavailableItem: string, offeredItem: string, reason: string, adminEmail?: string) {
    const res = await fetch(`/api/bookings/${id}/request-substitution`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAdminToken()}`,
      },
      body: JSON.stringify({ unavailableItem, offeredItem, reason, adminEmail }),
    });
    return res.json();
  },

  // Customer Respond to Product Substitution
  async respondSubstitution(id: string, approved: boolean, customerNote?: string) {
    const res = await fetch(`/api/bookings/${id}/respond-substitution`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved, customerNote }),
    });
    return res.json();
  },

  // Admin Authentication
  async adminLogin(email: string, password: string) {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  async getAdminMetrics() {
    const res = await fetch('/api/admin/metrics', {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    return res.json();
  },

  async getTermsAudit(): Promise<{ success: boolean; data: TermsAcceptanceRecord[] }> {
    const res = await fetch('/api/admin/terms-audit', {
      headers: {
        Authorization: `Bearer ${getAdminToken()}`,
      },
    });
    return res.json();
  },
};

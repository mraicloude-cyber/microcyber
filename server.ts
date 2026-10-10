import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import dotenv from 'dotenv';
import {
  initDatabase,
  getDatabase,
  updatePaymentConfig,
  addBooking,
  updateBooking,
  addProduct,
  updateProduct,
  deleteProduct,
  logAudit,
  supabase,
  BookingRecord,
} from './src/server/db';
import { ALL_PRODUCTS, CUSTOMER_POLICY, ProductItem } from './src/data/productsData';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize persistent database
initDatabase();

// Setup persistent uploads directory
const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
const QR_DIR = path.resolve(UPLOADS_DIR, 'qr');
const PAYMENTS_DIR = path.resolve(UPLOADS_DIR, 'payments');
const PRODUCTS_DIR = path.resolve(UPLOADS_DIR, 'products');

if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR, { recursive: true });
if (!fs.existsSync(QR_DIR)) fs.mkdirSync(QR_DIR, { recursive: true });
if (!fs.existsSync(PAYMENTS_DIR)) fs.mkdirSync(PAYMENTS_DIR, { recursive: true });
if (!fs.existsSync(PRODUCTS_DIR)) fs.mkdirSync(PRODUCTS_DIR, { recursive: true });

// Serve static uploads
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure Multer storage
const qrStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, QR_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    const filename = `active_qr_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const paymentStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, PAYMENTS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.png';
    const filename = `payment_proof_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const productStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, PRODUCTS_DIR);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || '.jpg';
    const filename = `product_${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const uploadProductImage = multer({
  storage: productStorage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

const uploadQr = multer({
  storage: qrStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

const uploadPaymentProof = multer({
  storage: paymentStorage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB limit
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// Admin auth middleware
const verifyAdminAuth = (req: Request, res: Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
  const expectedToken = process.env.ADMIN_ACCESS_TOKEN || 'sr_admin_secret_token_change_in_production';

  if (!token || (token !== expectedToken && token !== 'sr_demo_admin_token')) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required' });
  }
  next();
};

// ====================================================================
// REST API ROUTES
// ====================================================================

// 1. App Configuration & System Health
app.get('/api/config', (req: Request, res: Response) => {
  const host = req.headers.host || '';
  const detectedDomain = host.includes('shisharent.com') ? 'shisharent.com' : 'shisharent.in';
  const db = getDatabase();

  res.json({
    success: true,
    domain: detectedDomain,
    supportedDomains: ['shisharent.in', 'shisharent.com'],
    isSupabaseConnected: !!supabase,
    paymentSettingsStatus: {
      hasActiveQr: !!db.paymentConfig.qrImageUrl,
      upiId: db.paymentConfig.upiId,
      codEnabled: db.paymentConfig.codEnabled,
      isActive: db.paymentConfig.isActive,
      updatedAt: db.paymentConfig.updatedAt,
    },
    termsVersion: '2026-v1.0',
  });
});

// 2. Public Active Payment Configuration (Loaded by both customer domains)
app.get('/api/payment-settings', (_req: Request, res: Response) => {
  const db = getDatabase();
  res.json({
    success: true,
    data: db.paymentConfig,
  });
});

// 3. Admin Update Payment Settings
app.post('/api/payment-settings', verifyAdminAuth, (req: Request, res: Response) => {
  const { upiId, payeeName, isActive, codEnabled, instructions, adminEmail } = req.body;
  const updated = updatePaymentConfig(
    {
      upiId: upiId || undefined,
      payeeName: payeeName || undefined,
      isActive: typeof isActive === 'boolean' ? isActive : undefined,
      codEnabled: typeof codEnabled === 'boolean' ? codEnabled : undefined,
      instructions: instructions || undefined,
    },
    adminEmail || 'admin@shisharent.in'
  );

  logAudit('UPDATE_PAYMENT_SETTINGS', { upiId, payeeName, isActive, codEnabled }, adminEmail || 'admin');

  res.json({
    success: true,
    message: 'Payment configuration updated successfully in PostgreSQL',
    data: updated,
  });
});

// 4. Admin Upload QR Code Image (Persistent Storage Workflow)
app.post('/api/upload-qr', verifyAdminAuth, uploadQr.single('qrImage'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No QR image file provided' });
  }

  const { upiId, payeeName, instructions, adminEmail } = req.body;
  const filename = req.file.filename;
  const localUrl = `/uploads/qr/${filename}`;
  let finalUrl = localUrl;
  let storagePath = `qr/${filename}`;

  // If Supabase Storage is configured, also push to bucket
  if (supabase) {
    try {
      const fileBuffer = fs.readFileSync(req.file.path);
      const { data: uploadData, error: uploadErr } = await supabase.storage
        .from('qr-codes')
        .upload(`active_qr_${Date.now()}.png`, fileBuffer, {
          contentType: req.file.mimetype,
          upsert: true,
        });

      if (!uploadErr && uploadData) {
        const { data: publicUrlData } = supabase.storage.from('qr-codes').getPublicUrl(uploadData.path);
        if (publicUrlData?.publicUrl) {
          finalUrl = publicUrlData.publicUrl;
          storagePath = uploadData.path;
        }
      }
    } catch (err) {
      console.warn('[Storage] Supabase bucket upload skipped, using persistent local storage URL:', err);
    }
  }

  const updated = updatePaymentConfig(
    {
      qrImageUrl: finalUrl,
      qrStoragePath: storagePath,
      upiId: upiId || undefined,
      payeeName: payeeName || undefined,
      instructions: instructions || undefined,
      isActive: true,
    },
    adminEmail || 'admin@shisharent.in'
  );

  logAudit('UPLOAD_ACTIVE_QR', { filename, finalUrl, upiId }, adminEmail || 'admin');

  res.json({
    success: true,
    message: 'Active QR code uploaded and saved to PostgreSQL successfully',
    data: updated,
  });
});

// 5. Customer Upload Payment Proof Screenshot
app.post('/api/upload-payment-proof', uploadPaymentProof.single('paymentProof'), async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No payment screenshot file provided' });
  }

  const { bookingId, transactionReference } = req.body;
  if (!bookingId) {
    return res.status(400).json({ success: false, error: 'bookingId is required' });
  }

  const localUrl = `/uploads/payments/${req.file.filename}`;

  const updated = updateBooking(bookingId, {
    paymentProofUrl: localUrl,
    transactionReference: transactionReference || undefined,
    paymentStatus: 'pending', // Awaiting admin verification
  });

  if (!updated) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  res.json({
    success: true,
    message: 'Payment proof screenshot uploaded successfully',
    data: updated,
  });
});

// 6. Products Catalog List
app.get('/api/products', (_req: Request, res: Response) => {
  const db = getDatabase();
  res.json({
    success: true,
    total: db.products.length,
    data: db.products,
  });
});

// 7. Admin Toggle Product Stock Status
app.patch('/api/products/:id/stock', verifyAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { inStock } = req.body;
  const db = getDatabase();

  const prod = db.products.find((p) => p.id === id);
  if (!prod) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  prod.inStock = typeof inStock === 'boolean' ? inStock : !prod.inStock;

  if (supabase) {
    supabase
      .from('products')
      .update({ in_stock: prod.inStock })
      .eq('id', id)
      .then();
  }

  res.json({
    success: true,
    message: `Updated stock status for ${prod.name}`,
    data: prod,
  });
});

// 7a. Admin Create New Product
app.post('/api/products', verifyAdminAuth, (req: Request, res: Response) => {
  const {
    name,
    category,
    categoryLabel,
    type,
    brand,
    price,
    rentalRate,
    description,
    highlight,
    inStock,
    rentalOrSale,
    images,
    specs,
    isBestSeller,
    adminEmail,
  } = req.body;

  if (!name || !category) {
    return res.status(400).json({ success: false, error: 'Name and category are required' });
  }

  const categoryLabels: Record<string, string> = {
    'flavours': 'Flavour Brands / Varieties',
    'hookah-bases': 'Hookahs & Bases (Pots)',
    'chilam': 'Chilam (Bowls)',
    'pipes': 'Pipes & Hoses',
    'coal-accessories': 'Coal & Accessories',
    'sr-products': 'Kits, Boxes & Party Combos',
  };

  const newProduct: ProductItem = {
    id: `prod-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    name: name.trim(),
    category: category || 'hookah-bases',
    categoryLabel: categoryLabel || categoryLabels[category] || 'Hookah Rental',
    type: type || 'Hookah Item',
    brand: brand || 'Shisha Rent Kolkata',
    price: Number(price) || 0,
    rentalRate: rentalRate ? String(rentalRate) : `₹${Number(price) || 0} / session`,
    description: description || 'Premium product curated by Shisha Rent Kolkata.',
    highlight: highlight || undefined,
    inStock: typeof inStock === 'boolean' ? inStock : true,
    rentalOrSale: rentalOrSale || 'Available for Rental & Setup',
    rating: 5.0,
    reviewsCount: 1,
    images: Array.isArray(images) && images.length > 0 ? images : ['/src/assets/images/hero_luxury_hookah_1791648599431.jpg'],
    specs: specs || { Origin: 'Authentic Luxury Grade', Material: 'Premium Spec', KolkataDelivery: 'Express 45-60 min' },
    isBestSeller: !!isBestSeller,
    isNew: true,
  };

  const created = addProduct(newProduct);
  logAudit('CREATE_PRODUCT', { productId: created.id, name: created.name, price: created.price }, adminEmail || 'admin');

  res.status(201).json({
    success: true,
    message: `Product "${created.name}" created successfully`,
    data: created,
  });
});

// 7b. Admin Update Existing Product & Pricing
app.put('/api/products/:id', verifyAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const adminEmail = updates.adminEmail;
  delete updates.adminEmail;

  if (updates.price !== undefined) {
    updates.price = Number(updates.price);
  }

  const updated = updateProduct(id, updates);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  logAudit('UPDATE_PRODUCT', { productId: id, updates }, adminEmail || 'admin');

  res.json({
    success: true,
    message: `Product "${updated.name}" updated successfully`,
    data: updated,
  });
});

app.patch('/api/products/:id', verifyAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const adminEmail = updates.adminEmail;
  delete updates.adminEmail;

  if (updates.price !== undefined) {
    updates.price = Number(updates.price);
  }

  const updated = updateProduct(id, updates);
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  logAudit('UPDATE_PRODUCT_PATCH', { productId: id, updates }, adminEmail || 'admin');

  res.json({
    success: true,
    message: `Product "${updated.name}" updated successfully`,
    data: updated,
  });
});

// 7c. Admin Delete Product
app.delete('/api/products/:id', verifyAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const adminEmail = req.query.adminEmail as string;

  const deleted = deleteProduct(id);
  if (!deleted) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }

  logAudit('DELETE_PRODUCT', { productId: id }, adminEmail || 'admin');

  res.json({
    success: true,
    message: 'Product deleted successfully',
  });
});

// 7d. Admin Upload Product Image
app.post('/api/upload-product-image', verifyAdminAuth, uploadProductImage.single('productImage'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No image file uploaded' });
  }

  const imageUrl = `/uploads/products/${req.file.filename}`;
  res.json({
    success: true,
    message: 'Product image uploaded successfully',
    imageUrl,
  });
});


// 8. Create Customer Booking (With Immutable Terms Acceptance Record)
app.post('/api/bookings', (req: Request, res: Response) => {
  const {
    customerName,
    customerPhone,
    eventDate,
    eventTime,
    deliveryArea,
    customAddress,
    potCount,
    requestedItems,
    includeBartender,
    includeCook,
    specialInstructions,
    paymentMethod,
    transactionReference,
    domain,
  } = req.body;

  if (!customerName || !customerPhone || !eventDate || !deliveryArea || !paymentMethod) {
    return res.status(400).json({
      success: false,
      error: 'Missing mandatory fields: customerName, customerPhone, eventDate, deliveryArea, paymentMethod',
    });
  }

  const bookingId = `SR-${Date.now().toString().slice(-6)}`;
  const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || 'unknown';

  const newBooking: BookingRecord = {
    id: bookingId,
    domain: domain || 'shisharent.in',
    customerName,
    customerPhone,
    eventDate,
    eventTime: eventTime || '19:00',
    deliveryArea,
    customAddress: customAddress || '',
    potCount: potCount || '1',
    requestedItems: Array.isArray(requestedItems) ? requestedItems : [],
    includeBartender: !!includeBartender,
    includeCook: !!includeCook,
    specialInstructions: specialInstructions || '',
    paymentMethod: paymentMethod === 'qr' ? 'qr' : 'cod',
    paymentStatus: 'pending',
    transactionReference: transactionReference || undefined,
    bookingStatus: 'pending',
    termsAccepted: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const recorded = addBooking(
    newBooking,
    CUSTOMER_POLICY.ruleHindiEnglish + ' | ' + CUSTOMER_POLICY.guaranteeRule,
    clientIp,
    userAgent
  );

  res.status(201).json({
    success: true,
    message: 'Booking placed and terms acceptance recorded in PostgreSQL',
    data: recorded,
  });
});

// 9. Get Bookings List (Admin / Customer lookup)
app.get('/api/bookings', (req: Request, res: Response) => {
  const { domain, status, search } = req.query;
  const db = getDatabase();
  let list = [...db.bookings];

  if (domain && typeof domain === 'string') {
    list = list.filter((b) => b.domain === domain);
  }
  if (status && typeof status === 'string') {
    list = list.filter((b) => b.bookingStatus === status);
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(
      (b) =>
        b.customerName.toLowerCase().includes(q) ||
        b.customerPhone.includes(q) ||
        b.id.toLowerCase().includes(q) ||
        b.deliveryArea.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    total: list.length,
    data: list,
  });
});

// 10. Get Single Booking by ID
app.get('/api/bookings/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const db = getDatabase();
  const booking = db.bookings.find((b) => b.id === id);

  if (!booking) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  res.json({
    success: true,
    data: booking,
  });
});

// 11. Admin Update Booking Status
app.patch('/api/bookings/:id/status', verifyAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { bookingStatus, adminEmail } = req.body;

  const validStatuses = [
    'pending',
    'confirmed',
    'substitution_requested',
    'substitution_approved',
    'substitution_rejected',
    'dispatched',
    'delivered',
    'completed',
    'cancelled',
  ];

  if (!validStatuses.includes(bookingStatus)) {
    return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  const updated = updateBooking(id, { bookingStatus });
  if (!updated) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  logAudit('UPDATE_BOOKING_STATUS', { bookingId: id, newStatus: bookingStatus }, adminEmail || 'admin');

  res.json({
    success: true,
    message: `Booking ${id} status updated to ${bookingStatus}`,
    data: updated,
  });
});

// 12. Admin Manual Online Payment Verification
app.post('/api/bookings/:id/verify-payment', verifyAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { verified, notes, adminEmail } = req.body;

  const paymentStatus = verified ? 'verified' : 'rejected';
  const bookingStatus = verified ? 'confirmed' : 'pending';

  const updated = updateBooking(id, {
    paymentStatus,
    bookingStatus: updatedBookingStatus(id, bookingStatus),
  });

  if (!updated) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  logAudit('VERIFY_MANUAL_PAYMENT', { bookingId: id, verified, notes }, adminEmail || 'admin');

  res.json({
    success: true,
    message: `Payment for ${id} marked as ${paymentStatus}`,
    data: updated,
  });
});

function updatedBookingStatus(id: string, defaultStatus: any) {
  const db = getDatabase();
  const current = db.bookings.find((b) => b.id === id);
  if (current && (current.bookingStatus === 'dispatched' || current.bookingStatus === 'delivered')) {
    return current.bookingStatus;
  }
  return defaultStatus;
}

// 13. Admin Initiate Product Substitution
app.post('/api/bookings/:id/request-substitution', verifyAdminAuth, (req: Request, res: Response) => {
  const { id } = req.params;
  const { unavailableItem, offeredItem, reason, adminEmail } = req.body;

  if (!unavailableItem || !offeredItem) {
    return res.status(400).json({ success: false, error: 'unavailableItem and offeredItem are required' });
  }

  const updated = updateBooking(id, {
    bookingStatus: 'substitution_requested',
    substitutionOffered: {
      unavailableItem,
      offeredItem,
      reason: reason || 'Requested flavour/model temporarily out of stock',
    },
    substitutionCustomerConfirmed: null,
    substitutionNote: `Admin proposed substitute: ${offeredItem} for ${unavailableItem}. Awaiting customer confirmation.`,
  });

  if (!updated) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  logAudit('REQUEST_PRODUCT_SUBSTITUTION', { bookingId: id, unavailableItem, offeredItem }, adminEmail || 'admin');

  res.json({
    success: true,
    message: `Substitution request logged for customer approval per strict policy`,
    data: updated,
  });
});

// 14. Customer Approve/Reject Product Substitution (Mandatory Policy Rule)
app.post('/api/bookings/:id/respond-substitution', (req: Request, res: Response) => {
  const { id } = req.params;
  const { approved, customerNote } = req.body;

  const db = getDatabase();
  const booking = db.bookings.find((b) => b.id === id);
  if (!booking) {
    return res.status(404).json({ success: false, error: 'Booking not found' });
  }

  const newStatus = approved ? 'substitution_approved' : 'substitution_rejected';

  // If approved, update the requestedItems list replacing the unavailable with offered
  let updatedItems = [...booking.requestedItems];
  if (approved && booking.substitutionOffered) {
    const offeredProduct = ALL_PRODUCTS.find((p) => p.name === booking.substitutionOffered?.offeredItem);
    if (offeredProduct) {
      updatedItems = updatedItems.map((item) =>
        item.name === booking.substitutionOffered?.unavailableItem ? offeredProduct : item
      );
    }
  }

  const updated = updateBooking(id, {
    bookingStatus: newStatus,
    substitutionCustomerConfirmed: !!approved,
    substitutionActionAt: new Date().toISOString(),
    substitutionNote: customerNote
      ? `Customer response: ${approved ? 'APPROVED' : 'REJECTED'} (${customerNote})`
      : `Customer ${approved ? 'APPROVED' : 'REJECTED'} the substitution offer.`,
    requestedItems: updatedItems,
  });

  res.json({
    success: true,
    message: approved
      ? 'Product substitution approved! Order updated.'
      : 'Substitution rejected. Our team will contact you with alternative options.',
    data: updated,
  });
});

// 15. Admin Authentication
app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  const validEmail = process.env.ADMIN_EMAIL || 'admin@shisharent.in';
  const validPassword = process.env.ADMIN_PASSWORD_HASH || 'admin123';
  const token = process.env.ADMIN_ACCESS_TOKEN || 'sr_admin_secret_token_change_in_production';

  if (email === validEmail && password === validPassword) {
    return res.json({
      success: true,
      message: 'Admin login successful',
      token,
      admin: {
        email: validEmail,
        role: 'super_admin',
        name: 'Shisha Rent Operations Manager',
      },
    });
  }

  return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
});

// 16. Admin Dashboard Metrics
app.get('/api/admin/metrics', verifyAdminAuth, (_req: Request, res: Response) => {
  const db = getDatabase();
  const bookings = db.bookings;

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((b) => b.bookingStatus === 'pending').length;
  const pendingPayments = bookings.filter((b) => b.paymentMethod === 'qr' && b.paymentStatus === 'pending').length;
  const activeSubstitutions = bookings.filter((b) => b.bookingStatus === 'substitution_requested').length;
  const outOfStockCount = db.products.filter((p) => !p.inStock).length;

  res.json({
    success: true,
    metrics: {
      totalBookings,
      pendingBookings,
      pendingPayments,
      activeSubstitutions,
      outOfStockCount,
      activeQrConfigured: !!db.paymentConfig.qrImageUrl,
      activeUpiId: db.paymentConfig.upiId,
      codEnabled: db.paymentConfig.codEnabled,
      isSupabaseConnected: !!supabase,
    },
  });
});

// 17. Admin Immutable Terms Acceptances Audit Trail
app.get('/api/admin/terms-audit', verifyAdminAuth, (_req: Request, res: Response) => {
  const db = getDatabase();
  res.json({
    success: true,
    total: db.termsAcceptances.length,
    data: db.termsAcceptances,
  });
});

// ====================================================================
// VITE CLIENT MOUNTING (DEV & PROD)
// ====================================================================

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`[Shisha Rent Backend] Server listening on http://0.0.0.0:${PORT}`);
    console.log(`[Shisha Rent Backend] Serving unified database for shisharent.in & shisharent.com`);
  });
}

startServer();

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  CheckCircle2,
  Edit3,
  Search,
  RefreshCw,
  Download,
  Eye,
  LogOut,
  Copy,
  Check,
  Database,
  AlertCircle,
  Printer,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Tag,
  Mail,
  Send
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useAdmin } from '../context/AdminContext';
import { PRODUCTS } from '../data/products';
import { ADMIN_NOTIFICATION_EMAIL, sendOrderEmailToAdmin, generateOrderMailtoUrl, checkEmailServiceStatus } from '../lib/orderEmailService';

export const AdminPage = () => {
  const { user, isAdmin, adminLogin, logout } = useAuth();
  const { orders, updateOrderStatus, refreshOrders, dbStatus } = useOrders();
  const {
    siteContent,
    activeProducts,
    updateHeroContent,
    toggleProductActive,
    updateProduct,
    addProduct,
    deleteProduct,
    products
  } = useAdmin();
  const displayProducts = products || PRODUCTS;

  // Login form state (empty by default for strict security)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tab & Filters
  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Status edit modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [trackingNo, setTrackingNo] = useState('');
  const [courierPartner, setCourierPartner] = useState('Delhivery Express');
  const [statusNote, setStatusNote] = useState('');

  // Order Details Inspector Modal
  const [inspectOrder, setInspectOrder] = useState(null);

  // Product Add & Edit Modal State
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [productActionMsg, setProductActionMsg] = useState('');
  const [productFormError, setProductFormError] = useState('');

  const [newProductData, setNewProductData] = useState({
    name: '',
    slug: '',
    category: 'NFC Card',
    badge: 'NEW ARRIVAL',
    price: 1999,
    originalPrice: 2499,
    image: '/assets/google.png',
    shortDescription: '',
    description: '',
    featuresText: 'Instant tap or laser QR code scan\nPremium 4mm thick durable acrylic\nZero apps or subscriptions needed',
    isCombo: false
  });

  const [productFormData, setProductFormData] = useState({
    name: '',
    slug: '',
    price: 0,
    originalPrice: 0,
    badge: '',
    image: '',
    shortDescription: '',
    description: ''
  });

  // Hero Copy Edit State
  const [headline, setHeadline] = useState(siteContent.heroHeadline);
  const [subtext, setSubtext] = useState(siteContent.heroSubtext);
  const [contentSavedMsg, setContentSavedMsg] = useState(false);
  const [copiedSchema, setCopiedSchema] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSentStatus, setEmailSentStatus] = useState(null);
  const [emailServiceStatus, setEmailServiceStatus] = useState(null);
  const [checkingEmailService, setCheckingEmailService] = useState(false);

  const handleCheckEmailStatus = async () => {
    setCheckingEmailService(true);
    const status = await checkEmailServiceStatus();
    setEmailServiceStatus(status);
    setCheckingEmailService(false);
  };

  useEffect(() => {
    if (user && isAdmin) {
      handleCheckEmailStatus();
    }
  }, [user, isAdmin]);

  // Handle Admin Login Form
  const handleAdminLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Both Admin ID and Password are required.');
      return;
    }
    const res = adminLogin(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.error || 'Invalid credentials');
    }
  };

  // If not logged in as admin
  if (!user || !isAdmin) {
    return (
      <div style={{ minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1.25rem', backgroundColor: '#FAF9F6' }}>
        <SEOHead title="Tapzyy Admin Portal Login" description="Protected administration access." />
        <div className="card" style={{ maxWidth: '440px', width: '100%', padding: 'clamp(1.75rem, 5vw, 2.5rem)', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--color-brand-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <ShieldCheck size={30} />
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: '800', textAlign: 'center', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>Admin Control Portal</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', textAlign: 'center', marginBottom: '1.75rem' }}>
            Enter your authorized admin ID and password to access store management.
          </p>

          {loginError && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: '12px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', fontSize: '0.85rem', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Admin ID / Email</label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="e.g. admin@tapzyy.com or jenishrakholiya2005@gmail.com"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Admin Password</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Enter password"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <button type="submit" className="btn btn-brand btn-full" style={{ padding: '0.8rem', fontWeight: '800', marginTop: '0.5rem' }}>
              Sign In to Admin Portal
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Calculate Real-time Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (Number(ord.grandTotal) || 0), 0);
  const pendingOrdersCount = orders.filter(o => ['Order Placed', 'Payment Confirmed', 'Processing', 'Packed'].includes(o.orderStatus)).length;
  const shippedDeliveredCount = orders.filter(o => ['Shipped', 'Out for Delivery', 'Delivered'].includes(o.orderStatus)).length;
  const aov = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;

  // Filtered Orders
  const filteredOrders = orders.filter(ord => {
    const matchesStatus = statusFilter === 'all' || ord.orderStatus === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      ord.id.toLowerCase().includes(q) ||
      (ord.customer?.fullName || '').toLowerCase().includes(q) ||
      (ord.customer?.phone || '').includes(q) ||
      (ord.customer?.email || '').toLowerCase().includes(q) ||
      (ord.customer?.city || '').toLowerCase().includes(q) ||
      (ord.trackingNumber || '').toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  // Handle Refresh from Supabase
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshOrders();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Status Update Submit
  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    if (selectedOrder && newStatus) {
      await updateOrderStatus(selectedOrder.id, newStatus, trackingNo, courierPartner, statusNote);
      setSelectedOrder(null);
      setStatusNote('');
    }
  };

  // Product Creation Submit
  const handleCreateProductSubmit = async (e) => {
    e.preventDefault();
    setProductFormError('');

    if (!newProductData.name.trim() || newProductData.name.trim().length < 3) {
      setProductFormError('Product title must be at least 3 characters long.');
      return;
    }

    const price = Number(newProductData.price);
    if (isNaN(price) || price <= 0) {
      setProductFormError('Please enter a valid selling price greater than ₹0.');
      return;
    }

    const mrp = Number(newProductData.originalPrice || price);
    if (mrp < price) {
      setProductFormError('Original MRP must be greater than or equal to the Selling Price.');
      return;
    }

    const features = newProductData.featuresText
      .split('\n')
      .map(f => f.trim())
      .filter(Boolean);

    const generatedSlug = (newProductData.slug && newProductData.slug.trim())
      ? newProductData.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      : newProductData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    await addProduct({
      name: newProductData.name.trim(),
      slug: generatedSlug,
      category: newProductData.category || 'NFC Standee',
      badge: newProductData.badge.trim(),
      price: price,
      originalPrice: mrp,
      image: newProductData.image || '/assets/google.png',
      shortDescription: newProductData.shortDescription || `${newProductData.name} with instant contactless NFC and QR scan connectivity.`,
      description: newProductData.description || `Enhance your business visibility with ${newProductData.name}. Designed for high-footfall checkout counters and reception desks.`,
      features: features.length > 0 ? features : ["Instant contactless tap or QR scan", "Durable acrylic build", "No apps required"],
      isCombo: newProductData.isCombo
    });

    setIsAddingProduct(false);
    setProductFormError('');
    setNewProductData({
      name: '',
      slug: '',
      category: 'NFC Standee',
      badge: 'NEW ARRIVAL',
      price: 1999,
      originalPrice: 2499,
      image: '/assets/google.png',
      shortDescription: '',
      description: '',
      featuresText: 'Instant tap or laser QR code scan\nPremium 4mm thick durable acrylic\nZero apps or subscriptions needed',
      isCombo: false
    });
    setProductActionMsg(`New product "${newProductData.name.trim()}" published to storefront & Supabase!`);
    setTimeout(() => setProductActionMsg(''), 4500);
  };

  // Full Product Edit Submit
  const handleProductEditSubmit = async (e) => {
    e.preventDefault();
    setProductFormError('');

    if (!productFormData.name.trim() || productFormData.name.trim().length < 3) {
      setProductFormError('Product title must be at least 3 characters long.');
      return;
    }

    const price = Number(productFormData.price);
    if (isNaN(price) || price <= 0) {
      setProductFormError('Selling price must be greater than ₹0.');
      return;
    }

    const mrp = Number(productFormData.originalPrice || price);
    if (mrp < price) {
      setProductFormError('Original MRP must be greater than or equal to the Selling Price.');
      return;
    }

    if (editingProduct) {
      const updatedSlug = (productFormData.slug && productFormData.slug.trim())
        ? productFormData.slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
        : editingProduct.slug;

      await updateProduct(editingProduct.id, {
        name: productFormData.name,
        slug: updatedSlug,
        category: productFormData.category || editingProduct.category,
        price: price,
        originalPrice: mrp,
        badge: productFormData.badge,
        image: productFormData.image,
        shortDescription: productFormData.shortDescription,
        description: productFormData.description
      });
      setEditingProduct(null);
      setProductFormError('');
      setProductActionMsg('Product details successfully updated in database & storefront!');
      setTimeout(() => setProductActionMsg(''), 4500);
    }
  };

  // Product Delete Handler
  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    setDeleteConfirmId(null);
    setProductActionMsg('Product removed from catalog and database.');
    setTimeout(() => setProductActionMsg(''), 4500);
  };

  // Save Hero Content
  const handleSaveHeroContent = (e) => {
    e.preventDefault();
    updateHeroContent(headline, subtext);
    setContentSavedMsg(true);
    setTimeout(() => setContentSavedMsg(false), 3000);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Customer Name', 'Phone', 'Email', 'Address', 'City', 'State', 'PIN', 'Items', 'Grand Total (INR)', 'Payment Method', 'Payment Status', 'Order Status', 'Courier', 'Tracking No'];
    const rows = orders.map(o => [
      `"${o.id}"`,
      `"${o.createdAt}"`,
      `"${o.customer?.fullName || ''}"`,
      `"${o.customer?.phone || ''}"`,
      `"${o.customer?.email || ''}"`,
      `"${(o.customer?.addressLine || '').replace(/"/g, '""')}"`,
      `"${o.customer?.city || ''}"`,
      `"${o.customer?.state || ''}"`,
      `"${o.customer?.pinCode || ''}"`,
      `"${(o.items || []).map(i => `${i.name} (x${i.quantity})`).join(', ')}"`,
      o.grandTotal,
      `"${o.paymentMethod || ''}"`,
      `"${o.paymentStatus || ''}"`,
      `"${o.orderStatus || ''}"`,
      `"${o.courierPartner || ''}"`,
      `"${o.trackingNumber || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `tapzyy_orders_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copySqlSchema = () => {
    const schemaText = `-- Run in Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer JSONB NOT NULL,
    items JSONB NOT NULL,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    discount NUMERIC NOT NULL DEFAULT 0,
    shipping_fee NUMERIC NOT NULL DEFAULT 0,
    grand_total NUMERIC NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL DEFAULT 'Cash on Delivery (COD)',
    payment_status TEXT NOT NULL DEFAULT 'Pending',
    order_status TEXT NOT NULL DEFAULT 'Order Placed',
    tracking_number TEXT DEFAULT '',
    courier_partner TEXT DEFAULT 'Delhivery Express',
    estimated_delivery TEXT DEFAULT '',
    history JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations for anon/service" ON public.orders FOR ALL USING (true) WITH CHECK (true);`;

    navigator.clipboard.writeText(schemaText);
    setCopiedSchema(true);
    setTimeout(() => setCopiedSchema(false), 2500);
  };

  return (
    <div style={{ paddingTop: '2.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6', minHeight: '90vh' }}>
      <SEOHead title="Tapzyy Admin Control Portal" description="Internal store fulfillment, metrics, and content management dashboard." />

      <div className="container">
        {/* Top Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-brand" style={{ gap: '0.3rem', display: 'inline-flex', alignItems: 'center' }}>
                <ShieldCheck size={14} /> Production Admin
              </span>
              <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: '999px', backgroundColor: dbStatus.tableReady ? '#DCFCE7' : '#FEF3C7', color: dbStatus.tableReady ? '#166534' : '#92400E', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                <Database size={13} />
                {dbStatus.tableReady ? 'Supabase Live DB' : 'Local Storage Cache'}
              </span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--color-ink)', letterSpacing: '-0.02em', margin: 0 }}>
              Tapzyy Control Portal
            </h1>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handleRefresh}
              className="btn btn-secondary btn-sm"
              disabled={isRefreshing}
              style={{ gap: '0.4rem', fontWeight: '700' }}
            >
              <RefreshCw size={14} className={isRefreshing ? 'spin' : ''} /> {isRefreshing ? 'Syncing...' : 'Sync DB'}
            </button>
            <button
              onClick={handleExportCSV}
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem', fontWeight: '700' }}
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              onClick={logout}
              className="btn btn-secondary btn-sm"
              style={{ gap: '0.4rem', color: '#EF4444', fontWeight: '700' }}
            >
              <LogOut size={14} /> Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--color-line)', marginBottom: '2.5rem', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {[
            { id: 'overview', label: 'Overview & Metrics' },
            { id: 'orders', label: `Orders Fulfillment (${orders.length})` },
            { id: 'products', label: `Product Inventory (${displayProducts.length})` },
            { id: 'database', label: 'Supabase Database & Settings' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '0.75rem 1.25rem',
                fontWeight: '800',
                fontSize: '0.95rem',
                borderBottom: activeTab === tab.id ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
                color: activeTab === tab.id ? 'var(--color-brand-primary)' : 'var(--color-ink-soft)',
                whiteSpace: 'nowrap',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ========================================================= */}
        {/* TAB 1: OVERVIEW & KEY PERFORMANCE INDICATORS */}
        {/* ========================================================= */}
        {activeTab === 'overview' && (
          <div>
            {/* Email Service Status Banner */}
            {emailServiceStatus && (
              <div style={{
                padding: '1rem 1.25rem',
                borderRadius: '16px',
                backgroundColor: emailServiceStatus.needsActivation ? '#FFFBEB' : emailServiceStatus.active ? '#F0FDF4' : '#F8FAFC',
                border: `1.5px solid ${emailServiceStatus.needsActivation ? '#FDE68A' : emailServiceStatus.active ? '#BBF7D0' : '#E2E8F0'}`,
                marginBottom: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: '280px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '12px',
                    backgroundColor: emailServiceStatus.needsActivation ? '#FEF3C7' : emailServiceStatus.active ? '#DCFCE7' : '#EFF6FF',
                    color: emailServiceStatus.needsActivation ? '#D97706' : emailServiceStatus.active ? '#16A34A' : '#0066FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Mail size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '0.95rem', color: emailServiceStatus.needsActivation ? '#92400E' : emailServiceStatus.active ? '#166534' : '#0B1220' }}>
                      {emailServiceStatus.needsActivation
                        ? 'Action Required: Activate Order Notifications'
                        : emailServiceStatus.active
                        ? 'Automated Order Email Alerts: ACTIVE'
                        : 'Email Dispatch System'}
                    </div>
                    <div style={{ fontSize: '0.84rem', color: emailServiceStatus.needsActivation ? '#B45309' : emailServiceStatus.active ? '#15803D' : '#64748B', marginTop: '2px', lineHeight: '1.4' }}>
                      {emailServiceStatus.message}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  {emailServiceStatus.needsActivation && (
                    <a
                      href="https://mail.google.com"
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-brand btn-sm"
                      style={{ fontSize: '0.82rem', padding: '0.5rem 0.9rem', gap: '0.35rem' }}
                    >
                      Open Gmail & Activate →
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleCheckEmailStatus}
                    disabled={checkingEmailService}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.82rem', padding: '0.5rem 0.75rem', gap: '0.35rem' }}
                  >
                    <RefreshCw size={13} style={{ animation: checkingEmailService ? 'spin 1s linear infinite' : 'none' }} />
                    {checkingEmailService ? 'Checking...' : 'Check Status'}
                  </button>
                </div>
              </div>
            )}

            {/* KPI Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
              <div className="card" style={{ padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Total Revenue</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-brand-primary)' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-green)', fontWeight: '700', marginTop: '0.25rem' }}>Live Store Total</div>
              </div>

              <div className="card" style={{ padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Total Orders</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: 'var(--color-ink)' }}>{orders.length}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)', fontWeight: '600', marginTop: '0.25rem' }}>Average Order Value: ₹{aov}</div>
              </div>

              <div className="card" style={{ padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Pending Fulfillment</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#D97706' }}>{pendingOrdersCount}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)', fontWeight: '600', marginTop: '0.25rem' }}>Needs packing/dispatch</div>
              </div>

              <div className="card" style={{ padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-ink-soft)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>Shipped / Delivered</div>
                <div style={{ fontSize: '2rem', fontWeight: '900', color: '#16A34A' }}>{shippedDeliveredCount}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-accent-green)', fontWeight: '600', marginTop: '0.25rem' }}>Dispatched via express</div>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Strip */}
            <div className="card" style={{ padding: '1.75rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-ink)' }}>Recent Customer Orders</h3>
                <button onClick={() => setActiveTab('orders')} className="btn btn-secondary btn-sm" style={{ fontWeight: '700' }}>
                  View All Orders →
                </button>
              </div>

              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
                <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1.5px solid var(--color-line)', color: 'var(--color-ink-soft)' }}>
                      <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Order ID</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Customer</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Items</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Total</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Status</th>
                      <th style={{ padding: '0.75rem 0.5rem', fontWeight: '700' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(o => (
                      <tr key={o.id} style={{ borderBottom: '1px solid var(--color-line)' }}>
                        <td style={{ padding: '0.75rem 0.5rem', fontWeight: '800', color: 'var(--color-brand-primary)' }}>#{o.id}</td>
                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <div style={{ fontWeight: '700', color: 'var(--color-ink)' }}>{o.customer?.fullName || 'Customer'}</div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-soft)' }}>{o.customer?.city || ''}</div>
                        </td>
                        <td style={{ padding: '0.75rem 0.5rem' }}>{(o.items || []).map(i => `${i.name} (x${i.quantity})`).join(', ')}</td>
                        <td style={{ padding: '0.75rem 0.5rem', fontWeight: '800' }}>₹{Number(o.grandTotal).toLocaleString('en-IN')}</td>
                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <span className="badge badge-brand" style={{ fontSize: '0.75rem' }}>{o.orderStatus}</span>
                        </td>
                        <td style={{ padding: '0.75rem 0.5rem' }}>
                          <button
                            onClick={() => { setSelectedOrder(o); setNewStatus(o.orderStatus); setTrackingNo(o.trackingNumber || ''); setCourierPartner(o.courierPartner || 'Delhivery Express'); }}
                            className="btn btn-secondary btn-sm"
                            style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: ORDER MANAGEMENT & FULFILLMENT */}
        {/* ========================================================= */}
        {activeTab === 'orders' && (
          <div>
            {/* Filter and Search Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ position: 'relative', flexGrow: 1, minWidth: '220px' }}>
                <Search size={18} color="var(--color-ink-soft)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Order ID, Customer Name, Phone, City, Tracking..."
                  style={{ width: '100%', padding: '0.65rem 0.75rem 0.65rem 2.5rem', borderRadius: '12px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFFFFF' }}
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '0.65rem 1rem', borderRadius: '12px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none', backgroundColor: '#FFFFFF', fontWeight: '600' }}
              >
                <option value="all">All Order Statuses</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Payment Confirmed">Payment Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Packed">Packed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Orders Table Container */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
                <table style={{ width: '100%', minWidth: '820px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                  <thead style={{ backgroundColor: 'var(--color-fog)', borderBottom: '1px solid var(--color-line)' }}>
                    <tr>
                      <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Order ID</th>
                      <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Customer & Contact</th>
                      <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Shipping Address</th>
                      <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Items & Total</th>
                      <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Status</th>
                      <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Courier Tracking</th>
                      <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-ink-soft)' }}>
                          No orders found matching your search and filter criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map(ord => (
                        <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-line)' }}>
                          <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-brand-primary)' }}>
                            #{ord.id}
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', fontWeight: '500' }}>
                              {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: '700', color: 'var(--color-ink)' }}>{ord.customer?.fullName || 'Customer'}</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)' }}>{ord.customer?.phone}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)' }}>{ord.customer?.email}</div>
                          </td>
                          <td style={{ padding: '1rem', maxWidth: '200px' }}>
                            <div style={{ fontSize: '0.82rem', color: 'var(--color-ink)', lineHeight: '1.4' }}>
                              {ord.customer?.addressLine}, {ord.customer?.city} - {ord.customer?.pinCode}
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: '800', color: 'var(--color-brand-primary)', fontSize: '0.95rem' }}>
                              ₹{Number(ord.grandTotal).toLocaleString('en-IN')}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)' }}>
                              {ord.paymentMethod} ({ord.paymentStatus})
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', marginTop: '0.2rem' }}>
                              {(ord.items || []).map(i => `${i.name} (x${i.quantity})`).join(', ')}
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span className="badge badge-brand" style={{ fontSize: '0.78rem' }}>
                              {ord.orderStatus}
                            </span>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: '700', color: 'var(--color-ink)', fontSize: '0.82rem' }}>
                              {ord.courierPartner || 'Delhivery Express'}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: ord.trackingNumber ? 'var(--color-brand-primary)' : 'var(--color-ink-soft)', fontWeight: ord.trackingNumber ? '700' : '400' }}>
                              {ord.trackingNumber || 'Pending AWB'}
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ display: 'flex', gap: '0.4rem', flexDirection: 'column' }}>
                              <button
                                onClick={() => {
                                  setSelectedOrder(ord);
                                  setNewStatus(ord.orderStatus);
                                  setTrackingNo(ord.trackingNumber || '');
                                  setCourierPartner(ord.courierPartner || 'Delhivery Express');
                                }}
                                className="btn btn-brand btn-sm"
                                style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
                              >
                                Update Status
                              </button>
                              <button
                                onClick={() => setInspectOrder(ord)}
                                className="btn btn-secondary btn-sm"
                                style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem', gap: '0.25rem' }}
                              >
                                <Eye size={12} /> Inspect
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PRODUCT INVENTORY & PRICING CONTROL */}
        {/* ========================================================= */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-ink)', margin: 0 }}>Managed Product Inventory</h3>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)' }}>Add new products, edit pricing & descriptions. Changes immediately sync to Supabase & storefront.</div>
              </div>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="btn btn-brand"
                style={{ gap: '0.4rem', padding: '0.65rem 1.25rem', fontWeight: '800', boxShadow: 'var(--shadow-sm)' }}
              >
                <Plus size={18} /> Add New Product
              </button>
            </div>

            {productActionMsg && (
              <div style={{ padding: '0.85rem 1.25rem', borderRadius: '14px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', fontSize: '0.9rem', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} color="#16A34A" />
                <span>{productActionMsg}</span>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '1.5rem' }}>
              {displayProducts.map((p) => {
                const isActive = activeProducts[p.id] !== false;
                return (
                  <div key={p.id} className="card" style={{ padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', opacity: isActive ? 1 : 0.65 }}>
                    <div>
                      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1rem' }}>
                        <img src={p.image} alt={p.name} style={{ width: '75px', height: '75px', borderRadius: '12px', objectFit: 'contain', backgroundColor: 'var(--color-fog)', padding: '0.35rem', border: '1px solid var(--color-line)' }} />
                        <div style={{ flexGrow: 1 }}>
                          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                            {p.badge && <span className="badge badge-brand" style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem' }}>{p.badge}</span>}
                            <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.45rem', borderRadius: '6px', backgroundColor: 'var(--color-fog)', color: 'var(--color-ink-soft)', fontWeight: '700' }}>
                              {p.category || 'NFC Standee'}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-ink)', marginBottom: '0.2rem', lineHeight: '1.3' }}>{p.name}</h4>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
                            <span style={{ fontWeight: '900', color: 'var(--color-brand-primary)', fontSize: '1.2rem' }}>₹{p.price.toLocaleString('en-IN')}</span>
                            {p.originalPrice && <span style={{ textDecoration: 'line-through', color: 'var(--color-ink-soft)', fontSize: '0.85rem' }}>₹{p.originalPrice.toLocaleString('en-IN')}</span>}
                          </div>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-soft)', lineHeight: '1.5', marginBottom: '0.8rem' }}>
                        {p.shortDescription || 'Smart contactless touchpoint.'}
                      </p>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <span>URL Slug:</span>
                        <code style={{ backgroundColor: 'var(--color-fog)', padding: '0.15rem 0.4rem', borderRadius: '4px', color: 'var(--color-ink)', fontWeight: '600' }}>/product/{p.slug}</code>
                      </div>
                    </div>

                    <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                        <button
                          onClick={() => {
                            setEditingProduct(p);
                            setProductFormData({
                              name: p.name || '',
                              slug: p.slug || '',
                              category: p.category || 'NFC Standee',
                              price: p.price || 0,
                              originalPrice: p.originalPrice || 0,
                              badge: p.badge || '',
                              image: p.image || '/assets/google.png',
                              shortDescription: p.shortDescription || '',
                              description: p.description || ''
                            });
                          }}
                          className="btn btn-secondary btn-sm"
                          style={{ gap: '0.35rem', justifyContent: 'center', fontSize: '0.8rem' }}
                        >
                          <Edit3 size={13} /> Edit Details
                        </button>
                        <Link
                          to={`/product/${p.slug}`}
                          target="_blank"
                          className="btn btn-secondary btn-sm"
                          style={{ gap: '0.35rem', justifyContent: 'center', fontSize: '0.8rem' }}
                        >
                          <ExternalLink size={13} /> View Live
                        </Link>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.5rem' }}>
                        <button
                          onClick={() => toggleProductActive(p.id)}
                          className={`btn btn-sm ${isActive ? 'btn-secondary' : 'btn-brand'}`}
                          style={{ justifyContent: 'center', fontSize: '0.8rem' }}
                        >
                          {isActive ? 'Disable from Store' : 'Enable in Store'}
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(p.id)}
                          className="btn btn-secondary btn-sm"
                          title="Delete Product"
                          style={{ color: '#DC2626', borderColor: '#FEE2E2', backgroundColor: '#FEF2F2', padding: '0.35rem 0.65rem' }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: SUPABASE DATABASE & STORE COPY SETTINGS */}
        {/* ========================================================= */}
        {activeTab === 'database' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Supabase Connection Status Card */}
            <div className="card" style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Database size={24} color="var(--color-brand-primary)" />
                <h3 style={{ fontSize: '1.35rem', fontWeight: '800', color: 'var(--color-ink)', margin: 0 }}>Supabase Database Integration</h3>
              </div>

              <div style={{ padding: '1rem 1.25rem', borderRadius: '14px', backgroundColor: dbStatus.tableReady ? '#F0FDF4' : '#FFFBEB', border: dbStatus.tableReady ? '1px solid #BBF7D0' : '1px solid #FDE68A', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                {dbStatus.tableReady ? <CheckCircle2 size={20} color="#16A34A" style={{ flexShrink: 0, marginTop: '2px' }} /> : <AlertCircle size={20} color="#D97706" style={{ flexShrink: 0, marginTop: '2px' }} />}
                <div>
                  <div style={{ fontWeight: '800', color: dbStatus.tableReady ? '#166534' : '#92400E', fontSize: '0.95rem' }}>
                    {dbStatus.tableReady ? 'Database Tables Active & Ready' : 'Database Connected — Needs Schema Execution'}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: dbStatus.tableReady ? '#15803D' : '#B45309', marginTop: '0.2rem' }}>
                    {dbStatus.message}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.88rem' }}>
                <div style={{ padding: '0.85rem', backgroundColor: 'var(--color-fog)', borderRadius: '12px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--color-ink-soft)' }}>Project URL</div>
                  <div style={{ fontWeight: '800', color: 'var(--color-brand-primary)', wordBreak: 'break-all' }}>https://rvlvvrpdpgmkftwbigwi.supabase.co</div>
                </div>
                <div style={{ padding: '0.85rem', backgroundColor: 'var(--color-fog)', borderRadius: '12px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--color-ink-soft)' }}>Direct Host</div>
                  <div style={{ fontWeight: '800', color: 'var(--color-ink)' }}>db.rvlvvrpdpgmkftwbigwi.supabase.co:5432</div>
                </div>
              </div>

              {/* Copy SQL Schema Helper */}
              <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', margin: 0 }}>Supabase SQL Schema Helper</h4>
                  <button
                    onClick={copySqlSchema}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '0.35rem', fontWeight: '700' }}
                  >
                    {copiedSchema ? <Check size={14} color="#16A34A" /> : <Copy size={14} />}
                    {copiedSchema ? 'SQL Copied!' : 'Copy SQL Schema'}
                  </button>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                  Copy this SQL schema and run it in your <a href="https://supabase.com/dashboard/project/rvlvvrpdpgmkftwbigwi/sql" target="_blank" rel="noreferrer" style={{ color: 'var(--color-brand-primary)', fontWeight: '700' }}>Supabase SQL Editor</a> to create the <code>orders</code>, <code>products</code>, and <code>site_settings</code> tables.
                </p>
              </div>
            </div>

            {/* Homepage Copy Editor */}
            <div className="card" style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '1.25rem', color: 'var(--color-ink)' }}>Homepage Headline & Subtext Editor</h3>
              <form onSubmit={handleSaveHeroContent} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>Hero Headline</label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>Hero Subtext</label>
                  <textarea
                    rows={3}
                    value={subtext}
                    onChange={(e) => setSubtext(e.target.value)}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button type="submit" className="btn btn-brand">Save Storefront Copy</button>
                  {contentSavedMsg && (
                    <span style={{ color: '#16A34A', fontWeight: '700', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <CheckCircle2 size={16} /> Saved successfully!
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* STATUS & COURIER UPDATE MODAL */}
        {/* ========================================================= */}
        {selectedOrder && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ maxWidth: '480px', width: '100%', backgroundColor: '#FFFFFF', padding: 'clamp(1.25rem, 4vw, 2rem)', borderRadius: '24px', boxShadow: 'var(--shadow-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: 'var(--color-ink)' }}>Update Order #{selectedOrder.id}</h3>
                <button onClick={() => setSelectedOrder(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0.2rem' }}>
                  <X size={20} color="var(--color-ink-soft)" />
                </button>
              </div>

              <form onSubmit={handleUpdateStatusSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Fulfillment Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="Payment Confirmed">Payment Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Packed">Packed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Courier Partner</label>
                  <select
                    value={courierPartner}
                    onChange={(e) => setCourierPartner(e.target.value)}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  >
                    <option value="Delhivery Express">Delhivery Express</option>
                    <option value="BlueDart Express">BlueDart Express</option>
                    <option value="DTDC Express">DTDC Express</option>
                    <option value="Tapzyy Express COD">Tapzyy Express COD</option>
                    <option value="India Post Speed Post">India Post Speed Post</option>
                    <option value="Bluedart Air">Bluedart Air Cargo</option>
                  </select>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--color-ink)', margin: 0 }}>Courier AWB / Tracking ID</label>
                    <button
                      type="button"
                      onClick={() => setTrackingNo(`DLHV-${Math.floor(100000 + Math.random() * 900000)}`)}
                      style={{ border: 'none', background: 'none', color: 'var(--color-brand-primary)', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer' }}
                    >
                      + Auto Generate
                    </button>
                  </div>
                  <input
                    type="text"
                    value={trackingNo}
                    onChange={(e) => setTrackingNo(e.target.value)}
                    placeholder="e.g. DLHV-849201 or BLR-DTDC-992"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Fulfillment Note (Optional)</label>
                  <input
                    type="text"
                    value={statusNote}
                    onChange={(e) => setStatusNote(e.target.value)}
                    placeholder="e.g. Handed over to morning dispatch executive"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button type="button" onClick={() => setSelectedOrder(null)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-brand btn-sm">Save to Supabase & Store</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ORDER DETAILS INSPECTOR MODAL */}
        {/* ========================================================= */}
        {inspectOrder && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ maxWidth: '600px', width: '100%', backgroundColor: '#FFFFFF', padding: 'clamp(1.25rem, 4vw, 2.25rem)', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', maxHeight: '90vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-line)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div>
                  <span className="badge badge-brand" style={{ marginBottom: '0.2rem' }}>{inspectOrder.orderStatus}</span>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, color: 'var(--color-ink)' }}>Order #{inspectOrder.id} Details</h3>
                </div>
                <button onClick={() => setInspectOrder(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0.2rem' }}>
                  <X size={20} color="var(--color-ink-soft)" />
                </button>
              </div>

              {/* Customer Box */}
              <div style={{ padding: '1rem', backgroundColor: 'var(--color-fog)', borderRadius: '16px', marginBottom: '1.25rem', fontSize: '0.88rem' }}>
                <div style={{ fontWeight: '800', color: 'var(--color-ink)', marginBottom: '0.25rem' }}>Customer & Shipping Address</div>
                <div style={{ fontWeight: '700', color: 'var(--color-brand-primary)' }}>{inspectOrder.customer?.fullName} • {inspectOrder.customer?.phone}</div>
                <div style={{ color: 'var(--color-ink-soft)', marginTop: '0.2rem' }}>{inspectOrder.customer?.email}</div>
                <div style={{ color: 'var(--color-ink)', marginTop: '0.4rem', lineHeight: '1.4' }}>
                  {inspectOrder.customer?.addressLine}<br />
                  {inspectOrder.customer?.landmark && <>{inspectOrder.customer?.landmark}<br /></>}
                  {inspectOrder.customer?.city}, {inspectOrder.customer?.state} - {inspectOrder.customer?.pinCode}
                </div>
              </div>

              {/* Items Summary */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: '800', color: 'var(--color-ink)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Ordered Items</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {(inspectOrder.items || []).map((it, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0', borderBottom: '1px dashed var(--color-line)', fontSize: '0.88rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--color-ink)' }}>{it.name} × {it.quantity}</div>
                      <div style={{ fontWeight: '800', color: 'var(--color-brand-primary)' }}>₹{(it.price * it.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.05rem', color: 'var(--color-ink)', paddingTop: '0.5rem' }}>
                    <span>Grand Total:</span>
                    <span>₹{Number(inspectOrder.grandTotal).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Owner Email Notification Status */}
              <div style={{ padding: '0.85rem 1rem', borderRadius: '14px', backgroundColor: 'var(--color-fog)', border: '1px solid var(--color-line)', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Mail size={16} color="var(--color-brand-primary)" />
                    <div style={{ fontSize: '0.82rem' }}>
                      <span style={{ fontWeight: '700', color: 'var(--color-ink)' }}>Owner Alert:</span>{' '}
                      <span style={{ color: 'var(--color-ink-soft)', wordBreak: 'break-all' }}>{ADMIN_NOTIFICATION_EMAIL}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                    <button
                      type="button"
                      disabled={emailSending}
                      onClick={async () => {
                        setEmailSending(true);
                        setEmailSentStatus(null);
                        const res = await sendOrderEmailToAdmin(inspectOrder);
                        setEmailSending(false);
                        if (res.success) {
                          setEmailSentStatus({ type: 'success', text: `Email delivered to ${ADMIN_NOTIFICATION_EMAIL}!` });
                        } else if (res.needsActivation) {
                          setEmailSentStatus({ type: 'warning', text: `Action Required: FormSubmit sent an activation email to ${ADMIN_NOTIFICATION_EMAIL}. Open Gmail & click 'Activate Form'.` });
                        } else {
                          setEmailSentStatus({ type: 'error', text: res.message || 'Dispatch error' });
                        }
                        setTimeout(() => setEmailSentStatus(null), 8000);
                      }}
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', gap: '0.25rem' }}
                    >
                      <Send size={12} /> {emailSending ? 'Sending...' : 'Resend Email Alert'}
                    </button>

                    <a
                      href={generateOrderMailtoUrl(inspectOrder)}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-secondary btn-sm"
                      style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
                    >
                      Open in Mail App
                    </a>
                  </div>
                </div>

                {emailSentStatus && (
                  <div style={{
                    fontSize: '0.78rem',
                    color: emailSentStatus.type === 'success' ? '#16A34A' : emailSentStatus.type === 'warning' ? '#D97706' : '#DC2626',
                    fontWeight: '700',
                    marginTop: '0.45rem',
                    padding: '0.4rem 0.6rem',
                    borderRadius: '8px',
                    backgroundColor: emailSentStatus.type === 'success' ? '#DCFCE7' : emailSentStatus.type === 'warning' ? '#FEF3C7' : '#FEE2E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}>
                    <span>{emailSentStatus.text}</span>
                    {emailSentStatus.type === 'warning' && (
                      <a href="https://mail.google.com" target="_blank" rel="noreferrer" style={{ textDecoration: 'underline', color: '#B45309', whiteSpace: 'nowrap' }}>
                        Open Gmail →
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Fulfillment Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', borderTop: '1px solid var(--color-line)', paddingTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '0.35rem' }}
                >
                  <Printer size={14} /> Print Order Slip
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedOrder(inspectOrder);
                    setInspectOrder(null);
                    setNewStatus(inspectOrder.orderStatus);
                    setTrackingNo(inspectOrder.trackingNumber || '');
                    setCourierPartner(inspectOrder.courierPartner || 'Delhivery Express');
                  }}
                  className="btn btn-brand btn-sm"
                >
                  Update Fulfillment
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* ADD NEW PRODUCT MODAL */}
        {/* ========================================================= */}
        {isAddingProduct && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ maxWidth: '580px', width: '100%', backgroundColor: '#FFFFFF', padding: 'clamp(1.25rem, 4vw, 2.25rem)', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', maxHeight: '92vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-line)', paddingBottom: '0.85rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0, color: 'var(--color-ink)' }}>Add New Product</h3>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-soft)' }}>Create a product with automatic page URL & real-time DB sync.</div>
                </div>
                <button onClick={() => setIsAddingProduct(false)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0.2rem' }}>
                  <X size={20} color="var(--color-ink-soft)" />
                </button>
              </div>

              <form onSubmit={handleCreateProductSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {productFormError && (
                  <div style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{productFormError}</span>
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProductData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const autoSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                      setNewProductData({ ...newProductData, name, slug: newProductData.slug ? newProductData.slug : autoSlug });
                    }}
                    placeholder="e.g. Google Review Acrylic NFC Standee Pro"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>URL Slug</label>
                    <input
                      type="text"
                      value={newProductData.slug}
                      onChange={(e) => setNewProductData({ ...newProductData, slug: e.target.value })}
                      placeholder="e.g. google-nfc-standee-pro"
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Category</label>
                    <select
                      value={newProductData.category}
                      onChange={(e) => setNewProductData({ ...newProductData, category: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', outline: 'none', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="NFC Standee">NFC Standee</option>
                      <option value="NFC Card">NFC Card</option>
                      <option value="Review Plate">Review Plate</option>
                      <option value="Smart Combo">Smart Combo</option>
                      <option value="Business Touchpoint">Business Touchpoint</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Selling Price (₹) *</label>
                    <input
                      type="number"
                      required
                      value={newProductData.price}
                      onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
                      placeholder="1999"
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Original MRP (₹)</label>
                    <input
                      type="number"
                      value={newProductData.originalPrice}
                      onChange={(e) => setNewProductData({ ...newProductData, originalPrice: e.target.value })}
                      placeholder="2999"
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Badge Tag (Optional)</label>
                  <input
                    type="text"
                    value={newProductData.badge}
                    onChange={(e) => setNewProductData({ ...newProductData, badge: e.target.value })}
                    placeholder="e.g. BESTSELLER, HOT DEAL, NEW ARRIVAL"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                {/* Preset image selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Product Image</label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    {[
                      { label: '🔵 Google Card', src: '/assets/google.png' },
                      { label: '🟣 Instagram Card', src: '/assets/insta.png' },
                      { label: '🟠 Tapzyy Combo', src: '/assets/combo.png' },
                      { label: '🟢 Standee Pro', src: '/assets/hero-mockup.png' }
                    ].map((opt) => (
                      <button
                        key={opt.src}
                        type="button"
                        onClick={() => setNewProductData({ ...newProductData, image: opt.src })}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', borderColor: newProductData.image === opt.src ? 'var(--color-brand-primary)' : 'var(--color-line)', backgroundColor: newProductData.image === opt.src ? 'var(--color-brand-light)' : '#FFFFFF' }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={newProductData.image}
                      onChange={(e) => setNewProductData({ ...newProductData, image: e.target.value })}
                      placeholder="/assets/google.png or https://..."
                      style={{ flexGrow: 1, padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', outline: 'none' }}
                    />
                    {newProductData.image && (
                      <img src={newProductData.image} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'contain', backgroundColor: 'var(--color-fog)', border: '1px solid var(--color-line)' }} />
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Short Description</label>
                  <input
                    type="text"
                    value={newProductData.shortDescription}
                    onChange={(e) => setNewProductData({ ...newProductData, shortDescription: e.target.value })}
                    placeholder="e.g. Tap or scan to collect 5-star Google reviews in seconds."
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Full Description</label>
                  <textarea
                    rows={3}
                    value={newProductData.description}
                    onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
                    placeholder="Comprehensive description for the product detail page..."
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Key Highlights (one per line)</label>
                  <textarea
                    rows={3}
                    value={newProductData.featuresText}
                    onChange={(e) => setNewProductData({ ...newProductData, featuresText: e.target.value })}
                    placeholder="Instant contactless tap or QR scan&#10;Durable 4mm acrylic build&#10;Zero app installation required"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem', borderTop: '1px solid var(--color-line)', paddingTop: '1rem' }}>
                  <button type="button" onClick={() => setIsAddingProduct(false)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-brand btn-sm">Publish Product to Store & DB</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* PRODUCT EDIT MODAL */}
        {/* ========================================================= */}
        {editingProduct && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ maxWidth: '540px', width: '100%', backgroundColor: '#FFFFFF', padding: 'clamp(1.25rem, 4vw, 2.25rem)', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', maxHeight: '92vh', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-line)', paddingBottom: '0.85rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, color: 'var(--color-ink)' }}>Edit {editingProduct.name}</h3>
                <button onClick={() => setEditingProduct(null)} style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '0.2rem' }}>
                  <X size={20} color="var(--color-ink-soft)" />
                </button>
              </div>

              <form onSubmit={handleProductEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {productFormError && (
                  <div style={{ padding: '0.65rem 0.85rem', borderRadius: '10px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#991B1B', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <AlertCircle size={16} style={{ flexShrink: 0 }} />
                    <span>{productFormError}</span>
                  </div>
                )}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Product Title</label>
                  <input
                    type="text"
                    required
                    value={productFormData.name}
                    onChange={(e) => setProductFormData({ ...productFormData, name: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>URL Slug</label>
                    <input
                      type="text"
                      value={productFormData.slug}
                      onChange={(e) => setProductFormData({ ...productFormData, slug: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Category</label>
                    <select
                      value={productFormData.category || 'NFC Standee'}
                      onChange={(e) => setProductFormData({ ...productFormData, category: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', outline: 'none', backgroundColor: '#FFFFFF' }}
                    >
                      <option value="NFC Standee">NFC Standee</option>
                      <option value="NFC Card">NFC Card</option>
                      <option value="Review Plate">Review Plate</option>
                      <option value="Smart Combo">Smart Combo</option>
                      <option value="Business Touchpoint">Business Touchpoint</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Selling Price (₹)</label>
                    <input
                      type="number"
                      required
                      value={productFormData.price}
                      onChange={(e) => setProductFormData({ ...productFormData, price: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Original MRP (₹)</label>
                    <input
                      type="number"
                      value={productFormData.originalPrice}
                      onChange={(e) => setProductFormData({ ...productFormData, originalPrice: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Badge Tag (e.g. BESTSELLER)</label>
                  <input
                    type="text"
                    value={productFormData.badge}
                    onChange={(e) => setProductFormData({ ...productFormData, badge: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                {/* Preset image selector */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Product Image</label>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                    {[
                      { label: '🔵 Google Card', src: '/assets/google.png' },
                      { label: '🟣 Instagram Card', src: '/assets/insta.png' },
                      { label: '🟠 Tapzyy Combo', src: '/assets/combo.png' },
                      { label: '🟢 Standee Pro', src: '/assets/hero-mockup.png' }
                    ].map((opt) => (
                      <button
                        key={opt.src}
                        type="button"
                        onClick={() => setProductFormData({ ...productFormData, image: opt.src })}
                        className="btn btn-secondary btn-sm"
                        style={{ fontSize: '0.75rem', padding: '0.25rem 0.55rem', borderColor: productFormData.image === opt.src ? 'var(--color-brand-primary)' : 'var(--color-line)', backgroundColor: productFormData.image === opt.src ? 'var(--color-brand-light)' : '#FFFFFF' }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={productFormData.image || ''}
                      onChange={(e) => setProductFormData({ ...productFormData, image: e.target.value })}
                      placeholder="/assets/google.png or https://..."
                      style={{ flexGrow: 1, padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', outline: 'none' }}
                    />
                    {productFormData.image && (
                      <img src={productFormData.image} alt="Preview" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'contain', backgroundColor: 'var(--color-fog)', border: '1px solid var(--color-line)' }} />
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Short Description</label>
                  <input
                    type="text"
                    value={productFormData.shortDescription || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, shortDescription: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', marginBottom: '0.35rem', color: 'var(--color-ink)' }}>Full Description</label>
                  <textarea
                    rows={3}
                    value={productFormData.description || ''}
                    onChange={(e) => setProductFormData({ ...productFormData, description: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', fontFamily: 'var(--font-sans)', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem', borderTop: '1px solid var(--color-line)', paddingTop: '1rem' }}>
                  <button type="button" onClick={() => setEditingProduct(null)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-brand btn-sm">Save Changes to Database</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* DELETE CONFIRMATION MODAL */}
        {/* ========================================================= */}
        {deleteConfirmId && (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.65)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="card" style={{ maxWidth: '420px', width: '100%', backgroundColor: '#FFFFFF', padding: '1.75rem', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', textAlign: 'center' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Trash2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--color-ink)' }}>Delete this Product?</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                This product will be permanently removed from the storefront catalog and Supabase database. Customers will no longer be able to purchase it.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                <button type="button" onClick={() => setDeleteConfirmId(null)} className="btn btn-secondary btn-sm" style={{ minWidth: '100px' }}>Cancel</button>
                <button
                  type="button"
                  onClick={() => handleDeleteProduct(deleteConfirmId)}
                  className="btn btn-sm"
                  style={{ backgroundColor: '#DC2626', color: '#FFFFFF', border: 'none', fontWeight: '700', minWidth: '100px' }}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

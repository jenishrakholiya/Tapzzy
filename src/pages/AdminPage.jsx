import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useAdmin } from '../context/AdminContext';
import { PRODUCTS } from '../data/products';

export const AdminPage = () => {
  const { user, isAdmin, loginDemoAdmin } = useAuth();
  const { orders, updateOrderStatus } = useOrders();
  const { siteContent, activeProducts, updateHeroContent, toggleProductActive, products } = useAdmin();
  const displayProducts = products || PRODUCTS;

  const [activeTab, setActiveTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Hero Edit state
  const [headline, setHeadline] = useState(siteContent.heroHeadline);
  const [subtext, setSubtext] = useState(siteContent.heroSubtext);
  const [contentSavedMsg, setContentSavedMsg] = useState(false);

  // Status edit modal state
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [trackingNo, setTrackingNo] = useState('');

  if (!user || !isAdmin) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <ShieldCheck size={56} color="#EF4444" style={{ margin: '0 auto 1.25rem' }} />
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--color-ink)' }}>Protected Admin Control Panel</h2>
        <p style={{ color: 'var(--color-ink-soft)', marginBottom: '2rem' }}>
          Role-based security enforced. You must be authenticated as an Admin to view store metrics and fulfillment controls.
        </p>
        <button onClick={loginDemoAdmin} className="btn btn-brand btn-lg" style={{ gap: '0.5rem' }}>
          <ShieldCheck size={20} /> Login as Demo Admin
        </button>
      </div>
    );
  }

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.grandTotal || 0), 0);
  const filteredOrders = orders.filter(ord => {
    const matchesStatus = statusFilter === 'all' || ord.orderStatus === statusFilter;
    const matchesSearch = ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleUpdateStatusSubmit = (e) => {
    e.preventDefault();
    if (selectedOrder && newStatus) {
      updateOrderStatus(selectedOrder.id, newStatus, trackingNo);
      setSelectedOrder(null);
    }
  };

  const handleSaveHeroContent = (e) => {
    e.preventDefault();
    updateHeroContent(headline, subtext);
    setContentSavedMsg(true);
    setTimeout(() => setContentSavedMsg(false), 3000);
  };

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6', minHeight: '80vh' }}>
      <SEOHead title="Tapzyy Admin Control Dashboard" description="Internal store fulfillment, metrics, and content management dashboard." />

      <div className="container">
        {/* Admin Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-brand" style={{ marginBottom: '0.4rem', display: 'inline-flex', gap: '0.3rem', alignItems: 'center' }}>
              <ShieldCheck size={14} /> Admin Access Granted
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>Tapzyy Admin Portal</h1>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)' }}>Store Operations & Fulfillment Command Center</div>
          </div>
        </div>

        {/* Tab Controls */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-line)', marginBottom: '2.5rem', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: '800',
              borderBottom: activeTab === 'overview' ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
              color: activeTab === 'overview' ? 'var(--color-brand-primary)' : 'var(--color-ink-soft)',
              whiteSpace: 'nowrap',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Metrics Overview
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: '800',
              borderBottom: activeTab === 'orders' ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
              color: activeTab === 'orders' ? 'var(--color-brand-primary)' : 'var(--color-ink-soft)',
              whiteSpace: 'nowrap',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Order Fulfillment ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: '800',
              borderBottom: activeTab === 'products' ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
              color: activeTab === 'products' ? 'var(--color-brand-primary)' : 'var(--color-ink-soft)',
              whiteSpace: 'nowrap',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Product Catalog Control
          </button>
          <button
            onClick={() => setActiveTab('content')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: '800',
              borderBottom: activeTab === 'content' ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
              color: activeTab === 'content' ? 'var(--color-brand-primary)' : 'var(--color-ink-soft)',
              whiteSpace: 'nowrap',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Content & SEO Manager
          </button>
        </div>

        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
              <div className="card" style={{ padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', marginBottom: '0.4rem', fontWeight: '700' }}>Total Orders</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-ink)' }}>{orders.length}</div>
              </div>
              <div className="card" style={{ padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', marginBottom: '0.4rem', fontWeight: '700' }}>Gross Revenue</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-accent-green)' }}>₹{totalRevenue.toLocaleString('en-IN')}</div>
              </div>
              <div className="card" style={{ padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', marginBottom: '0.4rem', fontWeight: '700' }}>Active Products</div>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-brand-primary)' }}>3</div>
              </div>
              <div className="card" style={{ padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', marginBottom: '0.4rem', fontWeight: '700' }}>Payment System</div>
                <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-accent-amber)' }}>Razorpay (Test Mode)</div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-ink)' }}>Recent Order Submissions</h3>
            <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
                <table style={{ width: '100%', minWidth: '600px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead style={{ backgroundColor: 'var(--color-fog)', borderBottom: '1px solid var(--color-line)' }}>
                  <tr>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Order ID</th>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Customer</th>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Total</th>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Status</th>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((ord) => (
                    <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-line)' }}>
                      <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-brand-primary)' }}>#{ord.id}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '700', color: 'var(--color-ink)' }}>{ord.customer.fullName}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-soft)' }}>{ord.customer.city}, {ord.customer.state}</div>
                      </td>
                      <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>₹{ord.grandTotal.toLocaleString('en-IN')}</td>
                      <td style={{ padding: '1rem' }}>
                        <span className="badge badge-brand">{ord.orderStatus}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button onClick={() => { setSelectedOrder(ord); setNewStatus(ord.orderStatus); setTrackingNo(ord.trackingNumber || ''); }} className="btn btn-secondary btn-sm">
                          Edit Status
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

        {/* Tab 2: Orders Fulfillment */}
        {activeTab === 'orders' && (
          <div>
            {/* Filter Bar */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by Order ID or Name..."
                style={{ padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--color-line)', flexGrow: 1, fontSize: '0.9rem', outline: 'none' }}
              />

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{ padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
              >
                <option value="all">All Statuses</option>
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

            <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
              <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', width: '100%' }}>
                <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                <thead style={{ backgroundColor: 'var(--color-fog)', borderBottom: '1px solid var(--color-line)' }}>
                  <tr>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Order ID</th>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Customer & Mobile</th>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Courier & Tracking</th>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Status</th>
                    <th style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>Fulfillment Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} style={{ borderBottom: '1px solid var(--color-line)' }}>
                      <td style={{ padding: '1rem', fontWeight: '800', color: 'var(--color-brand-primary)' }}>#{ord.id}</td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '700', color: 'var(--color-ink)' }}>{ord.customer.fullName} ({ord.customer.phone})</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-ink-soft)' }}>{ord.customer.addressLine}, {ord.customer.city} - {ord.customer.pinCode}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '700', color: 'var(--color-ink)' }}>{ord.courierPartner || 'Delhivery Express'}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--color-brand-primary)', fontWeight: '700' }}>{ord.trackingNumber || 'No tracking ID assigned'}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className="badge badge-brand">{ord.orderStatus}</span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button onClick={() => { setSelectedOrder(ord); setNewStatus(ord.orderStatus); setTrackingNo(ord.trackingNumber || ''); }} className="btn btn-brand btn-sm">
                          Update Status
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

        {/* Tab 3: Product Control */}
        {activeTab === 'products' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-ink)' }}>Managed Product Inventory ({displayProducts.length} Products)</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
              {displayProducts.map((p) => {
                const isActive = activeProducts[p.id] !== false;
                return (
                  <div key={p.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img src={p.image} alt={p.name} style={{ width: '72px', height: '72px', borderRadius: '12px', objectFit: 'cover', border: '1px solid var(--color-line)' }} />
                      <div style={{ flexGrow: 1 }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.2rem', color: 'var(--color-ink)' }}>{p.name}</h4>
                        <div style={{ fontWeight: '800', color: 'var(--color-brand-primary)' }}>₹{p.price.toLocaleString('en-IN')}</div>
                        <div style={{ fontSize: '0.78rem', color: isActive ? 'var(--color-accent-green)' : '#EF4444', fontWeight: '700' }}>
                          {isActive ? '● Available for purchase' : '○ Product hidden'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', paddingTop: '0.75rem', borderTop: '1px solid var(--color-line)' }}>
                      <Link to={`/product/${p.slug}`} className="btn btn-secondary btn-sm" style={{ textAlign: 'center', gap: '0.3rem', justifyContent: 'center' }}>
                        <Edit3 size={14} /> Edit Details & Specs
                      </Link>
                      <button
                        onClick={() => toggleProductActive(p.id)}
                        className={`btn btn-sm ${isActive ? 'btn-secondary' : 'btn-brand'}`}
                      >
                        {isActive ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Content & SEO Manager */}
        {activeTab === 'content' && (
          <div className="card" style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--color-ink)' }}>Homepage Copy & SEO Metadata Manager</h3>

            <form onSubmit={handleSaveHeroContent} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                  Hero Subtext
                </label>
                <textarea
                  rows={3}
                  value={subtext}
                  onChange={(e) => setSubtext(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', fontFamily: 'var(--font-sans)', outline: 'none' }}
                />
              </div>

              <button type="submit" className="btn btn-brand">
                Save Homepage Copy
              </button>

              {contentSavedMsg && (
                <div style={{ color: 'var(--color-accent-green)', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={16} /> Homepage content saved successfully!
                </div>
              )}
            </form>
          </div>
        )}

        {/* Status Update Modal */}
        {selectedOrder && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <div className="card" style={{ maxWidth: '480px', width: '100%', backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-xl)' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-ink)' }}>Update Order #{selectedOrder.id} Status</h3>
              <form onSubmit={handleUpdateStatusSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>Select Status</label>
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
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>Courier Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNo}
                    onChange={(e) => setTrackingNo(e.target.value)}
                    placeholder="e.g. DTDC-BLR-984210"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setSelectedOrder(null)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-brand btn-sm">Update Order</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, MapPin, LogOut, Truck, Plus } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

export const AccountPage = () => {
  const { user, logout, addSavedAddress } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders');
  const [newAddrModal, setNewAddrModal] = useState(false);
  const [addrForm, setAddrForm] = useState({
    fullName: user?.name || '',
    phone: user?.phone || '',
    addressLine: '',
    landmark: '',
    city: 'Bengaluru',
    state: 'Karnataka',
    pinCode: '560001'
  });

  if (!user) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-ink)', marginBottom: '0.75rem' }}>Please Login to Access Your Account</h2>
        <p style={{ color: 'var(--color-ink-soft)', marginBottom: '1.5rem' }}>View orders and manage your business shipping profile.</p>
        <Link to="/login" className="btn btn-brand">Go to Login</Link>
      </div>
    );
  }

  // Filter user orders safely
  const myOrders = orders.filter(o =>
    ((o.customer?.email || '').toLowerCase() === (user.email || '').toLowerCase()) ||
    (Boolean(o.customer?.phone) && Boolean(user.phone) && o.customer.phone === user.phone)
  );

  const handleSaveAddr = (e) => {
    e.preventDefault();
    addSavedAddress(addrForm);
    setNewAddrModal(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6', minHeight: '80vh' }}>
      <SEOHead title="Customer Account Dashboard | Tapzyy" description="Manage your Tapzyy orders and business shipping address." />

      <div className="container">
        {/* Dashboard Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>{user.businessName || 'Local Business Partner'}</span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>Welcome, {user.name}</h1>
            <div style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)' }}>{user.email} • {user.phone}</div>
          </div>

          <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ color: '#EF4444', gap: '0.4rem' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--color-line)', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: '800',
              fontSize: '1rem',
              borderBottom: activeTab === 'orders' ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
              color: activeTab === 'orders' ? 'var(--color-brand-primary)' : 'var(--color-ink-soft)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <Package size={18} style={{ display: 'inline', marginRight: '0.4rem' }} /> Order History ({myOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            style={{
              padding: '0.75rem 1.25rem',
              fontWeight: '800',
              fontSize: '1rem',
              borderBottom: activeTab === 'addresses' ? '3px solid var(--color-brand-primary)' : '3px solid transparent',
              color: activeTab === 'addresses' ? 'var(--color-brand-primary)' : 'var(--color-ink-soft)',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <MapPin size={18} style={{ display: 'inline', marginRight: '0.4rem' }} /> Saved Addresses ({user.savedAddresses?.length || 0})
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {myOrders.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)' }}>
                <Package size={48} color="var(--color-ink-soft)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--color-ink)' }}>No orders placed yet</h3>
                <p style={{ color: 'var(--color-ink-soft)', marginBottom: '1.5rem' }}>Equip your counter with smart Tapzyy NFC growth cards.</p>
                <Link to="/shop" className="btn btn-brand">Shop Products</Link>
              </div>
            ) : (
              myOrders.map((ord) => (
                <div key={ord.id} className="card" style={{ padding: '1.75rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-line)', paddingBottom: '1rem', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div>
                      <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--color-brand-primary)' }}>Order #{ord.id}</span>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-soft)' }}>
                        Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="badge badge-brand">{ord.orderStatus}</span>
                      <Link to={`/track-order?id=${ord.id}`} className="btn btn-secondary btn-sm" style={{ gap: '0.3rem' }}>
                        <Truck size={14} /> Track Status
                      </Link>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                    {(ord.items || []).map((it, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: 'var(--color-ink-soft)' }}>{it.name} × {it.quantity}</span>
                        <span style={{ fontWeight: '800', color: 'var(--color-ink)' }}>₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.1rem', color: 'var(--color-ink)' }}>
                    <span>Total Amount</span>
                    <span style={{ color: 'var(--color-brand-primary)' }}>₹{ord.grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div>
            <div style={{ marginBottom: '1.5rem', textAlign: 'right' }}>
              <button onClick={() => setNewAddrModal(true)} className="btn btn-brand btn-sm" style={{ gap: '0.4rem' }}>
                <Plus size={16} /> Add New Address
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
              {user.savedAddresses?.map((addr) => (
                <div key={addr.id} className="card" style={{ padding: '1.5rem', borderRadius: '20px', border: addr.isDefault ? '2px solid var(--color-brand-primary)' : '1px solid var(--color-line)', boxShadow: 'var(--shadow-sm)' }}>
                  {addr.isDefault && <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>Default Address</span>}
                  <div style={{ fontWeight: '800', fontSize: '1.05rem', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>{addr.fullName}</div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                    {addr.addressLine}<br />
                    {addr.landmark && <>{addr.landmark}<br /></>}
                    {addr.city}, {addr.state} - {addr.pinCode}<br />
                    Phone: {addr.phone}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Address Modal */}
        {newAddrModal && (
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
            <div className="card" style={{ maxWidth: '500px', width: '100%', backgroundColor: '#FFFFFF', padding: 'clamp(1.25rem, 4vw, 2rem)', borderRadius: '24px', boxShadow: 'var(--shadow-xl)', maxHeight: '90vh', overflowY: 'auto' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '1.25rem', color: 'var(--color-ink)' }}>Add New Business Address</h3>
              <form onSubmit={handleSaveAddr} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.fullName}
                    onChange={(e) => setAddrForm({ ...addrForm, fullName: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={addrForm.phone}
                    onChange={(e) => setAddrForm({ ...addrForm, phone: e.target.value })}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>Address Line *</label>
                  <input
                    type="text"
                    required
                    value={addrForm.addressLine}
                    onChange={(e) => setAddrForm({ ...addrForm, addressLine: e.target.value })}
                    placeholder="Shop / Unit, Street name"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>Landmark</label>
                  <input
                    type="text"
                    value={addrForm.landmark}
                    onChange={(e) => setAddrForm({ ...addrForm, landmark: e.target.value })}
                    placeholder="Opposite Metro Pillar 42"
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>City *</label>
                    <input
                      type="text"
                      required
                      value={addrForm.city}
                      onChange={(e) => setAddrForm({ ...addrForm, city: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>State *</label>
                    <input
                      type="text"
                      required
                      value={addrForm.state}
                      onChange={(e) => setAddrForm({ ...addrForm, state: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>PIN Code *</label>
                    <input
                      type="text"
                      required
                      value={addrForm.pinCode}
                      onChange={(e) => setAddrForm({ ...addrForm, pinCode: e.target.value })}
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button type="button" onClick={() => setNewAddrModal(false)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-brand btn-sm">Save Address</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

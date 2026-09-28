import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, X } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, coupon, applyCoupon, removeCoupon, discount, shippingFee, grandTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode) return;
    const res = applyCoupon(couponCode);
    setCouponMsg(res);
  };

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6', minHeight: '80vh' }}>
      <SEOHead title="Shopping Cart | Tapzyy" description="Review your selected Tapzyy smart growth products." />

      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>Your Shopping Cart</h1>
          {cart.length > 0 && (
            <div className="badge badge-brand" style={{ fontSize: '0.85rem' }}>
              <ShoppingBag size={14} /> {cart.reduce((acc, item) => acc + item.quantity, 0)} Items Selected
            </div>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="card" style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            maxWidth: '600px',
            margin: '0 auto',
            borderRadius: '24px',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-brand-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <ShoppingBag size={40} color="var(--color-brand-primary)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--color-ink)' }}>Your cart is currently empty</h2>
            <p style={{ color: 'var(--color-ink-soft)', marginBottom: '2rem', lineHeight: '1.6' }}>
              Explore our smart Google Review and Instagram growth products for local businesses.
            </p>
            <Link to="/shop" className="btn btn-brand btn-lg" style={{ gap: '0.6rem' }}>
              Explore Products <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '2.5rem',
            alignItems: 'start'
          }} className="cart-grid">
            
            {/* Left: Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {cart.map((item) => (
                <div key={item.id} className="card cart-item-card" style={{
                  padding: '1.25rem',
                  borderRadius: '20px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-line)',
                  backgroundColor: '#FFFFFF'
                }}>
                  <div className="cart-item-main">
                    <div className="cart-item-thumb-wrapper">
                      <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>

                    <div className="cart-item-info">
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.2rem', color: 'var(--color-ink)' }}>{item.name}</h3>
                      <div style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--color-brand-primary)' }}>
                        ₹{item.price.toLocaleString('en-IN')} each
                      </div>
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    {/* Quantity Controls */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      border: '1px solid var(--color-line)',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: '#FFFFFF',
                      padding: '2px',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: 'var(--color-fog)',
                          color: 'var(--color-ink)',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease'
                        }}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span style={{ padding: '0 0.65rem', minWidth: '28px', textAlign: 'center', fontWeight: '800', fontSize: '0.9rem', color: 'var(--color-ink)' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          border: 'none',
                          backgroundColor: 'var(--color-brand-light)',
                          color: 'var(--color-brand-primary)',
                          fontWeight: '800',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.15s ease'
                        }}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: '#EF4444', fontSize: '0.82rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'none', border: 'none', cursor: 'pointer', padding: '0.4rem' }}
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      <Trash2 size={15} /> Remove
                    </button>

                    <div className="cart-item-total">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '0.5rem' }}>
                <Link to="/shop" className="btn btn-secondary" style={{ gap: '0.5rem' }}>
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="card" style={{ padding: '1.75rem', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-line)' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.25rem', borderBottom: '1px solid var(--color-line)', paddingBottom: '0.75rem', color: 'var(--color-ink)' }}>
                Order Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-ink-soft)' }}>
                  <span>Subtotal</span>
                  <span style={{ fontWeight: '700', color: 'var(--color-ink)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-accent-green)' }}>
                    <span>Coupon Discount</span>
                    <span style={{ fontWeight: '700' }}>- ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-ink-soft)' }}>
                  <span>Pan-India Express Shipping</span>
                  <span style={{ fontWeight: '700', color: shippingFee === 0 ? 'var(--color-accent-green)' : 'var(--color-ink)' }}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>

                <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '800', color: 'var(--color-ink)' }}>
                  <span>Total Amount</span>
                  <span style={{ color: 'var(--color-brand-primary)' }}>₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Coupon Box */}
              <div style={{ marginBottom: '1.5rem' }}>
                {coupon ? (
                  <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: '0.75rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '0.85rem', color: '#166534', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Tag size={16} /> Applied: {coupon.code}
                    </div>
                    <button onClick={removeCoupon} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '0.5rem' }}>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. TAPZYY10)"
                      style={{ flexGrow: 1, padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.85rem', textTransform: 'uppercase', outline: 'none' }}
                    />
                    <button type="submit" className="btn btn-secondary btn-sm">Apply</button>
                  </form>
                )}
                {couponMsg && (
                  <div style={{ fontSize: '0.8rem', marginTop: '0.4rem', color: couponMsg.success ? 'var(--color-accent-green)' : '#EF4444', fontWeight: '600' }}>
                    {couponMsg.message}
                  </div>
                )}
              </div>

              <button onClick={() => navigate('/checkout')} className="btn btn-brand btn-lg btn-full" style={{ marginBottom: '1rem', gap: '0.5rem' }}>
                Proceed to Checkout <ArrowRight size={18} />
              </button>

              <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--color-ink-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <ShieldCheck size={14} color="var(--color-brand-primary)" />
                <span>100% Secure Indian Payment Gateway</span>
              </div>
            </div>

          </div>
        )}
      </div>

      <style>{`
        .cart-item-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
        }
        .cart-item-main {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-grow: 1;
        }
        .cart-item-thumb-wrapper {
          width: 88px;
          height: 88px;
          border-radius: 14px;
          overflow: hidden;
          background-color: #F8FAFC;
          border: 1px solid var(--color-line);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          flex-shrink: 0;
        }
        .cart-item-info {
          flex-grow: 1;
        }
        .cart-item-actions {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          flex-shrink: 0;
        }
        .cart-item-total {
          font-weight: 800;
          font-size: 1.2rem;
          color: var(--color-ink);
          min-width: 90px;
          text-align: right;
        }
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .cart-item-card {
            flex-direction: column;
            align-items: stretch;
            gap: 1rem;
            padding: 1rem !important;
          }
          .cart-item-thumb-wrapper {
            width: 72px;
            height: 72px;
          }
          .cart-item-actions {
            justify-content: space-between;
            width: 100%;
            padding-top: 0.75rem;
            border-top: 1px dashed var(--color-line);
          }
        }
      `}</style>
    </div>
  );
};

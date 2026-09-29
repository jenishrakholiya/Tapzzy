import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, X, CheckCircle, Truck, Sparkles } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useCart } from '../context/CartContext';

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, subtotal, coupon, applyCoupon, removeCoupon, discount, shippingFee, grandTotal } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);
  const navigate = useNavigate();

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode.trim());
    setCouponMsg(res);
  };

  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="cart-page-wrapper">
      <SEOHead title="Shopping Cart | Tapzyy" description="Review your selected Tapzyy smart growth products." />

      <div className="container">
        
        {/* Header */}
        <div className="cart-header-row">
          <div className="cart-header-title-wrap">
            <h1 className="cart-main-title">Your Shopping Cart</h1>
            <p className="cart-header-subtitle">
              Fast & Free Pan-India Delivery on all Smart NFC Cards
            </p>
          </div>
          {cart.length > 0 && (
            <div className="badge badge-brand cart-item-count-badge">
              <ShoppingBag size={14} /> {totalItemsCount} {totalItemsCount === 1 ? 'Item' : 'Items'} Selected
            </div>
          )}
        </div>

        {cart.length === 0 ? (
          <div className="card cart-empty-card">
            <div className="cart-empty-icon-wrap">
              <ShoppingBag size={42} color="var(--color-brand-primary)" />
            </div>
            <h2 className="cart-empty-title">Your cart is currently empty</h2>
            <p className="cart-empty-desc">
              Explore our smart Google Review and Instagram growth cards to start collecting 5-star customer reviews today.
            </p>
            <Link to="/shop" className="btn btn-brand btn-lg" style={{ gap: '0.6rem', width: 'auto' }}>
              Explore Products <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div className="cart-grid">
            
            {/* Left: Cart Items List */}
            <div className="cart-items-column">
              
              {/* Free Express Shipping Notification Banner */}
              <div className="cart-free-shipping-bar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', color: '#15803D' }}>
                  <Truck size={18} />
                  <span>Free Express Delivery Unlocked Across India!</span>
                </div>
                <div className="cart-shipping-meter">
                  <div className="cart-shipping-meter-fill" />
                </div>
              </div>

              {/* Items Card List */}
              <div className="cart-cards-list">
                {cart.map((item) => (
                  <div key={item.id} className="card cart-item-card">
                    {/* Top Row: Thumbnail + Product Info + Remove Button */}
                    <div className="cart-item-top-row">
                      <div className="cart-item-thumb-wrapper">
                        <img src={item.image} alt={item.name} className="cart-item-thumb-img" />
                      </div>

                      <div className="cart-item-details">
                        <div className="cart-item-badge">
                          <Sparkles size={11} /> NFC Chip + Dynamic QR
                        </div>
                        <h3 className="cart-item-title">{item.name}</h3>
                        <div className="cart-item-unit-price">
                          ₹{item.price.toLocaleString('en-IN')} each
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item-remove-btn"
                        aria-label={`Remove ${item.name} from cart`}
                        title="Remove from cart"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Bottom Row: Quantity Stepper & Line Total */}
                    <div className="cart-item-bottom-row">
                      <div className="cart-stepper-wrap">
                        <span className="cart-stepper-label">Qty:</span>
                        <div className="cart-stepper">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="cart-stepper-btn"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="cart-stepper-value">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="cart-stepper-btn cart-stepper-btn-add"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-total-price">
                        <span className="cart-total-label">Subtotal:</span>
                        <span className="cart-total-val">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Back to Shopping Button */}
              <div style={{ marginTop: '0.5rem' }}>
                <Link to="/shop" className="btn btn-secondary" style={{ gap: '0.45rem', fontSize: '0.9rem' }}>
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Sidebar */}
            <div className="cart-summary-column">
              <div className="card cart-summary-card">
                <h2 className="cart-summary-heading">
                  Order Summary
                </h2>

                <div className="cart-summary-breakdown">
                  <div className="cart-summary-line">
                    <span>Items Subtotal ({totalItemsCount})</span>
                    <span style={{ fontWeight: '700', color: 'var(--color-ink)' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {discount > 0 && (
                    <div className="cart-summary-line" style={{ color: '#16A34A' }}>
                      <span>Discount Coupon</span>
                      <span style={{ fontWeight: '700' }}>- ₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="cart-summary-line">
                    <span>Pan-India Delivery</span>
                    <span style={{ fontWeight: '700', color: shippingFee === 0 ? '#16A34A' : 'var(--color-ink)' }}>
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>

                  <div className="cart-summary-grand-total">
                    <span>Total Amount</span>
                    <span className="cart-grand-val">₹{grandTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Coupon Code Input */}
                <div style={{ marginBottom: '1.25rem' }}>
                  {coupon ? (
                    <div className="cart-coupon-applied">
                      <div style={{ fontSize: '0.85rem', color: '#166534', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Tag size={16} /> Applied: {coupon.code}
                      </div>
                      <button onClick={removeCoupon} style={{ color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', padding: '0.2rem' }}>
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="cart-coupon-form">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code (e.g. TAPZYY10)"
                        className="cart-coupon-input"
                      />
                      <button type="submit" className="btn btn-secondary btn-sm" style={{ padding: '0.65rem 1rem' }}>
                        Apply
                      </button>
                    </form>
                  )}
                  {couponMsg && (
                    <div style={{ fontSize: '0.8rem', marginTop: '0.4rem', color: couponMsg.success ? '#16A34A' : '#EF4444', fontWeight: '600' }}>
                      {couponMsg.message}
                    </div>
                  )}
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="btn btn-brand btn-lg btn-full cart-checkout-cta"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>

                {/* Trust Badges */}
                <div className="cart-trust-badges">
                  <div className="cart-trust-item">
                    <CheckCircle size={15} color="#16A34A" />
                    <span>Cash on Delivery Available</span>
                  </div>
                  <div className="cart-trust-item">
                    <ShieldCheck size={15} color="var(--color-brand-primary)" />
                    <span>100% Encrypted Indian Checkout</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Mobile Sticky Bottom Checkout Bar (Only visible on screens < 768px) */}
        {cart.length > 0 && (
          <div className="cart-mobile-sticky-bar">
            <div className="cart-mobile-sticky-info">
              <span className="cart-mobile-sticky-label">Total to Pay:</span>
              <span className="cart-mobile-sticky-price">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="btn btn-brand cart-mobile-sticky-btn"
            >
              <span>Checkout</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* COMPONENT STYLES */}
      <style>{`
        .cart-page-wrapper {
          padding-top: 2.5rem;
          padding-bottom: 5rem;
          background-color: #FAF9F6;
          min-height: 80vh;
        }

        .cart-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .cart-main-title {
          font-size: clamp(1.6rem, 3.8vw, 2.3rem);
          font-weight: 800;
          color: var(--color-ink, #0B1220);
          letter-spacing: -0.025em;
          margin: 0 0 0.25rem 0;
          line-height: 1.2;
        }

        .cart-header-subtitle {
          font-size: 0.92rem;
          color: var(--color-ink-soft, #4B5768);
          margin: 0;
        }

        .cart-item-count-badge {
          font-size: 0.82rem;
          padding: 0.4rem 0.85rem;
          border-radius: 9999px;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        /* EMPTY STATE */
        .cart-empty-card {
          text-align: center;
          padding: 4rem 1.5rem;
          max-width: 580px;
          margin: 0 auto;
          border-radius: 24px;
          box-shadow: var(--shadow-sm, 0 4px 12px rgba(0,0,0,0.05));
          background-color: #FFFFFF;
        }

        .cart-empty-icon-wrap {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--color-brand-light, #EFF6FF);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.25rem auto;
        }

        .cart-empty-title {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--color-ink);
          margin-bottom: 0.5rem;
        }

        .cart-empty-desc {
          color: var(--color-ink-soft);
          margin-bottom: 2rem;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        /* GRID */
        .cart-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 380px;
          gap: 2rem;
          align-items: start;
        }

        .cart-items-column {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* FREE SHIPPING METER BAR */
        .cart-free-shipping-bar {
          background-color: #F0FDF4;
          border: 1px solid #BBF7D0;
          border-radius: 16px;
          padding: 0.85rem 1.15rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          font-size: 0.88rem;
        }

        .cart-shipping-meter {
          width: 100%;
          height: 6px;
          background-color: #DCFCE7;
          border-radius: 9999px;
          overflow: hidden;
        }

        .cart-shipping-meter-fill {
          width: 100%;
          height: 100%;
          background-color: #16A34A;
          border-radius: 9999px;
        }

        /* CARDS LIST */
        .cart-cards-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .cart-item-card {
          padding: 1.25rem 1.5rem;
          border-radius: 20px;
          box-shadow: var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.04));
          border: 1px solid var(--color-line, #E2E8F0);
          background-color: #FFFFFF;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .cart-item-card:hover {
          box-shadow: var(--shadow-md, 0 6px 16px rgba(0,0,0,0.06));
        }

        /* TOP ROW */
        .cart-item-top-row {
          display: flex;
          align-items: flex-start;
          gap: 1.1rem;
          position: relative;
        }

        .cart-item-thumb-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 14px;
          overflow: hidden;
          background-color: #F8FAFC;
          border: 1px solid var(--color-line, #E2E8F0);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6px;
          flex-shrink: 0;
        }

        .cart-item-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .cart-item-details {
          flex-grow: 1;
          min-width: 0;
          padding-right: 1.75rem;
          word-break: break-word;
        }

        .cart-item-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          font-weight: 700;
          color: #0066FF;
          background-color: #EFF6FF;
          padding: 0.2rem 0.55rem;
          border-radius: 6px;
          margin-bottom: 0.35rem;
        }

        .cart-item-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: var(--color-ink, #0B1220);
          margin: 0 0 0.3rem 0;
          line-height: 1.35;
        }

        .cart-item-unit-price {
          font-size: 0.88rem;
          font-weight: 700;
          color: var(--color-ink-soft, #4B5768);
        }

        .cart-item-remove-btn {
          position: absolute;
          top: 0;
          right: 0;
          color: #94A3B8;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.4rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .cart-item-remove-btn:hover {
          color: #EF4444;
          background-color: #FEF2F2;
        }

        /* BOTTOM ROW */
        .cart-item-bottom-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.85rem;
          border-top: 1px dashed var(--color-line, #E2E8F0);
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .cart-stepper-wrap {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }

        .cart-stepper-label {
          font-size: 0.82rem;
          color: var(--color-ink-soft, #64748B);
          font-weight: 700;
        }

        .cart-stepper {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--color-line, #CBD5E1);
          border-radius: 9999px;
          background-color: #FFFFFF;
          padding: 3px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.03);
        }

        .cart-stepper-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          border: none;
          background-color: #F1F5F9;
          color: var(--color-ink, #0B1220);
          font-weight: 800;
          font-size: 1.05rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
        }

        .cart-stepper-btn:hover {
          background-color: #E2E8F0;
        }

        .cart-stepper-btn-add {
          background-color: #EFF6FF;
          color: #0066FF;
        }

        .cart-stepper-btn-add:hover {
          background-color: #DBEAFE;
        }

        .cart-stepper-value {
          padding: 0 0.75rem;
          min-width: 28px;
          text-align: center;
          font-weight: 800;
          font-size: 0.92rem;
          color: var(--color-ink);
        }

        .cart-item-total-price {
          display: flex;
          align-items: baseline;
          gap: 0.4rem;
        }

        .cart-total-label {
          font-size: 0.78rem;
          color: var(--color-ink-soft, #64748B);
          font-weight: 600;
        }

        .cart-total-val {
          font-weight: 800;
          font-size: 1.25rem;
          color: #0066FF;
        }

        /* SUMMARY CARD */
        .cart-summary-card {
          padding: 1.75rem;
          border-radius: 24px;
          box-shadow: var(--shadow-md, 0 6px 16px rgba(0,0,0,0.06));
          border: 1px solid var(--color-line, #E2E8F0);
          background-color: #FFFFFF;
        }

        .cart-summary-heading {
          font-size: 1.25rem;
          font-weight: 800;
          margin-bottom: 1.25rem;
          border-bottom: 1px solid var(--color-line, #E2E8F0);
          padding-bottom: 0.75rem;
          color: var(--color-ink);
        }

        .cart-summary-breakdown {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          font-size: 0.95rem;
          margin-bottom: 1.5rem;
        }

        .cart-summary-line {
          display: flex;
          justify-content: space-between;
          color: var(--color-ink-soft, #4B5768);
        }

        .cart-summary-grand-total {
          border-top: 1px solid var(--color-line, #E2E8F0);
          padding-top: 0.95rem;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--color-ink);
        }

        .cart-grand-val {
          color: #0066FF;
          font-size: 1.4rem;
        }

        .cart-coupon-form {
          display: flex;
          gap: 0.5rem;
        }

        .cart-coupon-input {
          flex-grow: 1;
          padding: 0.65rem 0.85rem;
          border-radius: 10px;
          border: 1px solid var(--color-line, #CBD5E1);
          font-size: 0.85rem;
          text-transform: uppercase;
          outline: none;
        }

        .cart-coupon-input:focus {
          border-color: #0066FF;
        }

        .cart-coupon-applied {
          background-color: #F0FDF4;
          border: 1px solid #BBF7D0;
          padding: 0.75rem 1rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .cart-checkout-cta {
          margin-bottom: 1.25rem;
          padding: 1rem 1.5rem;
          font-size: 1.05rem;
          font-weight: 800;
          gap: 0.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 102, 255, 0.28);
        }

        .cart-trust-badges {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px dashed var(--color-line, #E2E8F0);
        }

        .cart-trust-item {
          display: flex;
          align-items: center;
          gap: 0.45rem;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--color-ink-soft, #4B5768);
        }

        /* MOBILE STICKY CHECKOUT BAR */
        .cart-mobile-sticky-bar {
          display: none;
        }

        /* ========================================================
           RESPONSIVE MOBILE BREAKPOINTS (< 992px & < 640px)
        ======================================================== */
        @media (max-width: 992px) {
          .cart-grid {
            grid-template-columns: 1fr !important;
            gap: 1.75rem !important;
          }
          .cart-summary-column {
            order: 2;
          }
          .cart-items-column {
            order: 1;
          }
        }

        @media (max-width: 768px) {
          .cart-page-wrapper {
            padding-bottom: 7.5rem !important; /* space for sticky bar */
          }

          .cart-mobile-sticky-bar {
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 999;
            background-color: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border-top: 1px solid var(--color-line, #E2E8F0);
            box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08);
            padding: 0.75rem 1.25rem;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
          }

          .cart-mobile-sticky-info {
            display: flex;
            flex-direction: column;
            min-width: 0;
          }

          .cart-mobile-sticky-label {
            font-size: 0.72rem;
            font-weight: 700;
            color: var(--color-ink-soft, #64748B);
            text-transform: uppercase;
            letter-spacing: 0.05em;
          }

          .cart-mobile-sticky-price {
            font-size: 1.35rem;
            font-weight: 900;
            color: var(--color-brand-primary, #0066FF);
            line-height: 1.15;
          }

          .cart-mobile-sticky-btn {
            padding: 0.85rem 1.5rem !important;
            font-size: 0.95rem !important;
            font-weight: 800 !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 14px rgba(0, 102, 255, 0.3) !important;
            flex-shrink: 0;
          }
        }

        @media (max-width: 640px) {
          .cart-page-wrapper {
            padding-top: 1.25rem !important;
          }

          .cart-header-row {
            margin-bottom: 1.25rem !important;
          }

          .cart-item-card {
            padding: 1rem !important;
            border-radius: 18px !important;
          }

          .cart-item-thumb-wrapper {
            width: 70px !important;
            height: 70px !important;
            border-radius: 12px !important;
          }

          .cart-item-title {
            font-size: 0.98rem !important;
          }

          .cart-item-unit-price {
            font-size: 0.82rem !important;
          }

          .cart-summary-card {
            padding: 1.25rem !important;
            border-radius: 20px !important;
          }

          .cart-grand-val {
            font-size: 1.3rem !important;
          }

          .cart-checkout-cta {
            font-size: 1rem !important;
            padding: 0.95rem !important;
          }

          .cart-free-shipping-bar {
            padding: 0.75rem 1rem !important;
            font-size: 0.82rem !important;
          }
        }

        @media (max-width: 380px) {
          .cart-item-top-row {
            gap: 0.65rem !important;
          }
          .cart-item-thumb-wrapper {
            width: 58px !important;
            height: 58px !important;
          }
          .cart-item-details {
            padding-right: 1.5rem !important;
          }
          .cart-stepper-btn {
            width: 28px !important;
            height: 28px !important;
            font-size: 0.95rem !important;
          }
          .cart-stepper-value {
            padding: 0 0.45rem !important;
            min-width: 20px !important;
            font-size: 0.85rem !important;
          }
          .cart-total-val {
            font-size: 1.15rem !important;
          }
          .cart-mobile-sticky-btn {
            padding: 0.75rem 1.1rem !important;
            font-size: 0.88rem !important;
          }
        }
      `}</style>
    </div>
  );
};

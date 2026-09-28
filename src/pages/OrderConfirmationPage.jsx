import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Printer, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

const DEFAULT_ESTIMATED_DATE = "3-5 Business Days";

const DEFAULT_ORDER = {
  id: "TPZ-84920",
  customer: {
    fullName: "Valued Business Owner",
    email: "customer@example.com",
    phone: "+91 98765 43210",
    addressLine: "MG Road",
    city: "Bengaluru",
    state: "Karnataka",
    pinCode: "560001"
  },
  items: [
    { name: "Tapzyy Google + Instagram Combo", price: 2999, quantity: 1 }
  ],
  grandTotal: 2999,
  paymentMethod: "Cash on Delivery (COD)",
  paymentStatus: "Pending (COD)",
  estimatedDelivery: DEFAULT_ESTIMATED_DATE
};

export const OrderConfirmationPage = () => {
  const location = useLocation();
  const order = location.state?.order || DEFAULT_ORDER;

  const isCod = order.paymentMethod?.toLowerCase().includes('cod');

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6' }}>
      <SEOHead title={`Order Confirmed #${order.id} | Tapzyy`} description="Your Tapzyy order has been confirmed." />

      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
            <CheckCircle size={44} />
          </div>
          <span className="badge badge-success" style={{ marginBottom: '0.6rem' }}>
            {isCod ? 'Cash on Delivery Confirmed' : 'Payment Confirmed'}
          </span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.5rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>Order Placed Successfully!</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-ink-soft)' }}>
            Thank you for ordering with Tapzyy. Your Order ID is <strong style={{ color: 'var(--color-ink)' }}>#{order.id}</strong>.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="card" style={{ padding: '2rem', borderRadius: '24px', marginBottom: '2rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-line)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-line)', paddingBottom: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)' }}>Order ID</div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-brand-primary)' }}>#{order.id}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)' }}>Estimated Delivery</div>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--color-ink)' }}>{order.estimatedDelivery}</div>
            </div>
          </div>

          {/* Items List */}
          <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.85rem', color: 'var(--color-ink)' }}>Ordered Products</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-line)', paddingBottom: '1rem' }}>
            {(order.items || []).map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.92rem' }}>
                <div>
                  <span style={{ fontWeight: '700', color: 'var(--color-ink)' }}>{item.name}</span> × {item.quantity}
                </div>
                <div style={{ fontWeight: '800', color: 'var(--color-ink)' }}>₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.2rem', color: 'var(--color-ink)', marginTop: '0.5rem' }}>
              <span>{isCod ? 'Total to Pay on Delivery' : 'Total Amount Paid'}</span>
              <span style={{ color: 'var(--color-brand-primary)' }}>₹{Number(order.grandTotal || 0).toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Shipping & Payment Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '0.88rem' }} className="summary-grid">
            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>Shipping Destination</h4>
              <p style={{ color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                <strong style={{ color: 'var(--color-ink)' }}>{order.customer?.fullName || 'Customer'}</strong><br />
                {order.customer?.businessName && <>{order.customer.businessName} {order.customer?.businessCategory && `(${order.customer.businessCategory})`}<br /></>}
                {order.customer?.addressLine}, {order.customer?.city}, {order.customer?.state} - {order.customer?.pinCode}<br />
                Phone: {order.customer?.phone}
              </p>
              {order.customer?.gstNumber && (
                <div style={{ marginTop: '0.4rem', fontSize: '0.8rem', color: '#1E293B', background: '#F1F5F9', padding: '0.35rem 0.65rem', borderRadius: '6px', display: 'inline-block' }}>
                  GSTIN: <strong>{order.customer.gstNumber}</strong> {order.customer.gstCompanyName ? `(${order.customer.gstCompanyName})` : ''}
                </div>
              )}
              {(order.customer?.googleReviewLink || order.customer?.instagramLink) && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.8rem', color: 'var(--color-brand-primary)' }}>
                  {order.customer?.googleReviewLink && <div>✓ Configured for: {order.customer.googleReviewLink}</div>}
                  {order.customer?.instagramLink && <div>✓ Instagram: {order.customer.instagramLink}</div>}
                </div>
              )}
            </div>

            <div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>Payment Details</h4>
              <p style={{ color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                Method: <strong>{order.paymentMethod || 'Online'}</strong><br />
                Status: <span style={{ color: 'var(--color-accent-green)', fontWeight: '800' }}>{order.paymentStatus || 'Confirmed'}</span><br />
                Gateway: {isCod ? 'Tapzyy Express COD' : 'Razorpay Express'}
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Order Alert Info Notice */}
        <div style={{ padding: '0.85rem 1.25rem', borderRadius: '16px', backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', fontSize: '0.88rem', fontWeight: '600', marginBottom: '2rem', textAlign: 'center' }}>
          ✓ Order notification dispatched to dispatch team (<span style={{ fontWeight: '700' }}>jenishrakholiya2005@gmail.com</span>). Your package is being prepared!
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/shop" className="btn btn-brand btn-lg" style={{ gap: '0.5rem' }}>
            Continue Shopping <ArrowRight size={18} />
          </Link>
          <button onClick={handlePrint} className="btn btn-secondary btn-lg" style={{ gap: '0.5rem' }}>
            <Printer size={18} /> Print Receipt
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .summary-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

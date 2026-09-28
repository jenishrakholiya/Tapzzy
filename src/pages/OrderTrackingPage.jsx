import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, CheckCircle2, AlertCircle } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useOrders } from '../context/OrderContext';

export const OrderTrackingPage = () => {
  const [searchParams] = useSearchParams();
  const { getOrderById, findOrdersByCustomer } = useOrders();

  const queryId = searchParams.get('id') || '';
  const [orderIdInput, setOrderIdInput] = useState(queryId);
  const [contactInput, setContactInput] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(() => queryId ? getOrderById(queryId) : null);
  const [searchedError, setSearchedError] = useState(null);
  const [lastQueryId, setLastQueryId] = useState(queryId);

  if (queryId !== lastQueryId) {
    setLastQueryId(queryId);
    setOrderIdInput(queryId);
    setSearchedOrder(queryId ? getOrderById(queryId) : null);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchedError(null);

    const cleanOrderId = orderIdInput.trim().replace(/^#/, '');
    const cleanContact = contactInput.trim();

    if (!cleanOrderId && !cleanContact) {
      setSearchedError("Please enter your Order ID (e.g. TPZ-84920) or your registered 10-digit mobile number / email address to track your package.");
      return;
    }

    let result = null;
    if (cleanOrderId) {
      result = getOrderById(cleanOrderId);
    }
    
    if (!result && cleanContact) {
      const list = findOrdersByCustomer(cleanContact);
      if (list.length > 0) {
        result = list[0];
      }
    }

    if (result) {
      setSearchedOrder(result);
    } else {
      setSearchedOrder(null);
      setSearchedError(`No order found matching "${cleanOrderId || cleanContact}". Please verify the details or try sample Order ID: TPZ-84920`);
    }
  };

  const statusSteps = [
    "Order Placed",
    "Payment Confirmed",
    "Processing",
    "Packed",
    "Shipped",
    "Out for Delivery",
    "Delivered"
  ];

  const getCurrentStepIndex = (status) => {
    const idx = statusSteps.indexOf(status);
    return idx >= 0 ? idx : 0;
  };

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6' }}>
      <SEOHead pageKey="trackOrder" title="Track Your Order | Tapzyy" description="Check step-by-step dispatch and courier delivery status for your Tapzyy order." />

      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.85rem' }}>Live Delivery Status</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>Order Tracking</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-soft)', lineHeight: '1.65' }}>
            Enter your Order ID (e.g. TPZ-84920) or your registered mobile number / email address.
          </p>
        </div>

        {/* Tracking Search Form */}
        <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)', borderRadius: '24px', marginBottom: '3rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
          <form onSubmit={handleSearch} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '1rem', alignItems: 'end' }} className="search-form-grid">
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                Order ID #
              </label>
              <input
                type="text"
                value={orderIdInput}
                onChange={(e) => setOrderIdInput(e.target.value)}
                placeholder="e.g. TPZ-84920"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                Mobile / Email
              </label>
              <input
                type="text"
                value={contactInput}
                onChange={(e) => setContactInput(e.target.value)}
                placeholder="Mobile or Email"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <button type="submit" className="btn btn-brand" style={{ padding: '0.75rem 1.5rem', gap: '0.4rem' }}>
              <Search size={18} /> Track
            </button>
          </form>

          {/* Preset Demo Shortcut */}
          <div style={{ marginTop: '1rem', fontSize: '0.82rem', color: 'var(--color-ink-soft)' }}>
            Quick Demo Search: <button type="button" onClick={() => { setOrderIdInput('TPZ-84920'); setSearchedOrder(getOrderById('TPZ-84920')); }} style={{ color: 'var(--color-brand-primary)', fontWeight: '700', textDecoration: 'underline', border: 'none', background: 'none', cursor: 'pointer' }}>Track #TPZ-84920</button>
          </div>
        </div>

        {searchedError && (
          <div style={{ padding: '1.25rem', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '16px', color: '#991B1B', fontSize: '0.9rem', marginBottom: '2rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <AlertCircle size={20} style={{ flexShrink: 0 }} />
            <span>{searchedError}</span>
          </div>
        )}

        {searchedOrder && (
          <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-line)' }}>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--color-line)', paddingBottom: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="badge badge-brand" style={{ marginBottom: '0.4rem' }}>{searchedOrder.orderStatus}</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--color-ink)' }}>Order #{searchedOrder.id}</h2>
                <div style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)' }}>
                  Placed on {new Date(searchedOrder.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-ink-soft)' }}>Courier Partner & AWB</div>
                <div style={{ fontWeight: '800', fontSize: '1rem', color: 'var(--color-brand-primary)' }}>
                  {searchedOrder.courierPartner} ({searchedOrder.trackingNumber || 'Pending Pickup'})
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', marginTop: '0.2rem' }}>
                  Est. Delivery: <strong>{searchedOrder.estimatedDelivery}</strong>
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--color-ink)' }}>Fulfillment Timeline</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem', position: 'relative' }}>
              {statusSteps.map((step, idx) => {
                const currentIdx = getCurrentStepIndex(searchedOrder.orderStatus);
                const isPassed = idx <= currentIdx;
                const isCurrent = idx === currentIdx;

                const historyItem = searchedOrder.history?.find(h => h.status === step);

                return (
                  <div key={idx} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                    <div style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '50%',
                      backgroundColor: isPassed ? 'var(--color-brand-primary)' : '#E2E8F0',
                      color: isPassed ? '#FFFFFF' : '#94A3B8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '800',
                      fontSize: '0.85rem',
                      flexShrink: 0,
                      boxShadow: isCurrent ? '0 0 0 4px rgba(0, 102, 255, 0.2)' : 'none'
                    }}>
                      {isPassed ? <CheckCircle2 size={18} /> : idx + 1}
                    </div>

                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: isCurrent ? '800' : isPassed ? '700' : '500', fontSize: '1rem', color: isPassed ? 'var(--color-ink)' : 'var(--color-ink-soft)' }}>
                        {step}
                      </div>
                      {historyItem ? (
                        <div style={{ fontSize: '0.82rem', color: 'var(--color-ink-soft)', marginTop: '0.15rem' }}>
                          {historyItem.note} • {new Date(historyItem.timestamp).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                        </div>
                      ) : (
                        <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>Pending step</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Items Summary in Order */}
            <div style={{ borderTop: '1px solid var(--color-line)', paddingTop: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--color-ink)' }}>Order Items</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                {searchedOrder.items.map((it, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-ink-soft)' }}>
                    <span>{it.name} × {it.quantity}</span>
                    <span style={{ fontWeight: '800', color: 'var(--color-ink)' }}>₹{(it.price * it.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      <style>{`
        @media (max-width: 640px) {
          .search-form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Banknote, 
  Lock, 
  X, 
  MapPin, 
  Truck, 
  Phone, 
  CreditCard, 
  QrCode, 
  Building, 
  ArrowRight,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export const RazorpayModal = ({ isOpen, onClose, amount, customerData, onPaymentSuccess }) => {
  const [selectedMethod, setSelectedMethod] = useState('cod'); // Exclusively COD enabled
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Handle Form Submission (Cash on Delivery exclusively enabled)
  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        paymentMethod: 'Cash on Delivery (COD)',
        paymentStatus: 'Pending (COD)',
        transactionId: `COD-${Math.floor(100000 + Math.random() * 900000)}`,
        gateway: 'Tapzyy Express COD'
      });
    }, 900);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(11, 18, 32, 0.72)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      zIndex: 100005,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(0.75rem, 3vw, 1.5rem)'
    }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        maxWidth: '540px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
        border: '1px solid #E2E8F0',
        animation: 'fadeIn 0.2s ease forwards'
      }} className="modal-container">
        
        {/* Header */}
        <div style={{
          backgroundColor: '#0B1220',
          color: '#FFFFFF',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              backgroundColor: 'rgba(0, 102, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38BDF8',
              flexShrink: 0
            }}>
              <ShieldCheck size={24} />
            </div>
            <div>
              <div style={{ fontSize: '1.05rem', fontWeight: '800', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
                Tapzyy Fast & Secure Checkout
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '0.35rem', marginTop: '2px' }}>
                <Lock size={11} /> 256-Bit SSL Encrypted • Pan-India Verified
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              color: '#94A3B8', 
              cursor: 'pointer', 
              padding: '0.35rem', 
              borderRadius: '50%',
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} 
            aria-label="Close payment modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Amount Due Bar */}
        <div style={{
          padding: '1rem 1.5rem',
          backgroundColor: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Total Payable Amount</div>
            <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: '700' }}>✓ Free Pan-India Express Delivery</div>
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: '900', color: '#0066FF', letterSpacing: '-0.02em' }}>
            ₹{Number(amount || 0).toLocaleString('en-IN')}
          </div>
        </div>

        {/* Payment Method Selector Tabs */}
        <div style={{ padding: '1.25rem 1.5rem 0.5rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0B1220', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Select Payment Method:
            </span>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#16A34A', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '0.2rem 0.55rem', borderRadius: '9999px' }}>
              Only COD Enabled
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '0.4rem',
            backgroundColor: '#F1F5F9',
            padding: '4px',
            borderRadius: '14px',
            marginBottom: '0.85rem'
          }}>
            {[
              { id: 'upi', label: 'UPI / QR', icon: QrCode, disabled: true },
              { id: 'card', label: 'Cards', icon: CreditCard, disabled: true },
              { id: 'netbanking', label: 'NetBank', icon: Building, disabled: true },
              { id: 'cod', label: 'COD Cash', icon: Banknote, disabled: false }
            ].map(tab => {
              const TabIcon = tab.icon;
              const isSelected = selectedMethod === tab.id;
              const isDisabled = tab.disabled;
              return (
                <button
                  key={tab.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => !isDisabled && setSelectedMethod(tab.id)}
                  style={{
                    padding: '0.65rem 0.35rem',
                    border: isSelected ? '1.5px solid #10B981' : 'none',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? '#FFFFFF' : 'transparent',
                    color: isSelected ? '#047857' : '#94A3B8',
                    fontWeight: isSelected ? '800' : '600',
                    fontSize: '0.78rem',
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    opacity: isDisabled ? 0.4 : 1,
                    boxShadow: isSelected ? '0 2px 6px rgba(0,0,0,0.06)' : 'none',
                    transition: 'all 0.15s ease'
                  }}
                  title={isDisabled ? "Online payment option disabled. Only Cash on Delivery is active." : "Cash on Delivery Active"}
                >
                  <TabIcon size={16} />
                  <span>{tab.label}</span>
                  {isDisabled && (
                    <span style={{ fontSize: '0.58rem', color: '#94A3B8', fontWeight: '700', lineHeight: 1, textTransform: 'uppercase' }}>
                      Disabled
                    </span>
                  )}
                  {isSelected && (
                    <span style={{ fontSize: '0.6rem', color: '#10B981', fontWeight: '800', lineHeight: 1, textTransform: 'uppercase' }}>
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Exclusive COD Notice */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.65rem 0.85rem',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            fontSize: '0.78rem',
            color: '#475569',
            marginBottom: '0.85rem',
            lineHeight: '1.4'
          }}>
            <span style={{ fontSize: '0.95rem' }}>ℹ️</span>
            <span>Online payments (UPI, Cards, NetBanking) are disabled. <strong>Only Cash on Delivery (COD) is enabled.</strong></span>
          </div>

          {/* TAB 1: UPI PAYMENT */}
          {selectedMethod === 'upi' && (
            <div style={{ padding: '0.5rem 0 1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: '#F8FAFC',
                borderRadius: '12px',
                border: '1px solid #E2E8F0'
              }}>
                <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#475569' }}>Supported Apps:</span>
                <span className="badge" style={{ backgroundColor: '#EFF6FF', color: '#0066FF', fontSize: '0.72rem' }}>Google Pay</span>
                <span className="badge" style={{ backgroundColor: '#FAF5FF', color: '#9333EA', fontSize: '0.72rem' }}>PhonePe</span>
                <span className="badge" style={{ backgroundColor: '#EFF6FF', color: '#0284C7', fontSize: '0.72rem' }}>Paytm</span>
                <span className="badge" style={{ backgroundColor: '#ECFDF5', color: '#059669', fontSize: '0.72rem' }}>BHIM UPI</span>
                <span className="badge" style={{ backgroundColor: '#FFFBEB', color: '#D97706', fontSize: '0.72rem' }}>CRED</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0B1220', marginBottom: '0.35rem' }}>
                  Enter Any UPI ID / VPA (Optional — or Pay with QR)
                </label>
                <input
                  type="text"
                  placeholder="e.g. yourname@okhdfcbank or 9876543210@paytm"
                  value={upiId}
                  onChange={(e) => { setUpiId(e.target.value); setUpiError(''); }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    border: upiError ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none',
                    backgroundColor: '#FFFFFF'
                  }}
                />
                {upiError && (
                  <div style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: '600', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <AlertCircle size={12} /> {upiError}
                  </div>
                )}
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.5', padding: '0.65rem 0.85rem', backgroundColor: '#F0FDF4', borderRadius: '10px', border: '1px solid #BBF7D0' }}>
                ⚡ <strong>Instant Confirmation:</strong> One-tap seamless payment verification with zero extra gateway fee.
              </div>
            </div>
          )}

          {/* TAB 2: CREDIT / DEBIT CARD */}
          {selectedMethod === 'card' && (
            <div style={{ padding: '0.5rem 0 1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0B1220', marginBottom: '0.35rem' }}>
                  Card Number
                </label>
                <input
                  type="text"
                  maxLength={19}
                  placeholder="4532 •••• •••• 8842"
                  value={cardData.number}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim();
                    setCardData({ ...cardData, number: val });
                    setCardError('');
                  }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '12px',
                    border: cardError ? '1.5px solid #EF4444' : '1.5px solid #CBD5E1',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0B1220', marginBottom: '0.35rem' }}>
                    Expiry (MM/YY)
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    placeholder="MM/YY"
                    value={cardData.expiry}
                    onChange={(e) => {
                      let val = e.target.value.replace(/\D/g, '');
                      if (val.length >= 2) val = `${val.slice(0, 2)}/${val.slice(2, 4)}`;
                      setCardData({ ...cardData, expiry: val });
                      setCardError('');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0B1220', marginBottom: '0.35rem' }}>
                    CVV / CVC
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    placeholder="3 or 4 digits"
                    value={cardData.cvv}
                    onChange={(e) => {
                      setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '') });
                      setCardError('');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.9rem',
                      borderRadius: '12px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              {cardError && (
                <div style={{ fontSize: '0.75rem', color: '#EF4444', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <AlertCircle size={12} /> {cardError}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                <Lock size={12} color="#10B981" /> Verified by Visa, MasterCard Identity Check, RuPay Secure
              </div>
            </div>
          )}

          {/* TAB 3: NETBANKING */}
          {selectedMethod === 'netbanking' && (
            <div style={{ padding: '0.5rem 0 1rem' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#0B1220', marginBottom: '0.5rem' }}>
                Choose Your Bank:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
                {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                  <button
                    key={bank}
                    type="button"
                    onClick={() => setSelectedBank(bank)}
                    style={{
                      padding: '0.65rem 0.75rem',
                      borderRadius: '10px',
                      border: selectedBank === bank ? '2px solid #0066FF' : '1px solid #CBD5E1',
                      backgroundColor: selectedBank === bank ? '#EFF6FF' : '#FFFFFF',
                      color: selectedBank === bank ? '#0066FF' : '#0B1220',
                      fontWeight: selectedBank === bank ? '800' : '600',
                      fontSize: '0.82rem',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: CASH ON DELIVERY */}
          {selectedMethod === 'cod' && (
            <div style={{ padding: '0.5rem 0 1rem' }}>
              <div style={{
                backgroundColor: '#ECFDF5',
                border: '1.5px solid #10B981',
                borderRadius: '16px',
                padding: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', color: '#065F46', fontSize: '0.92rem' }}>
                  <CheckCircle2 size={18} color="#10B981" /> 100% Cash On Delivery Available
                </div>
                <p style={{ fontSize: '0.82rem', color: '#047857', marginTop: '0.4rem', lineHeight: '1.5', margin: 0 }}>
                  Zero advance payment required! Pay <strong>₹{Number(amount || 0).toLocaleString('en-IN')}</strong> in cash directly to the courier executive when your order arrives.
                </p>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#64748B', lineHeight: '1.4' }}>
                • Please ensure a contact person is available at <strong>{customerData?.phone}</strong> on delivery day.
              </div>
            </div>
          )}

          {/* Delivery Snapshot Footer */}
          <div style={{
            padding: '0.75rem 1rem',
            backgroundColor: '#F8FAFC',
            borderRadius: '12px',
            border: '1px solid #E2E8F0',
            fontSize: '0.8rem',
            color: '#475569',
            marginBottom: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Truck size={13} color="#0066FF" />
              <span>Shipping to: <strong>{customerData?.fullName || 'Customer'}</strong></span>
            </div>
            <div style={{ color: '#64748B', fontSize: '0.76rem', paddingLeft: '1.2rem' }}>
              {customerData?.addressLine || 'Shipping Address'}, {customerData?.city || ''} - {customerData?.pinCode || ''}
            </div>
          </div>

          {/* Action Button */}
          <form onSubmit={handleSubmitPayment}>
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '0.95rem 1.25rem',
                backgroundColor: isProcessing ? '#94A3B8' : '#10B981',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '1rem',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                border: 'none',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                boxShadow: isProcessing ? 'none' : '0 4px 16px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.18s ease'
              }}
            >
              {isProcessing ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid #FFFFFF',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span>Placing Order via Cash on Delivery...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>Confirm Cash on Delivery (₹{Number(amount || 0).toLocaleString('en-IN')})</span>
                </>
              )}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: '0.74rem', color: '#64748B', marginTop: '0.75rem', paddingBottom: '0.5rem' }}>
            ✓ 100% Cash on Delivery Active • Zero Advance Payment Required
          </div>

        </div>

      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default RazorpayModal;

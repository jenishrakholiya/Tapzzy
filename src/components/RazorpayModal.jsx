import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Banknote, Lock, X, MapPin, Truck, Phone } from 'lucide-react';

export const RazorpayModal = ({ isOpen, onClose, amount, customerData, onPaymentSuccess }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirmCod = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        paymentMethod: 'Cash on Delivery (COD)',
        paymentStatus: 'Pending (COD)',
        transactionId: `cod_${Math.random().toString(36).substr(2, 9)}`,
        gateway: 'Tapzyy Express COD'
      });
    }, 1200);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.75rem'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        maxWidth: '520px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
        border: '1px solid #E2E8F0',
        animation: 'fadeIn 0.25s ease'
      }} className="modal-container">
        
        {/* Header */}
        <div style={{
          backgroundColor: '#0c2340',
          color: '#ffffff',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          zIndex: 10
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              backgroundColor: 'rgba(56, 189, 248, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '1rem', fontWeight: '800', letterSpacing: '-0.01em' }}>
                Tapzyy Secure Checkout
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Lock size={12} /> 100% Verified Pan-India Delivery
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            style={{ 
              color: '#94a3b8', 
              cursor: 'pointer', 
              padding: '0.4rem', 
              borderRadius: '50%',
              background: 'none',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} 
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        {/* WE TRUST YOU COD BANNER */}
        <div style={{
          backgroundColor: '#ECFDF5',
          borderBottom: '1px solid #A7F3D0',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          fontSize: '0.85rem',
          color: '#065F46',
          lineHeight: '1.45'
        }}>
          <CheckCircle2 size={22} color="#10B981" style={{ flexShrink: 0 }} />
          <div>
            <strong style={{ color: '#047857', display: 'inline-block', marginRight: '6px' }}>
              WE TRUST YOU:
            </strong>
            Zero advance payment required! Pay in cash when your custom card arrives at your doorstep.
          </div>
        </div>

        {/* Body Content */}
        <div style={{ padding: '1.5rem' }}>
          
          {/* Selected Method Pill: Cash on Delivery ONLY */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1rem 1.25rem',
            backgroundColor: '#F0FDF4',
            border: '2px solid #10B981',
            borderRadius: '16px',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                backgroundColor: '#10B981',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)'
              }}>
                <Banknote size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                  <span style={{ fontWeight: '800', fontSize: '0.98rem', color: '#047857' }}>
                    Cash on Delivery (COD)
                  </span>
                  <span style={{
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    fontSize: '0.62rem',
                    fontWeight: '800',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    ACTIVE
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#065F46', marginTop: '2px' }}>
                  Pay cash directly to courier agent upon parcel arrival
                </div>
              </div>
            </div>
            <CheckCircle2 size={20} color="#10B981" />
          </div>

          {/* Amount Due Box */}
          <div style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '16px',
            padding: '1.15rem 1.25rem',
            marginBottom: '1.25rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px dashed #CBD5E1' }}>
              <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600' }}>
                Total Payable Amount
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: '850', color: '#0066FF', letterSpacing: '-0.02em' }}>
                ₹{amount?.toLocaleString('en-IN')}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.82rem', color: '#475569' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Truck size={14} color="#0066FF" />
                <span>Pan-India Express Courier (2–5 Business Days)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <Phone size={14} color="#0066FF" />
                <span>Delivery updates will be sent to: <strong>{customerData?.phone}</strong></span>
              </div>
              {customerData?.addressLine && (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', marginTop: '2px' }}>
                  <MapPin size={14} color="#0066FF" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>
                    {customerData?.addressLine}, {customerData?.city}, {customerData?.state} - <strong>{customerData?.pinCode}</strong>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* COD Notice List */}
          <div style={{
            backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A',
            borderRadius: '14px',
            padding: '0.85rem 1rem',
            fontSize: '0.78rem',
            color: '#92400E',
            marginBottom: '1.5rem',
            lineHeight: '1.5'
          }}>
            <div style={{ fontWeight: '800', color: '#78350F', marginBottom: '0.2rem' }}>
              Important COD Instructions:
            </div>
            <div>• Please keep exact cash of <strong>₹{amount?.toLocaleString('en-IN')}</strong> ready at the time of delivery.</div>
            <div>• Our delivery partner will provide an official physical printed receipt upon cash handover.</div>
          </div>

          {/* Confirm Button */}
          <form onSubmit={handleConfirmCod}>
            <button
              type="submit"
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: isProcessing ? '#94A3B8' : '#10B981',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '1.05rem',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                border: 'none',
                cursor: isProcessing ? 'not-allowed' : 'pointer',
                boxShadow: isProcessing ? 'none' : '0 4px 16px rgba(16, 185, 129, 0.4)',
                transition: 'all 0.2s ease'
              }}
            >
              {isProcessing ? (
                <>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid #ffffff',
                    borderTopColor: 'transparent',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }} />
                  <span>Confirming Your COD Order...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 size={20} />
                  <span>Confirm Cash on Delivery Order</span>
                </>
              )}
            </button>
          </form>

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

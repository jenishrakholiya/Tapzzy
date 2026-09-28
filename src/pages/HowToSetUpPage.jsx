import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const HowToSetUpPage = () => {
  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6' }}>
      <SEOHead pageKey="howToSetUp" />

      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 4rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.85rem' }}>Practical Business Guide</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>How to Set Up Your Tapzyy Cards</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--color-ink-soft)', lineHeight: '1.65' }}>
            Follow these practical steps to position, configure, test, and maintain your Tapzyy growth system.
          </p>
        </div>

        {/* Step-by-Step Setup Instructions */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          <div className="card" style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--color-brand-primary)', color: '#FFFFFF', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                1
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-ink)' }}>Counter Placement</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
              Place the product on a counter, table, reception desk, checkout area, or service station where customers pause. Ensure it is prominently visible and within easy physical reach.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--color-brand-primary)', color: '#FFFFFF', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                2
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-ink)' }}>Connect Destination Link</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
              Add or link your official Google Place ID / Google Review link or Instagram business handle. Ensure the link points directly to the review form or social page.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--color-brand-primary)', color: '#FFFFFF', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                3
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-ink)' }}>Test Before Daily Use</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
              Test both NFC tap and QR scan functionality with your own smartphone before putting the card into live customer service to verify the target link opens correctly.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--color-brand-primary)', color: '#FFFFFF', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                4
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-ink)' }}>Train Counter Staff</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
              Brief your team to warmly invite satisfied customers: <em>"If you enjoyed your experience, please feel free to tap your phone here to leave us a quick review!"</em>
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--color-brand-primary)', color: '#FFFFFF', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                5
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-ink)' }}>Card Care & Hygiene</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
              Keep your 4mm acrylic card wiped clean with a soft microfiber cloth. Ensure the QR code area remains free of dust or physical obstruction.
            </p>
          </div>

          <div className="card" style={{ padding: '2rem', borderRadius: '24px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'var(--color-brand-primary)', color: '#FFFFFF', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                6
              </div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-ink)' }}>Realistic Business Expectations</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
              Tapzyy cards make connecting effortless, but genuine customer reviews depend on delivering great local products and memorable customer service.
            </p>
          </div>
        </div>

        {/* Troubleshooting Section */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: 'clamp(1.25rem, 4vw, 2.5rem)',
          border: '1px solid var(--color-line)',
          maxWidth: '900px',
          margin: '0 auto 4rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Wrench size={24} color="var(--color-brand-primary)" />
            <h2 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-ink)' }}>Troubleshooting Guide</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-line)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>
                1. What if NFC does not trigger on a phone?
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                Check if NFC is turned ON in the phone's settings (on Android under Connections &gt; NFC). Ensure phone screen is unlocked.
              </p>
            </div>

            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-line)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>
                2. Where should the phone touch the card?
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                On iPhones, the NFC transmitter is located at the top rear edge. On Android, it is usually in the middle back area. Tap the phone firmly against the center of the card.
              </p>
            </div>

            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-line)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>
                3. What if a thick phone case blocks the signal?
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                Extremely thick metal-plated or heavy armor cases can dampen NFC waves. Ask the customer to tilt their phone or use the front QR code instead.
              </p>
            </div>

            <div style={{ paddingBottom: '1rem', borderBottom: '1px solid var(--color-line)' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>
                4. What if the QR code does not open?
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                Ensure good lighting over the counter and check that the customer camera lens is clean.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.3rem', color: 'var(--color-ink)' }}>
                5. What if the link destination needs updating?
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                Verify your Google Business Profile URL format in Google Maps to ensure valid direct redirection.
              </p>
            </div>
          </div>
        </div>

        {/* Action Link */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/contact" className="btn btn-secondary">
            Need Support Assistance? Contact Us
          </Link>
        </div>

      </div>
    </div>
  );
};

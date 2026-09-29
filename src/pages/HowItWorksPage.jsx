import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  ArrowRight, 
  Smartphone, 
  Zap, 
  QrCode, 
  CheckCircle, 
  Sparkles, 
  Star
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { TrustedByMarquee } from '../components/TrustedByMarquee';

export const HowItWorksPage = () => {

  const steps = [
    {
      num: "01",
      title: "Place Your Tapzyy Card",
      desc: "Keep your card where customers naturally interact with your business.",
      detail: "Position your 4mm heavy-duty acrylic card at high-touch areas such as billing counters, checkout desks, dining tables, or reception areas.",
      icon: Smartphone,
      color: "#0066FF",
      bg: "#EBF3FF"
    },
    {
      num: "02",
      title: "Customer Taps or Scans",
      desc: "One tap with NFC or one QR scan takes them to your selected destination.",
      detail: "Customers holding an NFC-enabled smartphone simply tap the card. If NFC is unavailable or disabled, pointing any phone camera at the QR code works as a seamless backup.",
      icon: QrCode,
      color: "#0284C7",
      bg: "#E0F2FE"
    },
    {
      num: "03",
      title: "Customer Shares Their Experience",
      desc: "Customers can leave genuine feedback based on their actual experience.",
      detail: "Their phone opens your official Google Review page or Instagram profile directly without typing website URLs or searching manual business names.",
      icon: Star,
      color: "#F59E0B",
      bg: "#FEF3C7"
    }
  ];

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6' }}>
      <SEOHead pageKey="howItWorks" />

      <div className="container">
        {/* HERO SECTION WITH VIDEO */}
        <div style={{ textAlign: 'center', maxWidth: '960px', margin: '0 auto 4.5rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={14} />
            Reputation Growth Workflow
          </span>

          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-ink)', letterSpacing: '-0.02em', lineHeight: 1.18 }}>
            From Customer Interaction to Online Reputation.
          </h1>

          <p style={{ fontSize: '1.125rem', color: 'var(--color-ink-soft)', lineHeight: '1.65', maxWidth: '720px', margin: '0 auto 2rem' }}>
            A simple, 3-step offline-to-online journey that helps local businesses build genuine customer trust and digital presence.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-brand btn-lg" style={{ gap: '0.5rem' }}>
              Shop Tapzyy Cards <ShoppingBag size={18} />
            </Link>
            <a href="#steps-flow" className="btn btn-secondary btn-lg" style={{ gap: '0.5rem' }}>
              See 3-Step Flow <ArrowRight size={18} />
            </a>
          </div>

          {/* HERO VIDEO SHOWCASE */}
          <div className="how-hero-video-card" style={{
            position: 'relative',
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            padding: '1.5rem',
            boxShadow: '0 20px 48px -12px rgba(0, 102, 255, 0.14), 0 4px 16px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'relative',
              borderRadius: '32px',
              overflow: 'hidden',
              backgroundColor: '#080E1A',
              boxShadow: '0 20px 48px -10px rgba(0, 102, 255, 0.28), 0 4px 16px rgba(0, 0, 0, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: '280px',
              aspectRatio: '9 / 18.5',
              maxHeight: '460px',
              margin: '0 auto',
              border: '7px solid #0F172A'
            }}>
              {/* Phone Notch */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '14px',
                backgroundColor: '#0F172A',
                borderBottomLeftRadius: '10px',
                borderBottomRightRadius: '10px',
                zIndex: 10
              }} />

              <video
                src="/videos/tapzyy-demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/tapzyy-counter-hero.jpg"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {/* Micro Badges Under Video */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 0.75rem 0.25rem',
              flexWrap: 'wrap',
              gap: '0.75rem',
              fontSize: '0.85rem',
              color: 'var(--color-ink-soft)'
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <Zap size={16} color="var(--color-brand-primary)" /> Instant NFC tap & QR scan in action
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontWeight: 600 }}>
                <CheckCircle size={16} color="#10B981" /> No app installation required for customers
              </span>
            </div>
          </div>
        </div>

        {/* TRUSTED BY MARQUEE (500+ LOCAL BUSINESSES USE TAPZYY) */}
        <div style={{ marginBottom: '4rem', borderRadius: '24px', overflow: 'hidden' }}>
          <TrustedByMarquee />
        </div>

        {/* 3 Step Visual Flow */}
        <div id="steps-flow" style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', maxWidth: '900px', margin: '0 auto 5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <span className="badge badge-brand" style={{ marginBottom: '0.5rem' }}>Simple 3-Step Journey</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', fontWeight: '800', color: 'var(--color-ink)' }}>
              How It Works From Start to Finish
            </h2>
          </div>

          {steps.map((step, idx) => {
            const IconComp = step.icon;
            return (
              <div
                key={idx}
                className="card card-hover step-flow-card"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: '1.75rem',
                  alignItems: 'center',
                  padding: '2.25rem',
                  borderRadius: '24px',
                  boxShadow: 'var(--shadow-sm)',
                  border: '1px solid var(--color-line)',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '20px',
                  background: step.bg,
                  color: step.color,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '900', lineHeight: 1 }}>{step.num}</span>
                  <IconComp size={16} style={{ marginTop: '3px' }} />
                </div>
                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.06em', color: step.color, marginBottom: '0.35rem' }}>
                    Step {step.num}
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '1rem', fontWeight: '600', color: 'var(--color-ink)', marginBottom: '0.4rem', lineHeight: '1.5' }}>
                    {step.desc}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Device Compatibility Box */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '2.5rem',
          border: '1px solid var(--color-line)',
          maxWidth: '900px',
          margin: '0 auto 4rem',
          boxShadow: 'var(--shadow-md)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Zap size={24} color="var(--color-brand-primary)" />
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--color-ink)' }}>Honest device compatibility guide</h3>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-ink-soft)', lineHeight: '1.6', marginBottom: '1.25rem' }}>
            NFC tap functionality requires built-in hardware support on the customer's smartphone.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }} className="compat-grid">
            <div style={{ background: 'var(--color-fog)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--color-line)' }}>
              <div style={{ fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>iPhone (iOS)</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                NFC reading is automatically active on iPhone 7 and newer (iOS 14+). No extra settings required.
              </p>
            </div>

            <div style={{ background: 'var(--color-fog)', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--color-line)' }}>
              <div style={{ fontWeight: '800', fontSize: '0.95rem', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>Android Phones</div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                Supported on most modern Android devices. Ensure 'NFC' is turned ON in phone settings.
              </p>
            </div>
          </div>

          <div style={{
            marginTop: '1.5rem',
            padding: '1rem 1.25rem',
            background: 'rgba(0, 102, 255, 0.05)',
            borderRadius: '14px',
            border: '1px solid rgba(0, 102, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.88rem',
            color: 'var(--color-brand-primary)'
          }}>
            <QrCode size={20} style={{ flexShrink: 0 }} />
            <span><strong>Always Backup Covered:</strong> If a customer has NFC disabled or uses an older phone model, the printed QR code works seamlessly with any default camera app.</span>
          </div>
        </div>

        {/* Action CTA */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.6rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-ink)' }}>Ready to equip your business counter?</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-brand btn-lg" style={{ gap: '0.5rem' }}>
              Shop Products <ShoppingBag size={18} />
            </Link>
            <Link to="/ai-suite" className="btn btn-secondary btn-lg">
              Explore AI Review Suite
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .step-flow-card {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
            padding: 1.5rem !important;
          }
          .compat-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
export default HowItWorksPage;

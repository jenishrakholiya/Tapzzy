import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Smartphone, QrCode, MessageSquare, Star, TrendingUp } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const AboutPage = () => {
  const pillars = [
    {
      icon: Smartphone,
      title: "NFC Technology",
      desc: "Fast, contactless tap connection built natively into modern iOS and Android smartphones."
    },
    {
      icon: QrCode,
      title: "QR Access",
      desc: "High-contrast laser printed backup ensuring every customer can connect effortlessly via their camera."
    },
    {
      icon: Star,
      title: "Google Review Workflows",
      desc: "Direct link execution that cuts out manual searching and typing friction at the counter."
    },
    {
      icon: Sparkles,
      title: "AI Review Assistance",
      desc: "Helping customers organize their genuine visit thoughts into clear, natural review text."
    },
    {
      icon: MessageSquare,
      title: "AI Response Assistance",
      desc: "Helping store owners draft Warm, Professional, and Concise replies to stay responsive."
    },
    {
      icon: TrendingUp,
      title: "Instagram Customer Connection",
      desc: "Converting offline store visits into direct profile visits and long-term community relationships."
    }
  ];

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6' }}>
      <SEOHead pageKey="about" />

      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.85rem' }}>Our Purpose</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: '900', marginBottom: '1rem', color: 'var(--color-ink)', letterSpacing: '-0.025em' }}>
            We Don't Want to Sell You Another Card.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--color-brand-primary)', fontWeight: '700', lineHeight: '1.5' }}>
            We want to make customer growth easier.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)', borderRadius: '24px', marginBottom: '3.5rem', lineHeight: '1.8', fontSize: '1.05rem', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
          <p style={{ marginBottom: '1.5rem', color: 'var(--color-ink)', fontWeight: '700', fontSize: '1.15rem' }}>
            Tapzyy was created around a simple problem:
          </p>
          <p style={{ marginBottom: '1.5rem', color: 'var(--color-ink-soft)', fontSize: '1.08rem' }}>
            <strong>Businesses interact with customers every day, but turning those interactions into online reputation and customer connections often takes too much effort.</strong>
          </p>
          <p style={{ marginBottom: '1.5rem', color: 'var(--color-ink-soft)' }}>
            Across India, independent retail counters, cafés, salons, clinics, and local service businesses provide memorable customer experiences daily. Yet happy customers walk out without reviewing, following, or reconnecting simply because the process has too many steps.
          </p>
          <p style={{ color: 'var(--color-ink-soft)' }}>
            Tapzyy connects the physical customer experience with the digital business presence. By removing the friction of manual searching, typing, and URL copying, we make it simple for willing customers to support the businesses they love.
          </p>
        </div>

        {/* System Pillars */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="badge badge-ink" style={{ marginBottom: '0.5rem' }}>Comprehensive Approach</span>
          <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--color-ink)' }}>Our System Combines</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
          {pillars.map((pillar, idx) => {
            const IconComp = pillar.icon;
            return (
              <div key={idx} className="card card-hover" style={{ padding: '1.75rem', borderRadius: '20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-line)', backgroundColor: '#FFFFFF' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--color-brand-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <IconComp size={22} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Motto Card */}
        <div style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, #0B1220 0%, #0066FF 100%)',
          color: '#FFFFFF',
          borderRadius: '24px',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.25rem, 4vw, 2rem)',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: '3rem'
        }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#00C6FF', marginBottom: '0.75rem' }}>
            The Tapzyy Philosophy
          </div>
          <h3 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: '900', marginBottom: '0.75rem', lineHeight: '1.25' }}>
            The card is the touchpoint.<br />The goal is business growth.
          </h3>
          <p style={{ fontSize: '1.05rem', color: '#CBD5E1', maxWidth: '600px', margin: '0 auto 2rem' }}>
            You’re not buying a piece of acrylic. You’re adopting an offline-to-online reputation system that helps turn everyday interactions into customer trust.
          </p>
          <Link to="/shop" className="btn btn-lg" style={{ backgroundColor: '#FFFFFF', color: '#0B1220', fontWeight: '800', gap: '0.5rem' }}>
            Shop Tapzyy Products <ArrowRight size={18} />
          </Link>
        </div>

      </div>
    </div>
  );
};

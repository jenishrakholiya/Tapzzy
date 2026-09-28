import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Shield, Truck } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #005CE6 0%, #0044B3 100%)',
      color: '#FFFFFF',
      paddingTop: '4.5rem',
      paddingBottom: '3.5rem',
      marginTop: '6rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.15)'
    }}>
      <div className="container">
        {/* Trust Badges Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
          gap: '1.5rem',
          paddingBottom: '3.5rem',
          marginBottom: '3.5rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.18)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.15rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
              <Shield size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFFFFF' }}>4mm Premium Acrylic</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)' }}>Durable & counter-ready</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.15rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
              <Zap size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFFFFF' }}>Instant NFC + QR</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)' }}>No app required for tap or scan</div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem 1.15rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            backdropFilter: 'blur(8px)'
          }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF', flexShrink: 0 }}>
              <Truck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#FFFFFF' }}>Pan-India Express</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.85)' }}>Fast dispatch & trackable</div>
            </div>
          </div>


        </div>

        {/* Footer Navigation Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem'
        }}>
          {/* Brand Info */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none', marginBottom: '1.2rem' }}>
              <img
                src="/logo.png"
                alt="Tapzyy Logo"
                style={{
                  height: '38px',
                  width: 'auto',
                  borderRadius: '50%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              />
              <span style={{ fontSize: '1.4rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                Tapzyy<span style={{ color: '#FDE047' }}>.</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.2rem', color: 'rgba(255, 255, 255, 0.9)' }}>
              Turn everyday customer interactions into genuine reviews, stronger online reputation, and better customer engagement. The card is the touchpoint; the system is business growth.
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.75)' }}>
              Made with pride for local retail, dining, salons, clinics, and professional services across India.
            </p>
          </div>

          {/* Products Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Products
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }} className="footer-links">
              <li>
                <Link to="/product/google-review-card">Google Review NFC Card — ₹1,999</Link>
              </li>
              <li>
                <Link to="/product/instagram-card">Instagram NFC Card — ₹1,999</Link>
              </li>
              <li>
                <Link to="/product/combo" style={{ color: '#FDE047', fontWeight: '700' }}>Google + Instagram Combo — ₹2,999</Link>
              </li>
              <li>
                <Link to="/shop">Shop All Products</Link>
              </li>
              <li>
                <Link to="/cart">View Cart</Link>
              </li>
            </ul>
          </div>

          {/* Business Growth Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Resources
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }} className="footer-links">
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/ai-suite">AI Review Suite</Link></li>
              <li><Link to="/faq">Frequently Asked Questions</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><a href="mailto:Tapzyy.in@gmail.com" style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.82rem' }}>email - Tapzyy.in@gmail.com</a></li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }} className="footer-links">
              <li><Link to="/shop">Shop Products</Link></li>
              <li><Link to="/cart">View Shopping Cart</Link></li>
              <li><Link to="/admin" style={{ color: 'rgba(255, 255, 255, 0.65)' }}>Admin Dashboard</Link></li>
            </ul>
          </div>

          {/* Legal Policies Column */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#FFFFFF', marginBottom: '1.25rem', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Policies & Legal
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }} className="footer-links">
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy">Shipping Policy</Link></li>
              <li><Link to="/refund-policy">Refund & Cancellation</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(255, 255, 255, 0.18)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.82rem'
        }}>
          <div style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            © {new Date().getFullYear()} Tapzyy Technologies India.
          </div>

        </div>
      </div>

      <style>{`
        .footer-links a {
          color: rgba(255, 255, 255, 0.85);
          transition: color 0.18s ease, padding-left 0.18s ease;
          display: inline-block;
        }
        .footer-links a:hover {
          color: #FFFFFF;
          padding-left: 4px;
        }
      `}</style>
    </footer>
  );
};

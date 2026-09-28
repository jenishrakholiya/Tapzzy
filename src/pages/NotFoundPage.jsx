import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Home, HelpCircle, ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const NotFoundPage = () => {
  return (
    <div style={{
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '48px 20px',
      background: 'radial-gradient(ellipse at top, rgba(99, 102, 241, 0.08) 0%, transparent 70%)'
    }}>
      <SEOHead
        title="404 Page Not Found | Tapzyy"
        description="The page you are looking for does not exist on Tapzyy."
      />

      <div style={{
        maxWidth: '560px',
        width: '100%',
        textAlign: 'center',
        padding: '40px 28px',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'rgba(255, 255, 255, 0.02)',
        backdropFilter: 'blur(12px)'
      }}>
        {/* Glowing 404 Number */}
        <div style={{
          fontSize: 'clamp(72px, 15vw, 110px)',
          fontWeight: 900,
          fontFamily: "'Outfit', sans-serif",
          lineHeight: 1,
          letterSpacing: '-0.04em',
          background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '16px'
        }}>
          404
        </div>

        <h1 style={{
          fontSize: '24px',
          fontWeight: 700,
          marginBottom: '12px',
          fontFamily: "'Outfit', sans-serif",
          color: 'var(--text-main, #ffffff)'
        }}>
          Page Lost in Orbit
        </h1>

        <p style={{
          fontSize: '15px',
          color: 'var(--text-muted, #94a3b8)',
          lineHeight: 1.6,
          marginBottom: '32px'
        }}>
          The page you requested could not be found or has moved. Explore our smart NFC cards or head back to the storefront.
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center'
        }}>
          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 24px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
              color: '#ffffff',
              fontWeight: 600,
              fontSize: '14px',
              textDecoration: 'none',
              boxShadow: '0 8px 20px -4px rgba(99, 102, 241, 0.4)'
            }}
          >
            <ShoppingBag size={17} />
            Explore Shop
            <ArrowRight size={15} />
          </Link>

          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-main, #ffffff)',
              fontWeight: 500,
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            <Home size={17} />
            Back to Home
          </Link>

          <Link
            to="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 20px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              color: 'var(--text-muted, #94a3b8)',
              fontWeight: 500,
              fontSize: '14px',
              textDecoration: 'none'
            }}
          >
            <HelpCircle size={17} />
            Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';

export const ShopPage = () => {
  const { addToCart } = useCart();
  const { activeProducts, products } = useAdmin();
  const [sortBy, setSortBy] = useState('featured');

  // Filter active products
  const productList = products || PRODUCTS;
  const visibleProducts = productList.filter(p => activeProducts[p.id] !== false);

  const sortedProducts = [...visibleProducts].sort((a, b) => {
    if (sortBy === 'low-to-high') return a.price - b.price;
    if (sortBy === 'high-to-low') return b.price - a.price;
    return 0; // featured default
  });

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FFFFFF' }}>
      <SEOHead pageKey="shop" />

      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.9rem' }}>
            Official Tapzyy Store
          </span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', marginBottom: '1rem', letterSpacing: '-0.025em', color: 'var(--color-ink)' }}>
            Smart tools for smarter local businesses.
          </h1>
          <p style={{ fontSize: '1.08rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
            Elevate your retail counters, reception desks, and checkout stations with simple, durable NFC and QR growth cards.
          </p>
        </div>

        {/* 21.dev Catalog Control Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--color-line)',
          boxShadow: 'var(--shadow-xs)',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-ink-soft)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Filter size={18} color="var(--color-brand-primary)" /> Showing {sortedProducts.length} Smart Growth Products
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <label htmlFor="sort" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-ink-soft)' }}>Sort by:</label>
            <select
              id="sort"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-line)',
                backgroundColor: 'var(--color-fog)',
                fontSize: '0.88rem',
                fontWeight: '600',
                color: 'var(--color-ink)',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="featured">Featured</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 21.dev Product Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.75rem'
        }}>
          {sortedProducts.map((prod) => (
            <div
              key={prod.id}
              className="card card-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                border: prod.isCombo ? '2px solid var(--color-brand-primary)' : '1px solid var(--color-line)',
                backgroundColor: '#FFFFFF',
                boxShadow: prod.isCombo ? '0 12px 28px -4px rgba(0, 102, 255, 0.18)' : 'var(--shadow-xs)'
              }}
            >
              {prod.isCombo && (
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  border: '1px solid rgba(217, 119, 6, 0.3)',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  letterSpacing: '0.04em'
                }}>
                  Best Value
                </div>
              )}

              <div style={{
                height: '240px',
                borderRadius: '14px',
                overflow: 'hidden',
                marginBottom: '1.25rem',
                backgroundColor: 'var(--color-fog)',
                border: '1px solid var(--color-line)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.25rem',
                position: 'relative'
              }}>
                {prod.isCombo ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', width: '100%', height: '100%' }}>
                    <img
                      src="/assets/google.png"
                      alt="Google Review NFC Card"
                      style={{ maxHeight: '180px', width: '45%', objectFit: 'contain', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.08))', transition: 'transform 0.2s ease' }}
                    />
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-brand-primary)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: '900',
                      fontSize: '1rem',
                      flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0, 102, 255, 0.4)',
                      zIndex: 2
                    }}>
                      +
                    </div>
                    <img
                      src="/assets/instagram.png"
                      alt="Instagram NFC Card"
                      style={{ maxHeight: '180px', width: '45%', objectFit: 'contain', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.08))', transition: 'transform 0.2s ease' }}
                    />
                  </div>
                ) : (
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ maxHeight: '100%', objectFit: 'contain', filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.08))' }}
                  />
                )}
              </div>

              <h2 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', color: 'var(--color-ink)', fontWeight: '800' }}>{prod.name}</h2>
              <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', marginBottom: '1.25rem', flexGrow: 1, lineHeight: '1.55' }}>
                {prod.shortDescription}
              </p>

              {/* Specs pill preview */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                <span className="badge badge-neutral" style={{ textTransform: 'none', fontWeight: '600' }}>
                  4mm Acrylic
                </span>
                <span className="badge badge-neutral" style={{ textTransform: 'none', fontWeight: '600' }}>
                  NFC + QR Code
                </span>
                <span className="badge badge-neutral" style={{ textTransform: 'none', fontWeight: '600' }}>
                  No App Required
                </span>
              </div>

              {/* Pricing */}
              <div style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-ink)' }}>
                  ₹{prod.price.toLocaleString('en-IN')}
                </span>
                {prod.originalPrice && prod.originalPrice > prod.price && (
                  <>
                    <span style={{ fontSize: '1rem', textDecoration: 'line-through', color: 'var(--color-ink-soft)' }}>
                      ₹{prod.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-google-green)' }}>
                      Save ₹{((prod.savings != null ? prod.savings : (prod.originalPrice - prod.price)) || 0).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>

              <div className="shop-card-actions">
                <Link to={`/product/${prod.slug}`} className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
                  View Details
                </Link>
                <button
                  onClick={() => addToCart(prod)}
                  className="btn btn-brand btn-sm"
                  style={{ width: '100%' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .shop-card-actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }
        @media (max-width: 380px) {
          .shop-card-actions {
            grid-template-columns: 1fr;
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};


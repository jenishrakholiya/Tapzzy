import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ShieldCheck, ChevronDown, ArrowRight, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { AnnouncementBar } from './AnnouncementBar';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItemCount } = useCart();
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
  }

  const isActive = (path) => location.pathname === path;

  // Track scroll position to enhance sticky header elevation & blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <AnnouncementBar />
      <header
        className="navbar-sticky"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: mobileMenuOpen ? 100005 : (isScrolled ? 99999 : 9999),
          backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.92)' : '#FFFFFF',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled ? '1px solid rgba(226, 232, 240, 0.85)' : '1px solid var(--color-line)',
          boxShadow: isScrolled ? '0 4px 20px -2px rgba(11, 18, 32, 0.08)' : 'none',
          transition: 'all 0.25s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 'var(--navbar-height, 70px)' }}>
          {/* Brand Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
            <img
              src="/logo.png"
              alt="Tapzyy Logo"
              style={{
                height: '38px',
                width: 'auto',
                borderRadius: '50%',
                boxShadow: '0 4px 14px rgba(0, 102, 255, 0.22)',
                transition: 'transform 0.2s ease'
              }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.35rem', fontWeight: '800', fontFamily: 'var(--font-heading)', color: 'var(--color-ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                Tapzyy<span style={{ color: 'var(--color-brand-primary)' }}>.</span>
              </span>
              <span style={{ fontSize: '0.6rem', fontWeight: '700', color: 'var(--color-ink-light)', letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '2px' }}>
                Smart Growth
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
            {/* Products Modern Dropdown */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setProductsDropdownOpen(true)}
              onMouseLeave={() => setProductsDropdownOpen(false)}
            >
              <Link
                to="/shop"
                style={{
                  fontSize: '0.92rem',
                  fontWeight: isActive('/shop') ? '700' : '600',
                  color: isActive('/shop') ? 'var(--color-brand-primary)' : 'var(--color-text-main)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.4rem 0.6rem',
                  borderRadius: 'var(--radius-sm)',
                  transition: 'all 0.15s ease'
                }}
              >
                Products <ChevronDown size={14} style={{ transform: productsDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s ease' }} />
              </Link>

              {productsDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  left: '-10px',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--color-line)',
                  borderRadius: '16px',
                  boxShadow: 'var(--shadow-xl)',
                  padding: '0.65rem',
                  minWidth: '260px',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                  animation: 'fadeIn 0.2s ease forwards'
                }}>
                  <Link
                    to="/product/google-review-card"
                    style={{
                      padding: '0.65rem 0.9rem',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      color: 'var(--color-ink)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.15s ease'
                    }}
                    className="dropdown-item"
                  >
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      <img src="/assets/icons/google-icon.png" alt="Google Logo" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                    </div>
                    <span>Google Review Card</span>
                  </Link>

                  <Link
                    to="/product/instagram-card"
                    style={{
                      padding: '0.65rem 0.9rem',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      color: 'var(--color-ink)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.15s ease'
                    }}
                    className="dropdown-item"
                  >
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
                      <img src="/assets/icons/instagram-icon.png" alt="Instagram Logo" style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                    </div>
                    <span>Instagram NFC Card</span>
                  </Link>

                  <Link
                    to="/product/combo"
                    style={{
                      padding: '0.65rem 0.9rem',
                      borderRadius: '10px',
                      fontSize: '0.88rem',
                      fontWeight: '700',
                      color: 'var(--color-brand-primary)',
                      backgroundColor: 'var(--color-brand-light)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      transition: 'all 0.15s ease'
                    }}
                    className="dropdown-item"
                  >
                    <div style={{ width: '28px', height: '28px', borderRadius: '6px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Package size={15} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                      <span>Combo Offer</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: '800', color: '#B45309', backgroundColor: '#FEF3C7', padding: '0.15rem 0.45rem', borderRadius: '100px' }}>SAVE ₹999</span>
                    </div>
                  </Link>

                  <div style={{ borderTop: '1px solid var(--color-line)', margin: '0.25rem 0' }} />

                  <Link
                    to="/shop"
                    style={{
                      padding: '0.45rem 0.9rem',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      color: 'var(--color-ink-soft)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    View All Products →
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/how-it-works"
              style={{
                fontSize: '0.92rem',
                fontWeight: isActive('/how-it-works') ? '700' : '600',
                color: isActive('/how-it-works') ? 'var(--color-brand-primary)' : 'var(--color-text-main)',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 0.15s ease'
              }}
            >
              How It Works
            </Link>

            <Link
              to="/ai-review-suite"
              style={{
                fontSize: '0.92rem',
                fontWeight: isActive('/ai-review-suite') ? '700' : '600',
                color: isActive('/ai-review-suite') ? 'var(--color-brand-primary)' : 'var(--color-ink)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'all 0.15s ease'
              }}
            >
              AI Suite
              <span style={{
                fontSize: '0.65rem',
                fontWeight: '700',
                backgroundColor: 'var(--color-brand-primary)',
                color: '#FFFFFF',
                padding: '0.15rem 0.45rem',
                borderRadius: '4px',
                lineHeight: 1
              }}>
                NEW AI
              </span>
            </Link>




          </nav>

          {/* Header Right Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            {user && isAdmin && (
              <Link
                to="/admin-tap"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-brand-light)',
                  border: '1px solid var(--color-line)',
                  color: 'var(--color-brand-primary)',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  transition: 'all 0.15s ease'
                }}
                title="Admin Dashboard"
              >
                <ShieldCheck size={18} color="var(--color-brand-primary)" />
                <span className="account-text">Admin</span>
              </Link>
            )}

            {/* Cart Icon button */}
            <Link
              to="/cart"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-brand-primary)',
                color: '#ffffff',
                transition: 'transform var(--transition-bounce), box-shadow 0.2s ease',
                boxShadow: '0 4px 14px rgba(0, 102, 255, 0.3)'
              }}
              className="cart-btn-hover"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag size={20} />
              {totalItemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    backgroundColor: 'var(--color-ink)',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontWeight: '800',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #ffffff',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                  }}
                >
                  {totalItemCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                padding: 0,
                color: 'var(--color-ink)',
                borderRadius: '10px',
                border: '1px solid var(--color-line)',
                backgroundColor: 'var(--color-fog)',
                cursor: 'pointer',
                touchAction: 'manipulation',
                pointerEvents: 'auto',
                position: 'relative',
                zIndex: 100001
              }}
              aria-label="Toggle Mobile Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Polished Mobile Navigation Drawer with Backdrop */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              onClick={() => setMobileMenuOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: 'rgba(11, 18, 32, 0.5)',
                backdropFilter: 'blur(4px)',
                WebkitBackdropFilter: 'blur(4px)',
                zIndex: 100002,
                animation: 'fadeIn 0.2s ease forwards'
              }}
            />

            {/* Drawer Container */}
            <div
              style={{
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                width: '85%',
                maxWidth: '340px',
                backgroundColor: '#FFFFFF',
                zIndex: 100003,
                boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.2)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                overflowY: 'auto',
                WebkitOverflowScrolling: 'touch',
                animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards'
              }}
              className="mobile-menu-drawer"
            >
              <div>
                {/* Drawer Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid var(--color-line)', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img src="/logo.png" alt="Tapzyy" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                    <span style={{ fontWeight: '800', fontSize: '1.2rem', color: 'var(--color-ink)' }}>Tapzyy<span style={{ color: 'var(--color-brand-primary)' }}>.</span></span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-fog)',
                      border: '1px solid var(--color-line)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--color-ink)',
                      cursor: 'pointer'
                    }}
                    aria-label="Close menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Section: Products */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-ink-light)', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
                    PRODUCTS
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    <Link
                      to="/product/google-review-card"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--color-fog)',
                        fontWeight: '700',
                        fontSize: '0.92rem',
                        color: 'var(--color-ink)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <img src="/assets/icons/google-icon.png" alt="Google Logo" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /> Google Review Card
                      </span>
                      <ArrowRight size={14} color="var(--color-ink-light)" />
                    </Link>

                    <Link
                      to="/product/instagram-card"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--color-fog)',
                        fontWeight: '700',
                        fontSize: '0.92rem',
                        color: 'var(--color-ink)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <img src="/assets/icons/instagram-icon.png" alt="Instagram Logo" style={{ width: '18px', height: '18px', objectFit: 'contain' }} /> Instagram NFC Card
                      </span>
                      <ArrowRight size={14} color="var(--color-ink-light)" />
                    </Link>

                    <Link
                      to="/product/combo"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--color-brand-light)',
                        border: '1px solid rgba(0, 102, 255, 0.25)',
                        fontWeight: '700',
                        fontSize: '0.92rem',
                        color: 'var(--color-brand-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Package size={16} color="#0066FF" /> Combo Pack
                      </span>
                      <span style={{ fontSize: '0.68rem', backgroundColor: '#FEF3C7', color: '#92400E', padding: '0.15rem 0.45rem', borderRadius: '100px', fontWeight: '800' }}>SAVE ₹999</span>
                    </Link>
                  </div>
                </div>

                {/* Section: Explore Navigation */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-ink-light)', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>
                    EXPLORE
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                    <Link
                      to="/shop"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ padding: '0.6rem 0.5rem', fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-ink)' }}
                    >
                      Shop All Products
                    </Link>
                    <Link
                      to="/how-it-works"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ padding: '0.6rem 0.5rem', fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-ink)' }}
                    >
                      How It Works
                    </Link>
                    <Link
                      to="/ai-review-suite"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ padding: '0.6rem 0.5rem', fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-ink)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                    >
                      <span>AI Suite</span>
                      <span style={{ fontSize: '0.65rem', fontWeight: '800', backgroundColor: 'var(--color-brand-primary)', color: '#FFFFFF', padding: '0.15rem 0.45rem', borderRadius: '100px' }}>NEW</span>
                    </Link>


                    <Link
                      to="/contact"
                      onClick={() => setMobileMenuOpen(false)}
                      style={{ padding: '0.6rem 0.5rem', fontWeight: '600', fontSize: '0.95rem', color: 'var(--color-ink)' }}
                    >
                      Contact Support
                    </Link>
                  </div>
                </div>
              </div>

              {/* Drawer Bottom CTA */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--color-line)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-brand btn-full"
                  style={{ fontWeight: '700' }}
                >
                  <ShoppingBag size={18} /> Get Your Tapzyy
                </Link>

                {user && isAdmin && (
                  <Link
                    to="/admin-tap"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.4rem',
                      padding: '0.65rem',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid var(--color-brand-primary)',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      color: 'var(--color-brand-primary)'
                    }}
                  >
                    <ShieldCheck size={16} />
                    <span>Admin Dashboard</span>
                  </Link>
                )}
              </div>
            </div>
          </>
        )}

        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
          .dropdown-item:hover {
            background-color: var(--color-fog);
          }
          .cart-btn-hover:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 102, 255, 0.4);
          }
          @media (max-width: 992px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
            .account-text { display: none; }
          }
        `}</style>
      </header>
    </>
  );
};

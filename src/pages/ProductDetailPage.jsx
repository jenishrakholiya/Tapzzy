import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShoppingBag,
  ShieldCheck,
  Check,
  Truck,
  Edit3,
  X,
  Plus,
  Trash2,
  RotateCcw,
  Zap,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { TrustedByMarquee } from '../components/TrustedByMarquee';
import CardPlacementSection from '../components/CardPlacementSection';
import SeeInActionSection from '../components/SeeInActionSection';

export const ProductDetailPage = ({ overrideSlug }) => {
  const { slug } = useParams();
  const currentSlug = overrideSlug || slug;
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { getProductBySlug, updateProduct, resetProducts, products } = useAdmin();

  const product = getProductBySlug(currentSlug);

  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editFormData, setEditFormData] = useState(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  if (!product) {
    return (
      <div className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2>Product Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>The product you are looking for does not exist.</p>
        <Link to="/shop" className="btn btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleOpenEdit = () => {
    setEditFormData({
      name: product.name || '',
      badge: product.badge || '',
      price: product.price || 0,
      originalPrice: product.originalPrice || 0,
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      image: product.image || '',
      specifications: product.specifications ? product.specifications.map(s => ({ ...s })) : [],
      features: product.features ? [...product.features] : [],
      faqs: product.faqs ? product.faqs.map(f => ({ ...f })) : []
    });
    setIsEditing(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editFormData) return;

    const savings = Math.max(0, (editFormData.originalPrice || 0) - (editFormData.price || 0));

    updateProduct(product.id, {
      name: editFormData.name,
      badge: editFormData.badge,
      price: Number(editFormData.price),
      originalPrice: Number(editFormData.originalPrice),
      savings,
      shortDescription: editFormData.shortDescription,
      description: editFormData.description,
      image: editFormData.image,
      specifications: editFormData.specifications,
      features: editFormData.features,
      faqs: editFormData.faqs
    });

    setIsEditing(false);
    setSaveSuccessMsg(true);
    setTimeout(() => setSaveSuccessMsg(false), 3000);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const isCombo = product.id === 'combo' || product.isCombo;
  const isGoogleCard = product.id === 'google-review-card';
  const isInstagramCard = product.id === 'instagram-card';

  const galleryImages = isCombo
    ? [product.image || "/assets/combo.png"]
    : (product.gallery && product.gallery.length > 0)
      ? product.gallery
      : [product.image];

  const relatedProducts = products.filter(p => p.id !== product.id);
  const seoKey = isGoogleCard ? 'googleCard' : isInstagramCard ? 'instagramCard' : 'combo';

  return (
    <div style={{ backgroundColor: '#FFFFFF', color: 'var(--color-ink)', position: 'relative' }}>
      <SEOHead pageKey={seoKey} title={`${product.name} — ₹${product.price.toLocaleString('en-IN')}`} description={product.shortDescription} />

      {/* Top Banner & Breadcrumb / Admin bar */}
      <div style={{ backgroundColor: 'var(--color-fog)', borderBottom: '1px solid var(--color-line)', padding: '0.75rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-soft)', fontWeight: '600' }}>
            <Link to="/" style={{ color: 'var(--color-ink-soft)' }}>Home</Link> / <Link to="/shop" style={{ color: 'var(--color-ink-soft)' }}>Shop</Link> / <span style={{ color: 'var(--color-ink)', fontWeight: '700' }}>{product.name}</span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handleOpenEdit}
              className="btn btn-secondary btn-sm"
              style={{ borderColor: 'var(--color-brand-primary)', color: 'var(--color-brand-primary)', fontWeight: '700', padding: '0.35rem 0.85rem' }}
            >
              <Edit3 size={15} /> Edit Product Details
            </button>
            <button
              onClick={resetProducts}
              className="btn btn-outline btn-sm"
              title="Reset product data to defaults"
              style={{ fontSize: '0.78rem', padding: '0.35rem 0.75rem' }}
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="container" style={{ paddingTop: '1rem' }}>
          <div style={{ backgroundColor: '#DCFCE7', border: '1px solid #86EFAC', color: '#15803D', padding: '0.85rem 1.25rem', borderRadius: '12px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Check size={18} /> Product details updated successfully!
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 01 — PRODUCT HERO */}
      {/* 02 — PRODUCT VISUAL */}
      {/* ========================================================================= */}
      <section style={{ paddingTop: '3.5rem', paddingBottom: '4.5rem', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(2rem, 4vw, 3.5rem)', alignItems: 'start' }}>

            {/* 02 — Product Visuals (Left) */}
            <div>
              <div style={{
                borderRadius: '24px',
                overflow: 'hidden',
                backgroundColor: 'var(--color-fog)',
                border: '1px solid var(--color-line)',
                padding: '2.5rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: '1.25rem',
                position: 'relative'
              }}>
                <img
                  src={galleryImages[activeImageIdx] || product.image}
                  alt={product.name}
                  style={{ maxHeight: '420px', width: '100%', objectFit: 'contain', filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.1))' }}
                />
              </div>

              {galleryImages.length > 1 && (
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      style={{
                        width: '74px',
                        height: '74px',
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: activeImageIdx === idx ? '2.5px solid var(--color-brand-primary)' : '1px solid var(--color-line)',
                        padding: '4px',
                        backgroundColor: '#FFFFFF',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        boxShadow: activeImageIdx === idx ? '0 4px 14px rgba(0, 102, 255, 0.25)' : 'none'
                      }}
                      aria-label={`View product photo ${idx + 1}`}
                    >
                      <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 01 — Product Hero Info (Right) */}
            <div>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--color-fog)',
                padding: '0.4rem 0.95rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: '700',
                color: 'var(--color-ink)',
                border: '1px solid var(--color-line)',
                marginBottom: '1.25rem',
                boxShadow: 'var(--shadow-xs)'
              }}>
                <span style={{ color: '#FBBC05' }}>⭐</span> BUILT FOR LOCAL BUSINESSES
              </div>

              <div style={{ fontSize: '0.9rem', fontWeight: '800', color: 'var(--color-brand-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                {isGoogleCard ? 'Google NFC Review Card' : isInstagramCard ? 'Instagram NFC Card' : 'Google + Instagram Combo'}
              </div>

              <h1 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', lineHeight: '1.18', marginBottom: '1rem', fontWeight: '900', letterSpacing: '-0.025em', color: 'var(--color-ink)' }}>
                {isGoogleCard
                  ? 'Make It Easier for Customers to Leave a Google Review.'
                  : isInstagramCard
                    ? 'Turn Offline Customers Into Instagram Followers.'
                    : 'Build Reviews & Social Presence Together.'
                }
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-soft)', marginBottom: '1.5rem', lineHeight: '1.65' }}>
                {isGoogleCard
                  ? 'Give your customers a simple way to reach your Google review page — just tap or scan. No app. No complicated setup. Just a simple customer touchpoint designed to make reviews easier.'
                  : product.shortDescription
                }
              </p>

              {/* Price Display */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: '900', color: 'var(--color-ink)' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice > product.price && (
                  <>
                    <span style={{ fontSize: '1.2rem', textDecoration: 'line-through', color: 'var(--color-ink-soft)' }}>
                      ₹{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                    <span className="badge badge-combo">
                      Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
                    </span>
                  </>
                )}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', fontWeight: '600', marginBottom: '1.75rem' }}>
                One-time payment • No monthly fees
              </div>

              {/* Quantity Selector & CTAs */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', border: '1px solid var(--color-line)', borderRadius: 'var(--radius-full)', backgroundColor: '#FFFFFF' }}>
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0.65rem 1rem', fontSize: '1.1rem', fontWeight: '700' }}>-</button>
                    <span style={{ padding: '0.65rem 0.5rem', minWidth: '36px', textAlign: 'center', fontWeight: '700' }}>{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0.65rem 1rem', fontSize: '1.1rem', fontWeight: '700' }}>+</button>
                  </div>

                  <button onClick={handleAddToCart} className="btn btn-secondary btn-lg" style={{ flexGrow: 1 }}>
                    <ShoppingBag size={18} /> Add to Cart
                  </button>
                </div>

                <button onClick={handleBuyNow} className="btn btn-brand btn-lg" style={{ width: '100%', fontSize: '1.1rem', padding: '1.1rem', gap: '0.5rem' }}>
                  {isGoogleCard ? 'Get Your Google Card →' : isInstagramCard ? 'Get Your Instagram Card →' : 'Get Your Combo Pack →'}
                </button>
              </div>

              {/* Under CTA Checklist */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
                gap: '0.75rem',
                backgroundColor: 'var(--color-fog)',
                padding: '1.25rem 1.5rem',
                borderRadius: '16px',
                border: '1px solid var(--color-line)',
                marginBottom: '1.5rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: '700', color: 'var(--color-ink)' }}>
                  <Check size={18} color="var(--color-brand-primary)" /> NFC + QR
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: '700', color: 'var(--color-ink)' }}>
                  <Check size={18} color="var(--color-brand-primary)" /> No App Required
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: '700', color: 'var(--color-ink)' }}>
                  <Check size={18} color="var(--color-brand-primary)" /> Easy Setup
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', fontWeight: '700', color: 'var(--color-ink)' }}>
                  <Check size={18} color="var(--color-brand-primary)" /> Built for Local Businesses
                </div>
              </div>

              {/* COD Trust Notice */}
              <div style={{
                backgroundColor: '#F0FDF4',
                border: '1.5px solid #10B981',
                borderRadius: '14px',
                padding: '1.1rem 1.35rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '800', color: '#065F46' }}>
                  <CheckCircle2 size={18} color="#10B981" />
                  <span>100% Cash On Delivery Available Across India</span>
                </div>
                <span style={{ backgroundColor: '#10B981', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: '800', padding: '0.25rem 0.6rem', borderRadius: '6px' }}>
                  WE TRUST YOU
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TRUSTED BY MARQUEE (500+ LOCAL BUSINESSES USE TAPZYY) */}
      {/* ========================================================================= */}
      <TrustedByMarquee />

      {/* ========================================================================= */}
      {/* SEE TAPZYY IN ACTION SECTION */}
      {/* ========================================================================= */}
      <SeeInActionSection />





      {/* ========================================================================= */}
      {/* 05 — THE PROBLEM */}
      {/* ========================================================================= */}
      <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--color-fog)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-ink" style={{ marginBottom: '1rem' }}>Remove Friction</span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.75rem)', marginBottom: '1.25rem', fontWeight: '800' }}>
              Stop Asking Customers to Search for Your Business.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-soft)', lineHeight: '1.65' }}>
              You can give great service and still miss reviews. Customers get busy. They forget. They don't know where to go. Or they simply don't want to spend time searching for your business on Google. Tapzyy removes that extra step.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem', maxWidth: '960px', margin: '0 auto' }}>
            <div className="card" style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-line)', padding: '2rem' }}>
              <div style={{ color: '#EF4444', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>BEFORE</div>
              <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--color-ink)', marginBottom: '1rem', fontWeight: '600' }}>
                "Can you please search our business on Google and leave us a review?"
              </p>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', lineHeight: '1.5' }}>
                High friction, manual searching, mistyped names, lost interest.
              </div>
            </div>

            <div className="card" style={{ backgroundColor: '#FFFFFF', border: '2px solid var(--color-brand-primary)', padding: '2rem' }}>
              <div style={{ color: 'var(--color-brand-primary)', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>WITH TAPZYY</div>
              <p style={{ fontStyle: 'italic', fontSize: '1.1rem', color: 'var(--color-ink)', marginBottom: '1rem', fontWeight: '700' }}>
                "Just tap here."
              </p>
              <div style={{ fontSize: '0.88rem', color: 'var(--color-ink)', fontWeight: '600', lineHeight: '1.5' }}>
                Instant destination popup in 3 seconds. Zero typing required.
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '1.05rem', fontWeight: '800', color: 'var(--color-ink)' }}>
            The difference: Less friction between a happy customer and their next action.
          </div>
        </div>
      </section>







      {/* ========================================================================= */}
      {/* 10 — WHERE TO PLACE IT */}
      {/* ========================================================================= */}
      <CardPlacementSection />

      {/* ========================================================================= */}
      {/* 11 — AI REVIEW ASSISTANCE */}
      {/* ========================================================================= */}
      <section style={{ padding: '5.5rem 0', backgroundColor: '#0B1220', color: '#FFFFFF', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 3.5rem' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', backgroundColor: 'rgba(0, 198, 255, 0.15)', color: '#00C6FF', border: '1px solid rgba(0, 198, 255, 0.3)', padding: '0.35rem 0.9rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              <Sparkles size={14} /> TAPZYY DIFFERENTIATOR
            </span>
            <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 2.75rem)', color: '#FFFFFF', marginBottom: '1.25rem', fontWeight: '800' }}>
              Don't Know What to Write? Tapzyy AI Can Help.
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#94A3B8', lineHeight: '1.65' }}>
              Sometimes customers want to leave a review but don't know how to put their experience into words. Tapzyy AI can help turn their genuine feedback into a clear, natural review draft.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ color: '#00C6FF', fontWeight: '800', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Short & Simple</div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                A quick, natural review highlighting speed and service quality.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ color: '#00C6FF', fontWeight: '800', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Detailed</div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                A more descriptive version based on the customer's specific experience.
              </p>
            </div>

            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '20px', padding: '2rem' }}>
              <div style={{ color: '#00C6FF', fontWeight: '800', fontSize: '1.15rem', marginBottom: '0.5rem' }}>Local Keyword</div>
              <p style={{ color: '#94A3B8', fontSize: '0.9rem', lineHeight: '1.6' }}>
                A warm, conversational recommendation for family and friends.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.95rem', color: '#94A3B8', fontWeight: '600', marginBottom: '1.5rem' }}>
              Customers stay in control of what they submit.
            </div>
            <Link to="/ai-review-suite" className="btn" style={{ backgroundColor: '#0066FF', color: '#FFFFFF', padding: '0.9rem 1.75rem', fontWeight: '800', borderRadius: '12px' }}>
              Explore AI Review System →
            </Link>
          </div>
        </div>
      </section>





      {/* ========================================================================= */}
      {/* 15 — GUARANTEE / TRUST */}
      {/* ========================================================================= */}
      <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--color-fog)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-brand" style={{ marginBottom: '1rem' }}>Trust & Protection</span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800' }}>
              Built to Be Simple. Built to Last.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '2rem' }}>
            <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '2rem', border: '1px solid var(--color-line)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--color-brand-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Zap size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>One-Time Purchase</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
                No monthly subscription for the card. Pay once and keep using it permanently.
              </p>
            </div>

            <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '2rem', border: '1px solid var(--color-line)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--color-brand-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <ShieldCheck size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Easy Replacement Support</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
                If your product arrives damaged, contact our support team according to our replacement policy.
              </p>
            </div>

            <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '2rem', border: '1px solid var(--color-line)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--color-brand-light)', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Truck size={22} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Customer Support</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
                We're here to help with setup, configuration, and product questions. Customer support: <a href="mailto:Tapzyy.in@gmail.com" style={{ color: 'var(--color-brand-primary)', fontWeight: '700' }}>email - Tapzyy.in@gmail.com</a>.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 17 — RELATED PRODUCTS */}
      {/* ========================================================================= */}
      <section style={{ padding: '5.5rem 0', backgroundColor: 'var(--color-fog)', borderBottom: '1px solid var(--color-line)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
            <span className="badge badge-ink" style={{ marginBottom: '0.75rem' }}>Explore Hardware</span>
            <h2 style={{ fontSize: '2.25rem', fontWeight: '800' }}>You May Also Like</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {relatedProducts.map((rel) => {
              const relIsCombo = rel.id === 'combo';
              const relUrl = rel.id === 'instagram-card' ? '/products/instagram-nfc-card' : rel.id === 'combo' ? '/products/combo-pack' : '/products/google-nfc-card';

              return (
                <div key={rel.id} className="card card-hover" style={{ backgroundColor: '#FFFFFF', border: '1px solid var(--color-line)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '2rem' }}>
                  <div>
                    {relIsCombo && <span className="badge badge-combo" style={{ marginBottom: '1rem' }}>SAVE ₹999</span>}
                    <div style={{ height: '180px', backgroundColor: 'var(--color-fog)', borderRadius: '16px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                      <img src={rel.image} alt={rel.name} style={{ maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem', fontWeight: '800' }}>{rel.name}</h3>
                    <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', marginBottom: '1.25rem', lineHeight: '1.5' }}>
                      {rel.id === 'instagram-card'
                        ? 'Turn customer interactions into Instagram followers.'
                        : 'Get both Tapzyy cards and connect with customers in more ways. Save ₹999.'
                      }
                    </p>
                  </div>

                  <div>
                    <div style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--color-ink)' }}>
                      ₹{rel.price.toLocaleString('en-IN')}
                    </div>
                    <Link to={relUrl} className="btn btn-secondary btn-full btn-sm" style={{ fontWeight: '700' }}>
                      {relIsCombo ? 'View Combo →' : 'View Product →'}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>



      {/* STICKY MOBILE CTA BAR */}
      <div className="sticky-mobile-cta" style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid var(--color-line)',
        padding: '0.75rem 1.25rem max(0.75rem, env(safe-area-inset-bottom)) 1.25rem',
        zIndex: 99,
        boxShadow: '0 -4px 16px rgba(0,0,0,0.1)',
        display: 'none',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem'
      }}>
        <div style={{ flexShrink: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-ink-soft)', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
          <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-ink)' }}>₹{product.price.toLocaleString('en-IN')}</div>
        </div>
        <button onClick={handleBuyNow} className="btn btn-brand btn-sm" style={{ fontWeight: '800', padding: '0.7rem 1.2rem', flexShrink: 0 }}>
          {isGoogleCard ? 'Buy Google Card →' : isInstagramCard ? 'Buy Instagram Card →' : 'Buy Combo →'}
        </button>
      </div>

      {/* EDIT PRODUCT MODAL (ADMIN) */}
      {isEditing && editFormData && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(11, 18, 32, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            maxWidth: '850px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '2rem',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid var(--color-line)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-line)', paddingBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Edit3 color="var(--color-brand-primary)" size={22} />
                <h2 style={{ fontSize: '1.4rem' }}>Edit Product Details: {product.name}</h2>
              </div>
              <button onClick={() => setIsEditing(false)} style={{ padding: '0.4rem', borderRadius: '50%', backgroundColor: 'var(--color-fog)' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Product Title</label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-line)', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Badge Label</label>
                  <input
                    type="text"
                    value={editFormData.badge}
                    onChange={(e) => setEditFormData({ ...editFormData, badge: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-line)', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Selling Price (₹)</label>
                  <input
                    type="number"
                    value={editFormData.price}
                    onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-line)', fontSize: '0.95rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Original Price (₹)</label>
                  <input
                    type="number"
                    value={editFormData.originalPrice}
                    onChange={(e) => setEditFormData({ ...editFormData, originalPrice: e.target.value })}
                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-line)', fontSize: '0.95rem' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Main Image Path</label>
                <input
                  type="text"
                  value={editFormData.image}
                  onChange={(e) => setEditFormData({ ...editFormData, image: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-line)', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Short Description</label>
                <input
                  type="text"
                  value={editFormData.shortDescription}
                  onChange={(e) => setEditFormData({ ...editFormData, shortDescription: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-line)', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Full Description</label>
                <textarea
                  rows={3}
                  value={editFormData.description}
                  onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--color-line)', fontSize: '0.95rem', fontFamily: 'inherit' }}
                />
              </div>

              {/* Technical Specifications Manager */}
              <div style={{ marginBottom: '1.5rem', backgroundColor: 'var(--color-fog)', padding: '1.25rem', borderRadius: '16px', border: '1px solid var(--color-line)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800' }}>Technical Specifications ({editFormData.specifications.length})</h4>
                  <button
                    type="button"
                    onClick={() => setEditFormData({
                      ...editFormData,
                      specifications: [...editFormData.specifications, { label: 'New Spec', value: 'Value' }]
                    })}
                    className="btn btn-secondary btn-sm"
                    style={{ gap: '0.3rem', fontSize: '0.8rem' }}
                  >
                    <Plus size={14} /> Add Spec Row
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {editFormData.specifications.map((spec, idx) => (
                    <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr auto', gap: '0.75rem', alignItems: 'center' }}>
                      <input
                        type="text"
                        placeholder="Label"
                        value={spec.label}
                        onChange={(e) => {
                          const updated = [...editFormData.specifications];
                          updated[idx].label = e.target.value;
                          setEditFormData({ ...editFormData, specifications: updated });
                        }}
                        style={{ padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--color-line)', fontSize: '0.88rem' }}
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...editFormData.specifications];
                          updated[idx].value = e.target.value;
                          setEditFormData({ ...editFormData, specifications: updated });
                        }}
                        style={{ padding: '0.55rem', borderRadius: '6px', border: '1px solid var(--color-line)', fontSize: '0.88rem' }}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = editFormData.specifications.filter((_, i) => i !== idx);
                          setEditFormData({ ...editFormData, specifications: updated });
                        }}
                        style={{ color: '#ef4444', padding: '0.4rem' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--color-line)' }}>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-brand">
                  Save Product Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .sticky-mobile-cta { display: flex !important; }
        }
      `}</style>
    </div>
  );
};

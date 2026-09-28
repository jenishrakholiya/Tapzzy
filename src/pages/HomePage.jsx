import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Star,
  ShieldCheck,
  Plus,
  Sparkles,
  Utensils,
  Scissors,
  Stethoscope,
  Building,
  Store,
  Dumbbell,
  Zap,
  HeartHandshake,
  ChevronLeft,
  ChevronRight,
  Tag
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useCart } from '../context/CartContext';
import { useAdmin } from '../context/AdminContext';
import { TrustedByMarquee } from '../components/TrustedByMarquee';
import { TapzyyVideoDemo } from '../components/TapzyyVideoDemo';
import CardPlacementSection from '../components/CardPlacementSection';

export const HomePage = () => {
  const { addToCart } = useCart();
  const { products: storeProducts, activeProducts } = useAdmin();
  const [openFaq, setOpenFaq] = useState(null);
  const productScrollRef = useRef(null);

  const scrollProducts = (direction) => {
    if (productScrollRef.current) {
      const scrollAmount = 310;
      productScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const showcaseProducts = [
    {
      id: 'google-review-card',
      slug: 'google-nfc-card',
      name: 'Google Reviews - Plate',
      badge: 'SAVE 20%',
      price: 1999,
      originalPrice: 2499,
      rating: 5,
      reviewsCount: 1643,
      image: '/assets/google.png',
      url: '/products/google-nfc-card'
    },
    {
      id: 'combo',
      slug: 'combo-pack',
      name: 'Build Your Bundle (Save up to 65%)',
      badge: 'SAVE 65%',
      price: 2999,
      originalPrice: 3998,
      rating: 5,
      reviewsCount: 191,
      image: '/assets/combo.png',
      url: '/products/combo-pack'
    },
    {
      id: 'instagram-card',
      slug: 'instagram-nfc-card',
      name: 'Instagram Followers - Plate',
      badge: 'SAVE 20%',
      price: 1999,
      originalPrice: 2499,
      rating: 5,
      reviewsCount: 824,
      image: '/assets/instagram.png',
      url: '/products/instagram-nfc-card'
    },

  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const previewFaqs = [
    {
      q: "Does Tapzyy require an app?",
      a: "No. Customers can tap the NFC card or scan the QR code using their phone."
    },
    {
      q: "Does it work with iPhone and Android?",
      a: "NFC availability varies by device, while QR provides a convenient fallback."
    },
    {
      q: "Can customers edit their review?",
      a: "Yes. Customers remain in control of what they submit."
    },
    {
      q: "Is there a monthly fee?",
      a: "No. Tapzyy cards are purchased with a one-time payment."
    },
    {
      q: "Can I buy both Google and Instagram cards?",
      a: "Yes. The Combo Pack includes both."
    }
  ];

  const dynamicProducts = (storeProducts || [])
    .filter(p => activeProducts[p.id] !== false)
    .map(p => ({
      ...p,
      url: `/product/${p.slug || p.id}`,
      rating: p.rating || 5,
      reviewsCount: p.reviewsCount || 184
    }));

  const displayProducts = dynamicProducts.length > 0 ? dynamicProducts : showcaseProducts;

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <SEOHead
        title="Tapzyy | Customer Growth System for Local Businesses (NFC + QR)"
        description="Turn everyday customer interactions into more Google reviews, Instagram followers, and valuable feedback with one simple tap."
      />

      {/* ========================================================================= */}
      {/* 1. HERO SECTION (SINGLE CONNECTED BANNER - NO WHITE SPACE GAP) */}
      {/* ========================================================================= */}
      <section className="hero-connected-section">
        <div className="container">
          <div className="hero-connected-banner">

            {/* LEFT SIDE ON DESKTOP, BOTTOM ON MOBILE: HEADLINE, COPY & CTAs */}
            <div className="hero-connected-content">

              {/* Eyebrow Label */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontSize: '0.75rem',
                fontWeight: '800',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '0.35rem 0.85rem',
                borderRadius: '9999px',
                marginBottom: '1.25rem'
              }}>

              </div>

              {/* Headline */}
              <h1 className="hero-connected-headline">
                You’re Not Buying a Card.<br />
                You’re Buying a <span className="hero-connected-accent">Marketing System</span> for Your Business.
              </h1>

              {/* Supporting Text */}
              <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.92)', marginBottom: '2rem', maxWidth: '520px' }}>
                Tapzyy automatically collects reviews so you can focus on running your business
              </p>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to="/shop" className="hero-connected-btn-white">
                  <span>Get Tapzyy</span>
                  <ArrowRight size={18} style={{ marginLeft: '0.4rem' }} />
                </Link>
                <Link to="/how-it-works" style={{
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  padding: '0.9rem 1.4rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.2s ease'
                }}>
                  See How It Works
                </Link>
              </div>

              {/* Trust Points */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.9)', fontWeight: '600' }}>
                <ShieldCheck size={16} color="#FFFFFF" />
                <span>NFC + QR • One-Time Payment</span>
              </div>

            </div>

            {/* RIGHT SIDE ON DESKTOP, TOP ON MOBILE: FULL UNCROPPED PHOTO */}
            <div className="hero-connected-media">
              <img
                src="/assets/tapzyy-counter-hero.jpg"
                alt="Tapzyy Contactless Google Review Stand at storefront retail counter with customer tapping smartphone"
                className="hero-connected-img"
                width="1024"
                height="764"
                loading="eager"
                fetchPriority="high"
              />
            </div>

          </div>
        </div>

        {/* Hero Connected Styles */}
        <style>{`
          .hero-connected-section {
            padding: 2rem 0 3.5rem;
            background-color: #FAF9F6;
            border-bottom: 1px solid var(--color-line);
            position: relative;
            overflow: hidden;
          }
          .hero-connected-banner {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1.22fr);
            background: #0066FF;
            border-radius: 28px;
            overflow: hidden;
            box-shadow: 0 20px 48px -10px rgba(0, 102, 255, 0.28), 0 4px 16px rgba(11, 18, 32, 0.08);
            border: 1px solid rgba(0, 102, 255, 0.25);
            align-items: center;
          }
          .hero-connected-content {
            padding: 3rem 2.5rem 3rem 3.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            color: #FFFFFF;
          }
          .hero-connected-headline {
            font-size: clamp(1.95rem, 2.8vw, 2.85rem);
            line-height: 1.15;
            font-weight: 900;
            color: #FFFFFF;
            letter-spacing: -0.025em;
            margin-bottom: 1.15rem;
            font-family: var(--font-heading);
          }
          .hero-connected-accent {
            color: #FFFFFF;
            text-decoration: underline;
            text-decoration-color: rgba(255, 255, 255, 0.45);
            text-underline-offset: 6px;
          }
          .hero-connected-btn-white {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background-color: #FFFFFF;
            color: #0B1220;
            padding: 0.85rem 1.75rem;
            border-radius: 12px;
            font-size: 0.98rem;
            font-weight: 700;
            text-decoration: none;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .hero-connected-btn-white:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
            background-color: #F8FAFC;
          }
          .hero-connected-media {
            position: relative;
            width: 100%;
            aspect-ratio: 1024 / 764;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            line-height: 0;
            background-color: transparent;
            padding: 1.25rem 1.25rem 1.25rem 0;
            box-sizing: border-box;
          }
          .hero-connected-img {
            width: 100%;
            height: auto;
            aspect-ratio: 1024 / 764;
            object-fit: contain;
            display: block;
            border-radius: 18px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.16);
          }
          @media (max-width: 968px) {
            .hero-connected-section { padding: 1.25rem 0 2.5rem; }
            .hero-connected-banner {
              display: flex;
              flex-direction: column;
              border-radius: 22px;
            }
            .hero-connected-media {
              order: 1;
              width: 100%;
              aspect-ratio: 1024 / 764;
              padding: 0;
            }
            .hero-connected-img {
              border-radius: 0;
              box-shadow: none;
              object-fit: cover;
              height: 100%;
            }
            .hero-connected-content {
              order: 2;
              padding: 2.25rem 1.5rem 2rem;
              width: 100%;
              box-sizing: border-box;
            }
            .hero-connected-headline {
              font-size: clamp(1.75rem, 5vw, 2.35rem);
            }
          }
          @media (max-width: 640px) {
            .hero-connected-section { padding: 1rem 0 2rem; }
            .hero-connected-banner { border-radius: 18px; }
            .hero-connected-content { padding: 1.85rem 1.25rem 1.75rem; }
            .hero-connected-btn-white { width: 100%; text-align: center; }
          }
        `}</style>
      </section>

      {/* ========================================================================= */}
      {/* TRUSTED BY MARQUEE (500+ LOCAL BUSINESSES USE TAPZYY) */}
      {/* ========================================================================= */}
      <TrustedByMarquee />

      {/* ========================================================================= */}
      {/* 5. PRODUCTS SECTION (OUR PRODUCTS - HORIZONTAL SCROLL) */}
      {/* ========================================================================= */}
      <section style={{
        padding: '5rem 0',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-line)'
      }}>
        <div className="container">
          {/* Header with Title and Scroll Arrows */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--color-brand-primary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                OUR PRODUCTS
              </div>
              <h2 style={{ fontSize: 'clamp(2.1rem, 3.8vw, 2.8rem)', fontWeight: '800', color: 'var(--color-ink)', lineHeight: '1.18', letterSpacing: '-0.025em', margin: 0 }}>
                Choose Your Tapzyy
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-soft)', marginTop: '0.4rem', margin: 0 }}>
                Simple tools designed for real customer interactions. Scroll right to view all products.
              </p>
            </div>

            {/* Scroll Navigation Arrows */}
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <button
                onClick={() => scrollProducts('left')}
                aria-label="Scroll left"
                className="product-nav-arrow"
              >
                <ChevronLeft size={22} color="var(--color-ink)" />
              </button>
              <button
                onClick={() => scrollProducts('right')}
                aria-label="Scroll right"
                className="product-nav-arrow"
              >
                <ChevronRight size={22} color="var(--color-ink)" />
              </button>
            </div>
          </div>

          {/* Horizontal Scroll Track */}
          <div ref={productScrollRef} className="product-scroll-track">
            {displayProducts.map((prod) => (
              <div key={prod.id + prod.name} className="product-scroll-card">
                {/* Image Wrap with Soft Tint & Blue Badge */}
                <Link to={prod.url} className="product-scroll-image-wrap">
                  {prod.badge && (
                    <div className="product-scroll-badge">
                      <Tag size={12} style={{ marginRight: '4px' }} />
                      <span>{prod.badge}</span>
                    </div>
                  )}
                  <img src={prod.image} alt={prod.name} className="product-scroll-img" />
                </Link>

                {/* Card Body */}
                <div className="product-scroll-info">
                  <Link to={prod.url} style={{ textDecoration: 'none' }}>
                    <h3 className="product-scroll-title">{prod.name}</h3>
                  </Link>

                  {/* Stars & Reviews */}
                  <div className="product-scroll-rating">
                    <div style={{ display: 'flex', gap: '2px', color: '#FBBF24' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="#FBBF24" color="#FBBF24" />
                      ))}
                    </div>
                    <span className="product-scroll-reviews">({prod.reviewsCount.toLocaleString()})</span>
                  </div>

                  {/* Price Wrap */}
                  <div className="product-scroll-price-wrap">
                    <div className="product-scroll-price">
                      Rs. {prod.price.toLocaleString('en-IN')}.00
                    </div>
                    {prod.originalPrice && (
                      <div className="product-scroll-original-price">
                        Rs. {prod.originalPrice.toLocaleString('en-IN')}.00
                      </div>
                    )}
                  </div>

                  {/* Add To Cart Button */}
                  <button
                    onClick={() => addToCart({ id: prod.id, name: prod.name, price: prod.price, image: prod.image }, 1)}
                    className="btn btn-secondary product-scroll-btn"
                  >
                    Add to Cart →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Carousel Styles */}
        <style>{`
          .product-scroll-track {
            display: flex;
            gap: 1.5rem;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
            padding: 0.5rem 0.25rem 2rem;
            scrollbar-width: thin;
            scrollbar-color: #CBD5E1 transparent;
          }
          .product-scroll-track::-webkit-scrollbar {
            height: 6px;
          }
          .product-scroll-track::-webkit-scrollbar-track {
            background: #F1F5F9;
            border-radius: 9999px;
          }
          .product-scroll-track::-webkit-scrollbar-thumb {
            background: #CBD5E1;
            border-radius: 9999px;
          }
          .product-scroll-track::-webkit-scrollbar-thumb:hover {
            background: #94A3B8;
          }
          .product-scroll-card {
            flex: 0 0 280px;
            min-width: 280px;
            max-width: 280px;
            scroll-snap-align: start;
            background: #FFFFFF;
            border-radius: 22px;
            border: 1px solid var(--color-line);
            padding: 1rem;
            box-shadow: 0 4px 16px rgba(11, 18, 32, 0.05);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          }
          .product-scroll-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 30px rgba(11, 18, 32, 0.09);
            border-color: var(--color-brand-border);
          }
          .product-scroll-image-wrap {
            background: linear-gradient(180deg, #F4F6F9 0%, #EAEEF5 100%);
            border-radius: 18px;
            padding: 1.5rem 1rem;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 200px;
            overflow: hidden;
            text-decoration: none;
          }
          .product-scroll-badge {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: #1E6BFB;
            color: #FFFFFF;
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            padding: 0.32rem 0.65rem;
            border-radius: 7px;
            display: inline-flex;
            align-items: center;
            box-shadow: 0 4px 10px rgba(30, 107, 251, 0.3);
            z-index: 2;
          }
          .product-scroll-img {
            max-height: 155px;
            width: auto;
            object-fit: contain;
            transition: transform 0.3s ease;
          }
          .product-scroll-card:hover .product-scroll-img {
            transform: scale(1.05);
          }
          .product-scroll-info {
            padding: 0.85rem 0.25rem 0.25rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .product-scroll-title {
            font-size: 1.08rem;
            font-weight: 800;
            color: #0B1220;
            margin: 0.25rem 0 0.5rem;
            text-align: center;
            line-height: 1.35;
            min-height: 2.7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s ease;
          }
          .product-scroll-title:hover {
            color: var(--color-brand-primary);
          }
          .product-scroll-rating {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.35rem;
            margin-bottom: 0.65rem;
          }
          .product-scroll-reviews {
            font-size: 0.92rem;
            font-weight: 600;
            color: #4B5768;
          }
          .product-scroll-price-wrap {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin-bottom: 1.15rem;
          }
          .product-scroll-price {
            font-size: 1.25rem;
            font-weight: 800;
            color: #0066FF;
            letter-spacing: -0.01em;
          }
          .product-scroll-original-price {
            font-size: 0.9rem;
            color: #64748B;
            text-decoration: line-through;
            margin-top: 0.1rem;
          }
          .product-scroll-btn {
            width: 100%;
            border-radius: 12px;
            padding: 0.75rem 1rem;
            font-size: 0.92rem;
            font-weight: 700;
            transition: all 0.2s ease;
            box-shadow: 0 2px 8px rgba(11, 18, 32, 0.05);
          }
          .product-nav-arrow {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1px solid var(--color-line);
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(11, 18, 32, 0.06);
            transition: all 0.2s ease;
          }
          .product-nav-arrow:hover {
            background: var(--color-brand-light);
            border-color: var(--color-brand-primary);
            color: var(--color-brand-primary);
            transform: scale(1.05);
          }
          .product-nav-arrow:active {
            transform: scale(0.95);
          }
          @media (max-width: 640px) {
            .product-scroll-card {
              flex: 0 0 255px;
              min-width: 255px;
              max-width: 255px;
              padding: 0.85rem;
            }
            .product-scroll-image-wrap {
              height: 180px;
            }
            .product-scroll-img {
              max-height: 135px;
            }
            .product-nav-arrow {
              width: 38px;
              height: 38px;
            }
          }
        `}</style>
      </section>

      {/* ========================================================================= */}
      {/* 5B. VIDEO DEMO SECTION */}
      {/* ========================================================================= */}
      <TapzyyVideoDemo />

      {/* ========================================================================= */}
      {/* 2. THE PROBLEM SECTION */}
      {/* ========================================================================= */}
      <section style={{
        padding: '1rem 0',
        backgroundColor: 'var(--color-fog)',
        borderBottom: '1px solid var(--color-line)'
      }}>
        <div className="container">

          {/* 4-COLUMN HIGH-IMPACT VALUE STRIP (DIRECTLY ABOVE SOLUTION LINE) */}
          <div style={{
            marginTop: '3.5rem',
            paddingTop: '2.5rem',
            borderTop: '1px dashed var(--color-line)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
              gap: '1.5rem',
              textAlign: 'center'
            }}>
              {/* Feature 1: Be at the Top of the Page */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '56px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                  <div style={{ position: 'absolute', top: '-8px', display: 'flex', gap: '2px', justifyContent: 'center' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="#FBBC05" color="#FBBC05" />)}
                  </div>
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#0B1220', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.35rem', boxShadow: '0 4px 12px rgba(11, 18, 32, 0.15)' }}>
                    G
                  </div>
                </div>
                <h4 style={{ fontSize: '1.02rem', fontWeight: '800', color: 'var(--color-ink)', marginBottom: '0.25rem' }}>
                  Be at the Top of the Page!
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', margin: 0, lineHeight: '1.4' }}>
                  Stay ahead of the competition.
                </p>
              </div>

              {/* Feature 2: Instantly Redirect */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '2.5px solid #0B1220', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                  <Zap size={24} color="#0B1220" fill="#0B1220" />
                </div>
                <h4 style={{ fontSize: '1.02rem', fontWeight: '800', color: 'var(--color-ink)', marginBottom: '0.25rem' }}>
                  Instantly redirect <span style={{ fontWeight: '500', color: 'var(--color-ink-soft)' }}>to the</span>
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', margin: 0, lineHeight: '1.4' }}>
                  review page.
                </p>
              </div>

              {/* Feature 3: Customers LOVE it */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                  <Sparkles size={34} color="#0B1220" />
                </div>
                <h4 style={{ fontSize: '1.02rem', fontWeight: '800', color: 'var(--color-ink)', marginBottom: '0.25rem' }}>
                  Customers LOVE it!
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', margin: 0, lineHeight: '1.4' }}>
                  It's simple and fun.
                </p>
              </div>

              {/* Feature 4: Let your REAL customers speak for you */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.85rem' }}>
                  <HeartHandshake size={34} color="#0B1220" />
                </div>
                <h4 style={{ fontSize: '1.02rem', fontWeight: '800', color: 'var(--color-ink)', marginBottom: '0.25rem' }}>
                  Let your REAL customers
                </h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-ink-soft)', margin: 0, lineHeight: '1.4' }}>
                  speak for you!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 6. GOOGLE REVIEWS SECTION */}
      {/* ========================================================================= */}
      <section style={{
        padding: '5rem 0',
        backgroundColor: 'var(--color-fog)',
        borderBottom: '1px solid var(--color-line)'
      }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#0066FF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                DIRECT GOOGLE ACCESS
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', color: 'var(--color-ink)', lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                Stop Asking Customers to Search for You.
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-soft)', lineHeight: '1.6', marginBottom: '2rem' }}>
                The easier you make the next step, the more likely customers are to take it. Tapzyy puts your Google review destination directly in front of them.
              </p>

              {/* Visual Workflow Pill */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: '#FFFFFF',
                padding: '0.75rem 1.25rem',
                borderRadius: '14px',
                border: '1px solid var(--color-line)',
                fontSize: '0.88rem',
                fontWeight: '700',
                color: 'var(--color-ink)',
                marginBottom: '1.75rem',
                flexWrap: 'wrap'
              }}>
                <span>Tapzyy Card</span>
                <span style={{ color: 'var(--color-brand-primary)' }}>→</span>
                <span>Customer Phone</span>
                <span style={{ color: 'var(--color-brand-primary)' }}>→</span>
                <span style={{ color: '#10B981' }}>Google Review</span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--color-ink-light)', fontWeight: '600', marginBottom: '1.5rem' }}>
                NFC tap + QR backup • No app required
              </div>

              <Link to="/product/google-card" className="btn btn-brand">
                Get Google Card →
              </Link>
            </div>

            <div style={{ textAlign: 'center' }}>
              <img src="/assets/google.png" alt="Google Review Card" style={{ maxHeight: '280px', objectFit: 'contain', margin: '0 auto', filter: 'drop-shadow(0 14px 28px rgba(11,18,32,0.1))' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. PLACEMENT SECTION */}
      {/* ========================================================================= */}
      <CardPlacementSection />

      {/* ========================================================================= */}
      {/* 7. AI SECTION */}
      {/* ========================================================================= */}
      <section style={{
        padding: '5.5rem 0',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-line)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '750px', margin: '0 auto 3.5rem auto', textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              fontWeight: '800',
              color: '#9333EA',
              backgroundColor: '#F3E8FF',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              marginBottom: '1rem'
            }}>
              <Sparkles size={14} /> TAPZYY AI ASSISTANCE
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', color: 'var(--color-ink)', lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Your Customers Have the Experience. <br />
              Tapzyy Helps Them Put It Into Words.
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
              Sometimes customers want to leave a review but don't know what to write. Tapzyy AI can help turn their genuine experience and feedback into a clear, natural review draft.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1.5rem',
            marginBottom: '2.5rem'
          }}>
            <div style={{ backgroundColor: 'var(--color-fog)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--color-line)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-ink)', marginBottom: '0.5rem' }}>Natural</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.5', margin: 0 }}>
                Clear and human-sounding wording.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-fog)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--color-line)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-ink)', marginBottom: '0.5rem' }}>Multiple Options</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.5', margin: 0 }}>
                Short, friendly or detailed drafts.
              </p>
            </div>

            <div style={{ backgroundColor: 'var(--color-fog)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--color-line)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'var(--color-ink)', marginBottom: '0.5rem' }}>Business Replies</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-ink-soft)', lineHeight: '1.5', margin: 0 }}>
                Create thoughtful response drafts for customer reviews.
              </p>
            </div>
          </div>

          <div style={{
            maxWidth: '650px',
            margin: '0 auto 2rem auto',
            padding: '1rem 1.25rem',
            backgroundColor: '#EFF6FF',
            border: '1px solid rgba(0, 102, 255, 0.2)',
            borderRadius: '12px',
            textAlign: 'center',
            fontSize: '0.88rem',
            fontWeight: '600',
            color: '#1E40AF'
          }}>
            💡 <strong>AI assists with wording. Customers decide what they want to submit.</strong>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/ai-review-suite" className="btn btn-secondary">
              <span>Explore Tapzyy AI →</span>
            </Link>
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 9. WHO IT'S FOR SECTION */}
      {/* ========================================================================= */}
      <section style={{
        padding: '5rem 0',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-line)'
      }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto 3.5rem auto', textAlign: 'center' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--color-brand-primary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              TARGET BUSINESSES
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', color: 'var(--color-ink)', lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Built for Businesses Where Customer Experience Matters.
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              { name: 'Restaurants & Cafés', icon: Utensils },
              { name: 'Salons & Barbers', icon: Scissors },
              { name: 'Hotels & Stays', icon: Building },
              { name: 'Clinics & Dentists', icon: Stethoscope },
              { name: 'Retail Stores', icon: Store },
              { name: 'Gyms & Fitness', icon: Dumbbell }
            ].map((biz) => {
              const BizIcon = biz.icon;
              return (
                <div key={biz.name} style={{
                  padding: '1.5rem 1rem',
                  backgroundColor: 'var(--color-fog)',
                  borderRadius: '14px',
                  border: '1px solid var(--color-line)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem'
                }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FFFFFF', color: 'var(--color-brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-line)' }}>
                    <BizIcon size={20} />
                  </div>
                  <span style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--color-ink)' }}>{biz.name}</span>
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center', fontSize: '0.88rem', color: 'var(--color-ink-light)', fontWeight: '600' }}>
            And many more local businesses.
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 11. FAQ PREVIEW SECTION */}
      {/* ========================================================================= */}
      <section style={{
        padding: '5.5rem 0',
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--color-line)'
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: '800', color: 'var(--color-brand-primary)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontWeight: '800', color: 'var(--color-ink)', lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
              Got Questions?
            </h2>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto 2.5rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {previewFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--color-fog)',
                    borderRadius: '14px',
                    border: '1px solid var(--color-line)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    style={{
                      width: '100%',
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.02rem',
                      fontWeight: '700',
                      color: 'var(--color-ink)'
                    }}
                  >
                    <span>{faq.q}</span>
                    <Plus size={18} style={{ transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0, color: 'var(--color-brand-primary)' }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', fontSize: '0.92rem', color: 'var(--color-ink-soft)', lineHeight: '1.6', borderTop: '1px solid var(--color-line)' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/faq" className="btn btn-secondary">
              <span>View All FAQs →</span>
            </Link>
          </div>
        </div>
      </section>


    </div >
  );
};

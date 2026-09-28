import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Truck, Star, Flame } from 'lucide-react';

const ANNOUNCEMENTS = [
  { icon: Truck, text: "Free Express Pan-India Shipping on all orders", linkText: "Shop Now", link: "/shop" },
  { icon: Star, text: "Built for Indian retail counters, cafés, salons & local businesses", linkText: "How It Works", link: "/how-it-works" },
  { icon: Flame, text: "Special Combo Offer: Save ₹999 on Google + Instagram NFC Cards", linkText: "Get Combo", link: "/product/combo" }
];

export const AnnouncementBar = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const active = ANNOUNCEMENTS[currentSlide];
  const IconComponent = active.icon;

  return (
    <div style={{
      backgroundColor: '#0066FF',
      color: '#FFFFFF',
      fontSize: '0.82rem',
      fontWeight: '600',
      padding: '0.55rem 0.75rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)'
    }}>
      {/* 21.dev subtle top light shimmer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)'
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.5rem',
        textAlign: 'center',
        maxWidth: '850px',
        width: '100%',
        margin: '0 auto'
      }}>
        <button
          onClick={handlePrev}
          className="announcement-nav-btn"
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            background: 'none',
            border: 'none',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'; }}
          aria-label="Previous announcement"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="announcement-slider-content" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          flexGrow: 1,
          justifyContent: 'center',
          flexWrap: 'wrap',
          lineHeight: '1.4'
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            backdropFilter: 'blur(4px)',
            flexShrink: 0
          }}>
            <IconComponent size={12} />
          </div>
          <span style={{ color: '#FFFFFF', letterSpacing: '-0.01em' }}>{active.text}</span>
          <Link
            to={active.link}
            style={{
              color: '#FFFFFF',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              padding: '0.15rem 0.6rem',
              borderRadius: '100px',
              textDecoration: 'none',
              fontWeight: '700',
              marginLeft: '0.25rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.15s ease',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'; }}
          >
            {active.linkText} →
          </Link>
        </div>

        <button
          onClick={handleNext}
          className="announcement-nav-btn"
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            background: 'none',
            border: 'none',
            padding: '0.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.color = '#FFFFFF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)'; }}
          aria-label="Next announcement"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .announcement-nav-btn { display: none !important; }
          .announcement-slider-content { font-size: 0.75rem !important; gap: 0.35rem !important; }
        }
      `}</style>
    </div>
  );
};



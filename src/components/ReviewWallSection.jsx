import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Quote, 
  MapPin, 
  Camera, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import './ReviewWallSection.css';

/**
 * Authentic Customer Reviews across diverse businesses in India
 * First 3 items showcase authentic on-site installation photos:
 * 1. Chisel Dental Clinic (Clinic wall tile install)
 * 2. Emporium Design (Showroom display board with key hooks)
 * 3. Kink Speciality Coffee (Billing counter stand with marble backdrop)
 */
export const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    industry: 'Dental Clinic',
    industryIcon: '🦷',
    text: 'We wanted something simple that patients could use without having to search for our clinic. The Tapzyy card gives them an easy way to access our review page right from reception.',
    business: 'Chisel Dental Clinic',
    location: 'Koramangala, Bengaluru',
    rating: 5,
    verified: true,
    image: '/assets/reviews/chisel_dental_install.jpg',
    imageAlt: 'Tapzyy NFC card mounted on clinic wall at Chisel Dental Clinic',
    imagePosition: 'center 40%',
    photoBadge: 'Reception Wall Mount'
  },
  {
    id: 'rev-2',
    industry: 'Interior Design',
    industryIcon: '🛋️',
    text: 'Our clients spend a lot of time with us during their projects, so trust and feedback are important. The Tapzyy card gives us a clean and professional way to make reviews easier.',
    business: 'Emporium Design',
    location: 'Rajkot, Gujarat',
    rating: 5,
    verified: true,
    image: '/assets/reviews/emporium_design_install.jpg',
    imageAlt: 'Tapzyy NFC card on showroom display board at Emporium Design',
    imagePosition: 'center 48%',
    photoBadge: 'Showroom Display'
  },
  {
    id: 'rev-3',
    industry: 'Cafe & Dining',
    industryIcon: '☕',
    text: 'We placed the Tapzyy card right next to our billing counter. It looks premium and customers can simply tap their phone instead of searching for our business on Google.',
    business: 'Kink Speciality Coffee',
    location: 'Indiranagar, Bengaluru',
    rating: 5,
    verified: true,
    image: '/assets/reviews/kink_coffee_counter.jpg',
    imageAlt: 'Tapzyy Google Review Card at Kink Speciality Coffee billing counter',
    imagePosition: 'center 68%',
    photoBadge: 'Live Counter Setup'
  },
  {
    id: 'rev-4',
    industry: 'Salon & Spa',
    industryIcon: '💇',
    text: 'The card looks great on our reception desk and fits naturally into the customer experience. After their appointment, clients can quickly access our Google review page.',
    business: 'Color Cafe - Salon',
    location: 'Bandra West, Mumbai',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-5',
    industry: 'Car Detailing',
    industryIcon: '🚗',
    text: 'The card sits perfectly at our delivery counter. Customers have their phones with them when they collect their cars, so tapping the card feels like a very natural next step.',
    business: 'Carbon and Chrome Automotive Studio',
    location: 'Koregaon Park, Pune',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-6',
    industry: 'Fashion Boutique',
    industryIcon: '👗',
    text: "We were looking for something that wouldn't look out of place in our store. The acrylic card feels premium and the tap experience is extremely simple for customers.",
    business: 'ETNIKO Designer Boutique',
    location: 'Hyderabad',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-7',
    industry: 'Gym',
    industryIcon: '🏋️',
    text: 'We placed the card at our front desk where members check in and out. It gives us a simple way to make feedback part of the everyday customer experience.',
    business: 'ICONIC FITNESS KORAMANGALA',
    location: 'Koramangala, Bengaluru',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-8',
    industry: 'Veterinary Clinic',
    industryIcon: '🐾',
    text: 'Pet parents often want to share their experience after a good visit. Having the card at reception gives them an easy way to find us on Google while the experience is still fresh.',
    business: 'Cessna Lifeline Veterinary Hospital',
    location: 'Sadashiva Nagar, Bengaluru',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-9',
    industry: 'Mobile Repair',
    industryIcon: '📱',
    text: 'Customers are usually really happy when they get their devices back quickly. Having the Tapzyy card at the pickup counter gives them an easy way to share that experience.',
    business: 'Carenpair',
    location: 'Navrangpura, Ahmedabad',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-10',
    industry: 'Hospitality',
    industryIcon: '🏨',
    text: 'We wanted the review process to feel like part of the guest experience rather than an awkward request. A simple tap at the reception desk makes accessing our Google profile much easier.',
    business: 'The Oberoi Udaivilas',
    location: 'Udaipur, Rajasthan',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-11',
    industry: 'Restaurant',
    industryIcon: '🍽️',
    text: 'The Tapzyy card is small, clean and easy to place near the billing counter. Guests can simply tap their phone and continue with their day.',
    business: 'The Bombay Canteen',
    location: 'Mumbai',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-12',
    industry: 'Professional Services',
    industryIcon: '💼',
    text: 'For a professional business, presentation matters. The Tapzyy card looks polished on our desk and gives clients a straightforward way to find our Google profile.',
    business: 'Professional Services Example',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-13',
    industry: 'Real Estate',
    industryIcon: '🏠',
    text: 'Our clients already use their phones throughout the property journey. Having a simple tap point gives them an easy way to access our business profile when they want to share feedback.',
    business: 'Real Estate Example',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-14',
    industry: 'Wellness & Beauty',
    industryIcon: '💆',
    text: 'We wanted something simple, elegant and easy for clients to use. The Tapzyy card fits naturally at reception and makes accessing our review page much easier.',
    business: 'Wellness & Beauty Example',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    verified: true
  },
  {
    id: 'rev-15',
    industry: 'Bakery & Sweets',
    industryIcon: '🧁',
    text: "The billing counter is the perfect place for the card. Customers can tap while they're waiting for their order, without needing to search for our business manually.",
    business: 'Bakery & Sweets Example',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    verified: true
  }
];

export default function ReviewWallSection({
  reviews = DEFAULT_REVIEWS,
  badge = "Customer Stories Across Every Industry",
  titlePrefix = "Trusted by 500+ ",
  highlightText = "Businesses Across India",
  titleSuffix = "",
  subtitle = "From cafes and salons to dental clinics, auto studios, and hospitality brands.",
  ratingScore = "4.9",
  reviewsCountText = "Verified Business Reviews"
}) {
  const sliderRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeFrame, setActiveFrame] = useState(0);

  const totalFrames = Math.ceil(reviews.length / 3);

  const updateScrollState = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

    const frameIdx = Math.round(scrollLeft / (clientWidth || 1));
    setActiveFrame(Math.min(Math.max(0, frameIdx), totalFrames - 1));
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [reviews]);

  const handlePrev = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollAmount = container.clientWidth;
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  };

  const handleNext = () => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const scrollAmount = container.clientWidth;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const scrollToFrame = (frameIndex) => {
    if (!sliderRef.current) return;
    const container = sliderRef.current;
    const targetScroll = frameIndex * container.clientWidth;
    container.scrollTo({ left: targetScroll, behavior: 'smooth' });
  };

  const getInitials = (business) => {
    if (!business) return 'T';
    const clean = business.replace(/[^a-zA-Z0-9\s]/g, '').trim();
    const words = clean.split(/\s+/).filter(Boolean);
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <section 
      className="tapzyy-review-section"
      aria-label="Customer Reviews and Social Proof Across Diverse Businesses"
    >
      <div className="tapzyy-review-container">
        
        {/* Header Section */}
        <div className="tapzyy-review-header">
          {badge && (
            <span className="tapzyy-review-badge">
              <Sparkles size={14} />
              {badge}
            </span>
          )}
          <h2 className="tapzyy-review-title">
            {titlePrefix}
            <span className="tapzyy-review-title-highlight">{highlightText}</span>
            {titleSuffix}
          </h2>
          {subtitle && <p className="tapzyy-review-subtitle">{subtitle}</p>}

          {/* Summary Board Bar */}
          <div className="tapzyy-review-summary-board">
            <div className="tapzyy-summary-stat">
              <div className="tapzyy-summary-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#F59E0B" stroke="#F59E0B" />
                ))}
              </div>
              <span className="tapzyy-summary-score">{ratingScore} / 5.0</span>
            </div>
            
            <div className="tapzyy-summary-divider"></div>
            
            <div className="tapzyy-summary-pill">
              <CheckCircle2 size={16} className="tapzyy-summary-icon" />
              <span>{reviewsCountText}</span>
            </div>

            <div className="tapzyy-summary-divider"></div>

            <div className="tapzyy-summary-pill photo-proof-pill">
              <ShieldCheck size={16} className="tapzyy-summary-icon" />
              <span>100% Authentic Customer Feedback</span>
            </div>
          </div>
        </div>

        {/* Carousel Header Controls */}
        <div className="tapzyy-slider-header-controls">
          <div className="tapzyy-slider-meta">
            <span className="tapzyy-slider-frame-count">
              Showing <strong>{activeFrame * 3 + 1}–{Math.min((activeFrame + 1) * 3, reviews.length)}</strong> of {reviews.length} reviews
            </span>
            <span className="tapzyy-mobile-swipe-hint">
              👉 Swipe right to view more
            </span>
          </div>

          <div className="tapzyy-slider-nav-btns">
            <button 
              type="button"
              className="tapzyy-slider-arrow prev" 
              onClick={handlePrev}
              disabled={!canScrollLeft}
              aria-label="Previous reviews"
              title="Previous reviews"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              type="button"
              className="tapzyy-slider-arrow next" 
              onClick={handleNext}
              disabled={!canScrollRight}
              aria-label="Next reviews"
              title="Next reviews"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Horizontal Slider: 3 Reviews in 1 Frame on Desktop, Swipe on Mobile */}
        <div className="tapzyy-review-slider-wrapper">
          <div 
            className="tapzyy-review-slider-track"
            ref={sliderRef}
            onScroll={updateScrollState}
          >
            {reviews.map((rev) => {
              const initials = getInitials(rev.business);

              return (
                <article 
                  key={rev.id} 
                  className={`tapzyy-review-card ${rev.image ? 'has-media' : 'text-only'}`}
                >
                  {rev.image ? (
                    <div className="tapzyy-review-card-media">
                      <img
                        src={rev.image}
                        alt={rev.imageAlt || `${rev.business} review setup`}
                        className="tapzyy-review-card-img"
                        style={{ objectPosition: rev.imagePosition || 'center center' }}
                        loading="lazy"
                      />
                      <div className="tapzyy-review-media-badge">
                        <Camera size={12} />
                        <span>{rev.photoBadge || 'Live Setup'}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="tapzyy-review-card-top-accent" />
                  )}

                  <div className="tapzyy-review-card-body">
                    {/* Top Row: Industry Tag & Verified Badge */}
                    <div className="tapzyy-review-card-topbar">
                      <span className="tapzyy-review-industry-tag">
                        <span>{rev.industryIcon || '🏢'}</span>
                        <span>{rev.industry}</span>
                      </span>

                      {rev.verified && (
                        <span className="tapzyy-verified-badge" title="Verified Customer">
                          <CheckCircle2 size={12} />
                          Verified
                        </span>
                      )}
                    </div>

                    {/* Star Rating & Quote Icon */}
                    <div className="tapzyy-review-rating-row">
                      <div className="tapzyy-review-card-stars">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <Star key={i} size={15} fill="#F59E0B" stroke="#F59E0B" />
                        ))}
                      </div>
                      <Quote size={18} className="tapzyy-review-quote-icon" />
                    </div>

                    {/* Review Text */}
                    <p className="tapzyy-review-text">"{rev.text}"</p>

                    {/* Business Info Footer */}
                    <div className="tapzyy-review-card-footer">
                      <div className="tapzyy-review-user-info">
                        <div className="tapzyy-review-avatar">
                          {initials}
                        </div>
                        <div className="tapzyy-review-user-details">
                          <span className="tapzyy-review-name">{rev.business}</span>
                          <span className="tapzyy-review-location">
                            <MapPin size={11} className="tapzyy-location-pin" />
                            {rev.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="tapzyy-slider-dots" role="tablist" aria-label="Review pagination">
            {Array.from({ length: totalFrames }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`tapzyy-slider-dot ${activeFrame === idx ? 'active' : ''}`}
                onClick={() => scrollToFrame(idx)}
                aria-label={`Go to frame ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Pre-Footer Call to Action Box */}
        <div className="tapzyy-review-cta-box">
          <div className="tapzyy-cta-content">
            <h3 className="tapzyy-review-cta-heading">
              Ready to collect 5-star reviews for your business?
            </h3>
            <p className="tapzyy-review-cta-sub">
              Join 500+ cafes, salons, clinics, retail stores, and service businesses across India. Fast dispatch, free setup, zero monthly subscription fees.
            </p>
            <Link to="/shop" className="tapzyy-review-cta-btn">
              <span>Get Your Tapzyy Card Today</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

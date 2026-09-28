import React, { useState, useRef } from 'react';
import './CardPlacementSection.css';

/**
 * Default Placement Data using the user's real uploaded photos
 */
export const DEFAULT_PLACEMENTS = [
  {
    id: 'counter',
    image: '/assets/placements/placement_1.jpg',
    title: 'On Your Counter',
    alt: 'Tapzyy NFC review card displayed on a customer counter'
  },
  {
    id: 'reception',
    image: '/assets/placements/placement_2.jpg',
    title: 'At Your Reception',
    alt: 'Tapzyy NFC review card displayed at business reception desk'
  },
  {
    id: 'wall',
    image: '/assets/placements/placement_3.jpg',
    title: 'On Your Wall',
    alt: 'Tapzyy NFC review card displayed mounted on a business wall'
  },
  {
    id: 'entrance',
    image: '/assets/placements/placement_4.jpg',
    title: 'On Your Door / Entrance',
    alt: 'Tapzyy NFC review card displayed on glass entrance door'
  }
];

export default function CardPlacementSection({
  placements = DEFAULT_PLACEMENTS,
  badge = "Placement Guide",
  titlePrefix = "Find the ",
  highlightText = "Perfect Spot",
  titleSuffix = " for Your Tapzyy Card",
  subtitle = "Place it where your customers naturally interact with your business."
}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Track horizontal scroll position on mobile to update indicator dots
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollPosition = container.scrollLeft;
    const firstCard = container.firstElementChild;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 16; // 1rem gap
    const newIndex = Math.round(scrollPosition / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(0, newIndex), placements.length - 1));
  };

  const scrollToCard = (index) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const firstCard = container.firstElementChild;
    if (!firstCard) return;

    const cardWidth = firstCard.offsetWidth;
    const gap = 16;
    container.scrollTo({
      left: index * (cardWidth + gap),
      behavior: 'smooth'
    });
  };

  return (
    <section 
      className="tapzyy-placement-section"
      aria-label="Tapzyy Card Placement Recommendations"
    >
      {/* Header */}
      <div className="tapzyy-placement-header">
        {badge && <span className="tapzyy-placement-badge">{badge}</span>}
        <h2 className="tapzyy-placement-title">
          {titlePrefix}
          <span className="tapzyy-placement-highlight">{highlightText}</span>
          {titleSuffix}
        </h2>
        {subtitle && <p className="tapzyy-placement-subtitle">{subtitle}</p>}
      </div>

      {/* Cards Grid / Mobile Carousel */}
      <div className="tapzyy-placement-container">
        <div 
          className="tapzyy-placement-grid" 
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {placements.map((item, idx) => (
            <article 
              key={item.id || idx} 
              className="tapzyy-placement-card"
            >
              <div className="tapzyy-placement-img-wrapper">
                <img
                  src={item.image}
                  alt={item.alt || item.title}
                  className="tapzyy-placement-img"
                  loading="lazy"
                />
              </div>
              <div className="tapzyy-placement-caption">
                <h3 className="tapzyy-placement-caption-text">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile Swipe Indicators */}
        {placements.length > 1 && (
          <div className="tapzyy-placement-indicators" aria-hidden="true">
            {placements.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`tapzyy-placement-dot ${activeIndex === idx ? 'active' : ''}`}
                onClick={() => scrollToCard(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

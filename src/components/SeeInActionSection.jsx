import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './SeeInActionSection.css';

export const TAPZYY_VIDEO_ASSET = "/videos/tapzyy-demo.mp4";

export const DEFAULT_STEPS = [
  {
    number: "01",
    title: "Tap",
    desc: "Your customer simply taps their phone on your Tapzyy card."
  },
  {
    number: "02",
    title: "Review",
    desc: "They’re guided through a simple review experience."
  },
  {
    number: "03",
    title: "Grow",
    desc: "Happy customers can easily leave a Google review for your business."
  }
];

export default function SeeInActionSection({
  videoSrc = TAPZYY_VIDEO_ASSET,
  badge = "Product Demo",
  title = "See Tapzyy in Action",
  subtitle = "Turn every customer interaction into an opportunity for a Google review.",
  steps = DEFAULT_STEPS,
  ctaText = "Get Your Tapzyy Card",
  ctaLink = "/shop"
}) {
  return (
    <section 
      className="see-in-action-section"
      aria-label="See Tapzyy in Action"
    >
      <div className="see-in-action-container">
        
        {/* Header */}
        <div className="see-in-action-header">
          {badge && <span className="see-in-action-badge">{badge}</span>}
          <h2 className="see-in-action-title">{title}</h2>
          {subtitle && <p className="see-in-action-subtitle">{subtitle}</p>}
        </div>

        {/* Content Grid */}
        <div className="see-in-action-grid">
          
          {/* Left: Video */}
          <div className="see-in-action-video-wrapper">
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/tapzyy-counter-hero.jpg"
              className="see-in-action-video"
            />
          </div>

          {/* Right: 3 Steps */}
          <div className="see-in-action-steps-column">
            <div className="see-in-action-steps-list">
              {steps.map((step, idx) => (
                <div key={idx} className="see-in-action-step-item">
                  <span className="see-in-action-step-num">{step.number}</span>
                  <div className="see-in-action-step-content">
                    <h3 className="see-in-action-step-title">{step.title}</h3>
                    <p className="see-in-action-step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Optional Micro CTA */}
            {ctaText && (
              <div className="see-in-action-cta-wrap">
                <Link to={ctaLink} className="see-in-action-btn">
                  <span>{ctaText}</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}

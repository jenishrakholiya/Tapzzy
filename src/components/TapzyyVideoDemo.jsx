import React from 'react';
import { Link } from 'react-router-dom';

export const TapzyyVideoDemo = ({
  video = "/videos/tapzyy-demo.mp4",
  eyebrow = "SEE TAPZYY IN ACTION",
  heading = "See How Tapzyy Turns a Simple Tap Into Customer Action.",
  description = "Give your customers a simple way to review, follow and connect with your business — right when their experience is fresh.",
  panelEyebrow = "BUILT FOR LOCAL BUSINESSES",
  panelHeading = "Make Every Customer Interaction Count.",
  panelDescription = "Tapzyy makes it easier for customers to take the next step — whether that's leaving a Google review, following your Instagram or connecting with your business.",
  benefits = [
    {
      number: "01",
      title: "TAP OR SCAN",
      desc: "NFC and QR make the experience simple."
    },
    {
      number: "02",
      title: "REACH THE RIGHT PLACE",
      desc: "Send customers directly to your chosen destination."
    },
    {
      number: "03",
      title: "KEEP GROWING",
      desc: "Turn everyday customer interactions into valuable digital connections."
    }
  ],
  ctaText = "See How It Works →",
  ctaLink = "/how-it-works"
}) => {
  return (
    <section className="tapzyy-demo-section">
      <div className="container">

        {/* SECTION HEADER */}
        <div className="tapzyy-demo-header">
          <div className="tapzyy-demo-eyebrow">
            {eyebrow}
          </div>
          <h2 className="tapzyy-demo-heading">
            {heading}
          </h2>
          {description && (
            <p className="tapzyy-demo-subtext">
              {description}
            </p>
          )}
        </div>

        {/* CONNECTED BANNER CARD (LEFT: VIDEO, RIGHT: TAPZYY BLUE PANEL) */}
        <div className="tapzyy-demo-banner">

          {/* LEFT: VIDEO AREA (VIDEO PLAYS FIRST ON MOBILE) */}
          <div className="tapzyy-demo-media">
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/tapzyy-counter-hero.jpg"
              className="tapzyy-demo-img"
            />
          </div>

          {/* RIGHT: TAPZYY BLUE CONTENT PANEL (TEXT SHOWS AT BOTTOM ON MOBILE) */}
          <div className="tapzyy-demo-content">
            <div className="tapzyy-demo-panel-eyebrow">
              {panelEyebrow}
            </div>

            <h3 className="tapzyy-demo-panel-heading">
              {panelHeading}
            </h3>

            <p className="tapzyy-demo-panel-desc">
              {panelDescription}
            </p>

            {/* THREE BENEFIT ITEMS */}
            <div className="tapzyy-demo-benefits">
              {benefits.map((item, idx) => (
                <div key={idx} className="tapzyy-demo-benefit-item">
                  <span className="tapzyy-demo-benefit-num">{item.number}</span>
                  <div className="tapzyy-demo-benefit-text">
                    <h4 className="tapzyy-demo-benefit-title">{item.title}</h4>
                    <p className="tapzyy-demo-benefit-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA BUTTON */}
            <div className="tapzyy-demo-cta-wrap">
              <Link to={ctaLink} className="tapzyy-demo-btn-white">
                <span>{ctaText}</span>
              </Link>
            </div>

          </div>

        </div>

      </div>

      {/* COMPONENT SCOPED CSS */}
      <style>{`
        .tapzyy-demo-section {
          padding: 5.5rem 0;
          background-color: #FAF9F6;
          border-bottom: 1px solid var(--color-line, #E2E8F0);
          overflow: hidden;
        }

        .tapzyy-demo-header {
          max-width: 780px;
          margin: 0 auto 3.25rem auto;
          text-align: center;
        }

        .tapzyy-demo-eyebrow {
          display: inline-block;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--color-brand-primary, #0066FF);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
          background-color: rgba(0, 102, 255, 0.08);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
        }

        .tapzyy-demo-heading {
          font-size: clamp(2rem, 3.5vw, 2.75rem);
          font-weight: 800;
          color: var(--color-ink, #0B1220);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .tapzyy-demo-subtext {
          font-size: 1.05rem;
          color: var(--color-ink-soft, #475569);
          line-height: 1.6;
          margin: 0 auto;
          max-width: 620px;
        }

        /* UNIFIED CONNECTED BANNER CARD */
        .tapzyy-demo-banner {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          background-color: #0066FF;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 20px 48px -10px rgba(0, 102, 255, 0.28), 0 4px 16px rgba(11, 18, 32, 0.08);
          border: 1px solid rgba(0, 102, 255, 0.25);
          align-items: center;
        }

        /* LEFT SIDE: VIDEO AREA */
        .tapzyy-demo-media {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 480px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 0;
          background-color: #080E1A;
        }

        .tapzyy-demo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          object-position: center center;
          display: block;
          -webkit-transform: translateZ(0);
          transform: translateZ(0);
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }

        /* RIGHT SIDE: TAPZYY BLUE CONTENT PANEL */
        .tapzyy-demo-content {
          padding: 3.5rem 3.25rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          color: #FFFFFF;
        }

        .tapzyy-demo-panel-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.2);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
          margin-bottom: 1.1rem;
        }

        .tapzyy-demo-panel-heading {
          font-size: clamp(1.65rem, 2.4vw, 2.2rem);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
        }

        .tapzyy-demo-panel-desc {
          font-size: 0.98rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.6;
          margin-bottom: 1.85rem;
        }

        /* BENEFIT LIST */
        .tapzyy-demo-benefits {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
          width: 100%;
        }

        .tapzyy-demo-benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 1.15rem;
        }

        .tapzyy-demo-benefit-num {
          font-size: 0.85rem;
          font-weight: 900;
          color: #0066FF;
          background-color: #FFFFFF;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .tapzyy-demo-benefit-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }

        .tapzyy-demo-benefit-desc {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.45;
          margin: 0;
        }

        /* WHITE CTA BUTTON */
        .tapzyy-demo-cta-wrap {
          margin-top: 0.25rem;
          width: 100%;
        }

        .tapzyy-demo-btn-white {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #FFFFFF;
          color: #0B1220;
          padding: 0.9rem 1.8rem;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.18);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tapzyy-demo-btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          background-color: #F8FAFC;
        }

        /* RESPONSIVE MOBILE & TABLET (VIDEO PLAYS FIRST, TEXT AT BOTTOM) */
        @media (max-width: 968px) {
          .tapzyy-demo-section {
            padding: 2.5rem 0 3.5rem;
          }

          .tapzyy-demo-banner {
            display: flex;
            flex-direction: column;
            border-radius: 22px;
          }

          /* VIDEO ON TOP */
          .tapzyy-demo-media {
            order: 1;
            width: 100%;
            min-height: auto;
            padding: 0;
            background-color: #080E1A;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .tapzyy-demo-img {
            width: 100%;
            height: auto;
            object-fit: contain;
            object-position: center;
          }

          /* TEXT AT BOTTOM */
          .tapzyy-demo-content {
            order: 2;
            width: 100%;
            padding: 2.5rem 1.75rem 2.25rem;
          }

          .tapzyy-demo-btn-white {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .tapzyy-demo-section {
            padding: 1.5rem 0 2.5rem;
          }

          .tapzyy-demo-banner {
            border-radius: 18px;
          }

          .tapzyy-demo-content {
            padding: 2rem 1.25rem 1.75rem;
          }
        }
      `}</style>
    </section>
  );
};

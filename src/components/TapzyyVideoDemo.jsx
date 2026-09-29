import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { VolumeX, Volume2, Sparkles } from 'lucide-react';

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
      desc: "NFC chip & dynamic QR code make the experience instant."
    },
    {
      number: "02",
      title: "DIRECT DESTINATION",
      desc: "Send customers straight to your Google review page."
    },
    {
      number: "03",
      title: "AUTOMATED GROWTH",
      desc: "Turn everyday customer visits into 5-star digital reputation."
    }
  ],
  ctaText = "See How It Works →",
  ctaLink = "/how-it-works"
}) => {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="tapzyy-demo-section">
      <div className="container">

        {/* SECTION HEADER */}
        <div className="tapzyy-demo-header">
          <div className="tapzyy-demo-eyebrow">
            <Sparkles size={13} style={{ flexShrink: 0 }} />
            <span>{eyebrow}</span>
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

        {/* UNIFIED BANNER CARD */}
        <div className="tapzyy-demo-banner">

          {/* LEFT: SMARTPHONE MOCKUP FRAME CONTAINER */}
          <div className="tapzyy-demo-media-container">
            <div className="tapzyy-phone-frame">
              {/* Phone Camera Punch Hole Notch */}
              <div className="tapzyy-phone-notch" />
              
              {/* Live Badge */}
              <div className="tapzyy-phone-live-tag">
                <span className="live-dot" /> LIVE NFC DEMO
              </div>

              {/* Video Player */}
              <video
                ref={videoRef}
                src={video}
                autoPlay
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                poster="/assets/tapzyy-counter-hero.jpg"
                className="tapzyy-phone-video"
              />

              {/* Mute / Unmute Control Overlay */}
              <button
                type="button"
                onClick={toggleMute}
                className="tapzyy-phone-sound-btn"
                aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isMuted ? "Tap to Unmute" : "Sound On"}</span>
              </button>
            </div>
          </div>

          {/* RIGHT: BLUE CONTENT PANEL */}
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

            {/* BENEFITS LIST */}
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
          padding: 3.5rem 0;
          background-color: #FAF9F6;
          border-bottom: 1px solid var(--color-line, #E2E8F0);
          overflow: hidden;
        }

        .tapzyy-demo-header {
          max-width: 760px;
          margin: 0 auto 2.25rem auto;
          text-align: center;
        }

        .tapzyy-demo-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.78rem;
          font-weight: 800;
          color: var(--color-brand-primary, #0066FF);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
          background-color: rgba(0, 102, 255, 0.08);
          padding: 0.35rem 0.85rem;
          border-radius: 9999px;
        }

        .tapzyy-demo-heading {
          font-size: clamp(1.85rem, 3.2vw, 2.5rem);
          font-weight: 800;
          color: var(--color-ink, #0B1220);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .tapzyy-demo-subtext {
          font-size: 1rem;
          color: var(--color-ink-soft, #475569);
          line-height: 1.55;
          margin: 0 auto;
          max-width: 600px;
        }

        /* UNIFIED CONNECTED BANNER CARD */
        .tapzyy-demo-banner {
          display: grid;
          grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
          background: linear-gradient(135deg, #0066FF 0%, #0047AB 100%);
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 16px 40px -10px rgba(0, 102, 255, 0.3), 0 4px 16px rgba(11, 18, 32, 0.08);
          border: 1px solid rgba(0, 102, 255, 0.3);
          align-items: center;
          padding: 2.25rem;
          gap: 2rem;
        }

        /* LEFT SIDE: SMARTPHONE DEVICE MOCKUP */
        .tapzyy-demo-media-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        .tapzyy-phone-frame {
          position: relative;
          width: 100%;
          max-width: 290px;
          aspect-ratio: 9 / 18.5;
          max-height: 480px;
          background-color: #080E1A;
          border-radius: 36px;
          border: 7px solid #0F172A;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.15);
          overflow: hidden;
          margin: 0 auto;
        }

        .tapzyy-phone-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 84px;
          height: 16px;
          background-color: #0F172A;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          z-index: 10;
        }

        .tapzyy-phone-live-tag {
          position: absolute;
          top: 10px;
          left: 12px;
          z-index: 10;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          color: #FFFFFF;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: 0.2rem 0.55rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .live-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #10B981;
          box-shadow: 0 0 8px #10B981;
          animation: livePulse 1.5s infinite;
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }

        .tapzyy-phone-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        .tapzyy-phone-sound-btn {
          position: absolute;
          bottom: 12px;
          right: 12px;
          z-index: 10;
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.35rem 0.65rem;
          border-radius: 20px;
          font-size: 0.72rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tapzyy-phone-sound-btn:hover {
          background: rgba(15, 23, 42, 0.98);
          transform: scale(1.04);
        }

        /* RIGHT SIDE: CONTENT PANEL */
        .tapzyy-demo-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          color: #FFFFFF;
        }

        .tapzyy-demo-panel-eyebrow {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FFFFFF;
          background-color: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.75rem;
          border-radius: 9999px;
          margin-bottom: 0.85rem;
        }

        .tapzyy-demo-panel-heading {
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.25;
          letter-spacing: -0.02em;
          margin-bottom: 0.75rem;
        }

        .tapzyy-demo-panel-desc {
          font-size: 0.92rem;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.55;
          margin-bottom: 1.5rem;
        }

        /* BENEFIT LIST */
        .tapzyy-demo-benefits {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.75rem;
          width: 100%;
        }

        .tapzyy-demo-benefit-item {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .tapzyy-demo-benefit-num {
          font-size: 0.8rem;
          font-weight: 800;
          color: #0066FF;
          background-color: #FFFFFF;
          width: 30px;
          height: 30px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
        }

        .tapzyy-demo-benefit-title {
          font-size: 0.82rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.15rem;
        }

        .tapzyy-demo-benefit-desc {
          font-size: 0.84rem;
          color: rgba(255, 255, 255, 0.88);
          line-height: 1.4;
          margin: 0;
        }

        /* WHITE CTA BUTTON */
        .tapzyy-demo-cta-wrap {
          margin-top: 0.2rem;
          width: 100%;
        }

        .tapzyy-demo-btn-white {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: #FFFFFF;
          color: #0B1220;
          padding: 0.8rem 1.6rem;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 800;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .tapzyy-demo-btn-white:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.22);
          background-color: #F8FAFC;
        }

        /* RESPONSIVE MOBILE & TABLET */
        @media (max-width: 968px) {
          .tapzyy-demo-section {
            padding: 2.5rem 0;
          }

          .tapzyy-demo-banner {
            grid-template-columns: 1fr;
            padding: 1.75rem 1.25rem;
            gap: 1.75rem;
            border-radius: 20px;
          }

          .tapzyy-phone-frame {
            max-width: 260px;
            max-height: 420px;
          }

          .tapzyy-demo-btn-white {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .tapzyy-demo-section {
            padding: 2rem 0;
          }

          .tapzyy-demo-heading {
            font-size: 1.6rem;
          }

          .tapzyy-demo-subtext {
            font-size: 0.92rem;
          }
        }
      `}</style>
    </section>
  );
};

import React from 'react';

const CUSTOMER_LOGOS = [
  {
    name: "Fitzone",
    src: "/assets/logos/fitzone.jpg",
    alt: "Fitzone — Tapzyy customer"
  },
  {
    name: "Snitch",
    src: "/assets/logos/snitch.jpg",
    alt: "Snitch — Tapzyy customer"
  },
  {
    name: "Louis Philippe",
    src: "/assets/logos/louis-philippe.png",
    alt: "Louis Philippe — Tapzyy customer"
  },
  {
    name: "Brotomotiv",
    src: "/assets/logos/brotomotiv.jpg",
    alt: "Brotomotiv — Tapzyy customer"
  },
  {
    name: "McDonald's",
    src: "/assets/logos/mcdonalds.png",
    alt: "McDonald's — Tapzyy customer"
  }
];

export const TrustedByMarquee = () => {
  // Quadruple array for seamless ultra-smooth fast marquee loop
  const marqueeLogos = [...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS, ...CUSTOMER_LOGOS];

  return (
    <section className="trusted-by-section" aria-label="Trusted by 500+ local businesses">
      <div className="trusted-by-container">
        <h2 className="trusted-by-heading">
          <span className="trusted-by-highlight">500+</span> LOCAL BUSINESSES USE TAPZYY
        </h2>

        <div className="marquee-wrapper">
          <div className="marquee-fade-left" aria-hidden="true" />
          <div className="marquee-fade-right" aria-hidden="true" />
          
          <div className="marquee-track">
            {marqueeLogos.map((logo, index) => (
              <div key={index} className="marquee-item">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="marquee-logo"
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .trusted-by-section {
          width: 100%;
          background-color: #FFFFFF;
          padding: 40px 0;
          border-top: 1px solid var(--color-line, #E2E8F0);
          border-bottom: 1px solid var(--color-line, #E2E8F0);
          overflow: hidden;
          position: relative;
        }

        .trusted-by-container {
          width: 100%;
          margin: 0 auto;
        }

        .trusted-by-heading {
          text-align: center;
          font-family: inherit;
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-ink, #0F172A);
          margin: 0 0 28px 0;
          line-height: 1.4;
          padding: 0 16px;
        }

        .trusted-by-highlight {
          font-weight: 900;
          font-size: 1.35rem;
          color: var(--color-brand-primary, #0066FF);
          margin-right: 6px;
        }

        .marquee-wrapper {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
          height: 150px;
        }

        .marquee-fade-left,
        .marquee-fade-right {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 90px;
          z-index: 2;
          pointer-events: none;
        }

        .marquee-fade-left {
          left: 0;
          background: linear-gradient(to right, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
        }

        .marquee-fade-right {
          right: 0;
          background: linear-gradient(to left, #FFFFFF 0%, rgba(255, 255, 255, 0) 100%);
        }

        .marquee-track {
          display: flex;
          align-items: center;
          gap: 60px;
          width: max-content;
          will-change: transform;
          animation: tapzyySuperFastMarquee 10s linear infinite;
        }

        .marquee-wrapper:hover .marquee-track {
          animation-play-state: paused;
        }

        .marquee-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 250px;
          height: 130px;
        }

        .marquee-logo {
          height: 110px;
          width: auto;
          max-width: 240px;
          object-fit: contain;
          display: block;
          transform: scale(1.25);
          transform-origin: center center;
        }

        @keyframes tapzyySuperFastMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (max-width: 968px) {
          .marquee-wrapper {
            height: 110px;
          }
          .marquee-item {
            width: 190px;
            height: 100px;
          }
          .marquee-logo {
            height: 80px;
            max-width: 180px;
            transform: scale(1.15);
          }
          .marquee-track {
            gap: 40px;
          }
        }

        @media (max-width: 640px) {
          .trusted-by-section {
            padding: 28px 0;
          }

          .trusted-by-heading {
            font-size: 0.9rem;
            margin-bottom: 20px;
          }

          .marquee-wrapper {
            height: 90px;
          }

          .marquee-track {
            gap: 25px;
          }

          .marquee-item {
            width: 140px;
            height: 80px;
          }

          .marquee-logo {
            height: 60px;
            max-width: 130px;
            transform: scale(1.1);
          }

          .marquee-fade-left,
          .marquee-fade-right {
            width: 45px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none;
            width: 100%;
            justify-content: space-around;
            flex-wrap: wrap;
            gap: 24px;
          }
          .marquee-wrapper {
            height: auto;
            overflow: visible;
          }
          .marquee-fade-left,
          .marquee-fade-right {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedByMarquee;

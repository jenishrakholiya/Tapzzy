import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mail, ShieldCheck } from 'lucide-react';
import { SEOHead } from './SEOHead';
import './PolicyLayout.css';

export const PolicyLayout = ({
  title,
  breadcrumbTitle,
  badge = "Official Policy",
  badgeIcon: BadgeIcon = ShieldCheck,
  lastUpdated = "September 2026",
  seoTitle,
  seoDescription,
  children
}) => {
  return (
    <div className="policy-page">
      <SEOHead 
        title={seoTitle || `${title} | Tapzyy`} 
        description={seoDescription || `Read Tapzyy's official ${title.toLowerCase()} for transparent, reliable business operations.`} 
      />

      <div className="policy-container">
        
        {/* Breadcrumb Navigation */}
        <nav className="policy-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="policy-breadcrumb-link">Home</Link>
          <ChevronRight size={14} className="policy-breadcrumb-sep" />
          <span className="policy-breadcrumb-active">{breadcrumbTitle || title}</span>
        </nav>

        {/* Hero Header Area */}
        <div className="policy-hero-header">
          <Link to="/" className="policy-hero-brand" title="Tapzyy Home">
            <img
              src="/logo.png"
              alt="Tapzyy Logo"
              className="policy-hero-logo"
            />
            <span className="policy-hero-brand-name">
              Tapzyy<span className="policy-hero-brand-dot">.</span>
            </span>
          </Link>

          <div className="policy-hero-badge">
            <BadgeIcon size={14} />
            <span>{badge}</span>
          </div>
          <h1 className="policy-hero-title">{title}</h1>
          <p className="policy-hero-meta">
            Effective & Last Updated: <strong>{lastUpdated}</strong>
          </p>
        </div>

        {/* Main Policy Content Card */}
        <main className="policy-main-card">
          <div className="policy-content-body">
            {children}
          </div>

          {/* Contact Support Footer Box */}
          <div className="policy-contact-card">
            <div className="policy-contact-icon-wrapper">
              <Mail size={22} />
            </div>
            <div className="policy-contact-details">
              <h3 className="policy-contact-heading">Questions or Assistance?</h3>
              <p className="policy-contact-sub">
                Our support team is here to assist with any questions regarding our {breadcrumbTitle || title}.
              </p>
              <a href="mailto:Tapzyy.in@gmail.com" className="policy-contact-email-btn">
                <Mail size={16} />
                <span>email - Tapzyy.in@gmail.com</span>
              </a>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default PolicyLayout;

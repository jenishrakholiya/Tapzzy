import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  Edit3,
  Play,
  Volume2,
  VolumeX,
  ChevronDown
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import './AiReviewSuitePage.css';

export const AiReviewSuitePage = () => {
  // Generator Form State
  const [rawExperience, setRawExperience] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(true);

  // Generated Reviews Data State
  const [reviews, setReviews] = useState({
    professional: "Recently visited Urban Brew Café for artisanal cold brew & fresh bakery items. The staff maintained high standards of service, clear communication, and efficiency throughout. Highly recommend them for reliable quality.",
    warm: "Had such a wonderful experience at Urban Brew Café! The team was super friendly, attentive, and made sure our hazelnut croissant was freshly baked. You can tell they truly care about their customers. Definitely coming back soon!",
    seo: "If you're looking for the best cold brew café in town, I highly recommend Urban Brew Café! Freshly baked pastries, fast Wi-Fi, and top-notch customer service. Definitely one of the finest spots for coffee lovers."
  });

  // Card Selection & Editing State
  const [selectedStyle, setSelectedStyle] = useState('professional');
  const [copiedStyle, setCopiedStyle] = useState(null);
  const [editingStyle, setEditingStyle] = useState(null);
  const [editText, setEditText] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(null);

  // AI Review Generator Function
  const handleGenerate = (e) => {
    if (e) e.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      const bName = businessName.trim() || 'Urban Brew Café';
      const sType = serviceType.trim() || 'service & products';
      const input = rawExperience.trim();

      if (!input) {
        setReviews({
          professional: `Had an excellent experience with ${bName}. The ${sType} was handled with high attention to detail and professionalism. Highly recommended for reliable quality.`,
          warm: `Loved my experience at ${bName}! The team was super friendly, attentive, and made sure everything went smoothly. Will definitely be coming back!`,
          seo: `Top-rated ${sType} in town! ${bName} provided prompt, high-quality service and excellent customer care. Best spot for quality ${sType}.`
        });
      } else {
        setReviews({
          professional: `Recently visited ${bName}. ${input} The staff maintained high standards of service, clear communication, and efficiency throughout. Highly recommend them for reliable quality.`,
          warm: `Had such a wonderful experience at ${bName}! ${input} Everyone was so welcoming and friendly. You can tell they truly care about their customers. Definitely coming back soon!`,
          seo: `If you're looking for quality ${sType}, I highly recommend ${bName}! ${input} Great location, fast service, and top-notch quality. Definitely one of the finest spots.`
        });
      }

      setIsGenerating(false);
      setHasGenerated(true);
      // Smooth scroll to results
      const resultsEl = document.getElementById('ai-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 700);
  };

  const handleCopy = (styleKey, text) => {
    navigator.clipboard.writeText(text);
    setCopiedStyle(styleKey);
    setTimeout(() => {
      setCopiedStyle(null);
    }, 2000);
  };

  const startEdit = (styleKey, text) => {
    setEditingStyle(styleKey);
    setEditText(text);
  };

  const saveEdit = (styleKey) => {
    setReviews(prev => ({
      ...prev,
      [styleKey]: editText
    }));
    setEditingStyle(null);
  };

  const handleRegenerateStyle = (styleKey) => {
    setIsGenerating(true);
    setTimeout(() => {
      const bName = businessName.trim() || 'this business';
      const input = rawExperience.trim() || 'great service and friendly staff';

      let newText = '';
      if (styleKey === 'professional') {
        newText = `Extremely satisfied with ${bName}. ${input} Outstanding efficiency, pristine environment, and high professional standards.`;
      } else if (styleKey === 'warm') {
        newText = `So happy with our visit to ${bName}! ${input} The staff went above and beyond to make us feel welcome. Can't wait to visit again!`;
      } else {
        newText = `Highly recommended spot for ${serviceType.trim() || 'quality service'} at ${bName}! ${input} Fast turnaround and reliable quality.`;
      }

      setReviews(prev => ({
        ...prev,
        [styleKey]: newText
      }));
      setIsGenerating(false);
    }, 500);
  };

  const faqs = [
    {
      q: "What does Tapzyy AI actually do?",
      a: "Tapzyy AI takes a customer's raw, unedited thoughts and organizes them into clear, well-phrased review drafts in three distinct styles (Professional, Warm, and SEO-Friendly)."
    },
    {
      q: "Does Tapzyy AI write fake reviews?",
      a: "No. Tapzyy AI works strictly from the customer's own input. It never fabricates experiences, invents claims, or creates fake reviews. It simply improves wording and structure."
    },
    {
      q: "Can I edit the generated review?",
      a: "Yes! Every generated review draft can be fully edited or modified directly on screen before copying."
    },
    {
      q: "What is the difference between the three styles?",
      a: "Professional Style focuses on clear, structured, and polished feedback. Warm Style offers a friendly, personal, and enthusiastic tone. SEO-Friendly Style incorporates relevant business & service keywords naturally when supported by your feedback."
    },
    {
      q: "What does SEO-Friendly mean?",
      a: "It means the review naturally includes relevant service or category keywords that customers often search for, without keyword stuffing or false claims."
    },
    {
      q: "Does Tapzyy automatically post my review?",
      a: "No. Tapzyy AI provides text options for the customer. The customer always decides whether, which, and where to post their final review."
    }
  ];

  return (
    <div className="ai-page">
      <SEOHead
        title="Tapzyy AI Review Assistant — Turn Genuine Feedback Into Better Reviews"
        description="Help customers formulate clear, natural Google reviews from their authentic experience in 3 styles: Professional, Warm, and SEO-Friendly."
      />

      {/* 2. HERO SECTION */}
      <section className="ai-hero">
        <div className="ai-container">
          <div className="ai-hero-badge">
            <Sparkles size={14} /> TAPZYY AI REVIEW ASSISTANT
          </div>

          <h1 className="ai-hero-title">
            Your Experience. Your Words. Better Reviews.
          </h1>

          <p className="ai-hero-sub">
            Tapzyy AI helps turn genuine customer feedback into clear, natural review drafts — in three different styles.
          </p>

          <div className="ai-hero-actions">
            <a href="#ai-generator" className="ai-btn-primary">
              Try AI Review <Sparkles size={18} />
            </a>
            <a href="#how-it-works" className="ai-btn-secondary">
              See How It Works
            </a>
          </div>

          <div className="ai-trust-note">
            <ShieldCheck size={16} style={{ color: '#10B981' }} />
            <span>AI assists with wording. Customers decide what they submit.</span>
          </div>

          {/* HERO VISUAL MOCKUP */}
          <div className="ai-hero-mockup-wrapper">
            <div className="ai-mockup-topbar">
              <span className="ai-mockup-dot" style={{ backgroundColor: '#EF4444' }}></span>
              <span className="ai-mockup-dot" style={{ backgroundColor: '#F59E0B' }}></span>
              <span className="ai-mockup-dot" style={{ backgroundColor: '#10B981' }}></span>
              <span style={{ fontSize: '0.8rem', color: '#6B7280', marginLeft: '0.5rem', fontWeight: '600' }}>
                Tapzyy AI Review Assistant
              </span>
            </div>

            <div className="ai-mockup-body">
              <div style={{ backgroundColor: '#F8F9FA', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '1rem' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#6B7280', uppercase: 'true', marginBottom: '0.35rem' }}>CUSTOMER FEEDBACK</div>
                <div style={{ fontSize: '0.92rem', color: '#111111', fontWeight: '500' }}>
                  "The staff was super helpful, the service was very quick, and I really liked the hazelnut coffee..."
                </div>
              </div>

              <div className="ai-mockup-columns">
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '0.85rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0066FF' }}>01 PROFESSIONAL</div>
                  <div style={{ fontSize: '0.78rem', color: '#4B5768', marginTop: '0.25rem', lineHeight: '1.4' }}>"Extremely courteous staff, prompt service, and excellent cold brew quality..."</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #0066FF', borderRadius: '10px', padding: '0.85rem', boxShadow: '0 4px 12px rgba(0,102,255,0.1)' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0066FF' }}>02 WARM</div>
                  <div style={{ fontSize: '0.78rem', color: '#4B5768', marginTop: '0.25rem', lineHeight: '1.4' }}>"Loved my visit here! The team was so friendly and the hazelnut coffee was delicious..."</div>
                </div>
                <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '0.85rem' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: '800', color: '#0066FF' }}>03 SEO-FRIENDLY</div>
                  <div style={{ fontSize: '0.78rem', color: '#4B5768', marginTop: '0.25rem', lineHeight: '1.4' }}>"One of the best local cafes in town. Fast service, helpful staff, and top hazelnut coffee..."</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2.5 VIDEO DEMO SECTION */}
      <section className="ai-video-demo-section" id="demo-video">
        <div className="ai-container">
          <div className="ai-video-demo-header">
            <span className="ai-video-demo-badge">
              <Play size={13} fill="#0066FF" stroke="#0066FF" /> SEE TAPZYY IN ACTION
            </span>
            <h2 className="ai-video-demo-title">
              From a Single Tap to a 5-Star Review
            </h2>
            <p className="ai-video-demo-subtitle">
              Watch how quickly customers tap the Tapzyy card, formulate natural reviews, and post to your Google profile without friction.
            </p>
          </div>

          <div className="ai-video-demo-card">
            <div className="ai-video-player-wrapper">
              <video
                src="/videos/tapzyy-demo.mp4"
                className="ai-demo-player"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/assets/tapzyy-counter-hero.jpg"
              />
            </div>

            <div className="ai-video-highlights-grid">
              <div className="ai-video-highlight-item">
                <div className="ai-video-highlight-icon">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="ai-video-highlight-title">Zero Friction Tap</h4>
                  <p className="ai-video-highlight-desc">Customers tap with NFC or scan QR. No app download or account needed.</p>
                </div>
              </div>

              <div className="ai-video-highlight-item">
                <div className="ai-video-highlight-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="ai-video-highlight-title">AI Review Assistant</h4>
                  <p className="ai-video-highlight-desc">Customers turn raw feedback into clear, authentic review drafts in 3 styles.</p>
                </div>
              </div>

              <div className="ai-video-highlight-item">
                <div className="ai-video-highlight-icon">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="ai-video-highlight-title">Direct to Google</h4>
                  <p className="ai-video-highlight-desc">Customer chooses the final wording and posts directly to your Google page.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS */}
      <section id="how-it-works" className="ai-how-section">
        <div className="ai-container">
          <h2 className="ai-section-title">
            How Tapzyy AI Turns Feedback Into a Review
          </h2>

          <div className="ai-steps-grid">
            <div className="ai-step-card">
              <span className="ai-step-badge">STEP 01</span>
              <div style={{ color: '#0066FF' }}><MessageSquare size={26} /></div>
              <h3 className="ai-step-heading">Share Your Experience</h3>
              <p className="ai-step-desc">
                Customer writes what actually happened in their own natural words.
              </p>
            </div>

            <div className="ai-step-card">
              <span className="ai-step-badge">STEP 02</span>
              <div style={{ color: '#0066FF' }}><Sparkles size={26} /></div>
              <h3 className="ai-step-heading">Choose Your Style</h3>
              <p className="ai-step-desc">
                Tapzyy AI creates three versions: Professional, Warm, and SEO-Friendly.
              </p>
            </div>

            <div className="ai-step-card">
              <span className="ai-step-badge">STEP 03</span>
              <div style={{ color: '#0066FF' }}><CheckCircle2 size={26} /></div>
              <h3 className="ai-step-heading">Choose What Feels Right</h3>
              <p className="ai-step-desc">
                Customer reviews the wording, edits if desired, and decides what to submit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. MAIN AI REVIEW GENERATOR & 5. RESULTS */}
      <section id="ai-generator" className="ai-generator-section">
        <div className="ai-container">
          <div className="ai-generator-box">

            <div className="ai-generator-header">
              <h2 className="ai-generator-title">Turn Your Experience Into a Review</h2>
              <p className="ai-generator-subtitle">
                Tell us what happened in your own words. Tapzyy AI will help shape it into three natural review options.
              </p>
            </div>

            <form onSubmit={handleGenerate}>
              <div className="ai-form-group">
                <label className="ai-form-label">
                  <span>Your experience *</span>
                </label>
                <textarea
                  className="ai-textarea"
                  value={rawExperience}
                  onChange={(e) => setRawExperience(e.target.value)}
                  placeholder="Example: The staff was very helpful, the service was quick, and I really liked the overall experience..."
                />
                <span className="ai-form-hint">Write naturally. There’s no need to make it perfect.</span>
              </div>

              <div className="ai-form-row">
                <div className="ai-form-group">
                  <label className="ai-form-label">Business Name (Optional)</label>
                  <input
                    type="text"
                    className="ai-input-text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Urban Brew Café"
                  />
                </div>

                <div className="ai-form-group">
                  <label className="ai-form-label">Service / Product (Optional)</label>
                  <input
                    type="text"
                    className="ai-input-text"
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    placeholder="e.g. Cold Brew & Pastries"
                  />
                </div>
              </div>

              <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
                <button
                  type="submit"
                  className="ai-btn-primary"
                  disabled={isGenerating}
                  style={{ minWidth: '220px' }}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" /> Creating your review options...
                    </>
                  ) : (
                    <>
                      Generate My Reviews <Sparkles size={18} />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* 5. GENERATED RESULTS CARDS */}
            {hasGenerated && (
              <div id="ai-results">
                <div className="ai-results-header">
                  <h3 className="ai-results-title">Choose the version that sounds most like you.</h3>
                </div>

                <div className="ai-cards-grid">

                  {/* CARD 1: PROFESSIONAL */}
                  <div
                    className={`ai-result-card ${selectedStyle === 'professional' ? 'selected' : ''}`}
                    onClick={() => setSelectedStyle('professional')}
                  >
                    <div className="ai-card-header">
                      <div>
                        <span className="ai-card-num">01 PROFESSIONAL STYLE</span>
                        <h4 className="ai-card-style-title">Professional</h4>
                        <span className="ai-card-style-desc">Clear, polished and professional.</span>
                      </div>
                      {selectedStyle === 'professional' && (
                        <span className="ai-selected-badge">
                          <Check size={12} /> Selected
                        </span>
                      )}
                    </div>

                    <div className="ai-card-body">
                      {editingStyle === 'professional' ? (
                        <div>
                          <textarea
                            className="ai-textarea"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            style={{ minHeight: '110px', fontSize: '0.9rem' }}
                          />
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <button
                              type="button"
                              className="ai-copy-btn"
                              onClick={() => saveEdit('professional')}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="ai-action-btn-ghost"
                              onClick={() => setEditingStyle(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="ai-card-text">"{reviews.professional}"</p>
                      )}
                    </div>

                    <div className="ai-card-actions">
                      <button
                        type="button"
                        className={`ai-copy-btn ${copiedStyle === 'professional' ? 'copied' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy('professional', reviews.professional);
                        }}
                      >
                        {copiedStyle === 'professional' ? (
                          <>Copied ✓</>
                        ) : (
                          <><Copy size={14} /> Copy Review</>
                        )}
                      </button>

                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className="ai-action-btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEdit('professional', reviews.professional);
                          }}
                        >
                          <Edit3 size={13} /> Edit
                        </button>

                        <button
                          type="button"
                          className="ai-action-btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegenerateStyle('professional');
                          }}
                        >
                          <RefreshCw size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CARD 2: WARM */}
                  <div
                    className={`ai-result-card ${selectedStyle === 'warm' ? 'selected' : ''}`}
                    onClick={() => setSelectedStyle('warm')}
                  >
                    <div className="ai-card-header">
                      <div>
                        <span className="ai-card-num">02 WARM STYLE</span>
                        <h4 className="ai-card-style-title">Warm</h4>
                        <span className="ai-card-style-desc">Friendly, personal and natural.</span>
                      </div>
                      {selectedStyle === 'warm' && (
                        <span className="ai-selected-badge">
                          <Check size={12} /> Selected
                        </span>
                      )}
                    </div>

                    <div className="ai-card-body">
                      {editingStyle === 'warm' ? (
                        <div>
                          <textarea
                            className="ai-textarea"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            style={{ minHeight: '110px', fontSize: '0.9rem' }}
                          />
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <button
                              type="button"
                              className="ai-copy-btn"
                              onClick={() => saveEdit('warm')}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="ai-action-btn-ghost"
                              onClick={() => setEditingStyle(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="ai-card-text">"{reviews.warm}"</p>
                      )}
                    </div>

                    <div className="ai-card-actions">
                      <button
                        type="button"
                        className={`ai-copy-btn ${copiedStyle === 'warm' ? 'copied' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy('warm', reviews.warm);
                        }}
                      >
                        {copiedStyle === 'warm' ? (
                          <>Copied ✓</>
                        ) : (
                          <><Copy size={14} /> Copy Review</>
                        )}
                      </button>

                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className="ai-action-btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEdit('warm', reviews.warm);
                          }}
                        >
                          <Edit3 size={13} /> Edit
                        </button>

                        <button
                          type="button"
                          className="ai-action-btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegenerateStyle('warm');
                          }}
                        >
                          <RefreshCw size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* CARD 3: SEO-FRIENDLY */}
                  <div
                    className={`ai-result-card ${selectedStyle === 'seo' ? 'selected' : ''}`}
                    onClick={() => setSelectedStyle('seo')}
                  >
                    <div className="ai-card-header">
                      <div>
                        <span className="ai-card-num">03 SEO-FRIENDLY STYLE</span>
                        <h4 className="ai-card-style-title">SEO-Friendly</h4>
                        <span className="ai-card-style-desc">Natural wording with relevant business keywords.</span>
                      </div>
                      {selectedStyle === 'seo' && (
                        <span className="ai-selected-badge">
                          <Check size={12} /> Selected
                        </span>
                      )}
                    </div>

                    <div className="ai-card-body">
                      {editingStyle === 'seo' ? (
                        <div>
                          <textarea
                            className="ai-textarea"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            style={{ minHeight: '110px', fontSize: '0.9rem' }}
                          />
                          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                            <button
                              type="button"
                              className="ai-copy-btn"
                              onClick={() => saveEdit('seo')}
                              style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              className="ai-action-btn-ghost"
                              onClick={() => setEditingStyle(null)}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="ai-card-text">"{reviews.seo}"</p>
                      )}
                    </div>

                    <div className="ai-card-actions">
                      <button
                        type="button"
                        className={`ai-copy-btn ${copiedStyle === 'seo' ? 'copied' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy('seo', reviews.seo);
                        }}
                      >
                        {copiedStyle === 'seo' ? (
                          <>Copied ✓</>
                        ) : (
                          <><Copy size={14} /> Copy Review</>
                        )}
                      </button>

                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        <button
                          type="button"
                          className="ai-action-btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            startEdit('seo', reviews.seo);
                          }}
                        >
                          <Edit3 size={13} /> Edit
                        </button>

                        <button
                          type="button"
                          className="ai-action-btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRegenerateStyle('seo');
                          }}
                        >
                          <RefreshCw size={13} />
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        </div>
      </section>





      {/* 8. TRUST & TRANSPARENCY */}
      <section className="ai-trust-section">
        <div className="ai-container">
          <h2 className="ai-section-title">AI Helps With the Words. You Keep the Experience.</h2>

          <div className="ai-trust-flow">
            <div className="ai-trust-step">CUSTOMER EXPERIENCE</div>
            <span className="ai-trust-arrow">→</span>
            <div className="ai-trust-step">TAPZYY AI</div>
            <span className="ai-trust-arrow">→</span>
            <div className="ai-trust-step">REVIEW OPTIONS</div>
            <span className="ai-trust-arrow">→</span>
            <div className="ai-trust-step" style={{ border: '2px solid #0066FF', color: '#0066FF' }}>CUSTOMER CHOOSES</div>
          </div>

          <div className="ai-trust-points">
            <div className="ai-trust-point">
              <CheckCircle2 size={20} style={{ color: '#10B981', flexShrink: 0 }} />
              <span>Uses your original feedback</span>
            </div>
            <div className="ai-trust-point">
              <CheckCircle2 size={20} style={{ color: '#10B981', flexShrink: 0 }} />
              <span>Helps improve clarity and wording</span>
            </div>
            <div className="ai-trust-point">
              <CheckCircle2 size={20} style={{ color: '#10B981', flexShrink: 0 }} />
              <span>Gives you multiple styles to choose from</span>
            </div>
            <div className="ai-trust-point">
              <CheckCircle2 size={20} style={{ color: '#10B981', flexShrink: 0 }} />
              <span>You review the final text before submitting</span>
            </div>
            <div className="ai-trust-point">
              <CheckCircle2 size={20} style={{ color: '#10B981', flexShrink: 0 }} />
              <span>No automatic review submission</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0066FF', backgroundColor: '#F0F6FF', padding: '0.6rem 1.5rem', borderRadius: '9999px', display: 'inline-block' }}>
              Customers decide what they want to submit.
            </span>
          </div>
        </div>
      </section>



      {/* 10. FAQ ACCORDION */}
      <section className="ai-faq-section">
        <div className="ai-container ai-container-narrow">
          <h2 className="ai-section-title">Frequently Asked Questions</h2>

          <div className="ai-faq-list">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`ai-faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    type="button"
                    className="ai-faq-btn"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={20}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                        color: '#0066FF'
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div className="ai-faq-content">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>



    </div>
  );
};

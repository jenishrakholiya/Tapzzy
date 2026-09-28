import React, { useState } from 'react';
import { Search, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState(null);

  const allFaqs = [
    {
      category: 'reputation',
      q: "Does Tapzyy guarantee higher Google rankings?",
      a: "No. Tapzyy does not guarantee a particular Google ranking. Google local visibility depends on multiple factors, including relevance, distance, and prominence. Tapzyy helps businesses make genuine review collection easier."
    },
    {
      category: 'reputation',
      q: "Does Tapzyy generate fake reviews?",
      a: "No. Tapzyy is designed to help customers express their own genuine experiences. AI can assist with wording, but it should not fabricate experiences."
    },
    {
      category: 'reputation',
      q: "Can AI add keywords to my reviews?",
      a: "AI should not insert artificial or misleading keywords. Customers should describe their real experience naturally."
    },
    {
      category: 'reputation',
      q: "Will more reviews guarantee more customers?",
      a: "No. Reviews can help potential customers understand your business and can contribute to your online reputation, but customer acquisition depends on many factors."
    },
    {
      category: 'reputation',
      q: "Can I respond to reviews using AI?",
      a: "Yes. Tapzyy can help draft relevant responses that you can review before publishing."
    },
    {
      category: 'tech',
      q: "What is an NFC card?",
      a: "An NFC (Near Field Communication) card contains a tiny contactless chip. When a customer taps their smartphone near the card, it wirelessly transmits your business link and instantly opens your Google Review page or Instagram profile."
    },
    {
      category: 'tech',
      q: "Does the customer need an app?",
      a: "No. Customers do not need to download or install any app. NFC reading is natively supported on modern iPhones and Android smartphones."
    },
    {
      category: 'tech',
      q: "Does it work with iPhone and Android?",
      a: "Yes. NFC tap functionality works natively on iPhone 7 and newer (iOS 14+) and on all NFC-enabled Android devices."
    },
    {
      category: 'tech',
      q: "What happens if NFC is not available or disabled?",
      a: "Every Tapzyy card features a high-contrast laser QR code printed on the front. Customers can simply open their default camera app and scan the code as a seamless backup option."
    },
    {
      category: 'products',
      q: "What products does Tapzyy offer?",
      a: "Tapzyy sells 3 products: the Tapzyy Google Review NFC Card (₹1,999), the Tapzyy Instagram NFC Card (₹1,999), and the Tapzyy Google + Instagram Combo (₹2,999, saving you ₹999 off the ₹3,998 individual value)."
    },
    {
      category: 'products',
      q: "What is included in the combo pack?",
      a: "The Combo includes 1 Tapzyy Google Review NFC Card and 1 Tapzyy Instagram NFC Card. Both cards are 4.7 × 4.7 inches made of premium 4mm acrylic."
    },
    {
      category: 'setup',
      q: "How do I set up the destination link?",
      a: "Setup takes less than 3 minutes. Simply place the card on your counter, connect your Google Review link or Instagram handle, test it with your phone, and start engaging customers."
    },
    {
      category: 'setup',
      q: "Where should I place the card in my store?",
      a: "Place the card on checkout counters, reception desks, dining tables, styling stations, or service desks where customers naturally pause during their visit."
    },
    {
      category: 'shipping',
      q: "How long does shipping take in India?",
      a: "Orders are processed within 24 hours. Express courier delivery across metro cities in India takes 2 to 3 days, and 3 to 5 days for other regions."
    },
    {
      category: 'shipping',
      q: "Can I track my order status online?",
      a: "Yes! Enter your Order ID (e.g. TPZ-84920) and Email/Mobile on our Order Tracking page to view step-by-step dispatch status."
    }
  ];

  const filteredFaqs = allFaqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.q.toLowerCase().includes(searchTerm.toLowerCase()) || faq.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ paddingTop: '3.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6' }}>
      <SEOHead pageKey="faq" />

      <div className="container-narrow">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge badge-brand" style={{ marginBottom: '0.85rem' }}>Knowledge Base</span>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>Frequently Asked Questions</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-soft)', lineHeight: '1.65' }}>
            Find clear, honest answers regarding Tapzyy cards, Google review collection, AI assistance, compatibility, and shipping across India.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: '2rem' }}>
          <Search size={20} color="var(--color-ink-soft)" style={{ position: 'absolute', left: '1.2rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions (e.g. rankings, fake reviews, NFC, shipping)..."
            style={{
              width: '100%',
              padding: '1rem 1rem 1rem 3.2rem',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--color-line)',
              fontSize: '1rem',
              backgroundColor: '#FFFFFF',
              boxShadow: 'var(--shadow-sm)',
              outline: 'none',
              fontFamily: 'var(--font-sans)'
            }}
          />
        </div>

        {/* Category Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
          <button
            onClick={() => setActiveCategory('all')}
            className={`btn btn-sm ${activeCategory === 'all' ? 'btn-brand' : 'btn-secondary'}`}
          >
            All Questions
          </button>
          <button
            onClick={() => setActiveCategory('reputation')}
            className={`btn btn-sm ${activeCategory === 'reputation' ? 'btn-brand' : 'btn-secondary'}`}
          >
            Reputation & Google
          </button>
          <button
            onClick={() => setActiveCategory('tech')}
            className={`btn btn-sm ${activeCategory === 'tech' ? 'btn-brand' : 'btn-secondary'}`}
          >
            NFC & Compatibility
          </button>
          <button
            onClick={() => setActiveCategory('products')}
            className={`btn btn-sm ${activeCategory === 'products' ? 'btn-brand' : 'btn-secondary'}`}
          >
            Products & Combo
          </button>
          <button
            onClick={() => setActiveCategory('setup')}
            className={`btn btn-sm ${activeCategory === 'setup' ? 'btn-brand' : 'btn-secondary'}`}
          >
            Setup & Care
          </button>
          <button
            onClick={() => setActiveCategory('shipping')}
            className={`btn btn-sm ${activeCategory === 'shipping' ? 'btn-brand' : 'btn-secondary'}`}
          >
            Shipping & Orders
          </button>
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredFaqs.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem', borderRadius: '24px' }}>
              <HelpCircle size={40} color="var(--color-ink-soft)" style={{ margin: '0 auto 1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--color-ink)' }}>No matching questions found</h3>
              <p style={{ color: 'var(--color-ink-soft)' }}>Try adjusting your search terms or select another category tab.</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="card"
                style={{
                  cursor: 'pointer',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '18px',
                  boxShadow: 'var(--shadow-sm)',
                  border: openIndex === idx ? '1.5px solid var(--color-brand-primary)' : '1px solid var(--color-line)',
                  backgroundColor: '#FFFFFF',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.05rem', color: 'var(--color-ink)' }}>
                  <span>{faq.q}</span>
                  {openIndex === idx ? <ChevronUp size={20} color="var(--color-brand-primary)" /> : <ChevronDown size={20} color="var(--color-ink-soft)" />}
                </div>
                {openIndex === idx && (
                  <p style={{ marginTop: '0.85rem', color: 'var(--color-ink-soft)', fontSize: '0.92rem', lineHeight: '1.65', borderTop: '1px solid var(--color-line)', paddingTop: '0.85rem' }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

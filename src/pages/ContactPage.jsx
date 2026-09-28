import React, { useState } from 'react';
import { Mail, Check, Copy, Send, CheckCircle2, AlertCircle, Phone, User, MessageSquare } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const ContactPage = () => {
  const [copied, setCopied] = useState(false);
  const supportEmail = "Tapzyy.in@gmail.com";

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Tracking & Delivery',
    message: ''
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(supportEmail).catch(() => fallbackCopy(supportEmail));
      } else {
        fallbackCopy(supportEmail);
      }
    } catch {
      fallbackCopy(supportEmail);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch {
      // Fallback silent
    }
    document.body.removeChild(textArea);
  };

  const validateField = (name, value) => {
    const val = typeof value === 'string' ? value.trim() : value;
    switch (name) {
      case 'name':
        if (!val) return 'Your name is required';
        if (val.length < 2) return 'Please enter at least 2 characters';
        return undefined;
      case 'email':
        if (!val) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address';
        return undefined;
      case 'phone': {
        const clean = String(val || '').replace(/\D/g, '');
        if (clean && clean.length !== 10) return 'Please enter a valid 10-digit mobile number';
        return undefined;
      }
      case 'message':
        if (!val) return 'Please enter your message or question';
        if (val.length < 10) return 'Please provide more details (minimum 10 characters)';
        return undefined;
      default:
        return undefined;
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields = ['name', 'email', 'phone', 'message'];
    const newErrors = {};
    const newTouched = {};

    fields.forEach(f => {
      newTouched[f] = true;
      const err = validateField(f, formData[f]);
      if (err) newErrors[f] = err;
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      // Construct mailto link as auxiliary option
      const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(`[Support] ${formData.subject} - ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'N/A'}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`)}`;
      window.open(mailtoUrl, '_blank');
    }
  };

  return (
    <div style={{
      minHeight: '75vh',
      padding: '3.5rem 1.25rem 5rem 1.25rem',
      backgroundColor: '#FAF9F6'
    }}>
      <SEOHead 
        title="Contact Customer Support | Tapzyy" 
        description="Official customer support and technical assistance for Tapzyy smart display cards." 
      />

      <div style={{
        maxWidth: '880px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            backgroundColor: '#EFF6FF',
            color: '#0066FF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 4px 14px rgba(0, 102, 255, 0.15)'
          }}>
            <Mail size={30} />
          </div>
          <h1 style={{
            fontSize: '2.25rem',
            fontWeight: '800',
            color: '#0B1220',
            marginBottom: '0.4rem',
            letterSpacing: '-0.02em'
          }}>
            Customer Support & Assistance
          </h1>
          <p style={{
            fontSize: '1rem',
            color: '#64748B',
            maxWidth: '560px',
            margin: '0 auto'
          }}>
            Have questions about NFC card setup, bulk enterprise orders, or order tracking? Reach out to our dedicated support desk.
          </p>
        </div>

        {/* Content Layout: Contact Direct Card + Message Form */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.3fr',
          gap: '2rem',
          alignItems: 'start'
        }} className="contact-grid">

          {/* Left Column: Direct Email & Info */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0B1220', marginBottom: '0.75rem' }}>
              Direct Support Email
            </h3>
            <p style={{ fontSize: '0.88rem', color: '#64748B', marginBottom: '1.5rem', lineHeight: '1.5' }}>
              We reply to all customer inquiries, custom branding requests, and order inquiries within 2-4 business hours.
            </p>

            {/* Email Box */}
            <div style={{
              padding: '1.25rem',
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: '1.5px solid #E2E8F0',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                fontSize: '0.75rem',
                color: '#64748B',
                fontWeight: '800',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.35rem'
              }}>
                Official Email Desk
              </div>
              <a 
                href={`mailto:${supportEmail}`} 
                style={{
                  fontSize: '1.15rem',
                  fontWeight: '800',
                  color: '#0066FF',
                  textDecoration: 'none',
                  wordBreak: 'break-all'
                }}
              >
                {supportEmail}
              </a>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
              <a
                href={`mailto:${supportEmail}`}
                className="btn btn-brand"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.7rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  textDecoration: 'none'
                }}
              >
                <Mail size={16} /> Send Direct Email
              </a>

              <button
                type="button"
                onClick={handleCopy}
                className="btn btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.7rem 1.25rem',
                  borderRadius: '10px',
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {copied ? <Check size={16} color="#16A34A" /> : <Copy size={16} />}
                {copied ? "Copied!" : "Copy Email"}
              </button>
            </div>

            {/* Guarantees */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Operating Hours: Mon - Sat, 9:30 AM - 7:00 PM IST</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: '#334155' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Pan-India Courier Dispatch from Bengaluru</span>
              </div>
            </div>
          </div>

          {/* Right Column: Support Message Form */}
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E2E8F0',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0B1220', marginBottom: '0.35rem' }}>
              Send a Support Message
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.5rem' }}>
              Fill in your inquiry and our technical staff will follow up.
            </p>

            {isSubmitted ? (
              <div style={{
                padding: '2rem 1.5rem',
                backgroundColor: '#F0FDF4',
                border: '1px solid #BBF7D0',
                borderRadius: '16px',
                textAlign: 'center'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <CheckCircle2 size={28} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#166534', marginBottom: '0.5rem' }}>
                  Message Received!
                </h4>
                <p style={{ fontSize: '0.9rem', color: '#166534', lineHeight: '1.5', marginBottom: '1.25rem' }}>
                  Thank you, <strong>{formData.name}</strong>. Our support team has logged your ticket and will reply to <strong>{formData.email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', subject: 'Order Tracking & Delivery', message: '' });
                    setTouched({});
                  }}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem', padding: '0.6rem 1.25rem' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Full Name */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.3rem' }}>
                    Full Name <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: `1.5px solid ${touched.name && errors.name ? '#EF4444' : '#CBD5E1'}`,
                      backgroundColor: touched.name && errors.name ? '#FEF2F2' : '#FFFFFF',
                      fontSize: '0.9rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {touched.name && errors.name && (
                    <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <AlertCircle size={12} /> {errors.name}
                    </div>
                  )}
                </div>

                {/* Email & Phone */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }} className="contact-form-row">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.3rem' }}>
                      Email Address <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@business.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      onBlur={() => handleBlur('email')}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${touched.email && errors.email ? '#EF4444' : '#CBD5E1'}`,
                        backgroundColor: touched.email && errors.email ? '#FEF2F2' : '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    {touched.email && errors.email && (
                      <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <AlertCircle size={12} /> {errors.email}
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.3rem' }}>
                      Mobile Number (Optional)
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value.replace(/\D/g, '').slice(0, 10))}
                      onBlur={() => handleBlur('phone')}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: `1.5px solid ${touched.phone && errors.phone ? '#EF4444' : '#CBD5E1'}`,
                        backgroundColor: touched.phone && errors.phone ? '#FEF2F2' : '#FFFFFF',
                        fontSize: '0.9rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    {touched.phone && errors.phone && (
                      <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <AlertCircle size={12} /> {errors.phone}
                      </div>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.3rem' }}>
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => handleChange('subject', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.9rem',
                      backgroundColor: '#FFFFFF',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Order Tracking & Delivery">Order Tracking & Delivery</option>
                    <option value="NFC Card Setup & Configuration">NFC Card Setup & Configuration</option>
                    <option value="Bulk Order & Custom Logo Branding">Bulk Order & Custom Logo Branding</option>
                    <option value="Payment / GST Invoice Request">Payment / GST Invoice Request</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '700', color: '#1E293B', marginBottom: '0.3rem' }}>
                    Your Message <span style={{ color: '#EF4444' }}>*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Please describe how we can assist you..."
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: `1.5px solid ${touched.message && errors.message ? '#EF4444' : '#CBD5E1'}`,
                      backgroundColor: touched.message && errors.message ? '#FEF2F2' : '#FFFFFF',
                      fontSize: '0.9rem',
                      outline: 'none',
                      resize: 'vertical',
                      boxSizing: 'border-box'
                    }}
                  />
                  {touched.message && errors.message && (
                    <div style={{ fontSize: '0.75rem', color: '#EF4444', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <AlertCircle size={12} /> {errors.message}
                    </div>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="btn btn-brand"
                  style={{
                    padding: '0.85rem',
                    borderRadius: '12px',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginTop: '0.5rem'
                  }}
                >
                  <Send size={16} /> Submit Support Inquiry
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
          .contact-form-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ContactPage;

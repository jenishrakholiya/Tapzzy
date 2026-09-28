import React, { useState } from 'react';
import { Mail, Check, Copy } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export const ContactPage = () => {
  const [copied, setCopied] = useState(false);
  const email = "Tapzyy.in@gmail.com";

  const handleCopy = () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).catch(() => fallbackCopy(email));
      } else {
        fallbackCopy(email);
      }
    } catch {
      fallbackCopy(email);
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

  return (
    <div style={{
      minHeight: '72vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '4rem 1.5rem',
      backgroundColor: '#FAF9F6'
    }}>
      <SEOHead 
        title="Customer Support | Tapzyy" 
        description="Official customer support email for Tapzyy." 
      />

      <div style={{
        maxWidth: '560px',
        width: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: '24px',
        border: '1px solid #E2E8F0',
        padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.25rem, 4vw, 2rem)',
        textAlign: 'center',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03)'
      }}>
        {/* Support Icon */}
        <div style={{
          width: '68px',
          height: '68px',
          borderRadius: '20px',
          backgroundColor: '#EFF6FF',
          color: '#0066FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 4px 14px rgba(0, 102, 255, 0.15)'
        }}>
          <Mail size={32} />
        </div>

        {/* Heading */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '800',
          color: '#0B1220',
          marginBottom: '0.5rem',
          letterSpacing: '-0.02em'
        }}>
          Customer Support
        </h1>

        <p style={{
          fontSize: '0.95rem',
          color: '#64748B',
          marginBottom: '2rem',
          lineHeight: '1.5'
        }}>
          Reach out to our team directly via email for any inquiries or support.
        </p>

        {/* Dedicated Email Display Card */}
        <div style={{
          padding: '1.25rem 1.5rem',
          backgroundColor: '#F8FAFC',
          borderRadius: '16px',
          border: '1.5px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          marginBottom: '1.75rem'
        }}>
          <div style={{
            fontSize: '0.8rem',
            color: '#64748B',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.06em'
          }}>
            Email ID
          </div>

          <a 
            href={`mailto:${email}`} 
            style={{
              fontSize: '1.25rem',
              fontWeight: '800',
              color: '#0066FF',
              textDecoration: 'none',
              wordBreak: 'break-all'
            }}
          >
            email - {email}
          </a>
        </div>

        {/* Action Buttons: Direct Mailto & Copy */}
        <div style={{
          display: 'flex',
          gap: '0.85rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a
            href={`mailto:${email}`}
            className="btn btn-brand"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '700',
              textDecoration: 'none'
            }}
          >
            <Mail size={18} />
            Send Email
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="btn btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              borderRadius: '12px',
              fontSize: '0.95rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {copied ? <Check size={18} color="#16A34A" /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy Email"}
          </button>
        </div>

      </div>
    </div>
  );
};

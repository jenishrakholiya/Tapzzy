import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';

export const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
    navigate('/account');
  };

  return (
    <div style={{ paddingTop: '4.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6', minHeight: '80vh' }}>
      <SEOHead title="Create Tapzyy Business Account" description="Register a new Tapzyy account for your local business." />

      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>Create Account</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
            Register your business to manage orders and track shipments seamlessly.
          </p>
        </div>

        <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-line)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Rajesh Kumar"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                  Business / Store Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="The Tiffin House Café"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="rajesh@business.com"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                Password *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Create password (min. 6 characters)"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
              />
            </div>

            <button type="submit" className="btn btn-brand btn-lg" style={{ marginTop: '0.5rem', gap: '0.5rem' }}>
              Create Account <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-ink-soft)' }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--color-brand-primary)', fontWeight: '700' }}>Login Here</Link>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

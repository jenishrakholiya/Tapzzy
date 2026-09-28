import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, Mail, User, ArrowRight, Zap } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const { login, loginDemoCustomer } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
    navigate('/account');
  };

  const handleDemoCustomer = () => {
    loginDemoCustomer();
    navigate('/account');
  };

  return (
    <div style={{ paddingTop: '4.5rem', paddingBottom: '5.5rem', backgroundColor: '#FAF9F6', minHeight: '80vh' }}>
      <SEOHead title="Login to Tapzyy Account" description="Sign in to your Tapzyy customer account." />

      <div className="container-narrow">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '0.75rem', color: 'var(--color-ink)', letterSpacing: '-0.02em' }}>Account Login</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--color-ink-soft)', lineHeight: '1.6' }}>
            Access your order history, shipping details, and account settings.
          </p>
        </div>

        {/* Demo Fast Login Bar */}
        <div style={{
          backgroundColor: 'rgba(0, 102, 255, 0.05)',
          border: '1px solid rgba(0, 102, 255, 0.15)',
          borderRadius: '20px',
          padding: '1.25rem',
          marginBottom: '2rem',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--color-brand-primary)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
            <Zap size={15} /> One-Click Customer Access
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleDemoCustomer} className="btn btn-secondary btn-sm" style={{ background: '#FFFFFF', gap: '0.4rem' }}>
              <User size={16} /> Demo Customer Login
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="card" style={{ padding: 'clamp(1.25rem, 4vw, 2.5rem)', borderRadius: '24px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--color-line)' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="var(--color-ink-soft)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@business.com"
                  style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem', color: 'var(--color-ink)' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="var(--color-ink-soft)" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{ width: '100%', padding: '0.75rem 0.75rem 0.75rem 2.6rem', borderRadius: '10px', border: '1px solid var(--color-line)', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-brand btn-lg" style={{ marginTop: '0.5rem', gap: '0.5rem' }}>
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--color-ink-soft)' }}>
            Don't have an account yet? <Link to="/signup" style={{ color: 'var(--color-brand-primary)', fontWeight: '700' }}>Create an Account</Link>
          </div>
        </div>

      </div>
    </div>
  );
};

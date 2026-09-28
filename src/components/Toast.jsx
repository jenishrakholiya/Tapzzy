import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle } from 'lucide-react';

export const Toast = () => {
  const { notification } = useCart();

  if (!notification) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      backgroundColor: '#0f172a',
      color: '#ffffff',
      padding: '0.85rem 1.25rem',
      borderRadius: 'var(--radius-md)',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.65rem',
      fontSize: '0.9rem',
      fontWeight: '600',
      zIndex: 2000,
      animation: 'fadeIn 0.25s ease'
    }}>
      <CheckCircle size={18} color="#22c55e" />
      <span>{notification}</span>
    </div>
  );
};

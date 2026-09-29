import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './context/OrderContext';
import { AdminProvider } from './context/AdminContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ScrollToTop } from './components/ScrollToTop';
import ReviewWallSection from './components/ReviewWallSection';
import { ErrorBoundary } from './components/ErrorBoundary';

// Immediate First-Paint Home Page
import { HomePage } from './pages/HomePage';

// Route-Level Code Splitting (Reduces initial JS bundle size by >65%)
const ShopPage = React.lazy(() => import('./pages/ShopPage').then(m => ({ default: m.ShopPage })));
const ProductDetailPage = React.lazy(() => import('./pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const HowItWorksPage = React.lazy(() => import('./pages/HowItWorksPage').then(m => ({ default: m.HowItWorksPage })));
const AiReviewSuitePage = React.lazy(() => import('./pages/AiReviewSuitePage').then(m => ({ default: m.AiReviewSuitePage })));
const ContactPage = React.lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const FAQPage = React.lazy(() => import('./pages/FAQPage').then(m => ({ default: m.FAQPage })));
const CartPage = React.lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const OrderConfirmationPage = React.lazy(() => import('./pages/OrderConfirmationPage').then(m => ({ default: m.OrderConfirmationPage })));
const AdminPage = React.lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = React.lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const ShippingPolicyPage = React.lazy(() => import('./pages/ShippingPolicyPage').then(m => ({ default: m.ShippingPolicyPage })));
const RefundPolicyPage = React.lazy(() => import('./pages/RefundPolicyPage').then(m => ({ default: m.RefundPolicyPage })));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

const RouteLoadingFallback = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: '0.85rem',
    backgroundColor: '#FAF9F6'
  }}>
    <div style={{
      width: '36px',
      height: '36px',
      border: '3px solid #E2E8F0',
      borderTopColor: '#0066FF',
      borderRadius: '50%',
      animation: 'spin 0.75s linear infinite'
    }} />
    <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600' }}>Loading Tapzyy...</span>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

/**
 * Conditionally renders the Customer Stories / Review Wall section
 * Hidden on legal policy pages, checkout, and admin routes
 */
function ConditionalReviewWall() {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, '') || '/';
  const hiddenPaths = [
    '/privacy-policy',
    '/terms',
    '/shipping-policy',
    '/refund-policy',
    '/checkout',
    '/order-confirmation',
    '/admin-tap',
    '/admin',
    '/contact'
  ];

  if (hiddenPaths.includes(currentPath)) {
    return null;
  }

  return <ReviewWallSection />;
}

export function App() {
  return (
    <ErrorBoundary>
      <AdminProvider>
        <AuthProvider>
          <OrderProvider>
            <CartProvider>
              <BrowserRouter>
                <ScrollToTop />
                <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
                  <Navbar />
                  <main style={{ flexGrow: 1 }}>
                    <Suspense fallback={<RouteLoadingFallback />}>
                      <Routes>
                        {/* Main Shop & Product Routes */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/shop" element={<ShopPage />} />
                        
                        {/* Approved Product Page Routes */}
                        <Route path="/products/google-nfc-card" element={<ProductDetailPage overrideSlug="google-review-card" />} />
                        <Route path="/products/instagram-nfc-card" element={<ProductDetailPage overrideSlug="instagram-card" />} />
                        <Route path="/products/combo-pack" element={<ProductDetailPage overrideSlug="combo" />} />
                        <Route path="/products/:slug" element={<ProductDetailPage />} />
                        <Route path="/product/google-review-card" element={<ProductDetailPage overrideSlug="google-review-card" />} />
                        <Route path="/product/google-card" element={<ProductDetailPage overrideSlug="google-review-card" />} />
                        <Route path="/product/google-nfc-card" element={<ProductDetailPage overrideSlug="google-review-card" />} />
                        <Route path="/product/instagram-card" element={<ProductDetailPage overrideSlug="instagram-card" />} />
                        <Route path="/product/combo" element={<ProductDetailPage overrideSlug="combo" />} />
                        <Route path="/product/:slug" element={<ProductDetailPage />} />

                        <Route path="/how-it-works" element={<HowItWorksPage />} />
                        <Route path="/ai-review-suite" element={<AiReviewSuitePage />} />
                        <Route path="/ai-review" element={<AiReviewSuitePage />} />
                        <Route path="/ai-suite" element={<AiReviewSuitePage />} />
                        <Route path="/how-to-set-up" element={<Navigate to="/" replace />} />
                        <Route path="/about" element={<Navigate to="/" replace />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/faq" element={<FAQPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
                        <Route path="/track-order" element={<Navigate to="/" replace />} />
                        <Route path="/login" element={<Navigate to="/" replace />} />
                        <Route path="/signup" element={<Navigate to="/" replace />} />
                        <Route path="/account" element={<Navigate to="/" replace />} />
                        <Route path="/admin-tap" element={<AdminPage />} />
                        <Route path="/admin" element={<Navigate to="/" replace />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="/terms" element={<TermsPage />} />
                        <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
                        <Route path="/refund-policy" element={<RefundPolicyPage />} />

                        {/* 404 Catch-All Route */}
                        <Route path="*" element={<NotFoundPage />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <ConditionalReviewWall />
                  <Footer />
                  <Toast />
                </div>
              </BrowserRouter>
            </CartProvider>
          </OrderProvider>
        </AuthProvider>
      </AdminProvider>
    </ErrorBoundary>
  );
}

export default App;

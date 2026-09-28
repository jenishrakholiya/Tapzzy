import React from 'react';
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

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AiReviewSuitePage } from './pages/AiReviewSuitePage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { AdminPage } from './pages/AdminPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ErrorBoundary } from './components/ErrorBoundary';

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

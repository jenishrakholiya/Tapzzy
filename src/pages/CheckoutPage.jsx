import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Check, 
  ChevronRight, 
  AlertCircle, 
  ShoppingBag, 
  Building2, 
  User, 
  MapPin, 
  Package, 
  Sparkles
} from 'lucide-react';
import { SEOHead } from '../components/SEOHead';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { RazorpayModal } from '../components/RazorpayModal';
import './CheckoutPage.css';

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi NCR", "Chandigarh", "Puducherry"
];

const BUSINESS_CATEGORIES = [
  "Restaurant / Café / Bakery",
  "Retail Store / Supermarket",
  "Salon / Spa / Beauty Clinic",
  "Dental Clinic / Healthcare / Hospital",
  "Hotel / Resort / Homestay",
  "Fitness / Gym / Yoga Studio",
  "Real Estate / Property Consultant",
  "Automotive / Car Care / Garage",
  "Professional Services (CA, Legal, Agency)",
  "Education / Coaching / Tuition",
  "Jewellery / Fashion Boutique",
  "Other Business"
];

export const CheckoutPage = () => {
  const { cart, subtotal, discount, shippingFee, grandTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrders();
  const navigate = useNavigate();

  // Current checkout step: 1 = Details, 2 = Review, 3 = Payment
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Determine which fields are relevant based on cart items
  const hasGoogleCard = cart.some(item => 
    item.id === 'google-review-card' || 
    (item.slug && item.slug.includes('google'))
  );
  const hasInstagramCard = cart.some(item => 
    item.id === 'instagram-card' || 
    (item.slug && item.slug.includes('instagram'))
  );
  const hasCombo = cart.some(item => 
    item.id === 'combo' || 
    item.isCombo || 
    (item.slug && item.slug.includes('combo'))
  );

  const needsGoogleLink = hasGoogleCard || hasCombo;
  const needsInstagramLink = hasInstagramCard || hasCombo;

  // Form state
  const [formData, setFormData] = useState({
    // Contact
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',

    // Business
    businessName: user?.businessName || '',
    businessCategory: 'Restaurant / Café / Bakery',
    googleReviewLink: '',
    instagramLink: '',

    // Shipping
    houseBuilding: user?.savedAddresses?.[0]?.addressLine || '',
    areaLocality: user?.savedAddresses?.[0]?.landmark || '',
    city: user?.savedAddresses?.[0]?.city || 'Bengaluru',
    state: user?.savedAddresses?.[0]?.state || 'Karnataka',
    pinCode: user?.savedAddresses?.[0]?.pinCode || '560001',

    agreeTerms: true
  });

  const [errors, setErrors] = useState({});
  // Scroll to top when changing steps
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);

  // Handle empty cart
  if (cart.length === 0) {
    return (
      <div className="checkout-page">
        <SEOHead title="Checkout | Tapzyy" description="Complete your Tapzyy purchase." />
        <div className="checkout-container">
          <div className="checkout-empty-card">
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#EFF6FF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              color: '#0066FF'
            }}>
              <ShoppingBag size={36} />
            </div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#0B1220', marginBottom: '0.5rem' }}>
              Your shopping cart is empty
            </h2>
            <p style={{ color: '#64748B', marginBottom: '1.75rem', fontSize: '0.95rem' }}>
              Please select a Tapzyy card or combo pack to proceed with checkout.
            </p>
            <Link to="/shop" className="btn btn-brand btn-lg">
              Explore Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Field change handler
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for field once user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate Step 1 form fields
  const validateForm = () => {
    const newErrors = {};

    // Contact Details Validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your full name (minimum 2 characters)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    const cleanPhone = formData.phone.replace(/[\s\-+]/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = "Mobile phone number is required";
    } else if (!/^\d{10}$/.test(cleanPhone.replace(/^91/, '')) && !/^\d{10}$/.test(cleanPhone)) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    }

    // Business Details Validation
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    if (!formData.businessCategory.trim()) {
      newErrors.businessCategory = "Please select a business category";
    }

    if (needsGoogleLink && !formData.googleReviewLink.trim()) {
      newErrors.googleReviewLink = "Google Business Profile or Review link is required";
    }

    if (needsInstagramLink && !formData.instagramLink.trim()) {
      newErrors.instagramLink = "Instagram profile link or handle is required";
    }

    // Shipping Details Validation
    if (!formData.houseBuilding.trim()) {
      newErrors.houseBuilding = "House / Building details are required";
    }

    if (!formData.areaLocality.trim()) {
      newErrors.areaLocality = "Area / Locality is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "Please select a state";
    }

    if (!formData.pinCode.trim()) {
      newErrors.pinCode = "PIN Code is required";
    } else if (!/^\d{6}$/.test(formData.pinCode.trim())) {
      newErrors.pinCode = "Please enter a valid 6-digit PIN code";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the Terms and Conditions to proceed";
    }

    setErrors(newErrors);
    return newErrors;
  };

  // Submit Step 1 -> Advance to Step 2 (Review)
  const handleProceedToReview = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Find first error and scroll to it
      const errorKeys = Object.keys(newErrors);
      if (errorKeys.length > 0) {
        const el = document.getElementById(`field-${errorKeys[0]}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.focus();
        }
      }
    }
  };

  // Step 2 -> Back to Step 1 (Edit Details)
  const handleBackToDetails = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Step 2 -> Step 3 (Payment Modal Open)
  const handleContinueToPayment = () => {
    setIsModalOpen(true);
  };

  // Payment success handler
  const handlePaymentSuccess = (paymentResult) => {
    const newOrder = createOrder({
      customer: {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        businessName: formData.businessName.trim(),
        businessCategory: formData.businessCategory,
        googleReviewLink: formData.googleReviewLink.trim(),
        instagramLink: formData.instagramLink.trim(),
        houseBuilding: formData.houseBuilding.trim(),
        areaLocality: formData.areaLocality.trim(),
        addressLine: `${formData.houseBuilding.trim()}, ${formData.areaLocality.trim()}`,
        city: formData.city.trim(),
        state: formData.state,
        pinCode: formData.pinCode.trim()
      },
      items: cart,
      subtotal,
      discount,
      shippingFee,
      grandTotal,
      paymentMethod: paymentResult.paymentMethod,
      paymentStatus: paymentResult.paymentStatus
    });

    clearCart();
    setIsModalOpen(false);
    navigate('/order-confirmation', { state: { order: newOrder } });
  };

  return (
    <div className="checkout-page">
      <SEOHead 
        title={currentStep === 1 ? "Customer Details | Checkout | Tapzyy" : "Review Your Order | Checkout | Tapzyy"} 
        description="Complete your order for Tapzyy smart NFC display cards." 
      />

      <div className="checkout-container">
        
        {/* ========================================================
            PROGRESS STEPPER INDICATOR
            ① Details → ② Review → ③ Payment
        ======================================================== */}
        <div className="checkout-stepper-wrapper">
          <div className="checkout-stepper">
            
            {/* Step 1: Details */}
            <div 
              className={`stepper-step ${currentStep === 1 ? 'active' : 'completed'}`}
              onClick={() => { if (currentStep > 1) handleBackToDetails(); }}
              style={{ cursor: currentStep > 1 ? 'pointer' : 'default' }}
              title={currentStep > 1 ? "Click to edit details" : "Current Step"}
            >
              <div className="stepper-number">
                {currentStep > 1 ? <Check size={13} strokeWidth={3} /> : "1"}
              </div>
              <span className="stepper-label">① Details</span>
            </div>

            <div className="stepper-arrow">
              <ChevronRight size={16} />
            </div>

            {/* Step 2: Review */}
            <div className={`stepper-step ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}>
              <div className="stepper-number">
                {currentStep > 2 ? <Check size={13} strokeWidth={3} /> : "2"}
              </div>
              <span className="stepper-label">② Review</span>
            </div>

            <div className="stepper-arrow">
              <ChevronRight size={16} />
            </div>

            {/* Step 3: Payment */}
            <div className={`stepper-step ${isModalOpen ? 'active' : ''}`}>
              <div className="stepper-number">3</div>
              <span className="stepper-label">③ Payment</span>
            </div>

          </div>
        </div>

        {/* ========================================================
            STEP 1: CUSTOMER DETAILS FORM
        ======================================================== */}
        {currentStep === 1 && (
          <div className="checkout-grid">
            
            {/* Form Column */}
            <form onSubmit={handleProceedToReview} className="checkout-card" noValidate>
              
              <div className="checkout-card-header">
                <h1 className="checkout-card-title">
                  <User size={22} color="#0066FF" />
                  <span>Customer & Setup Details</span>
                </h1>
                <p className="checkout-card-subtitle">
                  Please provide your contact, business information, and shipping address.
                </p>
              </div>

              {/* SECTION: Contact Details */}
              <div className="form-section-title">
                <User size={14} /> Contact Details
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="field-fullName" className="form-label">
                    Full Name <span className="req">*</span>
                  </label>
                  <input
                    id="field-fullName"
                    type="text"
                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    autoComplete="name"
                  />
                  {errors.fullName && <div className="form-error"><AlertCircle size={12} /> {errors.fullName}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="field-email" className="form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    id="field-email"
                    type="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="e.g. rajesh@business.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    autoComplete="email"
                  />
                  {errors.email && <div className="form-error"><AlertCircle size={12} /> {errors.email}</div>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="field-phone" className="form-label">
                  Phone Number <span className="req">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="field-phone"
                    type="tel"
                    className={`form-input ${errors.phone ? 'error' : ''}`}
                    placeholder="10-digit mobile number (e.g. 9876543210)"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    autoComplete="tel"
                  />
                </div>
                {errors.phone ? (
                  <div className="form-error"><AlertCircle size={12} /> {errors.phone}</div>
                ) : (
                  <div className="form-hint">Used for express courier dispatch notifications and order verification.</div>
                )}
              </div>

              {/* SECTION: Business Details */}
              <div className="form-section-title">
                <Building2 size={14} /> Business Details
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="field-businessName" className="form-label">
                    Business / Store Name <span className="req">*</span>
                  </label>
                  <input
                    id="field-businessName"
                    type="text"
                    className={`form-input ${errors.businessName ? 'error' : ''}`}
                    placeholder="e.g. The Tiffin House Café"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    onBlur={() => handleBlur('businessName')}
                  />
                  {errors.businessName && <div className="form-error"><AlertCircle size={12} /> {errors.businessName}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="field-businessCategory" className="form-label">
                    Business Category <span className="req">*</span>
                  </label>
                  <select
                    id="field-businessCategory"
                    className={`form-select ${errors.businessCategory ? 'error' : ''}`}
                    value={formData.businessCategory}
                    onChange={(e) => handleInputChange('businessCategory', e.target.value)}
                    onBlur={() => handleBlur('businessCategory')}
                  >
                    {BUSINESS_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {errors.businessCategory && <div className="form-error"><AlertCircle size={12} /> {errors.businessCategory}</div>}
                </div>
              </div>

              {/* Conditional: Google Business Link (only if Google Card or Combo) */}
              {needsGoogleLink && (
                <div className="form-group">
                  <label htmlFor="field-googleReviewLink" className="form-label">
                    Google Business Profile / Review Link <span className="req">*</span>
                  </label>
                  <input
                    id="field-googleReviewLink"
                    type="text"
                    className={`form-input ${errors.googleReviewLink ? 'error' : ''}`}
                    placeholder="e.g. https://g.page/r/... or full business name on Google Maps"
                    value={formData.googleReviewLink}
                    onChange={(e) => handleInputChange('googleReviewLink', e.target.value)}
                    onBlur={() => handleBlur('googleReviewLink')}
                  />
                  {errors.googleReviewLink ? (
                    <div className="form-error"><AlertCircle size={12} /> {errors.googleReviewLink}</div>
                  ) : (
                    <div className="form-hint">
                      This link will be encoded onto your NFC chip and laser-printed as a QR code.
                    </div>
                  )}
                </div>
              )}

              {/* Conditional: Instagram Profile Link (only if Instagram Card or Combo) */}
              {needsInstagramLink && (
                <div className="form-group">
                  <label htmlFor="field-instagramLink" className="form-label">
                    Instagram Profile Link <span className="req">*</span>
                  </label>
                  <input
                    id="field-instagramLink"
                    type="text"
                    className={`form-input ${errors.instagramLink ? 'error' : ''}`}
                    placeholder="e.g. @yourbusiness or instagram.com/yourbusiness"
                    value={formData.instagramLink}
                    onChange={(e) => handleInputChange('instagramLink', e.target.value)}
                    onBlur={() => handleBlur('instagramLink')}
                  />
                  {errors.instagramLink ? (
                    <div className="form-error"><AlertCircle size={12} /> {errors.instagramLink}</div>
                  ) : (
                    <div className="form-hint">
                      Your business Instagram handle to direct in-store customers to your feed.
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: Shipping Details */}
              <div className="form-section-title">
                <MapPin size={14} /> Shipping Details
              </div>

              <div className="form-group">
                <label htmlFor="field-houseBuilding" className="form-label">
                  House / Building / Shop No. <span className="req">*</span>
                </label>
                <input
                  id="field-houseBuilding"
                  type="text"
                  className={`form-input ${errors.houseBuilding ? 'error' : ''}`}
                  placeholder="e.g. Flat 302, Green Valley Apartments or Shop #14"
                  value={formData.houseBuilding}
                  onChange={(e) => handleInputChange('houseBuilding', e.target.value)}
                  onBlur={() => handleBlur('houseBuilding')}
                />
                {errors.houseBuilding && <div className="form-error"><AlertCircle size={12} /> {errors.houseBuilding}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="field-areaLocality" className="form-label">
                  Area / Locality / Street / Landmark <span className="req">*</span>
                </label>
                <input
                  id="field-areaLocality"
                  type="text"
                  className={`form-input ${errors.areaLocality ? 'error' : ''}`}
                  placeholder="e.g. 100 Feet Road, Indiranagar, Opp. Metro Pillar 42"
                  value={formData.areaLocality}
                  onChange={(e) => handleInputChange('areaLocality', e.target.value)}
                  onBlur={() => handleBlur('areaLocality')}
                />
                {errors.areaLocality && <div className="form-error"><AlertCircle size={12} /> {errors.areaLocality}</div>}
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <label htmlFor="field-city" className="form-label">
                    City <span className="req">*</span>
                  </label>
                  <input
                    id="field-city"
                    type="text"
                    className={`form-input ${errors.city ? 'error' : ''}`}
                    placeholder="e.g. Bengaluru"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    onBlur={() => handleBlur('city')}
                  />
                  {errors.city && <div className="form-error"><AlertCircle size={12} /> {errors.city}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="field-state" className="form-label">
                    State <span className="req">*</span>
                  </label>
                  <select
                    id="field-state"
                    className={`form-select ${errors.state ? 'error' : ''}`}
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    onBlur={() => handleBlur('state')}
                  >
                    {INDIAN_STATES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {errors.state && <div className="form-error"><AlertCircle size={12} /> {errors.state}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="field-pinCode" className="form-label">
                    PIN Code <span className="req">*</span>
                  </label>
                  <input
                    id="field-pinCode"
                    type="text"
                    maxLength={6}
                    className={`form-input ${errors.pinCode ? 'error' : ''}`}
                    placeholder="6 digits (e.g. 560001)"
                    value={formData.pinCode}
                    onChange={(e) => handleInputChange('pinCode', e.target.value)}
                    onBlur={() => handleBlur('pinCode')}
                  />
                  {errors.pinCode && <div className="form-error"><AlertCircle size={12} /> {errors.pinCode}</div>}
                </div>
              </div>

              {/* Terms Checkbox */}
              <div style={{ marginTop: '0.85rem', marginBottom: '1.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', cursor: 'pointer', fontSize: '0.85rem', color: '#475569', lineHeight: '1.45' }}>
                  <input
                    type="checkbox"
                    checked={formData.agreeTerms}
                    onChange={(e) => handleInputChange('agreeTerms', e.target.checked)}
                    style={{ marginTop: '3px', accentColor: '#0066FF', width: '16px', height: '16px' }}
                  />
                  <span>
                    I confirm that the business details provided are accurate and agree to Tapzyy's{' '}
                    <Link to="/terms" target="_blank" style={{ color: '#0066FF', fontWeight: '700' }}>Terms & Conditions</Link>{' '}
                    and{' '}
                    <Link to="/privacy-policy" target="_blank" style={{ color: '#0066FF', fontWeight: '700' }}>Privacy Policy</Link>.
                  </span>
                </label>
                {errors.agreeTerms && <div className="form-error"><AlertCircle size={12} /> {errors.agreeTerms}</div>}
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn-continue-review">
                <span>Continue to Review Order</span>
                <ArrowRight size={18} />
              </button>

            </form>

            {/* Sidebar Order Summary (Step 1) */}
            <aside className="checkout-summary-sidebar">
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0B1220', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid #F1F5F9' }}>
                Order Summary ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)
              </h3>

              <div className="sidebar-items-list">
                {cart.map(item => {
                  const isComboItem = item.id === 'combo' || item.isCombo;
                  return (
                    <div key={item.id} className="sidebar-item-row">
                      {isComboItem ? (
                        <div className="sidebar-combo-thumbs" title="Combo: Google Card + Instagram Card">
                          <img src="/assets/google.png" alt="Google Card" className="thumb-1" />
                          <img src="/assets/instagram.png" alt="Instagram Card" className="thumb-2" />
                        </div>
                      ) : (
                        <img src={item.image} alt={item.name} className="sidebar-item-thumb" />
                      )}

                      <div className="sidebar-item-info">
                        <div className="sidebar-item-title">{item.name}</div>
                        <div className="sidebar-item-qty">
                          Qty: <strong>{item.quantity}</strong>
                          {isComboItem && (
                            <span style={{ marginLeft: '4px', color: '#0066FF', fontWeight: '700' }}>
                              (2 Cards)
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="sidebar-item-price">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Price Breakdown */}
              <div className="pricing-breakdown">
                <div className="pricing-row">
                  <span>Subtotal</span>
                  <span className="pricing-row-val">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discount > 0 && (
                  <div className="pricing-row">
                    <span>Discount</span>
                    <span className="pricing-row-val discount">- ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="pricing-row">
                  <span>Pan-India Express Shipping</span>
                  <span className={`pricing-row-val ${shippingFee === 0 ? 'free' : ''}`}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="pricing-total-row">
                  <span className="pricing-total-label">Total Amount</span>
                  <span className="pricing-total-amount">₹{grandTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* COD Badge Banner */}
              <div className="cod-trust-banner">
                <div className="cod-trust-title">
                  <CheckCircle2 size={16} color="#10B981" />
                  <span>100% Cash On Delivery Available</span>
                  <span className="cod-badge">WE TRUST YOU</span>
                </div>
                <div>No advance payment required. Pay safely at your doorstep upon delivery.</div>
              </div>

              {/* Trust Tag */}
              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: '#64748B' }}>
                <ShieldCheck size={16} color="#0066FF" />
                <span>256-Bit SSL Encrypted & RBI Compliant Payment Gateway</span>
              </div>
            </aside>

          </div>
        )}

        {/* ========================================================
            STEP 2: REVIEW YOUR ORDER SCREEN
            (Dedicated Screen Before Payment)
        ======================================================== */}
        {currentStep === 2 && (
          <div className="review-page-wrapper">
            
            <div className="review-header">
              <h1 className="review-header-title">Review Your Order</h1>
              <p className="review-header-sub">
                Please verify your products, business configuration, and shipping address before proceeding to payment.
              </p>
            </div>

            {/* CARD 1: YOUR ORDER */}
            <div className="review-card">
              <h2 className="review-card-title">
                <Package size={22} color="#0066FF" />
                <span>Your Order</span>
              </h2>

              {cart.map(item => {
                const isComboItem = item.id === 'combo' || item.isCombo;

                if (isComboItem) {
                  return (
                    <div key={item.id} className="review-combo-card">
                      <div className="review-combo-top">
                        <div>
                          <div style={{ fontWeight: '800', fontSize: '1.15rem', color: '#0B1220' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>
                            Quantity: <strong>{item.quantity}</strong> (Contains 2 Custom Touchpoints)
                          </div>
                        </div>
                        <div className="review-combo-badge">
                          <Sparkles size={14} />
                          <span>Combo Dual Pack</span>
                        </div>
                      </div>

                      {/* Combo Dual Products Showcase */}
                      <div className="review-combo-dual-cards">
                        <div className="combo-subcard">
                          <img src="/assets/google.png" alt="Google Review NFC Card" className="combo-subcard-img" />
                          <div>
                            <div className="combo-subcard-name">Google Review NFC Card</div>
                            <div className="combo-subcard-tag">✓ Included • 4mm Premium Acrylic</div>
                          </div>
                        </div>

                        <div className="combo-subcard">
                          <img src="/assets/instagram.png" alt="Instagram NFC Card" className="combo-subcard-img" />
                          <div>
                            <div className="combo-subcard-name">Instagram NFC Card</div>
                            <div className="combo-subcard-tag">✓ Included • 4mm Premium Acrylic</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.15rem', paddingTop: '0.85rem', borderTop: '1px dashed #CBD5E1' }}>
                        <span style={{ fontSize: '0.85rem', color: '#166534', fontWeight: '800', backgroundColor: '#DCFCE7', padding: '0.25rem 0.75rem', borderRadius: '6px' }}>
                          🎉 Instant ₹999 Bundle Discount Applied
                        </span>
                        <span style={{ fontSize: '1.35rem', fontWeight: '850', color: '#0B1220' }}>
                          ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.id} className="review-single-item">
                    <img src={item.image} alt={item.name} className="review-single-img" />
                    <div>
                      <div className="review-single-title">{item.name}</div>
                      <div className="review-single-qty">
                        Quantity: <strong>{item.quantity}</strong> • Unit Price: ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="review-single-price">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                );
              })}

              {/* Pricing Summary Table */}
              <div className="pricing-breakdown" style={{ marginTop: '1.25rem' }}>
                <div className="pricing-row">
                  <span>Subtotal</span>
                  <span className="pricing-row-val">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discount > 0 && (
                  <div className="pricing-row">
                    <span>Discount</span>
                    <span className="pricing-row-val discount">- ₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="pricing-row">
                  <span>Pan-India Express Shipping</span>
                  <span className={`pricing-row-val ${shippingFee === 0 ? 'free' : ''}`}>
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>

                <div className="pricing-total-row" style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '12px', border: '1px solid #E2E8F0', marginTop: '0.75rem' }}>
                  <div>
                    <span className="pricing-total-label" style={{ display: 'block' }}>Total Amount</span>
                    <span style={{ fontSize: '0.78rem', color: '#64748B' }}>Inclusive of all taxes & delivery</span>
                  </div>
                  <span className="pricing-total-amount" style={{ fontSize: '1.65rem' }}>
                    ₹{grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

            </div>

            {/* CARD 2: YOUR DETAILS */}
            <div className="review-card">
              <h2 className="review-card-title">
                <User size={22} color="#0066FF" />
                <span>Your Details</span>
              </h2>

              <div className="review-details-grid">
                
                {/* Customer Tile */}
                <div className="review-detail-tile">
                  <div className="review-detail-heading">
                    <User size={13} /> Customer Details
                  </div>
                  <div className="review-detail-line">
                    <strong>Name:</strong> {formData.fullName}
                  </div>
                  <div className="review-detail-line">
                    <strong>Email:</strong> {formData.email}
                  </div>
                  <div className="review-detail-line">
                    <strong>Phone:</strong> {formData.phone}
                  </div>
                </div>

                {/* Business Tile */}
                <div className="review-detail-tile">
                  <div className="review-detail-heading">
                    <Building2 size={13} /> Business Details
                  </div>
                  <div className="review-detail-line">
                    <strong>Name:</strong> {formData.businessName}
                  </div>
                  <div className="review-detail-line">
                    <strong>Category:</strong> {formData.businessCategory}
                  </div>
                  {needsGoogleLink && formData.googleReviewLink && (
                    <div className="review-detail-line">
                      <strong>Google Link:</strong>{' '}
                      <span className="review-detail-link" title={formData.googleReviewLink}>
                        {formData.googleReviewLink.length > 35 
                          ? `${formData.googleReviewLink.substring(0, 35)}...` 
                          : formData.googleReviewLink}
                      </span>
                    </div>
                  )}
                  {needsInstagramLink && formData.instagramLink && (
                    <div className="review-detail-line">
                      <strong>Instagram Link:</strong>{' '}
                      <span className="review-detail-link" title={formData.instagramLink}>
                        {formData.instagramLink}
                      </span>
                    </div>
                  )}
                </div>

                {/* Shipping Tile */}
                <div className="review-detail-tile">
                  <div className="review-detail-heading">
                    <MapPin size={13} /> Shipping Address
                  </div>
                  <div className="review-detail-line">
                    <strong>Building:</strong> {formData.houseBuilding}
                  </div>
                  <div className="review-detail-line">
                    <strong>Area:</strong> {formData.areaLocality}
                  </div>
                  <div className="review-detail-line">
                    <strong>City / State:</strong> {formData.city}, {formData.state} - <strong>{formData.pinCode}</strong>
                  </div>
                  <div className="review-detail-line" style={{ color: '#64748B', fontSize: '0.82rem' }}>
                    Country: India
                  </div>
                </div>

              </div>

            </div>

            {/* Payment Options Guarantee Banner */}
            <div className="cod-trust-banner" style={{ marginBottom: '1.5rem', padding: '1.15rem 1.25rem' }}>
              <div className="cod-trust-title" style={{ fontSize: '0.95rem' }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>100% Cash On Delivery (COD)</span>
                <span className="cod-badge">WE TRUST YOU</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: '#065F46', marginTop: '0.35rem', lineHeight: '1.5' }}>
                Zero advance payment required! You will pay <strong>₹{grandTotal.toLocaleString('en-IN')}</strong> in cash directly to the courier delivery executive upon arrival at your doorstep.
              </div>
            </div>

            {/* ACTION BUTTONS: Edit Details vs Continue to Payment */}
            <div className="review-actions-bar">
              <button 
                type="button" 
                onClick={handleBackToDetails} 
                className="btn-edit-details"
                title="Go back to edit contact, business or address"
              >
                <ArrowLeft size={18} />
                <span>Edit Details</span>
              </button>

              <button 
                type="button" 
                onClick={handleContinueToPayment} 
                className="btn-continue-payment"
                title="Proceed to secure payment gateway"
              >
                <span>Continue to Payment</span>
                <ArrowRight size={18} />
              </button>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================
          STEP 3: PAYMENT GATEWAY MODAL (Razorpay / COD)
      ======================================================== */}
      <RazorpayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={grandTotal}
        customerData={{
          ...formData,
          addressLine: `${formData.houseBuilding}, ${formData.areaLocality}`
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />

    </div>
  );
};

export default CheckoutPage;

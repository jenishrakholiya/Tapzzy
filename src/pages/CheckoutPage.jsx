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
    phone: user?.phone ? user.phone.replace(/\D/g, '').slice(-10) : '',

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

    // Business GST invoice
    hasGst: false,
    gstNumber: '',
    gstCompanyName: '',

    agreeTerms: true
  });

  const [touched, setTouched] = useState({});
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

  // Single field validator
  const validateField = (field, value, data = formData) => {
    const val = typeof value === 'string' ? value.trim() : value;

    switch (field) {
      case 'fullName':
        if (!val) return 'Full name is required';
        if (val.length < 2) return 'Please enter your full name (minimum 2 characters)';
        if (!/^[a-zA-Z\s.'-]+$/.test(val)) return 'Name should contain letters only';
        return undefined;

      case 'email':
        if (!val) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) return 'Please enter a valid email address';
        return undefined;

      case 'phone': {
        const clean = String(val || '').replace(/\D/g, '');
        if (!clean) return 'Mobile phone number is required';
        if (clean.length !== 10) return 'Please enter a valid 10-digit mobile number';
        if (!/^[6-9]\d{9}$/.test(clean)) return 'Mobile number should start with 6, 7, 8, or 9';
        return undefined;
      }

      case 'businessName':
        if (!val) return 'Business or store name is required';
        if (val.length < 2) return 'Please enter your business or shop name';
        return undefined;

      case 'businessCategory':
        if (!val) return 'Please select a business category';
        return undefined;

      case 'googleReviewLink':
        if (needsGoogleLink) {
          if (!val) return 'Google Business link or shop name is required';
          if (val.length < 3) return 'Please provide your Google Maps link or exact business name';
        }
        return undefined;

      case 'instagramLink':
        if (needsInstagramLink) {
          if (!val) return 'Instagram handle or profile link is required';
          if (val.length < 2) return 'Please enter your Instagram handle';
        }
        return undefined;

      case 'houseBuilding':
        if (!val) return 'House / Building / Shop No. is required';
        if (val.length < 2) return 'Please provide building or premises details';
        return undefined;

      case 'areaLocality':
        if (!val) return 'Area / Locality / Street / Landmark is required';
        if (val.length < 3) return 'Please provide complete street or locality info';
        return undefined;

      case 'city':
        if (!val) return 'City is required';
        if (val.length < 2) return 'Please enter a valid city name';
        return undefined;

      case 'state':
        if (!val) return 'Please select a state';
        return undefined;

      case 'pinCode': {
        const pin = String(val || '').replace(/\D/g, '');
        if (!pin) return '6-digit PIN code is required';
        if (pin.length !== 6) return 'Please enter a valid 6-digit Indian PIN code';
        return undefined;
      }

      case 'gstNumber':
        if (data.hasGst) {
          if (!val) return 'GSTIN is required for tax invoice';
          if (!/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i.test(val)) {
            return 'Invalid GSTIN format (e.g. 29AAAAA0000A1Z5)';
          }
        }
        return undefined;

      case 'agreeTerms':
        if (!value) return 'You must agree to the Terms & Conditions to proceed';
        return undefined;

      default:
        return undefined;
    }
  };

  // Field change handler
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const updatedData = { ...formData, [field]: value };
      const err = validateField(field, value, updatedData);
      setErrors(prev => ({ ...prev, [field]: err }));
    } else if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Field blur handler
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field], formData);
    setErrors(prev => ({ ...prev, [field]: err }));
  };

  // Dedicated sanitizers
  const handlePhoneChange = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 10);
    handleInputChange('phone', digits);
  };

  const handlePinCodeChange = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 6);
    handleInputChange('pinCode', digits);
  };

  const handleGstChange = (val) => {
    const clean = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 15);
    handleInputChange('gstNumber', clean);
  };

  // Validate entire form before advancing to review
  const validateForm = () => {
    const fieldsToValidate = [
      'fullName',
      'email',
      'phone',
      'businessName',
      'businessCategory',
      'houseBuilding',
      'areaLocality',
      'city',
      'state',
      'pinCode',
      'agreeTerms'
    ];
    if (needsGoogleLink) fieldsToValidate.push('googleReviewLink');
    if (needsInstagramLink) fieldsToValidate.push('instagramLink');
    if (formData.hasGst) fieldsToValidate.push('gstNumber');

    const newErrors = {};
    const newTouched = {};

    fieldsToValidate.forEach(field => {
      newTouched[field] = true;
      const err = validateField(field, formData[field], formData);
      if (err) newErrors[field] = err;
    });

    setTouched(prev => ({ ...prev, ...newTouched }));
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
  const handlePaymentSuccess = async (paymentResult) => {
    const newOrder = await createOrder({
      customer: {
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: `+91 ${formData.phone.trim()}`,
        businessName: formData.businessName.trim(),
        businessCategory: formData.businessCategory,
        googleReviewLink: formData.googleReviewLink.trim(),
        instagramLink: formData.instagramLink.trim(),
        houseBuilding: formData.houseBuilding.trim(),
        areaLocality: formData.areaLocality.trim(),
        addressLine: `${formData.houseBuilding.trim()}, ${formData.areaLocality.trim()}`,
        city: formData.city.trim(),
        state: formData.state,
        pinCode: formData.pinCode.trim(),
        gstNumber: formData.hasGst ? formData.gstNumber.trim() : '',
        gstCompanyName: formData.hasGst ? formData.gstCompanyName.trim() : ''
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
                  <div className="form-label-row">
                    <label htmlFor="field-fullName" className="form-label">
                      Full Name <span className="req">*</span>
                    </label>
                    {touched.fullName && !errors.fullName && formData.fullName.trim().length >= 2 && (
                      <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> Valid</span>
                    )}
                  </div>
                  <input
                    id="field-fullName"
                    type="text"
                    className={`form-input ${touched.fullName && errors.fullName ? 'error' : ''} ${touched.fullName && !errors.fullName && formData.fullName.trim().length >= 2 ? 'valid' : ''}`}
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    autoComplete="name"
                  />
                  {touched.fullName && errors.fullName && <div className="form-error"><AlertCircle size={12} /> {errors.fullName}</div>}
                </div>

                <div className="form-group">
                  <div className="form-label-row">
                    <label htmlFor="field-email" className="form-label">
                      Email Address <span className="req">*</span>
                    </label>
                    {touched.email && !errors.email && formData.email && (
                      <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> Valid</span>
                    )}
                  </div>
                  <input
                    id="field-email"
                    type="email"
                    className={`form-input ${touched.email && errors.email ? 'error' : ''} ${touched.email && !errors.email && formData.email ? 'valid' : ''}`}
                    placeholder="e.g. rajesh@business.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    autoComplete="email"
                  />
                  {touched.email && errors.email ? (
                    <div className="form-error"><AlertCircle size={12} /> {errors.email}</div>
                  ) : (
                    <div className="form-hint">Order confirmation & tracking details are delivered here.</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="field-phone" className="form-label">
                    Mobile Phone Number <span className="req">*</span>
                  </label>
                  {touched.phone && !errors.phone && formData.phone.length === 10 && (
                    <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> 10-Digit Verified</span>
                  )}
                </div>
                <div className={`phone-input-wrapper ${touched.phone && errors.phone ? 'error' : ''} ${touched.phone && !errors.phone && formData.phone.length === 10 ? 'valid' : ''}`}>
                  <div className="phone-country-prefix">
                    <span>🇮🇳</span>
                    <span>+91</span>
                  </div>
                  <input
                    id="field-phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    className="phone-field"
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    autoComplete="tel-national"
                  />
                  {formData.phone && (
                    <span className="phone-counter-badge">{formData.phone.length}/10</span>
                  )}
                </div>
                {touched.phone && errors.phone ? (
                  <div className="form-error"><AlertCircle size={12} /> {errors.phone}</div>
                ) : (
                  <div className="form-hint">Used for courier delivery notifications and OTP verification at doorstep.</div>
                )}
              </div>

              {/* SECTION: Business Details */}
              <div className="form-section-title">
                <Building2 size={14} /> Business & NFC Setup
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <div className="form-label-row">
                    <label htmlFor="field-businessName" className="form-label">
                      Business / Store Name <span className="req">*</span>
                    </label>
                    {touched.businessName && !errors.businessName && formData.businessName.trim().length >= 2 && (
                      <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> Configured</span>
                    )}
                  </div>
                  <input
                    id="field-businessName"
                    type="text"
                    className={`form-input ${touched.businessName && errors.businessName ? 'error' : ''} ${touched.businessName && !errors.businessName && formData.businessName.trim().length >= 2 ? 'valid' : ''}`}
                    placeholder="e.g. The Tiffin House Café"
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    onBlur={() => handleBlur('businessName')}
                  />
                  {touched.businessName && errors.businessName && <div className="form-error"><AlertCircle size={12} /> {errors.businessName}</div>}
                </div>

                <div className="form-group">
                  <div className="form-label-row">
                    <label htmlFor="field-businessCategory" className="form-label">
                      Business Category <span className="req">*</span>
                    </label>
                  </div>
                  <select
                    id="field-businessCategory"
                    className={`form-select ${touched.businessCategory && errors.businessCategory ? 'error' : ''}`}
                    value={formData.businessCategory}
                    onChange={(e) => handleInputChange('businessCategory', e.target.value)}
                    onBlur={() => handleBlur('businessCategory')}
                  >
                    {BUSINESS_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  {touched.businessCategory && errors.businessCategory && <div className="form-error"><AlertCircle size={12} /> {errors.businessCategory}</div>}
                </div>
              </div>

              {/* Conditional: Google Business Link (only if Google Card or Combo) */}
              {needsGoogleLink && (
                <div className="form-group">
                  <div className="form-label-row">
                    <label htmlFor="field-googleReviewLink" className="form-label">
                      Google Business Profile or Review Link <span className="req">*</span>
                    </label>
                    {touched.googleReviewLink && !errors.googleReviewLink && formData.googleReviewLink.trim().length >= 3 && (
                      <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> Configured</span>
                    )}
                  </div>
                  <input
                    id="field-googleReviewLink"
                    type="text"
                    className={`form-input ${touched.googleReviewLink && errors.googleReviewLink ? 'error' : ''} ${touched.googleReviewLink && !errors.googleReviewLink && formData.googleReviewLink.trim().length >= 3 ? 'valid' : ''}`}
                    placeholder="e.g. https://g.page/r/... or full business name on Google Maps"
                    value={formData.googleReviewLink}
                    onChange={(e) => handleInputChange('googleReviewLink', e.target.value)}
                    onBlur={() => handleBlur('googleReviewLink')}
                  />
                  {touched.googleReviewLink && errors.googleReviewLink ? (
                    <div className="form-error"><AlertCircle size={12} /> {errors.googleReviewLink}</div>
                  ) : (
                    <div className="form-hint">
                      💡 <strong>Tip:</strong> Enter your Google Maps link or exact shop name. Our technicians encode and laser-test your NFC chip before shipping.
                    </div>
                  )}
                </div>
              )}

              {/* Conditional: Instagram Profile Link (only if Instagram Card or Combo) */}
              {needsInstagramLink && (
                <div className="form-group">
                  <div className="form-label-row">
                    <label htmlFor="field-instagramLink" className="form-label">
                      Instagram Profile Handle or Link <span className="req">*</span>
                    </label>
                    {touched.instagramLink && !errors.instagramLink && formData.instagramLink.trim().length >= 2 && (
                      <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> Configured</span>
                    )}
                  </div>
                  <div className="insta-input-wrapper">
                    <span className="insta-prefix">@</span>
                    <input
                      id="field-instagramLink"
                      type="text"
                      className={`form-input insta-field ${touched.instagramLink && errors.instagramLink ? 'error' : ''} ${touched.instagramLink && !errors.instagramLink && formData.instagramLink.trim().length >= 2 ? 'valid' : ''}`}
                      placeholder="yourbusiness or instagram.com/yourbusiness"
                      value={formData.instagramLink.replace(/^@/, '')}
                      onChange={(e) => handleInputChange('instagramLink', e.target.value)}
                      onBlur={() => handleBlur('instagramLink')}
                    />
                  </div>
                  {touched.instagramLink && errors.instagramLink ? (
                    <div className="form-error"><AlertCircle size={12} /> {errors.instagramLink}</div>
                  ) : (
                    <div className="form-hint">
                      Instantly opens your Instagram profile when patrons tap your acrylic stand.
                    </div>
                  )}
                </div>
              )}

              {/* SECTION: Shipping Details */}
              <div className="form-section-title">
                <MapPin size={14} /> Pan-India Shipping Address
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="field-houseBuilding" className="form-label">
                    House / Flat / Building / Shop No. <span className="req">*</span>
                  </label>
                  {touched.houseBuilding && !errors.houseBuilding && formData.houseBuilding.trim().length >= 2 && (
                    <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> Valid</span>
                  )}
                </div>
                <input
                  id="field-houseBuilding"
                  type="text"
                  className={`form-input ${touched.houseBuilding && errors.houseBuilding ? 'error' : ''} ${touched.houseBuilding && !errors.houseBuilding && formData.houseBuilding.trim().length >= 2 ? 'valid' : ''}`}
                  placeholder="e.g. Shop #14, Ground Floor or Flat 302, Green Valley Apts"
                  value={formData.houseBuilding}
                  onChange={(e) => handleInputChange('houseBuilding', e.target.value)}
                  onBlur={() => handleBlur('houseBuilding')}
                />
                {touched.houseBuilding && errors.houseBuilding && <div className="form-error"><AlertCircle size={12} /> {errors.houseBuilding}</div>}
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="field-areaLocality" className="form-label">
                    Area / Locality / Street / Landmark <span className="req">*</span>
                  </label>
                  {touched.areaLocality && !errors.areaLocality && formData.areaLocality.trim().length >= 3 && (
                    <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> Valid</span>
                  )}
                </div>
                <input
                  id="field-areaLocality"
                  type="text"
                  className={`form-input ${touched.areaLocality && errors.areaLocality ? 'error' : ''} ${touched.areaLocality && !errors.areaLocality && formData.areaLocality.trim().length >= 3 ? 'valid' : ''}`}
                  placeholder="e.g. 100 Feet Road, Indiranagar, Opp. Metro Pillar 42"
                  value={formData.areaLocality}
                  onChange={(e) => handleInputChange('areaLocality', e.target.value)}
                  onBlur={() => handleBlur('areaLocality')}
                />
                {touched.areaLocality && errors.areaLocality && <div className="form-error"><AlertCircle size={12} /> {errors.areaLocality}</div>}
              </div>

              <div className="form-row-3">
                <div className="form-group">
                  <div className="form-label-row">
                    <label htmlFor="field-city" className="form-label">
                      City <span className="req">*</span>
                    </label>
                    {touched.city && !errors.city && formData.city.trim().length >= 2 && (
                      <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> Valid</span>
                    )}
                  </div>
                  <input
                    id="field-city"
                    type="text"
                    className={`form-input ${touched.city && errors.city ? 'error' : ''} ${touched.city && !errors.city && formData.city.trim().length >= 2 ? 'valid' : ''}`}
                    placeholder="e.g. Bengaluru"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    onBlur={() => handleBlur('city')}
                  />
                  {touched.city && errors.city && <div className="form-error"><AlertCircle size={12} /> {errors.city}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="field-state" className="form-label">
                    State <span className="req">*</span>
                  </label>
                  <select
                    id="field-state"
                    className={`form-select ${touched.state && errors.state ? 'error' : ''}`}
                    value={formData.state}
                    onChange={(e) => handleInputChange('state', e.target.value)}
                    onBlur={() => handleBlur('state')}
                  >
                    {INDIAN_STATES.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  {touched.state && errors.state && <div className="form-error"><AlertCircle size={12} /> {errors.state}</div>}
                </div>

                <div className="form-group">
                  <div className="form-label-row">
                    <label htmlFor="field-pinCode" className="form-label">
                      PIN Code <span className="req">*</span>
                    </label>
                    {touched.pinCode && !errors.pinCode && formData.pinCode.length === 6 && (
                      <span className="valid-label-badge"><CheckCircle2 size={13} color="#10B981" /> Valid PIN</span>
                    )}
                  </div>
                  <input
                    id="field-pinCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    className={`form-input ${touched.pinCode && errors.pinCode ? 'error' : ''} ${touched.pinCode && !errors.pinCode && formData.pinCode.length === 6 ? 'valid' : ''}`}
                    placeholder="6 digits (e.g. 560001)"
                    value={formData.pinCode}
                    onChange={(e) => handlePinCodeChange(e.target.value)}
                    onBlur={() => handleBlur('pinCode')}
                  />
                  {touched.pinCode && errors.pinCode && <div className="form-error"><AlertCircle size={12} /> {errors.pinCode}</div>}
                </div>
              </div>

              {/* Optional Business GST Invoice Box */}
              <div className="gst-toggle-box">
                <label className="gst-toggle-label">
                  <input
                    type="checkbox"
                    checked={formData.hasGst}
                    onChange={(e) => handleInputChange('hasGst', e.target.checked)}
                  />
                  <span>Add Business GSTIN for Official Tax Invoice (Optional)</span>
                </label>
                {formData.hasGst && (
                  <div className="gst-fields-grid">
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">GSTIN (15 Digits)</label>
                      <input
                        type="text"
                        maxLength={15}
                        className={`form-input ${touched.gstNumber && errors.gstNumber ? 'error' : ''} ${touched.gstNumber && !errors.gstNumber && formData.gstNumber.length === 15 ? 'valid' : ''}`}
                        placeholder="e.g. 29AAAAA0000A1Z5"
                        value={formData.gstNumber}
                        onChange={(e) => handleGstChange(e.target.value)}
                        onBlur={() => handleBlur('gstNumber')}
                      />
                      {touched.gstNumber && errors.gstNumber && (
                        <div className="form-error"><AlertCircle size={12} /> {errors.gstNumber}</div>
                      )}
                    </div>
                    <div className="form-group" style={{ marginBottom: 0 }}>
                      <label className="form-label">Registered Legal Name</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Company name as registered on GST"
                        value={formData.gstCompanyName}
                        onChange={(e) => handleInputChange('gstCompanyName', e.target.value)}
                      />
                    </div>
                  </div>
                )}
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
                {touched.agreeTerms && errors.agreeTerms && <div className="form-error"><AlertCircle size={12} /> {errors.agreeTerms}</div>}
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

                {/* GST Invoice Tile (if provided) */}
                {formData.hasGst && formData.gstNumber && (
                  <div className="review-detail-tile">
                    <div className="review-detail-heading">
                      <Building2 size={13} /> GST Tax Invoice
                    </div>
                    <div className="review-detail-line">
                      <strong>GSTIN:</strong> {formData.gstNumber}
                    </div>
                    {formData.gstCompanyName && (
                      <div className="review-detail-line">
                        <strong>Entity:</strong> {formData.gstCompanyName}
                      </div>
                    )}
                  </div>
                )}

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

import React from 'react';
import { ShieldCheck, Lock, Eye, CreditCard, Cookie, Share2, Server, RefreshCw, Mail } from 'lucide-react';
import { PolicyLayout } from '../components/PolicyLayout';

export const PrivacyPolicyPage = () => {
  return (
    <PolicyLayout
      title="Privacy Policy"
      breadcrumbTitle="Privacy Policy"
      badge="Data Privacy & Protection"
      badgeIcon={ShieldCheck}
      lastUpdated="September 2026"
      seoTitle="Privacy Policy | Tapzyy Technologies"
      seoDescription="Learn how Tapzyy collects, uses, and safeguards customer data for NFC card orders and customer support."
    >
      {/* 1. Information We Collect */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">01</span>
          Information We Collect
        </h2>
        <p className="policy-text">
          Tapzyy collects information necessary to manufacture, configure, ship, and support your physical NFC review cards. This includes:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">
            <strong>Contact & Delivery Details:</strong> Full name, business name, physical shipping address, phone number, and email address provided during checkout.
          </li>
          <li className="policy-list-item">
            <strong>Product Configuration Data:</strong> Your business's Google Review link, Google Maps place link, or Instagram handle required to program your NFC chip and generate your custom QR code.
          </li>
          <li className="policy-list-item">
            <strong>Technical Data:</strong> Browser type, operating system, IP address, and site browsing patterns collected automatically to maintain website stability and security.
          </li>
        </ul>
      </section>

      {/* 2. How We Use Information */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">02</span>
          How We Use Information
        </h2>
        <p className="policy-text">
          We use collected information solely for legitimate operational purposes:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">Processing, custom-encoding, printing, and shipping your physical Tapzyy orders.</li>
          <li className="policy-list-item">Sending order confirmations, tracking details, and shipment status alerts via email or SMS.</li>
          <li className="policy-list-item">Providing technical support, replacements, and answering customer queries.</li>
          <li className="policy-list-item">Improving website performance, checkout reliability, and product quality.</li>
        </ul>
      </section>

      {/* 3. Payments */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">03</span>
          Payments
        </h2>
        <p className="policy-text">
          All online payments on Tapzyy are processed through secure, RBI-compliant Indian payment gateways (such as Razorpay, supporting UPI, cards, and netbanking).
        </p>
        <div className="policy-notice">
          <strong>Payment Security:</strong> Tapzyy <strong>never</strong> stores or processes your full credit/debit card numbers, CVVs, netbanking passwords, or UPI PINs on our servers.
        </div>
      </section>

      {/* 4. Cookies */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">04</span>
          Cookies
        </h2>
        <p className="policy-text">
          We use essential and session cookies to:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">Keep track of your active shopping cart items during your visit.</li>
          <li className="policy-list-item">Remember your delivery preferences and improve page loading speeds.</li>
          <li className="policy-list-item">Analyze aggregate, non-personal website traffic to enhance user experience.</li>
        </ul>
        <p className="policy-text">
          You can disable cookies in your web browser settings at any time; however, some checkout features may require cookies to function correctly.
        </p>
      </section>

      {/* 5. Sharing Information */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">05</span>
          Sharing Information
        </h2>
        <p className="policy-text">
          We respect your privacy and adhere to strict data-sharing principles:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item"><strong>We never sell, rent, or trade</strong> customer personal data to third-party advertisers or data brokers.</li>
          <li className="policy-list-item">Data is shared only with verified operational partners essential for order fulfillment: courier and logistics partners (to deliver packages) and payment processors (to complete transactions).</li>
          <li className="policy-list-item">We may disclose information if strictly required by applicable Indian law, court order, or governmental authorities.</li>
        </ul>
      </section>

      {/* 6. Data Security */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">06</span>
          Data Security
        </h2>
        <p className="policy-text">
          We apply industry-standard 256-bit SSL/TLS encryption across our website. Administrative access to customer order information is strictly restricted to authorized fulfillment personnel on a need-to-know basis.
        </p>
      </section>

      {/* 7. Third-Party Services */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">07</span>
          Third-Party Services
        </h2>
        <p className="policy-text">
          Tapzyy physical products redirect users to third-party platforms such as Google (for reviews) or Instagram (for social follows). Once a customer taps or scans the card, their interaction on those platforms is governed directly by Google's and Meta's respective terms and privacy policies.
        </p>
      </section>

      {/* 8. Policy Updates */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">08</span>
          Policy Updates
        </h2>
        <p className="policy-text">
          Tapzyy reserves the right to update this Privacy Policy as our services evolve or legal standards change. Any modifications will be posted directly on this page with the updated revision date.
        </p>
      </section>

      {/* 9. Contact Us */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">09</span>
          Contact Us
        </h2>
        <p className="policy-text">
          If you have questions, corrections, or requests regarding your personal information, please reach out directly:
        </p>
        <p className="policy-text">
          Email: <a href="mailto:Tapzyy.in@gmail.com" style={{ color: '#0066FF', fontWeight: '700' }}>Tapzyy.in@gmail.com</a>
        </p>
      </section>
    </PolicyLayout>
  );
};

export default PrivacyPolicyPage;

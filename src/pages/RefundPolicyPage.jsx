import React from 'react';
import { RotateCcw } from 'lucide-react';
import { PolicyLayout } from '../components/PolicyLayout';

export const RefundPolicyPage = () => {
  return (
    <PolicyLayout
      title="Refund & Cancellation Policy"
      breadcrumbTitle="Refund & Cancellation"
      badge="Order Protection & Support"
      badgeIcon={RotateCcw}
      lastUpdated="September 2026"
      seoTitle="Refund & Cancellation Policy | Tapzyy"
      seoDescription="Official Tapzyy policies on order cancellations, 12-hour damage reporting, custom NFC item guidelines, and replacement procedures."
    >
      {/* 1. Order Cancellation */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">01</span>
          Order Cancellation
        </h2>
        <p className="policy-text">
          Cancellation requests should be made as soon as possible after placing your order.
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">
            Because each Tapzyy card is custom-configured for your specific business link, cancellation is only possible before our technical team begins customization, NFC chip programming, UV printing, or packaging.
          </li>
          <li className="policy-list-item">
            Once physical production, NFC configuration, or dispatch has started, the order cannot be cancelled or recalled.
          </li>
          <li className="policy-list-item">
            To request an immediate cancellation, email us right away at <strong>Tapzyy.in@gmail.com</strong> with your Order ID and subject line: <em>"Urgent Cancellation - [Order ID]"</em>.
          </li>
        </ul>
      </section>

      {/* 2. Customized & Configured Products */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">02</span>
          Customized & Configured Products
        </h2>
        <p className="policy-text">
          Tapzyy products are bespoke hardware items custom-encoded with your unique Google Review URL, Instagram profile link, or custom business URL.
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">
            Due to the customized nature of NFC encoding and permanent UV surface printing, these items cannot be restocked, repurposed, or resold to other businesses.
          </li>
          <li className="policy-list-item">
            Customized and configured products are strictly not eligible for return or refund once produced, except in verified cases of transit damage or manufacturing defects.
          </li>
        </ul>
      </section>

      {/* 3. Damaged Products */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">03</span>
          Damaged Products (12-Hour Reporting Window)
        </h2>
        <div className="policy-notice alert">
          <strong>Mandatory 12-Hour Notice:</strong> Damaged products must be reported <strong>within 12 hours of courier delivery</strong>.
        </div>
        <p className="policy-text">
          If your package or acrylic display arrives broken, cracked, or physically damaged during transit:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">
            Email <strong>Tapzyy.in@gmail.com</strong> within 12 hours of receiving the parcel.
          </li>
          <li className="policy-list-item">
            Attach clear, unedited photographs or a short video showing the damaged card and the exterior courier packaging with the shipping label visible.
          </li>
          <li className="policy-list-item">
            Once verified, we will immediately prioritize, produce, and dispatch a 100% free replacement at zero cost to you.
          </li>
        </ul>
      </section>

      {/* 4. Incorrect Products */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">04</span>
          Incorrect Products
        </h2>
        <p className="policy-text">
          If the package delivered to you contains an incorrect item, wrong model (e.g. Instagram card received instead of Google Review card), or is missing items from a bundle:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">
            Notify our support team within 24 hours of delivery.
          </li>
          <li className="policy-list-item">
            We will cross-check our packaging logs and dispatch the correct replacement immediately without requiring you to pay any additional shipping charges.
          </li>
        </ul>
      </section>

      {/* 5. Defective Products */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">05</span>
          Defective Products
        </h2>
        <p className="policy-text">
          Every Tapzyy card undergoes dual quality control testing before dispatch. However, if your card's NFC chip or printed QR code fails to function upon initial receipt:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">
            Our team will assist with quick phone compatibility verification (ensuring NFC is toggled ON and checking the phone's NFC sweet spot).
          </li>
          <li className="policy-list-item">
            If the chip is verified as defective upon arrival, we will manufacture and ship a free replacement card immediately.
          </li>
        </ul>
      </section>

      {/* 6. Change of Mind */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">06</span>
          Change of Mind
        </h2>
        <p className="policy-text">
          We do not accept returns or issue refunds for change of mind, inadvertent purchases, or business operational changes once an order has entered production or has been delivered.
        </p>
        <p className="policy-text">
          We strongly advise reviewing product features, card dimensions, and your review link accuracy prior to placing an order.
        </p>
      </section>

      {/* 7. Refunds */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">07</span>
          Refunds
        </h2>
        <p className="policy-text">
          Where a refund is approved by our management team (such as a successful pre-production cancellation):
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">
            Approved refunds will normally be returned through the <strong>original payment method</strong> used during checkout (UPI, Credit/Debit Card, NetBanking).
          </li>
          <li className="policy-list-item">
            Refunds typically take <strong>5 to 7 business days</strong> to reflect in your bank account or credit card statement, in accordance with standard Indian banking processing timelines.
          </li>
        </ul>
      </section>

      {/* 8. Non-Refundable Situations */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">08</span>
          Non-Refundable Situations
        </h2>
        <p className="policy-text">
          Refunds, returns, or free replacements will not be granted under the following circumstances:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">
            An incorrect, broken, or expired review link or destination URL was supplied by the customer during checkout.
          </li>
          <li className="policy-list-item">
            Damaged package reports submitted after the mandatory 12-hour window following delivery.
          </li>
          <li className="policy-list-item">
            Physical damage resulting from accidental drops, rough handling, scratches, water submersion, or aggressive chemical cleaning agents after delivery.
          </li>
          <li className="policy-list-item">
            Courier delivery failures resulting from an incorrect shipping address, invalid contact phone number, or repeated customer unavailability.
          </li>
        </ul>
      </section>

      {/* 9. How to Request a Refund or Replacement */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">09</span>
          How to Request a Refund or Replacement
        </h2>
        <p className="policy-text">
          To initiate a claim smoothly, follow these simple steps:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">
            <strong>Step 1:</strong> Email <strong>Tapzyy.in@gmail.com</strong> with the subject line <em>"Claim - [Your Order ID]"</em>.
          </li>
          <li className="policy-list-item">
            <strong>Step 2:</strong> Provide your full name, registered phone number, and a brief description of the issue.
          </li>
          <li className="policy-list-item">
            <strong>Step 3:</strong> Attach clear photos or a short video demonstrating the defect or transit damage, along with the outer packaging.
          </li>
          <li className="policy-list-item">
            <strong>Step 4:</strong> Our support desk will review your details within 24 hours and issue a replacement confirmation or refund approval.
          </li>
        </ul>
      </section>

      {/* 10. Contact */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">10</span>
          Contact
        </h2>
        <p className="policy-text">
          For any questions or clarification regarding our Refund & Cancellation Policy, please contact our support team:
        </p>
        <p className="policy-text">
          Email: <a href="mailto:Tapzyy.in@gmail.com" style={{ color: '#0066FF', fontWeight: '700' }}>Tapzyy.in@gmail.com</a>
        </p>
      </section>
    </PolicyLayout>
  );
};

export default RefundPolicyPage;

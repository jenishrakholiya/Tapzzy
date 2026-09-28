import React from 'react';
import { Scale, AlertCircle } from 'lucide-react';
import { PolicyLayout } from '../components/PolicyLayout';

export const TermsPage = () => {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      breadcrumbTitle="Terms & Conditions"
      badge="Legal Agreement"
      badgeIcon={Scale}
      lastUpdated="September 2026"
      seoTitle="Terms & Conditions | Tapzyy Technologies"
      seoDescription="Official terms of service, acceptable use guidelines, and product purchase terms for Tapzyy NFC products."
    >
      {/* 1. About Tapzyy */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">01</span>
          About Tapzyy
        </h2>
        <p className="policy-text">
          Tapzyy Technologies India ("Tapzyy", "we", "our") provides offline-to-online customer engagement solutions, including custom NFC-enabled and QR-coded smart display cards and stands designed for local businesses across India.
        </p>
      </section>

      {/* 2. Products & Services */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">02</span>
          Products & Services
        </h2>
        <p className="policy-text">
          We manufacture 4mm premium acrylic display stands embedded with NFC microchips and high-resolution UV-printed QR codes. When tapped with an NFC-compatible smartphone or scanned via camera, the card directs the customer to your specified digital destination (such as your Google Review page or Instagram profile).
        </p>
      </section>

      {/* 3. Orders & Payments */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">03</span>
          Orders & Payments
        </h2>
        <ul className="policy-list">
          <li className="policy-list-item">All orders placed through tapzyy.com must be prepaid in full using our authorized payment options.</li>
          <li className="policy-list-item">Prices are quoted in Indian Rupees (INR) and include applicable GST unless otherwise stated.</li>
          <li className="policy-list-item">We reserve the right to decline or cancel orders in cases of suspected fraud, pricing errors, or unauthorized usage.</li>
        </ul>
      </section>

      {/* 4. Product Setup */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">04</span>
          Product Setup
        </h2>
        <p className="policy-text">
          During checkout or onboarding, you provide your business name and official Google Review link or profile URL. Our team encodes this URL onto the NFC chip and prints the corresponding QR code.
        </p>
        <p className="policy-text">
          <strong>Customer Responsibility:</strong> You are responsible for ensuring that the URL or business details provided are accurate and functional before production begins.
        </p>
      </section>

      {/* 5. Acceptable Use */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">05</span>
          Acceptable Use
        </h2>
        <p className="policy-text">
          Tapzyy products must only be used for legitimate, lawful business promotion. You agree not to:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">Link or program cards to malicious, phishing, defamatory, adult, or illegal content under Indian law.</li>
          <li className="policy-list-item">Impersonate other businesses, brands, or trademarks without proper authorization.</li>
          <li className="policy-list-item">Attempt to reverse-engineer or tamper with Tapzyy firmware or proprietary assets.</li>
        </ul>
      </section>

      {/* 6. Google & Third-Party Platforms */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">06</span>
          Google & Third-Party Platforms
        </h2>
        <p className="policy-text">
          Tapzyy is an independent product manufacturer. <strong>Tapzyy is not affiliated with, endorsed by, or sponsored by Google LLC, Alphabet Inc., Instagram, or Meta Platforms, Inc.</strong> All trademarks, logos, and brand icons shown are the property of their respective owners.
        </p>
      </section>

      {/* 7. Customer Reviews & Results Disclaimer */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">07</span>
          Customer Reviews & Performance Disclaimer
        </h2>
        <div className="policy-notice alert">
          <strong>Important Results Notice:</strong> Tapzyy provides physical hardware and QR convenience tools to make accessing your review page easier. <strong>Tapzyy does not guarantee specific Google search rankings, review counts, 5-star ratings, revenue increases, or business growth.</strong>
        </div>
        <p className="policy-text">
          Customer reviews are voluntary expressions of end customers. Tapzyy has no control over customer feedback, review policies, or Google review filtration algorithms.
        </p>
      </section>

      {/* 8. Intellectual Property */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">08</span>
          Intellectual Property
        </h2>
        <p className="policy-text">
          All website content, text, graphics, logos, product concepts, and branding on tapzyy.com are the exclusive intellectual property of Tapzyy Technologies India. Unauthorized reproduction or resale is prohibited.
        </p>
      </section>

      {/* 9. Limitation of Liability */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">09</span>
          Limitation of Liability
        </h2>
        <p className="policy-text">
          To the maximum extent permitted by Indian law, Tapzyy's total liability for any claim arising from your purchase or use of our products shall be strictly limited to the amount paid for the specific product. Tapzyy shall not be liable for indirect, incidental, or consequential business damages.
        </p>
      </section>

      {/* 10. Policy Updates */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">10</span>
          Policy Updates
        </h2>
        <p className="policy-text">
          We reserve the right to revise these Terms & Conditions at our discretion. Any revisions take effect immediately upon publication on this page.
        </p>
      </section>

      {/* 11. Contact */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">11</span>
          Contact
        </h2>
        <p className="policy-text">
          For questions, inquiries, or legal communications regarding these Terms & Conditions, please write to:
        </p>
        <p className="policy-text">
          Email: <a href="mailto:Tapzyy.in@gmail.com" style={{ color: '#0066FF', fontWeight: '700' }}>Tapzyy.in@gmail.com</a>
        </p>
      </section>
    </PolicyLayout>
  );
};

export default TermsPage;

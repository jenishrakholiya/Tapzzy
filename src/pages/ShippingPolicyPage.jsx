import React from 'react';
import { Truck } from 'lucide-react';
import { PolicyLayout } from '../components/PolicyLayout';

export const ShippingPolicyPage = () => {
  return (
    <PolicyLayout
      title="Shipping Policy"
      breadcrumbTitle="Shipping Policy"
      badge="Pan-India Logistics"
      badgeIcon={Truck}
      lastUpdated="September 2026"
      seoTitle="Shipping Policy | Tapzyy Pan-India Delivery"
      seoDescription="Read Tapzyy's Pan-India shipping timelines, courier tracking details, and damaged package reporting guidelines."
    >
      {/* 1. Order Processing */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">01</span>
          Order Processing
        </h2>
        <p className="policy-text">
          Every Tapzyy card is individually programmed with your business link, quality-tested for NFC responsiveness, and packaged with protective corner cushions.
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">Orders are typically prepared, configured, and dispatched within <strong>24 to 48 business hours</strong> after payment confirmation and URL verification.</li>
          <li className="policy-list-item">Orders placed on Sundays or national holidays are processed on the subsequent working day.</li>
        </ul>
      </section>

      {/* 2. Shipping & Delivery */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">02</span>
          Shipping & Delivery
        </h2>
        <p className="policy-text">
          Tapzyy ships orders across all states and union territories within India using reputed express logistics partners (such as Bluedart, Delhivery, DTDC, and India Post).
        </p>
        <ul className="policy-list">
          <li className="policy-list-item"><strong>Metro Cities:</strong> Estimated delivery within 2 to 4 business days post-dispatch.</li>
          <li className="policy-list-item"><strong>Tier 2 & Tier 3 Cities / Rest of India:</strong> Estimated delivery within 4 to 7 business days post-dispatch.</li>
        </ul>
        <p className="policy-text">
          <em>Please note: Delivery timelines may vary depending on local courier logistics, regional holidays, adverse weather, or interstate transit restrictions.</em>
        </p>
      </section>

      {/* 3. Shipping Charges */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">03</span>
          Shipping Charges
        </h2>
        <p className="policy-text">
          Shipping costs (or promotional Free Shipping offers) are clearly calculated and displayed at checkout before you complete payment. No hidden shipping charges or surcharges are added after checkout.
        </p>
      </section>

      {/* 4. Tracking */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">04</span>
          Tracking
        </h2>
        <p className="policy-text">
          As soon as your package is handed over to our courier partner, you will receive an automated shipping notification via email and/or SMS containing your:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">Courier partner name (e.g. Delhivery, Bluedart).</li>
          <li className="policy-list-item">AWB / Consignment tracking number.</li>
          <li className="policy-list-item">Direct tracking link to monitor live shipment movements.</li>
        </ul>
      </section>

      {/* 5. Delayed Deliveries */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">05</span>
          Delayed Deliveries
        </h2>
        <p className="policy-text">
          While the vast majority of our orders arrive well within estimated timeframes, unforeseen courier delays can sometimes occur due to natural weather disruptions, festival surges, or incorrect addresses. If your shipment appears delayed beyond 7 business days, email us and we will coordinate an expedited escalation with the courier hub.
        </p>
      </section>

      {/* 6. Damaged Packages */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">06</span>
          Damaged Packages (12-Hour Reporting Window)
        </h2>
        <div className="policy-notice alert">
          <strong>Crucial Requirement:</strong> If your package or acrylic card arrives physically broken, cracked, or severely damaged in transit, you <strong>must notify Tapzyy within 12 hours of delivery</strong>.
        </div>
        <p className="policy-text">
          To report damage, email <strong>Tapzyy.in@gmail.com</strong> with:
        </p>
        <ul className="policy-list">
          <li className="policy-list-item">Your Order ID and phone number.</li>
          <li className="policy-list-item">Clear photographs/videos of the broken product and the outer courier packaging box.</li>
        </ul>
        <p className="policy-text">
          Reports received within 12 hours will be reviewed immediately for an expedited, 100% free replacement.
        </p>
      </section>

      {/* 7. Incorrect / Missing Items */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">07</span>
          Incorrect or Missing Items
        </h2>
        <p className="policy-text">
          If you receive an item that does not match your ordered model or notice missing pieces from a combo order, please report it within 24 hours of delivery. We will verify our packaging logs and dispatch the correct items immediately at no additional cost.
        </p>
      </section>

      {/* 8. Contact */}
      <section className="policy-section">
        <h2 className="policy-section-title">
          <span className="policy-section-num">08</span>
          Contact
        </h2>
        <p className="policy-text">
          For any delivery assistance, address updates prior to dispatch, or transit inquiries, contact our logistics support team:
        </p>
        <p className="policy-text">
          Email: <a href="mailto:Tapzyy.in@gmail.com" style={{ color: '#0066FF', fontWeight: '700' }}>Tapzyy.in@gmail.com</a>
        </p>
      </section>
    </PolicyLayout>
  );
};

export default ShippingPolicyPage;

/**
 * Order Email Notification & Templating Service
 * Generates beautiful, responsive HTML & plain-text email templates
 * and handles dispatching real-time order alerts to store owner and customers.
 */

import { ADMIN_CREDENTIALS, STORE_CREDENTIALS } from '../config/credentials';

export const ADMIN_NOTIFICATION_EMAIL = ADMIN_CREDENTIALS.notificationEmail;
const EMAIL_LOG_KEY = 'tapzyy_order_emails_log';

/**
 * Format order details into a clean, human-readable summary string
 * Perfect for plain text emails, mailto bodies, and WhatsApp sharing.
 */
export function formatOrderSummaryText(order, type = 'customer') {
  if (!order) return '';
  const customer = order.customer || {};
  const items = order.items || [];
  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const itemsList = items
    .map((item, idx) => `  ${idx + 1}. ${item.name} × ${item.quantity}  -->  Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}`)
    .join('\n');

  const isAdmin = type === 'admin';

  return `
===================================================
  ${isAdmin ? '🔥 NEW TAPZYY ORDER RECEIVED' : '✨ TAPZYY ORDER CONFIRMATION & RECEIPT'}
===================================================
Order ID        : #${order.id}
Order Date      : ${dateStr} IST
Payment Method  : ${order.paymentMethod || 'UPI / Online'}
Payment Status  : ${order.paymentStatus || 'Confirmed'}
Grand Total     : Rs. ${Number(order.grandTotal || 0).toLocaleString('en-IN')}

---------------------------------------------------
📦 ITEMS ORDERED
---------------------------------------------------
${itemsList || '  No items listed'}

Subtotal        : Rs. ${Number(order.subtotal || order.grandTotal || 0).toLocaleString('en-IN')}
Discount        : Rs. ${Number(order.discount || 0).toLocaleString('en-IN')}
Shipping        : Rs. ${Number(order.shippingFee || 0).toLocaleString('en-IN')} (Free Express Delivery)
Grand Total     : Rs. ${Number(order.grandTotal || 0).toLocaleString('en-IN')}

---------------------------------------------------
👤 CUSTOMER & BUSINESS DETAILS
---------------------------------------------------
Customer Name   : ${customer.fullName || 'N/A'}
Contact Phone   : ${customer.phone || 'N/A'}
Email Address   : ${customer.email || 'N/A'}
Business Name   : ${customer.businessName || 'N/A'} ${customer.businessCategory ? `(${customer.businessCategory})` : ''}
${customer.gstNumber ? `GSTIN           : ${customer.gstNumber} ${customer.gstCompanyName ? `(${customer.gstCompanyName})` : ''}\n` : ''}
---------------------------------------------------
📍 DELIVERY ADDRESS
---------------------------------------------------
Address Line    : ${customer.addressLine || 'N/A'}
City, State     : ${customer.city || 'N/A'}, ${customer.state || 'N/A'}
PIN Code        : ${customer.pinCode || 'N/A'}

---------------------------------------------------
⚡ NFC SMART CARD ENCODING
---------------------------------------------------
Google Review   : ${customer.googleReviewLink || 'Not specified (Team will assist)'}
Instagram Page  : ${customer.instagramLink || 'Not specified'}

---------------------------------------------------
${isAdmin ? '🔗 Manage Order in Admin: https://tapzzy.vercel.app/admin-tap' : '🚚 Estimated Delivery: 3-5 Business Days across India'}
💬 Need help? WhatsApp Support: +91 99988 77665
===================================================
`.trim();
}

/**
 * Generate a production-grade, responsive HTML email template
 * Compatible with Gmail, Outlook, Apple Mail, and mobile clients.
 * 
 * @param {Object} order - Full order object
 * @param {'customer' | 'admin'} type - Target audience
 * @returns {string} Fully self-contained HTML email string
 */
export function generateOrderHtmlEmail(order, type = 'customer') {
  if (!order) return '';
  const customer = order.customer || {};
  const items = order.items || [];
  const isAdmin = type === 'admin';
  const isCod = String(order.paymentMethod || '').toLowerCase().includes('cod');
  
  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const totalFormatted = `₹${Number(order.grandTotal || 0).toLocaleString('en-IN')}`;
  const subtotalFormatted = `₹${Number(order.subtotal || order.grandTotal || 0).toLocaleString('en-IN')}`;
  const discountFormatted = order.discount ? `-₹${Number(order.discount).toLocaleString('en-IN')}` : '₹0';

  const rowsHtml = items.map((item, index) => `
    <tr style="border-bottom: 1px solid #E2E8F0;">
      <td style="padding: 14px 12px; font-size: 14px; color: #1E293B; vertical-align: top;">
        <strong style="color: #0F172A; display: block; font-size: 14px;">${item.name}</strong>
        <span style="display: inline-block; font-size: 11px; background-color: #EFF6FF; color: #1D4ED8; padding: 2px 6px; border-radius: 4px; margin-top: 4px; font-weight: 600;">
          NFC Chip + Dynamic QR
        </span>
      </td>
      <td style="padding: 14px 12px; font-size: 14px; color: #475569; text-align: center; vertical-align: top; font-weight: 600;">
        ${item.quantity}
      </td>
      <td style="padding: 14px 12px; font-size: 14px; color: #475569; text-align: right; vertical-align: top;">
        ₹${Number(item.price).toLocaleString('en-IN')}
      </td>
      <td style="padding: 14px 12px; font-size: 14px; color: #0F172A; text-align: right; vertical-align: top; font-weight: 700;">
        ₹${Number(item.price * item.quantity).toLocaleString('en-IN')}
      </td>
    </tr>
  `).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${isAdmin ? `New Order #${order.id}` : `Tapzyy Order Confirmation #${order.id}`}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #1E293B;">
  <div style="background-color: #F1F5F9; padding: 24px 12px;">
    <!-- Container -->
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); border: 1px solid #E2E8F0;">
      
      <!-- Brand Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #0B132B 0%, #1C2541 50%, #0066FF 100%); padding: 32px 28px; text-align: center; color: #FFFFFF;">
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center">
                <div style="display: inline-block; background: rgba(255, 255, 255, 0.15); padding: 8px 16px; border-radius: 24px; margin-bottom: 12px;">
                  <span style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 800; color: #93C5FD;">TAPZYY NFC SMART CARDS</span>
                </div>
                <h1 style="margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF;">
                  ${isAdmin ? '🔥 New Order Received!' : '🎉 Thank You for Your Order!'}
                </h1>
                <p style="margin: 0; font-size: 14px; color: #E0E7FF; line-height: 1.4;">
                  ${isAdmin 
                    ? `Order <strong>#${order.id}</strong> has been logged and is awaiting dispatch.` 
                    : `We’re preparing your custom NFC smart card. Order ID: <strong>#${order.id}</strong>`}
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- Order Status Ribbon -->
      <tr>
        <td style="background-color: ${isCod ? '#EFF6FF' : '#F0FDF4'}; padding: 12px 24px; border-bottom: 1px solid ${isCod ? '#BFDBFE' : '#BBF7D0'}; text-align: center;">
          <span style="font-size: 13px; font-weight: 700; color: ${isCod ? '#1D4ED8' : '#15803D'};">
            ● Status: ${order.paymentStatus || (isCod ? 'Pending (Cash on Delivery)' : 'Payment Verified')}
          </span>
          <span style="margin: 0 8px; color: #94A3B8;">|</span>
          <span style="font-size: 13px; color: #475569; font-weight: 600;">
            Delivery: 3-5 Business Days
          </span>
        </td>
      </tr>

      <!-- Main Body Content -->
      <tr>
        <td style="padding: 24px 28px;">
          
          <!-- Key Metrics Grid -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 24px;">
            <tr>
              <td width="50%" style="padding: 16px; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
                <span style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Order ID</span>
                <strong style="font-size: 15px; color: #0066FF;">#${order.id}</strong>
              </td>
              <td width="50%" style="padding: 16px; border-bottom: 1px solid #E2E8F0;">
                <span style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Order Date</span>
                <strong style="font-size: 13px; color: #1E293B;">${dateStr}</strong>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding: 16px; border-right: 1px solid #E2E8F0;">
                <span style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Payment Method</span>
                <strong style="font-size: 13px; color: #1E293B;">${order.paymentMethod || 'UPI / Online'}</strong>
              </td>
              <td width="50%" style="padding: 16px;">
                <span style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Grand Total</span>
                <strong style="font-size: 18px; color: #0F172A;">${totalFormatted}</strong>
              </td>
            </tr>
          </table>

          <!-- Items Ordered Table -->
          <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 800; color: #0F172A; letter-spacing: -0.01em;">
            📦 Items in this Order
          </h3>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #F1F5F9; border-bottom: 2px solid #CBD5E1;">
                <th align="left" style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 700;">Product</th>
                <th align="center" style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 700;">Qty</th>
                <th align="right" style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 700;">Rate</th>
                <th align="right" style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 700;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <!-- Price Summary Calculation -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px;">
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Item Subtotal:</td>
              <td align="right" style="padding: 4px 0; font-size: 13px; color: #1E293B; font-weight: 600;">${subtotalFormatted}</td>
            </tr>
            ${order.discount ? `
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #16A34A;">Special Discount:</td>
              <td align="right" style="padding: 4px 0; font-size: 13px; color: #16A34A; font-weight: 600;">${discountFormatted}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 4px 0; font-size: 13px; color: #64748B;">Express Shipping:</td>
              <td align="right" style="padding: 4px 0; font-size: 13px; color: #16A34A; font-weight: 700;">FREE (₹0)</td>
            </tr>
            <tr style="border-top: 1px solid #CBD5E1;">
              <td style="padding: 12px 0 4px 0; font-size: 16px; font-weight: 800; color: #0F172A;">Total Amount:</td>
              <td align="right" style="padding: 12px 0 4px 0; font-size: 20px; font-weight: 800; color: #0066FF;">${totalFormatted}</td>
            </tr>
          </table>

          <!-- NFC Customization Data Box -->
          ${(customer.googleReviewLink || customer.instagramLink) ? `
          <div style="background-color: #EEF2FF; border-left: 4px solid #4F46E5; border-radius: 8px; padding: 14px 16px; margin-bottom: 24px;">
            <strong style="color: #3730A3; font-size: 13px; display: block; margin-bottom: 6px;">
              ⚡ NFC Smart Card Chip Encoding Setup:
            </strong>
            ${customer.googleReviewLink ? `
              <div style="font-size: 12px; color: #1E1B4B; margin-bottom: 4px;">
                <strong>Google Review Link:</strong> <a href="${customer.googleReviewLink}" target="_blank" style="color: #4F46E5; word-break: break-all;">${customer.googleReviewLink}</a>
              </div>
            ` : ''}
            ${customer.instagramLink ? `
              <div style="font-size: 12px; color: #1E1B4B;">
                <strong>Instagram Profile:</strong> <a href="${customer.instagramLink}" target="_blank" style="color: #4F46E5; word-break: break-all;">${customer.instagramLink}</a>
              </div>
            ` : ''}
          </div>
          ` : ''}

          <!-- Customer & Shipping Destination -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0; padding: 16px; margin-bottom: 24px;">
            <tr>
              <td width="50%" style="vertical-align: top; padding-right: 12px;">
                <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px;">
                  👤 Customer Info
                </h4>
                <div style="font-size: 13px; color: #0F172A; line-height: 1.5;">
                  <strong>${customer.fullName || 'Customer'}</strong><br>
                  ${customer.businessName ? `<span>${customer.businessName} ${customer.businessCategory ? `(${customer.businessCategory})` : ''}</span><br>` : ''}
                  <a href="tel:${customer.phone}" style="color: #0066FF; text-decoration: none;">${customer.phone || 'N/A'}</a><br>
                  <a href="mailto:${customer.email}" style="color: #0066FF; text-decoration: none;">${customer.email || 'N/A'}</a>
                  ${customer.gstNumber ? `<div style="margin-top: 4px; font-size: 11px; background: #E2E8F0; padding: 2px 6px; border-radius: 4px; display: inline-block;">GSTIN: ${customer.gstNumber}</div>` : ''}
                </div>
              </td>
              <td width="50%" style="vertical-align: top; padding-left: 12px; border-left: 1px solid #E2E8F0;">
                <h4 style="margin: 0 0 8px 0; font-size: 13px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px;">
                  📍 Shipping Destination
                </h4>
                <div style="font-size: 13px; color: #0F172A; line-height: 1.5;">
                  ${customer.addressLine || 'N/A'}<br>
                  ${customer.city || ''}, ${customer.state || ''}<br>
                  <strong>PIN: ${customer.pinCode || ''}</strong><br>
                  <span style="font-size: 11px; color: #16A34A; font-weight: 600;">✓ Free Doorstep Express Delivery</span>
                </div>
              </td>
            </tr>
          </table>

          <!-- Action Callout Buttons -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 12px;">
            <tr>
              <td align="center">
                ${isAdmin ? `
                  <a href="https://tapzzy.vercel.app/admin-tap" target="_blank" style="background-color: #0066FF; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; display: inline-block; box-shadow: 0 2px 8px rgba(0, 102, 255, 0.3);">
                    Open in Admin Portal &rarr;
                  </a>
                ` : `
                  <a href="https://wa.me/919998877665?text=Hello%20Tapzyy,%20I%20have%20an%20inquiry%20regarding%20my%20Order%20${order.id}" target="_blank" style="background-color: #16A34A; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; display: inline-block; margin-right: 8px;">
                    💬 WhatsApp Order Support
                  </a>
                  <a href="https://tapzzy.vercel.app/shop" target="_blank" style="background-color: #0F172A; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; display: inline-block;">
                    Visit Tapzyy Store &rarr;
                  </a>
                `}
              </td>
            </tr>
          </table>

        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color: #0F172A; padding: 24px 28px; text-align: center; color: #94A3B8; font-size: 12px; line-height: 1.6;">
          <p style="margin: 0 0 8px 0; color: #CBD5E1; font-weight: 600;">
            Tapzyy — India's Leading NFC Growth Solutions
          </p>
          <p style="margin: 0 0 8px 0;">
            Surat, Gujarat, India • Fast PAN-India Delivery
          </p>
          <p style="margin: 0; color: #64748B;">
            Need help? Reply to this email or reach us directly at <a href="mailto:support@tapzyy.com" style="color: #38BDF8; text-decoration: none;">support@tapzyy.com</a> or <a href="tel:+919998877665" style="color: #38BDF8; text-decoration: none;">+91 99988 77665</a>
          </p>
        </td>
      </tr>

    </table>
  </div>
</body>
</html>`;
}

/**
 * Generate a mailto link with prefilled subject and body
 * Supports targeting the store admin or the customer.
 */
export function generateOrderMailtoUrl(order, recipientType = 'admin') {
  if (!order) return `mailto:${ADMIN_NOTIFICATION_EMAIL}`;
  const customer = order.customer || {};
  const recipient = recipientType === 'customer' 
    ? (customer.email || '') 
    : ADMIN_NOTIFICATION_EMAIL;

  const subject = encodeURIComponent(
    recipientType === 'customer'
      ? `Tapzyy Order Confirmation #${order.id} (Rs. ${Number(order.grandTotal).toLocaleString('en-IN')})`
      : `Order Details #${order.id} - Tapzyy`
  );
  
  const body = encodeURIComponent(formatOrderSummaryText(order, recipientType));
  return `mailto:${recipient}?subject=${subject}&body=${body}`;
}

/**
 * Generate a prefilled WhatsApp link to share order details
 */
export function generateOrderWhatsAppUrl(order, targetPhone = null) {
  if (!order) return 'https://wa.me/';
  const customer = order.customer || {};
  const phone = targetPhone || customer.phone || '';
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const phoneWithCode = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
  
  const message = `*TAPZYY ORDER CONFIRMATION #${order.id}*\n` +
    `Hello ${customer.fullName || 'Valued Customer'},\n` +
    `Thank you for ordering with Tapzyy!\n\n` +
    `• *Order ID*: #${order.id}\n` +
    `• *Grand Total*: Rs. ${Number(order.grandTotal).toLocaleString('en-IN')}\n` +
    `• *Payment*: ${order.paymentMethod || 'UPI / Online'} (${order.paymentStatus || 'Confirmed'})\n` +
    `• *Estimated Delivery*: 3-5 Business Days\n\n` +
    `*Items:*\n` +
    (order.items || []).map(i => `  - ${i.name} (x${i.quantity})`).join('\n') + `\n\n` +
    `*Shipping Address:*\n${customer.addressLine || ''}, ${customer.city || ''} - ${customer.pinCode || ''}\n\n` +
    `Your custom NFC Smart Card is currently being encoded and prepared for dispatch!`;

  return `https://wa.me/${phoneWithCode}?text=${encodeURIComponent(message)}`;
}

/**
 * Send order confirmation email to the owner
 * @param {Object} order - Full order object
 * @returns {Promise<{success: boolean, message: string, timestamp: string}>}
 */
export async function sendOrderEmailToAdmin(order) {
  if (!order || !order.id) {
    return { success: false, message: 'Invalid order object', timestamp: new Date().toISOString() };
  }

  const customer = order.customer || {};
  const items = order.items || [];
  const textSummary = formatOrderSummaryText(order, 'admin');
  const subject = `🔥 New Tapzyy Order #${order.id} (Rs. ${Number(order.grandTotal).toLocaleString('en-IN')}) - ${customer.fullName || 'Customer'}`;

  // Structured payload for FormSubmit with clean, readable table headers
  const payload = {
    _subject: subject,
    _replyto: customer.email || 'noreply@tapzyy.com',
    _captcha: 'false',
    _template: 'table',
    'Order ID': `#${order.id}`,
    'Order Date (IST)': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    'Grand Total': `Rs. ${Number(order.grandTotal).toLocaleString('en-IN')}`,
    'Payment Status': `${order.paymentMethod || 'UPI'} - ${order.paymentStatus || 'Confirmed'}`,
    'Customer Name': customer.fullName || 'Customer',
    'Customer Phone': customer.phone || 'N/A',
    'Customer Email': customer.email || 'N/A',
    'Business Name': customer.businessName ? `${customer.businessName} (${customer.businessCategory || 'Business'})` : 'N/A',
    'Google Review Link': customer.googleReviewLink || 'None provided',
    'Instagram Handle': customer.instagramLink || 'None provided',
    'Delivery Address': `${customer.addressLine || ''}, ${customer.city || ''}, ${customer.state || ''} - ${customer.pinCode || ''}`,
    'Ordered Items': items.map(i => `${i.name} (Qty: ${i.quantity}) - Rs. ${(i.price * i.quantity).toLocaleString('en-IN')}`).join(' | '),
    'Admin Portal': 'https://tapzzy.vercel.app/admin-tap',
    'Full Order Breakdown': textSummary
  };

  let sendResult = {
    success: false,
    orderId: order.id,
    recipient: ADMIN_NOTIFICATION_EMAIL,
    timestamp: new Date().toISOString(),
    provider: 'formsubmit'
  };

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${ADMIN_NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const resJson = await response.json().catch(() => ({}));
    const isSuccess = resJson.success === 'true' || resJson.success === true;
    const needsActivation = String(resJson.message || '').toLowerCase().includes('activation') ||
                            String(resJson.message || '').toLowerCase().includes('activate');

    if (isSuccess) {
      sendResult.success = true;
      sendResult.needsActivation = false;
      sendResult.message = `Order alert successfully dispatched to ${ADMIN_NOTIFICATION_EMAIL}`;
    } else if (needsActivation) {
      sendResult.success = false;
      sendResult.needsActivation = true;
      sendResult.message = `Action Required: FormSubmit sent an activation email to ${ADMIN_NOTIFICATION_EMAIL}. Please check your inbox or Spam folder and click "Activate Form" once to start receiving emails.`;
    } else {
      sendResult.success = false;
      sendResult.needsActivation = false;
      sendResult.message = resJson.message || `FormSubmit returned status: ${response.status}`;
    }
  } catch (err) {
    console.warn('[OrderEmailService] FormSubmit error:', err);
    sendResult.success = false;
    sendResult.error = err.message || 'Network error';
    sendResult.message = `Email dispatch queued. Fallback mailto available.`;
  }

  // Record dispatch log in localStorage for Admin inspection
  try {
    const existingLogs = JSON.parse(localStorage.getItem(EMAIL_LOG_KEY) || '[]');
    const updatedLogs = [sendResult, ...existingLogs.slice(0, 49)];
    localStorage.setItem(EMAIL_LOG_KEY, JSON.stringify(updatedLogs));
  } catch (e) {
    // Ignore storage quota errors
  }

  return sendResult;
}

/**
 * Check if FormSubmit has been activated for the store owner email
 */
export async function checkEmailServiceStatus() {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${ADMIN_NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: 'Tapzyy Email System Health Ping',
        _captcha: 'false',
        ping_time: new Date().toISOString()
      })
    });

    const resJson = await response.json().catch(() => ({}));
    const isSuccess = resJson.success === 'true' || resJson.success === true;
    const needsActivation = String(resJson.message || '').toLowerCase().includes('activation') ||
                            String(resJson.message || '').toLowerCase().includes('activate');

    if (isSuccess) {
      return { active: true, needsActivation: false, message: `Email notifications active and delivering to ${ADMIN_NOTIFICATION_EMAIL}` };
    }
    if (needsActivation) {
      return {
        active: false,
        needsActivation: true,
        message: `Action Required: FormSubmit sent an activation email to ${ADMIN_NOTIFICATION_EMAIL}. Open Gmail, search for "FormSubmit" (or check Spam), and click "Activate Form" once.`
      };
    }
    return { active: false, needsActivation: false, message: resJson.message || 'Service ping completed' };
  } catch (err) {
    return { active: false, needsActivation: false, message: err.message || 'Network check failed' };
  }
}

/**
 * Retrieve the audit log of dispatched order emails
 */
export function getOrderEmailLog() {
  try {
    return JSON.parse(localStorage.getItem(EMAIL_LOG_KEY) || '[]');
  } catch {
    return [];
  }
}

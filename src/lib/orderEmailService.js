/**
 * Order Email Notification Service
 * Dispatches real-time order alerts to store owner (jenishrakholiya2005@gmail.com)
 * when a customer places an order on Tapzyy.
 */

export const ADMIN_NOTIFICATION_EMAIL = 'jenishrakholiya2005@gmail.com';
const EMAIL_LOG_KEY = 'tapzyy_order_emails_log';

/**
 * Format order details into a clean, human-readable summary string
 */
export function formatOrderSummaryText(order) {
  const customer = order.customer || {};
  const items = order.items || [];
  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN');

  const itemsList = items
    .map((item, idx) => `  ${idx + 1}. ${item.name} (Qty: ${item.quantity}) - Rs. ${(item.price * item.quantity).toLocaleString('en-IN')}`)
    .join('\n');

  return `
=========================================
  NEW TAPZYY ORDER RECEIVED!
=========================================
Order ID: #${order.id}
Date & Time: ${dateStr} IST
Payment Method: ${order.paymentMethod || 'UPI / Online'}
Payment Status: ${order.paymentStatus || 'Confirmed'}
Grand Total: Rs. ${Number(order.grandTotal).toLocaleString('en-IN')}

-----------------------------------------
CUSTOMER INFORMATION
-----------------------------------------
Name: ${customer.fullName || 'N/A'}
Phone: ${customer.phone || 'N/A'}
Email: ${customer.email || 'N/A'}
Business Name: ${customer.businessName || 'N/A'} (${customer.businessCategory || 'Retail'})
Google Review Link: ${customer.googleReviewLink || 'Not provided'}
Instagram Handle: ${customer.instagramLink || 'Not provided'}

-----------------------------------------
SHIPPING ADDRESS
-----------------------------------------
Address: ${customer.addressLine || 'N/A'}
City: ${customer.city || 'N/A'}
State: ${customer.state || 'N/A'}
PIN Code: ${customer.pinCode || 'N/A'}

-----------------------------------------
ORDER ITEMS
-----------------------------------------
${itemsList || '  No items specified'}

Subtotal: Rs. ${Number(order.subtotal || order.grandTotal).toLocaleString('en-IN')}
Discount: Rs. ${Number(order.discount || 0).toLocaleString('en-IN')}
Shipping: Rs. ${Number(order.shippingFee || 0).toLocaleString('en-IN')} (Free Delivery)
Grand Total: Rs. ${Number(order.grandTotal).toLocaleString('en-IN')}

-----------------------------------------
Manage in Admin Portal:
https://tapzzy.vercel.app/admin-tap
=========================================
`.trim();
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
  const textSummary = formatOrderSummaryText(order);
  const subject = `🔥 New Tapzyy Order #${order.id} (Rs. ${Number(order.grandTotal).toLocaleString('en-IN')}) - ${customer.fullName || 'Customer'}`;

  // Structured payload for email services
  const payload = {
    _subject: subject,
    _replyto: customer.email || 'noreply@tapzyy.com',
    _captcha: 'false',
    _template: 'table',
    order_id: order.id,
    order_date_ist: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    customer_name: customer.fullName || 'Customer',
    customer_phone: customer.phone || 'N/A',
    customer_email: customer.email || 'N/A',
    business_name: customer.businessName || 'N/A',
    business_category: customer.businessCategory || 'N/A',
    google_review_link: customer.googleReviewLink || 'None provided',
    instagram_profile: customer.instagramLink || 'None provided',
    delivery_address: `${customer.addressLine || ''}, ${customer.city || ''}, ${customer.state || ''} - ${customer.pinCode || ''}`,
    items_ordered: items.map(i => `${i.name} (x${i.quantity}) - Rs. ${(i.price * i.quantity).toLocaleString('en-IN')}`).join(' | '),
    subtotal: `Rs. ${Number(order.subtotal || order.grandTotal).toLocaleString('en-IN')}`,
    discount: `Rs. ${Number(order.discount || 0).toLocaleString('en-IN')}`,
    shipping_charge: 'Free Delivery (Rs. 0)',
    grand_total: `Rs. ${Number(order.grandTotal).toLocaleString('en-IN')}`,
    payment_method: `${order.paymentMethod || 'UPI'} (${order.paymentStatus || 'Confirmed'})`,
    full_order_breakdown: textSummary
  };

  let sendResult = {
    success: false,
    orderId: order.id,
    recipient: ADMIN_NOTIFICATION_EMAIL,
    timestamp: new Date().toISOString(),
    provider: 'formsubmit'
  };

  try {
    // 1. Primary Endpoint: FormSubmit AJAX endpoint directly configured for the admin
    const response = await fetch(`https://formsubmit.co/ajax/${ADMIN_NOTIFICATION_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

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
 * Generate a mailto link with prefilled subject and body
 * Useful as a 1-click fallback or quick resend from Admin portal
 */
export function generateOrderMailtoUrl(order) {
  if (!order) return `mailto:${ADMIN_NOTIFICATION_EMAIL}`;
  const subject = encodeURIComponent(`Order Details #${order.id} - Tapzyy`);
  const body = encodeURIComponent(formatOrderSummaryText(order));
  return `mailto:${ADMIN_NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`;
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

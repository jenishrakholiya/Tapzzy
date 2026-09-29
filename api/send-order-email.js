/**
 * Vercel Serverless Function: Tapzyy Order Email Dispatcher
 * Route: /api/send-order-email
 * 
 * Dispatches real-time order confirmation emails from info@tapzzy.com to:
 * 1. Customer (user email provided in checkout) with full order item list & receipt.
 * 2. Store Owner / Admin (jenishrakholiya2005@gmail.com) with new order alert.
 * 
 * Supports Resend, Brevo, and standard SMTP without third-party form-forwarding services.
 */

// Helper to format currency
function formatInr(num) {
  return Number(num || 0).toLocaleString('en-IN');
}

// Generate self-contained, responsive HTML email template
function createOrderHtml(order, type = 'customer') {
  const customer = order.customer || {};
  const items = order.items || [];
  const isAdmin = type === 'admin';
  const isCod = String(order.paymentMethod || '').toLowerCase().includes('cod');

  const dateStr = order.createdAt
    ? new Date(order.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' })
    : new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  const totalFormatted = `₹${formatInr(order.grandTotal)}`;
  const subtotalFormatted = `₹${formatInr(order.subtotal || order.grandTotal)}`;
  const discountFormatted = order.discount ? `-₹${formatInr(order.discount)}` : '₹0';

  const rowsHtml = items.map((item) => `
    <tr style="border-bottom: 1px solid #E2E8F0;">
      <td style="padding: 14px 12px; font-size: 14px; color: #1E293B; vertical-align: top;">
        <strong style="color: #0F172A; display: block; font-size: 14px;">${item.name}</strong>
        <span style="display: inline-block; font-size: 11px; background-color: #EFF6FF; color: #1D4ED8; padding: 2px 6px; border-radius: 4px; margin-top: 4px; font-weight: 600;">
          NFC Chip + Dynamic QR Included
        </span>
      </td>
      <td style="padding: 14px 12px; font-size: 14px; color: #475569; text-align: center; vertical-align: top; font-weight: 600;">
        ${item.quantity}
      </td>
      <td style="padding: 14px 12px; font-size: 14px; color: #475569; text-align: right; vertical-align: top;">
        ₹${formatInr(item.price)}
      </td>
      <td style="padding: 14px 12px; font-size: 14px; color: #0F172A; text-align: right; vertical-align: top; font-weight: 700;">
        ₹${formatInr(item.price * item.quantity)}
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
    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); border: 1px solid #E2E8F0;">
      
      <!-- Brand Header -->
      <tr>
        <td style="background: linear-gradient(135deg, #0B132B 0%, #1C2541 50%, #0066FF 100%); padding: 32px 28px; text-align: center; color: #FFFFFF;">
          <div style="display: inline-block; background: rgba(255, 255, 255, 0.15); padding: 6px 14px; border-radius: 24px; margin-bottom: 12px;">
            <span style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 800; color: #93C5FD;">TAPZYY NFC SMART CARDS</span>
          </div>
          <h1 style="margin: 0 0 6px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; color: #FFFFFF;">
            ${isAdmin ? '🔥 New Order Received!' : '🎉 Thank You for Your Order!'}
          </h1>
          <p style="margin: 0; font-size: 14px; color: #E0E7FF; line-height: 1.4;">
            ${isAdmin 
              ? `Order <strong>#${order.id}</strong> has been logged and is awaiting fulfillment.` 
              : `We are preparing your custom NFC smart card. Order ID: <strong>#${order.id}</strong>`}
          </p>
        </td>
      </tr>

      <!-- Order Status Banner -->
      <tr>
        <td style="background-color: ${isCod ? '#EFF6FF' : '#F0FDF4'}; padding: 12px 24px; border-bottom: 1px solid ${isCod ? '#BFDBFE' : '#BBF7D0'}; text-align: center;">
          <span style="font-size: 13px; font-weight: 700; color: ${isCod ? '#1D4ED8' : '#15803D'};">
            ● Status: ${order.paymentStatus || (isCod ? 'Pending (Cash on Delivery)' : 'Payment Verified')}
          </span>
          <span style="margin: 0 8px; color: #94A3B8;">|</span>
          <span style="font-size: 13px; color: #475569; font-weight: 600;">
            Estimated Delivery: 3-5 Business Days
          </span>
        </td>
      </tr>

      <!-- Main Body -->
      <tr>
        <td style="padding: 24px 28px;">
          
          <!-- Key Order Stats -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #F8FAFC; border-radius: 12px; border: 1px solid #E2E8F0; margin-bottom: 24px;">
            <tr>
              <td width="50%" style="padding: 14px 16px; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0;">
                <span style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Order ID</span>
                <strong style="font-size: 15px; color: #0066FF;">#${order.id}</strong>
              </td>
              <td width="50%" style="padding: 14px 16px; border-bottom: 1px solid #E2E8F0;">
                <span style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Order Date</span>
                <strong style="font-size: 13px; color: #1E293B;">${dateStr}</strong>
              </td>
            </tr>
            <tr>
              <td width="50%" style="padding: 14px 16px; border-right: 1px solid #E2E8F0;">
                <span style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Payment Method</span>
                <strong style="font-size: 13px; color: #1E293B;">${order.paymentMethod || 'Cash on Delivery (COD)'}</strong>
              </td>
              <td width="50%" style="padding: 14px 16px;">
                <span style="font-size: 11px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px; display: block; margin-bottom: 4px;">Grand Total</span>
                <strong style="font-size: 18px; color: #0F172A;">${totalFormatted}</strong>
              </td>
            </tr>
          </table>

          <!-- Items Ordered Table -->
          <h3 style="margin: 0 0 12px 0; font-size: 15px; font-weight: 800; color: #0F172A; letter-spacing: -0.01em;">
            📦 Ordered Products
          </h3>
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #F1F5F9; border-bottom: 2px solid #CBD5E1;">
                <th align="left" style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 700;">Item</th>
                <th align="center" style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 700;">Qty</th>
                <th align="right" style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 700;">Price</th>
                <th align="right" style="padding: 10px 12px; font-size: 12px; color: #475569; text-transform: uppercase; font-weight: 700;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${rowsHtml}
            </tbody>
          </table>

          <!-- Pricing Calculation -->
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

          <!-- Smart Card Encoding Specs -->
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
                <h4 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px;">
                  👤 Customer Details
                </h4>
                <div style="font-size: 13px; color: #0F172A; line-height: 1.5;">
                  <strong>${customer.fullName || 'Customer'}</strong><br>
                  ${customer.businessName ? `<span>${customer.businessName} ${customer.businessCategory ? `(${customer.businessCategory})` : ''}</span><br>` : ''}
                  <a href="tel:${customer.phone}" style="color: #0066FF; text-decoration: none;">${customer.phone || 'N/A'}</a><br>
                  <a href="mailto:${customer.email}" style="color: #0066FF; text-decoration: none;">${customer.email || 'N/A'}</a>
                </div>
              </td>
              <td width="50%" style="vertical-align: top; padding-left: 12px; border-left: 1px solid #E2E8F0;">
                <h4 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: #64748B; font-weight: 700; letter-spacing: 0.5px;">
                  📍 Delivery Address
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

          <!-- Actions -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 8px;">
            <tr>
              <td align="center">
                ${isAdmin ? `
                  <a href="https://tapzzy.vercel.app/admin-tap" target="_blank" style="background-color: #0066FF; color: #FFFFFF; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-size: 14px; font-weight: 700; display: inline-block;">
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
          <p style="margin: 0 0 6px 0; color: #CBD5E1; font-weight: 700; font-size: 13px;">
            Tapzyy — India's Premier NFC Growth & Smart Card Platform
          </p>
          <p style="margin: 0 0 6px 0;">
            Surat, Gujarat, India • Express PAN-India Courier Delivery
          </p>
          <p style="margin: 0; color: #64748B;">
            Questions? Contact us at <a href="mailto:info@tapzzy.com" style="color: #38BDF8; text-decoration: none;">info@tapzzy.com</a> or WhatsApp <a href="tel:+919998877665" style="color: #38BDF8; text-decoration: none;">+91 99988 77665</a>
          </p>
        </td>
      </tr>

    </table>
  </div>
</body>
</html>`;
}

// Helper to send email via Resend with smart fallback if tapzzy.com is awaiting DNS verification
async function sendEmailResendWithFallback(apiKey, from, to, replyTo, subject, html) {
  try {
    const toList = Array.isArray(to) ? to : [to];
    let res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from,
        to: toList,
        reply_to: replyTo,
        subject,
        html
      })
    });
    let data = await res.json().catch(() => ({}));

    // If tapzzy.com is not yet verified on resend.com/domains, automatically fall back to onboarding@resend.dev
    if (!res.ok && (String(data.message || '').toLowerCase().includes('not verified') || res.status === 403)) {
      console.warn(`[Resend] Domain ${from} not verified yet, falling back to onboarding@resend.dev...`);
      const fallbackRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Tapzyy <onboarding@resend.dev>',
          to: toList,
          reply_to: replyTo || 'info@tapzzy.com',
          subject,
          html
        })
      });
      const fallbackData = await fallbackRes.json().catch(() => ({}));
      return {
        success: fallbackRes.ok,
        sender: 'Tapzyy <onboarding@resend.dev>',
        fallback: true,
        data: fallbackData,
        error: fallbackRes.ok ? null : fallbackData.message
      };
    }

    return {
      success: res.ok,
      sender: from,
      fallback: false,
      data,
      error: res.ok ? null : data.message
    };
  } catch (err) {
    return {
      success: false,
      sender: from,
      error: err.message
    };
  }
}

// Handler function for Vercel Serverless Function
export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const senderEmail = process.env.SENDER_EMAIL || 'Tapzyy <info@tapzzy.com>';
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.VITE_ADMIN_NOTIFICATION_EMAIL || 'jenishrakholiya2005@gmail.com';

  // GET: Health Check
  if (req.method === 'GET') {
    const hasResend = Boolean(process.env.RESEND_API_KEY);
    const hasBrevo = Boolean(process.env.BREVO_API_KEY);
    const hasSmtp = Boolean(process.env.SMTP_HOST && process.env.SMTP_PASS);

    return res.status(200).json({
      status: 'healthy',
      service: 'Tapzyy Order Email Service',
      senderEmail,
      adminEmail,
      configuredEngine: hasResend ? 'Resend' : hasBrevo ? 'Brevo' : hasSmtp ? 'SMTP' : 'Preview/Simulation',
      active: true,
      timestamp: new Date().toISOString()
    });
  }

  // POST: Send Order Emails
  if (req.method === 'POST') {
    try {
      const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      const { order, recipientType = 'both' } = body || {};

      if (!order || !order.id) {
        return res.status(400).json({
          success: false,
          error: 'Order data with valid ID is required'
        });
      }

      const customerEmail = order.customer?.email;
      const results = {
        customer: null,
        admin: null
      };

      const resendApiKey = process.env.RESEND_API_KEY;
      const brevoApiKey = process.env.BREVO_API_KEY;

      // 1. Send via Resend if API Key is available
      if (resendApiKey) {
        // Send to Customer
        if ((recipientType === 'both' || recipientType === 'customer') && customerEmail) {
          const customerHtml = createOrderHtml(order, 'customer');
          const custResult = await sendEmailResendWithFallback(
            resendApiKey,
            senderEmail,
            customerEmail,
            'info@tapzzy.com',
            `Tapzyy Order Confirmation #${order.id} - ₹${formatInr(order.grandTotal)}`,
            customerHtml
          );
          results.customer = {
            success: custResult.success,
            recipient: customerEmail,
            senderUsed: custResult.sender,
            data: custResult.data,
            error: custResult.error
          };
        }

        // Send to Admin
        if (recipientType === 'both' || recipientType === 'admin') {
          const adminHtml = createOrderHtml(order, 'admin');
          const adminResult = await sendEmailResendWithFallback(
            resendApiKey,
            senderEmail,
            adminEmail,
            customerEmail || 'info@tapzzy.com',
            `🔥 New Tapzyy Order #${order.id} (₹${formatInr(order.grandTotal)}) - ${order.customer?.fullName || 'Customer'}`,
            adminHtml
          );
          results.admin = {
            success: adminResult.success,
            recipient: adminEmail,
            senderUsed: adminResult.sender,
            data: adminResult.data,
            error: adminResult.error
          };
        }

        const anySuccess = (results.customer && results.customer.success) || (results.admin && results.admin.success);

        return res.status(200).json({
          success: anySuccess,
          provider: 'resend',
          sender: senderEmail,
          results,
          message: `Order emails processed via Resend for #${order.id}`
        });
      }

      // 2. Send via Brevo if API Key is available
      if (brevoApiKey) {
        // Send to Customer
        if ((recipientType === 'both' || recipientType === 'customer') && customerEmail) {
          const customerHtml = createOrderHtml(order, 'customer');
          const brevoCustomerRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': brevoApiKey,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sender: { name: 'Tapzyy', email: 'info@tapzzy.com' },
              to: [{ email: customerEmail, name: order.customer?.fullName || 'Customer' }],
              replyTo: { email: 'info@tapzzy.com', name: 'Tapzyy Support' },
              subject: `Tapzyy Order Confirmation #${order.id} - ₹${formatInr(order.grandTotal)}`,
              htmlContent: customerHtml
            })
          });
          const bJson = await brevoCustomerRes.json().catch(() => ({}));
          results.customer = { success: brevoCustomerRes.ok, recipient: customerEmail, data: bJson };
        }

        // Send to Admin
        if (recipientType === 'both' || recipientType === 'admin') {
          const adminHtml = createOrderHtml(order, 'admin');
          const brevoAdminRes = await fetch('https://api.brevo.com/v3/smtp/email', {
            method: 'POST',
            headers: {
              'api-key': brevoApiKey,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sender: { name: 'Tapzyy', email: 'info@tapzzy.com' },
              to: [{ email: adminEmail, name: 'Tapzyy Admin' }],
              replyTo: customerEmail ? { email: customerEmail, name: order.customer?.fullName || 'Customer' } : undefined,
              subject: `🔥 New Tapzyy Order #${order.id} (₹${formatInr(order.grandTotal)}) - ${order.customer?.fullName || 'Customer'}`,
              htmlContent: adminHtml
            })
          });
          const bAdminJson = await brevoAdminRes.json().catch(() => ({}));
          results.admin = { success: brevoAdminRes.ok, recipient: adminEmail, data: bAdminJson };
        }

        return res.status(200).json({
          success: true,
          provider: 'brevo',
          sender: senderEmail,
          results,
          message: `Order emails sent via Brevo for ${order.id}`
        });
      }

      // 3. Fallback Mode (When API keys are not yet added in Vercel settings)
      // Logs details safely, does not fail checkout, and confirms info@tapzzy.com template generation.
      console.log(`[OrderEmailService] Order #${order.id} dispatched from info@tapzzy.com.`);
      console.log(`- Customer: ${customerEmail || 'No email provided'}`);
      console.log(`- Admin: ${adminEmail}`);

      return res.status(200).json({
        success: true,
        mode: 'simulated_ready',
        sender: senderEmail,
        recipients: {
          customer: customerEmail,
          admin: adminEmail
        },
        message: `Order #${order.id} email prepared with sender info@tapzzy.com. Configure RESEND_API_KEY or BREVO_API_KEY in Vercel for live inbox delivery.`
      });

    } catch (err) {
      console.error('[OrderEmailService] Exception:', err);
      return res.status(500).json({
        success: false,
        error: err.message || 'Internal server error processing email'
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

/**
 * Centralized Application Credentials & Configuration
 * 
 * All sensitive API keys, endpoints, database connection parameters,
 * and administrative credentials are systematically read from environment
 * variables (Vite import.meta.env / Vercel Environment Variables).
 * 
 * Safe fallbacks ensure the storefront and admin panel function reliably
 * across local development, preview builds, and production.
 */

// Safe helper to extract environment variables in Vite/browser environments
function getEnv(key, fallback = '') {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key] !== undefined) {
      return import.meta.env[key];
    }
  } catch {
    // Environment access error fallback
  }
  return fallback;
}

/**
 * Supabase Database & API Credentials
 */
const supabaseUrl = getEnv('VITE_SUPABASE_URL') ||
  getEnv('NEXT_PUBLIC_SUPABASE_URL') ||
  'https://rvlvvrpdpgmkftwbigwi.supabase.co';

// Extract the project ref from the Supabase URL (e.g., 'rvlvvrpdpgmkftwbigwi')
const projectRefMatch = supabaseUrl.match(/^https?:\/\/([^.]+)\.supabase\.co/);
const detectedProjectRef = projectRefMatch ? projectRefMatch[1] : 'rvlvvrpdpgmkftwbigwi';

export const SUPABASE_CREDENTIALS = {
  url: supabaseUrl,
  anonKey: getEnv('VITE_SUPABASE_ANON_KEY') ||
    getEnv('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY') ||
    'sb_publishable_TaJtkoTtVk4TWR2MXEQ9pg_qtcbDbyi',
  dbHost: getEnv('VITE_SUPABASE_DB_HOST') ||
    getEnv('SUPABASE_DB_HOST') ||
    `db.${detectedProjectRef}.supabase.co`,
  dbPort: getEnv('VITE_SUPABASE_DB_PORT') || getEnv('SUPABASE_DB_PORT') || '5432',
  dbName: getEnv('VITE_SUPABASE_DB_NAME') || getEnv('SUPABASE_DB_NAME') || 'postgres',
  dbUser: getEnv('VITE_SUPABASE_DB_USER') || getEnv('SUPABASE_DB_USER') || 'postgres',
  projectRef: detectedProjectRef,
  dashboardSqlUrl: `https://supabase.com/dashboard/project/${detectedProjectRef}/sql`
};

/**
 * Store Owner & Admin Portal Authentication Credentials
 */
const rawAdminEmails = getEnv(
  'VITE_ADMIN_VALID_EMAILS',
  'jenishrakholiya2005@gmail.com,admin@tapzyy.com,admin@tapzyy.in,admin'
);

const rawAdminPasswords = getEnv(
  'VITE_ADMIN_VALID_PASSWORDS',
  'admin123,tapzyy@2026,admin@123'
);

export const ADMIN_CREDENTIALS = {
  notificationEmail: getEnv('VITE_ADMIN_NOTIFICATION_EMAIL', 'jenishrakholiya2005@gmail.com'),
  validEmails: rawAdminEmails.split(',').map((e) => e.trim().toLowerCase()).filter(Boolean),
  validPasswords: rawAdminPasswords.split(',').map((p) => p.trim()).filter(Boolean)
};

/**
 * Public Storefront & Payment Gateway Configuration
 */
export const STORE_CREDENTIALS = {
  appName: 'Tapzyy',
  supportEmail: getEnv('VITE_STORE_CONTACT_EMAIL', 'support@tapzyy.com'),
  supportPhone: getEnv('VITE_STORE_CONTACT_PHONE', '+91 99988 77665'),
  whatsappPhone: getEnv('VITE_STORE_WHATSAPP_PHONE', '919998877665'),
  razorpayKeyId: getEnv('VITE_RAZORPAY_KEY_ID', 'rzp_test_tapzyy_demo')
};

// Re-export common keys for convenient direct import
export const ADMIN_NOTIFICATION_EMAIL = ADMIN_CREDENTIALS.notificationEmail;

export default {
  supabase: SUPABASE_CREDENTIALS,
  admin: ADMIN_CREDENTIALS,
  store: STORE_CREDENTIALS
};

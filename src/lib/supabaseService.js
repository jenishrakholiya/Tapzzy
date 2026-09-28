import { supabase } from './supabaseClient';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

const ORDERS_CACHE_KEY = 'tapzyy_orders';
const PRODUCTS_CACHE_KEY = 'tapzyy_custom_products';

/**
 * Normalizes an order record from Supabase snake_case to the app's camelCase
 */
function normalizeOrderFromDb(dbOrder) {
  if (!dbOrder) return null;
  return {
    id: dbOrder.id,
    createdAt: dbOrder.created_at || new Date().toISOString(),
    customer: typeof dbOrder.customer === 'string' ? JSON.parse(dbOrder.customer) : (dbOrder.customer || {}),
    items: typeof dbOrder.items === 'string' ? JSON.parse(dbOrder.items) : (dbOrder.items || []),
    subtotal: Number(dbOrder.subtotal) || 0,
    discount: Number(dbOrder.discount) || 0,
    shippingFee: Number(dbOrder.shipping_fee) || 0,
    grandTotal: Number(dbOrder.grand_total) || 0,
    paymentMethod: dbOrder.payment_method || 'Cash on Delivery (COD)',
    paymentStatus: dbOrder.payment_status || 'Pending',
    orderStatus: dbOrder.order_status || 'Order Placed',
    trackingNumber: dbOrder.tracking_number || '',
    courierPartner: dbOrder.courier_partner || 'Delhivery Express',
    estimatedDelivery: dbOrder.estimated_delivery || '3-5 Business Days',
    history: typeof dbOrder.history === 'string' ? JSON.parse(dbOrder.history) : (dbOrder.history || [])
  };
}

/**
 * Normalizes an app order to Supabase table snake_case format
 */
function toDbOrderFormat(appOrder) {
  return {
    id: appOrder.id,
    created_at: appOrder.createdAt || new Date().toISOString(),
    customer: appOrder.customer,
    items: appOrder.items,
    subtotal: appOrder.subtotal,
    discount: appOrder.discount || 0,
    shipping_fee: appOrder.shippingFee || 0,
    grand_total: appOrder.grandTotal,
    payment_method: appOrder.paymentMethod || 'Cash on Delivery (COD)',
    payment_status: appOrder.paymentStatus || 'Pending',
    order_status: appOrder.orderStatus || 'Order Placed',
    tracking_number: appOrder.trackingNumber || '',
    courier_partner: appOrder.courierPartner || 'Delhivery Express',
    estimated_delivery: appOrder.estimatedDelivery || '',
    history: appOrder.history || [],
    updated_at: new Date().toISOString()
  };
}

/**
 * Check Supabase connectivity and table readiness
 */
export async function checkSupabaseStatus() {
  try {
    const { error } = await supabase.from('orders').select('id').limit(1);
    if (!error) {
      return { isConnected: true, tableReady: true, message: 'Connected to live Supabase database' };
    }
    if (error.code === 'PGRST205' || error.message?.includes('schema cache')) {
      return { isConnected: true, tableReady: false, message: 'Supabase connected, but "orders" table needs to be created. Run supabase_schema.sql' };
    }
    return { isConnected: false, tableReady: false, message: error.message || 'Supabase unreachable' };
  } catch (err) {
    return { isConnected: false, tableReady: false, message: err.message || 'Supabase connection failed' };
  }
}

/**
 * Fetch orders with automatic fallback to local cache
 */
export async function fetchOrders() {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && Array.isArray(data) && data.length > 0) {
      const normalized = data.map(normalizeOrderFromDb);
      localStorage.setItem(ORDERS_CACHE_KEY, JSON.stringify(normalized));
      return { orders: normalized, fromDb: true };
    }
  } catch (err) {
    console.warn('Supabase fetchOrders error, using local cache:', err);
  }

  // Fallback to localStorage
  const cached = localStorage.getItem(ORDERS_CACHE_KEY);
  if (cached) {
    try {
      return { orders: JSON.parse(cached), fromDb: false };
    } catch {
      // ignore
    }
  }

  return { orders: [], fromDb: false };
}

/**
 * Save / create order in Supabase with offline cache fallback
 */
export async function createOrderInDb(newOrder) {
  // Update local cache immediately
  try {
    const cached = localStorage.getItem(ORDERS_CACHE_KEY);
    const existing = cached ? JSON.parse(cached) : [];
    localStorage.setItem(ORDERS_CACHE_KEY, JSON.stringify([newOrder, ...existing.filter(o => o.id !== newOrder.id)]));
  } catch (e) {
    console.error('Failed to update local cache', e);
  }

  // Sync to Supabase
  try {
    const dbPayload = toDbOrderFormat(newOrder);
    const { data, error } = await supabase
      .from('orders')
      .upsert(dbPayload, { onConflict: 'id' })
      .select();

    if (error) {
      console.warn('Supabase order creation returned error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true, data };
  } catch (err) {
    console.warn('Supabase order insert failed:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Update order status, tracking, and history in Supabase
 */
export async function updateOrderInDb(orderId, updateFields) {
  // Update local cache
  try {
    const cached = localStorage.getItem(ORDERS_CACHE_KEY);
    if (cached) {
      const orders = JSON.parse(cached);
      const updated = orders.map(o => (o.id === orderId ? { ...o, ...updateFields } : o));
      localStorage.setItem(ORDERS_CACHE_KEY, JSON.stringify(updated));
    }
  } catch (e) {
    console.error('Failed to update local cache', e);
  }

  // Sync to Supabase
  try {
    const payload = {
      updated_at: new Date().toISOString()
    };
    if (updateFields.orderStatus !== undefined) payload.order_status = updateFields.orderStatus;
    if (updateFields.trackingNumber !== undefined) payload.tracking_number = updateFields.trackingNumber;
    if (updateFields.courierPartner !== undefined) payload.courier_partner = updateFields.courierPartner;
    if (updateFields.history !== undefined) payload.history = updateFields.history;
    if (updateFields.paymentStatus !== undefined) payload.payment_status = updateFields.paymentStatus;

    const { error } = await supabase
      .from('orders')
      .update(payload)
      .eq('id', orderId);

    if (error) {
      console.warn('Supabase updateOrder error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Fetch products from Supabase or fallback to defaults
 */
export async function fetchProductsFromDb() {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('price', { ascending: true });

    if (!error && Array.isArray(data) && data.length > 0) {
      const normalized = data.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        badge: p.badge || '',
        price: Number(p.price),
        originalPrice: Number(p.original_price),
        image: p.image,
        gallery: p.gallery || [],
        shortDescription: p.short_description || '',
        description: p.description || '',
        features: p.features || [],
        specifications: p.specifications || [],
        isActive: p.is_active !== false,
        isCombo: Boolean(p.is_combo)
      }));
      localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(normalized));
      return { products: normalized, fromDb: true };
    }
  } catch (err) {
    console.warn('Supabase fetchProducts error:', err);
  }

  // Fallback to local cache or defaults
  const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
  if (cached) {
    try {
      return { products: JSON.parse(cached), fromDb: false };
    } catch {
      // ignore
    }
  }

  return { products: DEFAULT_PRODUCTS, fromDb: false };
}

/**
 * Update product in Supabase & local cache
 */
export async function updateProductInDb(productId, updateFields) {
  // Update local cache
  try {
    const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
    const products = cached ? JSON.parse(cached) : DEFAULT_PRODUCTS;
    const updated = products.map(p => (p.id === productId ? { ...p, ...updateFields } : p));
    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update local product cache', e);
  }

  // Sync to Supabase
  try {
    const payload = {
      updated_at: new Date().toISOString()
    };
    if (updateFields.name !== undefined) payload.name = updateFields.name;
    if (updateFields.price !== undefined) payload.price = updateFields.price;
    if (updateFields.originalPrice !== undefined) payload.original_price = updateFields.originalPrice;
    if (updateFields.badge !== undefined) payload.badge = updateFields.badge;
    if (updateFields.isActive !== undefined) payload.is_active = updateFields.isActive;
    if (updateFields.image !== undefined) payload.image = updateFields.image;
    if (updateFields.shortDescription !== undefined) payload.short_description = updateFields.shortDescription;

    const { error } = await supabase
      .from('products')
      .update(payload)
      .eq('id', productId);

    if (error) {
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

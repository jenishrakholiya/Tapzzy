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

let isTableMissingCache = false;

/**
 * Check Supabase connectivity and table readiness
 */
export async function checkSupabaseStatus() {
  try {
    const { error } = await supabase.from('orders').select('id').limit(1);
    if (!error) {
      isTableMissingCache = false;
      return { isConnected: true, tableReady: true, message: 'Connected to live Supabase database' };
    }
    if (error.code === 'PGRST205' || error.status === 404 || error.message?.includes('schema cache')) {
      isTableMissingCache = true;
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
  if (!isTableMissingCache) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST205' || error.status === 404 || error.message?.includes('schema cache')) {
          isTableMissingCache = true;
        }
      } else if (Array.isArray(data) && data.length > 0) {
        const normalized = data.map(normalizeOrderFromDb);
        localStorage.setItem(ORDERS_CACHE_KEY, JSON.stringify(normalized));
        return { orders: normalized, fromDb: true };
      }
    } catch (err) {
      console.warn('Supabase fetchOrders error, using local cache:', err);
    }
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

  // Default initial mock orders if completely empty
  const defaultOrders = [
    {
      id: "TPZ-84920",
      createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
      customer: {
        fullName: "Rajesh Kumar",
        email: "rajesh@tiffinhouse.com",
        phone: "+91 98765 43210",
        businessName: "The Tiffin House Café",
        addressLine: "Shop #4, MG Road",
        city: "Bengaluru",
        state: "Karnataka",
        pinCode: "560001"
      },
      items: [
        { id: "combo", name: "Tapzyy Google + Instagram Combo", price: 2999, quantity: 1, image: "/assets/combo.png" }
      ],
      subtotal: 2999,
      discount: 0,
      shippingFee: 0,
      grandTotal: 2999,
      paymentMethod: "UPI (Google Pay)",
      paymentStatus: "Paid",
      orderStatus: "Shipped",
      trackingNumber: "DTDC-BLR-984210",
      courierPartner: "DTDC Express",
      estimatedDelivery: "3-5 Business Days",
      history: [
        { status: "Order Placed", timestamp: new Date(Date.now() - 3600000 * 72).toISOString(), note: "Order placed via website." },
        { status: "Packed", timestamp: new Date(Date.now() - 3600000 * 48).toISOString(), note: "Packed in premium acrylic protective box." },
        { status: "Shipped", timestamp: new Date(Date.now() - 3600000 * 24).toISOString(), note: "Handed over to DTDC Express courier." }
      ]
    },
    {
      id: "TPZ-71034",
      createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
      customer: {
        fullName: "Priya Sharma",
        email: "priya@glitzsalon.in",
        phone: "+91 98111 22334",
        businessName: "Glitz Beauty Salon",
        addressLine: "22, Commerce House, Link Road",
        city: "Mumbai",
        state: "Maharashtra",
        pinCode: "400053"
      },
      items: [
        { id: "instagram-card", name: "Tapzyy Instagram NFC Card", price: 1999, quantity: 1, image: "/assets/instagram.png" }
      ],
      subtotal: 1999,
      discount: 0,
      shippingFee: 0,
      grandTotal: 1999,
      paymentMethod: "Credit Card (HDFC)",
      paymentStatus: "Paid",
      orderStatus: "Delivered",
      trackingNumber: "BLUEDART-BOM-5542",
      courierPartner: "BlueDart Express",
      estimatedDelivery: "Delivered",
      history: [
        { status: "Order Placed", timestamp: new Date(Date.now() - 3600000 * 120).toISOString(), note: "Order placed successfully." },
        { status: "Delivered", timestamp: new Date(Date.now() - 3600000 * 40).toISOString(), note: "Delivered to recipient." }
      ]
    }
  ];

  localStorage.setItem(ORDERS_CACHE_KEY, JSON.stringify(defaultOrders));
  return { orders: defaultOrders, fromDb: false };
}

/**
 * Create a new order in Supabase & local cache
 */
export async function createOrderInDb(newOrder) {
  // Save to local cache first
  try {
    const cached = localStorage.getItem(ORDERS_CACHE_KEY);
    const orders = cached ? JSON.parse(cached) : [];
    const updated = [newOrder, ...orders.filter(o => o.id !== newOrder.id)];
    localStorage.setItem(ORDERS_CACHE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save order to local cache', e);
  }

  // Attempt Supabase Insert
  try {
    const dbPayload = toDbOrderFormat(newOrder);
    const { error } = await supabase.from('orders').insert([dbPayload]);
    if (error) {
      console.warn('Supabase insert order error, stored in local cache:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    console.warn('Supabase offline / insert failed:', err.message);
    return { success: false, error: err.message };
  }
}

/**
 * Update an existing order status / tracking info
 */
export async function updateOrderInDb(orderId, updateFields) {
  // Update local cache
  try {
    const cached = localStorage.getItem(ORDERS_CACHE_KEY);
    const orders = cached ? JSON.parse(cached) : [];
    const updated = orders.map(ord => {
      if (ord.id === orderId) {
        return {
          ...ord,
          ...updateFields,
          history: updateFields.history || ord.history
        };
      }
      return ord;
    });
    localStorage.setItem(ORDERS_CACHE_KEY, JSON.stringify(updated));
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
  if (!isTableMissingCache) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('price', { ascending: true });

      if (error) {
        if (error.code === 'PGRST205' || error.status === 404 || error.message?.includes('schema cache')) {
          isTableMissingCache = true;
        }
      } else if (Array.isArray(data) && data.length > 0) {
        const normalized = data.map(p => ({
          id: p.id,
          name: p.name,
          slug: p.slug,
          badge: p.badge || '',
          price: Number(p.price),
          originalPrice: Number(p.original_price),
          savings: Math.max(0, Number(p.original_price) - Number(p.price)),
          image: p.image,
          gallery: p.gallery && p.gallery.length > 0 ? p.gallery : [p.image],
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
  }

  // Fallback to local cache or defaults
  const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return { products: parsed, fromDb: false };
      }
    } catch {
      // ignore
    }
  }

  return { products: DEFAULT_PRODUCTS, fromDb: false };
}

/**
 * Create a brand new product in Supabase & local cache
 */
export async function createProductInDb(product) {
  // Update local cache
  try {
    const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
    const products = cached ? JSON.parse(cached) : DEFAULT_PRODUCTS;
    const updated = [product, ...products.filter(p => p.id !== product.id)];
    localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update local product cache', e);
  }

  // Sync to Supabase
  try {
    const payload = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      badge: product.badge || '',
      price: Number(product.price),
      original_price: Number(product.originalPrice || product.price),
      image: product.image || '/assets/google.png',
      gallery: product.gallery || [product.image || '/assets/google.png'],
      short_description: product.shortDescription || '',
      description: product.description || '',
      features: product.features || [],
      specifications: product.specifications || [],
      is_active: product.isActive !== false,
      is_combo: Boolean(product.isCombo)
    };

    const { error } = await supabase.from('products').insert([payload]);
    if (error) {
      console.warn('Supabase createProduct error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
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
    if (updateFields.description !== undefined) payload.description = updateFields.description;

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

/**
 * Delete a product from Supabase & local cache
 */
export async function deleteProductFromDb(productId) {
  // Update local cache
  try {
    const cached = localStorage.getItem(PRODUCTS_CACHE_KEY);
    if (cached) {
      const products = JSON.parse(cached);
      const filtered = products.filter(p => p.id !== productId);
      localStorage.setItem(PRODUCTS_CACHE_KEY, JSON.stringify(filtered));
    }
  } catch (e) {
    console.error('Failed to delete from local product cache', e);
  }

  // Delete from Supabase
  try {
    const { error } = await supabase.from('products').delete().eq('id', productId);
    if (error) {
      console.warn('Supabase deleteProduct error:', error.message);
      return { success: false, error: error.message };
    }
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Real-time order synchronization listener
 */
export function subscribeToRealtimeOrders(onInsert, onUpdate) {
  try {
    const channel = supabase
      .channel('realtime_orders_subscription')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload?.new) {
            const normalized = normalizeOrderFromDb(payload.new);
            if (onInsert) onInsert(normalized);
          }
        }
      )
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders' },
        (payload) => {
          if (payload?.new) {
            const normalized = normalizeOrderFromDb(payload.new);
            if (onUpdate) onUpdate(normalized);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Realtime subscription not supported or failed:', err);
    return () => {};
  }
}

/**
 * Real-time product synchronization listener
 */
export function subscribeToRealtimeProducts(onChange) {
  try {
    const channel = supabase
      .channel('realtime_products_subscription')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'products' },
        () => {
          fetchProductsFromDb().then(({ products }) => {
            if (onChange && products) onChange(products);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Realtime product subscription failed:', err);
    return () => {};
  }
}

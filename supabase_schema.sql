-- =========================================================
-- Tapzyy E-Commerce Database Schema for Supabase
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/rvlvvrpdpgmkftwbigwi/sql
-- =========================================================

-- 1. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    customer JSONB NOT NULL,
    items JSONB NOT NULL,
    subtotal NUMERIC NOT NULL DEFAULT 0,
    discount NUMERIC NOT NULL DEFAULT 0,
    shipping_fee NUMERIC NOT NULL DEFAULT 0,
    grand_total NUMERIC NOT NULL DEFAULT 0,
    payment_method TEXT NOT NULL DEFAULT 'Cash on Delivery (COD)',
    payment_status TEXT NOT NULL DEFAULT 'Pending',
    order_status TEXT NOT NULL DEFAULT 'Order Placed',
    tracking_number TEXT DEFAULT '',
    courier_partner TEXT DEFAULT 'Delhivery Express',
    estimated_delivery TEXT DEFAULT '',
    history JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 2. Create Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    badge TEXT DEFAULT '',
    price NUMERIC NOT NULL,
    original_price NUMERIC NOT NULL,
    image TEXT NOT NULL,
    gallery JSONB DEFAULT '[]'::jsonb,
    short_description TEXT DEFAULT '',
    description TEXT DEFAULT '',
    features JSONB DEFAULT '[]'::jsonb,
    specifications JSONB DEFAULT '[]'::jsonb,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_combo BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 3. Create Site Settings Table
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 5. Create Permissive Policies (allowing storefront orders & admin management)
-- Orders: Allow public inserts (checkout) and public selects/updates with anon key
DROP POLICY IF EXISTS "Public can create orders" ON public.orders;
CREATE POLICY "Public can create orders" ON public.orders
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all operations for anon/service" ON public.orders;
CREATE POLICY "Allow all operations for anon/service" ON public.orders
    FOR ALL USING (true) WITH CHECK (true);

-- Products: Allow read and updates
DROP POLICY IF EXISTS "Allow public read products" ON public.products;
CREATE POLICY "Allow public read products" ON public.products
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow updates to products" ON public.products;
CREATE POLICY "Allow updates to products" ON public.products
    FOR ALL USING (true) WITH CHECK (true);

-- Settings: Allow read and write
DROP POLICY IF EXISTS "Allow all for settings" ON public.site_settings;
CREATE POLICY "Allow all for settings" ON public.site_settings
    FOR ALL USING (true) WITH CHECK (true);

-- 6. Insert Default Products into Supabase
INSERT INTO public.products (id, name, slug, badge, price, original_price, image, short_description, is_active, is_combo)
VALUES
    ('google-review-card', 'Tapzyy Google Review NFC Card', 'google-review-card', 'BESTSELLER', 1999, 2999, '/assets/google.png', 'Tap to open your Google Review page instantly on any phone.', true, false),
    ('instagram-card', 'Tapzyy Instagram NFC Card', 'instagram-card', 'POPULAR', 1999, 2999, '/assets/instagram.png', 'Tap to open your Instagram profile and convert visits into followers.', true, false),
    ('combo', 'Tapzyy Google + Instagram Combo Pack', 'combo', 'SAVE ₹999', 2999, 3998, '/assets/combo.png', 'Get both smart cards for maximum counter growth and save ₹999.', true, true)
ON CONFLICT (id) DO NOTHING;

-- 7. Insert Default Sample Orders into Supabase
INSERT INTO public.orders (id, customer, items, subtotal, discount, shipping_fee, grand_total, payment_method, payment_status, order_status, tracking_number, courier_partner, estimated_delivery, history)
VALUES
    (
        'TPZ-84920',
        '{"fullName": "Rajesh Kumar", "email": "rajesh@tiffinhouse.com", "phone": "+91 98765 43210", "businessName": "The Tiffin House Café", "addressLine": "Shop #4, MG Road", "city": "Bengaluru", "state": "Karnataka", "pinCode": "560001"}'::jsonb,
        '[{"id": "combo", "name": "Tapzyy Google + Instagram Combo", "price": 2999, "quantity": 1, "image": "/assets/combo.png"}]'::jsonb,
        2999, 0, 0, 2999,
        'UPI (Google Pay)', 'Paid', 'Shipped',
        'DTDC-BLR-984210', 'DTDC Express', '3-5 Business Days',
        '[{"status": "Order Placed", "timestamp": "2026-09-12T14:30:00Z", "note": "Order received via website."}, {"status": "Packed", "timestamp": "2026-09-13T09:15:00Z", "note": "Packed in premium acrylic protective box."}, {"status": "Shipped", "timestamp": "2026-09-13T11:45:00Z", "note": "Handed over to DTDC Express courier."}]'::jsonb
    ),
    (
        'TPZ-71034',
        '{"fullName": "Priya Sharma", "email": "priya@glitzsalon.in", "phone": "+91 98111 22334", "businessName": "Glitz Beauty Salon", "addressLine": "22, Commerce House, Link Road", "city": "Mumbai", "state": "Maharashtra", "pinCode": "400053"}'::jsonb,
        '[{"id": "instagram-card", "name": "Tapzyy Instagram NFC Card", "price": 1999, "quantity": 1, "image": "/assets/instagram.png"}]'::jsonb,
        1999, 0, 0, 1999,
        'Credit Card (HDFC)', 'Paid', 'Delivered',
        'BLUEDART-BOM-5542', 'BlueDart Express', 'Delivered',
        '[{"status": "Order Placed", "timestamp": "2026-09-10T10:15:00Z", "note": "Order placed successfully."}, {"status": "Delivered", "timestamp": "2026-09-12T14:20:00Z", "note": "Delivered to recipient."}]'::jsonb
    )
ON CONFLICT (id) DO NOTHING;

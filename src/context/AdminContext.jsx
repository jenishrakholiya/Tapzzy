import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';
import {
  fetchProductsFromDb,
  createProductInDb,
  updateProductInDb,
  deleteProductFromDb,
  subscribeToRealtimeProducts
} from '../lib/supabaseService';

const AdminContext = createContext();

const INITIAL_CONTENT = {
  heroHeadline: "You’re Not Buying a Card. You’re Buying a Marketing System for Your Business.",
  heroSubtext: "Turn customer interactions into genuine Google Reviews, stronger online reputation, and better customer engagement — with one simple tap or scan.",
  seoMeta: {
    home: { title: "Tapzyy | Marketing System for Local Businesses", description: "Turn customer interactions into genuine Google Reviews, stronger online reputation, and better customer engagement with Tapzyy." },
    shop: { title: "Shop Tapzyy | Smart Growth Tools for Local Businesses", description: "Explore Tapzyy’s NFC and QR code cards engineered to support customer trust and reputation growth." },
    googleCard: { title: "Tapzyy Google Review NFC Card | Built for Review Growth", description: "Make it easier for customers to find your Google Review page and share their genuine experience with one simple tap or QR scan." },
    instagramCard: { title: "Tapzyy Instagram NFC Card | Turn Visits into Connections", description: "Turn offline customer interactions into easier Instagram profile visits with one simple tap or scan." },
    combo: { title: "Tapzyy Google + Instagram Combo | Dual Growth System", description: "Build your Google review presence and Instagram community together with two simple NFC touchpoints." },
    howItWorks: { title: "How It Works | From Customer Interaction to Online Reputation", description: "Learn how Tapzyy connects the physical customer experience with your digital business presence." },
    howToSetUp: { title: "How to Set Up Your Tapzyy Cards | Step-by-Step Guide", description: "Easy counter positioning, destination link connection, and best practices for Tapzyy cards." },
    about: { title: "About Tapzyy | We Don't Want to Sell You Another Card", description: "Tapzyy connects physical customer experiences with digital presence to make local business growth easier." },
    contact: { title: "Contact Tapzyy Support & Sales", description: "Get in touch with the Tapzyy team for order inquiries, setup help, or bulk business requests." },
    faq: { title: "Frequently Asked Questions | Tapzyy", description: "Clear answers regarding Tapzyy NFC cards, Google review collection, AI assistance, compatibility, and shipping." }
  }
};

export const AdminProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('tapzyy_custom_products');
    if (!saved) return DEFAULT_PRODUCTS;
    try {
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed) || parsed.length === 0) return DEFAULT_PRODUCTS;
      
      const defaultIds = new Set(DEFAULT_PRODUCTS.map(d => d.id));
      const mergedDefaults = DEFAULT_PRODUCTS.map(defP => {
        const found = parsed.find(p => p.id === defP.id);
        return found ? { ...defP, ...found } : defP;
      });
      const customAdded = parsed.filter(p => !defaultIds.has(p.id));
      return [...mergedDefaults, ...customAdded];
    } catch {
      return DEFAULT_PRODUCTS;
    }
  });

  // Fetch from Supabase on mount and listen to realtime updates (admin routes only for WebSocket thrift)
  useEffect(() => {
    fetchProductsFromDb().then(({ products: remoteProducts, fromDb }) => {
      if (fromDb && remoteProducts && remoteProducts.length > 0) {
        setProducts(remoteProducts);
      }
    });

    // Concurrency Protection: Only connect persistent WebSocket channel on admin sessions
    const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin-tap');
    if (!isAdminRoute) {
      return;
    }

    const unsubscribe = subscribeToRealtimeProducts((updatedRemoteProducts) => {
      if (updatedRemoteProducts && updatedRemoteProducts.length > 0) {
        setProducts(updatedRemoteProducts);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [siteContent, setSiteContent] = useState(() => {
    const saved = localStorage.getItem('tapzyy_site_content');
    return saved ? JSON.parse(saved) : INITIAL_CONTENT;
  });

  const [activeProducts, setActiveProducts] = useState(() => {
    const saved = localStorage.getItem('tapzyy_active_products');
    return saved ? JSON.parse(saved) : { "google-review-card": true, "instagram-card": true, "combo": true };
  });

  useEffect(() => {
    localStorage.setItem('tapzyy_custom_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('tapzyy_site_content', JSON.stringify(siteContent));
  }, [siteContent]);

  useEffect(() => {
    localStorage.setItem('tapzyy_active_products', JSON.stringify(activeProducts));
  }, [activeProducts]);

  const addProduct = async (productData) => {
    const rawSlug = productData.slug || productData.name || `product-${Date.now()}`;
    const slug = rawSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newProd = {
      id: `prod_${Date.now()}`,
      name: productData.name || 'New Tapzyy Product',
      slug,
      badge: productData.badge || 'New Arrival',
      price: Number(productData.price) || 1999,
      originalPrice: Number(productData.originalPrice) || Number(productData.price) || 2499,
      savings: Math.max(0, (Number(productData.originalPrice) || 0) - (Number(productData.price) || 0)),
      image: productData.image || '/assets/google.png',
      gallery: productData.image ? [productData.image] : ['/assets/google.png'],
      shortDescription: productData.shortDescription || 'Smart contactless NFC solution for modern businesses.',
      description: productData.description || 'Designed to make customer interactions effortless, faster, and more engaging.',
      features: productData.features || [
        "Instant contactless connection with one tap or scan",
        "High-durability acrylic build for high-traffic counters",
        "Zero subscription fees or hidden apps required"
      ],
      specifications: productData.specifications || [
        { label: "Material", value: "Premium 4mm Acrylic" },
        { label: "Technology", value: "High-Speed NFC + Laser QR" },
        { label: "Compatibility", value: "iOS & Android" }
      ],
      faqs: [
        { question: "How does it work?", answer: "Customers tap with any NFC smartphone or scan the laser QR code." }
      ],
      isCombo: Boolean(productData.isCombo),
      isActive: true,
      category: productData.category || 'NFC Card'
    };

    setProducts(prev => [newProd, ...prev]);
    setActiveProducts(prev => ({ ...prev, [newProd.id]: true }));
    await createProductInDb(newProd);
    return newProd;
  };

  const updateProduct = async (productId, updatedFields) => {
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, ...updatedFields } : p)));
    await updateProductInDb(productId, updatedFields);
  };

  const deleteProduct = async (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    setActiveProducts(prev => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
    await deleteProductFromDb(productId);
  };

  const resetProducts = () => {
    setProducts(DEFAULT_PRODUCTS);
    localStorage.removeItem('tapzyy_custom_products');
  };

  const getProductBySlug = (slugOrId) => {
    if (!slugOrId) return products[0];
    const normalized = String(slugOrId).toLowerCase().trim();
    if (['google-nfc-card', 'google-card', 'google-review-card', 'google'].includes(normalized)) {
      return products.find(p => p.id === 'google-review-card') || products[0];
    }
    if (['instagram-nfc-card', 'instagram-card', 'instagram'].includes(normalized)) {
      return products.find(p => p.id === 'instagram-card') || products[1];
    }
    if (['combo-pack', 'combo', 'combo-card'].includes(normalized)) {
      return products.find(p => p.id === 'combo') || products[2];
    }
    return products.find(p => p.slug === normalized || p.id === normalized || p.slug === slugOrId || p.id === slugOrId) || null;
  };

  const updateHeroContent = (headline, subtext) => {
    setSiteContent(prev => ({
      ...prev,
      heroHeadline: headline,
      heroSubtext: subtext
    }));
  };

  const updateSeoMeta = (pageKey, title, description) => {
    setSiteContent(prev => ({
      ...prev,
      seoMeta: {
        ...prev.seoMeta,
        [pageKey]: { title, description }
      }
    }));
  };

  const toggleProductActive = (productId) => {
    setActiveProducts(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        siteContent,
        activeProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProducts,
        getProductBySlug,
        updateHeroContent,
        updateSeoMeta,
        toggleProductActive
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);

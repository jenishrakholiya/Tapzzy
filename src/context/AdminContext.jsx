import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

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
      return DEFAULT_PRODUCTS.map(defP => {
        const found = parsed.find(p => p.id === defP.id);
        return found ? { ...defP, ...found, gallery: defP.gallery, image: defP.image } : defP;
      });
    } catch (e) {
      return DEFAULT_PRODUCTS;
    }
  });

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

  const updateProduct = (productId, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updatedFields } : p));
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
    return products.find(p => p.slug === slugOrId || p.id === slugOrId) || products[0];
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
        updateProduct,
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


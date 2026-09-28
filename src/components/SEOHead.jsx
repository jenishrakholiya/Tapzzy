import React, { useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

export const SEOHead = ({ pageKey, title: customTitle, description: customDesc }) => {
  const { siteContent } = useAdmin();

  useEffect(() => {
    const metaInfo = siteContent?.seoMeta?.[pageKey] || {};
    const finalTitle = customTitle || metaInfo.title || "Tapzyy | Smart Marketing Tools for Local Businesses";
    const finalDesc = customDesc || metaInfo.description || "Help customers review, follow, and connect with your business using Tapzyy’s smart NFC and QR marketing products.";

    document.title = finalTitle;

    let metaDescTag = document.querySelector('meta[name="description"]');
    if (!metaDescTag) {
      metaDescTag = document.createElement('meta');
      metaDescTag.name = "description";
      document.head.appendChild(metaDescTag);
    }
    metaDescTag.content = finalDesc;

    // OpenGraph Title & Description
    let ogTitleTag = document.querySelector('meta[property="og:title"]');
    if (!ogTitleTag) {
      ogTitleTag = document.createElement('meta');
      ogTitleTag.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitleTag);
    }
    ogTitleTag.content = finalTitle;

    let ogDescTag = document.querySelector('meta[property="og:description"]');
    if (!ogDescTag) {
      ogDescTag = document.createElement('meta');
      ogDescTag.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescTag);
    }
    ogDescTag.content = finalDesc;
  }, [pageKey, customTitle, customDesc, siteContent]);

  return null;
};

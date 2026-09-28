import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('tapzyy_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState(() => {
    const saved = localStorage.getItem('tapzyy_coupon');
    return saved ? JSON.parse(saved) : null;
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    localStorage.setItem('tapzyy_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (coupon) {
      localStorage.setItem('tapzyy_coupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('tapzyy_coupon');
    }
  }, [coupon]);

  const showToast = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    showToast(`Added ${product.name} to your cart.`);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    showToast(`Item removed from cart.`);
  };

  const clearCart = () => {
    setCart([]);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'TAPZYY10') {
      const c = { code: 'TAPZYY10', discountPercent: 10, discountAmount: 0, description: '10% off launch discount' };
      setCoupon(c);
      showToast('Coupon TAPZYY10 applied successfully!');
      return { success: true, message: '10% discount applied!' };
    } else if (cleanCode === 'GROW500') {
      const c = { code: 'GROW500', discountPercent: 0, discountAmount: 500, description: '₹500 flat discount' };
      setCoupon(c);
      showToast('Coupon GROW500 applied successfully!');
      return { success: true, message: '₹500 flat discount applied!' };
    } else {
      return { success: false, message: 'Invalid coupon code. Try TAPZYY10' };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    showToast('Coupon removed.');
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  
  let discount = 0;
  if (coupon) {
    if (coupon.discountPercent > 0) {
      discount = Math.round((subtotal * coupon.discountPercent) / 100);
    } else if (coupon.discountAmount > 0) {
      discount = Math.min(subtotal, coupon.discountAmount);
    }
  }

  // Free shipping threshold ₹1,998
  const shippingFee = subtotal >= 1998 || cart.length === 0 ? 0 : 99;
  const grandTotal = Math.max(0, subtotal - discount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemCount,
        subtotal,
        coupon,
        applyCoupon,
        removeCoupon,
        discount,
        shippingFee,
        grandTotal,
        notification,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

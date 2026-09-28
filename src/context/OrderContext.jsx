import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchOrders,
  createOrderInDb,
  updateOrderInDb,
  checkSupabaseStatus,
  subscribeToRealtimeOrders
} from '../lib/supabaseService';
import { sendOrderEmailToAdmin, generateOrderMailtoUrl } from '../lib/orderEmailService';

const OrderContext = createContext();

const INITIAL_ORDERS = [
  {
    id: "TPZ-84920",
    createdAt: "2026-09-12T14:30:00Z",
    customer: {
      fullName: "Rajesh Kumar",
      email: "rajesh@tiffinhouse.com",
      phone: "+91 98765 43210",
      businessName: "The Tiffin House Café",
      addressLine: "Shop #4, Sunshine Heights, MG Road",
      landmark: "Opposite City Mall",
      city: "Bengaluru",
      state: "Karnataka",
      pinCode: "560001"
    },
    items: [
      {
        id: "combo",
        name: "Tapzyy Google + Instagram Combo",
        price: 2999,
        quantity: 1,
        image: "/assets/combo.png"
      }
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
    estimatedDelivery: "2026-09-15",
    history: [
      { status: "Order Placed", timestamp: "2026-09-12T14:30:00Z", note: "Order received via website." },
      { status: "Payment Confirmed", timestamp: "2026-09-12T14:31:15Z", note: "Payment verified via Razorpay UPI." },
      { status: "Processing", timestamp: "2026-09-12T16:00:00Z", note: "Order sent to fulfillment station." },
      { status: "Packed", timestamp: "2026-09-13T09:15:00Z", note: "Packed in premium acrylic protective box." },
      { status: "Shipped", timestamp: "2026-09-13T11:45:00Z", note: "Handed over to DTDC Express courier." }
    ]
  },
  {
    id: "TPZ-71034",
    createdAt: "2026-09-10T10:15:00Z",
    customer: {
      fullName: "Priya Sharma",
      email: "priya@glitzsalon.in",
      phone: "+91 98111 22334",
      businessName: "Glitz Beauty Salon",
      addressLine: "22, Commerce House, Link Road",
      landmark: "Near Metro Station",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400053"
    },
    items: [
      {
        id: "instagram-card",
        name: "Tapzyy Instagram NFC Card",
        price: 1999,
        quantity: 1,
        image: "/assets/instagram.png"
      }
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
    estimatedDelivery: "2026-09-12",
    history: [
      { status: "Order Placed", timestamp: "2026-09-10T10:15:00Z", note: "Order placed successfully." },
      { status: "Payment Confirmed", timestamp: "2026-09-10T10:16:00Z", note: "Payment confirmed." },
      { status: "Processing", timestamp: "2026-09-10T12:00:00Z", note: "Card custom encoding." },
      { status: "Packed", timestamp: "2026-09-10T16:00:00Z", note: "Quality checked and packed." },
      { status: "Shipped", timestamp: "2026-09-11T09:00:00Z", note: "Dispatched via BlueDart." },
      { status: "Out for Delivery", timestamp: "2026-09-12T08:30:00Z", note: "Out for delivery with executive." },
      { status: "Delivered", timestamp: "2026-09-12T14:20:00Z", note: "Delivered to recipient." }
    ]
  }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('tapzyy_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [dbStatus, setDbStatus] = useState({ isConnected: false, tableReady: false, message: 'Checking...' });

  const loadOrdersFromDb = async () => {
    const status = await checkSupabaseStatus();
    setDbStatus(status);
    const { orders: remoteOrders, fromDb } = await fetchOrders();
    if (fromDb && remoteOrders.length > 0) {
      setOrders(remoteOrders);
    }
  };

  useEffect(() => {
    loadOrdersFromDb();

    const unsubscribe = subscribeToRealtimeOrders(
      (newRemoteOrder) => {
        setOrders((prev) => {
          if (prev.some((o) => o.id === newRemoteOrder.id)) return prev;
          return [newRemoteOrder, ...prev];
        });
      },
      (updatedRemoteOrder) => {
        setOrders((prev) =>
          prev.map((o) => (o.id === updatedRemoteOrder.id ? { ...o, ...updatedRemoteOrder } : o))
        );
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('tapzyy_orders', JSON.stringify(orders));
  }, [orders]);

  const createOrder = async (orderData) => {
    const newId = `TPZ-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();
    
    const newOrder = {
      id: newId,
      createdAt: now,
      customer: orderData.customer,
      items: orderData.items,
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      shippingFee: orderData.shippingFee || 0,
      grandTotal: orderData.grandTotal,
      paymentMethod: orderData.paymentMethod || 'UPI',
      paymentStatus: orderData.paymentStatus || 'Paid',
      orderStatus: 'Order Placed',
      trackingNumber: '',
      courierPartner: 'Delhivery Express',
      estimatedDelivery: '3-5 Business Days',
      history: [
        { status: 'Order Placed', timestamp: now, note: 'Order received via online store.' },
        { status: 'Payment Confirmed', timestamp: now, note: 'Payment verified via secure gateway.' }
      ]
    };

    setOrders((prev) => [newOrder, ...prev.filter(o => o.id !== newOrder.id)]);
    
    // Save to Supabase asynchronously
    createOrderInDb(newOrder).catch((err) => console.warn('Supabase order sync error:', err));

    // Send real-time order alert email to store owner (jenishrakholiya2005@gmail.com)
    sendOrderEmailToAdmin(newOrder).catch((err) => console.warn('Email dispatch error:', err));

    return newOrder;
  };

  const getOrderById = (id) => {
    if (!id) return null;
    const cleanId = id.trim().toUpperCase();
    return orders.find((o) => o.id === cleanId || o.id === `TPZ-${cleanId}`);
  };

  const findOrdersByCustomer = (emailOrPhone) => {
    if (!emailOrPhone) return [];
    const query = emailOrPhone.trim().toLowerCase();
    return orders.filter(
      (o) =>
        o.customer.email.toLowerCase().includes(query) ||
        o.customer.phone.includes(query)
    );
  };

  const updateOrderStatus = async (orderId, newStatus, trackingNumber = '', courierPartner = '', note = '') => {
    const now = new Date().toISOString();
    let updatedOrder = null;

    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedHistory = [
            ...ord.history,
            { status: newStatus, timestamp: now, note: note || `Status updated to ${newStatus}` }
          ];
          updatedOrder = {
            ...ord,
            orderStatus: newStatus,
            trackingNumber: trackingNumber || ord.trackingNumber,
            courierPartner: courierPartner || ord.courierPartner || 'Delhivery Express',
            history: updatedHistory
          };
          return updatedOrder;
        }
        return ord;
      })
    );

    // Sync to Supabase
    if (updatedOrder) {
      await updateOrderInDb(orderId, {
        orderStatus: newStatus,
        trackingNumber: trackingNumber || updatedOrder.trackingNumber,
        courierPartner: courierPartner || updatedOrder.courierPartner,
        history: updatedOrder.history
      });
    }
  };

  const refreshOrders = async () => {
    await loadOrdersFromDb();
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getOrderById,
        findOrdersByCustomer,
        updateOrderStatus,
        refreshOrders,
        dbStatus,
        sendOrderEmailToAdmin,
        generateOrderMailtoUrl
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);

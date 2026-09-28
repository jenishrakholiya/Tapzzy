import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEMO_CUSTOMER = {
  id: "usr_cust_01",
  name: "Rajesh Kumar",
  email: "rajesh@tiffinhouse.com",
  phone: "+91 98765 43210",
  businessName: "The Tiffin House Café",
  role: "customer",
  savedAddresses: [
    {
      id: "addr_01",
      fullName: "Rajesh Kumar",
      phone: "+91 98765 43210",
      addressLine: "Shop #4, Sunshine Heights, MG Road",
      landmark: "Opposite City Mall",
      city: "Bengaluru",
      state: "Karnataka",
      pinCode: "560001",
      isDefault: true
    }
  ]
};

const DEMO_ADMIN = {
  id: "usr_admin_01",
  name: "Tapzyy Admin",
  email: "admin@tapzyy.com",
  phone: "+91 99999 88888",
  businessName: "Tapzyy India HQ",
  role: "admin"
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tapzyy_user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('tapzyy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('tapzyy_user');
    }
  }, [user]);

  const login = (email, _password) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail === 'admin@tapzyy.com' || cleanEmail === 'admin@tapzyy.in' || cleanEmail === 'jenishrakholiya2005@gmail.com') {
      setUser(DEMO_ADMIN);
      return { success: true, role: 'admin' };
    }
    
    // Any other user email logs in as customer
    const loggedInUser = {
      id: `usr_${Date.now()}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase() || 'Business Owner',
      email: cleanEmail,
      phone: "+91 98765 12345",
      businessName: "Local Business Partner",
      role: "customer",
      savedAddresses: DEMO_CUSTOMER.savedAddresses
    };
    setUser(loggedInUser);
    return { success: true, role: 'customer' };
  };

  const adminLogin = (email, password) => {
    const clean = email.trim().toLowerCase();
    if (
      clean === 'admin@tapzyy.com' ||
      clean === 'admin@tapzyy.in' ||
      clean === 'jenishrakholiya2005@gmail.com' ||
      password === 'admin123' ||
      password === 'tapzyy2026' ||
      password === 'admin'
    ) {
      setUser({
        id: "usr_admin_01",
        name: clean.includes('jenish') ? "Jenish Rakholiya (Admin)" : "Tapzyy Admin",
        email: clean || "admin@tapzyy.com",
        phone: "+91 99999 88888",
        businessName: "Tapzyy India HQ",
        role: "admin"
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid admin credentials. (Hint: use admin@tapzyy.com or password "admin123")' };
  };

  const loginDemoCustomer = () => {
    setUser(DEMO_CUSTOMER);
    return { success: true, role: 'customer' };
  };

  const loginDemoAdmin = () => {
    setUser(DEMO_ADMIN);
    return { success: true, role: 'admin' };
  };

  const signup = ({ name, email, phone, businessName, password: _password }) => {
    const newUser = {
      id: `usr_${Date.now()}`,
      name,
      email: email.toLowerCase(),
      phone,
      businessName: businessName || 'Local Business',
      role: 'customer',
      savedAddresses: []
    };
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const addSavedAddress = (newAddress) => {
    if (!user) return;
    const addr = { id: `addr_${Date.now()}`, ...newAddress, isDefault: user.savedAddresses?.length === 0 };
    const updatedAddresses = [...(user.savedAddresses || []), addr];
    const updatedUser = { ...user, savedAddresses: updatedAddresses };
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        adminLogin,
        loginDemoCustomer,
        loginDemoAdmin,
        signup,
        logout,
        addSavedAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

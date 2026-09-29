import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_CREDENTIALS } from '../config/credentials';

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

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('tapzyy_user');
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      // For security, admin role requires an active sessionStorage session
      if (parsed.role === 'admin') {
        const hasSession = sessionStorage.getItem('tapzyy_admin_session');
        return hasSession === 'true' ? parsed : null;
      }
      return parsed;
    } catch {
      return null;
    }
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
    
    // Any customer email logs in as customer
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

  const adminLogin = (identifier, password) => {
    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanId || !cleanPass) {
      return { success: false, error: 'Please enter both Admin ID/Email and Password.' };
    }

    const validIds = ADMIN_CREDENTIALS.validEmails;
    const validPasswords = ADMIN_CREDENTIALS.validPasswords;

    if (validIds.includes(cleanId) && validPasswords.includes(cleanPass)) {
      const adminUser = {
        id: "usr_admin_01",
        name: cleanId.includes('jenish') ? "Jenish Rakholiya" : "Tapzyy Admin",
        email: cleanId.includes('@') ? cleanId : "admin@tapzyy.com",
        phone: "+91 99999 88888",
        businessName: "Tapzyy India HQ",
        role: "admin"
      };
      sessionStorage.setItem('tapzyy_admin_session', 'true');
      setUser(adminUser);
      return { success: true };
    }

    return { success: false, error: 'Incorrect Admin ID or Password. Access denied.' };
  };

  const loginDemoCustomer = () => {
    setUser(DEMO_CUSTOMER);
    return { success: true, role: 'customer' };
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
    sessionStorage.removeItem('tapzyy_admin_session');
    localStorage.removeItem('tapzyy_user');
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

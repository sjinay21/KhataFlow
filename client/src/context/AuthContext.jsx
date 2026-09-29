'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser, getMe, logoutUser } from '@/lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on mount
    const checkUserLoggedIn = async () => {
      /*
      Previous implementation:
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await fetch('http://localhost:5000/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
      Changed because: Refactored to use central api.js helper functions.
      */
      /*
      // OLD AUTH IMPLEMENTATION:
      // We manually checked for localStorage 'token'.
      // Replaced with a direct call to getMe() which automatically sends the HttpOnly cookie.
      */
      try {
        const res = await getMe();

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to verify token:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    /*
    Previous implementation:
    try {
      const res = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

    Changed because: Refactored to use central api.js helper functions.
    */
    try {
      const res = await loginUser({ email, password });

      const data = await res.json();

      if (res.ok) {
        /*
        // OLD AUTH IMPLEMENTATION:
        // localStorage.setItem('token', data.token);
        // JWT is no longer stored on the frontend. Backend sets HttpOnly cookie.
        */
        setUser(data.user);
        router.push('/dashboard');
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const register = async (name, email, password) => {
    /*
    Previous implementation:
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

    Changed because: Refactored to use central api.js helper functions.
    */
    try {
      const res = await registerUser({ name, email, password });

      const data = await res.json();

      if (res.ok) {
        /*
        // OLD AUTH IMPLEMENTATION:
        // localStorage.setItem('token', data.token);
        // JWT is no longer stored on the frontend. Backend sets HttpOnly cookie.
        */
        setUser(data.user);
        router.push('/dashboard');
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    /*
    // OLD AUTH IMPLEMENTATION:
    // localStorage.removeItem('token');
    // We now instruct the backend to clear the HttpOnly cookie.
    */
    try {
      await logoutUser();
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

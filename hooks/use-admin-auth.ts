"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    setIsAuthenticated(token === 'authenticated');
    setIsLoading(false);
  };

  const login = (username: string, password: string): boolean => {
    // Einfache Authentifizierung (in Produktion würde dies ein sicherer API-Aufruf sein)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('adminToken', 'authenticated');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    router.push('/admin/login');
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  };
}
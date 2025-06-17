import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const { isAuthenticated } = useAuth();
  const { direction } = useLanguage();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${direction}`}>
      <Sidebar />
      <div className={`${direction === 'rtl' ? 'mr-64' : 'ml-64'} transition-all duration-300`}>
        <Header />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
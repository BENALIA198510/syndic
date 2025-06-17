import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './components/ui/Toast';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Apartments from './pages/Apartments';
import Billing from './pages/Billing';
import Expenses from './pages/Expenses';
import Maintenance from './pages/Maintenance';
import Meetings from './pages/Meetings';
import Announcements from './pages/Announcements';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Login from './pages/Login';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <ToastProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Dashboard />} />
                  <Route path="apartments" element={<Apartments />} />
                  <Route path="billing" element={<Billing />} />
                  <Route path="expenses" element={<Expenses />} />
                  <Route path="maintenance" element={<Maintenance />} />
                  <Route path="meetings" element={<Meetings />} />
                  <Route path="announcements" element={<Announcements />} />
                  <Route path="reports" element={<Reports />} />
                  <Route path="users" element={<Users />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
              </Routes>
            </Router>
          </ToastProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
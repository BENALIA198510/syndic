import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Receipt, 
  Wallet, 
  Wrench, 
  Calendar, 
  Megaphone, 
  BarChart3, 
  Users, 
  Settings 
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const navigation = [
  { name: 'nav.dashboard', href: '/', icon: LayoutDashboard },
  { name: 'nav.apartments', href: '/apartments', icon: Building2 },
  { name: 'nav.billing', href: '/billing', icon: Receipt },
  { name: 'nav.expenses', href: '/expenses', icon: Wallet },
  { name: 'nav.maintenance', href: '/maintenance', icon: Wrench },
  { name: 'nav.meetings', href: '/meetings', icon: Calendar },
  { name: 'nav.announcements', href: '/announcements', icon: Megaphone },
  { name: 'nav.reports', href: '/reports', icon: BarChart3 },
  { name: 'nav.users', href: '/users', icon: Users },
  { name: 'nav.settings', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const { t, direction } = useLanguage();

  return (
    <div className={`fixed inset-y-0 ${direction === 'rtl' ? 'right-0' : 'left-0'} z-50 w-64 bg-white dark:bg-gray-800 shadow-lg`}>
      <div className="flex h-16 items-center px-6 border-b border-gray-200 dark:border-gray-700">
        <Building2 className="h-8 w-8 text-syndic-600" />
        <span className={`${direction === 'rtl' ? 'mr-3' : 'ml-3'} text-xl font-bold text-gray-900 dark:text-white`}>
          نظام السنديك
        </span>
      </div>
      
      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-syndic-100 text-syndic-700 dark:bg-syndic-900 dark:text-syndic-300'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon className={`h-5 w-5 flex-shrink-0 ${direction === 'rtl' ? 'ml-3' : 'mr-3'}`} />
              {t(item.name)}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
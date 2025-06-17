import React from 'react';
import { Bell, Search, Moon, Sun, Globe } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTheme } from '../../contexts/ThemeContext';

export default function Header() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t, direction } = useLanguage();
  const { isDark, toggleTheme } = useTheme();

  const languages = [
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'en', name: 'English' },
  ];

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-full px-6">
        {/* Search */}
        <div className="flex-1 max-w-lg">
          <div className="relative">
            <Search className={`absolute top-1/2 transform -translate-y-1/2 ${direction === 'rtl' ? 'right-3' : 'left-3'} h-4 w-4 text-gray-400`} />
            <input
              type="text"
              placeholder={t('common.search')}
              className={`w-full ${direction === 'rtl' ? 'pr-10 text-right' : 'pl-10'} py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language Selector */}
          <div className="relative group">
            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
              <Globe className="h-5 w-5" />
            </button>
            <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setLanguage(lang.code as 'ar' | 'fr' | 'en')}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    language === lang.code ? 'bg-syndic-100 dark:bg-syndic-900 text-syndic-700 dark:text-syndic-300' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Notifications */}
          <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative group">
            <button className="flex items-center space-x-3 rtl:space-x-reverse">
              <img
                className="h-8 w-8 rounded-full object-cover"
                src={user?.avatar || 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'}
                alt={user?.name}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {user?.name}
              </span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
              </div>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                تسجيل الخروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
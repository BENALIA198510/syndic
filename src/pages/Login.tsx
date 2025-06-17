import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Building2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '../components/ui/Button';

export default function Login() {
  const [email, setEmail] = useState('admin@syndic.ma');
  const [password, setPassword] = useState('password');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const { t, direction } = useLanguage();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
    } catch (err) {
      setError('بيانات الاعتماد غير صحيحة');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-syndic-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-syndic-600 rounded-full flex items-center justify-center">
            <Building2 className="h-8 w-8 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
            {t('login.title')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            نظام إدارة السنديك للعمارات السكنية
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('login.email')}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-syndic-500 focus:border-syndic-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${direction === 'rtl' ? 'text-right' : 'text-left'}`}
                  placeholder="admin@syndic.ma"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t('login.password')}
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-syndic-500 focus:border-syndic-500 ${direction === 'rtl' ? 'pr-10 text-right' : 'pl-3 pr-10 text-left'} bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder="password"
                  />
                  <button
                    type="button"
                    className={`absolute inset-y-0 ${direction === 'rtl' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-syndic-600 focus:ring-syndic-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className={`${direction === 'rtl' ? 'mr-2' : 'ml-2'} block text-sm text-gray-900 dark:text-gray-300`}>
                    {t('login.remember')}
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-syndic-600 hover:text-syndic-500">
                    {t('login.forgot_password')}
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'جاري تسجيل الدخول...' : t('login.sign_in')}
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <p>حسابات تجريبية:</p>
            <p>المدير: admin@syndic.ma / password</p>
            <p>المالك: owner@syndic.ma / password</p>
          </div>
        </form>
      </div>
    </div>
  );
}
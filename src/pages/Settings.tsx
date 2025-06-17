import React, { useState } from 'react';
import { Save, Building2, Bell, Shield, Palette, Globe, CreditCard } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

export default function Settings() {
  const { t, language, setLanguage } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  
  const [buildingInfo, setBuildingInfo] = useState({
    name: 'عمارة النخيل السكنية',
    address: 'شارع محمد الخامس، الدار البيضاء',
    phone: '+212 5 22 11 33 44',
    email: 'info@syndic-nakhl.ma',
    totalFloors: 5,
    totalApartments: 24,
    managementCompany: 'شركة إدارة العقارات المغربية'
  });

  const [financialSettings, setFinancialSettings] = useState({
    currency: 'MAD',
    monthlyFeeBase: 2500,
    lateFeePercentage: 5,
    paymentDueDays: 15,
    taxRate: 20
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true,
    paymentReminders: true,
    maintenanceUpdates: true,
    meetingNotifications: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    loginAttempts: 5
  });

  const handleSave = () => {
    // Save settings logic here
    alert('تم حفظ الإعدادات بنجاح');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.settings')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إعدادات النظام والتخصيص
          </p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 ml-2" />
          حفظ الإعدادات
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Building Information */}
        <Card>
          <CardHeader 
            title="معلومات العمارة"
            subtitle="البيانات الأساسية للعمارة"
          />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                اسم العمارة
              </label>
              <input
                type="text"
                value={buildingInfo.name}
                onChange={(e) => setBuildingInfo({...buildingInfo, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                العنوان
              </label>
              <input
                type="text"
                value={buildingInfo.address}
                onChange={(e) => setBuildingInfo({...buildingInfo, address: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  الهاتف
                </label>
                <input
                  type="tel"
                  value={buildingInfo.phone}
                  onChange={(e) => setBuildingInfo({...buildingInfo, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={buildingInfo.email}
                  onChange={(e) => setBuildingInfo({...buildingInfo, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  عدد الطوابق
                </label>
                <input
                  type="number"
                  value={buildingInfo.totalFloors}
                  onChange={(e) => setBuildingInfo({...buildingInfo, totalFloors: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  عدد الشقق
                </label>
                <input
                  type="number"
                  value={buildingInfo.totalApartments}
                  onChange={(e) => setBuildingInfo({...buildingInfo, totalApartments: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Financial Settings */}
        <Card>
          <CardHeader 
            title="الإعدادات المالية"
            subtitle="إعدادات الرسوم والمدفوعات"
          />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                العملة
              </label>
              <select
                value={financialSettings.currency}
                onChange={(e) => setFinancialSettings({...financialSettings, currency: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="MAD">درهم مغربي (MAD)</option>
                <option value="EUR">يورو (EUR)</option>
                <option value="USD">دولار أمريكي (USD)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                الرسوم الشهرية الأساسية
              </label>
              <input
                type="number"
                value={financialSettings.monthlyFeeBase}
                onChange={(e) => setFinancialSettings({...financialSettings, monthlyFeeBase: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  غرامة التأخير (%)
                </label>
                <input
                  type="number"
                  value={financialSettings.lateFeePercentage}
                  onChange={(e) => setFinancialSettings({...financialSettings, lateFeePercentage: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  مهلة الدفع (أيام)
                </label>
                <input
                  type="number"
                  value={financialSettings.paymentDueDays}
                  onChange={(e) => setFinancialSettings({...financialSettings, paymentDueDays: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader 
            title="إعدادات الإشعارات"
            subtitle="تخصيص أنواع الإشعارات"
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                إشعارات البريد الإلكتروني
              </span>
              <button
                onClick={() => setNotificationSettings({...notificationSettings, emailNotifications: !notificationSettings.emailNotifications})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.emailNotifications ? 'bg-syndic-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.emailNotifications ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                إشعارات الرسائل النصية
              </span>
              <button
                onClick={() => setNotificationSettings({...notificationSettings, smsNotifications: !notificationSettings.smsNotifications})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.smsNotifications ? 'bg-syndic-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.smsNotifications ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                تذكير المدفوعات
              </span>
              <button
                onClick={() => setNotificationSettings({...notificationSettings, paymentReminders: !notificationSettings.paymentReminders})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.paymentReminders ? 'bg-syndic-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.paymentReminders ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                تحديثات الصيانة
              </span>
              <button
                onClick={() => setNotificationSettings({...notificationSettings, maintenanceUpdates: !notificationSettings.maintenanceUpdates})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notificationSettings.maintenanceUpdates ? 'bg-syndic-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notificationSettings.maintenanceUpdates ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader 
            title="إعدادات الأمان"
            subtitle="إعدادات الحماية والأمان"
          />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                المصادقة الثنائية
              </span>
              <button
                onClick={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  securitySettings.twoFactorAuth ? 'bg-syndic-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    securitySettings.twoFactorAuth ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                انتهاء الجلسة (دقيقة)
              </label>
              <input
                type="number"
                value={securitySettings.sessionTimeout}
                onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                انتهاء كلمة المرور (يوم)
              </label>
              <input
                type="number"
                value={securitySettings.passwordExpiry}
                onChange={(e) => setSecuritySettings({...securitySettings, passwordExpiry: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              />
            </div>
          </div>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader 
            title="إعدادات المظهر"
            subtitle="تخصيص واجهة النظام"
          />
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                اللغة
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as 'ar' | 'fr' | 'en')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="ar">العربية</option>
                <option value="fr">Français</option>
                <option value="en">English</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                الوضع الليلي
              </span>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isDark ? 'bg-syndic-600' : 'bg-gray-200 dark:bg-gray-700'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isDark ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* Payment Gateway Settings */}
        <Card>
          <CardHeader 
            title="بوابات الدفع"
            subtitle="إعدادات وسائل الدفع الإلكتروني"
          />
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-gray-900 dark:text-white">Stripe</span>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">متصل</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                بوابة دفع دولية تدعم البطاقات الائتمانية
              </p>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <CreditCard className="h-5 w-5 text-orange-600" />
                  <span className="font-medium text-gray-900 dark:text-white">CMI</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">غير متصل</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                بوابة الدفع المغربية للبطاقات المحلية
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
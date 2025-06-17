import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'ar' | 'fr' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.apartments': 'الشقق',
    'nav.billing': 'الفوترة',
    'nav.expenses': 'المصاريف',
    'nav.maintenance': 'الصيانة',
    'nav.meetings': 'الاجتماعات',
    'nav.announcements': 'الإعلانات',
    'nav.reports': 'التقارير',
    'nav.users': 'المستخدمون',
    'nav.settings': 'الإعدادات',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.welcome': 'مرحباً بك في نظام إدارة السنديك',
    'dashboard.total_apartments': 'إجمالي الشقق',
    'dashboard.total_owners': 'إجمالي الملاك',
    'dashboard.collection_rate': 'نسبة التحصيل',
    'dashboard.pending_maintenance': 'صيانة معلقة',
    'dashboard.recent_activities': 'الأنشطة الحديثة',
    'dashboard.monthly_revenue': 'الإيرادات الشهرية',
    'dashboard.expenses_overview': 'نظرة عامة على المصاريف',
    
    // Common
    'common.search': 'بحث...',
    'common.add': 'إضافة',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.status': 'الحالة',
    'common.date': 'التاريخ',
    'common.amount': 'المبلغ',
    'common.description': 'الوصف',
    'common.actions': 'الإجراءات',
    
    // Login
    'login.title': 'تسجيل الدخول',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.remember': 'تذكرني',
    'login.forgot_password': 'نسيت كلمة المرور؟',
    'login.sign_in': 'تسجيل الدخول',
    
    // User roles
    'role.admin': 'مدير السنديك',
    'role.owner': 'مالك',
    'role.tenant': 'مستأجر',
    'role.accountant': 'محاسب',
    'role.service_provider': 'مزود خدمة',
  },
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.apartments': 'Appartements',
    'nav.billing': 'Facturation',
    'nav.expenses': 'Dépenses',
    'nav.maintenance': 'Maintenance',
    'nav.meetings': 'Réunions',
    'nav.announcements': 'Annonces',
    'nav.reports': 'Rapports',
    'nav.users': 'Utilisateurs',
    'nav.settings': 'Paramètres',
    
    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.welcome': 'Bienvenue dans le système de gestion syndic',
    'dashboard.total_apartments': 'Total appartements',
    'dashboard.total_owners': 'Total propriétaires',
    'dashboard.collection_rate': 'Taux de recouvrement',
    'dashboard.pending_maintenance': 'Maintenance en attente',
    'dashboard.recent_activities': 'Activités récentes',
    'dashboard.monthly_revenue': 'Revenus mensuels',
    'dashboard.expenses_overview': 'Aperçu des dépenses',
    
    // Common
    'common.search': 'Rechercher...',
    'common.add': 'Ajouter',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.status': 'Statut',
    'common.date': 'Date',
    'common.amount': 'Montant',
    'common.description': 'Description',
    'common.actions': 'Actions',
    
    // Login
    'login.title': 'Connexion',
    'login.email': 'Email',
    'login.password': 'Mot de passe',
    'login.remember': 'Se souvenir de moi',
    'login.forgot_password': 'Mot de passe oublié?',
    'login.sign_in': 'Se connecter',
    
    // User roles
    'role.admin': 'Administrateur syndic',
    'role.owner': 'Propriétaire',
    'role.tenant': 'Locataire',
    'role.accountant': 'Comptable',
    'role.service_provider': 'Prestataire',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.apartments': 'Apartments',
    'nav.billing': 'Billing',
    'nav.expenses': 'Expenses',
    'nav.maintenance': 'Maintenance',
    'nav.meetings': 'Meetings',
    'nav.announcements': 'Announcements',
    'nav.reports': 'Reports',
    'nav.users': 'Users',
    'nav.settings': 'Settings',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.welcome': 'Welcome to Syndic Management System',
    'dashboard.total_apartments': 'Total Apartments',
    'dashboard.total_owners': 'Total Owners',
    'dashboard.collection_rate': 'Collection Rate',
    'dashboard.pending_maintenance': 'Pending Maintenance',
    'dashboard.recent_activities': 'Recent Activities',
    'dashboard.monthly_revenue': 'Monthly Revenue',
    'dashboard.expenses_overview': 'Expenses Overview',
    
    // Common
    'common.search': 'Search...',
    'common.add': 'Add',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.status': 'Status',
    'common.date': 'Date',
    'common.amount': 'Amount',
    'common.description': 'Description',
    'common.actions': 'Actions',
    
    // Login
    'login.title': 'Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.remember': 'Remember me',
    'login.forgot_password': 'Forgot password?',
    'login.sign_in': 'Sign In',
    
    // User roles
    'role.admin': 'Syndic Manager',
    'role.owner': 'Owner',
    'role.tenant': 'Tenant',
    'role.accountant': 'Accountant',
    'role.service_provider': 'Service Provider',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('ar');
  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.className = lang === 'ar' ? 'font-arabic' : 'font-latin';
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  useEffect(() => {
    setLanguage(language);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
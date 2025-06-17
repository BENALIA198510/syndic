import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiCall } from '../hooks/useApi';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'OWNER' | 'TENANT' | 'ACCOUNTANT' | 'SERVICE_PROVIDER';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for development
const mockUsers = [
  {
    id: '1',
    name: 'أحمد محمد العلوي',
    email: 'admin@syndic.ma',
    role: 'ADMIN' as const,
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: '2',
    name: 'فاطمة الزهراء',
    email: 'fatima.zahra@email.com',
    role: 'OWNER' as const,
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: '3',
    name: 'يوسف بنعلي',
    email: 'youssef.benali@email.com',
    role: 'OWNER' as const
  },
  {
    id: '4',
    name: 'محمد الإدريسي',
    email: 'mohammed.idriss@email.com',
    role: 'TENANT' as const
  },
  {
    id: '5',
    name: 'خديجة الحسني',
    email: 'khadija.hasni@email.com',
    role: 'ACCOUNTANT' as const
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token
    const token = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // For development, use mock authentication
      const foundUser = mockUsers.find(u => u.email === email);
      if (foundUser && password === 'password') {
        const token = 'mock_token_' + Date.now();
        localStorage.setItem('auth_token', token);
        localStorage.setItem('auth_user', JSON.stringify(foundUser));
        setUser(foundUser);
        return;
      }

      // In production, this would call the real API
      // const response = await apiCall<{ user: User; token: string }>('/api/auth/login', {
      //   method: 'POST',
      //   body: { email, password }
      // });
      // 
      // localStorage.setItem('auth_token', response.token);
      // localStorage.setItem('auth_user', JSON.stringify(response.user));
      // setUser(response.user);

      throw new Error('بيانات الاعتماد غير صحيحة');
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
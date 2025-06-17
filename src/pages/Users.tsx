import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Shield, User, Mail, Phone, Calendar } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'owner' | 'tenant' | 'accountant' | 'service_provider';
  status: 'active' | 'inactive' | 'pending';
  apartmentNumber?: string;
  dateJoined: string;
  lastLogin?: string;
  avatar?: string;
  permissions?: string[];
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'أحمد محمد العلوي',
    email: 'admin@syndic.ma',
    phone: '+212 6 12 34 56 78',
    role: 'admin',
    status: 'active',
    dateJoined: '2023-01-15',
    lastLogin: '2024-01-25',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'فاطمة الزهراء',
    email: 'fatima.zahra@email.com',
    phone: '+212 6 11 22 33 44',
    role: 'owner',
    status: 'active',
    apartmentNumber: '1B',
    dateJoined: '2023-02-20',
    lastLogin: '2024-01-24',
    avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
  },
  {
    id: '3',
    name: 'يوسف بنعلي',
    email: 'youssef.benali@email.com',
    phone: '+212 6 55 66 77 88',
    role: 'owner',
    status: 'active',
    apartmentNumber: '2A',
    dateJoined: '2023-03-10',
    lastLogin: '2024-01-23'
  },
  {
    id: '4',
    name: 'محمد الإدريسي',
    email: 'mohammed.idriss@email.com',
    phone: '+212 6 87 65 43 21',
    role: 'tenant',
    status: 'active',
    apartmentNumber: '1A',
    dateJoined: '2023-06-15',
    lastLogin: '2024-01-22'
  },
  {
    id: '5',
    name: 'خديجة الحسني',
    email: 'khadija.hasni@email.com',
    phone: '+212 6 99 88 77 66',
    role: 'accountant',
    status: 'active',
    dateJoined: '2023-04-01',
    lastLogin: '2024-01-25',
    permissions: ['billing', 'expenses', 'reports']
  },
  {
    id: '6',
    name: 'محمد السباك',
    email: 'mohammed.plumber@email.com',
    phone: '+212 6 44 55 66 77',
    role: 'service_provider',
    status: 'active',
    dateJoined: '2023-08-20',
    lastLogin: '2024-01-20'
  },
  {
    id: '7',
    name: 'سعيد الجديد',
    email: 'said.new@email.com',
    phone: '+212 6 33 44 55 66',
    role: 'owner',
    status: 'pending',
    apartmentNumber: '3B',
    dateJoined: '2024-01-20'
  }
];

export default function Users() {
  const { t } = useLanguage();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (user.apartmentNumber && user.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return <Badge variant="danger">مدير السنديك</Badge>;
      case 'owner':
        return <Badge variant="info">مالك</Badge>;
      case 'tenant':
        return <Badge variant="default">مستأجر</Badge>;
      case 'accountant':
        return <Badge variant="warning">محاسب</Badge>;
      case 'service_provider':
        return <Badge variant="success">مزود خدمة</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">نشط</Badge>;
      case 'inactive':
        return <Badge variant="danger">غير نشط</Badge>;
      case 'pending':
        return <Badge variant="warning">معلق</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const stats = {
    total: users.length,
    active: users.filter(u => u.status === 'active').length,
    pending: users.filter(u => u.status === 'pending').length,
    owners: users.filter(u => u.role === 'owner').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.users')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة المستخدمين والصلاحيات
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إضافة مستخدم جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                إجمالي المستخدمين
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.total}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                مستخدمون نشطون
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.active}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                طلبات معلقة
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.pending}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <User className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                الملاك
              </p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {stats.owners}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث بالاسم أو البريد أو الشقة..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
            />
          </div>
          
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الأدوار</option>
            <option value="admin">مدير السنديك</option>
            <option value="owner">مالك</option>
            <option value="tenant">مستأجر</option>
            <option value="accountant">محاسب</option>
            <option value="service_provider">مزود خدمة</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="pending">معلق</option>
          </select>
        </div>
      </Card>

      {/* Users Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img
                  src={user.avatar || 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2'}
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </h3>
                  {user.apartmentNumber && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      شقة {user.apartmentNumber}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">{user.phone}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  انضم في {new Date(user.dateJoined).toLocaleDateString('ar-MA')}
                </span>
              </div>
              {user.lastLogin && (
                <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm">
                  <Shield className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    آخر دخول: {new Date(user.lastLogin).toLocaleDateString('ar-MA')}
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mb-4">
              {getRoleBadge(user.role)}
              {getStatusBadge(user.status)}
            </div>

            {user.permissions && user.permissions.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">الصلاحيات:</p>
                <div className="flex flex-wrap gap-1">
                  {user.permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      {permission === 'all' ? 'جميع الصلاحيات' : permission}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2 rtl:space-x-reverse">
                {user.status === 'pending' && (
                  <>
                    <Button size="sm" variant="outline">
                      قبول
                    </Button>
                    <Button size="sm" variant="danger">
                      رفض
                    </Button>
                  </>
                )}
                {user.status === 'active' && (
                  <Button size="sm" variant="outline">
                    عرض الملف
                  </Button>
                )}
              </div>
              <div className="text-xs text-gray-400">
                #{user.id}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا يوجد مستخدمون
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            لم يتم العثور على مستخدمين يطابقون معايير البحث
          </p>
        </Card>
      )}
    </div>
  );
}
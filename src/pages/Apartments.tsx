import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, User, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ApartmentForm } from '../components/forms/ApartmentForm';
import { useToast } from '../components/ui/Toast';

interface Apartment {
  id: string;
  number: string;
  floor: number;
  size: number;
  rooms: number;
  owner: {
    name: string;
    phone: string;
    email: string;
    avatar?: string;
  };
  tenant?: {
    name: string;
    phone: string;
    email: string;
  };
  status: 'occupied' | 'vacant' | 'maintenance';
  monthlyFee: number;
  balance: number;
}

const mockApartments: Apartment[] = [
  {
    id: '1',
    number: '1A',
    floor: 1,
    size: 85,
    rooms: 3,
    owner: {
      name: 'أحمد محمد العلوي',
      phone: '+212 6 12 34 56 78',
      email: 'ahmed.alaoui@email.com',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    tenant: {
      name: 'محمد الإدريسي',
      phone: '+212 6 87 65 43 21',
      email: 'mohammed.idriss@email.com'
    },
    status: 'occupied',
    monthlyFee: 2500,
    balance: 0
  },
  {
    id: '2',
    number: '1B',
    floor: 1,
    size: 95,
    rooms: 4,
    owner: {
      name: 'فاطمة الزهراء',
      phone: '+212 6 11 22 33 44',
      email: 'fatima.zahra@email.com',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    status: 'occupied',
    monthlyFee: 2800,
    balance: -5600
  },
  {
    id: '3',
    number: '2A',
    floor: 2,
    size: 75,
    rooms: 2,
    owner: {
      name: 'يوسف بنعلي',
      phone: '+212 6 55 66 77 88',
      email: 'youssef.benali@email.com'
    },
    status: 'vacant',
    monthlyFee: 2200,
    balance: 2200
  },
  {
    id: '4',
    number: '2B',
    floor: 2,
    size: 90,
    rooms: 3,
    owner: {
      name: 'خديجة الحسني',
      phone: '+212 6 99 88 77 66',
      email: 'khadija.hasni@email.com'
    },
    status: 'maintenance',
    monthlyFee: 2600,
    balance: 0
  },
];

export default function Apartments() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [apartments, setApartments] = useState<Apartment[]>(mockApartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | null>(null);

  const filteredApartments = apartments.filter(apartment => {
    const matchesSearch = apartment.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apartment.owner.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || apartment.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddApartment = () => {
    setEditingApartment(null);
    setIsFormOpen(true);
  };

  const handleEditApartment = (apartment: Apartment) => {
    setEditingApartment(apartment);
    setIsFormOpen(true);
  };

  const handleDeleteApartment = (apartmentId: string) => {
    if (confirm('هل أنت متأكد من حذف هذه الشقة؟')) {
      setApartments(prev => prev.filter(apt => apt.id !== apartmentId));
      showToast('تم حذف الشقة بنجاح', 'success');
    }
  };

  const handleFormSubmit = (formData: any) => {
    if (editingApartment) {
      // Update existing apartment
      setApartments(prev => prev.map(apt => 
        apt.id === editingApartment.id 
          ? { ...apt, ...formData }
          : apt
      ));
    } else {
      // Add new apartment
      const newApartment: Apartment = {
        id: Date.now().toString(),
        ...formData,
        owner: {
          name: 'مالك جديد',
          phone: '+212 6 00 00 00 00',
          email: 'owner@email.com'
        },
        balance: 0
      };
      setApartments(prev => [...prev, newApartment]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'occupied':
        return <Badge variant="success">مؤجرة</Badge>;
      case 'vacant':
        return <Badge variant="warning">شاغرة</Badge>;
      case 'maintenance':
        return <Badge variant="danger">صيانة</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getBalanceColor = (balance: number) => {
    if (balance < 0) return 'text-red-600 dark:text-red-400';
    if (balance > 0) return 'text-orange-600 dark:text-orange-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.apartments')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة الشقق والملاك والمستأجرين
          </p>
        </div>
        <Button onClick={handleAddApartment}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة شقة جديدة
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="البحث بالرقم أو اسم المالك..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              />
            </div>
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="occupied">مؤجرة</option>
            <option value="vacant">شاغرة</option>
            <option value="maintenance">صيانة</option>
          </select>
        </div>
      </Card>

      {/* Apartments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredApartments.map((apartment) => (
          <Card key={apartment.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  شقة {apartment.number}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  الطابق {apartment.floor} • {apartment.size} م² • {apartment.rooms} غرف
                </p>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {getStatusBadge(apartment.status)}
                <Button variant="ghost" size="sm" onClick={() => handleEditApartment(apartment)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => handleDeleteApartment(apartment.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Owner Info */}
            <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-2">
                <img
                  src={apartment.owner.avatar || 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2'}
                  alt={apartment.owner.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    المالك: {apartment.owner.name}
                  </p>
                </div>
              </div>
              <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Phone className="h-3 w-3" />
                  <span>{apartment.owner.phone}</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Mail className="h-3 w-3" />
                  <span>{apartment.owner.email}</span>
                </div>
              </div>
            </div>

            {/* Tenant Info */}
            {apartment.tenant && (
              <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  المستأجر: {apartment.tenant.name}
                </p>
                <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Phone className="h-3 w-3" />
                    <span>{apartment.tenant.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Mail className="h-3 w-3" />
                    <span>{apartment.tenant.email}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Financial Info */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">الرسوم الشهرية</p>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {apartment.monthlyFee.toLocaleString()} درهم
                </p>
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-600 dark:text-gray-400">الرصيد</p>
                <p className={`font-semibold ${getBalanceColor(apartment.balance)}`}>
                  {apartment.balance === 0 ? 'مسدد' : `${apartment.balance.toLocaleString()} درهم`}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredApartments.length === 0 && (
        <Card className="text-center py-12">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا توجد شقق
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            لم يتم العثور على شقق تطابق معايير البحث
          </p>
        </Card>
      )}

      <ApartmentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        apartment={editingApartment}
      />
    </div>
  );
}
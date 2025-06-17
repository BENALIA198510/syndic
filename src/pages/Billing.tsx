import React, { useState } from 'react';
import { Plus, Search, Download, Eye, Send, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { BillForm } from '../components/forms/BillForm';
import { useToast } from '../components/ui/Toast';

interface Bill {
  id: string;
  apartmentNumber: string;
  ownerName: string;
  amount: number;
  dueDate: string;
  issueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  type: 'monthly' | 'maintenance' | 'special';
  description: string;
  paidDate?: string;
  paymentMethod?: string;
}

const mockBills: Bill[] = [
  {
    id: '1',
    apartmentNumber: '1A',
    ownerName: 'أحمد محمد العلوي',
    amount: 2500,
    dueDate: '2024-01-15',
    issueDate: '2024-01-01',
    status: 'paid',
    type: 'monthly',
    description: 'رسوم شهر يناير 2024',
    paidDate: '2024-01-10',
    paymentMethod: 'بطاقة ائتمان'
  },
  {
    id: '2',
    apartmentNumber: '1B',
    ownerName: 'فاطمة الزهراء',
    amount: 2800,
    dueDate: '2024-01-15',
    issueDate: '2024-01-01',
    status: 'overdue',
    type: 'monthly',
    description: 'رسوم شهر يناير 2024'
  },
  {
    id: '3',
    apartmentNumber: '2A',
    ownerName: 'يوسف بنعلي',
    amount: 2200,
    dueDate: '2024-01-30',
    issueDate: '2024-01-15',
    status: 'pending',
    type: 'monthly',
    description: 'رسوم شهر يناير 2024'
  },
  {
    id: '4',
    apartmentNumber: '3A',
    ownerName: 'خديجة الحسني',
    amount: 5000,
    dueDate: '2024-02-01',
    issueDate: '2024-01-20',
    status: 'pending',
    type: 'special',
    description: 'صيانة المصعد - حصة'
  },
];

export default function Billing() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingBill, setEditingBill] = useState<Bill | null>(null);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.ownerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || bill.status === selectedStatus;
    const matchesType = selectedType === 'all' || bill.type === selectedType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleAddBill = () => {
    setEditingBill(null);
    setIsFormOpen(true);
  };

  const handleEditBill = (bill: Bill) => {
    setEditingBill(bill);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (editingBill) {
      setBills(prev => prev.map(bill => 
        bill.id === editingBill.id 
          ? { ...bill, ...formData }
          : bill
      ));
    } else {
      const newBill: Bill = {
        id: Date.now().toString(),
        ...formData,
        issueDate: new Date().toISOString().split('T')[0],
        status: 'pending' as const,
        ownerName: 'مالك الشقة ' + formData.apartmentNumber
      };
      setBills(prev => [...prev, newBill]);
    }
  };

  const handleMarkAsPaid = (billId: string) => {
    setBills(prev => prev.map(bill => 
      bill.id === billId 
        ? { 
            ...bill, 
            status: 'paid' as const, 
            paidDate: new Date().toISOString().split('T')[0],
            paymentMethod: 'نقداً'
          }
        : bill
    ));
    showToast('تم تسجيل الدفع بنجاح', 'success');
  };

  const handleSendReminder = (billId: string) => {
    showToast('تم إرسال تذكير الدفع بنجاح', 'success');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">مدفوع</Badge>;
      case 'pending':
        return <Badge variant="warning">معلق</Badge>;
      case 'overdue':
        return <Badge variant="danger">متأخر</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'monthly':
        return 'رسوم شهرية';
      case 'maintenance':
        return 'صيانة';
      case 'special':
        return 'رسوم خاصة';
      default:
        return type;
    }
  };

  const totalAmount = filteredBills.reduce((sum, bill) => sum + bill.amount, 0);
  const paidAmount = filteredBills.filter(bill => bill.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0);
  const pendingAmount = filteredBills.filter(bill => bill.status !== 'paid').reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.billing')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة الفواتير والمدفوعات
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Button variant="outline">
            <Download className="h-4 w-4 ml-2" />
            تصدير
          </Button>
          <Button onClick={handleAddBill}>
            <Plus className="h-4 w-4 ml-2" />
            فاتورة جديدة
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                إجمالي الفواتير
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalAmount.toLocaleString()} درهم
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                المبلغ المحصل
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {paidAmount.toLocaleString()} درهم
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <AlertCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                المبلغ المعلق
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {pendingAmount.toLocaleString()} درهم
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
              placeholder="البحث بالشقة أو اسم المالك..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
            />
          </div>
          
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="paid">مدفوع</option>
            <option value="pending">معلق</option>
            <option value="overdue">متأخر</option>
          </select>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الأنواع</option>
            <option value="monthly">رسوم شهرية</option>
            <option value="maintenance">صيانة</option>
            <option value="special">رسوم خاصة</option>
          </select>
        </div>
      </Card>

      {/* Bills Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الشقة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  المالك
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  النوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  المبلغ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  تاريخ الاستحقاق
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  إجراءات
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {bill.apartmentNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {bill.ownerName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {getTypeLabel(bill.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {bill.amount.toLocaleString()} درهم
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(bill.dueDate).toLocaleDateString('ar-MA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(bill.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button variant="ghost" size="sm" onClick={() => handleEditBill(bill)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      {bill.status !== 'paid' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleSendReminder(bill.id)}
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleMarkAsPaid(bill.id)}
                          >
                            تسجيل دفع
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {filteredBills.length === 0 && (
        <Card className="text-center py-12">
          <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا توجد فواتير
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            لم يتم العثور على فواتير تطابق معايير البحث
          </p>
        </Card>
      )}

      <BillForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        bill={editingBill}
      />
    </div>
  );
}
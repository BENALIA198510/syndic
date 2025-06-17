import React, { useState } from 'react';
import { Plus, Search, Download, Edit, Trash2, Receipt, TrendingUp, TrendingDown } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string;
  vendor: string;
  status: 'pending' | 'approved' | 'paid';
  approvedBy?: string;
  receiptUrl?: string;
}

const mockExpenses: Expense[] = [
  {
    id: '1',
    description: 'صيانة المصعد الرئيسي',
    amount: 15000,
    category: 'الصيانة',
    date: '2024-01-15',
    vendor: 'شركة المصاعد المغربية',
    status: 'paid',
    approvedBy: 'أحمد محمد'
  },
  {
    id: '2',
    description: 'فاتورة الكهرباء - يناير',
    amount: 8500,
    category: 'الكهرباء',
    date: '2024-01-20',
    vendor: 'المكتب الوطني للكهرباء',
    status: 'paid'
  },
  {
    id: '3',
    description: 'خدمات النظافة الشهرية',
    amount: 4200,
    category: 'النظافة',
    date: '2024-01-25',
    vendor: 'شركة النظافة الحديثة',
    status: 'approved',
    approvedBy: 'فاطمة العلوي'
  },
  {
    id: '4',
    description: 'تجديد عقد شركة الأمن',
    amount: 12000,
    category: 'الأمن',
    date: '2024-01-28',
    vendor: 'شركة الحراسة المغربية',
    status: 'pending'
  },
];

const expensesByCategory = [
  { name: 'الصيانة', value: 35, amount: 15000, color: '#0088FE' },
  { name: 'النظافة', value: 25, amount: 4200, color: '#00C49F' },
  { name: 'الكهرباء', value: 20, amount: 8500, color: '#FFBB28' },
  { name: 'الأمن', value: 15, amount: 12000, color: '#FF8042' },
  { name: 'أخرى', value: 5, amount: 2100, color: '#8884d8' },
];

const monthlyExpenses = [
  { month: 'أكتوبر', amount: 35000 },
  { month: 'نوفمبر', amount: 42000 },
  { month: 'ديسمبر', amount: 38000 },
  { month: 'يناير', amount: 45000 },
  { month: 'فبراير', amount: 41000 },
  { month: 'مارس', amount: 48000 },
];

export default function Expenses() {
  const { t } = useLanguage();
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || expense.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || expense.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">مدفوع</Badge>;
      case 'approved':
        return <Badge variant="info">معتمد</Badge>;
      case 'pending':
        return <Badge variant="warning">معلق</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const paidExpenses = filteredExpenses.filter(expense => expense.status === 'paid').reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = filteredExpenses.filter(expense => expense.status === 'pending').reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.expenses')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة ومتابعة مصاريف العمارة
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Button variant="outline">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
          <Button>
            <Plus className="h-4 w-4 ml-2" />
            إضافة مصروف
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Receipt className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                إجمالي المصاريف
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalExpenses.toLocaleString()} درهم
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingDown className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                المصاريف المدفوعة
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {paidExpenses.toLocaleString()} درهم
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                المصاريف المعلقة
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {pendingExpenses.toLocaleString()} درهم
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expense Categories Chart */}
        <Card>
          <CardHeader 
            title="توزيع المصاريف حسب الفئة"
            subtitle="نسبة المصاريف لكل فئة"
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [
                  `${props.payload.amount.toLocaleString()} درهم`,
                  props.payload.name
                ]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Monthly Expenses Chart */}
        <Card>
          <CardHeader 
            title="المصاريف الشهرية"
            subtitle="تطور المصاريف خلال الأشهر الماضية"
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyExpenses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value.toLocaleString()} درهم`, 'المصاريف']} />
                <Bar dataKey="amount" fill="#2B4C8C" />
              </BarChart>
            </ResponsiveContainer>
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
              placeholder="البحث في الوصف أو المورد..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الفئات</option>
            <option value="الصيانة">الصيانة</option>
            <option value="النظافة">النظافة</option>
            <option value="الكهرباء">الكهرباء</option>
            <option value="الأمن">الأمن</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="paid">مدفوع</option>
            <option value="approved">معتمد</option>
            <option value="pending">معلق</option>
          </select>
        </div>
      </Card>

      {/* Expenses Table */}
      <Card padding={false}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الوصف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الفئة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  المورد
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  المبلغ
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  التاريخ
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
              {filteredExpenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    <div>
                      <p className="font-medium">{expense.description}</p>
                      {expense.approvedBy && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          معتمد من: {expense.approvedBy}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {expense.vendor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {expense.amount.toLocaleString()} درهم
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(expense.date).toLocaleDateString('ar-MA')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(expense.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      {expense.receiptUrl && (
                        <Button variant="ghost" size="sm">
                          <Receipt className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
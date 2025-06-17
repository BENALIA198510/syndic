import React, { useState } from 'react';
import { Download, TrendingUp, TrendingDown, DollarSign, Users, Building2, Calendar } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const monthlyFinancials = [
  { month: 'يوليو', revenue: 42000, expenses: 28000, profit: 14000 },
  { month: 'أغسطس', revenue: 45000, expenses: 32000, profit: 13000 },
  { month: 'سبتمبر', revenue: 48000, expenses: 29000, profit: 19000 },
  { month: 'أكتوبر', revenue: 44000, expenses: 35000, profit: 9000 },
  { month: 'نوفمبر', revenue: 47000, expenses: 31000, profit: 16000 },
  { month: 'ديسمبر', revenue: 51000, expenses: 38000, profit: 13000 },
  { month: 'يناير', revenue: 49000, expenses: 33000, profit: 16000 },
];

const collectionRates = [
  { month: 'يوليو', rate: 85 },
  { month: 'أغسطس', rate: 88 },
  { month: 'سبتمبر', rate: 92 },
  { month: 'أكتوبر', rate: 87 },
  { month: 'نوفمبر', rate: 90 },
  { month: 'ديسمبر', rate: 89 },
  { month: 'يناير', rate: 93 },
];

const expenseBreakdown = [
  { category: 'الصيانة', amount: 15000, percentage: 35, color: '#0088FE' },
  { category: 'النظافة', amount: 8000, percentage: 20, color: '#00C49F' },
  { category: 'الكهرباء', amount: 6000, percentage: 15, color: '#FFBB28' },
  { category: 'الأمن', amount: 10000, percentage: 25, color: '#FF8042' },
  { category: 'أخرى', amount: 2000, percentage: 5, color: '#8884d8' },
];

const maintenanceStats = [
  { month: 'يوليو', completed: 12, pending: 3 },
  { month: 'أغسطس', completed: 15, pending: 2 },
  { month: 'سبتمبر', completed: 18, pending: 4 },
  { month: 'أكتوبر', completed: 14, pending: 5 },
  { month: 'نوفمبر', completed: 16, pending: 3 },
  { month: 'ديسمبر', completed: 20, pending: 2 },
  { month: 'يناير', completed: 13, pending: 6 },
];

export default function Reports() {
  const { t } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedYear, setSelectedYear] = useState('2024');

  const currentMonth = monthlyFinancials[monthlyFinancials.length - 1];
  const previousMonth = monthlyFinancials[monthlyFinancials.length - 2];
  
  const revenueChange = ((currentMonth.revenue - previousMonth.revenue) / previousMonth.revenue * 100).toFixed(1);
  const expenseChange = ((currentMonth.expenses - previousMonth.expenses) / previousMonth.expenses * 100).toFixed(1);
  const profitChange = ((currentMonth.profit - previousMonth.profit) / previousMonth.profit * 100).toFixed(1);

  const currentCollectionRate = collectionRates[collectionRates.length - 1].rate;
  const previousCollectionRate = collectionRates[collectionRates.length - 2].rate;
  const collectionChange = (currentCollectionRate - previousCollectionRate).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.reports')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            تقارير مالية وإحصائيات شاملة
          </p>
        </div>
        <div className="flex space-x-3 rtl:space-x-reverse">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="monthly">شهري</option>
            <option value="quarterly">ربع سنوي</option>
            <option value="yearly">سنوي</option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
          <Button>
            <Download className="h-4 w-4 ml-2" />
            تصدير التقرير
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                الإيرادات الشهرية
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentMonth.revenue.toLocaleString()} درهم
              </p>
              <div className="flex items-center mt-1">
                {parseFloat(revenueChange) >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 ml-1" />
                )}
                <span className={`text-sm ${parseFloat(revenueChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {revenueChange}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                المصاريف الشهرية
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentMonth.expenses.toLocaleString()} درهم
              </p>
              <div className="flex items-center mt-1">
                {parseFloat(expenseChange) >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-red-500 ml-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500 ml-1" />
                )}
                <span className={`text-sm ${parseFloat(expenseChange) >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                  {expenseChange}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                صافي الربح
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentMonth.profit.toLocaleString()} درهم
              </p>
              <div className="flex items-center mt-1">
                {parseFloat(profitChange) >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 ml-1" />
                )}
                <span className={`text-sm ${parseFloat(profitChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profitChange}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                نسبة التحصيل
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentCollectionRate}%
              </p>
              <div className="flex items-center mt-1">
                {parseFloat(collectionChange) >= 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500 ml-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500 ml-1" />
                )}
                <span className={`text-sm ${parseFloat(collectionChange) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {collectionChange}%
                </span>
              </div>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Users className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader 
            title="نظرة عامة مالية"
            subtitle="الإيرادات والمصاريف والأرباح الشهرية"
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyFinancials}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value.toLocaleString()} درهم`,
                    name === 'revenue' ? 'الإيرادات' : name === 'expenses' ? 'المصاريف' : 'الربح'
                  ]}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stackId="1"
                  stroke="#2B4C8C" 
                  fill="#2B4C8C"
                  fillOpacity={0.6}
                  name="revenue"
                />
                <Area 
                  type="monotone" 
                  dataKey="expenses" 
                  stackId="2"
                  stroke="#EF4444" 
                  fill="#EF4444"
                  fillOpacity={0.6}
                  name="expenses"
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stackId="3"
                  stroke="#10B981" 
                  fill="#10B981"
                  fillOpacity={0.6}
                  name="profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader 
            title="نسبة التحصيل الشهرية"
            subtitle="تطور نسبة تحصيل الرسوم"
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={collectionRates}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'نسبة التحصيل']} />
                <Line 
                  type="monotone" 
                  dataKey="rate" 
                  stroke="#F97316" 
                  strokeWidth={3}
                  dot={{ fill: '#F97316', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Expense Breakdown and Maintenance Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader 
            title="توزيع المصاريف"
            subtitle="تفصيل المصاريف حسب الفئة"
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="amount"
                  label={({ category, percentage }) => `${category} ${percentage}%`}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value.toLocaleString()} درهم`, 'المبلغ']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {expenseBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-600 dark:text-gray-400">{item.category}</span>
                </div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {item.amount.toLocaleString()} درهم
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader 
            title="إحصائيات الصيانة"
            subtitle="طلبات الصيانة المكتملة والمعلقة"
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={maintenanceStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value} طلب`,
                    name === 'completed' ? 'مكتمل' : 'معلق'
                  ]}
                />
                <Bar dataKey="completed" fill="#10B981" name="completed" />
                <Bar dataKey="pending" fill="#F59E0B" name="pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Summary Table */}
      <Card>
        <CardHeader 
          title="ملخص مالي تفصيلي"
          subtitle="البيانات المالية الشهرية"
        />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الشهر
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  الإيرادات
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  المصاريف
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  صافي الربح
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  هامش الربح
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {monthlyFinancials.map((month, index) => {
                const profitMargin = ((month.profit / month.revenue) * 100).toFixed(1);
                return (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {month.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 dark:text-green-400 font-medium">
                      {month.revenue.toLocaleString()} درهم
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 dark:text-red-400 font-medium">
                      {month.expenses.toLocaleString()} درهم
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {month.profit.toLocaleString()} درهم
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {profitMargin}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
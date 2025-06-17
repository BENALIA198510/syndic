import React from 'react';
import { Building2, Users, TrendingUp, Wrench, DollarSign, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

const monthlyRevenue = [
  { month: 'يناير', revenue: 45000, expenses: 32000 },
  { month: 'فبراير', revenue: 48000, expenses: 28000 },
  { month: 'مارس', revenue: 52000, expenses: 35000 },
  { month: 'أبريل', revenue: 47000, expenses: 30000 },
  { month: 'مايو', revenue: 53000, expenses: 33000 },
  { month: 'يونيو', revenue: 51000, expenses: 31000 },
];

const expenseCategories = [
  { name: 'الصيانة', value: 35, color: '#0088FE' },
  { name: 'النظافة', value: 25, color: '#00C49F' },
  { name: 'الكهرباء', value: 20, color: '#FFBB28' },
  { name: 'الأمن', value: 15, color: '#FF8042' },
  { name: 'أخرى', value: 5, color: '#8884d8' },
];

const recentActivities = [
  { id: 1, type: 'payment', user: 'أحمد محمد', action: 'دفع رسوم شهر يونيو', amount: 2500, time: 'منذ ساعتين' },
  { id: 2, type: 'maintenance', user: 'فاطمة العلوي', action: 'طلب صيانة مصعد', apartment: '3A', time: 'منذ 4 ساعات' },
  { id: 3, type: 'meeting', user: 'محمد الأحمدي', action: 'جدولة اجتماع عام', date: '15 يوليو', time: 'منذ يوم' },
  { id: 4, type: 'announcement', user: 'إدارة المبنى', action: 'إعلان صيانة الخزانات', time: 'منذ يومين' },
];

export default function Dashboard() {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('dashboard.total_apartments'),
      value: '24',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      change: '+2 هذا الشهر'
    },
    {
      title: t('dashboard.total_owners'),
      value: '18',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900',
      change: 'مستقر'
    },
    {
      title: t('dashboard.collection_rate'),
      value: '87%',
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
      change: '+5% من الشهر الماضي'
    },
    {
      title: t('dashboard.pending_maintenance'),
      value: '3',
      icon: Wrench,
      color: 'text-red-600',
      bgColor: 'bg-red-100 dark:bg-red-900',
      change: '-2 من الأسبوع الماضي'
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-syndic-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">{t('dashboard.welcome')}</h1>
        <p className="text-syndic-100">
          نظرة شاملة على أداء العمارة ومعلومات هامة للسنديك
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="mr-4 flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {stat.change}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Chart */}
        <Card>
          <CardHeader 
            title={t('dashboard.monthly_revenue')}
            subtitle="الإيرادات والمصاريف الشهرية"
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value.toLocaleString()} درهم`,
                    name === 'revenue' ? 'الإيرادات' : 'المصاريف'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#2B4C8C" 
                  strokeWidth={2}
                  name="revenue"
                />
                <Line 
                  type="monotone" 
                  dataKey="expenses" 
                  stroke="#EF4444" 
                  strokeWidth={2}
                  name="expenses"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Expenses Breakdown */}
        <Card>
          <CardHeader 
            title={t('dashboard.expenses_overview')}
            subtitle="توزيع المصاريف حسب الفئة"
          />
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseCategories}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {expenseCategories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'النسبة']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader 
          title={t('dashboard.recent_activities')}
          subtitle="آخر الأنشطة في النظام"
        />
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-shrink-0">
                {activity.type === 'payment' && (
                  <div className="h-8 w-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                )}
                {activity.type === 'maintenance' && (
                  <div className="h-8 w-8 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                    <Wrench className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  </div>
                )}
                {activity.type === 'meeting' && (
                  <div className="h-8 w-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                )}
                {activity.type === 'announcement' && (
                  <div className="h-8 w-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {activity.user}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activity.action}
                  {activity.amount && ` - ${activity.amount.toLocaleString()} درهم`}
                  {activity.apartment && ` - شقة ${activity.apartment}`}
                  {activity.date && ` - ${activity.date}`}
                </p>
              </div>
              <div className="flex-shrink-0">
                <p className="text-xs text-gray-400">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
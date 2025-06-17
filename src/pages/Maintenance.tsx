import React, { useState } from 'react';
import { Plus, Search, Eye, MessageSquare, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MaintenanceForm } from '../components/forms/MaintenanceForm';
import { useToast } from '../components/ui/Toast';

interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  apartmentNumber: string;
  requesterName: string;
  requesterPhone: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'new' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  category: string;
  dateCreated: string;
  dateAssigned?: string;
  dateCompleted?: string;
  assignedTo?: string;
  estimatedCost?: number;
  actualCost?: number;
  images?: string[];
  notes?: string;
}

const mockRequests: MaintenanceRequest[] = [
  {
    id: '1',
    title: 'تسرب مياه في الحمام',
    description: 'يوجد تسرب مياه من الصنبور الرئيسي في الحمام، المياه تتسرب باستمرار',
    apartmentNumber: '2A',
    requesterName: 'يوسف بنعلي',
    requesterPhone: '+212 6 55 66 77 88',
    priority: 'high',
    status: 'in_progress',
    category: 'السباكة',
    dateCreated: '2024-01-20',
    dateAssigned: '2024-01-21',
    assignedTo: 'محمد السباك',
    estimatedCost: 800,
    images: [
      'https://images.pexels.com/photos/4792078/pexels-photo-4792078.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&dpr=2'
    ]
  },
  {
    id: '2',
    title: 'عطل في المصعد',
    description: 'المصعد لا يعمل، يتوقف في الطابق الثاني ولا يستجيب للأزرار',
    apartmentNumber: 'عام',
    requesterName: 'فاطمة الزهراء',
    requesterPhone: '+212 6 11 22 33 44',
    priority: 'urgent',
    status: 'assigned',
    category: 'المصاعد',
    dateCreated: '2024-01-22',
    dateAssigned: '2024-01-22',
    assignedTo: 'شركة المصاعد المغربية',
    estimatedCost: 2500
  },
  {
    id: '3',
    title: 'إصلاح باب الشقة',
    description: 'الباب الخارجي للشقة لا يغلق بشكل صحيح، يحتاج إلى إصلاح المقبض والأقفال',
    apartmentNumber: '1B',
    requesterName: 'فاطمة الزهراء',
    requesterPhone: '+212 6 11 22 33 44',
    priority: 'medium',
    status: 'completed',
    category: 'النجارة',
    dateCreated: '2024-01-15',
    dateAssigned: '2024-01-16',
    dateCompleted: '2024-01-18',
    assignedTo: 'أحمد النجار',
    estimatedCost: 600,
    actualCost: 550
  },
  {
    id: '4',
    title: 'تنظيف البلاط المكسور',
    description: 'بلاط مكسور في الممر الرئيسي يحتاج إلى تنظيف واستبدال',
    apartmentNumber: 'عام',
    requesterName: 'إدارة المبنى',
    requesterPhone: '+212 5 22 11 33 44',
    priority: 'low',
    status: 'new',
    category: 'التنظيف',
    dateCreated: '2024-01-25'
  },
];

export default function Maintenance() {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState<MaintenanceRequest | null>(null);

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.apartmentNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requesterName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority;
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || request.category === selectedCategory;
    return matchesSearch && matchesPriority && matchesStatus && matchesCategory;
  });

  const handleAddRequest = () => {
    setEditingRequest(null);
    setIsFormOpen(true);
  };

  const handleEditRequest = (request: MaintenanceRequest) => {
    setEditingRequest(request);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (formData: any) => {
    if (editingRequest) {
      setRequests(prev => prev.map(req => 
        req.id === editingRequest.id 
          ? { ...req, ...formData }
          : req
      ));
    } else {
      const newRequest: MaintenanceRequest = {
        id: Date.now().toString(),
        ...formData,
        requesterName: 'المستخدم الحالي',
        requesterPhone: '+212 6 00 00 00 00',
        status: 'new' as const,
        dateCreated: new Date().toISOString().split('T')[0]
      };
      setRequests(prev => [...prev, newRequest]);
    }
  };

  const handleStatusChange = (requestId: string, newStatus: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { 
            ...req, 
            status: newStatus as any,
            ...(newStatus === 'completed' ? { dateCompleted: new Date().toISOString().split('T')[0] } : {})
          }
        : req
    ));
    showToast('تم تحديث حالة الطلب بنجاح', 'success');
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="danger">عاجل</Badge>;
      case 'high':
        return <Badge variant="warning">عالي</Badge>;
      case 'medium':
        return <Badge variant="info">متوسط</Badge>;
      case 'low':
        return <Badge variant="default">منخفض</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="info">جديد</Badge>;
      case 'assigned':
        return <Badge variant="warning">مُكلف</Badge>;
      case 'in_progress':
        return <Badge variant="warning">قيد التنفيذ</Badge>;
      case 'completed':
        return <Badge variant="success">مكتمل</Badge>;
      case 'cancelled':
        return <Badge variant="danger">ملغى</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new':
        return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'assigned':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in_progress':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const stats = {
    total: requests.length,
    new: requests.filter(r => r.status === 'new').length,
    inProgress: requests.filter(r => r.status === 'in_progress' || r.status === 'assigned').length,
    completed: requests.filter(r => r.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.maintenance')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة طلبات الصيانة والإصلاحات
          </p>
        </div>
        <Button onClick={handleAddRequest}>
          <Plus className="h-4 w-4 ml-2" />
          طلب صيانة جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <AlertCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                إجمالي الطلبات
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
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                مكتملة
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {stats.completed}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                قيد التنفيذ
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.inProgress}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
              <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                طلبات جديدة
              </p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                {stats.new}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="البحث في الطلبات..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
            />
          </div>
          
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الأولويات</option>
            <option value="urgent">عاجل</option>
            <option value="high">عالي</option>
            <option value="medium">متوسط</option>
            <option value="low">منخفض</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="new">جديد</option>
            <option value="assigned">مُكلف</option>
            <option value="in_progress">قيد التنفيذ</option>
            <option value="completed">مكتمل</option>
          </select>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الفئات</option>
            <option value="السباكة">السباكة</option>
            <option value="الكهرباء">الكهرباء</option>
            <option value="المصاعد">المصاعد</option>
            <option value="النجارة">النجارة</option>
            <option value="التنظيف">التنظيف</option>
          </select>
        </div>
      </Card>

      {/* Maintenance Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRequests.map((request) => (
          <Card key={request.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                {getStatusIcon(request.status)}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {request.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    شقة {request.apartmentNumber} • {request.category}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                {getPriorityBadge(request.priority)}
                {getStatusBadge(request.status)}
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
              {request.description}
            </p>

            {request.images && request.images.length > 0 && (
              <div className="mb-4">
                <img
                  src={request.images[0]}
                  alt="صورة الطلب"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">الطالب:</span>
                <span className="text-gray-900 dark:text-white">{request.requesterName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 dark:text-gray-400">تاريخ الطلب:</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date(request.dateCreated).toLocaleDateString('ar-MA')}
                </span>
              </div>
              {request.assignedTo && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">مُكلف إلى:</span>
                  <span className="text-gray-900 dark:text-white">{request.assignedTo}</span>
                </div>
              )}
              {request.estimatedCost && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">التكلفة المقدرة:</span>
                  <span className="text-gray-900 dark:text-white">
                    {request.estimatedCost.toLocaleString()} درهم
                  </span>
                </div>
              )}
              {request.actualCost && (
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">التكلفة الفعلية:</span>
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    {request.actualCost.toLocaleString()} درهم
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm" onClick={() => handleEditRequest(request)}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                {request.status !== 'completed' && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStatusChange(request.id, 'completed')}
                  >
                    إكمال
                  </Button>
                )}
              </div>
              <div className="text-xs text-gray-400">
                #{request.id}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <Card className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا توجد طلبات صيانة
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            لم يتم العثور على طلبات تطابق معايير البحث
          </p>
        </Card>
      )}

      <MaintenanceForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        request={editingRequest}
      />
    </div>
  );
}
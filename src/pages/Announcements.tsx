import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, Megaphone, Pin, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  dateCreated: string;
  dateExpiry?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  isPinned: boolean;
  isActive: boolean;
  targetAudience: 'all' | 'owners' | 'tenants' | 'specific_floor';
  targetFloor?: number;
  attachments?: string[];
  views: number;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'صيانة الخزانات - انقطاع المياه',
    content: 'نعلمكم أنه سيتم إجراء صيانة دورية للخزانات يوم الأحد القادم من الساعة 9 صباحاً حتى 3 عصراً. سيكون هناك انقطاع في المياه خلال هذه الفترة. نرجو التخطيط مسبقاً وتخزين المياه اللازمة.',
    author: 'إدارة المبنى',
    dateCreated: '2024-01-25',
    dateExpiry: '2024-02-01',
    priority: 'high',
    category: 'صيانة',
    isPinned: true,
    isActive: true,
    targetAudience: 'all',
    views: 45
  },
  {
    id: '2',
    title: 'تحديث قوانين استخدام المصعد',
    content: 'تم تحديث قوانين استخدام المصعد لضمان السلامة والراحة للجميع. يرجى عدم استخدام المصعد لنقل المواد الثقيلة دون إشعار مسبق. كما يرجى الحفاظ على نظافة المصعد.',
    author: 'لجنة الإدارة',
    dateCreated: '2024-01-20',
    priority: 'medium',
    category: 'قوانين',
    isPinned: false,
    isActive: true,
    targetAudience: 'all',
    views: 32
  },
  {
    id: '3',
    title: 'اجتماع الملاك الشهري',
    content: 'يسرنا دعوتكم لحضور الاجتماع الشهري للملاك يوم الخميس 15 فبراير في تمام الساعة 7 مساءً بقاعة الاجتماعات. سيتم مناقشة الميزانية الشهرية وخطط الصيانة القادمة.',
    author: 'أحمد محمد - رئيس السنديك',
    dateCreated: '2024-01-22',
    dateExpiry: '2024-02-15',
    priority: 'high',
    category: 'اجتماعات',
    isPinned: true,
    isActive: true,
    targetAudience: 'owners',
    attachments: ['جدول_الأعمال.pdf'],
    views: 28
  },
  {
    id: '4',
    title: 'تحسينات الأمن - كاميرات جديدة',
    content: 'تم تركيب كاميرات مراقبة جديدة في المدخل الرئيسي وموقف السيارات لتعزيز الأمن. الكاميرات تعمل على مدار الساعة وتسجل بجودة عالية.',
    author: 'شركة الأمن المغربية',
    dateCreated: '2024-01-18',
    priority: 'medium',
    category: 'أمن',
    isPinned: false,
    isActive: true,
    targetAudience: 'all',
    views: 67
  },
  {
    id: '5',
    title: 'تنبيه للطابق الثالث - أعمال دهان',
    content: 'سيتم إجراء أعمال دهان للممر في الطابق الثالث يومي الاثنين والثلاثاء. قد تكون هناك رائحة دهان، يرجى إغلاق النوافذ والأبواب خلال هذه الفترة.',
    author: 'فريق الصيانة',
    dateCreated: '2024-01-24',
    dateExpiry: '2024-01-30',
    priority: 'low',
    category: 'صيانة',
    isPinned: false,
    isActive: true,
    targetAudience: 'specific_floor',
    targetFloor: 3,
    views: 12
  }
];

export default function Announcements() {
  const { t } = useLanguage();
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');

  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || announcement.priority === selectedPriority;
    const matchesCategory = selectedCategory === 'all' || announcement.category === selectedCategory;
    const matchesAudience = selectedAudience === 'all' || announcement.targetAudience === selectedAudience;
    return matchesSearch && matchesPriority && matchesCategory && matchesAudience && announcement.isActive;
  });

  // Sort by pinned first, then by date
  const sortedAnnouncements = filteredAnnouncements.sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime();
  });

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

  const getAudienceLabel = (audience: string, floor?: number) => {
    switch (audience) {
      case 'all':
        return 'جميع السكان';
      case 'owners':
        return 'الملاك فقط';
      case 'tenants':
        return 'المستأجرون فقط';
      case 'specific_floor':
        return `الطابق ${floor}`;
      default:
        return audience;
    }
  };

  const totalAnnouncements = announcements.filter(a => a.isActive).length;
  const pinnedAnnouncements = announcements.filter(a => a.isPinned && a.isActive).length;
  const totalViews = announcements.reduce((sum, a) => sum + a.views, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.announcements')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة الإعلانات والتنبيهات للسكان
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          إعلان جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Megaphone className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                إجمالي الإعلانات
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalAnnouncements}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Pin className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                إعلانات مثبتة
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {pinnedAnnouncements}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Eye className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                إجمالي المشاهدات
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {totalViews}
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
              placeholder="البحث في الإعلانات..."
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
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الفئات</option>
            <option value="صيانة">صيانة</option>
            <option value="قوانين">قوانين</option>
            <option value="اجتماعات">اجتماعات</option>
            <option value="أمن">أمن</option>
            <option value="عام">عام</option>
          </select>

          <select
            value={selectedAudience}
            onChange={(e) => setSelectedAudience(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الجماهير</option>
            <option value="all">جميع السكان</option>
            <option value="owners">الملاك فقط</option>
            <option value="tenants">المستأجرون فقط</option>
            <option value="specific_floor">طابق محدد</option>
          </select>
        </div>
      </Card>

      {/* Announcements List */}
      <div className="space-y-4">
        {sortedAnnouncements.map((announcement) => (
          <Card key={announcement.id} className={`hover:shadow-lg transition-shadow ${announcement.isPinned ? 'ring-2 ring-orange-200 dark:ring-orange-800' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  {announcement.isPinned && (
                    <Pin className="h-4 w-4 text-orange-500" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {announcement.title}
                  </h3>
                  {getPriorityBadge(announcement.priority)}
                  <Badge variant="default">{announcement.category}</Badge>
                </div>
                <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400 mb-3">
                  <span>بواسطة: {announcement.author}</span>
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Clock className="h-3 w-3" />
                    <span>{new Date(announcement.dateCreated).toLocaleDateString('ar-MA')}</span>
                  </span>
                  <span className="flex items-center space-x-1 rtl:space-x-reverse">
                    <Eye className="h-3 w-3" />
                    <span>{announcement.views} مشاهدة</span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
              {announcement.content}
            </p>

            {announcement.attachments && announcement.attachments.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">المرفقات:</p>
                <div className="flex flex-wrap gap-2">
                  {announcement.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                      <span>{attachment}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                <span>الجمهور: {getAudienceLabel(announcement.targetAudience, announcement.targetFloor)}</span>
                {announcement.dateExpiry && (
                  <span>ينتهي: {new Date(announcement.dateExpiry).toLocaleDateString('ar-MA')}</span>
                )}
              </div>
              <div className="text-xs text-gray-400">
                #{announcement.id}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sortedAnnouncements.length === 0 && (
        <Card className="text-center py-12">
          <Megaphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا توجد إعلانات
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            لم يتم العثور على إعلانات تطابق معايير البحث
          </p>
        </Card>
      )}
    </div>
  );
}
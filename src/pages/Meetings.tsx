import React, { useState } from 'react';
import { Plus, Calendar, Clock, Users, FileText, Vote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card, CardHeader } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: 'general' | 'emergency' | 'committee';
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  attendees: number;
  totalInvited: number;
  agenda: string[];
  documents?: string[];
  votes?: {
    id: string;
    question: string;
    options: string[];
    results?: { [key: string]: number };
    status: 'active' | 'closed';
  }[];
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'الاجتماع العام الشهري',
    description: 'مناقشة الميزانية الشهرية وخطط الصيانة القادمة',
    date: '2024-02-15',
    time: '19:00',
    location: 'قاعة الاجتماعات - الطابق الأرضي',
    type: 'general',
    status: 'scheduled',
    attendees: 0,
    totalInvited: 18,
    agenda: [
      'مراجعة الميزانية الشهرية',
      'تقرير أعمال الصيانة المنجزة',
      'خطة الصيانة للشهر القادم',
      'مناقشة المقترحات الجديدة',
      'التصويت على المصاريف الطارئة'
    ],
    documents: ['ميزانية_يناير_2024.pdf', 'تقرير_الصيانة.pdf'],
    votes: [
      {
        id: '1',
        question: 'هل توافق على صيانة السطح بتكلفة 25,000 درهم؟',
        options: ['موافق', 'غير موافق', 'امتناع'],
        status: 'active'
      }
    ]
  },
  {
    id: '2',
    title: 'اجتماع طارئ - صيانة المصعد',
    description: 'مناقشة عطل المصعد الرئيسي والحاجة للإصلاح العاجل',
    date: '2024-01-28',
    time: '20:00',
    location: 'قاعة الاجتماعات - الطابق الأرضي',
    type: 'emergency',
    status: 'completed',
    attendees: 12,
    totalInvited: 18,
    agenda: [
      'تقييم حالة المصعد الحالية',
      'عروض أسعار شركات الصيانة',
      'التصويت على الشركة المختارة',
      'تحديد مصدر التمويل'
    ],
    votes: [
      {
        id: '1',
        question: 'أي شركة تختار لصيانة المصعد؟',
        options: ['شركة المصاعد المغربية', 'شركة التقنية الحديثة', 'شركة الصيانة السريعة'],
        results: { 'شركة المصاعد المغربية': 8, 'شركة التقنية الحديثة': 3, 'شركة الصيانة السريعة': 1 },
        status: 'closed'
      }
    ]
  },
  {
    id: '3',
    title: 'اجتماع لجنة الأ��ن',
    description: 'مراجعة إجراءات الأمن وتقييم خدمات شركة الحراسة',
    date: '2024-02-05',
    time: '18:30',
    location: 'مكتب الإدارة',
    type: 'committee',
    status: 'completed',
    attendees: 5,
    totalInvited: 6,
    agenda: [
      'تقييم أداء شركة الحراسة',
      'مراجعة نظام الكاميرات',
      'اقتراحات تحسين الأمن',
      'الميزانية المخصصة للأمن'
    ]
  }
];

export default function Meetings() {
  const { t } = useLanguage();
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredMeetings = meetings.filter(meeting => {
    const matchesType = selectedType === 'all' || meeting.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || meeting.status === selectedStatus;
    return matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="info">مجدول</Badge>;
      case 'in_progress':
        return <Badge variant="warning">جاري</Badge>;
      case 'completed':
        return <Badge variant="success">مكتمل</Badge>;
      case 'cancelled':
        return <Badge variant="danger">ملغى</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'general':
        return <Badge variant="default">عام</Badge>;
      case 'emergency':
        return <Badge variant="danger">طارئ</Badge>;
      case 'committee':
        return <Badge variant="info">لجنة</Badge>;
      default:
        return <Badge>{type}</Badge>;
    }
  };

  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled').length;
  const completedMeetings = meetings.filter(m => m.status === 'completed').length;
  const activeVotes = meetings.reduce((count, meeting) => {
    return count + (meeting.votes?.filter(v => v.status === 'active').length || 0);
  }, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('nav.meetings')}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            إدارة الاجتماعات والتصويت الإلكتروني
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 ml-2" />
          جدولة اجتماع جديد
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                اجتماعات قادمة
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {upcomingMeetings}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                اجتماعات مكتملة
              </p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {completedMeetings}
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Vote className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="mr-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                تصويتات نشطة
              </p>
              <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {activeVotes}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الأنواع</option>
            <option value="general">اجتماع عام</option>
            <option value="emergency">اجتماع طارئ</option>
            <option value="committee">اجتماع لجنة</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">جميع الحالات</option>
            <option value="scheduled">مجدول</option>
            <option value="in_progress">جاري</option>
            <option value="completed">مكتمل</option>
            <option value="cancelled">ملغى</option>
          </select>
        </div>
      </Card>

      {/* Meetings List */}
      <div className="space-y-6">
        {filteredMeetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {meeting.title}
                  </h3>
                  {getTypeBadge(meeting.type)}
                  {getStatusBadge(meeting.status)}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2">
                  {meeting.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  {new Date(meeting.date).toLocaleDateString('ar-MA')}
                </span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  {meeting.time}
                </span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  {meeting.attendees}/{meeting.totalInvited} حضور
                </span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">المكان:</p>
              <p className="text-gray-900 dark:text-white">{meeting.location}</p>
            </div>

            {/* Agenda */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">جدول الأعمال:</h4>
              <ul className="space-y-1">
                {meeting.agenda.map((item, index) => (
                  <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                    <span className="text-syndic-600 ml-2">{index + 1}.</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Documents */}
            {meeting.documents && meeting.documents.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">المستندات:</h4>
                <div className="flex flex-wrap gap-2">
                  {meeting.documents.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-1 rtl:space-x-reverse bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
                      <FileText className="h-3 w-3" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Votes */}
            {meeting.votes && meeting.votes.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">التصويتات:</h4>
                <div className="space-y-3">
                  {meeting.votes.map((vote) => (
                    <div key={vote.id} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {vote.question}
                        </p>
                        <Badge variant={vote.status === 'active' ? 'success' : 'default'}>
                          {vote.status === 'active' ? 'نشط' : 'مغلق'}
                        </Badge>
                      </div>
                      {vote.results ? (
                        <div className="space-y-1">
                          {Object.entries(vote.results).map(([option, count]) => (
                            <div key={option} className="flex justify-between text-xs">
                              <span className="text-gray-600 dark:text-gray-400">{option}</span>
                              <span className="font-medium text-gray-900 dark:text-white">{count} صوت</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex space-x-2 rtl:space-x-reverse">
                          {vote.options.map((option, index) => (
                            <Button key={index} variant="outline" size="sm">
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Button variant="outline" size="sm">
                  عرض التفاصيل
                </Button>
                {meeting.status === 'scheduled' && (
                  <Button size="sm">
                    انضمام للاجتماع
                  </Button>
                )}
              </div>
              <div className="text-xs text-gray-400">
                #{meeting.id}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <Card className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            لا توجد اجتماعات
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            لم يتم العثور على اجتماعات تطابق معايير البحث
          </p>
        </Card>
      )}
    </div>
  );
}
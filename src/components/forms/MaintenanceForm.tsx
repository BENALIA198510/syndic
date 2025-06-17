import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';

interface MaintenanceFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  request?: any;
}

export function MaintenanceForm({ isOpen, onClose, onSubmit, request }: MaintenanceFormProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    title: request?.title || '',
    description: request?.description || '',
    apartmentNumber: request?.apartmentNumber || '',
    priority: request?.priority || 'MEDIUM',
    category: request?.category || 'عام'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.apartmentNumber) {
      showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }

    onSubmit(formData);
    showToast(request ? 'تم تحديث طلب الصيانة بنجاح' : 'تم إنشاء طلب الصيانة بنجاح', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={request ? 'تعديل طلب الصيانة' : 'طلب صيانة جديد'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            عنوان الطلب *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
            placeholder="مثال: تسرب مياه في الحمام"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              رقم الشقة *
            </label>
            <input
              type="text"
              value={formData.apartmentNumber}
              onChange={(e) => setFormData({ ...formData, apartmentNumber: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              placeholder="مثال: 1A أو عام"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الأولوية
            </label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="LOW">منخفض</option>
              <option value="MEDIUM">متوسط</option>
              <option value="HIGH">عالي</option>
              <option value="URGENT">عاجل</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            الفئة
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="السباكة">السباكة</option>
            <option value="الكهرباء">الكهرباء</option>
            <option value="المصاعد">المصاعد</option>
            <option value="النجارة">النجارة</option>
            <option value="التنظيف">التنظيف</option>
            <option value="عام">عام</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            وصف المشكلة *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
            rows={4}
            placeholder="اشرح المشكلة بالتفصيل..."
            required
          />
        </div>

        <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="submit">
            {request ? 'تحديث' : 'إرسال الطلب'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
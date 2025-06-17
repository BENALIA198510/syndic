import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';

interface ApartmentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  apartment?: any;
}

export function ApartmentForm({ isOpen, onClose, onSubmit, apartment }: ApartmentFormProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    number: apartment?.number || '',
    floor: apartment?.floor || 1,
    size: apartment?.size || 0,
    rooms: apartment?.rooms || 1,
    monthlyFee: apartment?.monthlyFee || 2500,
    status: apartment?.status || 'OCCUPIED'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.number || formData.size <= 0) {
      showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }

    onSubmit(formData);
    showToast(apartment ? 'تم تحديث الشقة بنجاح' : 'تم إضافة الشقة بنجاح', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={apartment ? 'تعديل الشقة' : 'إضافة شقة جديدة'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              رقم الشقة *
            </label>
            <input
              type="text"
              value={formData.number}
              onChange={(e) => setFormData({ ...formData, number: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              placeholder="مثال: 1A"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              الطابق *
            </label>
            <input
              type="number"
              value={formData.floor}
              onChange={(e) => setFormData({ ...formData, floor: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              min="0"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              المساحة (م²) *
            </label>
            <input
              type="number"
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              min="0"
              step="0.1"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              عدد الغرف *
            </label>
            <input
              type="number"
              value={formData.rooms}
              onChange={(e) => setFormData({ ...formData, rooms: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              min="1"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            الرسوم الشهرية (درهم) *
          </label>
          <input
            type="number"
            value={formData.monthlyFee}
            onChange={(e) => setFormData({ ...formData, monthlyFee: parseFloat(e.target.value) })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
            min="0"
            step="0.01"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            حالة الشقة
          </label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="OCCUPIED">مؤجرة</option>
            <option value="VACANT">شاغرة</option>
            <option value="MAINTENANCE">صيانة</option>
          </select>
        </div>

        <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="submit">
            {apartment ? 'تحديث' : 'إضافة'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
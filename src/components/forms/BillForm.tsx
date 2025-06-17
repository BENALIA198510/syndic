import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useToast } from '../ui/Toast';

interface BillFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  bill?: any;
}

export function BillForm({ isOpen, onClose, onSubmit, bill }: BillFormProps) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    apartmentNumber: bill?.apartmentNumber || '',
    amount: bill?.amount || 0,
    dueDate: bill?.dueDate || '',
    type: bill?.type || 'MONTHLY',
    description: bill?.description || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.apartmentNumber || formData.amount <= 0 || !formData.dueDate) {
      showToast('يرجى ملء جميع الحقول المطلوبة', 'error');
      return;
    }

    onSubmit(formData);
    showToast(bill ? 'تم تحديث الفاتورة بنجاح' : 'تم إنشاء الفاتورة بنجاح', 'success');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={bill ? 'تعديل الفاتورة' : 'إنشاء فاتورة جديدة'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            رقم الشقة *
          </label>
          <input
            type="text"
            value={formData.apartmentNumber}
            onChange={(e) => setFormData({ ...formData, apartmentNumber: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
            placeholder="مثال: 1A"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              المبلغ (درهم) *
            </label>
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
              min="0"
              step="0.01"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              تاريخ الاستحقاق *
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            نوع الفاتورة
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="MONTHLY">رسوم شهرية</option>
            <option value="MAINTENANCE">صيانة</option>
            <option value="SPECIAL">رسوم خاصة</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            الوصف *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-syndic-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-right"
            rows={3}
            placeholder="وصف الفاتورة..."
            required
          />
        </div>

        <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            إلغاء
          </Button>
          <Button type="submit">
            {bill ? 'تحديث' : 'إنشاء'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
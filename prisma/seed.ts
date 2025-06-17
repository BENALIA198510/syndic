import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 بدء إدخال البيانات التجريبية...');

  // إنشاء كلمة مرور مشفرة
  const hashedPassword = await bcrypt.hash('password', 10);

  // إنشاء المستخدمين
  const admin = await prisma.user.create({
    data: {
      email: 'admin@syndic.ma',
      password: hashedPassword,
      name: 'أحمد محمد العلوي',
      phone: '+212 6 12 34 56 78',
      role: 'ADMIN',
      status: 'ACTIVE',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  });

  const owner1 = await prisma.user.create({
    data: {
      email: 'fatima.zahra@email.com',
      password: hashedPassword,
      name: 'فاطمة الزهراء',
      phone: '+212 6 11 22 33 44',
      role: 'OWNER',
      status: 'ACTIVE',
      avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  });

  const owner2 = await prisma.user.create({
    data: {
      email: 'youssef.benali@email.com',
      password: hashedPassword,
      name: 'يوسف بنعلي',
      phone: '+212 6 55 66 77 88',
      role: 'OWNER',
      status: 'ACTIVE'
    }
  });

  const tenant = await prisma.user.create({
    data: {
      email: 'mohammed.idriss@email.com',
      password: hashedPassword,
      name: 'محمد الإدريسي',
      phone: '+212 6 87 65 43 21',
      role: 'TENANT',
      status: 'ACTIVE'
    }
  });

  const accountant = await prisma.user.create({
    data: {
      email: 'khadija.hasni@email.com',
      password: hashedPassword,
      name: 'خديجة الحسني',
      phone: '+212 6 99 88 77 66',
      role: 'ACCOUNTANT',
      status: 'ACTIVE'
    }
  });

  // إنشاء الشقق
  const apartment1 = await prisma.apartment.create({
    data: {
      number: '1A',
      floor: 1,
      size: 85,
      rooms: 3,
      status: 'OCCUPIED',
      monthlyFee: 2500,
      ownerId: owner1.id
    }
  });

  const apartment2 = await prisma.apartment.create({
    data: {
      number: '1B',
      floor: 1,
      size: 95,
      rooms: 4,
      status: 'OCCUPIED',
      monthlyFee: 2800,
      ownerId: owner1.id
    }
  });

  const apartment3 = await prisma.apartment.create({
    data: {
      number: '2A',
      floor: 2,
      size: 75,
      rooms: 2,
      status: 'VACANT',
      monthlyFee: 2200,
      ownerId: owner2.id
    }
  });

  // إنشاء الفواتير
  await prisma.bill.createMany({
    data: [
      {
        amount: 2500,
        dueDate: new Date('2024-01-15'),
        status: 'PAID',
        type: 'MONTHLY',
        description: 'رسوم شهر يناير 2024',
        apartmentId: apartment1.id,
        ownerId: owner1.id,
        paidDate: new Date('2024-01-10'),
        paymentMethod: 'بطاقة ائتمان'
      },
      {
        amount: 2800,
        dueDate: new Date('2024-01-15'),
        status: 'OVERDUE',
        type: 'MONTHLY',
        description: 'رسوم شهر يناير 2024',
        apartmentId: apartment2.id,
        ownerId: owner1.id
      },
      {
        amount: 2200,
        dueDate: new Date('2024-01-30'),
        status: 'PENDING',
        type: 'MONTHLY',
        description: 'رسوم شهر يناير 2024',
        apartmentId: apartment3.id,
        ownerId: owner2.id
      }
    ]
  });

  // إنشاء المصاريف
  await prisma.expense.createMany({
    data: [
      {
        description: 'صيانة المصعد الرئيسي',
        amount: 15000,
        category: 'الصيانة',
        vendor: 'شركة المصاعد المغربية',
        status: 'PAID',
        createdById: admin.id
      },
      {
        description: 'فاتورة الكهرباء - يناير',
        amount: 8500,
        category: 'الكهرباء',
        vendor: 'المكتب الوطني للكهرباء',
        status: 'PAID',
        createdById: admin.id
      },
      {
        description: 'خدمات النظافة الشهرية',
        amount: 4200,
        category: 'النظافة',
        vendor: 'شركة النظافة الحديثة',
        status: 'APPROVED',
        approvedBy: 'فاطمة العلوي',
        createdById: admin.id
      }
    ]
  });

  // إنشاء طلبات الصيانة
  await prisma.maintenanceRequest.createMany({
    data: [
      {
        title: 'تسرب مياه في الحمام',
        description: 'يوجد تسرب مياه من الصنبور الرئيسي في الحمام، المياه تتسرب باستمرار',
        priority: 'HIGH',
        status: 'IN_PROGRESS',
        category: 'السباكة',
        estimatedCost: 800,
        assignedTo: 'محمد السباك',
        apartmentId: apartment3.id,
        requesterId: owner2.id
      },
      {
        title: 'إصلاح باب الشقة',
        description: 'الباب الخارجي للشقة لا يغلق بشكل صحيح، يحتاج إلى إصلاح المقبض والأقفال',
        priority: 'MEDIUM',
        status: 'COMPLETED',
        category: 'النجارة',
        estimatedCost: 600,
        actualCost: 550,
        assignedTo: 'أحمد النجار',
        apartmentId: apartment2.id,
        requesterId: owner1.id,
        completedAt: new Date('2024-01-18')
      }
    ]
  });

  // إنشاء الإعلانات
  await prisma.announcement.createMany({
    data: [
      {
        title: 'صيانة الخزانات - انقطاع المياه',
        content: 'نعلمكم أنه سيتم إجراء صيانة دورية للخزانات يوم الأحد القادم من الساعة 9 صباحاً حتى 3 عصراً. سيكون هناك انقطاع في المياه خلال هذه الفترة.',
        priority: 'HIGH',
        category: 'صيانة',
        isPinned: true,
        targetAudience: 'ALL',
        views: 45,
        expiryDate: new Date('2024-02-01'),
        authorId: admin.id
      },
      {
        title: 'اجتماع الملاك الشهري',
        content: 'يسرنا دعوتكم لحضور الاجتماع الشهري للملاك يوم الخميس 15 فبراير في تمام الساعة 7 مساءً بقاعة الاجتماعات.',
        priority: 'HIGH',
        category: 'اجتماعات',
        isPinned: true,
        targetAudience: 'OWNERS',
        views: 28,
        expiryDate: new Date('2024-02-15'),
        authorId: admin.id
      }
    ]
  });

  // إنشاء الاجتماعات
  const meeting = await prisma.meeting.create({
    data: {
      title: 'الاجتماع العام الشهري',
      description: 'مناقشة الميزانية الشهرية وخطط الصيانة القادمة',
      date: new Date('2024-02-15'),
      time: '19:00',
      location: 'قاعة الاجتماعات - الطابق الأرضي',
      type: 'GENERAL',
      status: 'SCHEDULED',
      agenda: [
        'مراجعة الميزانية الشهرية',
        'تقرير أعمال الصيانة المنجزة',
        'خطة الصيانة للشهر القادم',
        'مناقشة المقترحات الجديدة'
      ]
    }
  });

  // إنشاء التصويتات
  await prisma.meetingVote.create({
    data: {
      question: 'هل توافق على صيانة السطح بتكلفة 25,000 درهم؟',
      options: ['موافق', 'غير موافق', 'امتناع'],
      status: 'ACTIVE',
      meetingId: meeting.id
    }
  });

  // إنشاء الإشعارات
  await prisma.notification.createMany({
    data: [
      {
        title: 'فاتورة جديدة',
        message: 'تم إصدار فاتورة جديدة لشهر فبراير',
        type: 'INFO',
        userId: owner1.id
      },
      {
        title: 'طلب صيانة مكتمل',
        message: 'تم إكمال طلب صيانة الباب بنجاح',
        type: 'SUCCESS',
        userId: owner1.id
      }
    ]
  });

  console.log('✅ تم إدخال البيانات التجريبية بنجاح!');
  console.log('📧 بيانات تسجيل الدخول:');
  console.log('   المدير: admin@syndic.ma / password');
  console.log('   المالك: fatima.zahra@email.com / password');
}

main()
  .catch((e) => {
    console.error('❌ خطأ في إدخال البيانات:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
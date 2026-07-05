import { 
  TranslationSet, 
  GymMember, 
  MembershipPlan, 
  Exercise, 
  WorkoutPlan, 
  ClassSchedule, 
  AttendanceRecord, 
  MealLog, 
  PaymentRecord, 
  Trainer 
} from './types';

export const translations: Record<'en' | 'ar', TranslationSet> = {
  en: {
    dashboard: "Dashboard",
    members: "Members",
    memberships: "Memberships",
    workoutPlans: "Workout Plans",
    exercises: "Exercises",
    schedules: "Schedules",
    attendance: "Attendance",
    nutrition: "Nutrition Plans",
    progressTracking: "Progress Tracking",
    payments: "Payments",
    trainers: "Trainers",
    settings: "Settings",
    
    // Dashboard Metrics
    activeMembers: "Active Members",
    newMembers: "New Members",
    revenue: "Total Revenue",
    attendanceToday: "Attendance Today",
    caloriesBurned: "Calories Burned",
    membershipRenewals: "Membership Renewals",
    pendingPayments: "Pending Payments",
    todaysClasses: "Today's Classes",
    
    // Quick Actions
    add: "Add New",
    edit: "Edit",
    delete: "Delete",
    save: "Save Changes",
    cancel: "Cancel",
    search: "Search...",
    filter: "Filter",
    all: "All",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    actions: "Actions",
    viewDetails: "View Details",
    loading: "Loading data...",
    noData: "No records found",
    success: "Success! Action completed.",
    error: "Error! Something went wrong."
  },
  ar: {
    dashboard: "لوحة التحكم",
    members: "الأعضاء",
    memberships: "الاشتراكات",
    workoutPlans: "الخطط التدريبية",
    exercises: "التمارين",
    schedules: "الجداول والصفوف",
    attendance: "تسجيل الحضور",
    nutrition: "الأنظمة الغذائية",
    progressTracking: "تتبع التقدم",
    payments: "المدفوعات",
    trainers: "المدربون",
    settings: "الإعدادات",
    
    // Dashboard Metrics
    activeMembers: "الأعضاء النشطون",
    newMembers: "الأعضاء الجدد",
    revenue: "إجمالي الإيرادات",
    attendanceToday: "حضور اليوم",
    caloriesBurned: "السعرات المحروقة",
    membershipRenewals: "تجديد الاشتراكات",
    pendingPayments: "مدفوعات معلقة",
    todaysClasses: "حصص اليوم",
    
    // Quick Actions
    add: "إضافة جديد",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ التغييرات",
    cancel: "إلغاء",
    search: "بحث...",
    filter: "تصفية",
    all: "الكل",
    status: "الحالة",
    active: "نشط",
    inactive: "غير نشط",
    pending: "معلق",
    actions: "الإجراءات",
    viewDetails: "عرض التفاصيل",
    loading: "جاري التحميل...",
    noData: "لا توجد سجلات",
    success: "تمت العملية بنجاح!",
    error: "خطأ! حدث خطأ ما."
  }
};

export const initialMembers: GymMember[] = [
  {
    id: "MEM-101",
    nameEn: "Sarah Jenkins",
    nameAr: "سارة جينكينز",
    email: "sarah.j@example.com",
    phone: "+966 50 123 4567",
    status: "active",
    planTypeEn: "Premium Annual",
    planTypeAr: "السنوي المميز",
    registrationDate: "2026-01-15",
    expiryDate: "2027-01-14",
    gender: "female",
    photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    attendanceCount: 42,
    weight: 64,
    height: 168,
    bodyFat: 22.4,
    targetWeight: 60,
    bmi: 22.7,
    medicalNotesEn: "Slight knee fatigue, avoid heavy impact jumps.",
    medicalNotesAr: "إجهاد بسيط في الركبة، تجنب القفز عالي التأثير.",
    emergencyContact: "David Jenkins (+966 50 987 6543)"
  },
  {
    id: "MEM-102",
    nameEn: "Fahad Al-Otaibi",
    nameAr: "فهد العتيبي",
    email: "fahad.otaibi@example.com",
    phone: "+966 55 555 1234",
    status: "active",
    planTypeEn: "Quarterly Strength",
    planTypeAr: "ربع سنوي للقوة",
    registrationDate: "2026-05-10",
    expiryDate: "2026-08-09",
    gender: "male",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    attendanceCount: 28,
    weight: 85,
    height: 180,
    bodyFat: 18.5,
    targetWeight: 80,
    bmi: 26.2,
    medicalNotesEn: "No medical restrictions. Recovering well.",
    medicalNotesAr: "لا توجد قيود طبية. يتعافى بشكل جيد.",
    emergencyContact: "Ali Al-Otaibi (+966 55 444 3322)"
  },
  {
    id: "MEM-103",
    nameEn: "Amira Mansour",
    nameAr: "أميرة منصور",
    email: "amira.m@example.com",
    phone: "+966 56 789 0123",
    status: "active",
    planTypeEn: "Monthly Cardio",
    planTypeAr: "الشهري للكارديو",
    registrationDate: "2026-06-20",
    expiryDate: "2026-07-19",
    gender: "female",
    photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    attendanceCount: 11,
    weight: 72,
    height: 162,
    bodyFat: 28.1,
    targetWeight: 65,
    bmi: 27.4,
    medicalNotesEn: "Asthma inhaler required during high-intensity cardio.",
    medicalNotesAr: "مطلوب بخاخ الربو أثناء الكارديو عالي الكثافة.",
    emergencyContact: "Yaser Mansour (+966 56 111 2222)"
  },
  {
    id: "MEM-104",
    nameEn: "Khalid Al-Ghamdi",
    nameAr: "خالد الغامدي",
    email: "khalid.gh@example.com",
    phone: "+966 54 321 0987",
    status: "pending",
    planTypeEn: "Trial Pass",
    planTypeAr: "بطاقة تجريبية",
    registrationDate: "2026-07-02",
    expiryDate: "2026-07-09",
    gender: "male",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    attendanceCount: 1,
    weight: 98,
    height: 175,
    bodyFat: 32.0,
    targetWeight: 85,
    bmi: 32.0,
    medicalNotesEn: "High blood pressure, keep heart rate under 150 bpm.",
    medicalNotesAr: "ارتفاع ضغط الدم، حافظ على نبضات القلب أقل من 150 نبضة.",
    emergencyContact: "Reem Al-Ghamdi (+966 54 888 7766)"
  },
  {
    id: "MEM-105",
    nameEn: "Yasmine Al-Sayed",
    nameAr: "ياسمين السيد",
    email: "yasmine.s@example.com",
    phone: "+966 53 456 7890",
    status: "inactive",
    planTypeEn: "Monthly Gym Only",
    planTypeAr: "الشهري للصالات فقط",
    registrationDate: "2026-04-01",
    expiryDate: "2026-05-01",
    gender: "female",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    attendanceCount: 14,
    weight: 58,
    height: 165,
    bodyFat: 20.2,
    targetWeight: 58,
    bmi: 21.3,
    medicalNotesEn: "None.",
    medicalNotesAr: "لا يوجد.",
    emergencyContact: "Mona Al-Sayed (+966 53 111 9999)"
  }
];

export const initialPlans: MembershipPlan[] = [
  {
    id: "PLAN-1",
    nameEn: "Monthly Essential",
    nameAr: "الاشتراك الشهري الأساسي",
    price: 150,
    durationMonths: 1,
    featuresEn: ["Gym Floor Access", "Locker Room", "1 Trainer Intro Session", "Free Wi-Fi"],
    featuresAr: ["دخول صالة الرياضة", "غرفة تبديل الملابس", "جلسة توجيهية مع مدرب", "إنترنت مجاني"]
  },
  {
    id: "PLAN-2",
    nameEn: "Quarterly Elite Strength",
    nameAr: "ربع سنوي النخبة للقوة",
    price: 399,
    durationMonths: 3,
    featuresEn: ["Gym Floor Access", "All Group Classes Included", "5 Personal Training Sessions", "Body Composition Scan", "Nutrition Consultation"],
    featuresAr: ["دخول صالة الرياضة", "جميع الحصص الجماعية مشمولة", "5 جلسات تدريب شخصي", "تحليل مكونات الجسم (InBody)", "استشارة غذائية"],
    popular: true
  },
  {
    id: "PLAN-3",
    nameEn: "Annual Premium SaaS Access",
    nameAr: "الاشتراك السنوي الفاخر المتكامل",
    price: 1199,
    durationMonths: 12,
    featuresEn: ["24/7 Unlimited Gym Access", "Unlimited Classes & Workshops", "24 Personal Training Sessions", "Monthly Body Scans & Macro Plans", "Free Family Day Passes (4x/mo)", "VIP Recovery Lounge Access"],
    featuresAr: ["دخول غير محدود على مدار الساعة", "حصص وورش عمل غير محدودة", "24 جلسة تدريب شخصي", "تحليل جسم شهري وخطط تغذية", "بطاقات دخول عائلية مجانية (4x/شهر)", "دخول صالة الاستشفاء VIP"]
  }
];

export const initialExercises: Exercise[] = [
  {
    id: "EX-001",
    nameEn: "Barbell Back Squat",
    nameAr: "القرفصاء الخلفي بالبار (Squat)",
    categoryEn: "Strength",
    categoryAr: "قوة",
    equipmentEn: "Barbell & Rack",
    equipmentAr: "بار وحامل أوزان",
    difficulty: "Medium",
    instructionsEn: "Place barbell on upper back, feet shoulder-width apart. Lower your hips down and back while keeping chest upright. Drive back up.",
    instructionsAr: "ضع البار على الجزء العلوي من الظهر، القدمين بعرض الكتفين. اخفض وركيك لأسفل وللخلف مع إبقاء الصدر مرتفعاً. ادفع للأعلى.",
    imageUrl: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&q=80&w=300",
    durationMinutes: 10
  },
  {
    id: "EX-002",
    nameEn: "Dumbbell Bench Press",
    nameAr: "ضغط الصدر بالدمبل (Bench Press)",
    categoryEn: "Strength",
    categoryAr: "قوة",
    equipmentEn: "Dumbbells, Flat Bench",
    equipmentAr: "دمبلز، بنش مستوٍ",
    difficulty: "Medium",
    instructionsEn: "Lie on bench, press dumbbells up over chest. Lower dumbbells slowly to chest level, keeping elbows at 45 degrees. Push back to top.",
    instructionsAr: "استلقِ على البنش، واضغط بالدمبلز لأعلى فوق الصدر. اخفض الدمبلز ببطء إلى مستوى الصدر، مع الحفاظ على الكوع بزاوية 45 درجة.",
    imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300",
    durationMinutes: 8
  },
  {
    id: "EX-003",
    nameEn: "Treadmill HIIT Sprint",
    nameAr: "ركض هِيت على جهاز الجري (HIIT Sprint)",
    categoryEn: "Cardio",
    categoryAr: "كارديو",
    equipmentEn: "Treadmill",
    equipmentAr: "جهاز جري",
    difficulty: "Hard",
    instructionsEn: "Warm up for 3 mins. Sprint at 90% effort for 30 seconds, then recover at slow walk for 60 seconds. Repeat 8-10 times.",
    instructionsAr: "قم بالإحماء لمدة 3 دقائق. اركض بأقصى سرعة (90% من جهدك) لـ 30 ثانية، ثم استعد بالمشي البطيء لـ 60 ثانية. كرر 8-10 مرات.",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=300",
    durationMinutes: 20
  },
  {
    id: "EX-004",
    nameEn: "Cobra Stretch & Child's Pose",
    nameAr: "تمدد الكوبرا ووضعية الطفل",
    categoryEn: "Flexibility",
    categoryAr: "مرونة",
    equipmentEn: "Yoga Mat",
    equipmentAr: "سجادة يوجا",
    difficulty: "Easy",
    instructionsEn: "Lie face down, press hands to lift chest, stretching lower back (Cobra). Push hips back onto heels to stretch shoulders (Child's Pose).",
    instructionsAr: "استلقِ على بطنك، واضغط بيديك لرفع صدرك لتمديد أسفل الظهر (الكوبرا). ادفع وركيك للخلف نحو كعبيك لتمديد الكتفين (وضعية الطفل).",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=300",
    durationMinutes: 5
  },
  {
    id: "EX-005",
    nameEn: "Pull-Ups",
    nameAr: "تمرين العقلة (Pull-Ups)",
    categoryEn: "Bodyweight",
    categoryAr: "وزن الجسم",
    equipmentEn: "Pull-up Bar",
    equipmentAr: "عقلة",
    difficulty: "Hard",
    instructionsEn: "Hang from bar with hands slightly wider than shoulders. Pull chest up to the bar, lead with elbows. Lower under control.",
    instructionsAr: "تعلق من العارضة مع يدين أوسع قليلاً من الكتفين. اسحب صدرك لأعلى نحو العارضة، مع قيادة الحركة بالكوع. اخفض ببطء.",
    imageUrl: "https://images.unsplash.com/photo-1598971639058-fab3c3109a00?auto=format&fit=crop&q=80&w=300",
    durationMinutes: 12
  }
];

export const initialWorkoutPlans: WorkoutPlan[] = [
  {
    id: "WPL-1",
    titleEn: "Classic Hypertrophy (Muscle Gain)",
    titleAr: "تضخيم العضلات الكلاسيكي",
    difficultyEn: "Intermediate",
    difficultyAr: "متوسط",
    durationWeeks: 8,
    targetEn: "Symmetric Muscle Growth & Strength Base",
    targetAr: "نمو عضلي متناسق وبناء القوة الأساسية",
    exercises: [
      { id: "WE-1", exerciseId: "EX-001", sets: 4, reps: "8-10", restSeconds: 90, dayOfWeek: 1 }, // Mon
      { id: "WE-2", exerciseId: "EX-002", sets: 4, reps: "10-12", restSeconds: 75, dayOfWeek: 1 },
      { id: "WE-3", exerciseId: "EX-005", sets: 3, reps: "Max reps", restSeconds: 90, dayOfWeek: 3 } // Wed
    ]
  },
  {
    id: "WPL-2",
    titleEn: "Rapid Shred & Cardio Peak",
    titleAr: "التنشيف السريع وذروة اللياقة",
    difficultyEn: "Advanced",
    difficultyAr: "متقدم",
    durationWeeks: 6,
    targetEn: "Burn Fat, Increase Endurance & Stamina",
    targetAr: "حرق الدهون، وزيادة التحمل البدني والطاقة",
    exercises: [
      { id: "WE-4", exerciseId: "EX-003", sets: 1, reps: "20 Mins HIIT", restSeconds: 60, dayOfWeek: 2 }, // Tue
      { id: "WE-5", exerciseId: "EX-004", sets: 3, reps: "Stretch routine", restSeconds: 30, dayOfWeek: 4 } // Thu
    ]
  }
];

export const initialClasses: ClassSchedule[] = [
  {
    id: "CLS-1",
    classNameEn: "Spinning & Cardio Surge",
    classNameAr: "دراجات جماعية وتدفق كارديو",
    trainerNameEn: "Sarah Jenkins",
    trainerNameAr: "سارة جينكينز",
    timeSlot: "08:00 AM - 09:00 AM",
    dayOfWeek: 1, // Monday
    roomEn: "Studio A (Velo)",
    roomAr: "استوديو أ (درجات)",
    capacity: 25,
    enrolled: 18
  },
  {
    id: "CLS-2",
    classNameEn: "Power Yoga & Breathwork",
    classNameAr: "باور يوجا والتحكم بالتنفس",
    trainerNameEn: "Yasmine Al-Sayed",
    trainerNameAr: "ياسمين السيد",
    timeSlot: "10:30 AM - 11:30 AM",
    dayOfWeek: 2, // Tuesday
    roomEn: "Zen Room 3",
    roomAr: "غرفة الهدوء 3",
    capacity: 15,
    enrolled: 14
  },
  {
    id: "CLS-3",
    classNameEn: "Crossfit WOD Core",
    classNameAr: "كروس فت (تحدي اليوم)",
    trainerNameEn: "Fahad Al-Otaibi",
    trainerNameAr: "فهد العتيبي",
    timeSlot: "05:00 PM - 06:15 PM",
    dayOfWeek: 3, // Wednesday
    roomEn: "Main Iron Zone",
    roomAr: "المنطقة الحديدية الرئيسية",
    capacity: 20,
    enrolled: 19
  }
];

export const initialAttendance: AttendanceRecord[] = [
  {
    id: "ATT-1",
    memberId: "MEM-101",
    memberNameEn: "Sarah Jenkins",
    memberNameAr: "سارة جينكينز",
    date: "2026-07-04",
    checkInTime: "07:45 AM",
    checkOutTime: "09:15 AM",
    status: "present"
  },
  {
    id: "ATT-2",
    memberId: "MEM-102",
    memberNameEn: "Fahad Al-Otaibi",
    memberNameAr: "فهد العتيبي",
    date: "2026-07-04",
    checkInTime: "08:15 AM",
    status: "late"
  },
  {
    id: "ATT-3",
    memberId: "MEM-103",
    memberNameEn: "Amira Mansour",
    memberNameAr: "أميرة منصور",
    date: "2026-07-03",
    checkInTime: "06:02 PM",
    checkOutTime: "07:30 PM",
    status: "present"
  }
];

export const initialMealLogs: MealLog[] = [
  {
    id: "MEAL-1",
    memberId: "MEM-101",
    date: "2026-07-04",
    mealType: "breakfast",
    foodNameEn: "Avocado Toast & Egg Whites",
    foodNameAr: "توست الأفوكادو وبياض البيض",
    calories: 380,
    protein: 26,
    carbs: 35,
    fats: 14
  },
  {
    id: "MEAL-2",
    memberId: "MEM-101",
    date: "2026-07-04",
    mealType: "lunch",
    foodNameEn: "Grilled Chicken & Sweet Potato",
    foodNameAr: "دجاج مشوي وبطاطا حلوة",
    calories: 520,
    protein: 48,
    carbs: 45,
    fats: 10
  },
  {
    id: "MEAL-3",
    memberId: "MEM-102",
    date: "2026-07-04",
    mealType: "lunch",
    foodNameEn: "Oatmeal with Almond Butter & Honey",
    foodNameAr: "شوفان بزبدة اللوز والعسل",
    calories: 450,
    protein: 15,
    carbs: 60,
    fats: 12
  }
];

export const initialPayments: PaymentRecord[] = [
  {
    id: "PAY-1",
    memberId: "MEM-101",
    memberNameEn: "Sarah Jenkins",
    memberNameAr: "سارة جينكينز",
    amount: 1199,
    methodEn: "Card",
    methodAr: "بطاقة",
    date: "2026-01-15",
    status: "paid",
    invoiceNo: "INV-2026-001"
  },
  {
    id: "PAY-2",
    memberId: "MEM-102",
    memberNameEn: "Fahad Al-Otaibi",
    memberNameAr: "فهد العتيبي",
    amount: 399,
    methodEn: "PayPal",
    methodAr: "باي بال",
    date: "2026-05-10",
    status: "paid",
    invoiceNo: "INV-2026-042"
  },
  {
    id: "PAY-3",
    memberId: "MEM-103",
    memberNameEn: "Amira Mansour",
    memberNameAr: "أميرة منصور",
    amount: 150,
    methodEn: "Cash",
    methodAr: "نقدي",
    date: "2026-06-20",
    status: "paid",
    invoiceNo: "INV-2026-098"
  },
  {
    id: "PAY-4",
    memberId: "MEM-104",
    memberNameEn: "Khalid Al-Ghamdi",
    memberNameAr: "خالد الغامدي",
    amount: 50,
    methodEn: "Card",
    methodAr: "بطاقة",
    date: "2026-07-02",
    status: "pending",
    invoiceNo: "INV-2026-105"
  }
];

export const initialTrainers: Trainer[] = [
  {
    id: "TRN-1",
    nameEn: "Captain Fahad Al-Zahrani",
    nameAr: "الكابتن فهد الزهراني",
    specialtyEn: "Strength, Bodybuilding & InBody Scan Prep",
    specialtyAr: "القوة، كمال الأجسام والتحضير لتحليل الجسم",
    rating: 4.9,
    clientsCount: 24,
    photo: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&q=80&w=200",
    email: "fahad.trn@example.com",
    phone: "+966 50 222 1111",
    availability: "08:00 AM - 04:00 PM"
  },
  {
    id: "TRN-2",
    nameEn: "Coach Yasmin Salem",
    nameAr: "المدربة ياسمين سالم",
    specialtyEn: "Yoga, Calisthenics, Core Shred & Flexibility",
    specialtyAr: "اليوجا، الكاليسثينيكس، نحت البطن والمرونة",
    rating: 4.8,
    clientsCount: 18,
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    email: "yasmin.s@example.com",
    phone: "+966 55 999 8888",
    availability: "10:00 AM - 06:00 PM"
  },
  {
    id: "TRN-3",
    nameEn: "Captain Robert Vance",
    nameAr: "الكابتن روبرت فانس",
    specialtyEn: "HIIT, Crossfit Core WOD & Stamina Conditioning",
    specialtyAr: "تمرينات هِيت، الكروس فت والتحمل اللياقي",
    rating: 4.9,
    clientsCount: 31,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    email: "robert.v@example.com",
    phone: "+966 56 333 4444",
    availability: "01:00 PM - 09:00 PM"
  }
];

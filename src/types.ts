export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';

export interface TranslationSet {
  dashboard: string;
  members: string;
  memberships: string;
  workoutPlans: string;
  exercises: string;
  schedules: string;
  attendance: string;
  nutrition: string;
  progressTracking: string;
  payments: string;
  trainers: string;
  settings: string;
  
  // Dashboard Metrics
  activeMembers: string;
  newMembers: string;
  revenue: string;
  attendanceToday: string;
  caloriesBurned: string;
  membershipRenewals: string;
  pendingPayments: string;
  todaysClasses: string;
  
  // Quick Actions / UI Common
  add: string;
  edit: string;
  delete: string;
  save: string;
  cancel: string;
  search: string;
  filter: string;
  all: string;
  status: string;
  active: string;
  inactive: string;
  pending: string;
  actions: string;
  viewDetails: string;
  loading: string;
  noData: string;
  success: string;
  error: string;
}

export interface GymMember {
  id: string;
  nameEn: string;
  nameAr: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  planTypeEn: string;
  planTypeAr: string;
  registrationDate: string;
  expiryDate: string;
  gender: 'male' | 'female';
  photo: string;
  attendanceCount: number;
  // Progress/Measurements
  weight: number; // kg
  height: number; // cm
  bodyFat: number; // %
  targetWeight: number; // kg
  bmi: number;
  // Notes
  medicalNotesEn: string;
  medicalNotesAr: string;
  emergencyContact: string;
}

export interface MembershipPlan {
  id: string;
  nameEn: string;
  nameAr: string;
  price: number;
  durationMonths: number;
  featuresEn: string[];
  featuresAr: string[];
  popular?: boolean;
}

export interface WorkoutPlan {
  id: string;
  titleEn: string;
  titleAr: string;
  difficultyEn: 'Beginner' | 'Intermediate' | 'Advanced';
  difficultyAr: 'مبتدئ' | 'متوسط' | 'متقدم';
  durationWeeks: number;
  targetEn: string;
  targetAr: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  sets: number;
  reps: string;
  restSeconds: number;
  dayOfWeek: number; // 0 to 6 (Sunday to Saturday)
}

export interface Exercise {
  id: string;
  nameEn: string;
  nameAr: string;
  categoryEn: 'Strength' | 'Cardio' | 'Flexibility' | 'Bodyweight';
  categoryAr: 'قوة' | 'كارديو' | 'مرونة' | 'وزن الجسم';
  equipmentEn: string;
  equipmentAr: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instructionsEn: string;
  instructionsAr: string;
  videoUrl?: string;
  imageUrl?: string;
  durationMinutes: number;
}

export interface ClassSchedule {
  id: string;
  classNameEn: string;
  classNameAr: string;
  trainerNameEn: string;
  trainerNameAr: string;
  timeSlot: string; // e.g., "08:00 AM - 09:00 AM"
  dayOfWeek: number; // 0 (Sunday) to 6 (Saturday)
  roomEn: string;
  roomAr: string;
  capacity: number;
  enrolled: number;
}

export interface AttendanceRecord {
  id: string;
  memberId: string;
  memberNameEn: string;
  memberNameAr: string;
  date: string;
  checkInTime: string;
  checkOutTime?: string;
  status: 'present' | 'late' | 'excused';
}

export interface MealLog {
  id: string;
  memberId: string;
  date: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foodNameEn: string;
  foodNameAr: string;
  calories: number;
  protein: number; // g
  carbs: number; // g
  fats: number; // g
}

export interface PaymentRecord {
  id: string;
  memberId: string;
  memberNameEn: string;
  memberNameAr: string;
  amount: number;
  methodEn: 'Cash' | 'Card' | 'PayPal' | 'Bank Transfer';
  methodAr: 'نقدي' | 'بطاقة' | 'باي بال' | 'تحويل بنكي';
  date: string;
  status: 'paid' | 'pending' | 'refunded';
  invoiceNo: string;
}

export interface Trainer {
  id: string;
  nameEn: string;
  nameAr: string;
  specialtyEn: string;
  specialtyAr: string;
  rating: number;
  clientsCount: number;
  photo: string;
  email: string;
  phone: string;
  availability: string;
}

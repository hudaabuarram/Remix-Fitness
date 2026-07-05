import React, { useState, useMemo } from 'react';
import { 
  Search, Plus, Filter, User, Calendar, Phone, Mail, 
  Trash2, X, PlusCircle, Check, Award, Weight, Heart, 
  Sparkles, ShieldAlert, Dumbbell, ClipboardList, TrendingUp, Apple, DollarSign
} from 'lucide-react';
import { 
  GymMember, Language, MembershipPlan, WorkoutPlan, 
  Exercise, AttendanceRecord, MealLog, PaymentRecord 
} from '../types';

interface MembersViewProps {
  members: GymMember[];
  plans: MembershipPlan[];
  workoutPlans: WorkoutPlan[];
  exercises: Exercise[];
  attendance: AttendanceRecord[];
  mealLogs: MealLog[];
  payments: PaymentRecord[];
  lang: Language;
  onAddMember: (newMember: GymMember) => void;
  onUpdateMember: (updatedMember: GymMember) => void;
  onDeleteMember: (id: string) => void;
  onAddMealLog: (log: MealLog) => void;
  selectedMemberId: string | null;
  setSelectedMemberId: (id: string | null) => void;
}

export const MembersView: React.FC<MembersViewProps> = ({
  members,
  plans,
  workoutPlans,
  exercises,
  attendance,
  mealLogs,
  payments,
  lang,
  onAddMember,
  onUpdateMember,
  onDeleteMember,
  onAddMealLog,
  selectedMemberId,
  setSelectedMemberId
}) => {
  const isRtl = lang === 'ar';
  
  // Local state for searching/filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'male' | 'female'>('all');
  
  // Add Member Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemberForm, setNewMemberForm] = useState<Partial<GymMember>>({
    nameEn: '',
    nameAr: '',
    email: '',
    phone: '',
    gender: 'male',
    status: 'active',
    planTypeEn: plans[0]?.nameEn || 'Monthly Essential',
    planTypeAr: plans[0]?.nameAr || 'الاشتراك الشهري الأساسي',
    weight: 75,
    height: 175,
    bodyFat: 20,
    targetWeight: 70,
    medicalNotesEn: '',
    medicalNotesAr: '',
    emergencyContact: ''
  });

  // Profile Active Tab State
  const [profileTab, setProfileTab] = useState<'overview' | 'membership' | 'workouts' | 'attendance' | 'measurements' | 'nutrition' | 'payments' | 'achievements' | 'notes'>('overview');

  // Meal Form inside Profile Nutrition Tab
  const [newMeal, setNewMeal] = useState({
    mealType: 'lunch' as 'breakfast' | 'lunch' | 'dinner' | 'snack',
    foodNameEn: '',
    foodNameAr: '',
    calories: 400,
    protein: 30,
    carbs: 40,
    fats: 10
  });

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const nameMatch = m.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        m.nameAr.includes(searchTerm) ||
                        m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        m.phone.includes(searchTerm);
      const statusMatch = statusFilter === 'all' || m.status === statusFilter;
      const genderMatch = genderFilter === 'all' || m.gender === genderFilter;
      return nameMatch && statusMatch && genderMatch;
    });
  }, [members, searchTerm, statusFilter, genderFilter]);

  // Retrieve selected member object
  const activeMember = useMemo(() => {
    return members.find(m => m.id === selectedMemberId) || null;
  }, [members, selectedMemberId]);

  // Computed data for active member
  const activeMemberMeals = useMemo(() => {
    if (!selectedMemberId) return [];
    return mealLogs.filter(log => log.memberId === selectedMemberId);
  }, [mealLogs, selectedMemberId]);

  const activeMemberPayments = useMemo(() => {
    if (!selectedMemberId) return [];
    return payments.filter(pay => pay.memberId === selectedMemberId);
  }, [payments, selectedMemberId]);

  const activeMemberAttendance = useMemo(() => {
    if (!selectedMemberId) return [];
    return attendance.filter(att => att.memberId === selectedMemberId);
  }, [attendance, selectedMemberId]);

  // Form Submit for New Member
  const handleAddMemberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `MEM-${Math.floor(100 + Math.random() * 900)}`;
    const regDate = new Date().toISOString().split('T')[0];
    const expDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    const bmiVal = Number(((newMemberForm.weight || 70) / Math.pow((newMemberForm.height || 170) / 100, 2)).toFixed(1));

    const completeMember: GymMember = {
      id,
      nameEn: newMemberForm.nameEn || 'New Member',
      nameAr: newMemberForm.nameAr || 'عضو جديد',
      email: newMemberForm.email || 'email@example.com',
      phone: newMemberForm.phone || '+966 50 000 0000',
      status: newMemberForm.status as 'active' | 'pending' | 'inactive',
      planTypeEn: newMemberForm.planTypeEn || 'Monthly Essential',
      planTypeAr: newMemberForm.planTypeAr || 'الاشتراك الشهري الأساسي',
      registrationDate: regDate,
      expiryDate: expDate,
      gender: newMemberForm.gender as 'male' | 'female',
      photo: newMemberForm.gender === 'female' 
        ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
        : "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
      attendanceCount: 0,
      weight: Number(newMemberForm.weight) || 70,
      height: Number(newMemberForm.height) || 170,
      bodyFat: Number(newMemberForm.bodyFat) || 18,
      targetWeight: Number(newMemberForm.targetWeight) || 65,
      bmi: bmiVal,
      medicalNotesEn: newMemberForm.medicalNotesEn || 'None',
      medicalNotesAr: newMemberForm.medicalNotesAr || 'لا يوجد',
      emergencyContact: newMemberForm.emergencyContact || 'N/A'
    };

    onAddMember(completeMember);
    setIsAddModalOpen(false);
    // Reset form
    setNewMemberForm({
      nameEn: '', nameAr: '', email: '', phone: '', gender: 'male', status: 'active',
      planTypeEn: plans[0]?.nameEn, planTypeAr: plans[0]?.nameAr,
      weight: 75, height: 175, bodyFat: 20, targetWeight: 70, medicalNotesEn: '', medicalNotesAr: '', emergencyContact: ''
    });
  };

  // Submit Meal for member
  const handleAddMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMemberId) return;

    const log: MealLog = {
      id: `MEAL-${Math.floor(1000 + Math.random() * 9000)}`,
      memberId: selectedMemberId,
      date: new Date().toISOString().split('T')[0],
      mealType: newMeal.mealType,
      foodNameEn: newMeal.foodNameEn || 'Oatmeal',
      foodNameAr: newMeal.foodNameAr || 'وجبة شوفان',
      calories: Number(newMeal.calories),
      protein: Number(newMeal.protein),
      carbs: Number(newMeal.carbs),
      fats: Number(newMeal.fats)
    };

    onAddMealLog(log);
    setNewMeal({
      mealType: 'lunch', foodNameEn: '', foodNameAr: '',
      calories: 400, protein: 30, carbs: 40, fats: 10
    });
  };

  // Switch member status quick helper
  const toggleActiveStatus = (member: GymMember) => {
    const nextStatus = member.status === 'active' ? 'inactive' : 'active';
    onUpdateMember({ ...member, status: nextStatus });
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
            {isRtl ? 'إدارة الأعضاء والمنتسبين' : 'Gym Members Registry'}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400">
            {isRtl ? 'إضافة وتعديل الأعضاء، ومتابعة قياساتهم وتغذيتهم والاشتراكات.' : 'Track gym members, physical stats, nutrition logs, and subscription statuses.'}
          </p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 dark:shadow-none hover:scale-[1.02] transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5" />
          <span>{isRtl ? 'إضافة عضو جديد' : 'Register New Member'}</span>
        </button>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input 
            type="text" 
            placeholder={isRtl ? 'البحث بالاسم، البريد أو الهاتف...' : 'Search by name, email, or phone...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{isRtl ? 'الحالة:' : 'Status:'}</span>
          </div>
          <select 
            value={statusFilter} 
            onChange={(e: any) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">{isRtl ? 'جميع الحالات' : 'All Statuses'}</option>
            <option value="active">{isRtl ? 'نشط' : 'Active'}</option>
            <option value="pending">{isRtl ? 'معلق' : 'Pending'}</option>
            <option value="inactive">{isRtl ? 'غير نشط' : 'Inactive'}</option>
          </select>

          <select 
            value={genderFilter} 
            onChange={(e: any) => setGenderFilter(e.target.value)}
            className="text-xs px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="all">{isRtl ? 'الجنسين' : 'All Genders'}</option>
            <option value="male">{isRtl ? 'ذكور' : 'Males'}</option>
            <option value="female">{isRtl ? 'إناث' : 'Females'}</option>
          </select>
        </div>
      </div>

      {/* MEMBERS TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/60 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-800/40">
                <th className="py-3.5 px-4">{isRtl ? 'العضو' : 'Member'}</th>
                <th className="py-3.5 px-4">{isRtl ? 'معلومات الاتصال' : 'Contact Details'}</th>
                <th className="py-3.5 px-4">{isRtl ? 'الحالة' : 'Status'}</th>
                <th className="py-3.5 px-4">{isRtl ? 'باقة الاشتراك' : 'Membership Plan'}</th>
                <th className="py-3.5 px-4 text-center">{isRtl ? 'الزيارات' : 'Attendance'}</th>
                <th className="py-3.5 px-4 text-center">{isRtl ? 'الوزن الحالي' : 'Weight'}</th>
                <th className="py-3.5 px-4 text-right">{isRtl ? 'إجراءات' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/30 text-sm">
              {filteredMembers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    {isRtl ? 'لا يوجد أعضاء يطابقون خيارات البحث حالياً.' : 'No members found matching your filters.'}
                  </td>
                </tr>
              ) : (
                filteredMembers.map((member) => (
                  <tr 
                    key={member.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-700/10 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={member.photo} 
                          alt={member.nameEn} 
                          className="w-11 h-11 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700" 
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 
                            onClick={() => setSelectedMemberId(member.id)}
                            className="font-bold text-slate-800 dark:text-slate-100 hover:text-indigo-600 dark:hover:text-indigo-400 hover:underline cursor-pointer"
                          >
                            {isRtl ? member.nameAr : member.nameEn}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-400 uppercase">
                            {member.id} • {isRtl ? (member.gender === 'male' ? 'ذكر' : 'أنثى') : member.gender}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 space-y-0.5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Mail className="w-3.5 h-3.5" />
                        <span>{member.email}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <button 
                        onClick={() => toggleActiveStatus(member)}
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold cursor-pointer transition-transform hover:scale-105 ${
                          member.status === 'active' 
                            ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30' 
                            : member.status === 'pending'
                            ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30'
                            : 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30'
                        }`}
                        title={isRtl ? 'انقر لتبديل الحالة' : 'Click to toggle status'}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          member.status === 'active' ? 'bg-emerald-500' : member.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                        {isRtl 
                          ? (member.status === 'active' ? 'نشط' : member.status === 'pending' ? 'معلق' : 'غير نشط')
                          : member.status.toUpperCase()}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-700 dark:text-slate-300">
                      {isRtl ? member.planTypeAr : member.planTypeEn}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-600 dark:text-slate-300">
                      {member.attendanceCount}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="font-bold text-slate-800 dark:text-slate-200">{member.weight} kg</span>
                      <p className="text-[10px] text-slate-400">{isRtl ? `الهدف: ${member.targetWeight}` : `Goal: ${member.targetWeight}`}</p>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedMemberId(member.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-600 transition-colors cursor-pointer"
                        >
                          {isRtl ? 'إدارة' : 'Manage'}
                        </button>
                        <button 
                          onClick={() => onDeleteMember(member.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors cursor-pointer"
                          title={isRtl ? 'حذف العضو' : 'Delete Member'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MEMBER PROFILE DRAWER (MODAL OVERLAY) */}
      {activeMember && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex justify-end transition-opacity duration-300">
          <div className="w-full max-w-4xl bg-slate-50 dark:bg-slate-900 h-full shadow-2xl flex flex-col relative overflow-hidden transition-transform duration-300">
            {/* Drawer Header */}
            <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700/60 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={activeMember.photo} 
                  alt={activeMember.nameEn} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-indigo-100 dark:border-indigo-950" 
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isRtl ? activeMember.nameAr : activeMember.nameEn}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                    ID: {activeMember.id} • {activeMember.email}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedMemberId(null)}
                className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-400 hover:text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Profile Navigation Tabs */}
            <div className="bg-white dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700/60 px-4 flex items-center overflow-x-auto gap-1 scrollbar-none">
              {(
                [
                  { key: 'overview', en: 'Overview', ar: 'نظرة عامة' },
                  { key: 'membership', en: 'Membership', ar: 'الاشتراك' },
                  { key: 'workouts', en: 'Workout Plans', ar: 'الخطط التدريبية' },
                  { key: 'attendance', en: 'Attendance', ar: 'الحضور' },
                  { key: 'measurements', en: 'Measurements', ar: 'القياسات البدنية' },
                  { key: 'nutrition', en: 'Nutrition', ar: 'التغذية والوجبات' },
                  { key: 'payments', en: 'Payments', ar: 'المدفوعات' },
                  { key: 'achievements', en: 'Achievements', ar: 'الإنجازات' },
                  { key: 'notes', en: 'Notes', ar: 'ملاحظات طبية' }
                ] as const
              ).map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setProfileTab(tab.key)}
                  className={`py-3.5 px-4 text-xs font-semibold border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                    profileTab === tab.key 
                      ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' 
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {isRtl ? tab.ar : tab.en}
                </button>
              ))}
            </div>

            {/* Tab Contents Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* 1. OVERVIEW TAB */}
              {profileTab === 'overview' && (
                <div className="space-y-6">
                  {/* General Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/40">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">{isRtl ? 'مؤشر كتلة الجسم' : 'BMI Score'}</span>
                      <h4 className="text-2xl font-bold text-slate-950 dark:text-white mt-1">{activeMember.bmi}</h4>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {activeMember.bmi < 18.5 ? (isRtl ? 'نقص وزن' : 'Underweight') : activeMember.bmi < 25 ? (isRtl ? 'وزن مثالي' : 'Healthy weight') : (isRtl ? 'زيادة وزن' : 'Overweight')}
                      </p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/40">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">{isRtl ? 'نسبة الدهون' : 'Body Fat %'}</span>
                      <h4 className="text-2xl font-bold text-slate-950 dark:text-white mt-1">{activeMember.bodyFat}%</h4>
                      <p className="text-[10px] text-slate-500 mt-1">{isRtl ? 'نسبة مقاسة أخيرة' : 'Latest measurement'}</p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/40">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">{isRtl ? 'إجمالي الحضور' : 'Check-ins total'}</span>
                      <h4 className="text-2xl font-bold text-slate-950 dark:text-white mt-1">{activeMember.attendanceCount}</h4>
                      <p className="text-[10px] text-indigo-600 dark:text-indigo-400 mt-1 font-semibold">{isRtl ? 'مسجل بنجاح' : 'Visits tracked'}</p>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/40">
                      <span className="text-[11px] font-semibold text-slate-400 uppercase">{isRtl ? 'انتهاء الاشتراك' : 'Membership Expiry'}</span>
                      <h4 className="text-sm font-bold text-slate-950 dark:text-white mt-2 font-mono">{activeMember.expiryDate}</h4>
                      <p className="text-[10px] text-rose-500 mt-1 font-semibold">{isRtl ? 'يتطلب التجديد قريباً' : 'Renewal due soon'}</p>
                    </div>
                  </div>

                  {/* Core Status & Actions */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-4">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">{isRtl ? 'أهداف اللياقة البدنية' : 'Primary Fitness Goals'}</h3>
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-700">
                          <span className="text-slate-400">{isRtl ? 'الوزن الحالي:' : 'Current Weight:'}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{activeMember.weight} kg</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-700">
                          <span className="text-slate-400">{isRtl ? 'الوزن المستهدف:' : 'Target Goal:'}</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">{activeMember.targetWeight} kg</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-50 dark:border-slate-700">
                          <span className="text-slate-400">{isRtl ? 'تاريخ التسجيل:' : 'Member Since:'}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200 font-mono">{activeMember.registrationDate}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-400">{isRtl ? 'جهة اتصال الطوارئ:' : 'Emergency Contact:'}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-200">{activeMember.emergencyContact}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-3">
                      <h3 className="text-sm font-bold text-slate-800 dark:text-white">{isRtl ? 'ملاحظة المدرب الطبية' : 'Instructor & Health Safety Guidelines'}</h3>
                      <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-100/40 dark:border-amber-900/40 text-amber-800 dark:text-amber-400 text-xs leading-relaxed">
                        <div className="flex items-center gap-1.5 font-bold mb-1.5 text-amber-700 dark:text-amber-400">
                          <ShieldAlert className="w-4.5 h-4.5" />
                          <span>{isRtl ? 'إرشاد مهم' : 'Clinical/Safety Warning'}</span>
                        </div>
                        {isRtl ? activeMember.medicalNotesAr : activeMember.medicalNotesEn}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 2. MEMBERSHIP TAB */}
              {profileTab === 'membership' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                      {isRtl ? 'تفاصيل باقة الاشتراك الحالية' : 'Current Active Membership details'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isRtl ? 'إدارة وتحديث الباقة وتواريخ التجميد والإلغاء.' : 'Manage, freeze, or renew the user\'s contract.'}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/60 dark:border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{isRtl ? 'الباقة المفعلة' : 'Active Plan'}</span>
                      <h4 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mt-1">
                        {isRtl ? activeMember.planTypeAr : activeMember.planTypeEn}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {isRtl ? `تاريخ انتهاء الصلاحية: ${activeMember.expiryDate}` : `Expires on: ${activeMember.expiryDate}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          const extDate = new Date(new Date(activeMember.expiryDate).getTime() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                          onUpdateMember({ ...activeMember, expiryDate: extDate, attendanceCount: activeMember.attendanceCount + 1 });
                        }}
                        className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-xs transition-colors cursor-pointer"
                      >
                        {isRtl ? 'تجديد 30 يوم إضافي' : 'Extend 30 Days'}
                      </button>
                      <button 
                        onClick={() => onUpdateMember({ ...activeMember, status: 'inactive' })}
                        className="px-4 py-2 text-xs font-bold bg-white hover:bg-slate-50 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl border border-slate-200 dark:border-slate-600 transition-colors cursor-pointer"
                      >
                        {isRtl ? 'تجميد مؤقت' : 'Freeze'}
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 dark:border-slate-700/60 pt-6 space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{isRtl ? 'تغيير أو ترقية الباقة لـ' : 'Upgrade Plan Option'}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {plans.map((plan) => (
                        <div 
                          key={plan.id}
                          onClick={() => {
                            onUpdateMember({
                              ...activeMember,
                              planTypeEn: plan.nameEn,
                              planTypeAr: plan.nameAr
                            });
                          }}
                          className={`p-4 rounded-xl border cursor-pointer transition-all ${
                            activeMember.planTypeEn === plan.nameEn 
                              ? 'border-indigo-600 bg-indigo-50/20 dark:border-indigo-500' 
                              : 'border-slate-100 dark:border-slate-700 hover:bg-slate-50/50'
                          }`}
                        >
                          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                            {isRtl ? plan.nameAr : plan.nameEn}
                          </h5>
                          <p className="text-sm font-bold text-slate-900 dark:text-white mt-1">${plan.price}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{plan.durationMonths} {isRtl ? 'أشهر' : 'Months'}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. WORKOUT PLANS TAB */}
              {profileTab === 'workouts' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {isRtl ? 'البرنامج التدريبي المسند' : 'Assigned Training Program'}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {isRtl ? 'التمارين والبرامج المخصصة لبناء الكتلة والتنشيف.' : 'Review daily reps and exercises sets assigned to this user.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700/50 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {isRtl ? 'برنامج تضخيم عضلات الصدر والأرجل' : 'Muscle Hypertrophy Split 4-Day'}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                        {isRtl ? 'مستوى متوسط' : 'Intermediate'}
                      </span>
                    </div>
                    
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                      {exercises.slice(0, 3).map((ex, idx) => (
                        <div key={idx} className="flex items-center justify-between py-2.5">
                          <div className="flex items-center gap-2">
                            <Dumbbell className="w-4 h-4 text-slate-400" />
                            <span className="font-bold text-slate-800 dark:text-slate-200">
                              {isRtl ? ex.nameAr : ex.nameEn}
                            </span>
                          </div>
                          <div className="text-slate-500 dark:text-slate-400 font-mono text-xs">
                            {idx + 3} sets x 10 reps (rest: 90s)
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. ATTENDANCE TAB */}
              {profileTab === 'attendance' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {isRtl ? 'تاريخ وسجل الحضور' : 'Check-in Logs'}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {isRtl ? 'رصد دقيق لأيام الدخول والانتظام وتدفق الجلسات.' : 'Full registry of times scanned at the front gate.'}
                      </p>
                    </div>
                    <button 
                      onClick={() => {
                        onUpdateMember({ ...activeMember, attendanceCount: activeMember.attendanceCount + 1 });
                      }}
                      className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                    >
                      {isRtl ? 'تسجيل دخول يدوي الآن' : 'Force Manual Check-In'}
                    </button>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto">
                    {activeMemberAttendance.length === 0 ? (
                      <div className="text-center py-6 text-xs text-slate-400">
                        {isRtl ? 'لم يتم العثور على سجل حضور سابق.' : 'No recent attendance logs for this member.'}
                      </div>
                    ) : (
                      activeMemberAttendance.map((record) => (
                        <div 
                          key={record.id} 
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs border border-slate-100/50 dark:border-slate-700/50"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">{record.date}</span>
                          </div>
                          <div className="flex items-center gap-4 text-slate-500 font-mono">
                            <span>{isRtl ? `الدخول: ${record.checkInTime}` : `Check In: ${record.checkInTime}`}</span>
                            {record.checkOutTime && (
                              <span>{isRtl ? `الخروج: ${record.checkOutTime}` : `Check Out: ${record.checkOutTime}`}</span>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}

              {/* 5. MEASUREMENTS TAB */}
              {profileTab === 'measurements' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {isRtl ? 'قياسات ومكونات الجسم (InBody)' : 'Body Composition Tracking'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isRtl ? 'تحديث ومتابعة الوزن والدهون ومؤشر كتلة الجسم.' : 'Monitor muscle weights, height metrics, and fat indices.'}
                    </p>
                  </div>

                  {/* Form to update stats */}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const weight = Number((form.elements.namedItem('weight') as HTMLInputElement).value);
                      const height = Number((form.elements.namedItem('height') as HTMLInputElement).value);
                      const bodyFat = Number((form.elements.namedItem('bodyFat') as HTMLInputElement).value);
                      const bmiVal = Number((weight / Math.pow(height / 100, 2)).toFixed(1));

                      onUpdateMember({
                        ...activeMember,
                        weight,
                        height,
                        bodyFat,
                        bmi: bmiVal
                      });
                    }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs"
                  >
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1.5">{isRtl ? 'الوزن الحالي (كجم)' : 'Weight (kg)'}</label>
                      <input 
                        type="number" 
                        name="weight"
                        defaultValue={activeMember.weight}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1.5">{isRtl ? 'الطول الحالي (سم)' : 'Height (cm)'}</label>
                      <input 
                        type="number" 
                        name="height"
                        defaultValue={activeMember.height}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1.5">{isRtl ? 'نسبة الدهون (%)' : 'Body Fat %'}</label>
                      <input 
                        type="number" 
                        name="bodyFat"
                        step="0.1"
                        defaultValue={activeMember.bodyFat}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                      />
                    </div>
                    <div className="sm:col-span-3 flex justify-end">
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        {isRtl ? 'حفظ القياسات الجديدة' : 'Update Physical Composition'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* 6. NUTRITION TAB */}
              {profileTab === 'nutrition' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {isRtl ? 'سجل تتبع التغذية والوجبات اليومية' : 'Daily Meal Logs & Nutrition'}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {isRtl ? 'متابعة السعرات والماكروز (بروتين، كربوهيدرات، دهون).' : 'Input food intakes to maintain muscle recovery cycles.'}
                      </p>
                    </div>
                  </div>

                  {/* Meal input form */}
                  <form onSubmit={handleAddMealSubmit} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-xs space-y-3">
                    <h4 className="font-bold text-slate-800 dark:text-white">{isRtl ? 'إضافة وجبة جديدة' : 'Log a Food Entry'}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="sm:col-span-2">
                        <label className="block text-slate-500 mb-1">{isRtl ? 'اسم الوجبة (English)' : 'Meal Name (English)'}</label>
                        <input 
                          type="text" 
                          required
                          value={newMeal.foodNameEn} 
                          onChange={(e) => setNewMeal({ ...newMeal, foodNameEn: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          placeholder="e.g. Scrambled Eggs & Toast"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-slate-500 mb-1">{isRtl ? 'اسم الوجبة (عربي)' : 'Meal Name (Arabic)'}</label>
                        <input 
                          type="text" 
                          required
                          value={newMeal.foodNameAr} 
                          onChange={(e) => setNewMeal({ ...newMeal, foodNameAr: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                          placeholder="مثال: بيض مخفوق مع التوست"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 mb-1">{isRtl ? 'السعرات (kcal)' : 'Calories'}</label>
                        <input 
                          type="number" 
                          value={newMeal.calories} 
                          onChange={(e) => setNewMeal({ ...newMeal, calories: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 mb-1">{isRtl ? 'بروتين (g)' : 'Protein'}</label>
                        <input 
                          type="number" 
                          value={newMeal.protein} 
                          onChange={(e) => setNewMeal({ ...newMeal, protein: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 mb-1">{isRtl ? 'كاربس (g)' : 'Carbs'}</label>
                        <input 
                          type="number" 
                          value={newMeal.carbs} 
                          onChange={(e) => setNewMeal({ ...newMeal, carbs: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-500 mb-1">{isRtl ? 'دهون (g)' : 'Fats'}</label>
                        <input 
                          type="number" 
                          value={newMeal.fats} 
                          onChange={(e) => setNewMeal({ ...newMeal, fats: Number(e.target.value) })}
                          className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end pt-2">
                      <button 
                        type="submit"
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                      >
                        {isRtl ? 'إضافة الوجبة الحالية' : 'Log Meal Entry'}
                      </button>
                    </div>
                  </form>

                  {/* Meal List */}
                  <div className="space-y-2 max-h-52 overflow-y-auto">
                    {activeMemberMeals.map((meal) => (
                      <div 
                        key={meal.id} 
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs border border-slate-100/50"
                      >
                        <div>
                          <span className="inline-block px-1.5 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-400 text-[9px] uppercase font-bold mr-1.5">
                            {meal.mealType}
                          </span>
                          <span className="font-bold text-slate-800 dark:text-slate-100">
                            {isRtl ? meal.foodNameAr : meal.foodNameEn}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 font-mono text-slate-500">
                          <span>{meal.calories} kcal</span>
                          <span>P: {meal.protein}g</span>
                          <span>C: {meal.carbs}g</span>
                          <span>F: {meal.fats}g</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. PAYMENTS TAB */}
              {profileTab === 'payments' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {isRtl ? 'سجل الفواتير والمدفوعات المالية' : 'Billing & Payments Ledger'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isRtl ? 'عرض وإصدار فواتير الاشتراكات والمدفوعات المستحقة.' : 'Ledger history of invoices settled at the counter.'}
                    </p>
                  </div>

                  <div className="space-y-2">
                    {activeMemberPayments.map((record) => (
                      <div 
                        key={record.id} 
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs border border-slate-100/50"
                      >
                        <div className="space-y-0.5">
                          <span className="font-mono text-slate-400 font-bold uppercase">{record.invoiceNo}</span>
                          <p className="font-bold text-slate-800 dark:text-slate-100">{record.date}</p>
                        </div>
                        <div className="text-right space-y-1">
                          <span className="text-sm font-bold text-slate-950 dark:text-white">${record.amount}</span>
                          <span className={`block px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            record.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                          }`}>
                            {record.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. ACHIEVEMENTS TAB */}
              {profileTab === 'achievements' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {isRtl ? 'الإنجازات والوسام الشرفي للعضو' : 'Member Achievements & Milestones'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isRtl ? 'شارات مستحقة تشجيعاً على الانتظام والمحافظة على الأداء.' : 'Gamified badges awarded to boost client motivation.'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-50/50 dark:bg-slate-900 border border-yellow-100/40">
                      <Award className="w-10 h-10 text-yellow-500 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{isRtl ? 'وحش الالتزام (30 يوم)' : 'Iron Streak (30 Days)'}</h4>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                          {isRtl ? 'منح لحضور 30 يوماً متتالياً دون انقطاع.' : 'Awarded for complete check-in compliance across 30 sessions.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50/50 dark:bg-slate-900 border border-blue-100/40">
                      <TrendingUp className="w-10 h-10 text-blue-500 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{isRtl ? 'محطم الأوزان القياسي' : 'PR Smasher Elite'}</h4>
                        <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">
                          {isRtl ? 'منح لتسجيل زيادة أسبوعية في كتلة الرفع.' : 'Awarded when the instructor registers consecutive weight logs increases.'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 9. NOTES TAB */}
              {profileTab === 'notes' && (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/40 space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {isRtl ? 'الملف الطبي والملاحظات الصحية والغذائية' : 'Confidential Medical & Health Notes'}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isRtl ? 'إدخال التنبيهات الطبية لضمان سلامة العضو أثناء الحصص عالية الجهد.' : 'Update physical restrictions to avoid potential hazards.'}
                    </p>
                  </div>

                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const medicalNotesEn = (form.elements.namedItem('notesEn') as HTMLTextAreaElement).value;
                      const medicalNotesAr = (form.elements.namedItem('notesAr') as HTMLTextAreaElement).value;
                      const emergencyContact = (form.elements.namedItem('emergency') as HTMLInputElement).value;

                      onUpdateMember({
                        ...activeMember,
                        medicalNotesEn,
                        medicalNotesAr,
                        emergencyContact
                      });
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1.5">{isRtl ? 'الملاحظات الطبية بالإنجليزية' : 'Medical Warnings (English)'}</label>
                      <textarea 
                        name="notesEn"
                        rows={3}
                        defaultValue={activeMember.medicalNotesEn}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1.5">{isRtl ? 'الملاحظات الطبية بالعربية' : 'Medical Warnings (Arabic)'}</label>
                      <textarea 
                        name="notesAr"
                        rows={3}
                        defaultValue={activeMember.medicalNotesAr}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1.5">{isRtl ? 'جهة اتصال الطوارئ والهاتف' : 'Emergency Contact Name & Phone'}</label>
                      <input 
                        type="text"
                        name="emergency"
                        defaultValue={activeMember.emergencyContact}
                        className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                    <div className="flex justify-end pt-2">
                      <button 
                        type="submit"
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors cursor-pointer"
                      >
                        {isRtl ? 'تحديث وحفظ الملف الصحي' : 'Save Health Updates'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* REGISTER NEW MEMBER MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-2xl rounded-2xl border border-slate-100 dark:border-slate-700 shadow-2xl overflow-hidden transition-all">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-slate-900 dark:text-white">
                {isRtl ? 'تسجيل عضو جديد في الصالة' : 'Register New Gym Client'}
              </h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleAddMemberSubmit} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">{isRtl ? 'الاسم بالإنجليزية *' : 'Name (English) *'}</label>
                  <input 
                    type="text" 
                    required
                    value={newMemberForm.nameEn}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, nameEn: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">{isRtl ? 'الاسم بالعربية *' : 'Name (Arabic) *'}</label>
                  <input 
                    type="text" 
                    required
                    value={newMemberForm.nameAr}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, nameAr: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    placeholder="مثال: جون دو"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">{isRtl ? 'البريد الإلكتروني *' : 'Email Address *'}</label>
                  <input 
                    type="email" 
                    required
                    value={newMemberForm.email}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">{isRtl ? 'رقم الهاتف *' : 'Phone Number *'}</label>
                  <input 
                    type="text" 
                    required
                    value={newMemberForm.phone}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                    placeholder="+966 50 123 4567"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">{isRtl ? 'الجنس' : 'Gender'}</label>
                  <select 
                    value={newMemberForm.gender}
                    onChange={(e: any) => setNewMemberForm({ ...newMemberForm, gender: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    <option value="male">{isRtl ? 'ذكر' : 'Male'}</option>
                    <option value="female">{isRtl ? 'أنثى' : 'Female'}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">{isRtl ? 'خطة الاشتراك' : 'Membership Plan'}</label>
                  <select 
                    value={newMemberForm.planTypeEn}
                    onChange={(e: any) => {
                      const selectedPlan = plans.find(p => p.nameEn === e.target.value);
                      setNewMemberForm({ 
                        ...newMemberForm, 
                        planTypeEn: e.target.value,
                        planTypeAr: selectedPlan?.nameAr || 'الأساسي'
                      });
                    }}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  >
                    {plans.map((p) => (
                      <option key={p.id} value={p.nameEn}>{isRtl ? p.nameAr : p.nameEn}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">{isRtl ? 'الوزن الحالي (kg)' : 'Current Weight (kg)'}</label>
                  <input 
                    type="number" 
                    value={newMemberForm.weight}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, weight: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1 font-bold">{isRtl ? 'الطول الحالي (cm)' : 'Height (cm)'}</label>
                  <input 
                    type="number" 
                    value={newMemberForm.height}
                    onChange={(e) => setNewMemberForm({ ...newMemberForm, height: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 font-semibold cursor-pointer"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold cursor-pointer"
                >
                  {isRtl ? 'حفظ وتسجيل العضو' : 'Save & Active Membership'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

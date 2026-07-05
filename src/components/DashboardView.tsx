import React, { useMemo } from 'react';
import { 
  AreaChart, Area, BarChart, Bar, LineChart, Line, 
  XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { 
  Users, DollarSign, Calendar, Flame, TrendingUp, 
  Award, ShieldAlert, ArrowUpRight, CheckCircle2, UserCheck
} from 'lucide-react';
import { GymMember, ClassSchedule, PaymentRecord, Language } from '../types';

interface DashboardViewProps {
  members: GymMember[];
  classes: ClassSchedule[];
  payments: PaymentRecord[];
  lang: Language;
  onNavigate: (tab: string) => void;
  onSelectMember: (memberId: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  members,
  classes,
  payments,
  lang,
  onNavigate,
  onSelectMember
}) => {
  const isRtl = lang === 'ar';

  // 1. KPI Calculations
  const metrics = useMemo(() => {
    const active = members.filter(m => m.status === 'active').length;
    const pending = members.filter(m => m.status === 'pending').length;
    
    const totalRevenue = payments
      .filter(p => p.status === 'paid')
      .reduce((sum, p) => sum + p.amount, 0);

    const pendingRevenue = payments
      .filter(p => p.status === 'pending')
      .reduce((sum, p) => sum + p.amount, 0);

    const todayAttendance = members.reduce((sum, m) => sum + (m.attendanceCount > 0 ? 1 : 0), 0) + 2; // static + mock

    return {
      active,
      pending,
      totalRevenue,
      pendingRevenue,
      todayAttendance,
      avgCaloriesBurned: 540 // Mock average
    };
  }, [members, payments]);

  // 2. Beautiful mock analytics data
  const membershipGrowthData = [
    { name: isRtl ? 'يناير' : 'Jan', members: 45 },
    { name: isRtl ? 'فبراير' : 'Feb', members: 62 },
    { name: isRtl ? 'مارس' : 'Mar', members: 85 },
    { name: isRtl ? 'أبريل' : 'Apr', members: 110 },
    { name: isRtl ? 'مايو' : 'May', members: 135 },
    { name: isRtl ? 'يونيو' : 'Jun', members: 168 },
    { name: isRtl ? 'يوليو' : 'Jul', members: 195 },
  ];

  const revenueData = [
    { name: isRtl ? 'السبت' : 'Sat', amount: 1200 },
    { name: isRtl ? 'الأحد' : 'Sun', amount: 1900 },
    { name: isRtl ? 'الاثنين' : 'Mon', amount: 2400 },
    { name: isRtl ? 'الثلاثاء' : 'Tue', amount: 1800 },
    { name: isRtl ? 'الأربعاء' : 'Wed', amount: 3100 },
    { name: isRtl ? 'الخميس' : 'Thu', amount: 4200 },
    { name: isRtl ? 'الجمعة' : 'Fri', amount: 1500 },
  ];

  const categoryWorkoutData = [
    { name: isRtl ? 'قوة' : 'Strength', value: 45, color: '#4F46E5' },
    { name: isRtl ? 'كارديو' : 'Cardio', value: 30, color: '#06B6D4' },
    { name: isRtl ? 'مرونة' : 'Flexibility', value: 15, color: '#F59E0B' },
    { name: isRtl ? 'وزن الجسم' : 'Bodyweight', value: 10, color: '#22C55E' },
  ];

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* 1. Header with subtle greetings */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-sans font-bold tracking-tight text-slate-900 dark:text-white transition-colors duration-200">
            {isRtl ? 'أهلاً بك في لوحة التحكم 👋' : 'Welcome to Your Dashboard 👋'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isRtl 
              ? 'إليك إحصائيات صالتك الرياضية وسير العمل لليوم.' 
              : 'Here is what\'s happening at your gym facility today.'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            {isRtl ? 'البث المباشر نشط' : 'Live Gateway Active'}
          </span>
        </div>
      </div>

      {/* 2. KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Members Card */}
        <div 
          onClick={() => onNavigate('members')}
          className="group relative overflow-hidden bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isRtl ? 'الأعضاء النشطون' : 'Active Members'}
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
                {metrics.active}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>+12% {isRtl ? 'هذا الشهر' : 'this month'}</span>
          </div>
        </div>

        {/* Attendance Today Card */}
        <div 
          onClick={() => onNavigate('attendance')}
          className="group relative overflow-hidden bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isRtl ? 'حضور اليوم' : 'Attendance Today'}
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
                {metrics.todayAttendance}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs text-cyan-600 dark:text-cyan-400 font-semibold">
            <span>{isRtl ? 'معدل الحضور اليومي: 84%' : 'Daily check-in rate: 84%'}</span>
          </div>
        </div>

        {/* Revenue Card */}
        <div 
          onClick={() => onNavigate('payments')}
          className="group relative overflow-hidden bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isRtl ? 'إجمالي الإيرادات' : 'Total Revenue'}
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
                ${metrics.totalRevenue}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <TrendingUp className="w-4 h-4" />
            <span>+24% {isRtl ? 'نمو ربع سنوي' : 'quarterly growth'}</span>
          </div>
        </div>

        {/* Calories Card */}
        <div 
          onClick={() => onNavigate('nutrition')}
          className="group relative overflow-hidden bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isRtl ? 'معدل حرق السعرات' : 'Avg Calories Burned'}
              </p>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-white mt-2 tracking-tight">
                {metrics.avgCaloriesBurned} kcal
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-4 text-xs text-amber-600 dark:text-amber-400 font-semibold">
            <span>{isRtl ? 'معدل الحرق لكل جلسة تمرين' : 'Average output per session'}</span>
          </div>
        </div>
      </div>

      {/* 3. Main Analytics Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Membership & Gym Growth - Area Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {isRtl ? 'تطور ونمو الاشتراكات' : 'Membership Growth'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isRtl ? 'معدل انضمام الأعضاء الجدد شهرياً' : 'Monthly client acquisition rate'}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-950/50 px-2 py-1 rounded-lg">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+433% {isRtl ? 'إجمالي زيادة' : 'overall increase'}</span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={membershipGrowthData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-700/50" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#17102B', 
                    borderRadius: '12px', 
                    color: '#F8FAFC',
                    border: 'none',
                    fontSize: '12px'
                  }} 
                />
                <Area type="monotone" dataKey="members" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorMembers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Workout Categories - Pie Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isRtl ? 'تصنيف التمارين الأكثر طلباً' : 'Workout Demographics'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isRtl ? 'نسبة استهداف الأنشطة الرياضية' : 'Distribution of active disciplines'}
            </p>
          </div>
          <div className="h-48 w-full flex items-center justify-center relative my-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryWorkoutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryWorkoutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <span className="block text-2xl font-bold text-slate-800 dark:text-slate-100">88%</span>
              <span className="text-[10px] uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                {isRtl ? 'معدل الرضا' : 'Satisfaction'}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categoryWorkoutData.map((item, index) => (
              <div key={index} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-slate-600 dark:text-slate-300 font-medium">{item.name}</span>
                <span className="text-slate-400 ml-auto">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Weekly Revenue & Schedules List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue analytics - Bar chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {isRtl ? 'تحليلات الإيرادات الأسبوعية' : 'Revenue Performance'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isRtl ? 'حجم المبيعات والمدفوعات اليومية بالتفصيل' : 'Daily digital and cash gym payments received'}
              </p>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-700/50" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                  contentStyle={{ 
                    backgroundColor: '#17102B', 
                    borderRadius: '12px', 
                    color: '#F8FAFC',
                    border: 'none',
                    fontSize: '12px'
                  }} 
                />
                <Bar dataKey="amount" fill="#06B6D4" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Classes List widget */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {isRtl ? 'حصص اليوم القادمة' : 'Upcoming Classes Today'}
              </h4>
              <Calendar className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="space-y-3 mt-4">
              {classes.slice(0, 3).map((cls, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-700/30 border border-slate-100/50 dark:border-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors"
                >
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold text-slate-800 dark:text-slate-100">
                      {isRtl ? cls.classNameAr : cls.classNameEn}
                    </h5>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">
                      {isRtl ? `المدرب: ${cls.trainerNameAr}` : `Coach: ${cls.trainerNameEn}`}
                    </p>
                    <span className="inline-block text-[10px] text-indigo-600 dark:text-indigo-400 font-medium">
                      {cls.timeSlot}
                    </span>
                  </div>
                  <div className="text-right space-y-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                      {cls.enrolled}/{cls.capacity}
                    </span>
                    <p className="text-[9px] text-slate-400">
                      {isRtl ? cls.roomAr : cls.roomEn}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button 
            onClick={() => onNavigate('schedules')}
            className="w-full mt-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:hover:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide transition-colors"
          >
            {isRtl ? 'عرض الجدول الأسبوعي بالكامل' : 'View Complete Schedule'}
          </button>
        </div>
      </div>

      {/* 5. Recent Active Members Table inside Dashboard */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {isRtl ? 'الأعضاء النشطون مؤخراً' : 'Recent Members Activity'}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isRtl ? 'قائمة سريعة بآخر المسجلين ومتابعة حضورهم' : 'Quick overview of registered gym members and statuses'}
            </p>
          </div>
          <button 
            onClick={() => onNavigate('members')}
            className="self-start text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>{isRtl ? 'إدارة جميع الأعضاء' : 'Manage All Members'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" dir={isRtl ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-700/60 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">{isRtl ? 'العضو' : 'Member'}</th>
                <th className="py-3 px-4">{isRtl ? 'الحالة' : 'Status'}</th>
                <th className="py-3 px-4">{isRtl ? 'نوع الاشتراك' : 'Subscription Plan'}</th>
                <th className="py-3 px-4">{isRtl ? 'زيارات الحضور' : 'Check-ins'}</th>
                <th className="py-3 px-4 text-center">{isRtl ? 'تاريخ الانتهاء' : 'Expires On'}</th>
                <th className="py-3 px-4 text-right">{isRtl ? 'الملف الشخصي' : 'Action'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700/30 text-sm">
              {members.slice(0, 4).map((member) => (
                <tr 
                  key={member.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors"
                >
                  <td className="py-3.5 px-4 flex items-center gap-3">
                    <img 
                      src={member.photo} 
                      alt={member.nameEn} 
                      className="w-10 h-10 rounded-full object-cover border-2 border-slate-100 dark:border-slate-700" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-100">
                        {isRtl ? member.nameAr : member.nameEn}
                      </h5>
                      <p className="text-xs text-slate-400">{member.email}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      member.status === 'active' 
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30' 
                        : member.status === 'pending'
                        ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/30'
                        : 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        member.status === 'active' ? 'bg-emerald-500' : member.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                      }`} />
                      {isRtl 
                        ? (member.status === 'active' ? 'نشط' : member.status === 'pending' ? 'معلق' : 'غير نشط')
                        : member.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 font-medium">
                    {isRtl ? member.planTypeAr : member.planTypeEn}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                    {member.attendanceCount} {isRtl ? 'أيام' : 'sessions'}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-xs text-slate-500 dark:text-slate-400">
                    {member.expiryDate}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => onSelectMember(member.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-indigo-600 hover:text-white dark:text-indigo-400 hover:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg border border-indigo-100 dark:border-indigo-800/60 transition-all duration-200"
                    >
                      {isRtl ? 'الملف الشخصي' : 'View Profile'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

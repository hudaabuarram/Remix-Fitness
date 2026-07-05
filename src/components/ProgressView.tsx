import React, { useMemo } from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
} from 'recharts';
import { TrendingDown, Award, Sparkles, Heart, Weight, Scale, CircleDot } from 'lucide-react';
import { GymMember, Language } from '../types';

interface ProgressViewProps {
  members: GymMember[];
  lang: Language;
}

export const ProgressView: React.FC<ProgressViewProps> = ({
  members,
  lang
}) => {
  const isRtl = lang === 'ar';

  const defaultMember = members[0] || { weight: 70, height: 170, bodyFat: 20, targetWeight: 65, bmi: 24.2 };

  // Weight progression history mock
  const weightHistory = [
    { name: isRtl ? 'الأسبوع 1' : 'Week 1', weight: defaultMember.weight + 4 },
    { name: isRtl ? 'الأسبوع 2' : 'Week 2', weight: defaultMember.weight + 2.5 },
    { name: isRtl ? 'الأسبوع 3' : 'Week 3', weight: defaultMember.weight + 1.2 },
    { name: isRtl ? 'الأسبوع 4' : 'Week 4', weight: defaultMember.weight },
  ];

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
          {isRtl ? 'تتبع التقدم والقياسات البدنية' : 'Progress & Weight Tracking'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl ? 'مراقبة الوزن والـ BMI، ومستوى استجابة الكتلة العضلية والدهون للتمرين.' : 'Track physical metrics progression, BMI variations, and muscle mass benchmarks.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI stats bar */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Scale className="w-5 h-5" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {isRtl ? 'مؤشرات العضو الحالي' : 'Current Target Body Stats'}
            </h4>
          </div>

          <div className="space-y-3 text-xs leading-relaxed">
            <div className="flex justify-between py-1 border-b border-slate-100/50">
              <span className="text-slate-400">{isRtl ? 'الوزن الحالي:' : 'Current Weight:'}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{defaultMember.weight} kg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100/50">
              <span className="text-slate-400">{isRtl ? 'الوزن المستهدف:' : 'Target Weight:'}</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{defaultMember.targetWeight} kg</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100/50">
              <span className="text-slate-400">{isRtl ? 'مؤشر كتلة الجسم (BMI):' : 'BMI Index:'}</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{defaultMember.bmi}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-400">{isRtl ? 'نسبة الدهون المقدرة:' : 'Fat Mass Index:'}</span>
              <span className="font-bold text-amber-500">{defaultMember.bodyFat}%</span>
            </div>
          </div>

          <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/40 rounded-xl text-[10px] text-slate-500 flex items-center gap-2">
            <Award className="w-4 h-4 text-indigo-500 shrink-0" />
            <span>
              {isRtl ? 'تبقى 4 كجم للوصول إلى الوزن المثالي المحدد.' : 'Only 4 kg remaining to reach the client weight goal.'}
            </span>
          </div>
        </div>

        {/* Progress Chart Recharts area */}
        <div className="md:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {isRtl ? 'منحنى انخفاض الوزن (أسابيع)' : 'Weight Deficit Curve'}
              </h4>
              <p className="text-xs text-slate-400">
                {isRtl ? 'سجل الوزن الأسبوعي للعضو الأول' : 'Weekly weight measurements for primary user'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>-4 kg {isRtl ? 'فقدان دهون' : 'overall fat lost'}</span>
            </span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-700/50" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94A3B8" fontSize={10} tickLine={false} domain={['dataMin - 2', 'dataMax + 2']} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#17102B', 
                    borderRadius: '12px', 
                    color: '#F8FAFC',
                    border: 'none',
                    fontSize: '11px'
                  }} 
                />
                <Area type="monotone" dataKey="weight" stroke="#4F46E5" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWeight)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Fitness Milestones Achievements Grid */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-4">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>{isRtl ? 'الأوسمة الشرفية والمكافآت' : 'Gamified Milestones achieved'}</span>
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-emerald-100/50 bg-emerald-50/20 text-xs flex items-start gap-3">
            <Award className="w-8 h-8 text-emerald-500 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-100">{isRtl ? 'مواظب حديدي' : 'Iron Compliance'}</h5>
              <p className="text-[10px] text-slate-500 mt-1">{isRtl ? 'حضور 12 جلسة تمرين متتالية.' : 'Checked in 12 days in a single month block.'}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-indigo-100/50 bg-indigo-50/20 text-xs flex items-start gap-3">
            <Heart className="w-8 h-8 text-indigo-500 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-100">{isRtl ? 'بطل اللياقة القلبية' : 'Cardio Smasher'}</h5>
              <p className="text-[10px] text-slate-500 mt-1">{isRtl ? 'حرق 5,000 سعرة حرارية كارديو.' : 'Burned 5,000 kcal total across running events.'}</p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-amber-100/50 bg-amber-50/20 text-xs flex items-start gap-3">
            <CircleDot className="w-8 h-8 text-amber-500 shrink-0" />
            <div>
              <h5 className="font-bold text-slate-800 dark:text-slate-100">{isRtl ? 'نمو عضلي متوازن' : 'InBody Hero'}</h5>
              <p className="text-[10px] text-slate-500 mt-1">{isRtl ? 'تخفيض نسبة الدهون إلى أقل من 20%.' : 'Maintained fat compositions under 20% thresholds.'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

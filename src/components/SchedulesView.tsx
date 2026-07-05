import React, { useState } from 'react';
import { Calendar, Clock, User, Home, BookOpen, Check, HelpCircle } from 'lucide-react';
import { ClassSchedule, Language } from '../types';

interface SchedulesViewProps {
  classes: ClassSchedule[];
  lang: Language;
  onUpdateEnrollment: (classId: string, enrolledCount: number) => void;
}

export const SchedulesView: React.FC<SchedulesViewProps> = ({
  classes,
  lang,
  onUpdateEnrollment
}) => {
  const isRtl = lang === 'ar';
  
  const [selectedDay, setSelectedDay] = useState<number>(1); // Monday by default
  const [enrolledClassIds, setEnrolledClassIds] = useState<string[]>(['CLS-1']); // pre-booked

  const daysOfWeek = [
    { num: 1, en: 'Mon', ar: 'الاثنين' },
    { num: 2, en: 'Tue', ar: 'الثلاثاء' },
    { num: 3, en: 'Wed', ar: 'الأربعاء' },
    { num: 4, en: 'Thu', ar: 'الخميس' },
    { num: 5, en: 'Fri', ar: 'الجمعة' },
  ];

  const filteredClasses = classes.filter(cls => cls.dayOfWeek === selectedDay);

  const toggleBookClass = (cls: ClassSchedule) => {
    if (enrolledClassIds.includes(cls.id)) {
      setEnrolledClassIds(prev => prev.filter(id => id !== cls.id));
      onUpdateEnrollment(cls.id, cls.enrolled - 1);
    } else {
      if (cls.enrolled >= cls.capacity) return;
      setEnrolledClassIds(prev => [...prev, cls.id]);
      onUpdateEnrollment(cls.id, cls.enrolled + 1);
    }
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
          {isRtl ? 'جداول الحصص الجماعية والتدريب' : 'Gym Schedules & Classes'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl ? 'استعراض الحصص الجماعية اليومية، توزيع القاعات والمدربين، وحجز التذاكر.' : 'Manage group classes, trainer shifts, room assignments, and seat capacities.'}
        </p>
      </div>

      {/* Week days Selector bar */}
      <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/60 shadow-xs max-w-lg">
        {daysOfWeek.map((day) => (
          <button
            key={day.num}
            onClick={() => setSelectedDay(day.num)}
            className={`flex-1 py-3 text-center rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedDay === day.num
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            {isRtl ? day.ar : day.en}
          </button>
        ))}
      </div>

      {/* Classes list under selected day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredClasses.length === 0 ? (
          <div className="md:col-span-2 py-16 text-center border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-slate-400">
            <Calendar className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-xs">{isRtl ? 'لا توجد حصص جماعية مجدولة لهذا اليوم.' : 'No group classes scheduled for this day yet.'}</p>
          </div>
        ) : (
          filteredClasses.map((cls) => {
            const isBooked = enrolledClassIds.includes(cls.id);
            const isFull = cls.enrolled >= cls.capacity;

            return (
              <div 
                key={cls.id}
                className={`bg-white dark:bg-slate-800 p-5 rounded-2xl border shadow-sm flex items-start justify-between gap-4 transition-all duration-300 ${
                  isBooked 
                    ? 'border-emerald-500 ring-2 ring-emerald-500/10' 
                    : 'border-slate-100 dark:border-slate-700/60 hover:shadow-md'
                }`}
              >
                <div className="space-y-3 flex-1">
                  <div>
                    <span className="text-[9px] font-mono font-bold text-indigo-500 uppercase">{cls.id}</span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                      {isRtl ? cls.classNameAr : cls.classNameEn}
                    </h3>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>{cls.timeSlot}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" />
                      <span>{isRtl ? `المدرب: ${cls.trainerNameAr}` : `Instructor: ${cls.trainerNameEn}`}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Home className="w-4 h-4 text-slate-400" />
                      <span>{isRtl ? `الموقع: ${cls.roomAr}` : `Room: ${cls.roomEn}`}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-2 border-t border-slate-50 dark:border-slate-700/50">
                    <span className="text-[10px] text-slate-400 font-semibold">{isRtl ? 'السعة الاستيعابية:' : 'Available Capacity:'}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                      {cls.enrolled} / {cls.capacity} {isRtl ? 'مقعد' : 'seats'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 h-full justify-between">
                  <button 
                    onClick={() => toggleBookClass(cls)}
                    disabled={!isBooked && isFull}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isBooked
                        ? 'bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30'
                        : isFull
                        ? 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {isBooked ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>{isRtl ? 'مؤكد' : 'Booked'}</span>
                      </>
                    ) : (
                      <span>{isRtl ? (isFull ? 'مكتمل' : 'احجز مقعداً') : (isFull ? 'Full' : 'Join Class')}</span>
                    )}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

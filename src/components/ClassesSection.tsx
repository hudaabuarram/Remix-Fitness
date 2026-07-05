import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, User, Clock, MapPin, CheckCircle, AlertCircle, X } from 'lucide-react';
import { webTranslations } from '../webTranslations';
import { ClassSchedule, Language } from '../types';

interface ClassesSectionProps {
  classes: ClassSchedule[];
  lang: Language;
  onBookClassSpot: (classId: string, memberName: string, phone: string, email: string) => void;
}

export function ClassesSection({ classes, lang, onBookClassSpot }: ClassesSectionProps) {
  const t = webTranslations[lang];
  const isRtl = lang === 'ar';
  const [selectedDay, setSelectedDay] = useState<number | 'all'>('all');
  
  // Booking modal states
  const [activeBookingClass, setActiveBookingClass] = useState<ClassSchedule | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('riyadh');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [formError, setFormError] = useState(false);

  const daysOfWeek = [
    { value: 0, label: t.sunday },
    { value: 1, label: t.monday },
    { value: 2, label: t.tuesday },
    { value: 3, label: t.wednesday },
    { value: 4, label: t.thursday },
    { value: 5, label: t.friday },
    { value: 6, label: t.saturday },
  ];

  const filteredClasses = selectedDay === 'all'
    ? classes
    : classes.filter(cls => cls.dayOfWeek === selectedDay);

  const handleOpenBooking = (cls: ClassSchedule) => {
    setActiveBookingClass(cls);
    setBookingSuccess(false);
    setFormError(false);
  };

  const handleCloseBooking = () => {
    setActiveBookingClass(null);
    setFullName('');
    setEmail('');
    setPhone('');
  };

  const handleSubmitBooking = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError(true);
      return;
    }
    
    if (activeBookingClass) {
      onBookClassSpot(activeBookingClass.id, fullName, phone, email);
    }
    
    setBookingSuccess(true);
    setFormError(false);
    setTimeout(() => {
      handleCloseBooking();
    }, 4000);
  };

  return (
    <section id="classes-schedule" className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            {t.classesTitle}
          </h2>
          <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            {t.classesSubtitle}
          </p>
        </div>

        {/* Weekly Tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-12" id="classes-day-filter">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              selectedDay === 'all'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200/50 dark:border-slate-700/50'
            }`}
          >
            {t.allDays}
          </button>
          {daysOfWeek.map((day) => (
            <button
              key={day.value}
              onClick={() => setSelectedDay(day.value)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDay === day.value
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/10'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/60 border border-slate-200/50 dark:border-slate-700/50'
              }`}
            >
              {day.label}
            </button>
          ))}
        </div>

        {/* Classes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClasses.length > 0 ? (
            filteredClasses.map((cls) => {
              const spotsLeft = cls.capacity - cls.enrolled;
              const isFull = spotsLeft <= 0;
              const classDay = daysOfWeek.find(d => d.value === cls.dayOfWeek)?.label;

              return (
                <motion.div
                  layout
                  key={cls.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-6 space-y-6">
                    {/* Header badge & day */}
                    <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="px-3 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                        {classDay}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 font-mono text-xs">
                        {cls.id}
                      </span>
                    </div>

                    {/* Class Name */}
                    <h3 className={`text-lg font-extrabold text-slate-950 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ${isRtl ? 'text-right' : 'text-left'}`}>
                      {isRtl ? cls.classNameAr : cls.classNameEn}
                    </h3>

                    {/* Details details */}
                    <div className={`space-y-3.5 text-xs text-slate-600 dark:text-slate-300 ${isRtl ? 'text-right' : 'text-left'}`}>
                      <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <Clock className="w-4 h-4 text-indigo-500 shrink-0" />
                        <span>{cls.timeSlot}</span>
                      </div>
                      <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <User className="w-4 h-4 text-purple-500 shrink-0" />
                        <span>
                          {t.trainer}: <strong className="font-semibold text-slate-800 dark:text-slate-200">{isRtl ? cls.trainerNameAr : cls.trainerNameEn}</strong>
                        </span>
                      </div>
                      <div className={`flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                        <span>
                          {t.room}: <strong className="font-semibold text-slate-800 dark:text-slate-200">{isRtl ? cls.roomAr : cls.roomEn}</strong>
                        </span>
                      </div>
                    </div>

                    {/* Capacity Indicator Bar */}
                    <div className="space-y-1.5">
                      <div className={`flex justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span>{t.capacityLimit}: {cls.capacity}</span>
                        <span className={isFull ? 'text-rose-500' : 'text-emerald-500'}>
                          {isFull ? t.classFull : `${spotsLeft} ${t.spotsLeft}`}
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700/60 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isFull ? 'bg-rose-500' : 'bg-indigo-600'
                          }`}
                          style={{ width: `${(cls.enrolled / cls.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking CTA Trigger */}
                  <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700/30">
                    <button
                      onClick={() => handleOpenBooking(cls)}
                      disabled={isFull}
                      className={`w-full py-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                        isFull
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs hover:shadow-md'
                      }`}
                    >
                      {isFull ? t.classFull : t.bookSpot}
                    </button>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/40">
              <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400 font-semibold text-sm">
                {isRtl ? 'لا توجد حصص جماعية مجدولة لهذا اليوم.' : 'No group classes scheduled for this day.'}
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Booking Form Overlay Modal */}
      <AnimatePresence>
        {activeBookingClass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseBooking}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative border border-slate-100 dark:border-slate-700/50 z-10"
            >
              {/* Modal header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center bg-indigo-500/5">
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t.bookingTitle}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {isRtl ? activeBookingClass.classNameAr : activeBookingClass.classNameEn}
                  </p>
                </div>
                <button
                  onClick={handleCloseBooking}
                  className="p-1 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Success Notification */}
              {bookingSuccess ? (
                <div className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {isRtl ? 'تم تأكيد الحجز المسبق!' : 'Spot Reserved Successfully!'}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed px-4">
                    {t.bookingSuccess}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmitBooking} className="p-6 space-y-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.bookingSubtitle}
                  </p>

                  {formError && (
                    <div className={`p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <AlertCircle className="w-4.5 h-4.5" />
                      <span>{t.bookingError}</span>
                    </div>
                  )}

                  {/* Name field */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t.fullName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={isRtl ? 'مثل: سارة الأحمد' : 'e.g., Sarah Smith'}
                      className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm border border-slate-200/60 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t.emailAddress} *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sarah@example.com"
                        className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm border border-slate-200/60 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t.phoneNumber} *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+966 50 123 4567"
                        className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm border border-slate-200/60 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-left`}
                      />
                    </div>
                  </div>

                  {/* Branch select */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                      {t.selectBranch}
                    </label>
                    <select
                      value={branch}
                      onChange={(e) => setBranch(e.target.value)}
                      className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm border border-slate-200/60 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      <option value="riyadh">{isRtl ? 'فرع الرياض - العليا' : 'Riyadh Branch - Olaya'}</option>
                      <option value="jeddah">{isRtl ? 'فرع جدة - الحمراء' : 'Jeddah Branch - Al Hamra'}</option>
                      <option value="khobar">{isRtl ? 'فرع الخبر - الحزام' : 'Khobar Branch - Belt Road'}</option>
                    </select>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 flex gap-3">
                    <button
                      type="button"
                      onClick={handleCloseBooking}
                      className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer text-center"
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/10 cursor-pointer text-center"
                    >
                      {t.confirmBooking}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

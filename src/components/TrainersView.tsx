import React, { useState } from 'react';
import { Star, Mail, Phone, Calendar, Clock, CheckCircle, ShieldCheck } from 'lucide-react';
import { Trainer, Language } from '../types';

interface TrainersViewProps {
  trainers: Trainer[];
  lang: Language;
}

export const TrainersView: React.FC<TrainersViewProps> = ({
  trainers,
  lang
}) => {
  const isRtl = lang === 'ar';
  
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [bookSuccess, setBookSuccess] = useState(false);

  const handleBookSession = (e: React.FormEvent) => {
    e.preventDefault();
    setBookSuccess(true);
    setTimeout(() => {
      setBookSuccess(false);
      setSelectedTrainer(null);
    }, 2500);
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
          {isRtl ? 'نخبة المدربين والكباتن' : 'Professional Personal Trainers'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl ? 'استعراض التقييمات، مجالات التخصص، عدد العملاء، وجدولة جلسات الكوتشينغ الشخصية.' : 'View ratings, custom bodybuilding specialties, client rosters, and book PT sessions.'}
        </p>
      </div>

      {/* Trainers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {trainers.map((trainer) => (
          <div 
            key={trainer.id}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm overflow-hidden flex flex-col justify-between"
          >
            {/* Photo / Rating overlay */}
            <div className="relative h-48 bg-slate-100 dark:bg-slate-900">
              <img 
                src={trainer.photo} 
                alt={trainer.nameEn} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-white/95 text-slate-900 font-bold px-2.5 py-1 rounded-full text-[10px] flex items-center gap-1 shadow-sm">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>{trainer.rating}</span>
              </div>
            </div>

            {/* Profile info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[9px] font-mono font-bold text-indigo-500 uppercase">{trainer.id}</span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isRtl ? trainer.nameAr : trainer.nameEn}
                  </h3>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  {isRtl ? trainer.specialtyAr : trainer.specialtyEn}
                </p>

                <div className="pt-2 border-t border-slate-50 dark:border-slate-700/50 space-y-1 font-mono text-slate-400">
                  <div className="flex justify-between">
                    <span>{isRtl ? 'العملاء النشطون:' : 'Active clients:'}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{trainer.clientsCount} {isRtl ? 'أعضاء' : 'clients'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isRtl ? 'أوقات الدوام:' : 'Available hours:'}</span>
                    <span className="font-bold text-slate-700 dark:text-slate-200">{trainer.availability}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-50 dark:border-slate-700/50">
                <button 
                  onClick={() => setSelectedTrainer(trainer)}
                  className="w-full py-2 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-100 dark:border-slate-600 cursor-pointer text-center"
                >
                  {isRtl ? 'حجز جلسة تدريب خاصة' : 'Book 1-on-1 Session'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* BOOK PT SESSION MODAL */}
      {selectedTrainer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl border border-slate-100 dark:border-slate-700 shadow-2xl p-6 text-xs space-y-4">
            
            {bookSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  {isRtl ? 'تم الحجز وتأكيد الجلسة بنجاح!' : 'Personal Session Confirmed!'}
                </h3>
                <p className="text-slate-500">
                  {isRtl ? 'تم إرسال رسالة نصية بالموعد المحدد وتنبيه كابتن التدريب.' : 'A text confirmation has been sent out with slot specifications.'}
                </p>
              </div>
            ) : (
              <>
                <div>
                  <span className="text-[9px] font-bold text-indigo-500 uppercase">{isRtl ? 'حجز حصة مخصصة' : 'Book Personal Session'}</span>
                  <h3 className="text-sm font-bold text-slate-950 dark:text-white mt-0.5">
                    {isRtl ? selectedTrainer.nameAr : selectedTrainer.nameEn}
                  </h3>
                </div>

                <form onSubmit={handleBookSession} className="space-y-3.5">
                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">{isRtl ? 'تاريخ الحصة المطلوبة *' : 'Preferred Date *'}</label>
                    <input 
                      type="date" 
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 font-semibold">{isRtl ? 'التوقيت المفضل *' : 'Preferred Hour *'}</label>
                    <select 
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none"
                    >
                      <option value="1">{isRtl ? '09:00 صباحاً - 10:00 صباحاً' : '09:00 AM - 10:00 AM'}</option>
                      <option value="2">{isRtl ? '02:00 ظهراً - 03:00 عصراً' : '02:00 PM - 03:00 PM'}</option>
                      <option value="3">{isRtl ? '06:00 مساءً - 07:00 مساءً' : '06:00 PM - 07:00 PM'}</option>
                    </select>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button 
                      type="submit"
                      className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all cursor-pointer"
                    >
                      {isRtl ? 'تأكيد الحجز' : 'Confirm Appointment'}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setSelectedTrainer(null)}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 bg-white font-semibold cursor-pointer"
                    >
                      {isRtl ? 'إلغاء' : 'Cancel'}
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

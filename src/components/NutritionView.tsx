import React, { useState, useMemo } from 'react';
import { Apple, Flame, Award, Plus, Trash2, Droplets, Check, Compass } from 'lucide-react';
import { MealLog, Language } from '../types';

interface NutritionViewProps {
  mealLogs: MealLog[];
  lang: Language;
  onAddMealLog: (log: MealLog) => void;
}

export const NutritionView: React.FC<NutritionViewProps> = ({
  mealLogs,
  lang,
  onAddMealLog
}) => {
  const isRtl = lang === 'ar';
  
  // Water intake count (glasses)
  const [waterCups, setWaterCups] = useState(4);
  const maxWaterCups = 10;

  // New Meal Form State
  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('lunch');
  const [foodEn, setFoodEn] = useState('');
  const [foodAr, setFoodAr] = useState('');
  const [cals, setCals] = useState(350);
  const [prot, setProt] = useState(25);
  const [carb, setCarb] = useState(30);
  const [fat, setFat] = useState(8);

  // Today's total macro counters
  const totals = useMemo(() => {
    return mealLogs.reduce((acc, log) => {
      acc.calories += log.calories;
      acc.protein += log.protein;
      acc.carbs += log.carbs;
      acc.fats += log.fats;
      return acc;
    }, { calories: 0, protein: 0, carbs: 0, fats: 0 });
  }, [mealLogs]);

  // Target recommendations
  const targetCals = 2200;
  const targetProtein = 150;
  const targetCarbs = 200;
  const targetFats = 70;

  const handleMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodEn || !foodAr) return;

    const log: MealLog = {
      id: `MEAL-${Math.floor(1000 + Math.random() * 9000)}`,
      memberId: 'MEM-101', // Default client
      date: new Date().toISOString().split('T')[0],
      mealType,
      foodNameEn: foodEn,
      foodNameAr: foodAr,
      calories: Number(cals),
      protein: Number(prot),
      carbs: Number(carb),
      fats: Number(fat)
    };

    onAddMealLog(log);
    
    // Reset Form
    setFoodEn('');
    setFoodAr('');
    setCals(350);
    setProt(25);
    setCarb(30);
    setFat(8);
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
          {isRtl ? 'تخطيط التغذية وتتبع السعرات' : 'Nutrition Hub & Meal Logger'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl ? 'تسجيل الوجبات اليومية، تتبع مستويات الترطيب وشرب الماء وموازنة الماكروز.' : 'Log physical diets, track water hydration, and calculate daily nutritional targets.'}
        </p>
      </div>

      {/* Target stats and progress bars */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Calorie Ring summary card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase">{isRtl ? 'السعرات المستهدفة' : 'Calorie Target'}</span>
            <h3 className="text-2xl font-bold text-slate-950 dark:text-white mt-1">
              {totals.calories} / {targetCals} kcal
            </h3>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>{isRtl ? 'التقدم اليومي' : 'Completion'}</span>
              <span>{Math.round((totals.calories / targetCals) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-600 dark:bg-indigo-500 h-full transition-all duration-500"
                style={{ width: `${Math.min((totals.calories / targetCals) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Protein progress card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">{isRtl ? 'البروتين اليومي' : 'Protein Target'}</span>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mt-1">
              {totals.protein} / {targetProtein}g
            </h3>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>{isRtl ? 'بناء عضلات' : 'Muscle recovery'}</span>
              <span>{Math.round((totals.protein / targetProtein) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${Math.min((totals.protein / targetProtein) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Carbs card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-amber-500 uppercase">{isRtl ? 'الكربوهيدرات اليومية' : 'Carbohydrates'}</span>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mt-1">
              {totals.carbs} / {targetCarbs}g
            </h3>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>{isRtl ? 'مخازن الطاقة' : 'Energy replenish'}</span>
              <span>{Math.round((totals.carbs / targetCarbs) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-amber-500 h-full transition-all duration-500"
                style={{ width: `${Math.min((totals.carbs / targetCarbs) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Fats card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-bold text-rose-500 uppercase">{isRtl ? 'الدهون الصحية' : 'Healthy Fats'}</span>
            <h3 className="text-xl font-bold text-slate-950 dark:text-white mt-1">
              {totals.fats} / {targetFats}g
            </h3>
          </div>
          <div className="mt-4 space-y-1">
            <div className="flex justify-between text-[10px] font-semibold text-slate-400">
              <span>{isRtl ? 'مستوى الهرمونات' : 'Hormonal support'}</span>
              <span>{Math.round((totals.fats / targetFats) * 100)}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-rose-500 h-full transition-all duration-500"
                style={{ width: `${Math.min((totals.fats / targetFats) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Meal Logging Form */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Apple className="w-5 h-5 text-indigo-500" />
            <span>{isRtl ? 'إدخال وجبة طعام يومية' : 'Meal entry tracker'}</span>
          </h3>

          <form onSubmit={handleMealSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">{isRtl ? 'نوع الوجبة' : 'Meal Category'}</label>
              <select 
                value={mealType} 
                onChange={(e: any) => setMealType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="breakfast">{isRtl ? 'فطور صباحي' : 'Breakfast'}</option>
                <option value="lunch">{isRtl ? 'غداء رئيسي' : 'Lunch'}</option>
                <option value="dinner">{isRtl ? 'عشاء مساء' : 'Dinner'}</option>
                <option value="snack">{isRtl ? 'سناك خفيف' : 'Snack'}</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">{isRtl ? 'اسم الوجبة (English)' : 'Food Name (English)'}</label>
              <input 
                type="text" 
                required
                value={foodEn} 
                onChange={(e) => setFoodEn(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                placeholder="e.g. Avocado Eggs Toast"
              />
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">{isRtl ? 'اسم الوجبة (عربي)' : 'Food Name (Arabic)'}</label>
              <input 
                type="text" 
                required
                value={foodAr} 
                onChange={(e) => setFoodAr(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                placeholder="مثال: توست الأفوكادو بالبيض"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="block text-slate-500 mb-1">{isRtl ? 'السعرات (kcal)' : 'Calories'}</label>
                <input 
                  type="number" 
                  value={cals} 
                  onChange={(e) => setCals(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">{isRtl ? 'البروتين (g)' : 'Protein'}</label>
                <input 
                  type="number" 
                  value={prot} 
                  onChange={(e) => setProt(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">{isRtl ? 'كاربس (g)' : 'Carbs'}</label>
                <input 
                  type="number" 
                  value={carb} 
                  onChange={(e) => setCarb(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1">{isRtl ? 'دهون (g)' : 'Fats'}</label>
                <input 
                  type="number" 
                  value={fat} 
                  onChange={(e) => setFat(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-mono"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full mt-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all cursor-pointer"
            >
              {isRtl ? 'إدراج الوجبة في السجل' : 'Log Food Entry'}
            </button>
          </form>
        </div>

        {/* Meal Logs Feed & Hydration animated Cups logger */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Hydro Tracker logger */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Droplets className="w-5 h-5 text-cyan-500 shrink-0" />
                <span>{isRtl ? 'تتبع شرب الماء ومستويات الترطيب' : 'Hydration Tracker'}</span>
              </h4>
              <p className="text-xs text-slate-500">
                {isRtl ? 'سجل أكواب الماء التي شربتها لتجنب الجفاف ومساعدة الخلايا.' : 'Track water cups consumed to maintain performance metrics.'}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {Array.from({ length: maxWaterCups }).map((_, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setWaterCups(idx + 1)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                      idx < waterCups 
                        ? 'bg-cyan-500 text-white hover:bg-cyan-600 scale-105' 
                        : 'bg-slate-50 dark:bg-slate-900 text-slate-400 hover:bg-slate-100 border border-slate-100/50'
                    }`}
                  >
                    <Droplets className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-cyan-50 dark:bg-cyan-950/20 border border-cyan-100 dark:border-cyan-900/40 p-4 rounded-2xl text-center self-start sm:self-center">
              <span className="text-xs text-cyan-600 dark:text-cyan-400 font-bold block">{isRtl ? 'مستوى الارتواء اليومي' : 'Total Intake'}</span>
              <h3 className="text-2xl font-extrabold text-slate-950 dark:text-white mt-1">{(waterCups * 0.25).toFixed(2)} L</h3>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{waterCups} / {maxWaterCups} {isRtl ? 'أكواب' : 'cups'}</span>
            </div>
          </div>

          {/* Meals logs feed */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-4">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {isRtl ? 'الوجبات المسجلة لليوم' : 'Logged Meals Feed'}
            </h4>

            <div className="divide-y divide-slate-50 dark:divide-slate-700/30 max-h-[180px] overflow-y-auto space-y-2">
              {mealLogs.length === 0 ? (
                <p className="text-center text-xs text-slate-400 py-6">{isRtl ? 'لا توجد وجبات مسجلة اليوم.' : 'No meal logs written today.'}</p>
              ) : (
                mealLogs.map((meal) => (
                  <div 
                    key={meal.id} 
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs hover:bg-slate-100 transition-colors"
                  >
                    <div>
                      <span className="inline-block px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 text-[8px] font-bold uppercase mr-1.5">
                        {meal.mealType}
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-100">
                        {isRtl ? meal.foodNameAr : meal.foodNameEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-[10px] text-slate-500">
                      <span>{meal.calories} kcal</span>
                      <span>P: {meal.protein}g</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

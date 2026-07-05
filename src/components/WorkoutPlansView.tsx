import React, { useState } from 'react';
import { 
  Dumbbell, Play, Trash2, Edit3, ClipboardList, PlusCircle, 
  Check, Layers, Award, Flame, Zap, Compass, RefreshCw
} from 'lucide-react';
import { WorkoutPlan, Exercise, Language } from '../types';

interface WorkoutPlansViewProps {
  workoutPlans: WorkoutPlan[];
  exercises: Exercise[];
  lang: Language;
  onAddWorkoutPlan: (newPlan: WorkoutPlan) => void;
}

export const WorkoutPlansView: React.FC<WorkoutPlansViewProps> = ({
  workoutPlans,
  exercises,
  lang,
  onAddWorkoutPlan
}) => {
  const isRtl = lang === 'ar';
  
  const [selectedPlanId, setSelectedPlanId] = useState<string>(workoutPlans[0]?.id || '');
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  
  // New Workout Plan Form State
  const [newTitleEn, setNewTitleEn] = useState('');
  const [newTitleAr, setNewTitleAr] = useState('');
  const [newDifficulty, setNewDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [newDuration, setNewDuration] = useState(8);
  const [newTargetEn, setNewTargetEn] = useState('');
  const [newTargetAr, setNewTargetAr] = useState('');
  const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

  // Find the currently active plan details
  const activePlan = workoutPlans.find(p => p.id === selectedPlanId) || workoutPlans[0];

  // Exercises belonging to the active plan, mapped by day of the week
  const planExercisesByDay = (day: number) => {
    if (!activePlan) return [];
    return activePlan.exercises.filter(we => we.dayOfWeek === day).map(we => {
      const details = exercises.find(e => e.id === we.exerciseId);
      return {
        ...we,
        details
      };
    });
  };

  const daysOfWeek = [
    { num: 1, en: 'Monday', ar: 'الاثنين' },
    { num: 2, en: 'Tuesday', ar: 'الثلاثاء' },
    { num: 3, en: 'Wednesday', ar: 'الأربعاء' },
    { num: 4, en: 'Thursday', ar: 'الخميس' },
    { num: 5, en: 'Friday', ar: 'الجمعة' },
  ];

  const handleCreatePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitleEn || !newTitleAr) return;

    const id = `WPL-${Math.floor(100 + Math.random() * 900)}`;
    const completePlan: WorkoutPlan = {
      id,
      titleEn: newTitleEn,
      titleAr: newTitleAr,
      difficultyEn: newDifficulty,
      difficultyAr: newDifficulty === 'Beginner' ? 'مبتدئ' : newDifficulty === 'Intermediate' ? 'متوسط' : 'متقدم',
      durationWeeks: Number(newDuration),
      targetEn: newTargetEn || 'General physical maintenance',
      targetAr: newTargetAr || 'صيانة بدنية عامة',
      exercises: selectedExerciseIds.map((exId, index) => ({
        id: `WE-${Math.floor(1000 + Math.random() * 9000)}`,
        exerciseId: exId,
        sets: 4,
        reps: '10-12',
        restSeconds: 90,
        dayOfWeek: (index % 5) + 1 // Distribute over 5 weekdays
      }))
    };

    onAddWorkoutPlan(completePlan);
    setSelectedPlanId(id);
    setIsCreatorOpen(false);
    
    // Reset Form
    setNewTitleEn('');
    setNewTitleAr('');
    setNewDifficulty('Intermediate');
    setNewDuration(8);
    setNewTargetEn('');
    setNewTargetAr('');
    setSelectedExerciseIds([]);
  };

  const handleToggleExerciseSelect = (id: string) => {
    setSelectedExerciseIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
            {isRtl ? 'الخطط والبرامج التدريبية' : 'Workout Program Builder'}
          </h1>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {isRtl ? 'تصميم وإسناد البرامج التدريبية المخصصة للأعضاء، ومتابعة تكراراتهم.' : 'Create physical training programs, assign targets, and adjust daily split boards.'}
          </p>
        </div>
        <button 
          onClick={() => setIsCreatorOpen(prev => !prev)}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm hover:scale-[1.02] transition-all cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{isCreatorOpen ? (isRtl ? 'عرض البرامج الحالية' : 'View Program Grid') : (isRtl ? 'إنشاء برنامج جديد' : 'Build Custom Plan')}</span>
        </button>
      </div>

      {isCreatorOpen ? (
        /* WORKOUT PLAN CREATOR / BUILDER FORM */
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isRtl ? 'تصميم برنامج لياقة جديد' : 'Physical Program Builder'}
            </h3>
            <p className="text-xs text-slate-500">
              {isRtl ? 'أدخل تفاصيل الترقية واستهداف العضلات، ثم اختر التمارين المشمولة.' : 'Specify durations, target muscle splits, and assign exercises.'}
            </p>
          </div>

          <form onSubmit={handleCreatePlan} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-500 mb-1.5 font-bold">{isRtl ? 'اسم البرنامج (English) *' : 'Program Title (English) *'}</label>
                <input 
                  type="text" 
                  required
                  value={newTitleEn} 
                  onChange={(e) => setNewTitleEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="e.g. 5-Day Extreme Fat Burner"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1.5 font-bold">{isRtl ? 'اسم البرنامج (عربي) *' : 'Program Title (Arabic) *'}</label>
                <input 
                  type="text" 
                  required
                  value={newTitleAr} 
                  onChange={(e) => setNewTitleAr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="مثال: حارق الدهون الفائق في 5 أيام"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1.5 font-bold">{isRtl ? 'المستوى المستهدف' : 'Target Difficulty'}</label>
                <select 
                  value={newDifficulty} 
                  onChange={(e: any) => setNewDifficulty(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="Beginner">{isRtl ? 'مبتدئ' : 'Beginner'}</option>
                  <option value="Intermediate">{isRtl ? 'متوسط' : 'Intermediate'}</option>
                  <option value="Advanced">{isRtl ? 'متقدم' : 'Advanced'}</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-500 mb-1.5 font-bold">{isRtl ? 'المدة الإجمالية للبرنامج (بالأسابيع)' : 'Total Program Length (Weeks)'}</label>
                <input 
                  type="number" 
                  value={newDuration} 
                  onChange={(e) => setNewDuration(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1.5 font-bold">{isRtl ? 'الهدف الرئيسي للبرنامج (English)' : 'Main Focus (English)'}</label>
                <input 
                  type="text" 
                  value={newTargetEn} 
                  onChange={(e) => setNewTargetEn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="e.g. Extreme conditioning & vascular health"
                />
              </div>
              <div>
                <label className="block text-slate-500 mb-1.5 font-bold">{isRtl ? 'الهدف الرئيسي للبرنامج (عربي)' : 'Main Focus (Arabic)'}</label>
                <input 
                  type="text" 
                  value={newTargetAr} 
                  onChange={(e) => setNewTargetAr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="مثال: تحسين عالي الأداء والتروية الدموية العضلية"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-slate-500 font-bold">{isRtl ? 'اختر التمارين المشمولة في خطة التدريب:' : 'Select Library Exercises to Include:'}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-52 overflow-y-auto p-1.5 border border-slate-100 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-900">
                {exercises.map((ex) => (
                  <div 
                    key={ex.id}
                    onClick={() => handleToggleExerciseSelect(ex.id)}
                    className={`p-2.5 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all ${
                      selectedExerciseIds.includes(ex.id)
                        ? 'border-indigo-600 bg-indigo-50/20 dark:border-indigo-500'
                        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Dumbbell className={`w-4 h-4 ${selectedExerciseIds.includes(ex.id) ? 'text-indigo-600' : 'text-slate-400'}`} />
                      <span className="font-bold text-slate-700 dark:text-slate-200">{isRtl ? ex.nameAr : ex.nameEn}</span>
                    </div>
                    {selectedExerciseIds.includes(ex.id) && (
                      <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
              <button 
                type="button" 
                onClick={() => setIsCreatorOpen(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 bg-white font-semibold cursor-pointer"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>
              <button 
                type="submit"
                disabled={selectedExerciseIds.length === 0}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold cursor-pointer"
              >
                {isRtl ? 'حفظ وإدراج خطة التمرين' : 'Assemble Program Split'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* SPLIT BOARD AND CURRENT LIST VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar selector */}
          <div className="space-y-2 lg:col-span-1 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm self-start">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              {isRtl ? 'البرامج المتاحة' : 'Available Routines'}
            </h4>
            <div className="space-y-1">
              {workoutPlans.map((plan) => (
                <button 
                  key={plan.id}
                  onClick={() => setSelectedPlanId(plan.id)}
                  className={`w-full text-right p-3 rounded-xl text-xs font-bold flex flex-col gap-1 transition-all cursor-pointer ${
                    selectedPlanId === plan.id 
                      ? 'bg-indigo-600 text-white shadow-xs shadow-indigo-100' 
                      : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="truncate">{isRtl ? plan.titleAr : plan.titleEn}</span>
                  <span className={`text-[10px] ${selectedPlanId === plan.id ? 'text-indigo-200' : 'text-slate-400 font-mono'}`}>
                    {plan.durationWeeks} {isRtl ? 'أسابيع' : 'weeks'} • {isRtl ? plan.difficultyAr : plan.difficultyEn}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Kanban splits for selected workout plan */}
          <div className="lg:col-span-3 space-y-4">
            {activePlan && (
              <>
                {/* Header overview details */}
                <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40">
                      {isRtl ? activePlan.difficultyAr : activePlan.difficultyEn}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {isRtl ? activePlan.titleAr : activePlan.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {isRtl ? `استهداف: ${activePlan.targetAr}` : `Focus target: ${activePlan.targetEn}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                      {activePlan.durationWeeks} {isRtl ? 'أسابيع دورة تمرين' : 'weeks full program Cycle'}
                    </span>
                  </div>
                </div>

                {/* Week split kanban list columns */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                  {daysOfWeek.map((day) => {
                    const dayExercises = planExercisesByDay(day.num);

                    return (
                      <div 
                        key={day.num} 
                        className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-xs flex flex-col gap-3 min-h-[300px]"
                      >
                        <div className="pb-2 border-b border-slate-50 dark:border-slate-700/50 flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {isRtl ? day.ar : day.en}
                          </h4>
                          <span className="px-1.5 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900 text-slate-400 font-mono text-[9px]">
                            {dayExercises.length}
                          </span>
                        </div>

                        <div className="space-y-2 flex-1 overflow-y-auto">
                          {dayExercises.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center p-3 text-slate-300 dark:text-slate-600">
                              <Compass className="w-5 h-5 mb-1 opacity-40" />
                              <span className="text-[9px] uppercase tracking-wider">{isRtl ? 'يوم راحة' : 'Rest Day'}</span>
                            </div>
                          ) : (
                            dayExercises.map((ex, idx) => (
                              <div 
                                key={ex.id}
                                className="group relative p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-950/40 border border-slate-100/60 dark:border-slate-700/60 transition-all cursor-pointer"
                              >
                                <span className="text-[8px] font-mono font-bold text-indigo-500 uppercase">
                                  {ex.details?.categoryEn}
                                </span>
                                <h5 className="font-bold text-slate-800 dark:text-slate-100 text-xs mt-0.5 truncate">
                                  {isRtl ? ex.details?.nameAr : ex.details?.nameEn}
                                </h5>
                                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                                  <span>{ex.sets} sets</span>
                                  <span>{ex.reps} reps</span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

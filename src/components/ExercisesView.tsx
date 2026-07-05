import React, { useState, useMemo } from 'react';
import { Dumbbell, Search, Heart, Info, Play, Compass, Filter, Sparkles } from 'lucide-react';
import { Exercise, Language } from '../types';

interface ExercisesViewProps {
  exercises: Exercise[];
  lang: Language;
}

export const ExercisesView: React.FC<ExercisesViewProps> = ({
  exercises,
  lang
}) => {
  const isRtl = lang === 'ar';
  
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'Strength' | 'Cardio' | 'Flexibility' | 'Bodyweight'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'Easy' | 'Medium' | 'Hard'>('all');
  const [favorites, setFavorites] = useState<string[]>(['EX-001', 'EX-005']); // initial favorites
  const [selectedEx, setSelectedEx] = useState<Exercise | null>(null);

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      const nameMatch = ex.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        ex.nameAr.includes(searchTerm);
      const categoryMatch = categoryFilter === 'all' || ex.categoryEn === categoryFilter;
      const diffMatch = difficultyFilter === 'all' || ex.difficulty === difficultyFilter;
      return nameMatch && categoryMatch && diffMatch;
    });
  }, [exercises, searchTerm, categoryFilter, difficultyFilter]);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
          {isRtl ? 'مكتبة التمارين الرياضية' : 'Exercise & Workout Library'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl ? 'استعراض التمارين الموجهة، الأدوات المستخدمة، مستويات الصعوبة والمدة.' : 'Review target muscle movements, equipment guides, and execution levels.'}
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
          <input 
            type="text" 
            placeholder={isRtl ? 'ابحث عن تمرين...' : 'Search exercises...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2.5">
          <select 
            value={categoryFilter} 
            onChange={(e: any) => setCategoryFilter(e.target.value)}
            className="text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
          >
            <option value="all">{isRtl ? 'جميع التصنيفات' : 'All Categories'}</option>
            <option value="Strength">{isRtl ? 'قوة' : 'Strength'}</option>
            <option value="Cardio">{isRtl ? 'كارديو' : 'Cardio'}</option>
            <option value="Flexibility">{isRtl ? 'مرونة' : 'Flexibility'}</option>
            <option value="Bodyweight">{isRtl ? 'وزن الجسم' : 'Bodyweight'}</option>
          </select>

          <select 
            value={difficultyFilter} 
            onChange={(e: any) => setDifficultyFilter(e.target.value)}
            className="text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200"
          >
            <option value="all">{isRtl ? 'جميع الصعوبات' : 'All Difficulties'}</option>
            <option value="Easy">{isRtl ? 'سهل' : 'Easy'}</option>
            <option value="Medium">{isRtl ? 'متوسط' : 'Medium'}</option>
            <option value="Hard">{isRtl ? 'صعب' : 'Hard'}</option>
          </select>
        </div>
      </div>

      {/* Grid of Exercises */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExercises.map((ex) => (
          <div 
            key={ex.id}
            onClick={() => setSelectedEx(ex)}
            className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            {/* Visual Header */}
            <div className="relative h-44 bg-slate-100 dark:bg-slate-900 overflow-hidden">
              <img 
                src={ex.imageUrl || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300'} 
                alt={ex.nameEn} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full text-[9px] font-bold uppercase bg-slate-900/80 text-white backdrop-blur-xs">
                  {isRtl ? ex.categoryAr : ex.categoryEn}
                </span>
                <button 
                  onClick={(e) => toggleFavorite(ex.id, e)}
                  className="p-2 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-rose-500 shadow-sm transition-colors cursor-pointer"
                >
                  <Heart className={`w-4.5 h-4.5 ${favorites.includes(ex.id) ? 'fill-rose-500 text-rose-500' : 'text-slate-500'}`} />
                </button>
              </div>
            </div>

            {/* Title / Description info */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {isRtl ? ex.nameAr : ex.nameEn}
                  </h3>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                    ex.difficulty === 'Easy' 
                      ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400' 
                      : ex.difficulty === 'Medium'
                      ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400'
                      : 'bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400'
                  }`}>
                    {ex.difficulty.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {isRtl ? ex.instructionsAr : ex.instructionsEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-50 dark:border-slate-700/50 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{isRtl ? `الأداة: ${ex.equipmentAr}` : `Equip: ${ex.equipmentEn}`}</span>
                <span>{ex.durationMinutes} mins</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DETAIL STEP MODAL */}
      {selectedEx && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl border border-slate-100 dark:border-slate-700 shadow-2xl overflow-hidden text-xs">
            {/* Visual banner */}
            <div className="relative h-48 bg-slate-100 dark:bg-slate-900">
              <img 
                src={selectedEx.imageUrl} 
                alt={selectedEx.nameEn} 
                className="w-full h-full object-cover" 
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => setSelectedEx(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900/80 transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Detailed Instructions list */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-indigo-600 dark:text-indigo-400">
                  {isRtl ? selectedEx.categoryAr : selectedEx.categoryEn}
                </span>
                <h3 className="text-base font-bold text-slate-950 dark:text-white mt-1">
                  {isRtl ? selectedEx.nameAr : selectedEx.nameEn}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] font-mono p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100/50 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block">{isRtl ? 'الأداة المطلوبة:' : 'Equipment required:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{isRtl ? selectedEx.equipmentAr : selectedEx.equipmentEn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">{isRtl ? 'المستوى المقدر:' : 'Execution level:'}</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{selectedEx.difficulty}</span>
                </div>
              </div>

              <div className="space-y-1.5 leading-relaxed">
                <h4 className="font-bold text-slate-800 dark:text-white">{isRtl ? 'تعليمات الأداء خطوة بخطوة:' : 'Step-by-step Instructions:'}</h4>
                <p className="text-slate-600 dark:text-slate-300">
                  {isRtl ? selectedEx.instructionsAr : selectedEx.instructionsEn}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
                <button 
                  onClick={() => setSelectedEx(null)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white rounded-lg font-bold cursor-pointer"
                >
                  {isRtl ? 'إغلاق نافذة التفاصيل' : 'Dismiss Instructions'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

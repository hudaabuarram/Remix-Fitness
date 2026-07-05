import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calculator, ClipboardList, Apple, Sparkles, Scale, Info, Check, Printer, Search } from 'lucide-react';
import { webTranslations } from '../webTranslations';
import { Exercise, Language, WorkoutPlan, WorkoutExercise } from '../types';

interface FitnessHubProps {
  exercises: Exercise[];
  workoutPlans: WorkoutPlan[];
  lang: Language;
}

export function FitnessHub({ exercises, workoutPlans, lang }: FitnessHubProps) {
  const t = webTranslations[lang];
  const isRtl = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'calculator' | 'workout' | 'nutrition'>('calculator');

  // 1. CALCULATOR STATE
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(26);
  const [weight, setWeight] = useState<number>(78);
  const [height, setHeight] = useState<number>(178);
  const [activity, setActivity] = useState<string>('moderate');
  const [goal, setGoal] = useState<string>('lose');
  const [calculated, setCalculated] = useState(false);

  // Results State
  const [bmi, setBmi] = useState(0);
  const [bmiStatus, setBmiStatus] = useState({ en: '', ar: '', color: '' });
  const [bmr, setBmr] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fats: 0 });

  // 2. WORKOUT BUILDER STATE
  const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [builderGoal, setBuilderGoal] = useState<'strength' | 'cardio' | 'hypertrophy'>('hypertrophy');
  const [generatedPlan, setGeneratedPlan] = useState<WorkoutPlan | null>(null);
  const [copied, setCopied] = useState(false);

  // 3. MEALS STATE
  const [searchMeal, setSearchMeal] = useState('');
  const [mealCategory, setMealCategory] = useState<'all' | 'high-protein' | 'low-carb' | 'balanced'>('all');

  // MEALS LIST
  const sampleMeals = [
    {
      nameEn: "Avocado Toast & Egg Whites",
      nameAr: "توست الأفوكادو وبياض البيض",
      calories: 380,
      protein: 26,
      carbs: 35,
      fats: 14,
      category: "balanced"
    },
    {
      nameEn: "Grilled Chicken & Sweet Potato",
      nameAr: "صدر دجاج مشوي وبطاطا حلوة",
      calories: 520,
      protein: 48,
      carbs: 45,
      fats: 10,
      category: "high-protein"
    },
    {
      nameEn: "Pan-Seared Salmon with Asparagus",
      nameAr: "سمك السلمون المشوي مع الهليون",
      calories: 460,
      protein: 38,
      carbs: 8,
      fats: 28,
      category: "low-carb"
    },
    {
      nameEn: "Oatmeal with Almond Butter & Honey",
      nameAr: "شوفان الشوفان بزبدة اللوز والعسل",
      calories: 450,
      protein: 15,
      carbs: 60,
      fats: 12,
      category: "balanced"
    },
    {
      nameEn: "Double Scoop Whey Shake with Banana",
      nameAr: "بروتين شيك مزدوج مع الموز",
      calories: 340,
      protein: 50,
      carbs: 28,
      fats: 3,
      category: "high-protein"
    },
    {
      nameEn: "Greek Yogurt Bowl with Berries",
      nameAr: "زبادي يوناني مبرد بالفراولة والتوت",
      calories: 260,
      protein: 24,
      carbs: 22,
      fats: 5,
      category: "low-carb"
    }
  ];

  // 1. METRICS CALCULATION METHOD
  const handleCalculate = () => {
    // BMI
    const hMeter = height / 100;
    const computedBmi = Number((weight / (hMeter * hMeter)).toFixed(1));
    setBmi(computedBmi);

    let status = { en: '', ar: '', color: '' };
    if (computedBmi < 18.5) {
      status = { en: 'Underweight', ar: 'وزن تحت الطبيعي', color: 'text-amber-500 bg-amber-500/10' };
    } else if (computedBmi >= 18.5 && computedBmi < 25) {
      status = { en: 'Normal Weight', ar: 'وزن مثالي سليم', color: 'text-emerald-500 bg-emerald-500/10' };
    } else if (computedBmi >= 25 && computedBmi < 30) {
      status = { en: 'Overweight', ar: 'وزن زائد خفيف', color: 'text-orange-500 bg-orange-500/10' };
    } else {
      status = { en: 'Obese', ar: 'سمنة مفرطة', color: 'text-rose-500 bg-rose-500/10' };
    }
    setBmiStatus(status);

    // BMR (Mifflin-St Jeor)
    let computedBmr = 0;
    if (gender === 'male') {
      computedBmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      computedBmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }
    setBmr(Math.round(computedBmr));

    // Daily Calories (TDEE)
    let multiplier = 1.2;
    if (activity === 'light') multiplier = 1.375;
    if (activity === 'moderate') multiplier = 1.55;
    if (activity === 'active') multiplier = 1.725;

    let tdee = computedBmr * multiplier;

    if (goal === 'lose') {
      tdee -= 450; // Caloric deficit
    } else if (goal === 'gain') {
      tdee += 350; // Caloric surplus
    }
    const finalCalories = Math.max(1200, Math.round(tdee));
    setDailyCalories(finalCalories);

    // Macros Calculator
    // Protein: 2.2g per kg for loss, 2g/kg for gain, 1.8g/kg for maintain
    let pGrams = 0;
    if (goal === 'lose') pGrams = weight * 2.2;
    else if (goal === 'gain') pGrams = weight * 2.0;
    else pGrams = weight * 1.8;
    pGrams = Math.round(pGrams);

    // Fats: 20% to 25% of total calories. 1g Fat = 9 kcal
    const fatPercent = goal === 'lose' ? 0.20 : 0.25;
    const fGrams = Math.round((finalCalories * fatPercent) / 9);

    // Carbs: Remaining calories. 1g Carb = 4 kcal
    const proteinCal = pGrams * 4;
    const fatCal = fGrams * 9;
    const carbCal = Math.max(400, finalCalories - (proteinCal + fatCal));
    const cGrams = Math.round(carbCal / 4);

    setMacros({
      protein: pGrams,
      fats: fGrams,
      carbs: cGrams
    });

    setCalculated(true);
  };

  // 2. WORKOUT ROUTINE GENERATOR METHOD
  const handleGenerateWorkout = () => {
    // Filter initial exercises based on goal
    let filteredExs = exercises;
    if (builderGoal === 'strength') {
      filteredExs = exercises.filter(e => e.categoryEn === 'Strength' || e.categoryEn === 'Bodyweight');
    } else if (builderGoal === 'cardio') {
      filteredExs = exercises.filter(e => e.categoryEn === 'Cardio' || e.categoryEn === 'Flexibility');
    }

    // Build routine structure
    const exercisesForPlan: WorkoutExercise[] = filteredExs.map((e, index) => {
      let reps = '10-12';
      let sets = 3;
      let rest = 75;

      if (experience === 'beginner') {
        sets = 3;
        reps = e.categoryEn === 'Cardio' ? '15 Mins' : '12 reps';
        rest = 90;
      } else if (experience === 'advanced') {
        sets = 4;
        reps = e.categoryEn === 'Cardio' ? '30 Mins Sprint' : '8-10 (heavy)';
        rest = 60;
      }

      return {
        id: `WE-GEN-${index + 1}`,
        exerciseId: e.id,
        sets,
        reps,
        restSeconds: rest,
        dayOfWeek: (index % 3) * 2 + 1 // Mon, Wed, Fri rotation
      };
    });

    const mockBuiltPlan: WorkoutPlan = {
      id: "WPL-GEN-MEMBER",
      titleEn: `Custom ${experience} ${builderGoal} Routine`,
      titleAr: `برنامج ${isRtl ? 'مخصص' : 'Custom'} ${isRtl ? 'للمستوى' : ''} ${
        experience === 'beginner' ? t.beginner : experience === 'intermediate' ? t.intermediate : t.advanced
      } - ${isRtl ? 'هدف' : ''} ${builderGoal === 'strength' ? 'القوة البدنية' : builderGoal === 'cardio' ? 'الكارديو واللياقة' : 'بناء العضلات'}`,
      difficultyEn: experience === 'beginner' ? 'Beginner' : experience === 'intermediate' ? 'Intermediate' : 'Advanced',
      difficultyAr: experience === 'beginner' ? 'مبتدئ' : experience === 'intermediate' ? 'متوسط' : 'متقدم',
      durationWeeks: 6,
      targetEn: `Scientific training program optimized for immediate physical adaptation.`,
      targetAr: `برنامج تدريبي علمي محسن للاستجابة العضلية والبدنية الفورية.`,
      exercises: exercisesForPlan
    };

    setGeneratedPlan(mockBuiltPlan);
  };

  const copyToClipboard = () => {
    if (!generatedPlan) return;
    const text = isRtl 
      ? `برنامج ريمكس الرياضي المخصص:\nالبرنامج: ${generatedPlan.titleAr}\nالصعوبة: ${generatedPlan.difficultyAr}\nالأسبوع: 6 أسابيع`
      : `Remix Custom Gym Routine:\nProgram: ${generatedPlan.titleEn}\nDifficulty: ${generatedPlan.difficultyEn}\nDuration: 6 Weeks`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 3. MEALS FILTERING
  const filteredMeals = sampleMeals.filter(m => {
    const matchesSearch = isRtl
      ? m.nameAr.includes(searchMeal)
      : m.nameEn.toLowerCase().includes(searchMeal.toLowerCase());
    const matchesCategory = mealCategory === 'all' || m.category === mealCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="fitness-hub" className="py-20 bg-white dark:bg-slate-900 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 rounded-full text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRtl ? 'أدوات ذكية متطورة' : 'SMART CLIENT WIDGETS'}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white font-sans">
            {t.hubTitle}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            {t.hubSubtitle}
          </p>
        </div>

        {/* Dynamic Category Navigation Switch */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 max-w-lg mx-auto mb-12">
          <button
            onClick={() => setActiveTab('calculator')}
            className={`flex-1 pb-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border-b-2 ${
              activeTab === 'calculator'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>{t.tabBmi}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex-1 pb-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border-b-2 ${
              activeTab === 'workout'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            <span>{t.tabWorkout}</span>
          </button>
          
          <button
            onClick={() => setActiveTab('nutrition')}
            className={`flex-1 pb-4 text-xs md:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border-b-2 ${
              activeTab === 'nutrition'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>{t.tabNutrition}</span>
          </button>
        </div>

        {/* Tab Canvas panels */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* PANEL 1: BMI & CALORIES CALCULATOR */}
            {activeTab === 'calculator' && (
              <motion.div
                key="calculator"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* Inputs card */}
                <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-850 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 space-y-6">
                  <h3 className={`text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                    <Scale className="w-5 h-5 text-indigo-500" />
                    <span>{isRtl ? 'أدخل مقاييسك الشخصية' : 'Personal Specifications'}</span>
                  </h3>

                  {/* Gender gender */}
                  <div className="space-y-2">
                    <span className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.gender}</span>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setGender('male')}
                        className={`py-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          gender === 'male'
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-750'
                        }`}
                      >
                        {t.male}
                      </button>
                      <button
                        onClick={() => setGender('female')}
                        className={`py-3 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          gender === 'female'
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-750'
                        }`}
                      >
                        {t.female}
                      </button>
                    </div>
                  </div>

                  {/* Weight Weight, Height Height, Age Age Grid */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.age}</label>
                      <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(Math.max(1, parseInt(e.target.value) || 0))}
                        className={`w-full p-3 rounded-xl bg-white dark:bg-slate-850 text-sm border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:outline-none font-bold text-center`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.weight}</label>
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(Math.max(10, parseInt(e.target.value) || 0))}
                        className={`w-full p-3 rounded-xl bg-white dark:bg-slate-850 text-sm border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:outline-none font-bold text-center`}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.height}</label>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(Math.max(50, parseInt(e.target.value) || 0))}
                        className={`w-full p-3 rounded-xl bg-white dark:bg-slate-850 text-sm border border-slate-200/80 dark:border-slate-700/80 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:outline-none font-bold text-center`}
                      />
                    </div>
                  </div>

                  {/* Activity level */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.activityLevel}</label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      className={`w-full p-3 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      <option value="sedentary">{t.actSedentary}</option>
                      <option value="light">{t.actLight}</option>
                      <option value="moderate">{t.actModerate}</option>
                      <option value="active">{t.actActive}</option>
                    </select>
                  </div>

                  {/* Goal */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.goal}</label>
                    <select
                      value={goal}
                      onChange={(e) => setGoal(e.target.value)}
                      className={`w-full p-3 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold border border-slate-200/80 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      <option value="lose">{t.goalLose}</option>
                      <option value="maintain">{t.goalMaintain}</option>
                      <option value="gain">{t.goalGain}</option>
                    </select>
                  </div>

                  {/* Calculate CTA button */}
                  <button
                    onClick={handleCalculate}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:from-indigo-500 hover:to-purple-500 transition-all cursor-pointer"
                  >
                    {t.calculate}
                  </button>
                </div>

                {/* Outputs card */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  {calculated ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-slate-950 text-white rounded-3xl p-6 md:p-8 border border-slate-800 flex-1 flex flex-col justify-between space-y-8"
                    >
                      <div className="space-y-1">
                        <span className="text-xs text-indigo-400 font-bold uppercase tracking-wider block">{t.results}</span>
                        <h4 className={`text-xl font-black ${isRtl ? 'text-right' : 'text-left'}`}>
                          {isRtl ? 'التركيبة والاحتياج البدني العلمي الخاص بك' : 'Your Customized Physiological Needs'}
                        </h4>
                      </div>

                      {/* Primary Metrics Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* BMI Box */}
                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                          <span className="text-slate-400 text-xxs font-bold block">{t.bmiText}</span>
                          <span className="text-2xl font-black tracking-tight text-indigo-400 block">{bmi}</span>
                          <span className={`inline-block text-xxs font-bold px-2 py-0.5 rounded ${bmiStatus.color}`}>
                            {isRtl ? bmiStatus.ar : bmiStatus.en}
                          </span>
                        </div>

                        {/* BMR Box */}
                        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-1">
                          <span className="text-slate-400 text-xxs font-bold block">{t.bmrText}</span>
                          <span className="text-2xl font-black tracking-tight text-purple-400 block">{bmr}</span>
                          <span className="text-slate-500 text-xxs block">{t.calories} / {isRtl ? 'يوم' : 'day'}</span>
                        </div>

                        {/* Daily calories */}
                        <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-900/40 space-y-1">
                          <span className="text-indigo-300 text-xxs font-bold block">{t.dailyCalText}</span>
                          <span className="text-2xl font-black tracking-tight text-emerald-400 block">{dailyCalories}</span>
                          <span className="text-slate-400 text-xxs block">{t.calories} / {isRtl ? 'يوم' : 'day'}</span>
                        </div>
                      </div>

                      {/* Macros progress split visual */}
                      <div className="space-y-4">
                        <h5 className={`text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                          <Apple className="w-4 h-4 text-emerald-500" />
                          <span>{t.macrosText}</span>
                        </h5>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          {/* Protein */}
                          <div className="space-y-1.5 p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                            <span className="text-xs text-indigo-400 font-semibold block">{t.protein}</span>
                            <span className="text-base font-black text-slate-100 block">
                              {macros.protein}{t.grams}
                            </span>
                            <span className="text-xxs text-slate-400 block">{macros.protein * 4} {t.calories}</span>
                          </div>

                          {/* Carbs */}
                          <div className="space-y-1.5 p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                            <span className="text-xs text-purple-400 font-semibold block">{t.carbs}</span>
                            <span className="text-base font-black text-slate-100 block">
                              {macros.carbs}{t.grams}
                            </span>
                            <span className="text-xxs text-slate-400 block">{macros.carbs * 4} {t.calories}</span>
                          </div>

                          {/* Fats */}
                          <div className="space-y-1.5 p-3 rounded-xl bg-pink-500/5 border border-pink-500/10">
                            <span className="text-xs text-pink-400 font-semibold block">{t.fats}</span>
                            <span className="text-base font-black text-slate-100 block">
                              {macros.fats}{t.grams}
                            </span>
                            <span className="text-xxs text-slate-400 block">{macros.fats * 9} {t.calories}</span>
                          </div>
                        </div>

                        {/* Interactive stacked multi-color bar */}
                        <div className="w-full h-3 rounded-full bg-slate-800 flex overflow-hidden">
                          <div className="h-full bg-indigo-500" style={{ width: `${(macros.protein * 4 / dailyCalories) * 100}%` }} title="Protein" />
                          <div className="h-full bg-purple-500" style={{ width: `${(macros.carbs * 4 / dailyCalories) * 100}%` }} title="Carbs" />
                          <div className="h-full bg-pink-500" style={{ width: `${(macros.fats * 9 / dailyCalories) * 100}%` }} title="Fats" />
                        </div>
                      </div>

                    </motion.div>
                  ) : (
                    <div className="bg-slate-50 dark:bg-slate-850/30 rounded-3xl p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 flex-1 flex flex-col justify-center items-center">
                      <Calculator className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
                      <h4 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-2">
                        {isRtl ? 'في انتظار تفاصيلك الحيوية' : 'Awaiting Your Input Details'}
                      </h4>
                      <p className="text-xs text-slate-400 max-w-sm">
                        {isRtl 
                          ? 'أدخل بيانات وزنك الحالي وطولك وهدفك على الجانب وسنقوم بحساب المقاييس والماكروز العلمية لك فوراً.'
                          : 'Provide your details on the side to generate a full customized science-backed macro plan and BMI breakdown.'}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* PANEL 2: INSTANT WORKOUT BUILDER */}
            {activeTab === 'workout' && (
              <motion.div
                key="workout"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Options selectors */}
                <div className="p-6 bg-slate-50 dark:bg-slate-850 rounded-3xl border border-slate-100 dark:border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                  {/* Skill level */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.difficulty}</label>
                    <select
                      value={experience}
                      onChange={(e) => setExperience(e.target.value as any)}
                      className={`w-full p-3 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      <option value="beginner">{t.beginner}</option>
                      <option value="intermediate">{t.intermediate}</option>
                      <option value="advanced">{t.advanced}</option>
                    </select>
                  </div>

                  {/* Fitness purpose */}
                  <div className="space-y-1">
                    <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{isRtl ? 'الهدف المباشر' : 'Immediate Target'}</label>
                    <select
                      value={builderGoal}
                      onChange={(e) => setBuilderGoal(e.target.value as any)}
                      className={`w-full p-3 rounded-xl bg-white dark:bg-slate-800 text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      <option value="hypertrophy">{isRtl ? 'تضخيم العضلات والقوة (Hypertrophy)' : 'Muscle Hypertrophy'}</option>
                      <option value="strength">{isRtl ? 'بناء القوة القصوى (Max Strength)' : 'Max Power Strength'}</option>
                      <option value="cardio">{isRtl ? 'اللياقة وحرق الدهون (HIIT Cardio)' : 'Cardio & Conditioning'}</option>
                    </select>
                  </div>

                  {/* Trigger */}
                  <button
                    onClick={handleGenerateWorkout}
                    className="py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{t.generatePlan}</span>
                  </button>
                </div>

                {/* Routine display */}
                {generatedPlan ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border border-slate-100 dark:border-slate-750 space-y-6"
                  >
                    {/* Header and metadata */}
                    <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-700 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <h4 className="text-lg md:text-xl font-black text-slate-950 dark:text-white">
                          {isRtl ? generatedPlan.titleAr : generatedPlan.titleEn}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {isRtl ? generatedPlan.targetAr : generatedPlan.targetEn}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        {/* Copy details */}
                        <button
                          onClick={copyToClipboard}
                          className="px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 flex items-center gap-1.5 cursor-pointer"
                        >
                          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Printer className="w-4 h-4" />}
                          <span>{copied ? (isRtl ? 'تم النسخ!' : 'Copied!') : (isRtl ? 'طباعة / نسخ' : 'Print / Copy')}</span>
                        </button>
                      </div>
                    </div>

                    {/* Exercise items list */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {generatedPlan.exercises.map((we, idx) => {
                        // Find matching exercise details
                        const baseEx = exercises.find(e => e.id === we.exerciseId);
                        if (!baseEx) return null;

                        const dayLabel = isRtl 
                          ? (we.dayOfWeek === 1 ? 'الاثنين' : we.dayOfWeek === 3 ? 'الأربعاء' : 'الخميس')
                          : (we.dayOfWeek === 1 ? 'Monday' : we.dayOfWeek === 3 ? 'Wednesday' : 'Thursday');

                        return (
                          <div 
                            key={we.id}
                            className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                          >
                            <img 
                              src={baseEx.imageUrl} 
                              alt={baseEx.nameEn}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="space-y-1 flex-1">
                              <div className={`flex justify-between items-center text-xxs font-bold text-indigo-600 dark:text-indigo-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                <span>{dayLabel}</span>
                                <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40">{baseEx.categoryEn}</span>
                              </div>
                              <h5 className="font-extrabold text-sm text-slate-950 dark:text-white">
                                {isRtl ? baseEx.nameAr : baseEx.nameEn}
                              </h5>
                              <p className="text-xxs text-slate-500 dark:text-slate-400 line-clamp-1">
                                {isRtl ? baseEx.instructionsAr : baseEx.instructionsEn}
                              </p>
                              
                              <div className={`flex gap-3 text-xxs font-semibold text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800 mt-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                                <span>{we.sets} {t.sets}</span>
                                <span>•</span>
                                <span>{we.reps}</span>
                                <span>•</span>
                                <span>{we.restSeconds}s {t.rest}</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <div className="bg-slate-50 dark:bg-slate-850/30 rounded-3xl p-12 text-center border border-dashed border-slate-200 dark:border-slate-800 flex flex-col justify-center items-center">
                    <ClipboardList className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
                    <h4 className="text-base font-bold text-slate-700 dark:text-slate-300 mb-2">
                      {isRtl ? 'أطلق برنامج التدريب الخاص بك' : 'Launch Your High-Performance Routine'}
                    </h4>
                    <p className="text-xs text-slate-400 max-w-sm">
                      {isRtl 
                        ? 'اختر مستوى لياقتك الحالي وهدفك البدني في الأعلى لإنتاج برنامج تدريبي مخصص فائق الأداء والفعالية.'
                        : 'Configure your active experience level and primary objective above, and click build to generate a full customized training sheet.'}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {/* PANEL 3: NUTRITION INDEX GUIDE */}
            {activeTab === 'nutrition' && (
              <motion.div
                key="nutrition"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8"
              >
                {/* Search / Filters layout */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="relative w-full sm:max-w-xs">
                    <Search className={`absolute top-3 w-4.5 h-4.5 text-slate-400 ${isRtl ? 'left-3' : 'right-3'}`} />
                    <input
                      type="text"
                      value={searchMeal}
                      onChange={(e) => setSearchMeal(e.target.value)}
                      placeholder={isRtl ? 'ابحث عن وجبة طعام...' : 'Search meal guides...'}
                      className={`w-full p-2 px-3 rounded-xl bg-white dark:bg-slate-800 text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none ${isRtl ? 'text-right pl-10' : 'text-left pr-10'}`}
                    />
                  </div>

                  <div className="flex gap-2">
                    {['all', 'high-protein', 'low-carb', 'balanced'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setMealCategory(cat as any)}
                        className={`px-3 py-1.5 rounded-lg text-xxs font-extrabold transition-all cursor-pointer border ${
                          mealCategory === cat
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-750 hover:bg-slate-100'
                        }`}
                      >
                        {cat === 'all' ? (isRtl ? 'الكل' : 'All') : cat === 'high-protein' ? (isRtl ? 'بروتين عالٍ' : 'High Protein') : cat === 'low-carb' ? (isRtl ? 'كارب قليل' : 'Low Carb') : (isRtl ? 'متوازن' : 'Balanced')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Meals grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredMeals.map((meal, idx) => (
                    <div 
                      key={idx}
                      className={`p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-750 flex flex-col justify-between space-y-4 shadow-xs hover:shadow-md transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      <div className={`flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                          {isRtl ? meal.nameAr : meal.nameEn}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-xxs font-bold ${
                          meal.category === 'high-protein' ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400' :
                          meal.category === 'low-carb' ? 'bg-pink-50 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400' :
                          'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        }`}>
                          {meal.category === 'high-protein' ? (isRtl ? 'بروتين عالٍ' : 'High Protein') : meal.category === 'low-carb' ? (isRtl ? 'كارب منخفض' : 'Low Carb') : (isRtl ? 'متوازن' : 'Balanced')}
                        </span>
                      </div>

                      {/* Calorie tag */}
                      <div className={`flex items-baseline gap-1 ${isRtl ? 'justify-start flex-row-reverse' : 'justify-start'}`}>
                        <span className="text-xl font-black text-emerald-500">{meal.calories}</span>
                        <span className="text-xxs text-slate-400 font-semibold">{t.calories}</span>
                      </div>

                      {/* Macros split progress line */}
                      <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100 dark:border-slate-700/60">
                        <div className="space-y-0.5">
                          <span className="text-xxs text-slate-400 font-bold block">{t.protein}</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-100 block">{meal.protein}g</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-xxs text-slate-400 font-bold block">{t.carbs}</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-100 block">{meal.carbs}g</span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-xxs text-slate-400 font-bold block">{t.fats}</span>
                          <span className="text-xs font-black text-slate-800 dark:text-slate-100 block">{meal.fats}g</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

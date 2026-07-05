import { useState, useEffect, FormEvent } from 'react';
import { 
  Dumbbell, Users, CreditCard, Calendar, Apple, Phone, Globe, Sun, 
  Moon, Menu, X, Check, Award, Shield, Star, MessageSquare, ArrowUp 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Public Website Components
import { Hero } from './components/Hero';
import { ClassesSection } from './components/ClassesSection';
import { FitnessHub } from './components/FitnessHub';
import { MembershipsSection } from './components/MembershipsSection';
import { ContactSection } from './components/ContactSection';

// Seed Data & Types
import { 
  initialMembers, initialPlans, initialExercises, initialWorkoutPlans, 
  initialClasses, initialTrainers 
} from './data';
import { webTranslations } from './webTranslations';
import { GymMember, MembershipPlan, WorkoutPlan, Exercise, ClassSchedule, Language, Theme } from './types';

export default function App() {
  // 1. Theme & Language preferences
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('gym_lang');
    return (saved as Language) || 'ar';
  });

  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('gym_theme_v2');
    return (saved as Theme) || 'dark';
  });

  // 2. Local State Database (Synchronized with LocalStorage)
  const [members, setMembers] = useState<GymMember[]>(() => {
    const saved = localStorage.getItem('gym_members');
    return saved ? JSON.parse(saved) : initialMembers;
  });

  const [classes, setClasses] = useState<ClassSchedule[]>(() => {
    const saved = localStorage.getItem('gym_classes');
    return saved ? JSON.parse(saved) : initialClasses;
  });

  const [plans] = useState<MembershipPlan[]>(() => {
    return initialPlans;
  });

  const [exercises] = useState<Exercise[]>(() => {
    return initialExercises;
  });

  const [workoutPlans] = useState<WorkoutPlan[]>(() => {
    return initialWorkoutPlans;
  });

  const [trainers] = useState(() => {
    return initialTrainers;
  });

  // Navigation tab states ('home', 'classes', 'memberships', 'hub', 'contact')
  const [activeSection, setActiveSection] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Guest spot booking state
  const [showGuestPassModal, setShowGuestPassModal] = useState(false);

  // Sync to localStorages
  useEffect(() => {
    localStorage.setItem('gym_members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('gym_classes', JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem('gym_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('gym_theme_v2', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Monitor scroll for header background & top arrow
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Online Registration Callback
  const handleAddMember = (newMember: GymMember) => {
    setMembers(prev => [newMember, ...prev]);
    triggerToast(
      lang === 'ar' 
        ? `تهانينا ${newMember.nameAr}! تم تفعيل عضويتك الرقمية الفاخرة بنجاح.` 
        : `Congratulations ${newMember.nameEn}! Your premium digital membership card has been successfully activated.`
    );
  };

  // Class Spot Booking Callback (decrements enrollment capability)
  const handleBookClassSpot = (classId: string, memberName: string, phone: string, email: string) => {
    setClasses(prev => prev.map(cls => {
      if (cls.id === classId && cls.enrolled < cls.capacity) {
        return {
          ...cls,
          enrolled: cls.enrolled + 1
        };
      }
      return cls;
    }));

    triggerToast(
      lang === 'ar'
        ? `أهلاً ${memberName}! تم حجز مقعدك التجريبي بنجاح، نراك قريباً.`
        : `Hello ${memberName}! Your guest spot is locked. We look forward to seeing you!`
    );
  };

  // Trainer Consultation Request Callback
  const handleTrainerConsultation = (trainerName: string) => {
    triggerToast(
      lang === 'ar'
        ? `تم إرسال طلبك للكابتن ${trainerName}. سيتواصل معك قريباً.`
        : `Your consultation request is sent to ${trainerName}. They will call you shortly.`
    );
  };

  const isRtl = lang === 'ar';
  const t = webTranslations[lang];

  // Helper to jump scroll to top of page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Nav Links configuration
  const navLinks = [
    { key: 'home', label: t.navHome },
    { key: 'classes', label: t.navClasses },
    { key: 'memberships', label: t.navMemberships },
    { key: 'hub', label: t.navHub },
    { key: 'contact', label: t.navContact }
  ];

  return (
    <div className="min-h-screen font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300 flex flex-col selection:bg-indigo-500 selection:text-white">
      
      {/* 1. PREMIUM HEADER / NAV BAR */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 transition-all duration-200 shadow-xs">
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between max-w-7xl">
          
          {/* Brand Logo */}
          <button 
            onClick={() => { setActiveSection('home'); scrollToTop(); }}
            className="flex items-center gap-3 group cursor-pointer text-left"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform">
              <Dumbbell className="w-5.5 h-5.5" />
            </div>
            <div className="leading-tight">
              <span className="block font-black text-sm md:text-base tracking-wider text-indigo-600 dark:text-indigo-400">
                {isRtl ? 'ريمكس فتنس' : 'REMIX FITNESS'}
              </span>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                {isRtl ? 'نادي صحي فاخر' : 'Premium Health Club'}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.key;
              return (
                <button
                  key={link.key}
                  onClick={() => {
                    setActiveSection(link.key);
                    scrollToTop();
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Actions (Bilingual + Theme Toggle + CTA) */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Lang switch */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-xs font-bold cursor-pointer text-slate-700 dark:text-slate-300"
              title={isRtl ? 'Change to English' : 'تغيير للعربية'}
            >
              <Globe className="w-4 h-4 text-indigo-500" />
              <span>{isRtl ? 'English' : 'العربية'}</span>
            </button>

            {/* Theme switch */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5 text-amber-500 animate-spin-slow" />}
            </button>

            {/* VIP Booking Button */}
            <button
              onClick={() => setShowGuestPassModal(true)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/10 cursor-pointer transition-all"
            >
              {t.bookSession}
            </button>
          </div>

          {/* Mobile Actions burger toggle button */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Quick Lang Switch on mobile */}
            <button
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-bold"
            >
              <Globe className="w-4 h-4 text-indigo-500" />
            </button>

            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400"
            >
              {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

        </div>
      </header>

      {/* 2. MOBILE RESPONSIVE DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Drawer body */}
            <motion.div
              initial={{ x: isRtl ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRtl ? '100%' : '-100%' }}
              className="relative w-72 max-w-xs bg-white dark:bg-slate-950 h-full shadow-2xl p-6 flex flex-col justify-between border-r border-slate-100 dark:border-slate-900 z-50"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-900">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                      <Dumbbell className="w-4.5 h-4.5" />
                    </div>
                    <span className="font-black text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      {isRtl ? 'ريمكس فتنس' : 'REMIX FIT'}
                    </span>
                  </div>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>

                {/* Mobile links */}
                <nav className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive = activeSection === link.key;
                    return (
                      <button
                        key={link.key}
                        onClick={() => {
                          setActiveSection(link.key);
                          setMobileMenuOpen(false);
                          scrollToTop();
                        }}
                        className={`w-full text-right p-3 rounded-xl text-xs font-bold flex items-center gap-3 transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900'
                        }`}
                      >
                        <span className="flex-1 text-start">{link.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom CTA */}
              <div className="space-y-4">
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowGuestPassModal(true); }}
                  className="w-full py-3.5 rounded-xl bg-indigo-600 text-white font-bold text-xs"
                >
                  {t.bookSession}
                </button>
                <p className="text-[10px] text-slate-400 text-center uppercase tracking-widest font-semibold">
                  © 2026 Remix VIP Club
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. MAIN SECTION RENDERER PANEL */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* SECTION: HOME (LANDING CONTENT) */}
            {activeSection === 'home' && (
              <>
                <Hero 
                  lang={lang} 
                  onNavigateToPlans={() => setActiveSection('memberships')} 
                  onOpenGuestPass={() => setShowGuestPassModal(true)} 
                />

                {/* WHY CHOOSE REMIX */}
                <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-200">
                  <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white font-sans">
                        {t.whyTitle}
                      </h2>
                      <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full" />
                      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                        {t.whySubtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {/* Item 1 */}
                      <div className={`bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Users className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{t.why1Title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.why1Desc}</p>
                      </div>

                      {/* Item 2 */}
                      <div className={`bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Dumbbell className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{t.why2Title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.why2Desc}</p>
                      </div>

                      {/* Item 3 */}
                      <div className={`bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Apple className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{t.why3Title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.why3Desc}</p>
                      </div>

                      {/* Item 4 */}
                      <div className={`bg-slate-50 dark:bg-slate-850 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4 hover:border-indigo-500/40 dark:hover:border-indigo-500/40 transition-all ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{t.why4Title}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{t.why4Desc}</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* OUR TRAINERS SECTION */}
                <section className="py-20 bg-slate-50 dark:bg-slate-950/40 transition-colors duration-200">
                  <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white font-sans">
                        {t.trainersTitle}
                      </h2>
                      <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full" />
                      <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
                        {t.trainersSubtitle}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {trainers.map((trn) => (
                        <div 
                          key={trn.id}
                          className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-700/50 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                        >
                          <div className="relative aspect-[1.1/1] overflow-hidden">
                            <img 
                              src={trn.photo} 
                              alt={trn.nameEn} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                            
                            <div className={`absolute bottom-4 left-4 right-4 flex items-center justify-between ${isRtl ? 'flex-row-reverse' : ''}`}>
                              <span className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-bold text-xxs tracking-wider uppercase">
                                {trn.id}
                              </span>
                              
                              <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs bg-slate-900/80 px-2 py-1 rounded-lg">
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                <span>{trn.rating}</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                            <div className={`space-y-2 ${isRtl ? 'text-right' : 'text-left'}`}>
                              <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                                {isRtl ? trn.nameAr : trn.nameEn}
                              </h4>
                              <p className="text-xxs font-bold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider">
                                {t.specialty}: {isRtl ? trn.specialtyAr : trn.specialtyEn}
                              </p>
                              <p className="text-xxs text-slate-500 dark:text-slate-400 font-semibold">
                                {t.availability}: {trn.availability}
                              </p>
                            </div>

                            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-2">
                              <div className={`flex justify-between text-xxs font-bold text-slate-400 ${isRtl ? 'flex-row-reverse' : ''}`}>
                                <span>{t.clients}</span>
                                <span className="text-slate-700 dark:text-slate-200">{trn.clientsCount} {isRtl ? 'مشترك مفعّل' : 'members'}</span>
                              </div>
                              
                              <button
                                onClick={() => handleTrainerConsultation(isRtl ? trn.nameAr : trn.nameEn)}
                                className="w-full py-2.5 mt-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 font-bold text-xxs transition-all cursor-pointer"
                              >
                                {t.bookConsultation}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-200">
                  <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                      <h2 className="text-3xl md:text-4xl font-extrabold text-slate-950 dark:text-white font-sans">
                        {isRtl ? 'قصص نجاح أعضاء ريمكس' : 'Remix Transformation Success Stories'}
                      </h2>
                      <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                      {/* Story 1 */}
                      <div className={`p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 space-y-4 relative ${isRtl ? 'text-right' : 'text-left'}`}>
                        <MessageSquare className={`absolute top-6 text-indigo-500/10 w-16 h-16 ${isRtl ? 'left-6' : 'right-6'}`} />
                        <div className={`flex items-center gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <img 
                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120" 
                            alt="Sarah Smith" 
                            className="w-12 h-12 rounded-full object-cover border border-indigo-500/20"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">{isRtl ? 'سارة جينكينز' : 'Sarah Jenkins'}</h4>
                            <span className="text-[10px] text-slate-400 font-bold">{isRtl ? 'خسرت 12 كجم في 4 أشهر' : 'Lost 12kg in 4 months'}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light italic">
                          {isRtl 
                            ? '"ريمكس فتنس غيّر حياتي بالكامل! لم يكن التدريب مجرد تمرين رياضي، بل كان نظام حياة متكامل بمساعدة كابتن فهد والخطط الغذائية الدقيقة والتتبع المستمر لمقاييس الوزن والماكروز."'
                            : '"Remix totally redefined my health journey! The community is incredibly supportive, the state-of-the-art equipments are elite, and the macro nutrition calculators are incredibly exact. Highly recommend!"'}
                        </p>
                      </div>

                      {/* Story 2 */}
                      <div className={`p-6 rounded-3xl bg-slate-50 dark:bg-slate-850 border border-slate-100 dark:border-slate-800 space-y-4 relative ${isRtl ? 'text-right' : 'text-left'}`}>
                        <MessageSquare className={`absolute top-6 text-indigo-500/10 w-16 h-16 ${isRtl ? 'left-6' : 'right-6'}`} />
                        <div className={`flex items-center gap-3.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <img 
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=120" 
                            alt="Fahad" 
                            className="w-12 h-12 rounded-full object-cover border border-indigo-500/20"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">{isRtl ? 'فهد العتيبي' : 'Fahad Al-Otaibi'}</h4>
                            <span className="text-[10px] text-slate-400 font-bold">{isRtl ? 'بنى 8 كجم كتلة عضلية صافية' : 'Gained 8kg pure muscle mass'}</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-light italic">
                          {isRtl 
                            ? '"صالات الحديد هنا بمثابة جنة لعشاق بناء القوة والكمال العضلي. الأوزان مريحة والمنصات الأولمبية ضخمة والأجهزة مصنعة بأعلى جودة ممكنة. المدربون دائماً متواجدون للتوجيه المخلص."'
                            : '"The heavy lifters arena here is paradise. Outstanding space, top-of-the-line mechanical equipment, and highly specialized coaches. Getting the VIP online card took minutes and the service is perfect."'}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}

            {/* SECTION: GROUP CLASSES SCHEDULE */}
            {activeSection === 'classes' && (
              <ClassesSection 
                classes={classes} 
                lang={lang} 
                onBookClassSpot={handleBookClassSpot} 
              />
            )}

            {/* SECTION: MEMBERSHIP PLANS & ONLINE SUBSCRIPTION */}
            {activeSection === 'memberships' && (
              <MembershipsSection 
                plans={plans} 
                lang={lang} 
                onRegisterMember={handleAddMember} 
              />
            )}

            {/* SECTION: INTERACTIVE FITNESS HUB (CALCULATORS, BUILDERS) */}
            {activeSection === 'hub' && (
              <FitnessHub 
                exercises={exercises} 
                workoutPlans={workoutPlans} 
                lang={lang} 
              />
            )}

            {/* SECTION: CONTACT US & BRANCHES */}
            {activeSection === 'contact' && (
              <ContactSection lang={lang} />
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* 4. PREMIUM FOOTER */}
      <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-8 transition-colors duration-200 shrink-0">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Brand details */}
            <div className={`space-y-4 md:col-span-2 ${isRtl ? 'text-right' : 'text-left'}`}>
              <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <span className="font-black text-sm text-slate-200 tracking-wider">REMIX FITNESS</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
                {t.footerDesc}
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className={`space-y-3 ${isRtl ? 'text-right' : 'text-left'}`}>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">{isRtl ? 'روابط سريعة' : 'Quick links'}</h4>
              <ul className="space-y-2 text-xs font-semibold">
                {navLinks.map((link) => (
                  <li key={link.key}>
                    <button 
                      onClick={() => { setActiveSection(link.key); scrollToTop(); }}
                      className="hover:text-indigo-400 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact */}
            <div className={`space-y-3 ${isRtl ? 'text-right' : 'text-left'}`}>
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest">{isRtl ? 'تواصل معنا' : 'Contact'}</h4>
              <ul className="space-y-2 text-xs">
                <li>9200-REMIX (73649)</li>
                <li>info@remixfitness.com</li>
                <li>{isRtl ? 'الرياض • جدة • الخبر' : 'Riyadh • Jeddah • Khobar'}</li>
              </ul>
            </div>

          </div>

          <div className="h-px bg-slate-900 mb-8" />

          {/* Copywrite */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-medium text-slate-500">
            <span>{t.copyright}</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-400">{isRtl ? 'الشروط والأحكام' : 'Terms & Conditions'}</a>
              <a href="#" className="hover:text-slate-400">{isRtl ? 'سياسة الخصوصية' : 'Privacy Policy'}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* 5. GUEST PASS BOOKING MODAL */}
      <AnimatePresence>
        {showGuestPassModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuestPassModal(false)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative border border-slate-100 dark:border-slate-800 z-10 p-6 space-y-6"
            >
              {/* Reuse of Classes modal booking with general guest pass option */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {isRtl ? 'احجز بطاقة الدخول المجانية' : 'Get General Guest Pass'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {isRtl ? 'دخول يوم كامل مجاني وتجربة لكافة المرافق' : 'Complimentary 1-day general admission pass'}
                  </p>
                </div>
                <button
                  onClick={() => setShowGuestPassModal(false)}
                  className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <ClassesSectionBookForm 
                lang={lang} 
                onSubmitGuestPass={(name) => {
                  setShowGuestPassModal(false);
                  triggerToast(
                    isRtl 
                      ? `تهانينا ${name}! تم تسجيل حجز بطاقة دخول ريمكس المجانية لك، رمز التأكيد مفعّل.`
                      : `Congratulations ${name}! Your free Remix day pass has been reserved. Check your phone for details.`
                  );
                }} 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. TOAST NOTIFICATIONS */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-slate-900/95 dark:bg-slate-800 text-white font-bold text-xs shadow-2xl border border-slate-800/80 backdrop-blur-md"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 7. SCROLL TO TOP ARROW */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-500/15 cursor-pointer"
            title="Scroll to Top"
          >
            <ArrowUp className="w-4.5 h-4.5" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

// Inline helper component for Guest Pass signup form
interface ClassesSectionBookFormProps {
  lang: Language;
  onSubmitGuestPass: (name: string) => void;
}

function ClassesSectionBookForm({ lang, onSubmitGuestPass }: ClassesSectionBookFormProps) {
  const t = webTranslations[lang];
  const isRtl = lang === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [branch, setBranch] = useState('riyadh');

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) return;
    onSubmitGuestPass(name);
  };

  return (
    <form onSubmit={handleFormSubmit} className="space-y-4 text-slate-900 dark:text-white">
      <div className="space-y-1">
        <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.fullName} *</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={isRtl ? 'مثل: محمد الحربي' : 'e.g., John Doe'}
          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.emailAddress} *</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
          />
        </div>
        <div className="space-y-1">
          <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.phoneNumber} *</label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+966 5..."
            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-sm border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-left"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>{t.selectBranch}</label>
        <select
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-sm border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none ${isRtl ? 'text-right' : 'text-left'}`}
        >
          <option value="riyadh">{isRtl ? 'فرع الرياض - العليا' : 'Riyadh - Olaya District'}</option>
          <option value="jeddah">{isRtl ? 'فرع جدة - كورنيش الحمراء' : 'Jeddah - Al Hamra Corniche'}</option>
          <option value="khobar">{isRtl ? 'فرع الخبر - الحزام الذهبي' : 'Al Khobar - Belt Road'}</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md cursor-pointer text-center"
      >
        {t.confirmBooking}
      </button>
    </form>
  );
}

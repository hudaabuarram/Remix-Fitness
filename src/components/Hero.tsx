import { motion } from 'motion/react';
import { Dumbbell, ArrowRight, ArrowLeft, Shield, Users, Award, Sparkles, Star } from 'lucide-react';
import { webTranslations } from '../webTranslations';
import { Language } from '../types';

interface HeroProps {
  lang: Language;
  onNavigateToPlans: () => void;
  onOpenGuestPass: () => void;
}

export function Hero({ lang, onNavigateToPlans, onOpenGuestPass }: HeroProps) {
  const t = webTranslations[lang];
  const isRtl = lang === 'ar';

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-16 md:py-24 transition-colors duration-300">
      {/* Immersive Gym Background Image with Responsive Light/Dark Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1600" 
          alt="Premium Gym Background" 
          className="w-full h-full object-cover opacity-10 dark:opacity-35 object-center"
          referrerPolicy="no-referrer"
        />
        {/* Radial & linear gradients for extreme professional styling */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-100/90 to-slate-50 dark:from-slate-950 dark:via-slate-900/90 dark:to-slate-950 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200/20 via-slate-100/40 to-indigo-200/20 dark:from-purple-950/20 dark:via-slate-900/40 dark:to-indigo-950/20 transition-colors duration-300" />
        
        {/* Beautiful Drifting & Glowing decorative spots */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -25, 0],
            y: [0, 25, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none" 
        />
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copywriting */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-start">
            
            {/* Elegant Premium Tag with pulse attention grabber */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05 }}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0 shadow-sm cursor-default ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <Award className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-bounce" />
              <span>{isRtl ? ' النادي الرياضي الصحي رقم #1 بالرياض' : 'THE PREMIUM TRAINING EXPERIENCE'}</span>
            </motion.div>
 
            {/* Giant Headings with Premium Font Pairings and slide up letter group animation */}
            <div className="space-y-3 overflow-hidden">
              <motion.h1 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-none"
              >
                <span className="block text-slate-900 dark:text-slate-100">{t.heroTitlePart1}</span>
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  {t.heroTitlePart2}
                </span>
              </motion.h1>
            </div>

            {/* Subtitle with fade in up */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              {t.heroSubtitle}
            </motion.p>

            {/* Interactive Call-To-Action buttons with spring hover scale */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
            >
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onNavigateToPlans}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                id="hero-subscribe-btn"
              >
                <span>{t.explorePlans}</span>
                {isRtl ? (
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                )}
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenGuestPass}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white hover:bg-slate-100 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-500 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                id="hero-guest-pass-btn"
              >
                <Dumbbell className="w-4.5 h-4.5 text-indigo-500 dark:text-indigo-400" />
                <span>{t.guestPass}</span>
              </motion.button>
            </motion.div>

            {/* Social Trust Metrics with staggered delay */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ y: -4 }}
                className="text-center lg:text-start cursor-default"
              >
                <span className="block text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400">12K+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.activeCommunity}</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ y: -4 }}
                className="text-center lg:text-start cursor-default"
              >
                <span className="block text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400">25+</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.expertCoaches}</span>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ y: -4 }}
                className="text-center lg:text-start cursor-default"
              >
                <span className="block text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400">24/7</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.modernFacilities}</span>
              </motion.div>
            </div>

          </div>

          {/* Right Hero Image / Decorative Cards Column with Elite Float Animations */}
          <div className="lg:col-span-5 relative hidden lg:block">
            
            {/* Top-Left drifting gold badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: -20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0,
                y: [0, 8, 0] 
              }}
              transition={{ 
                scale: { duration: 0.6, delay: 0.5 },
                opacity: { duration: 0.6, delay: 0.5 },
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -top-4 -left-4 p-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-black text-[10px] tracking-wider uppercase shadow-xl z-20 flex items-center gap-1.5 border border-amber-400/20 select-none cursor-default"
            >
              <Award className="w-3.5 h-3.5" />
              <span>{isRtl ? 'نادي VIP النخبة' : 'ELITE VIP CLUB'}</span>
            </motion.div>

            {/* Bottom-Right drifting blue badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6, x: 20 }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                x: 0,
                y: [0, -8, 0] 
              }}
              transition={{ 
                scale: { duration: 0.6, delay: 0.6 },
                opacity: { duration: 0.6, delay: 0.6 },
                y: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              }}
              className="absolute -bottom-3 -right-4 p-3 rounded-2xl bg-indigo-600 text-white font-black text-[10px] tracking-wider uppercase shadow-xl z-20 flex items-center gap-1.5 border border-indigo-400/20 select-none cursor-default"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{isRtl ? '١٢,٠٠٠+ عضو نشط' : '12K+ MEMBERS'}</span>
            </motion.div>

            {/* Floating primary image wrapper */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: [0, -10, 0] 
              }}
              transition={{ 
                opacity: { duration: 0.8, delay: 0.2 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
              }}
              whileHover={{ scale: 1.02 }}
              className="relative w-full max-w-md mx-auto aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 transition-all duration-300"
            >
              <img 
                src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600" 
                alt="Personal training session at Remix Fitness" 
                className="w-full h-full object-cover select-none"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-100/80 dark:from-slate-950 via-transparent to-transparent pointer-events-none" />
              
              {/* Dynamic Overlay Tag */}
              <div className={`absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/90 backdrop-blur-md border border-slate-100 dark:border-slate-800 flex items-center gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100">
                    {isRtl ? 'بيئة صحية معتمدة وآمنة' : 'Safe & Certified Space'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                    {isRtl ? 'تعقيم دوري مستمر وأحدث أنظمة التهوية' : 'Continuous air-purification & top sanitary protocols'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}


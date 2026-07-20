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
          src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1600" 
          alt="Premium Gym Background" 
          className="w-full h-full object-cover opacity-50 dark:opacity-45 object-center transition-opacity duration-300"
          referrerPolicy="no-referrer"
        />
        {/* Radial & linear gradients for extreme professional styling and content readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-950/35 dark:to-slate-950 transition-colors duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/10 via-transparent to-indigo-100/10 dark:from-purple-950/5 dark:via-transparent dark:to-indigo-950/5 transition-colors duration-300" />
        
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

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-5xl">
        <div className="flex flex-col items-center justify-center text-center space-y-8">
          
          {/* Elegant Premium Tag with pulse attention grabber */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 text-xs font-bold uppercase tracking-wider mx-auto shadow-sm cursor-default ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <Award className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-bounce" />
            <span>{isRtl ? ' النادي الرياضي الصحي رقم #1 بالرياض' : 'THE PREMIUM TRAINING EXPERIENCE'}</span>
          </motion.div>
 
          {/* Giant Headings with Premium Font Pairings and slide up letter group animation */}
          <div className="space-y-3 overflow-hidden w-full">
            <motion.h1 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-none"
            >
              <span className="block text-slate-900 dark:text-slate-100">{t.heroTitlePart1}</span>
              <span className="block mt-3 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                {t.heroTitlePart2}
              </span>
            </motion.h1>
          </div>

          {/* Subtitle with fade in up */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-light"
          >
            {t.heroSubtitle}
          </motion.p>

          {/* Interactive Call-To-Action buttons with spring hover scale */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto"
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
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-3 gap-6 sm:gap-12 max-w-lg w-full mx-auto justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -4 }}
              className="text-center cursor-default"
            >
              <span className="block text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400">12K+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.activeCommunity}</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -4 }}
              className="text-center cursor-default"
            >
              <span className="block text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400">25+</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.expertCoaches}</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -4 }}
              className="text-center cursor-default"
            >
              <span className="block text-2xl md:text-3xl font-black text-indigo-600 dark:text-indigo-400">24/7</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{t.modernFacilities}</span>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}


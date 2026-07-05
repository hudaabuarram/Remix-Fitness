import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CreditCard, Check, ShieldCheck, Apple, Award, Sparkles, X, Heart, Smartphone, HelpCircle } from 'lucide-react';
import { webTranslations } from '../webTranslations';
import { MembershipPlan, GymMember, Language } from '../types';

interface MembershipsSectionProps {
  plans: MembershipPlan[];
  lang: Language;
  onRegisterMember: (newMember: GymMember) => void;
}

export function MembershipsSection({ plans, lang, onRegisterMember }: MembershipsSectionProps) {
  const t = webTranslations[lang];
  const isRtl = lang === 'ar';

  // State management
  const [activePlan, setActivePlan] = useState<MembershipPlan | null>(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'mada'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredCard, setRegisteredCard] = useState<GymMember | null>(null);
  const [formError, setFormError] = useState(false);

  const handleOpenCheckout = (plan: MembershipPlan) => {
    setActivePlan(plan);
    setRegisteredCard(null);
    setFormError(false);
  };

  const handleCloseCheckout = () => {
    setActivePlan(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setIsSubmitting(false);
    setRegisteredCard(null);
  };

  const handleCompleteSubscription = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError(true);
      return;
    }

    setIsSubmitting(true);
    setFormError(false);

    // Simulate payment clearing
    setTimeout(() => {
      const generatedId = `MEM-${Math.floor(100 + Math.random() * 900)}`;
      const currentDate = new Date();
      const expiryDate = new Date();
      expiryDate.setMonth(currentDate.getMonth() + (activePlan?.durationMonths || 1));

      const newMember: GymMember = {
        id: generatedId,
        nameEn: fullName,
        nameAr: fullName,
        email: email,
        phone: phone,
        status: 'active',
        planTypeEn: activePlan?.nameEn || '',
        planTypeAr: activePlan?.nameAr || '',
        registrationDate: currentDate.toISOString().split('T')[0],
        expiryDate: expiryDate.toISOString().split('T')[0],
        gender: gender,
        photo: gender === 'male' 
          ? "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200" 
          : "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
        attendanceCount: 0,
        weight: gender === 'male' ? 80 : 62,
        height: gender === 'male' ? 178 : 165,
        bodyFat: gender === 'male' ? 18 : 22,
        targetWeight: gender === 'male' ? 75 : 58,
        bmi: gender === 'male' ? 25.2 : 22.8,
        medicalNotesEn: "None",
        medicalNotesAr: "لا يوجد",
        emergencyContact: "Family (+966 50 000 0000)"
      };

      onRegisterMember(newMember);
      setRegisteredCard(newMember);
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="memberships" className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Decorative gradient spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-sans">
            {t.membershipTitle}
          </h2>
          <div className="w-16 h-1 bg-indigo-500 mx-auto rounded-full" />
          <p className="text-slate-400 text-sm md:text-base">
            {t.membershipSubtitle}
          </p>
        </div>

        {/* Pricing plans cards layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto" id="memberships-grid">
          {plans.map((plan) => {
            const isElite = plan.popular;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -6 }}
                className={`rounded-3xl p-8 border flex flex-col justify-between relative transition-all ${
                  isElite
                    ? 'bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/5'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {/* Popular Badge */}
                {isElite && (
                  <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-[10px] tracking-widest uppercase flex items-center gap-1.5 shadow-md shadow-indigo-500/20 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Sparkles className="w-3 h-3" />
                    <span>{t.popular}</span>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Name */}
                  <div className={isRtl ? 'text-right' : 'text-left'}>
                    <h3 className="text-lg font-black text-slate-100">
                      {isRtl ? plan.nameAr : plan.nameEn}
                    </h3>
                    <p className="text-xxs text-slate-400 mt-1 uppercase tracking-wider">
                      {plan.id} • {plan.durationMonths} {isRtl ? 'أشهر' : 'Months'}
                    </p>
                  </div>

                  {/* Pricing Tag */}
                  <div className={`flex items-baseline gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
                      {plan.price}
                    </span>
                    <span className="text-xs text-indigo-400 font-bold uppercase">{t.sar}</span>
                    <span className="text-slate-500 text-xs">/ {plan.durationMonths === 1 ? (isRtl ? 'شهر' : 'mo') : `${plan.durationMonths} ${isRtl ? 'أشهر' : 'mos'}`}</span>
                  </div>

                  <div className="h-px bg-slate-800" />

                  {/* Features list */}
                  <ul className="space-y-3">
                    {(isRtl ? plan.featuresAr : plan.featuresEn).map((feature, i) => (
                      <li key={i} className={`flex items-start gap-2.5 text-xs text-slate-300 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                        <div className="w-4 h-4 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-indigo-400" />
                        </div>
                        <span className="leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Select button */}
                <button
                  onClick={() => handleOpenCheckout(plan)}
                  className={`w-full py-4 mt-8 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                    isElite
                      ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white'
                  }`}
                >
                  {t.selectPlan}
                </button>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Subscription/Checkout Modal */}
      <AnimatePresence>
        {activePlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 text-slate-900">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseCheckout}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 z-10 max-h-[92vh] flex flex-col"
            >
              {/* Modal header */}
              <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-500/5 shrink-0">
                <div className={isRtl ? 'text-right' : 'text-left'}>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {t.checkoutTitle}
                  </h3>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mt-1">
                    {t.selectedPlan}: {isRtl ? activePlan.nameAr : activePlan.nameEn} ({activePlan.price} {t.sar})
                  </p>
                </div>
                <button
                  onClick={handleCloseCheckout}
                  className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {registeredCard ? (
                  /* EXTREMELY SOPHISTICATED INTERACTIVE DIGITAL VIP MEMBER CARD */
                  <motion.div
                    initial={{ opacity: 0, rotateY: 90 }}
                    animate={{ opacity: 1, rotateY: 0 }}
                    className="space-y-6 text-center"
                  >
                    <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/40 rounded-full flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-10 h-10 text-emerald-500 dark:text-emerald-400" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {isRtl ? 'تم تفعيل اشتراكك بنجاح!' : 'Subscription Activated Successfully!'}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 px-4 leading-relaxed">
                      {t.registerSuccess}
                    </p>

                    {/* Premium Gold/Silver Member card */}
                    <div className="w-full max-w-sm aspect-[1.58/1] rounded-2xl bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white p-5 border border-indigo-500/30 shadow-2xl relative overflow-hidden mx-auto text-left">
                      {/* Decorative elements */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
                      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
                      
                      <div className="flex justify-between items-start h-full flex-col">
                        <div className="w-full flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Award className="w-5 h-5 text-indigo-400" />
                            <span className="font-black text-xxs tracking-wider uppercase">REMIX VIP CLUB</span>
                          </div>
                          <span className="text-xxs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {isRtl ? 'نشط ومفعل' : 'Active'}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <span className="text-xxs text-slate-400 uppercase tracking-widest">{t.fullName}</span>
                          <h5 className="font-extrabold text-sm text-slate-100 tracking-wide">{registeredCard.nameEn}</h5>
                        </div>

                        <div className="w-full flex justify-between items-end border-t border-slate-800/80 pt-3">
                          <div>
                            <span className="text-[9px] text-slate-400 uppercase block tracking-wider">{t.membershipId}</span>
                            <span className="font-mono text-xs font-bold text-indigo-300">{registeredCard.id}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-[9px] text-slate-400 uppercase block tracking-wider">{t.validUntil}</span>
                            <span className="font-mono text-xs font-bold text-indigo-300">{registeredCard.expiryDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleCloseCheckout}
                      className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                    >
                      {isRtl ? 'إغلاق البوابة' : 'Close portal'}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleCompleteSubscription} className="space-y-4">
                    {formError && (
                      <div className={`p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 dark:text-rose-400 text-xs font-semibold flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <span>{t.bookingError}</span>
                      </div>
                    )}

                    {/* Inputs */}
                    <div className="space-y-1">
                      <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t.fullName} *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder={isRtl ? 'أدخل اسمك الكامل الثلاثي' : 'Enter your full name'}
                        className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-sm border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
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
                          placeholder="example@gmail.com"
                          className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-sm border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
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
                          placeholder="+966 50..."
                          className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-sm border border-slate-200/80 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-left"
                        />
                      </div>
                    </div>

                    {/* Gender and Gender */}
                    <div className="space-y-1">
                      <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t.gender}
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setGender('male')}
                          className={`py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                            gender === 'male'
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {t.male}
                        </button>
                        <button
                          type="button"
                          onClick={() => setGender('female')}
                          className={`py-2.5 rounded-xl text-xs font-bold border cursor-pointer ${
                            gender === 'female'
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                              : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {t.female}
                        </button>
                      </div>
                    </div>

                    {/* Payment choices */}
                    <div className="space-y-2 pt-2">
                      <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                        {t.paymentMethod}
                      </label>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setPaymentMethod('card')}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                            paymentMethod === 'card'
                              ? 'border-indigo-600 bg-indigo-50/20 text-indigo-600 dark:text-indigo-400'
                              : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <CreditCard className="w-5 h-5" />
                          <span className="text-[10px] font-bold">{isRtl ? 'بطاقة مدى' : 'Card / Mada'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('apple_pay')}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                            paymentMethod === 'apple_pay'
                              ? 'border-indigo-600 bg-indigo-50/20 text-indigo-600 dark:text-indigo-400'
                              : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Apple className="w-5 h-5" />
                          <span className="text-[10px] font-bold">{isRtl ? 'آبل باي' : 'Apple Pay'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentMethod('mada')}
                          className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all ${
                            paymentMethod === 'mada'
                              ? 'border-indigo-600 bg-indigo-50/20 text-indigo-600 dark:text-indigo-400'
                              : 'border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <Smartphone className="w-5 h-5" />
                          <span className="text-[10px] font-bold">{isRtl ? 'تحويل بنكي' : 'Bank Transfer'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Payment Inputs */}
                    {paymentMethod === 'card' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800"
                      >
                        <div className="space-y-1">
                          <label className={`block text-xxs font-bold text-slate-400 dark:text-slate-500 ${isRtl ? 'text-right' : 'text-left'}`}>{t.cardNumber}</label>
                          <input
                            type="text"
                            required
                            placeholder="4000 1234 5678 9010"
                            className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs border border-slate-200/80 dark:border-slate-800 font-mono text-slate-900 dark:text-white"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className={`block text-xxs font-bold text-slate-400 dark:text-slate-500 ${isRtl ? 'text-right' : 'text-left'}`}>{t.cardExpiry}</label>
                            <input
                              type="text"
                              required
                              placeholder="12/28"
                              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs border border-slate-200/80 dark:border-slate-800 text-center font-mono text-slate-900 dark:text-white"
                            />
                          </div>
                          <div className="space-y-1">
                            <label className={`block text-xxs font-bold text-slate-400 dark:text-slate-500 ${isRtl ? 'text-right' : 'text-left'}`}>{t.cardCvv}</label>
                            <input
                              type="password"
                              required
                              maxLength={3}
                              placeholder="•••"
                              className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs border border-slate-200/80 dark:border-slate-800 text-center font-mono text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {paymentMethod === 'apple_pay' && (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 text-center text-xs font-semibold text-slate-500">
                        {isRtl ? 'سيتم تشغيل واجهة Apple Pay الآمنة لإتمام الدفع بلمسة واحدة.' : 'Secure Apple Pay pop-up will launch to complete payment.'}
                      </div>
                    )}

                    {paymentMethod === 'mada' && (
                      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 text-center text-xs font-semibold text-slate-500">
                        {isRtl ? 'قم بالتحويل للحساب البنكي لنادي ريمكس وسرّع التفعيل بإرسال الإيصال.' : 'Transfer to Remix Fitness Bank Account & upload receipt for faster validation.'}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex gap-3 shrink-0">
                      <button
                        type="button"
                        onClick={handleCloseCheckout}
                        className="flex-1 py-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-center"
                      >
                        {t.cancel}
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/10 cursor-pointer text-center flex items-center justify-center gap-1"
                      >
                        {isSubmitting ? (
                          <span>{isRtl ? 'جاري التحقق الآمن...' : 'Processing Securely...'}</span>
                        ) : (
                          <span>{t.completeRegister}</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

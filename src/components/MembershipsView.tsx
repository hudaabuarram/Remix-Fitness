import React, { useState } from 'react';
import { CreditCard, Check, Tag, Snowflake, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { MembershipPlan, Language } from '../types';

interface MembershipsViewProps {
  plans: MembershipPlan[];
  lang: Language;
  onSelectPlan?: (plan: MembershipPlan) => void;
}

export const MembershipsView: React.FC<MembershipsViewProps> = ({
  plans,
  lang,
  onSelectPlan
}) => {
  const isRtl = lang === 'ar';
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'FIT30' || cleanCode === 'GYMSARK') {
      setDiscountPercent(30);
      setCouponFeedback(isRtl ? 'تم تطبيق خصم 30% بنجاح!' : '30% Discount applied successfully!');
    } else {
      setDiscountPercent(0);
      setCouponFeedback(isRtl ? 'كود الخصم غير صحيح.' : 'Invalid coupon code.');
    }
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
          {isRtl ? 'باقات خطط الاشتراكات' : 'Membership Subscriptions'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl 
            ? 'تصفح الباقات النشطة، وفئات العملاء، وأدوات الخصومات والعروض الترويجية.' 
            : 'Configure client categories, special discounts, and promotional campaigns.'}
        </p>
      </div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const originalPrice = plan.price;
          const discountedPrice = Math.round(originalPrice * (1 - discountPercent / 100));

          return (
            <div 
              key={plan.id}
              className={`relative bg-white dark:bg-slate-800 p-6 rounded-3xl border shadow-sm transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between ${
                plan.popular 
                  ? 'border-indigo-600 dark:border-indigo-500 ring-2 ring-indigo-600/10' 
                  : 'border-slate-100 dark:border-slate-700/60'
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                  {isRtl ? 'الأكثر طلباً' : 'Most Popular'}
                </span>
              )}

              <div className="space-y-4">
                <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{plan.id}</span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {isRtl ? plan.nameAr : plan.nameEn}
                </h3>
                <p className="text-xs text-slate-400">
                  {isRtl ? `صلاحية الباقة: ${plan.durationMonths} شهراً` : `Contract valid for ${plan.durationMonths} calendar month(s)`}
                </p>

                <div className="pt-3 border-t border-slate-50 dark:border-slate-700/50">
                  {discountPercent > 0 ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${discountedPrice}</span>
                      <span className="text-sm text-slate-400 line-through">${originalPrice}</span>
                    </div>
                  ) : (
                    <span className="text-3xl font-extrabold text-slate-900 dark:text-white">${originalPrice}</span>
                  )}
                  <span className="text-xs text-slate-400"> / {isRtl ? 'كامل المدة' : 'full duration'}</span>
                </div>

                <ul className="space-y-2.5 pt-4 text-xs">
                  {(isRtl ? plan.featuresAr : plan.featuresEn).map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                      <Check className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-50 dark:border-slate-700/40">
                <button 
                  onClick={() => onSelectPlan?.(plan)}
                  className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    plan.popular
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs shadow-indigo-100'
                      : 'bg-slate-50 hover:bg-slate-100 dark:bg-slate-700/50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-600'
                  }`}
                >
                  <span>{isRtl ? 'تفعيل وتنسيب عضو' : 'Assign to a Member'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Coupon section & Freeze Membership Policy details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Coupon Code Simulator */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
            <Tag className="w-5 h-5" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              {isRtl ? 'منصة قسائم الخصم الترويجية' : 'Promotional Coupon Manager'}
            </h4>
          </div>
          <p className="text-xs text-slate-500">
            {isRtl 
              ? 'أدخل كود خصم نشط لتطبيقه على أسعار الباقات فورياً للعملاء الجدد (كود تجريبي: FIT30).' 
              : 'Apply a valid promo code to adjust pricing across the registry. Try using FIT30.'}
          </p>

          <form onSubmit={applyCoupon} className="flex gap-2 text-xs">
            <input 
              type="text" 
              placeholder={isRtl ? 'أدخل كود الخصم هنا...' : 'Enter promo code...'}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
            />
            <button 
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 text-white font-bold cursor-pointer"
            >
              {isRtl ? 'تطبيق الكود' : 'Apply Code'}
            </button>
          </form>
          {couponFeedback && (
            <p className={`text-xs font-semibold ${discountPercent > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500'}`}>
              {couponFeedback}
            </p>
          )}
        </div>

        {/* Freeze / Refund Policies */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
              <Snowflake className="w-5 h-5" />
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                {isRtl ? 'سياسات التجميد والاسترجاع' : 'Freeze & Refund Guidelines'}
              </h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isRtl 
                ? 'يسمح بتجميد العضوية مجاناً لمرة واحدة لكل اشتراك ربع سنوي (بحد أقصى 15 يوماً)، ولمرتين للاشتراك السنوي (بحد أقصى 30 يوماً). لا يقبل الاسترجاع بعد 7 أيام من تاريخ الدفع.' 
                : 'Members are allowed 1 free freeze period (up to 15 days) on quarterly contracts, and 2 periods (up to 30 days) on annual plans. No refunds permitted after 7 days of activation.'}
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/30">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{isRtl ? 'كافة سياسات الاشتراك مطابقة لمعايير وزارة الرياضة.' : 'Compliant with default regional sporting regulations.'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

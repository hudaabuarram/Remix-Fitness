import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { webTranslations } from '../webTranslations';
import { Language } from '../types';

interface ContactSectionProps {
  lang: Language;
}

export function ContactSection({ lang }: ContactSectionProps) {
  const t = webTranslations[lang];
  const isRtl = lang === 'ar';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const branchesData = [
    {
      name: isRtl ? t.branchRiyadh : "Riyadh - Olaya District",
      address: isRtl ? "طريق الملك فهد، برج العليا الفاخر" : "King Fahd Road, Olaya Luxury Tower",
      phone: "+966 11 400 9000",
      facilities: isRtl 
        ? ["صالة نسائية مغلقة بالكامل", "حوض سباحة أولمبي مكيّف", "منصة كروس فت خارجية"]
        : ["Private Fully-Enclosed Ladies Gym", "Olympic Temperature-Controlled Pool", "Outdoor Crossfit Core Zone"]
    },
    {
      name: isRtl ? t.branchJeddah : "Jeddah - Al Hamra Corniche",
      address: isRtl ? "شارع الكورنيش العام، أمام نافورة الملك فهد" : "Corniche Road, opposite King Fahd Fountain",
      phone: "+966 12 600 7000",
      facilities: isRtl 
        ? ["إطلالة بانورامية ساحرة على البحر", "مركز ساونا وبخار استشفائي VIP", "أوزان أولمبية معتمدة"]
        : ["Mesmerizing Panoramic Sea View", "VIP Recovery Sauna & Steam Spa", "Certified Olympic Heavy Weights"]
    },
    {
      name: isRtl ? t.branchKhobar : "Al Khobar - Belt Road",
      address: isRtl ? "طريق الأمير فيصل بن فهد، الحزام الذهبي" : "Prince Faisal Bin Fahd Road, Golden Belt",
      phone: "+966 13 800 6000",
      facilities: isRtl 
        ? ["صالة فحص وتحليل InBody ذكية", "مقهى تغذية وصحة متكامل", "مواقف سيارات مظللة وخاصة"]
        : ["Smart InBody Assessment Lounge", "Integrated Nutrition & Macro Café", "Dedicated Shaded Valet Parking"]
    }
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError(true);
      return;
    }

    setSuccess(true);
    setError(false);
    
    // reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');

    setTimeout(() => {
      setSuccess(false);
    }, 4000);
  };

  return (
    <section id="contact-branches" className="py-20 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-200">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans">
            {t.contactTitle}
          </h2>
          <div className="w-16 h-1 bg-indigo-600 mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base">
            {t.contactSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left: Contact Info & Branches info */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Quick stats / hours card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xs space-y-6">
              <h3 className={`text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <Clock className="w-5 h-5 text-indigo-500" />
                <span>{t.hours}</span>
              </h3>

              <div className={`space-y-3.5 text-xs text-slate-600 dark:text-slate-300 ${isRtl ? 'text-right' : 'text-left'}`}>
                <p className="font-semibold">{t.hoursWeekday}</p>
                <p className="font-semibold">{t.hoursFriday}</p>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col gap-3.5">
                  <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Mail className="w-4 h-5 text-indigo-500 shrink-0" />
                    <span>info@remixfitness.com</span>
                  </div>
                  <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <Phone className="w-4 h-5 text-indigo-500 shrink-0" />
                    <span>9200-REMIX (73649)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Branches Roster list */}
            <div className="space-y-6">
              <h3 className={`text-lg font-black text-slate-900 dark:text-white ${isRtl ? 'text-right' : 'text-left'}`}>
                {t.branches}
              </h3>
              
              <div className="space-y-4">
                {branchesData.map((br, index) => (
                  <div 
                    key={index}
                    className={`bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-xs flex gap-4 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                  >
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0 mt-1">
                      <MapPin className="w-5 h-5" />
                    </div>

                    <div className="space-y-2 flex-1">
                      <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {br.name}
                      </h4>
                      <p className="text-xxs text-slate-400 dark:text-slate-500 font-medium">
                        {br.address} • {br.phone}
                      </p>

                      <div className={`flex flex-wrap gap-1.5 pt-1.5 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                        {br.facilities.map((fac, idx) => (
                          <span 
                            key={idx}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-100 dark:border-slate-800"
                          >
                            {fac}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Modern inquiry contact form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-8 rounded-3xl border border-slate-100 dark:border-slate-700/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

            <h3 className={`text-xl font-black text-slate-950 dark:text-white mb-6 flex items-center gap-2 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <Sparkles className="w-5 h-5 text-indigo-500" />
              <span>{t.contactForm}</span>
            </h3>

            {success && (
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2.5 mb-6">
                <CheckCircle className="w-5 h-5" />
                <span>{t.messageSuccess}</span>
              </div>
            )}

            {error && (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2.5 mb-6">
                <AlertCircle className="w-5 h-5" />
                <span>{t.bookingError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isRtl ? 'أدخل اسمك الكريم' : 'Enter your name'}
                    className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm border border-slate-200/60 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                </div>
                <div className="space-y-1">
                  <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                    {t.emailAddress} *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@domain.com"
                    className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm border border-slate-200/60 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t.subject}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={isRtl ? 'الموضوع أو الاستفسار' : 'What is your inquiry about?'}
                  className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm border border-slate-200/60 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div className="space-y-1">
                <label className={`block text-xs font-bold text-slate-500 dark:text-slate-400 ${isRtl ? 'text-right' : 'text-left'}`}>
                  {t.message} *
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isRtl ? 'اكتب رسالتك وتساؤلك هنا بالتفصيل...' : 'Type your details here...'}
                  className={`w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-900 text-sm border border-slate-200/60 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-500/10 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-4.5 h-4.5" />
                <span>{t.sendMessage}</span>
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

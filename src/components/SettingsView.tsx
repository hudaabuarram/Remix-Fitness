import React, { useState } from 'react';
import { 
  Building2, Users, ShieldAlert, Key, Globe, Moon, Sun, 
  Database, BellRing, Check, Save, ShieldCheck 
} from 'lucide-react';
import { Language, Theme } from '../types';

interface SettingsViewProps {
  lang: Language;
  onToggleLang: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  lang,
  onToggleLang,
  theme,
  onToggleTheme
}) => {
  const isRtl = lang === 'ar';
  
  const [gymName, setGymName] = useState(isRtl ? 'صالة فيتنس كلوب الرياضية' : 'Fitness Club Hub HQ');
  const [gymBranch, setGymBranch] = useState(isRtl ? 'فرع الرياض الرئيسي' : 'Riyadh Main HQ Branch');
  const [activeTab, setActiveTab] = useState<'profile' | 'branches' | 'roles' | 'system'>('profile');
  const [saveStatus, setSaveStatus] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus(true);
    setTimeout(() => setSaveStatus(false), 2000);
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
          {isRtl ? 'إعدادات المنصة والصالة' : 'Platform & Facility Settings'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl ? 'إدارة معلومات النادي، تفضيلات اللغة، حماية الحسابات والأدوار الوظيفية.' : 'Configure general venue profiles, multi-branch roles, backup databases, or themes.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation Tabs */}
        <div className="space-y-1.5 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm self-start">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-right p-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'profile' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Building2 className="w-4.5 h-4.5" />
            <span>{isRtl ? 'معلومات النادي' : 'Gym Profile'}</span>
          </button>
          <button 
            onClick={() => setActiveTab('branches')}
            className={`w-full text-right p-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'branches' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Globe className="w-4.5 h-4.5" />
            <span>{isRtl ? 'الفروع والمواقع' : 'Venue Branches'}</span>
          </button>
          <button 
            onClick={() => setActiveTab('roles')}
            className={`w-full text-right p-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'roles' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
            <span>{isRtl ? 'الأدوار والصلاحيات' : 'Roles & Access'}</span>
          </button>
          <button 
            onClick={() => setActiveTab('system')}
            className={`w-full text-right p-3 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
              activeTab === 'system' 
                ? 'bg-indigo-600 text-white shadow-xs' 
                : 'hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-300'
            }`}
          >
            <Database className="w-4.5 h-4.5" />
            <span>{isRtl ? 'إدارة النظام والنسخ' : 'SaaS Control'}</span>
          </button>
        </div>

        {/* Setting Panel Details */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm">
          
          {/* PROFILE SETTINGS TAB */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-5 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-50 dark:border-slate-700/50">
                {isRtl ? 'المعلومات العامة للنادي' : 'General Gym Information'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-500 mb-1.5 font-semibold">{isRtl ? 'اسم الصالة الرياضية' : 'Facility Brand Name'}</label>
                  <input 
                    type="text" 
                    value={gymName} 
                    onChange={(e) => setGymName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 mb-1.5 font-semibold">{isRtl ? 'اسم الفرع الحالي' : 'Active Branch Name'}</label>
                  <input 
                    type="text" 
                    value={gymBranch} 
                    onChange={(e) => setGymBranch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-medium"
                  />
                </div>
              </div>

              {/* Theme & Language toggles inside settings */}
              <div className="pt-4 border-t border-slate-50 dark:border-slate-700/50 space-y-4">
                <h4 className="font-bold text-slate-800 dark:text-slate-100">{isRtl ? 'تفضيلات لغة الواجهة والسمة' : 'System Theme & Translation Settings'}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{isRtl ? 'تبديل لغة الواجهة' : 'Switch Platform Language'}</span>
                      <span className="text-[10px] text-slate-400">{isRtl ? 'التبديل بين العربية والإنجليزية بالكامل' : 'Toggle between English LTR & Arabic RTL'}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={onToggleLang}
                      className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950 dark:hover:bg-indigo-900 text-indigo-600 dark:text-indigo-400 font-bold rounded-lg cursor-pointer"
                    >
                      {isRtl ? 'English LTR' : 'العربية RTL'}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{isRtl ? 'سمة الألوان' : 'Color Scheme UI'}</span>
                      <span className="text-[10px] text-slate-400">{isRtl ? 'تبديل الوضع الليلي / النهاري بالكامل' : 'Toggle between Dark Mode & Light Mode'}</span>
                    </div>
                    <button 
                      type="button"
                      onClick={onToggleTheme}
                      className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 cursor-pointer"
                    >
                      {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-100/60 dark:border-slate-700/50">
                <button 
                  type="submit"
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isRtl ? 'حفظ التفضيلات العامة' : 'Save general settings'}</span>
                </button>
              </div>
              {saveStatus && (
                <p className="text-emerald-600 font-bold text-right text-xs mt-2">
                  {isRtl ? '✓ تم حفظ التغييرات بنجاح!' : '✓ Settings updated successfully!'}
                </p>
              )}
            </form>
          )}

          {/* VENUE BRANCHES TAB */}
          {activeTab === 'branches' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-50">
                {isRtl ? 'المواقع وفروع النادي الرياضي' : 'Active Venues & Branches'}
              </h3>
              <p className="text-slate-400">
                {isRtl ? 'إعداد الفروع المتعددة لتمكين عملاء الباقات الشاملة من الدخول والتتبع.' : 'Configure locations to allow cross-branch entries for SaaS VIP members.'}
              </p>

              <div className="space-y-2">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{isRtl ? 'فرع الرياض الرئيسي (HQ)' : 'Riyadh HQ Main Branch'}</h4>
                    <span className="text-[10px] text-slate-400">العليا، تقاطع الملك فهد</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                    {isRtl ? 'الفرع الرئيسي نشط' : 'Primary Active'}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200">{isRtl ? 'فرع جدة كورنيش' : 'Jeddah Seafront Coast Branch'}</h4>
                    <span className="text-[10px] text-slate-400">طريق الكورنيش، الشاطئ</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px]">
                    {isRtl ? 'متصل' : 'Connected'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ROLES TAB */}
          {activeTab === 'roles' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-50">
                {isRtl ? 'إدارة أدوار طاقم العمل والصلاحيات' : 'Role-Based Staff Access Controls'}
              </h3>

              <div className="space-y-2.5">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">{isRtl ? 'مدير الصالة (Admin Manager)' : 'Gym Owner & Admin'}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {isRtl ? 'صلاحيات كاملة للتحصيل المحاسبي، إضافة وتجميد الأعضاء، وإدارة خطط التمارين.' : 'Full read-write capabilities to manage payments, adjust databases, and erase members.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100/80 dark:border-slate-800 flex items-start gap-3">
                  <Key className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-100">{isRtl ? 'مدرب معتمد (Certified Instructor)' : 'Coaching Team'}</h4>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {isRtl ? 'صلاحيات إسناد التمارين وتعديل قياسات ومؤشرات InBody لعملائهم.' : 'Permitted to adjust training splits, macro targets, and add health safety flags.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SYSTEM BACKUP TAB */}
          {activeTab === 'system' && (
            <div className="space-y-4 text-xs">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-50">
                {isRtl ? 'إجراءات النسخ الاحتياطي وحفظ البيانات' : 'System Backups & SaaS database controls'}
              </h3>

              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-slate-900 border border-amber-100/40 text-amber-800 dark:text-amber-400 flex items-start gap-3 leading-relaxed">
                <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold mb-1">{isRtl ? 'صيانة الأمان لقاعدة البيانات' : 'Database Integrity Warning'}</h4>
                  <p className="text-[10px]">
                    {isRtl ? 'البيانات الحالية محفوظة محلياً في المتصفح. تأكد من عمل نسخة احتياطية بشكل دوري لتجنب فقدان البيانات عند تنظيف الكاش.' : 'All client profiles are stored inside the browser localStorage. Standard clearing of cache memory may affect states.'}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localStorage));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href",     dataStr);
                    downloadAnchor.setAttribute("download", "gym_database_backup.json");
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                  }}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl cursor-pointer"
                >
                  {isRtl ? 'تحميل نسخة احتياطية JSON' : 'Export DB Backup'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

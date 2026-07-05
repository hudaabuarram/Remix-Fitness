import React, { useState, useMemo } from 'react';
import { QrCode, Search, UserCheck, Calendar, ArrowRight, CheckCircle, Barcode, ShieldCheck, Clock } from 'lucide-react';
import { AttendanceRecord, GymMember, Language } from '../types';

interface AttendanceViewProps {
  attendance: AttendanceRecord[];
  members: GymMember[];
  lang: Language;
  onAddAttendance: (record: AttendanceRecord) => void;
}

export const AttendanceView: React.FC<AttendanceViewProps> = ({
  attendance,
  members,
  lang,
  onAddAttendance
}) => {
  const isRtl = lang === 'ar';
  
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [manualBarcode, setManualBarcode] = useState('');
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [scannedMember, setScannedMember] = useState<GymMember | null>(null);

  // Manual Check-in form handler
  const handleManualCheckIn = (memberId: string) => {
    if (!memberId) return;
    const memberObj = members.find(m => m.id === memberId);
    if (!memberObj) return;

    setScanStatus('scanning');
    setScannedMember(memberObj);

    setTimeout(() => {
      setScanStatus('success');
      const checkInTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
      const record: AttendanceRecord = {
        id: `ATT-${Math.floor(100 + Math.random() * 900)}`,
        memberId: memberObj.id,
        memberNameEn: memberObj.nameEn,
        memberNameAr: memberObj.nameAr,
        date: new Date().toISOString().split('T')[0],
        checkInTime,
        status: 'present'
      };
      onAddAttendance(record);

      setTimeout(() => {
        setScanStatus('idle');
        setSelectedMemberId('');
      }, 3000);
    }, 1200);
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
          {isRtl ? 'بوابة التحقق ورصد الحضور' : 'Reception Gates & QR Check-In'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl ? 'تسجيل الدخول الذاتي عبر مسح كود QR أو الباركود، ومراقبة الحضور الحي.' : 'Simulate entrance gates scanners, register active RFID passes, or verify QR tickets.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Gate Scanner Simulator */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-indigo-500" />
              <span>{isRtl ? 'محاكي بوابات الدخول والـ QR' : 'Frontgate QR Scanner'}</span>
            </h3>

            {scanStatus === 'idle' && (
              <div className="p-8 rounded-2xl border-2 border-dashed border-slate-100 dark:border-slate-700 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-24 h-24 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl flex items-center justify-center text-indigo-600 animate-pulse">
                  <QrCode className="w-12 h-12" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {isRtl ? 'بوابة التحقق نشطة وجاهزة' : 'Scanner Idle / Laser Ready'}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {isRtl ? 'اختر عضواً أدناه لمحاكاة مسح الكود الذاتي.' : 'Select a member below to simulate their ticket scan.'}
                  </p>
                </div>
              </div>
            )}

            {scanStatus === 'scanning' && (
              <div className="p-8 rounded-2xl border-2 border-indigo-500 bg-indigo-50/25 dark:bg-indigo-950/20 flex flex-col items-center justify-center text-center space-y-4">
                <div className="relative w-24 h-24 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 flex items-center justify-center overflow-hidden">
                  <QrCode className="w-12 h-12 text-indigo-500" />
                  <div className="absolute inset-x-0 top-0 h-1 bg-indigo-500 animate-[bounce_1.5s_infinite]" />
                </div>
                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  {isRtl ? 'جاري التحقق من هوية المشترك...' : 'Querying secure member ID...'}
                </p>
              </div>
            )}

            {scanStatus === 'success' && scannedMember && (
              <div className="p-6 rounded-2xl border-2 border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-500 animate-bounce" />
                <div>
                  <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-400">
                    {isRtl ? 'تم التحقق من الحضور بنجاح!' : 'Access Granted!'}
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-200 font-bold mt-1.5">
                    {isRtl ? scannedMember.nameAr : scannedMember.nameEn}
                  </p>
                  <span className="inline-block text-[10px] bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full mt-2 font-mono">
                    {scannedMember.id} • {isRtl ? scannedMember.planTypeAr : scannedMember.planTypeEn}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Member select to trigger simulation */}
          <div className="pt-4 border-t border-slate-50 dark:border-slate-700/50 space-y-3 mt-4 text-xs">
            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">{isRtl ? 'تحديد عضو للمحاكاة:' : 'Simulate Scan for:'}</label>
              <select 
                value={selectedMemberId}
                onChange={(e) => {
                  setSelectedMemberId(e.target.value);
                  handleManualCheckIn(e.target.value);
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 focus:outline-none"
              >
                <option value="">{isRtl ? '-- اختر للتجربة --' : '-- Choose to scan --'}</option>
                {members.map(m => (
                  <option key={m.id} value={m.id}>{isRtl ? m.nameAr : m.nameEn} ({m.id})</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Live Attendance Activity logs */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div className="space-y-4 w-full">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center justify-between">
              <span className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-indigo-500" />
                <span>{isRtl ? 'الحضور والزيارات النشطة لليوم' : 'Live Gate Check-In Feed'}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">
                {new Date().toISOString().split('T')[0]}
              </span>
            </h3>

            <div className="divide-y divide-slate-50 dark:divide-slate-700/30 overflow-y-auto max-h-72 w-full space-y-2.5">
              {attendance.map((record) => (
                <div 
                  key={record.id}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 text-xs hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-100">
                        {isRtl ? record.memberNameAr : record.memberNameEn}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">{record.memberId}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-500 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{record.checkInTime}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 mt-4">
            <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
            <span>{isRtl ? 'جميع بيانات الحضور مشفرة ومتزامنة مع البوابات.' : 'All checks match strict regional facility requirements.'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

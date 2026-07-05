import React, { useState } from 'react';
import { CreditCard, DollarSign, Tag, Printer, CheckCircle, ShieldCheck, Clock, X } from 'lucide-react';
import { PaymentRecord, Language } from '../types';

interface PaymentsViewProps {
  payments: PaymentRecord[];
  lang: Language;
  onAddPayment: (record: PaymentRecord) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  payments,
  lang,
  onAddPayment
}) => {
  const isRtl = lang === 'ar';
  
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  
  // Payment Simulator State
  const [payAmount, setPayAmount] = useState('150');
  const [payMethod, setPayMethod] = useState<'Cash' | 'Card' | 'PayPal'>('Card');
  const [clientName, setClientName] = useState('');
  const [clientNameAr, setClientNameAr] = useState('');
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientNameAr) return;

    const id = `PAY-${Math.floor(1000 + Math.random() * 9000)}`;
    const invoiceNo = `INV-2026-${Math.floor(100 + Math.random() * 900)}`;
    const record: PaymentRecord = {
      id,
      memberId: 'MEM-101', // mock
      memberNameEn: clientName,
      memberNameAr: clientNameAr,
      amount: Number(payAmount),
      methodEn: payMethod === 'Card' ? 'Card' : payMethod === 'PayPal' ? 'PayPal' : 'Cash',
      methodAr: payMethod === 'Card' ? 'بطاقة' : payMethod === 'PayPal' ? 'باي بال' : 'نقدي',
      date: new Date().toISOString().split('T')[0],
      status: 'paid',
      invoiceNo
    };

    onAddPayment(record);
    setSelectedPayment(record); // Open receipt modal instantly!
    
    // Reset Form
    setClientName('');
    setClientNameAr('');
    setPayAmount('150');
  };

  return (
    <div className="space-y-6" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white font-sans">
          {isRtl ? 'المدفوعات والمحاسبة المالية' : 'Payments & Invoicing Ledger'}
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {isRtl ? 'إصدار الفواتير، استلام المدفوعات عبر البطاقة أو بوابات الدفع الإلكتروني، وطباعة الإيصالات.' : 'Verify transactions, receive credit card charges, generate invoices, or issue refunds.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Payment entry form */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-500" />
            <span>{isRtl ? 'تحصيل دفعة مالية جديدة' : 'Collect Client Payment'}</span>
          </h3>

          <form onSubmit={handlePaymentSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">{isRtl ? 'اسم المشترك (English) *' : 'Client Name (English) *'}</label>
              <input 
                type="text" 
                required
                value={clientName} 
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                placeholder="e.g. Liam Neeson"
              />
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">{isRtl ? 'اسم المشترك (عربي) *' : 'Client Name (Arabic) *'}</label>
              <input 
                type="text" 
                required
                value={clientNameAr} 
                onChange={(e) => setClientNameAr(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
                placeholder="مثال: ليام نيسون"
              />
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">{isRtl ? 'المبلغ المستحق ($)' : 'Bill Amount ($)'}</label>
              <input 
                type="number" 
                required
                value={payAmount} 
                onChange={(e) => setPayAmount(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-950 dark:text-white font-mono focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1">{isRtl ? 'طريقة الدفع' : 'Payment Channel'}</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Card', 'PayPal', 'Cash'] as const).map((method) => (
                  <button 
                    key={method}
                    type="button"
                    onClick={() => setPayMethod(method)}
                    className={`py-2 rounded-lg font-bold border transition-all cursor-pointer text-center ${
                      payMethod === method 
                        ? 'border-indigo-600 bg-indigo-50/25 text-indigo-600 dark:border-indigo-500 dark:text-indigo-400' 
                        : 'border-slate-100 dark:border-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {isRtl ? (method === 'Card' ? 'بطاقة' : method === 'PayPal' ? 'باي بال' : 'نقدي') : method}
                  </button>
                ))}
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all cursor-pointer"
            >
              {isRtl ? 'تسجيل العملية وإصدار الفاتورة' : 'Approve Charge & Invoice'}
            </button>
          </form>
        </div>

        {/* Ledger tables */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between">
          <div className="space-y-4 w-full">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              {isRtl ? 'سجل العمليات المالية والمبيعات' : 'Settled Transactions ledger'}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-700/60 font-semibold text-slate-400 uppercase tracking-wider bg-slate-50/50 dark:bg-slate-900/50">
                    <th className="py-2.5 px-3">{isRtl ? 'رقم الفاتورة' : 'Invoice ID'}</th>
                    <th className="py-2.5 px-3">{isRtl ? 'المشترك' : 'Gym Client'}</th>
                    <th className="py-2.5 px-3 text-center">{isRtl ? 'القيمة' : 'Amount'}</th>
                    <th className="py-2.5 px-3 text-center">{isRtl ? 'القناة' : 'Method'}</th>
                    <th className="py-2.5 px-3 text-center">{isRtl ? 'الحالة' : 'Status'}</th>
                    <th className="py-2.5 px-3 text-right">{isRtl ? 'إيصال' : 'Receipt'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-700/20">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/10">
                      <td className="py-3 px-3 font-mono text-slate-400 font-bold uppercase">{p.invoiceNo}</td>
                      <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-100">
                        {isRtl ? p.memberNameAr : p.memberNameEn}
                      </td>
                      <td className="py-3 px-3 text-center font-bold text-slate-950 dark:text-white">${p.amount}</td>
                      <td className="py-3 px-3 text-center text-slate-500 font-semibold">
                        {isRtl ? p.methodAr : p.methodEn}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'paid' 
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' 
                            : 'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {p.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <button 
                          onClick={() => setSelectedPayment(p)}
                          className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-indigo-600 cursor-pointer"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/30 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/30 mt-4">
            <ShieldCheck className="w-4.5 h-4.5 shrink-0" />
            <span>{isRtl ? 'بوابة الدفع مؤمنة ومشفرة بالكامل بمعايير PCI-DSS.' : 'Payments gateway running PCI-DSS secure protocols.'}</span>
          </div>
        </div>

      </div>

      {/* PRINT-FRIENDLY RECEIPT MODAL */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-sm rounded-2xl border border-slate-100 dark:border-slate-700 shadow-2xl overflow-hidden p-6 text-xs space-y-4">
            
            {/* Logo header */}
            <div className="text-center space-y-1.5 pb-4 border-b border-dashed border-slate-100 dark:border-slate-700">
              <span className="text-xl font-black text-indigo-600 tracking-wider">FITNESS CLUB</span>
              <p className="text-slate-400 font-mono">Invoice: {selectedPayment.invoiceNo}</p>
            </div>

            {/* Receipt Body */}
            <div className="space-y-2.5">
              <div className="flex justify-between">
                <span className="text-slate-400">{isRtl ? 'المشترك الكريم:' : 'Registered Client:'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {isRtl ? selectedPayment.memberNameAr : selectedPayment.memberNameEn}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isRtl ? 'تاريخ العملية:' : 'Transaction Date:'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-100 font-mono">{selectedPayment.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isRtl ? 'وسيلة الدفع:' : 'Payment Channel:'}</span>
                <span className="font-bold text-slate-800 dark:text-slate-100">
                  {isRtl ? selectedPayment.methodAr : selectedPayment.methodEn}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">{isRtl ? 'حالة القيد المستندي:' : 'SaaS Status:'}</span>
                <span className="font-bold text-emerald-600">SUCCESS / PAID</span>
              </div>

              <div className="pt-3 border-t border-dashed border-slate-100 dark:border-slate-700 flex justify-between items-baseline">
                <span className="font-bold text-slate-800 dark:text-slate-100">{isRtl ? 'الإجمالي المدفوع:' : 'Total Amount settled:'}</span>
                <span className="text-xl font-extrabold text-slate-950 dark:text-white">${selectedPayment.amount}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-2">
              <button 
                onClick={() => window.print()}
                className="flex-1 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-center cursor-pointer"
              >
                {isRtl ? 'طباعة الإيصال' : 'Print Invoice'}
              </button>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 bg-white dark:bg-slate-900 dark:text-slate-200 font-semibold cursor-pointer"
              >
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

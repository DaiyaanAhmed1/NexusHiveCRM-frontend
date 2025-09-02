import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FiCreditCard, FiDollarSign, FiClock, FiCheckCircle, FiXCircle, FiRefreshCw, FiPieChart, FiBarChart2, FiDownload, FiUpload, FiMail, FiAlertCircle, FiZap, FiChevronDown, FiChevronUp, FiPlus, FiEdit2, FiTrash2, FiUser, FiUsers, FiSearch, FiFilter, FiArrowRight } from 'react-icons/fi';

// Mock data
const mockApplicants = [
  { id: 'A001', name: 'Abdullah Al-Rashid', dept: 'Engineering', program: 'B.Tech', nationality: 'Saudi' },
  { id: 'A002', name: 'Layla Al-Mansour', dept: 'Business', program: 'MBA', nationality: 'Saudi' },
  { id: 'A003', name: 'Omar Al-Mutairi', dept: 'Engineering', program: 'M.Tech', nationality: 'Saudi' },
];

// Mock data will be localized in the component
const mockInvoices = [
  { id: 'INV001', applicant: mockApplicants[0], type: 'Application Fee', amount: 1500, status: 'Paid', date: '2024-06-10', due: '2024-06-15', mode: 'Online', notes: '', discount: 0 },
  { id: 'INV002', applicant: mockApplicants[1], type: 'Admission Fee', amount: 50000, status: 'Unpaid', date: '2024-06-09', due: '2024-06-20', mode: '', notes: '', discount: 5000 },
  { id: 'INV003', applicant: mockApplicants[2], type: 'Security Deposit', amount: 10000, status: 'Partial', date: '2024-06-08', due: '2024-06-18', mode: 'Bank Transfer', notes: '', discount: 0 },
];
const mockPayments = [
  { id: 'PAY001', invoice: 'INV001', applicant: mockApplicants[0], type: 'Application Fee', amount: 1500, status: 'Success', date: '2024-06-10', mode: 'Card', ref: 'TXN123', receipt: true },
  { id: 'PAY002', invoice: 'INV003', applicant: mockApplicants[2], type: 'Security Deposit', amount: 5000, status: 'Pending', date: '2024-06-09', mode: 'UPI', ref: 'TXN124', receipt: false },
  { id: 'PAY003', invoice: 'INV003', applicant: mockApplicants[2], type: 'Security Deposit', amount: 5000, status: 'Success', date: '2024-06-10', mode: 'Bank Transfer', ref: 'TXN125', receipt: true },
];
const mockRefunds = [
  { id: 'RF001', applicant: mockApplicants[1], amount: 5000, status: 'Requested', mode: 'Original', date: '2024-06-11', reason: 'Overpayment' },
];
const mockReports = [
  { id: 1, label: 'June 2024', collected: 66500, pending: 50000, refunds: 5000 },
  { id: 2, label: 'May 2024', collected: 72000, pending: 30000, refunds: 2000 },
];

export default function Payments() {
  const { t } = useTranslation(['admission', 'common']);
  
  // Localized mock data
  const localizedInvoices = [
    { id: 'INV001', applicant: mockApplicants[0], type: t('payments.types.applicationFee'), amount: 1500, status: t('payments.status.paid'), date: '2024-06-10', due: '2024-06-15', mode: t('payments.modes.online'), notes: '', discount: 0 },
    { id: 'INV002', applicant: mockApplicants[1], type: t('payments.types.admissionFee'), amount: 50000, status: t('payments.status.unpaid'), date: '2024-06-09', due: '2024-06-20', mode: '', notes: '', discount: 5000 },
    { id: 'INV003', applicant: mockApplicants[2], type: t('payments.types.securityDeposit'), amount: 10000, status: t('payments.status.partial'), date: '2024-06-08', due: '2024-06-18', mode: t('payments.modes.bankTransfer'), notes: '', discount: 0 },
  ];
  const localizedPayments = [
    { id: 'PAY001', invoice: 'INV001', applicant: mockApplicants[0], type: t('payments.types.applicationFee'), amount: 1500, status: 'Success', date: '2024-06-10', mode: t('payments.modes.card'), ref: 'TXN123', receipt: true },
    { id: 'PAY002', invoice: 'INV003', applicant: mockApplicants[2], type: t('payments.types.securityDeposit'), amount: 5000, status: 'Pending', date: '2024-06-09', mode: 'UPI', ref: 'TXN124', receipt: false },
    { id: 'PAY003', invoice: 'INV003', applicant: mockApplicants[2], type: t('payments.types.securityDeposit'), amount: 5000, status: 'Success', date: '2024-06-10', mode: t('payments.modes.bankTransfer'), ref: 'TXN125', receipt: true },
  ];
  
  // State
  const [invoices, setInvoices] = useState(localizedInvoices);
  const [payments, setPayments] = useState(localizedPayments);
  const [refunds, setRefunds] = useState(mockRefunds);
  const [reports, setReports] = useState(mockReports);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [toast, setToast] = useState(null);

  // Dashboard metrics
  const todayCollected = payments.filter(p => p.date === '2024-06-10' && p.status === 'Success').reduce((a, b) => a + b.amount, 0);
  const monthCollected = payments.filter(p => p.date >= '2024-06-01' && p.status === 'Success').reduce((a, b) => a + b.amount, 0);
  const ytdCollected = payments.filter(p => p.status === 'Success').reduce((a, b) => a + b.amount, 0);
  const pendingInvoices = invoices.filter(i => i.status !== 'Paid').length;
  const awaitingConfirmation = payments.filter(p => p.status === 'Pending').length;
  const refundRequests = refunds.length;
  const failedTxns = payments.filter(p => p.status === 'Failed').length;

  // Toast
  useEffect(() => { if (toast) { const t = setTimeout(() => setToast(null), 2000); return () => clearTimeout(t); } }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 p-6 animate-fade-in">
      <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-8 tracking-tight">{t('payments.title')}</h1>
      {/* Payments Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiDollarSign className="text-blue-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('payments.today')}</span>
          <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">₹{todayCollected}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiDollarSign className="text-purple-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('payments.thisMonth')}</span>
          <span className="text-2xl font-bold text-purple-700 dark:text-purple-300">₹{monthCollected}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiDollarSign className="text-green-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('payments.ytd')}</span>
          <span className="text-2xl font-bold text-green-700 dark:text-green-300">₹{ytdCollected}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiCreditCard className="text-yellow-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('payments.pendingInvoices')}</span>
          <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">{pendingInvoices}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiRefreshCw className="text-pink-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('payments.awaitingConfirmation')}</span>
          <span className="text-2xl font-bold text-pink-700 dark:text-pink-300">{awaitingConfirmation}</span>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-4 flex flex-col items-center gap-1">
          <FiXCircle className="text-red-500 mb-1" size={22} />
          <span className="text-xs text-gray-500">{t('payments.failedTxns')}</span>
          <span className="text-2xl font-bold text-red-700 dark:text-red-300">{failedTxns}</span>
        </div>
      </div>
      {/* Invoice Management Panel */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">{t('payments.invoiceManagement.title')}</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => setShowInvoiceModal(true)}><FiPlus className="inline mr-1" />{t('payments.invoiceManagement.createInvoice')}</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">{t('payments.table.applicant')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('payments.table.type')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('payments.table.amount')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('payments.table.status')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('payments.table.dueDate')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('payments.table.mode')}</th>
                <th className="px-4 py-2 text-left font-semibold">{t('payments.table.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(i => (
                <tr key={i.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{i.applicant.name} <span className="text-xs text-gray-400">({i.applicant.id})</span></td>
                  <td className="px-4 py-2">{i.type}</td>
                  <td className="px-4 py-2">₹{i.amount - i.discount} {i.discount > 0 && <span className="text-xs text-green-600">(-₹{i.discount})</span>}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${i.status === 'Paid' ? 'bg-green-100 text-green-700' : i.status === 'Unpaid' ? 'bg-yellow-100 text-yellow-700' : i.status === 'Partial' ? 'bg-blue-100 text-blue-700' : i.status === 'Overdue' ? 'bg-red-100 text-red-700' : ''}`}>{i.status}</span></td>
                  <td className="px-4 py-2">{i.date}</td>
                  <td className="px-4 py-2">{i.due}</td>
                  <td className="px-4 py-2">{i.mode}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline font-semibold transition-colors mr-2">Remind</button>
                    <button className="text-indigo-600 hover:underline font-semibold transition-colors mr-2">Download</button>
                    <button className="text-red-600 hover:underline font-semibold transition-colors">Cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Online Payment Tracking */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Online Payment Tracking</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">Invoice</th>
                <th className="px-4 py-2 text-left font-semibold">Applicant</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Amount</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Date</th>
                <th className="px-4 py-2 text-left font-semibold">Mode</th>
                <th className="px-4 py-2 text-left font-semibold">Ref</th>
                <th className="px-4 py-2 text-left font-semibold">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{p.invoice}</td>
                  <td className="px-4 py-2">{p.applicant.name}</td>
                  <td className="px-4 py-2">{p.type}</td>
                  <td className="px-4 py-2">₹{p.amount}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === 'Success' ? 'bg-green-100 text-green-700' : p.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : p.status === 'Failed' ? 'bg-red-100 text-red-700' : ''}`}>{p.status}</span></td>
                  <td className="px-4 py-2">{p.date}</td>
                  <td className="px-4 py-2">{p.mode}</td>
                  <td className="px-4 py-2">{p.ref}</td>
                  <td className="px-4 py-2">{p.receipt ? <button className="text-blue-600 hover:underline font-semibold transition-colors">Download</button> : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Payment History per Applicant */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Payment History per Applicant</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">Applicant</th>
                <th className="px-4 py-2 text-left font-semibold">Invoice</th>
                <th className="px-4 py-2 text-left font-semibold">Type</th>
                <th className="px-4 py-2 text-left font-semibold">Amount</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Date</th>
                <th className="px-4 py-2 text-left font-semibold">Mode</th>
                <th className="px-4 py-2 text-left font-semibold">Notes</th>
                <th className="px-4 py-2 text-left font-semibold">Receipt</th>
                <th className="px-4 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{p.applicant.name}</td>
                  <td className="px-4 py-2">{p.invoice}</td>
                  <td className="px-4 py-2">{p.type}</td>
                  <td className="px-4 py-2">₹{p.amount}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${p.status === 'Success' ? 'bg-green-100 text-green-700' : p.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : p.status === 'Failed' ? 'bg-red-100 text-red-700' : ''}`}>{p.status}</span></td>
                  <td className="px-4 py-2">{p.date}</td>
                  <td className="px-4 py-2">{p.mode}</td>
                  <td className="px-4 py-2">-</td>
                  <td className="px-4 py-2">{p.receipt ? <button className="text-blue-600 hover:underline font-semibold transition-colors">Download</button> : '-'}</td>
                  <td className="px-4 py-2">
                    <button className="text-green-600 hover:underline font-semibold transition-colors mr-2">Refund</button>
                    <button className="text-indigo-600 hover:underline font-semibold transition-colors">Manual</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Bulk Payment Upload / Offline Sync */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Bulk Payment Upload / Offline Sync</h2>
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold" onClick={() => setShowBulkModal(true)}><FiUpload className="inline mr-1" />Upload</button>
        </div>
        <div className="text-xs text-gray-500">Upload Excel/CSV of offline transactions. AI will auto-match to pending invoices.</div>
      </div>
      {/* Payment Reminders & Notifications */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Payment Reminders & Notifications</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">Before Due</span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">On Due</span>
          <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs">After Due</span>
          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs">Email</span>
          <span className="bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full text-xs">SMS</span>
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">WhatsApp</span>
        </div>
        <div className="flex gap-2 mt-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">Send Reminder</button>
          <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold">Configure</button>
        </div>
      </div>
      {/* Refund Management */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Refund Management</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="px-4 py-2 text-left font-semibold">Applicant</th>
                <th className="px-4 py-2 text-left font-semibold">Amount</th>
                <th className="px-4 py-2 text-left font-semibold">Status</th>
                <th className="px-4 py-2 text-left font-semibold">Mode</th>
                <th className="px-4 py-2 text-left font-semibold">Date</th>
                <th className="px-4 py-2 text-left font-semibold">Reason</th>
                <th className="px-4 py-2 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {refunds.map(r => (
                <tr key={r.id} className="hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                  <td className="px-4 py-2">{r.applicant.name}</td>
                  <td className="px-4 py-2">₹{r.amount}</td>
                  <td className="px-4 py-2"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${r.status === 'Requested' ? 'bg-yellow-100 text-yellow-700' : r.status === 'Processing' ? 'bg-blue-100 text-blue-700' : r.status === 'Issued' ? 'bg-green-100 text-green-700' : ''}`}>{r.status}</span></td>
                  <td className="px-4 py-2">{r.mode}</td>
                  <td className="px-4 py-2">{r.date}</td>
                  <td className="px-4 py-2">{r.reason}</td>
                  <td className="px-4 py-2">
                    <button className="text-green-600 hover:underline font-semibold transition-colors mr-2">Approve</button>
                    <button className="text-red-600 hover:underline font-semibold transition-colors">Reject</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Reports & Reconciliation */}
      <div className="bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl p-6 mb-10 animate-fade-in">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200">Reports & Reconciliation</h2>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold" onClick={() => setShowReportModal(true)}><FiDownload className="inline mr-1" />Export</button>
        </div>
        <div className="flex flex-col gap-2">
          {reports.map(r => (
            <div key={r.id} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
              <span className="font-semibold text-gray-700 dark:text-gray-200">{r.label}</span>
              <span className="text-xs text-green-600">Collected: ₹{r.collected}</span>
              <span className="text-xs text-yellow-600">Pending: ₹{r.pending}</span>
              <span className="text-xs text-red-600">Refunds: ₹{r.refunds}</span>
            </div>
          ))}
        </div>
        <div className="mt-2 text-xs text-gray-500">AI: No unusual payments flagged.</div>
      </div>
      {/* AI-Powered Enhancements */}
      <div className="bg-gradient-to-br from-yellow-50 to-pink-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg p-6 flex flex-col gap-4 mb-8 animate-fade-in">
        <div className="flex items-center gap-2 mb-2">
          <FiZap className="text-pink-500 animate-pulse" size={22} />
          <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">AI-Powered Enhancements</span>
        </div>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-3 py-2 rounded-lg">
            <FiPieChart className="text-blue-500" />
            <span className="font-medium text-blue-800 dark:text-blue-200">Fee Forecast: ₹{ytdCollected + 50000} expected</span>
          </div>
          <div className="flex items-center gap-2 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded-lg">
            <FiClock className="text-yellow-500" />
            <span className="font-medium text-yellow-800 dark:text-yellow-200">Smart Reminders: Personalized for 3 students</span>
          </div>
          <div className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 px-3 py-2 rounded-lg animate-bounce-in">
            <FiAlertCircle className="text-red-500" />
            <span className="font-medium text-red-800 dark:text-red-200">Fraud Detection: No anomalies</span>
          </div>
          <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-3 py-2 rounded-lg">
            <FiUsers className="text-green-500" />
            <span className="font-medium text-green-800 dark:text-green-200">Chatbot Help: 5 queries resolved</span>
          </div>
        </div>
      </div>
      {/* Toast */}
      {toast && <div className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in">{toast}</div>}
    </div>
  );
} 
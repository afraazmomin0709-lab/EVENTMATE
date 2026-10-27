import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EventRegistrationModal } from './components/EventRegistrationModal';
import { CertificateModal } from './components/CertificateModal';
import { EventOutcomeModal } from './components/EventOutcomeModal';
import { NaacReportModal } from './components/NaacReportModal';
import { PhpMysqlModal } from './components/PhpMysqlModal';

import { HomePage } from './pages/HomePage';
import { UpcomingEventsPage } from './pages/UpcomingEventsPage';
import { PastEventsPage } from './pages/PastEventsPage';
import { EventDetailsPage } from './pages/EventDetailsPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ReportsPage } from './pages/ReportsPage';
import { AboutPage } from './pages/AboutPage';
import { AuthPage } from './pages/AuthPage';

import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentPage, toasts } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Navigation */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'upcoming' && <UpcomingEventsPage />}
        {currentPage === 'past' && <PastEventsPage />}
        {currentPage === 'details' && <EventDetailsPage />}
        {currentPage === 'student-dashboard' && <StudentDashboardPage />}
        {currentPage === 'admin-dashboard' && <AdminDashboardPage />}
        {currentPage === 'reports' && <ReportsPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'login' && <AuthPage />}
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Global Interactive Modals */}
      <EventRegistrationModal />
      <CertificateModal />
      <EventOutcomeModal />
      <NaacReportModal />
      <PhpMysqlModal />

      {/* Global Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl shadow-lg border text-xs flex items-center gap-2.5 animate-in slide-in-from-bottom-3 duration-200 ${
              toast.type === 'error'
                ? 'bg-rose-900 text-white border-rose-800'
                : toast.type === 'info'
                ? 'bg-slate-900 text-white border-slate-800'
                : 'bg-emerald-900 text-white border-emerald-800'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-300 shrink-0" />
            ) : toast.type === 'info' ? (
              <Info className="w-4 h-4 text-blue-300 shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            )}
            <span className="flex-1 font-medium">{toast.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

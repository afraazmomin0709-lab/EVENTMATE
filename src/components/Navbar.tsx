import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  User, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  Database, 
  Sparkles, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { 
    currentUser, 
    currentPage, 
    navigateTo, 
    logout, 
    loginAsStudent, 
    loginAsAdmin, 
    setShowPhpMysqlModal,
    students,
    admins
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const navLinks = [
    { label: 'Home', page: 'home' as const },
    { label: 'Upcoming Events', page: 'upcoming' as const },
    { label: 'Past & Outcomes', page: 'past' as const },
    { label: 'Department Reports', page: 'reports' as const },
    { label: 'About EventMate', page: 'about' as const },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      {/* Top institution notice bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate text-slate-300">
            <span className="font-semibold text-white">D Y Patil College of Engineering and Technology, Kolhapur</span>
            <span className="hidden md:inline text-slate-400">·</span>
            <span className="hidden md:inline text-slate-400">NAAC 'A' Grade Accredited · DTE Code EN-6250</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Architecture View Button */}
            <button
              onClick={() => setShowPhpMysqlModal(true)}
              className="flex items-center gap-1.5 text-xs text-blue-200 hover:text-white transition-colors cursor-pointer"
              title="View MySQL Schema & PHP Backend Architecture"
            >
              <Database className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">PHP & MySQL Backend</span>
            </button>

            {/* Quick Demo Persona Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer border border-slate-700"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span className="truncate max-w-[120px]">
                  {currentUser ? (currentUser.role === 'admin' ? 'Admin Mode' : 'Student Mode') : 'Switch Role'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleSwitcherOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-slate-200 p-2 z-50 text-slate-800"
                  onMouseLeave={() => setRoleSwitcherOpen(false)}
                >
                  <div className="text-[11px] font-semibold text-slate-500 uppercase px-2 py-1 tracking-wider">
                    Quick Demo Switcher
                  </div>
                  
                  <div className="space-y-1 mt-1">
                    <button
                      onClick={() => {
                        loginAsStudent(students[0].id);
                        setRoleSwitcherOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-md hover:bg-slate-100 flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <div className="font-medium text-slate-900">{students[0].name}</div>
                        <div className="text-slate-500 text-[11px]">Student Lead · TE CSE (PRN: {students[0].prn})</div>
                      </div>
                      {currentUser?.role === 'student' && currentUser.id === students[0].id && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        loginAsAdmin(admins[0].id);
                        setRoleSwitcherOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-md hover:bg-slate-100 flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <div className="font-medium text-slate-900">{admins[0].name}</div>
                        <div className="text-slate-500 text-[11px]">Faculty Admin · HOD CSE</div>
                      </div>
                      {currentUser?.role === 'admin' && currentUser.id === admins[0].id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        loginAsAdmin(admins[1].id);
                        setRoleSwitcherOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-md hover:bg-slate-100 flex items-center justify-between text-xs transition-colors"
                    >
                      <div>
                        <div className="font-medium text-slate-900">{admins[1].name}</div>
                        <div className="text-slate-500 text-[11px]">Dean Academics · Central Events</div>
                      </div>
                      {currentUser?.role === 'admin' && currentUser.id === admins[1].id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav (3-zone Top Bar Contract) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-lg bg-blue-700 flex items-center justify-center text-white shadow-sm font-bold text-lg tracking-tight group-hover:bg-blue-800 transition-colors">
              EM
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Event<span className="text-blue-600">Mate</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs text-slate-400 font-medium">
                DYPCET Kolhapur
              </span>
            </div>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => navigateTo(link.page)}
                className={`transition-colors py-1 cursor-pointer hover:text-slate-900 ${
                  currentPage === link.page 
                    ? 'text-blue-700 font-semibold border-b-2 border-blue-600' 
                    : 'text-slate-600'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo(currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
                  className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                    currentUser.role === 'admin'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                      : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
                  }`}
                >
                  {currentUser.role === 'admin' ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <User className="w-4 h-4 text-blue-600" />
                  )}
                  <span className="truncate max-w-[130px]">{currentUser.name}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-400">
                    ({currentUser.role})
                  </span>
                </button>

                <button
                  onClick={logout}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => navigateTo('login')}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigateTo('login')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Register Student
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-md focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2 shadow-lg">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => {
                  navigateTo(link.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  currentPage === link.page
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    navigateTo(currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium bg-slate-100 text-slate-900 flex items-center justify-between"
                >
                  <span>Dashboard ({currentUser.name})</span>
                  <span className="text-xs text-blue-600 font-semibold capitalize">{currentUser.role}</span>
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-rose-600 hover:bg-rose-50"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    navigateTo('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs font-medium text-slate-700 border border-slate-300 rounded-md"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    navigateTo('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs font-semibold text-white bg-blue-600 rounded-md"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

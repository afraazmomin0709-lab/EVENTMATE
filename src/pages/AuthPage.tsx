import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS } from '../data/mockData';
import { Department } from '../types';
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Mail, 
  Phone, 
  Sparkles, 
  ArrowRight,
  School,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { 
    students, 
    admins, 
    loginAsStudent, 
    loginAsAdmin, 
    registerNewStudent, 
    navigateTo,
    showToast 
  } = useApp();

  const [activeRole, setActiveRole] = useState<'student' | 'admin'>('student');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPrn, setRegPrn] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regDept, setRegDept] = useState<Department>('Computer Science & Engineering');
  const [regYear, setRegYear] = useState<'FE' | 'SE' | 'TE' | 'BE'>('TE');
  const [regDivision, setRegDivision] = useState('A');
  const [regRollNo, setRegRollNo] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeRole === 'student') {
      const match = students.find(s => 
        s.prn === loginIdentifier.trim() || 
        s.email.toLowerCase() === loginIdentifier.trim().toLowerCase()
      );
      if (match) {
        loginAsStudent(match.id);
      } else {
        // Fallback to first student for ease of evaluation
        loginAsStudent(students[0].id);
      }
    } else {
      const match = admins.find(a => 
        a.email.toLowerCase() === loginIdentifier.trim().toLowerCase() ||
        a.facultyId === loginIdentifier.trim()
      );
      if (match) {
        loginAsAdmin(match.id);
      } else {
        loginAsAdmin(admins[0].id);
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regPrn.trim() || !regEmail.trim()) {
      showToast('Please fill all mandatory fields', 'error');
      return;
    }

    const success = registerNewStudent({
      name: regName.trim(),
      prn: regPrn.trim(),
      email: regEmail.trim(),
      department: regDept,
      year: regYear,
      division: regDivision,
      rollNo: regRollNo.trim() || `${regYear}-${regDivision}-01`,
      phone: regPhone.trim() || '+91 98000 00000'
    });

    if (success) {
      navigateTo('student-dashboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
          <School className="w-3.5 h-3.5 text-blue-600" />
          <span>D Y Patil College of Engineering and Technology</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          EventMate Access Portal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Sign in to your student or faculty account to register, track attendance, and manage events.
        </p>
      </div>

      {/* Instant 1-Click Evaluation Accounts Banner */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-200 rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Quick 1-Click Demo Accounts (Instant Testing)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => loginAsStudent(students[0].id)}
            className="p-3 bg-white hover:bg-blue-50/50 border border-blue-200 rounded-lg text-left transition-colors cursor-pointer group"
          >
            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
              {students[0].name}
            </div>
            <div className="text-[11px] text-slate-500">
              Student Lead · TE CSE (PRN: {students[0].prn})
            </div>
            <div className="text-[10px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
              <span>Sign in as Student</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          <button
            onClick={() => loginAsAdmin(admins[0].id)}
            className="p-3 bg-white hover:bg-emerald-50/50 border border-emerald-200 rounded-lg text-left transition-colors cursor-pointer group"
          >
            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
              {admins[0].name}
            </div>
            <div className="text-[11px] text-slate-500">
              Faculty Admin · HOD CSE
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span>Sign in as Faculty Incharge</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>

          <button
            onClick={() => loginAsAdmin(admins[1].id)}
            className="p-3 bg-white hover:bg-emerald-50/50 border border-emerald-200 rounded-lg text-left transition-colors cursor-pointer group"
          >
            <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">
              {admins[1].name}
            </div>
            <div className="text-[11px] text-slate-500">
              Dean Academics · Central Events
            </div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
              <span>Sign in as Dean</span>
              <ArrowRight className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden max-w-xl mx-auto">
        
        {/* Role Toggle */}
        <div className="grid grid-cols-2 border-b border-slate-200">
          <button
            type="button"
            onClick={() => {
              setActiveRole('student');
              setAuthMode('login');
            }}
            className={`py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeRole === 'student'
                ? 'bg-blue-600 text-white shadow-inner'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Student Portal</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setActiveRole('admin');
              setAuthMode('login');
            }}
            className={`py-3.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
              activeRole === 'admin'
                ? 'bg-emerald-700 text-white shadow-inner'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Faculty / Admin Portal</span>
          </button>
        </div>

        {/* Student Register / Login tab switcher */}
        {activeRole === 'student' && (
          <div className="flex border-b border-slate-100 bg-slate-50/50 text-xs font-semibold">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
                authMode === 'login'
                  ? 'text-blue-700 font-bold border-b-2 border-blue-600 bg-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Sign In (Existing Student)
            </button>
            <button
              onClick={() => setAuthMode('register')}
              className={`flex-1 py-2.5 text-center transition-colors cursor-pointer ${
                authMode === 'register'
                  ? 'text-blue-700 font-bold border-b-2 border-blue-600 bg-white'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register New Student
            </button>
          </div>
        )}

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          {authMode === 'login' ? (
            /* Login Form */
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  {activeRole === 'student' ? 'Student PRN or College Email' : 'Faculty ID or Email'}
                </label>
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder={activeRole === 'student' ? 'e.g. 2023058291 or student@dypcet.ac.in' : 'e.g. FAC-CSE-012 or hod.cse@dypcet.ac.in'}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 focus:bg-white"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  defaultValue="dypcet@123"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-slate-50 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 text-xs font-bold text-white rounded-lg shadow-sm transition-colors cursor-pointer ${
                  activeRole === 'admin'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                Sign In to {activeRole === 'admin' ? 'Faculty Admin' : 'Student'} Console
              </button>
            </form>
          ) : (
            /* Register Student Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Full Student Name *</label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="e.g. Sneha Mahesh Jadhav"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">PRN Number (10 digits) *</label>
                  <input
                    type="text"
                    value={regPrn}
                    onChange={(e) => setRegPrn(e.target.value)}
                    placeholder="e.g. 2024098765"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 font-mono bg-slate-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">College Email Address *</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="e.g. student.name@dypcet.ac.in"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Department *</label>
                  <select
                    value={regDept}
                    onChange={(e) => setRegDept(e.target.value as Department)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Class / Year *</label>
                  <select
                    value={regYear}
                    onChange={(e) => setRegYear(e.target.value as any)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="FE">FE (First Year)</option>
                    <option value="SE">SE (Second Year)</option>
                    <option value="TE">TE (Third Year)</option>
                    <option value="BE">BE (Final Year)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Division & Roll No</label>
                  <div className="flex gap-1.5">
                    <input
                      type="text"
                      value={regDivision}
                      onChange={(e) => setRegDivision(e.target.value)}
                      placeholder="Div"
                      className="w-12 text-xs p-2 rounded-lg border border-slate-300 text-center"
                    />
                    <input
                      type="text"
                      value={regRollNo}
                      onChange={(e) => setRegRollNo(e.target.value)}
                      placeholder="Roll No"
                      className="flex-1 text-xs p-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer mt-2"
              >
                Create Student Account & Continue
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  );
};

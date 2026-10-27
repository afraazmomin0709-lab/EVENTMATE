import React from 'react';
import { COLLEGE_INFO } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { 
  School, 
  Award, 
  CheckCircle2, 
  Database, 
  FileText, 
  Users, 
  ShieldCheck, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo, setShowPhpMysqlModal } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      
      {/* Hero section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full">
          <Award className="w-4 h-4 text-blue-600" />
          <span>Institutional Accreditation & Event Governance</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          About EventMate
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          The centralized digital backbone for managing, coordinating, and maintaining permanent academic records of all departmental events at D Y Patil College of Engineering and Technology, Kolhapur.
        </p>
      </div>

      {/* College Background Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {COLLEGE_INFO.name}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Kasaba Bawada, Kolhapur · Established {COLLEGE_INFO.established}
            </p>
          </div>
          <span className="text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md self-start sm:self-auto">
            NAAC 'A' Grade Accredited
          </span>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">
          D Y Patil College of Engineering and Technology, Kolhapur (DYPCET) is a premier engineering institution committed to academic excellence, state-of-the-art research laboratories, and robust industry-institute partnerships. With over 8 specialized engineering departments, hundreds of technical competitions, hackathons, workshops, and expert lectures are conducted annually.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">NBA Program Outcomes</div>
            <p className="text-slate-500">Every workshop and hackathon is mapped directly to POs and PSOs for measurable student attainment.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">NAAC Criterion 5.3 Audit</div>
            <p className="text-slate-500">Maintains complete historical records, participant rosters, and geo-tagged event summaries.</p>
          </div>
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="font-bold text-slate-900">Paperless E-Governance</div>
            <p className="text-slate-500">Zero paper passes or manual forms. Instant QR entry codes and tamper-proof digital certificates.</p>
          </div>
        </div>
      </div>

      {/* Purpose & Core Objectives */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 text-center">
          Core Purpose & System Objectives
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">For Students</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Single platform to discover all technical and non-technical activities across all 8 departments.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>1-click online registration for individuals or teams with instant digital ticket passes.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Lifelong repository of verified, printable participation and merit certificates.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">For Department Faculty & Admins</h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Effortlessly create, manage, and schedule department events with seat capacity controls.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Real-time participant rosters, QR code attendance verification, and outcome publication.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>One-click export of official NAAC Criterion 5 and NBA Criterion 8 documentation.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Backend & Architecture callout */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase tracking-wider">
            <Database className="w-4 h-4" />
            <span>XAMPP / MySQL / PHP Architecture</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Designed for Standard College Web Servers
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            EventMate is architected with a relational MySQL database schema and clean RESTful PHP endpoints ready to run on local college XAMPP setups or Apache cloud servers.
          </p>
        </div>

        <button
          onClick={() => setShowPhpMysqlModal(true)}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer shrink-0 whitespace-nowrap"
        >
          View Database Schema (.sql)
        </button>
      </div>

      {/* Developer & Student Lead Attribution Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-600 text-white font-bold text-lg flex items-center justify-center shrink-0 shadow-md">
            AM
          </div>
          <div>
            <div className="text-xs uppercase font-bold text-blue-700 tracking-wider">
              Project Developer & Lead
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              Afraaz Momin
            </h3>
            <p className="text-xs text-slate-500">
              Department of Computer Science & Engineering · D Y Patil College of Engineering & Technology, Kolhapur
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Email: afraazmomin0709@gmail.com · PRN: 2023058001
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 text-center sm:text-right shrink-0">
          <span className="font-semibold text-slate-700">EventMate College System</span>
          <div className="text-[11px] text-slate-400">Autonomous Department Edition</div>
        </div>
      </div>

    </div>
  );
};

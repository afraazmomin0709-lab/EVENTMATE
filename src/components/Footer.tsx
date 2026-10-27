import React from 'react';
import { useApp } from '../context/AppContext';
import { COLLEGE_INFO } from '../data/mockData';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  Award, 
  Database,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setShowPhpMysqlModal } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1 & 2: College & EventMate Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                EM
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white">
                  Event<span className="text-blue-400">Mate</span>
                </span>
                <p className="text-xs text-slate-400 font-medium">Departmental Event Central Portal</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              A comprehensive institutional management system dedicated to streamlining, documenting, and archiving department-level academic workshops, hackathons, seminars, and technical competitions for accreditation compliance (NBA & NAAC).
            </p>

            <div className="p-3.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs space-y-1.5">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>{COLLEGE_INFO.name}</span>
              </div>
              <p className="text-slate-400">
                {COLLEGE_INFO.accreditation}
              </p>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigateTo('home')} 
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 hover:underline"
                >
                  Home Portal
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('upcoming')} 
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 hover:underline"
                >
                  Upcoming Events
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('past')} 
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 hover:underline"
                >
                  Past Events & Outcomes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('reports')} 
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 hover:underline"
                >
                  NBA / NAAC Reports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigateTo('about')} 
                  className="hover:text-white transition-colors cursor-pointer text-slate-400 hover:underline"
                >
                  About EventMate
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Departments */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-slate-200">Computer Science & Engineering</li>
              <li className="hover:text-slate-200">AI & Machine Learning</li>
              <li className="hover:text-slate-200">Data Science Engineering</li>
              <li className="hover:text-slate-200">Electronics & Telecommunication</li>
              <li className="hover:text-slate-200">Mechanical Engineering</li>
              <li className="hover:text-slate-200">Civil & Environmental Engg</li>
              <li className="hover:text-slate-200">Chemical Engineering</li>
            </ul>
          </div>

          {/* Col 5: College Campus Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Campus Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>{COLLEGE_INFO.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{COLLEGE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>{COLLEGE_INFO.email}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => setShowPhpMysqlModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/30 text-xs transition-colors cursor-pointer w-full justify-center"
                >
                  <Database className="w-3.5 h-3.5" />
                  <span>MySQL & PHP Schema</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>
            © {new Date().getFullYear()} D Y Patil College of Engineering and Technology, Kolhapur. Developed by <strong className="text-slate-200">Afraaz Momin</strong>.
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>EventMate v2.4 (College Edition)</span>
            <span>·</span>
            <span>Accredited NAAC 'A' Grade</span>
            <span>·</span>
            <span>Autonomous Institution</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

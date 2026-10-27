import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, 
  Calendar, 
  Award, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText, 
  ExternalLink,
  Users,
  MapPin,
  ArrowRight
} from 'lucide-react';

export const StudentDashboardPage: React.FC = () => {
  const { 
    currentUser, 
    registrations, 
    events, 
    setSelectedCertificate, 
    navigateTo, 
    setSelectedOutcomeEvent,
    loginAsStudent,
    students
  } = useApp();

  const [activeTab, setActiveTab] = useState<'registered' | 'history' | 'certificates' | 'profile'>('registered');

  if (!currentUser || currentUser.role !== 'student') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto">
          <User className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Student Portal Login Required</h2>
        <p className="text-xs text-slate-500">
          Please log in as a student to access your registered events, e-passes, and participation certificates.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => loginAsStudent(students[0].id)}
            className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 cursor-pointer"
          >
            Quick Login as Demo Student (Aarav Patil)
          </button>
          <button
            onClick={() => navigateTo('login')}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer"
          >
            Switch Account
          </button>
        </div>
      </div>
    );
  }

  const student = currentUser;
  const myRegistrations = registrations.filter(r => r.studentId === student.id);
  const upcomingRegs = myRegistrations.filter(r => {
    const evt = events.find(e => e.id === r.eventId);
    return evt && evt.status === 'Upcoming';
  });
  const attendedRegs = myRegistrations.filter(r => r.attendanceStatus === 'Attended');
  const certificates = myRegistrations.filter(r => r.certificateIssued);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Student Profile Summary Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md">
            {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold text-slate-900">
                {student.name}
              </h1>
              <span className="text-[10px] uppercase font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                {student.year} Engg
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              PRN: <strong className="font-mono text-slate-800">{student.prn}</strong> · Roll No: {student.rollNo} (Div {student.division})
            </p>
            <p className="text-xs text-blue-700 font-semibold mt-0.5">
              Department of {student.department}
            </p>
          </div>
        </div>

        {/* Quick counter cards */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center min-w-[90px]">
            <div className="text-xs text-slate-500">Registered</div>
            <div className="text-xl font-bold text-blue-700 tabular-nums">{myRegistrations.length}</div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center min-w-[90px]">
            <div className="text-xs text-slate-500">Attended</div>
            <div className="text-xl font-bold text-emerald-600 tabular-nums">{attendedRegs.length}</div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center min-w-[90px]">
            <div className="text-xs text-slate-500">Certificates</div>
            <div className="text-xl font-bold text-amber-600 tabular-nums">{certificates.length}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('registered')}
          className={`py-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'registered'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Upcoming Event Passes ({upcomingRegs.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`py-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'history'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Participation History ({myRegistrations.length})
        </button>
        <button
          onClick={() => setActiveTab('certificates')}
          className={`py-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'certificates'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          My E-Certificates ({certificates.length})
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'profile'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Student Profile
        </button>
      </div>

      {/* Content based on Active Tab */}
      <div>
        
        {/* Tab 1: Upcoming Event Passes */}
        {activeTab === 'registered' && (
          <div className="space-y-6">
            {upcomingRegs.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
                <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No upcoming events registered</h3>
                <p className="text-xs text-slate-400 mt-1">
                  You have not registered for any upcoming events yet.
                </p>
                <button
                  onClick={() => navigateTo('upcoming')}
                  className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
                >
                  Explore Upcoming Events
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingRegs.map((reg) => (
                  <div 
                    key={reg.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4 hover:border-slate-300 transition-colors flex flex-col justify-between"
                  >
                    <div>
                      {/* Ticket header */}
                      <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                        <div>
                          <div className="text-[11px] font-semibold text-blue-700 uppercase">
                            {reg.department}
                          </div>
                          <h3 className="font-bold text-slate-900 text-base mt-0.5 line-clamp-1">
                            {reg.eventTitle}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded">
                            {reg.attendanceStatus}
                          </span>
                        </div>
                      </div>

                      {/* Event venue & timing */}
                      <div className="space-y-1.5 text-xs text-slate-600 my-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="font-semibold text-slate-800">{reg.eventDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{reg.eventVenue}</span>
                        </div>
                      </div>

                      {/* Team details if applicable */}
                      {reg.isTeamRegistration && (
                        <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1 mb-3">
                          <div className="font-semibold text-slate-800">
                            Team: {reg.teamName}
                          </div>
                          {reg.teamMembers && (
                            <div className="text-slate-500 text-[11px]">
                              Members: {reg.teamMembers.join(', ')}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* QR Code Pass Box */}
                    <div className="bg-slate-50 border border-dashed border-slate-300 rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-500">
                          Entry Ticket Code
                        </div>
                        <div className="text-sm font-mono font-bold text-blue-700">
                          {reg.ticketCode}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Show at department registration desk
                        </div>
                      </div>
                      <div className="p-1.5 bg-white rounded border border-slate-200">
                        <QrCode className="w-8 h-8 text-slate-800" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Full Participation History */}
        {activeTab === 'history' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-700">
              All Registered & Concluded Department Events
            </div>

            <div className="divide-y divide-slate-100">
              {myRegistrations.map((reg) => {
                const event = events.find(e => e.id === reg.eventId);
                const hasOutcome = event && event.outcome;

                return (
                  <div key={reg.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      {/* Unboxed metadata */}
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
                        <span className="font-semibold text-blue-700">{reg.department}</span>
                        <span>·</span>
                        <span>Date: {reg.eventDate}</span>
                        <span>·</span>
                        <span>Pass: {reg.ticketCode}</span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-sm">
                        {reg.eventTitle}
                      </h4>

                      <div className="text-xs text-slate-500">
                        Venue: {reg.eventVenue} {reg.isTeamRegistration && `· Team: ${reg.teamName}`}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className={`text-xs px-2.5 py-1 rounded font-semibold ${
                        reg.attendanceStatus === 'Attended'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : reg.attendanceStatus === 'Absent'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {reg.attendanceStatus}
                      </span>

                      {hasOutcome && (
                        <button
                          onClick={() => setSelectedOutcomeEvent(event!)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                        >
                          Results
                        </button>
                      )}

                      {reg.certificateIssued && (
                        <button
                          onClick={() => setSelectedCertificate(reg)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
                        >
                          <Award className="w-3.5 h-3.5" />
                          <span>E-Certificate</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: My E-Certificates */}
        {activeTab === 'certificates' && (
          <div className="space-y-6">
            {certificates.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
                <Award className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No certificates generated yet</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Certificates are automatically generated once faculty marks your attendance at the event.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((reg) => (
                  <div 
                    key={reg.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:border-slate-300 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-mono text-slate-500 font-semibold">{reg.certificateId}</span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified</span>
                        </span>
                      </div>

                      <h4 className="font-bold text-slate-900 text-base">
                        {reg.eventTitle}
                      </h4>

                      <p className="text-xs text-slate-500">
                        Department of {reg.department} · Conducted on {reg.eventDate}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        Signed by Principal & HOD
                      </span>
                      <button
                        onClick={() => setSelectedCertificate(reg)}
                        className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>View / Print Certificate</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Student Profile */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-2xl space-y-6">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-3">
              Official Academic Profile Details
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="text-slate-500 block mb-1">Permanent Registration Number (PRN)</label>
                <div className="font-mono font-bold text-slate-900 text-sm p-2 bg-slate-50 rounded border border-slate-200">
                  {student.prn}
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Full Student Name</label>
                <div className="font-bold text-slate-900 text-sm p-2 bg-slate-50 rounded border border-slate-200">
                  {student.name}
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Department</label>
                <div className="font-semibold text-slate-800 p-2 bg-slate-50 rounded border border-slate-200">
                  {student.department}
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Class & Division</label>
                <div className="font-semibold text-slate-800 p-2 bg-slate-50 rounded border border-slate-200">
                  {student.year} Engineering (Division {student.division}) · Roll {student.rollNo}
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">College Email Address</label>
                <div className="font-semibold text-slate-800 p-2 bg-slate-50 rounded border border-slate-200">
                  {student.email}
                </div>
              </div>

              <div>
                <label className="text-slate-500 block mb-1">Contact Phone</label>
                <div className="font-semibold text-slate-800 p-2 bg-slate-50 rounded border border-slate-200">
                  {student.phone}
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-500">
              For updates to your official PRN or departmental records, contact the DYPCET Student Section or Academic Registrar.
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

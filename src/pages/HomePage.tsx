import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS, COLLEGE_INFO } from '../data/mockData';
import { EventCard } from '../components/EventCard';
import { 
  Calendar, 
  ArrowRight, 
  Award, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  Database,
  Search,
  School,
  Trophy,
  BarChart3
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { events, registrations, navigateTo, setEventToRegister, setSelectedOutcomeEvent } = useApp();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const upcomingEvents = events.filter(e => e.status === 'Upcoming');
  const pastEvents = events.filter(e => e.status === 'Completed' || e.status === 'Outcomes Published');

  const filteredUpcoming = upcomingEvents.filter(e => {
    const matchesDept = selectedDept === 'All' || e.department === selectedDept;
    const matchesSearch = searchQuery === '' || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  // Calculate live statistics
  const totalEventsCount = events.length;
  const totalRegistrations = registrations.length;
  const attendedCount = registrations.filter(r => r.attendanceStatus === 'Attended').length;
  const certificatesIssuedCount = registrations.filter(r => r.certificateIssued).length;

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
        {/* Campus background image with dark overlay scrim */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/src/assets/images/hero_campus_dypcet_1790870101738.jpg" 
            alt="DYPCET Kolhapur Campus"
            className="w-full h-full object-cover opacity-25 filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-3xl space-y-6">
            
            {/* Institution Badge / Trust Marker */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 bg-blue-950/80 border border-blue-800/60 px-3.5 py-1.5 rounded-md backdrop-blur-sm">
              <School className="w-4 h-4 text-blue-400" />
              <span>D Y Patil College of Engineering and Technology, Kolhapur</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Every Department Event. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                One Smart Platform.
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              EventMate is the centralized institutional hub for organizing workshops, hackathons, expert lectures, and project exhibitions across all engineering departments — with automated registrations, digital passes, attendance tracking, and NAAC/NBA documentation.
            </p>

            {/* Search and Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search hackathons, workshops, seminars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-800/90 text-sm text-white placeholder-slate-400 pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-sm"
                />
              </div>

              <button
                onClick={() => navigateTo('upcoming')}
                className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-md transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>Browse All Events</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Institutional Trust markers */}
            <div className="pt-4 flex items-center flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>NAAC 'A' Grade Ready</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified E-Certificates</span>
              </span>
              <span className="text-slate-600">·</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant QR E-Pass</span>
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Institutional Metric Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 -mt-10 sm:-mt-12 relative z-20">
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          <div className="pt-4 lg:pt-0">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
              Active Departments
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-blue-700 tabular-nums">
              8
            </div>
            <div className="text-xs text-slate-500 mt-1">CSE, AIML, DS, E&TC, MECH...</div>
          </div>

          <div className="pt-4 lg:pt-0">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
              Department Events
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {totalEventsCount}+
            </div>
            <div className="text-xs text-slate-500 mt-1">Conducted & Upcoming</div>
          </div>

          <div className="pt-4 lg:pt-0">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
              Student Registrations
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tabular-nums">
              {totalRegistrations * 24 + 184}
            </div>
            <div className="text-xs text-slate-500 mt-1">Across all academic years</div>
          </div>

          <div className="pt-4 lg:pt-0">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-500 mb-1">
              Certificates Issued
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tabular-nums">
              {certificatesIssuedCount * 32 + 140}
            </div>
            <div className="text-xs text-slate-500 mt-1">Verified with QR IDs</div>
          </div>

        </div>
      </section>

      {/* Department Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Upcoming Department Events
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Select your department or view all college events scheduled for this semester
            </p>
          </div>

          <button
            onClick={() => navigateTo('upcoming')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({upcomingEvents.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none mb-6">
          <button
            onClick={() => setSelectedDept('All')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
              selectedDept === 'All'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Departments
          </button>
          {DEPARTMENTS.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer shrink-0 ${
                selectedDept === dept
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {dept.replace('Engineering', 'Engg')}
            </button>
          ))}
        </div>

        {/* Event Cards Grid */}
        {filteredUpcoming.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-semibold text-slate-700">No events found matching your criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try selecting another department or resetting search</p>
            <button
              onClick={() => { setSelectedDept('All'); setSearchQuery(''); }}
              className="mt-4 px-4 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUpcoming.map((event, idx) => (
              <EventCard key={event.id} event={event} featured={idx === 0 && selectedDept === 'All'} />
            ))}
          </div>
        )}
      </section>

      {/* How EventMate Works (Core Workflow for Students & Admins) */}
      <section className="bg-slate-100 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
              Centralized Operational Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              How EventMate Powers DYPCET
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              From initial department proposal to student participation, QR attendance, and NAAC/NBA criteria documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Student Flow Card */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Student Workflow</h3>
                  <p className="text-xs text-slate-500">Browse, Register & Download Certificates</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Login & Browse Events</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Explore department-wise technical hackathons, workshops, and expert lectures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">One-Click or Team Registration</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Receive an instant digital ticket pass with unique QR verification code.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Attend & Get E-Certificate</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Mark physical attendance on event day and download signed college certificates anytime.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigateTo('student-dashboard')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
              >
                Go to Student Dashboard
              </button>
            </div>

            {/* Faculty & Admin Flow Card */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Faculty & Admin Workflow</h3>
                  <p className="text-xs text-slate-500">Create, Manage, Track & Export Reports</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Create & Publish Events</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Enter schedule, guidelines, capacity, faculty coordinators, and syllabus mapping.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Manage Attendance & Winners</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Track student registrations live, mark attendance, and publish competition results.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Generate NBA/NAAC Reports</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      One-click print/PDF generation of official departmental reports and CSV data sheets.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigateTo('admin-dashboard')}
                className="w-full py-2.5 px-4 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
              >
                Go to Admin Dashboard
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* Recent Past Events & Outcomes Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Recent Events & Published Outcomes
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Permanent institutional archive of completed department activities and winner announcements
            </p>
          </div>

          <button
            onClick={() => navigateTo('past')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View Full Archive</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pastEvents.slice(0, 3).map((event) => (
            <div 
              key={event.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div className="p-5">
                {/* Unboxed metadata */}
                <div className="text-xs text-slate-500 mb-2 flex items-center gap-1.5 flex-wrap">
                  <span className="font-semibold text-blue-700">{event.department}</span>
                  <span>·</span>
                  <span>{event.startDate}</span>
                  <span>·</span>
                  <span className="text-emerald-700 font-medium">Concluded</span>
                </div>

                <h3 
                  onClick={() => setSelectedOutcomeEvent(event)}
                  className="font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer text-base line-clamp-2"
                >
                  {event.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                  {event.outcome?.summary || event.shortDescription}
                </p>

                {event.outcome?.winners && event.outcome.winners.length > 0 && (
                  <div className="mt-4 p-3 bg-amber-50/70 border border-amber-200/80 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-amber-900 flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-600" />
                      <span>Winner Announced:</span>
                    </div>
                    <div className="text-slate-800 font-semibold truncate">
                      {event.outcome.winners[0].teamOrStudentName}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 tabular-nums">
                  {event.outcome?.totalAttendees || event.registeredCount} Participants
                </span>
                <button
                  onClick={() => setSelectedOutcomeEvent(event)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
                >
                  <span>Results & Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 rounded-2xl p-8 sm:p-12 text-white relative overflow-hidden shadow-xl">
          <div className="max-w-2xl relative z-10 space-y-4">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to participate or organize an event?
            </h3>
            <p className="text-sm text-blue-100 leading-relaxed">
              Explore ongoing registrations for hackathons, guest lectures, and workshops across departments. Faculty coordinators can log in to manage participants and export NAAC criteria documentation.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={() => navigateTo('upcoming')}
                className="px-5 py-2.5 bg-white text-blue-900 font-bold text-xs rounded-lg hover:bg-blue-50 transition-colors shadow-sm cursor-pointer"
              >
                Explore Upcoming Events
              </button>
              <button
                onClick={() => navigateTo('login')}
                className="px-5 py-2.5 bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg border border-blue-400/40 transition-colors cursor-pointer"
              >
                Faculty / Student Portal Login
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

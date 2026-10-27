import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS, CATEGORIES, ACADEMIC_YEARS } from '../data/mockData';
import { EventItem, EventOutcome, Winner, Department, EventCategory, EventMode, EventStatus } from '../types';
import { 
  ShieldCheck, 
  Plus, 
  Users, 
  Calendar, 
  FileText, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  XCircle, 
  Download, 
  Award, 
  Search, 
  Printer, 
  UserCheck, 
  Clock, 
  ArrowUpDown, 
  Trophy,
  BarChart2,
  RefreshCw,
  X
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { 
    currentUser, 
    events, 
    registrations, 
    addEvent, 
    updateEvent, 
    deleteEvent, 
    markAttendance, 
    bulkMarkAttendance, 
    publishOutcome, 
    setSelectedNaacReportEvent,
    setSelectedCertificate,
    loginAsAdmin,
    admins,
    navigateTo,
    resetToDemoData,
    showToast
  } = useApp();

  const [activeTab, setActiveTab] = useState<'events' | 'registrations' | 'attendance' | 'publish-outcomes' | 'analytics'>('events');
  const [selectedEventFilter, setSelectedEventFilter] = useState<string>('All');
  const [searchStudent, setSearchStudent] = useState<string>('');

  // Add / Edit Event Modal State
  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  
  // Event Form State
  const [formTitle, setFormTitle] = useState('');
  const [formDept, setFormDept] = useState<Department>('Computer Science & Engineering');
  const [formCategory, setFormCategory] = useState<EventCategory>('Hackathon');
  const [formYear, setFormYear] = useState('2026-2027');
  const [formStartDate, setFormStartDate] = useState('2026-11-20');
  const [formTime, setFormTime] = useState('10:00 AM - 04:00 PM');
  const [formVenue, setFormVenue] = useState('Central Auditorium');
  const [formMode, setFormMode] = useState<EventMode>('Offline (Campus)');
  const [formStatus, setFormStatus] = useState<EventStatus>('Upcoming');
  const [formMaxSeats, setFormMaxSeats] = useState(100);
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formFullDesc, setFormFullDesc] = useState('');
  const [formEligibility, setFormEligibility] = useState('All DYPCET Engineering students.');
  const [formFacultyName, setFormFacultyName] = useState('Dr. Pravin R. Chougule');
  const [formFacultyPhone, setFormFacultyPhone] = useState('+91 94238 65432');
  const [formStudentName, setFormStudentName] = useState('Aarav Patil');
  const [formStudentPhone, setFormStudentPhone] = useState('+91 98234 56789');

  // Outcome Publishing Modal State
  const [showOutcomeModal, setShowOutcomeModal] = useState(false);
  const [outcomeEventId, setOutcomeEventId] = useState<string>('');
  const [outcomeSummary, setOutcomeSummary] = useState('');
  const [winner1Name, setWinner1Name] = useState('');
  const [winner1Project, setWinner1Project] = useState('');
  const [winner1Prize, setWinner1Prize] = useState('');
  const [winner2Name, setWinner2Name] = useState('');
  const [winner2Project, setWinner2Project] = useState('');
  const [winner2Prize, setWinner2Prize] = useState('');
  const [winner3Name, setWinner3Name] = useState('');
  const [feedbackRating, setFeedbackRating] = useState('4.8');

  // Guard: if not admin, show login switch
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Faculty & Department Administrator Access</h2>
        <p className="text-xs text-slate-500">
          You need faculty coordinator or department administrator privileges to access this control room.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => loginAsAdmin(admins[0].id)}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 cursor-pointer"
          >
            Sign in as HOD CSE (Dr. Pravin Chougule)
          </button>
          <button
            onClick={() => loginAsAdmin(admins[1].id)}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 cursor-pointer"
          >
            Sign in as Dean Academics (Prof. Smita Mane)
          </button>
        </div>
      </div>
    );
  }

  const admin = currentUser;

  // Filter registrations
  const filteredRegistrations = registrations.filter(r => {
    const matchesEvent = selectedEventFilter === 'All' || r.eventId === selectedEventFilter;
    const matchesSearch = searchStudent === '' ||
      r.studentName.toLowerCase().includes(searchStudent.toLowerCase()) ||
      r.studentPrn.includes(searchStudent) ||
      r.ticketCode.toLowerCase().includes(searchStudent.toLowerCase());
    return matchesEvent && matchesSearch;
  });

  const handleOpenAddModal = () => {
    setEditingEventId(null);
    setFormTitle('');
    setFormShortDesc('');
    setFormFullDesc('');
    setFormMaxSeats(100);
    setShowEventModal(true);
  };

  const handleOpenEditModal = (evt: EventItem) => {
    setEditingEventId(evt.id);
    setFormTitle(evt.title);
    setFormDept(evt.department);
    setFormCategory(evt.category);
    setFormYear(evt.academicYear);
    setFormStartDate(evt.startDate);
    setFormTime(evt.time);
    setFormVenue(evt.venue);
    setFormMode(evt.mode);
    setFormStatus(evt.status);
    setFormMaxSeats(evt.maxSeats);
    setFormShortDesc(evt.shortDescription);
    setFormFullDesc(evt.fullDescription);
    setFormEligibility(evt.eligibility);
    setFormFacultyName(evt.facultyCoordinator.name);
    setFormFacultyPhone(evt.facultyCoordinator.phone);
    setFormStudentName(evt.studentCoordinator.name);
    setFormStudentPhone(evt.studentCoordinator.phone);
    setShowEventModal(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) {
      showToast('Event title is required', 'error');
      return;
    }

    if (editingEventId) {
      updateEvent(editingEventId, {
        title: formTitle,
        department: formDept,
        category: formCategory,
        academicYear: formYear,
        startDate: formStartDate,
        time: formTime,
        venue: formVenue,
        mode: formMode,
        status: formStatus,
        maxSeats: Number(formMaxSeats),
        shortDescription: formShortDesc,
        fullDescription: formFullDesc,
        eligibility: formEligibility,
        facultyCoordinator: {
          name: formFacultyName,
          designation: 'Associate Professor',
          email: `${formFacultyName.toLowerCase().replace(/\s+/g, '.')}@dypcet.ac.in`,
          phone: formFacultyPhone
        },
        studentCoordinator: {
          name: formStudentName,
          year: 'TE',
          phone: formStudentPhone,
          email: `${formStudentName.toLowerCase().replace(/\s+/g, '.')}@dypcet.ac.in`
        }
      });
    } else {
      addEvent({
        title: formTitle,
        department: formDept,
        category: formCategory,
        academicYear: formYear,
        startDate: formStartDate,
        time: formTime,
        venue: formVenue,
        mode: formMode,
        status: formStatus,
        maxSeats: Number(formMaxSeats),
        registrationDeadline: formStartDate,
        isRegistrationOpen: true,
        registrationFee: 0,
        bannerUrl: '/src/assets/images/hero_campus_dypcet_1790870101738.jpg',
        shortDescription: formShortDesc || 'Department level technical activity at DYPCET.',
        fullDescription: formFullDesc || formShortDesc,
        objectives: [
          'Enhance practical engineering knowledge and hands-on competence.',
          'Demonstrate modern tool usage and collaborative problem solving.',
          'Fulfill PO1, PO3, and PO5 attainment targets.'
        ],
        rules: [
          'All participants must carry college ID card.',
          'Adherence to departmental code of conduct mandatory.'
        ],
        schedule: [
          { time: '10:00 AM - 10:30 AM', activity: 'Inauguration & Registration', venue: formVenue },
          { time: '10:30 AM - 01:00 PM', activity: 'Session 1: Hands-on / Competition' },
          { time: '02:00 PM - 04:00 PM', activity: 'Session 2: Evaluation & Valedictory' }
        ],
        facultyCoordinator: {
          name: formFacultyName,
          designation: 'Faculty Incharge',
          email: `${formFacultyName.toLowerCase().replace(/\s+/g, '.')}@dypcet.ac.in`,
          phone: formFacultyPhone
        },
        studentCoordinator: {
          name: formStudentName,
          year: 'TE',
          phone: formStudentPhone,
          email: `${formStudentName.toLowerCase().replace(/\s+/g, '.')}@dypcet.ac.in`
        },
        eligibility: formEligibility
      });
    }

    setShowEventModal(false);
  };

  const handleOpenPublishOutcome = (evt: EventItem) => {
    setOutcomeEventId(evt.id);
    setOutcomeSummary(evt.outcome?.summary || `The ${evt.title} was conducted successfully with high student participation. Multiple innovative prototypes were presented and judged.`);
    if (evt.outcome?.winners && evt.outcome.winners.length > 0) {
      setWinner1Name(evt.outcome.winners[0]?.teamOrStudentName || '');
      setWinner1Project(evt.outcome.winners[0]?.projectName || '');
      setWinner1Prize(evt.outcome.winners[0]?.prizeAmount || '');
    } else {
      setWinner1Name('');
      setWinner1Project('');
      setWinner1Prize('');
    }
    setShowOutcomeModal(true);
  };

  const handleSaveOutcome = (e: React.FormEvent) => {
    e.preventDefault();
    if (!outcomeEventId) return;

    const eventRegs = registrations.filter(r => r.eventId === outcomeEventId);
    const attendedCount = eventRegs.filter(r => r.attendanceStatus === 'Attended').length || eventRegs.length;

    const winnersList: Winner[] = [];
    if (winner1Name.trim()) {
      winnersList.push({
        position: '1st Place (Winner)',
        teamOrStudentName: winner1Name.trim(),
        prnOrCollege: 'DYPCET Kolhapur',
        projectName: winner1Project.trim() || undefined,
        prizeAmount: winner1Prize.trim() || '₹10,000 + Certificate'
      });
    }
    if (winner2Name.trim()) {
      winnersList.push({
        position: '2nd Place (1st Runner Up)',
        teamOrStudentName: winner2Name.trim(),
        prnOrCollege: 'DYPCET Kolhapur',
        projectName: winner2Project.trim() || undefined,
        prizeAmount: winner2Prize.trim() || '₹5,000 + Certificate'
      });
    }

    const outcomeData: EventOutcome = {
      publishedDate: new Date().toISOString().split('T')[0],
      summary: outcomeSummary.trim(),
      totalParticipants: eventRegs.length || 50,
      totalAttendees: attendedCount,
      nbaPoAttainment: [
        'PO1: Engineering Knowledge - 88% Attainment',
        'PO3: Design/Development of Solutions - 91% Attainment',
        'PO5: Modern Tool Usage - 95% Attainment',
        'PO10: Technical Communication - 92% Attainment'
      ],
      winners: winnersList,
      keyOutcomes: [
        '100% of participants achieved intended outcome rubrics.',
        'Official documentation prepared for NAAC Criterion 5 and NBA Criterion 8.'
      ],
      feedbackScore: parseFloat(feedbackRating) || 4.8
    };

    publishOutcome(outcomeEventId, outcomeData);
    setShowOutcomeModal(false);
  };

  const handleExportAllRegistrationsCSV = () => {
    const headers = ['Sr', 'Ticket Code', 'Event Title', 'Department', 'Student Name', 'PRN', 'Year', 'Attendance', 'Cert ID'];
    const rows = filteredRegistrations.map((r, i) => [
      i + 1,
      r.ticketCode,
      `"${r.eventTitle}"`,
      `"${r.department}"`,
      `"${r.studentName}"`,
      r.studentPrn,
      r.studentYear,
      r.attendanceStatus,
      r.certificateId || 'N/A'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `DYPCET_EventMate_Master_Registrations_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported master registration records to CSV', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top Admin Persona Strip */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider">
                Department Event Admin Console
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 border border-slate-700 px-2 py-0.5 rounded">
                Verified Faculty ID: {admin.facultyId}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              {admin.name}
            </h1>
            <p className="text-xs text-slate-300 mt-0.5">
              {admin.designation} · {admin.department}
            </p>
          </div>
        </div>

        {/* Action button in header */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-md transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Event</span>
          </button>
          <button
            onClick={resetToDemoData}
            className="p-2.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border border-slate-800"
            title="Reset to Fresh College Demo Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Total Managed Events</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1 tabular-nums">
            {events.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {events.filter(e => e.status === 'Upcoming').length} Upcoming · {events.filter(e => e.status === 'Outcomes Published').length} Archived
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Student Registrations</div>
          <div className="text-2xl font-extrabold text-blue-700 mt-1 tabular-nums">
            {registrations.length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">Live database records</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Verified Attendees</div>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1 tabular-nums">
            {registrations.filter(r => r.attendanceStatus === 'Attended').length}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">QR scan verified on campus</div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-xs text-slate-500 font-medium">Accreditation Readiness</div>
          <div className="text-2xl font-extrabold text-indigo-700 mt-1 tabular-nums">
            100%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">NBA & NAAC Criteria 5 synced</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center gap-6 text-xs font-semibold overflow-x-auto">
        <button
          onClick={() => setActiveTab('events')}
          className={`py-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'events'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Event Management ({events.length})
        </button>
        <button
          onClick={() => setActiveTab('attendance')}
          className={`py-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'attendance'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Attendance Manager & QR Desk
        </button>
        <button
          onClick={() => setActiveTab('registrations')}
          className={`py-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'registrations'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Student Registrations Roster ({registrations.length})
        </button>
        <button
          onClick={() => setActiveTab('publish-outcomes')}
          className={`py-3 border-b-2 cursor-pointer transition-colors ${
            activeTab === 'publish-outcomes'
              ? 'border-blue-600 text-blue-700 font-bold'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Publish Outcomes & Winners
        </button>
      </div>

      {/* TAB 1: EVENT MANAGEMENT (CRUD) */}
      {activeTab === 'events' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Department Events Directory
            </h3>
            <button
              onClick={handleOpenAddModal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Event</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {events.map((evt) => {
              const regCount = registrations.filter(r => r.eventId === evt.id).length;
              return (
                <div key={evt.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    {/* Unboxed metadata */}
                    <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 font-medium">
                      <span className="font-semibold text-blue-700">{evt.department}</span>
                      <span>·</span>
                      <span>AY {evt.academicYear}</span>
                      <span>·</span>
                      <span>{evt.category}</span>
                      <span>·</span>
                      <span>{evt.startDate}</span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-base">
                      {evt.title}
                    </h4>

                    <div className="text-xs text-slate-500 flex items-center gap-4">
                      <span>Venue: {evt.venue}</span>
                      <span>·</span>
                      <span>Mode: {evt.mode}</span>
                      <span>·</span>
                      <span className="font-semibold text-slate-800 tabular-nums">
                        {regCount} / {evt.maxSeats} Registered
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                      evt.status === 'Outcomes Published'
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : evt.status === 'Upcoming'
                        ? 'bg-blue-50 text-blue-800 border border-blue-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {evt.status}
                    </span>

                    <button
                      onClick={() => setSelectedNaacReportEvent(evt)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors"
                      title="NAAC Report"
                    >
                      <FileText className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleOpenPublishOutcome(evt)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg border border-amber-200 transition-colors"
                      title="Publish Results / Outcome"
                    >
                      <Trophy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(evt)}
                      className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit Event"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${evt.title}"?`)) {
                          deleteEvent(evt.id);
                        }
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Event"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ATTENDANCE MANAGER */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          {/* Event selector bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex-1 max-w-md">
              <label className="text-xs font-semibold text-slate-600 block mb-1">
                Select Event for Attendance Register
              </label>
              <select
                value={selectedEventFilter}
                onChange={(e) => setSelectedEventFilter(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500 font-semibold"
              >
                <option value="All">All Events (Consolidated)</option>
                {events.map(e => (
                  <option key={e.id} value={e.id}>{e.title} ({e.startDate})</option>
                ))}
              </select>
            </div>

            {selectedEventFilter !== 'All' && (
              <div className="flex items-center gap-2 pt-2 sm:pt-4">
                <button
                  onClick={() => bulkMarkAttendance(selectedEventFilter, 'Attended')}
                  className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => bulkMarkAttendance(selectedEventFilter, 'Absent')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 cursor-pointer"
                >
                  Reset All to Absent
                </button>
              </div>
            )}
          </div>

          {/* Attendance Table */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Student Attendance Records ({filteredRegistrations.length})
              </div>
              <div className="text-xs text-slate-500 tabular-nums">
                Attended: <strong className="text-emerald-700">{filteredRegistrations.filter(r => r.attendanceStatus === 'Attended').length}</strong> | 
                Absent: <strong className="text-rose-700">{filteredRegistrations.filter(r => r.attendanceStatus === 'Absent').length}</strong>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="p-3 w-12">#</th>
                    <th className="p-3">Ticket / Pass Code</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">PRN</th>
                    <th className="p-3">Event Title</th>
                    <th className="p-3">Attendance Status</th>
                    <th className="p-3 text-right">Quick Toggle</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRegistrations.map((reg, index) => (
                    <tr key={reg.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-3 text-slate-400 font-mono">{index + 1}</td>
                      <td className="p-3 font-mono font-bold text-blue-700">{reg.ticketCode}</td>
                      <td className="p-3 font-medium text-slate-900">{reg.studentName}</td>
                      <td className="p-3 font-mono text-slate-600">{reg.studentPrn}</td>
                      <td className="p-3 text-slate-700 truncate max-w-xs">{reg.eventTitle}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          reg.attendanceStatus === 'Attended'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : reg.attendanceStatus === 'Absent'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {reg.attendanceStatus}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => markAttendance(reg.id, 'Attended')}
                            className={`p-1.5 rounded transition-colors ${
                              reg.attendanceStatus === 'Attended'
                                ? 'bg-emerald-600 text-white'
                                : 'text-slate-400 hover:text-emerald-600 hover:bg-emerald-50'
                            }`}
                            title="Mark Present / Attended"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => markAttendance(reg.id, 'Absent')}
                            className={`p-1.5 rounded transition-colors ${
                              reg.attendanceStatus === 'Absent'
                                ? 'bg-rose-600 text-white'
                                : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                            }`}
                            title="Mark Absent"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: STUDENT REGISTRATIONS ROSTER */}
      {activeTab === 'registrations' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchStudent}
                onChange={(e) => setSearchStudent(e.target.value)}
                placeholder="Search student by name, PRN, or pass code..."
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleExportAllRegistrationsCSV}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              <Download className="w-4 h-4" />
              <span>Export Roster CSV</span>
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="p-3">Pass ID</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">PRN</th>
                    <th className="p-3">Dept & Class</th>
                    <th className="p-3">Event</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Certificate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-blue-700">{reg.ticketCode}</td>
                      <td className="p-3 font-semibold text-slate-900">{reg.studentName}</td>
                      <td className="p-3 font-mono text-slate-600">{reg.studentPrn}</td>
                      <td className="p-3 text-slate-600">{reg.studentDept} ({reg.studentYear})</td>
                      <td className="p-3 text-slate-800 font-medium truncate max-w-xs">{reg.eventTitle}</td>
                      <td className="p-3 text-slate-500">
                        {reg.isTeamRegistration ? `Team (${reg.teamName})` : 'Individual'}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          reg.attendanceStatus === 'Attended'
                            ? 'bg-emerald-50 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {reg.attendanceStatus}
                        </span>
                      </td>
                      <td className="p-3">
                        {reg.certificateIssued ? (
                          <button
                            onClick={() => setSelectedCertificate(reg)}
                            className="text-blue-600 hover:underline font-mono text-[11px]"
                          >
                            {reg.certificateId || 'View Cert'}
                          </button>
                        ) : (
                          <span className="text-slate-400">Pending</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PUBLISH OUTCOMES & WINNERS */}
      {activeTab === 'publish-outcomes' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 bg-slate-50">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Event Outcomes & Result Publishing Center
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select an event to publish final results, winner teams, feedback score, and NBA PO attainment.
            </p>
          </div>

          <div className="divide-y divide-slate-100">
            {events.map((evt) => (
              <div key={evt.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                    <span className="font-semibold text-blue-700">{evt.department}</span>
                    <span>·</span>
                    <span>{evt.startDate}</span>
                    <span>·</span>
                    <span className="font-medium text-slate-700">{evt.status}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-base mt-1">
                    {evt.title}
                  </h4>
                  <div className="text-xs text-slate-500 mt-1">
                    {evt.outcome ? (
                      <span className="text-emerald-700 font-semibold">
                        ✓ Outcomes published on {evt.outcome.publishedDate} ({evt.outcome.winners?.length || 0} winners recorded)
                      </span>
                    ) : (
                      <span className="text-amber-700 font-medium">
                        Outcome publication pending
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleOpenPublishOutcome(evt)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{evt.outcome ? 'Edit Outcomes' : 'Publish Outcomes'}</span>
                  </button>
                  <button
                    onClick={() => setSelectedNaacReportEvent(evt)}
                    className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    NAAC Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT EVENT */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
            
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
              <h3 className="text-base font-bold text-white">
                {editingEventId ? 'Edit Event Information' : 'Add New Department Event'}
              </h3>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="p-6 space-y-4 overflow-y-auto text-xs">
              
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. National Level 24-Hour Hackathon"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Department *
                  </label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value as Department)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Event Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as EventCategory)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Academic Year
                  </label>
                  <select
                    value={formYear}
                    onChange={(e) => setFormYear(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    {ACADEMIC_YEARS.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={formStartDate}
                    onChange={(e) => setFormStartDate(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Max Seat Capacity *
                  </label>
                  <input
                    type="number"
                    value={formMaxSeats}
                    onChange={(e) => setFormMaxSeats(Number(e.target.value))}
                    min={10}
                    max={500}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Time Duration
                  </label>
                  <input
                    type="text"
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder="e.g. 10:00 AM - 04:00 PM"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Campus Venue *
                  </label>
                  <input
                    type="text"
                    value={formVenue}
                    onChange={(e) => setFormVenue(e.target.value)}
                    placeholder="e.g. CSE Seminar Hall 1"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Mode
                  </label>
                  <select
                    value={formMode}
                    onChange={(e) => setFormMode(e.target.value as EventMode)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Offline (Campus)">Offline (Campus)</option>
                    <option value="Online">Online</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Status
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as EventStatus)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white"
                  >
                    <option value="Upcoming">Upcoming</option>
                    <option value="Completed">Completed</option>
                    <option value="Outcomes Published">Outcomes Published</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Short Summary
                </label>
                <textarea
                  rows={2}
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="Brief overview of the activity for event cards..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Faculty Coordinator Name & Phone
                  </label>
                  <input
                    type="text"
                    value={formFacultyName}
                    onChange={(e) => setFormFacultyName(e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 mb-1"
                  />
                  <input
                    type="text"
                    value={formFacultyPhone}
                    onChange={(e) => setFormFacultyPhone(e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">
                    Student Coordinator Name & Phone
                  </label>
                  <input
                    type="text"
                    value={formStudentName}
                    onChange={(e) => setFormStudentName(e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300 mb-1"
                  />
                  <input
                    type="text"
                    value={formStudentPhone}
                    onChange={(e) => setFormStudentPhone(e.target.value)}
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  {editingEventId ? 'Save Changes' : 'Create & Publish Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: PUBLISH OUTCOMES & WINNERS */}
      {showOutcomeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Publish Event Results & Outcomes
                </h3>
              </div>
              <button
                onClick={() => setShowOutcomeModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOutcome} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Executive Outcome Summary (For NAAC Criteria 5) *
                </label>
                <textarea
                  rows={3}
                  value={outcomeSummary}
                  onChange={(e) => setOutcomeSummary(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                  required
                />
              </div>

              {/* 1st Place */}
              <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-lg space-y-2">
                <div className="font-bold text-amber-900">1st Place Winner</div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={winner1Name}
                    onChange={(e) => setWinner1Name(e.target.value)}
                    placeholder="Student / Team Name"
                    className="text-xs p-2 bg-white rounded border border-amber-300"
                  />
                  <input
                    type="text"
                    value={winner1Prize}
                    onChange={(e) => setWinner1Prize(e.target.value)}
                    placeholder="Prize (e.g. ₹10,000 + Trophy)"
                    className="text-xs p-2 bg-white rounded border border-amber-300"
                  />
                </div>
                <input
                  type="text"
                  value={winner1Project}
                  onChange={(e) => setWinner1Project(e.target.value)}
                  placeholder="Winning Project Title"
                  className="w-full text-xs p-2 bg-white rounded border border-amber-300"
                />
              </div>

              {/* 2nd Place */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-2">
                <div className="font-bold text-slate-800">2nd Place (Runner Up)</div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={winner2Name}
                    onChange={(e) => setWinner2Name(e.target.value)}
                    placeholder="Student / Team Name"
                    className="text-xs p-2 bg-white rounded border border-slate-300"
                  />
                  <input
                    type="text"
                    value={winner2Prize}
                    onChange={(e) => setWinner2Prize(e.target.value)}
                    placeholder="Prize (e.g. ₹5,000)"
                    className="text-xs p-2 bg-white rounded border border-slate-300"
                  />
                </div>
                <input
                  type="text"
                  value={winner2Project}
                  onChange={(e) => setWinner2Project(e.target.value)}
                  placeholder="Project Title"
                  className="w-full text-xs p-2 bg-white rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Participant Feedback Rating (out of 5.0)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="5"
                  value={feedbackRating}
                  onChange={(e) => setFeedbackRating(e.target.value)}
                  className="w-32 text-xs p-2 rounded border border-slate-300"
                />
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowOutcomeModal(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-sm cursor-pointer"
                >
                  Publish Outcome
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

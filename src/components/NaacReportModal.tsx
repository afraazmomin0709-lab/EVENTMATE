import React from 'react';
import { useApp } from '../context/AppContext';
import { COLLEGE_INFO } from '../data/mockData';
import { X, Printer, FileText, CheckCircle2, Download } from 'lucide-react';

export const NaacReportModal: React.FC = () => {
  const { selectedNaacReportEvent, setSelectedNaacReportEvent, registrations } = useApp();

  if (!selectedNaacReportEvent) return null;

  const event = selectedNaacReportEvent;
  const outcome = event.outcome;
  const eventRegistrations = registrations.filter(r => r.eventId === event.id);
  const attendedCount = eventRegistrations.filter(r => r.attendanceStatus === 'Attended').length || outcome?.totalAttendees || event.registeredCount;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = ['Sr. No.', 'Student Name', 'PRN', 'Department', 'Year', 'Ticket Code', 'Attendance Status', 'Certificate ID'];
    const rows = eventRegistrations.map((r, i) => [
      i + 1,
      `"${r.studentName}"`,
      r.studentPrn,
      `"${r.studentDept}"`,
      r.studentYear,
      r.ticketCode,
      r.attendanceStatus,
      r.certificateId || 'N/A'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EventMate_Attendance_${event.id}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-4xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Controls Header (Hidden in print) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              NBA / NAAC Accreditation Compliance Report
            </span>
            <h3 className="text-base font-bold text-white line-clamp-1 mt-0.5">
              Department Event Activity Report ({event.academicYear})
            </h3>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Attendee CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Report</span>
            </button>
            <button
              onClick={() => setSelectedNaacReportEvent(null)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Formal Institutional Document Surface */}
        <div className="p-8 sm:p-12 overflow-y-auto bg-white text-slate-900 font-sans print:p-6 print:overflow-visible">
          
          {/* Institutional Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 mb-6 text-center">
            <div className="text-xs uppercase tracking-widest font-semibold text-slate-600">
              D. Y. PATIL PRATISHTHAN'S
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-blue-950 uppercase tracking-tight">
              {COLLEGE_INFO.name}
            </h1>
            <p className="text-xs text-slate-600">
              {COLLEGE_INFO.location}
            </p>
            <p className="text-[11px] text-slate-500 font-medium italic mt-0.5">
              {COLLEGE_INFO.accreditation}
            </p>
            <div className="mt-3 py-1 px-4 bg-slate-100 rounded inline-block text-xs font-bold text-slate-800 uppercase tracking-wider">
              DEPARTMENT OF {event.department}
            </div>
          </div>

          {/* Document Title */}
          <div className="text-center mb-6">
            <h2 className="text-lg font-bold text-slate-900 uppercase underline decoration-2 underline-offset-4">
              POST-ACTIVITY EVENT REPORT (ACADEMIC AUDIT RECORD)
            </h2>
            <div className="text-xs text-slate-500 mt-1">
              Reference: DYPCET / {event.department.substring(0, 3).toUpperCase()} / EVT / {event.academicYear} / {event.id}
            </div>
          </div>

          {/* Section 1: Executive Summary Table */}
          <div className="space-y-6 text-xs text-slate-800">
            <div>
              <h3 className="font-bold text-sm uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                1. Activity General Information
              </h3>
              <table className="w-full border-collapse border border-slate-300 text-left">
                <tbody>
                  <tr className="border-b border-slate-300">
                    <th className="p-2.5 bg-slate-50 font-semibold w-1/3 border-r border-slate-300">Title of the Event</th>
                    <td className="p-2.5 font-bold text-slate-900">{event.title}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <th className="p-2.5 bg-slate-50 font-semibold border-r border-slate-300">Organizing Department</th>
                    <td className="p-2.5">{event.department}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <th className="p-2.5 bg-slate-50 font-semibold border-r border-slate-300">Category of Activity</th>
                    <td className="p-2.5">{event.category} ({event.mode})</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <th className="p-2.5 bg-slate-50 font-semibold border-r border-slate-300">Academic Year & Date</th>
                    <td className="p-2.5">AY {event.academicYear} | {event.startDate} {event.endDate ? `to ${event.endDate}` : ''} ({event.time})</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <th className="p-2.5 bg-slate-50 font-semibold border-r border-slate-300">Venue</th>
                    <td className="p-2.5">{event.venue}</td>
                  </tr>
                  <tr className="border-b border-slate-300">
                    <th className="p-2.5 bg-slate-50 font-semibold border-r border-slate-300">Faculty Coordinator</th>
                    <td className="p-2.5">{event.facultyCoordinator.name}, {event.facultyCoordinator.designation} ({event.facultyCoordinator.phone})</td>
                  </tr>
                  <tr>
                    <th className="p-2.5 bg-slate-50 font-semibold border-r border-slate-300">Student Coordinator</th>
                    <td className="p-2.5">{event.studentCoordinator.name} ({event.studentCoordinator.year})</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Section 2: Attendance Metrics */}
            <div>
              <h3 className="font-bold text-sm uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                2. Participation & Attendance Metrics
              </h3>
              <div className="grid grid-cols-4 border border-slate-300 divide-x divide-slate-300 text-center">
                <div className="p-3 bg-slate-50">
                  <div className="text-slate-500">Max Capacity</div>
                  <div className="text-base font-bold text-slate-900 tabular-nums">{event.maxSeats}</div>
                </div>
                <div className="p-3 bg-slate-50">
                  <div className="text-slate-500">Registered Count</div>
                  <div className="text-base font-bold text-blue-700 tabular-nums">{event.registeredCount}</div>
                </div>
                <div className="p-3 bg-slate-50">
                  <div className="text-slate-500">Actual Attended</div>
                  <div className="text-base font-bold text-emerald-700 tabular-nums">{attendedCount}</div>
                </div>
                <div className="p-3 bg-slate-50">
                  <div className="text-slate-500">Attendance Ratio</div>
                  <div className="text-base font-bold text-slate-900 tabular-nums">
                    {Math.round((attendedCount / (event.registeredCount || 1)) * 100)}%
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Objectives & Outcomes */}
            <div>
              <h3 className="font-bold text-sm uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                3. Event Objectives & Outcomes
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Objectives Defined:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-slate-700">
                    {event.objectives.map((obj, i) => (
                      <li key={i}>{obj}</li>
                    ))}
                  </ul>
                </div>

                {outcome && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-1">Executive Summary:</h4>
                    <p className="p-3 bg-slate-50 rounded border border-slate-200 text-slate-700 leading-relaxed">
                      {outcome.summary}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Section 4: NBA PO / PSO Attainment */}
            {outcome?.nbaPoAttainment && (
              <div>
                <h3 className="font-bold text-sm uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  4. Program Outcomes (POs) & PSOs Attainment Matrix
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {outcome.nbaPoAttainment.map((po, i) => (
                    <div key={i} className="p-2 border border-slate-200 bg-slate-50 rounded flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{po}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section 5: Winners */}
            {outcome?.winners && outcome.winners.length > 0 && (
              <div>
                <h3 className="font-bold text-sm uppercase text-slate-900 border-b border-slate-300 pb-1 mb-2">
                  5. Winners & Achievements
                </h3>
                <table className="w-full border-collapse border border-slate-300 text-left">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300">
                      <th className="p-2 border-r border-slate-300 w-1/4">Position</th>
                      <th className="p-2 border-r border-slate-300">Team / Participant</th>
                      <th className="p-2 border-r border-slate-300">Project / Details</th>
                      <th className="p-2">Prize Awarded</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outcome.winners.map((w, idx) => (
                      <tr key={idx} className="border-b border-slate-300">
                        <td className="p-2 border-r border-slate-300 font-bold">{w.position}</td>
                        <td className="p-2 border-r border-slate-300 font-medium">{w.teamOrStudentName}</td>
                        <td className="p-2 border-r border-slate-300 text-slate-600">{w.projectName || 'N/A'}</td>
                        <td className="p-2 font-mono">{w.prizeAmount || 'Certificate'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Signoff Section */}
            <div className="pt-10 grid grid-cols-3 gap-6 text-center mt-12 print-break-inside-avoid">
              <div>
                <div className="h-12 flex items-end justify-center font-serif italic text-slate-800">
                  {event.facultyCoordinator.name}
                </div>
                <div className="border-t border-slate-400 pt-1 font-semibold text-slate-900">
                  Faculty Event Incharge
                </div>
                <div className="text-[10px] text-slate-500">Dept of {event.department}</div>
              </div>

              <div>
                <div className="h-12 flex items-end justify-center font-serif italic text-slate-800">
                  Head of Department
                </div>
                <div className="border-t border-slate-400 pt-1 font-semibold text-slate-900">
                  Head of Department (HOD)
                </div>
                <div className="text-[10px] text-slate-500">Dept of {event.department}</div>
              </div>

              <div>
                <div className="h-12 flex items-end justify-center font-serif italic text-slate-800">
                  {COLLEGE_INFO.principal}
                </div>
                <div className="border-t border-slate-400 pt-1 font-semibold text-slate-900">
                  Principal / Dean Academics
                </div>
                <div className="text-[10px] text-slate-500">{COLLEGE_INFO.name}</div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 text-center pt-6 border-t border-slate-100">
              Generated automatically by EventMate Centralized Departmental System · Permanent Academic Archive
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

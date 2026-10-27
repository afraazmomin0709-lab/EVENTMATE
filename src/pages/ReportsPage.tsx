import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS, ACADEMIC_YEARS, COLLEGE_INFO } from '../data/mockData';
import { 
  FileText, 
  Download, 
  Printer, 
  Award, 
  BarChart3, 
  CheckCircle2, 
  Calendar, 
  Filter,
  School,
  Database
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { events, registrations, setSelectedNaacReportEvent, setShowPhpMysqlModal } = useApp();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  const filteredEvents = events.filter(e => {
    const matchesDept = selectedDept === 'All' || e.department === selectedDept;
    const matchesYear = selectedYear === 'All' || e.academicYear === selectedYear;
    return matchesDept && matchesYear;
  });

  const totalAttendees = registrations.filter(r => r.attendanceStatus === 'Attended').length;
  const totalRegistrations = registrations.length;

  const handleExportAnnualSummaryCSV = () => {
    const headers = [
      'Event ID',
      'Event Title',
      'Department',
      'Academic Year',
      'Category',
      'Date',
      'Capacity',
      'Registered',
      'Status',
      'Outcome Published'
    ];

    const rows = filteredEvents.map(e => [
      e.id,
      `"${e.title}"`,
      `"${e.department}"`,
      e.academicYear,
      e.category,
      e.startDate,
      e.maxSeats,
      e.registeredCount,
      e.status,
      e.outcome ? 'Yes' : 'No'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.href = encodeURI(csvContent);
    link.download = `DYPCET_Annual_Department_Events_Report_${selectedYear}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
            Accreditation & Documentation Cell
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Departmental Event Reports & Analytics
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Standardized institutional audit sheets, NAAC Criterion 5.3 documentation, and NBA Criterion 8 event summaries for D Y Patil College of Engineering and Technology.
          </p>
        </div>

        <div className="no-print flex items-center gap-2">
          <button
            onClick={handleExportAnnualSummaryCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV Sheet</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Annual Summary</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="no-print bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1">
            Filter by Department
          </label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white"
          >
            <option value="All">All Engineering Departments</option>
            {DEPARTMENTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-slate-600 block mb-1">
            Academic Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white"
          >
            <option value="All">All Academic Years</option>
            {ACADEMIC_YEARS.map(y => (
              <option key={y} value={y}>AY {y}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Institutional Document Surface (Printable) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none">
        
        {/* Header for official print */}
        <div className="border-b-2 border-slate-900 pb-4 text-center">
          <div className="text-xs uppercase font-semibold text-slate-600">
            D. Y. PATIL PRATISHTHAN'S
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-blue-950 uppercase">
            {COLLEGE_INFO.name}
          </h2>
          <p className="text-xs text-slate-600">{COLLEGE_INFO.location}</p>
          <p className="text-[11px] text-slate-500 italic mt-0.5">{COLLEGE_INFO.accreditation}</p>
          <div className="mt-3 inline-block bg-slate-100 px-4 py-1 rounded text-xs font-bold text-slate-800 uppercase tracking-wider">
            ANNUAL DEPARTMENTAL EVENT CONDUCT & PARTICIPATION REGISTER
          </div>
        </div>

        {/* Executive Summary Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center border border-slate-200 divide-x divide-slate-200 p-4 bg-slate-50 rounded-xl">
          <div>
            <div className="text-xs text-slate-500">Events Recorded</div>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">{filteredEvents.length}</div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Total Registered</div>
            <div className="text-2xl font-bold text-blue-700 tabular-nums">
              {filteredEvents.reduce((acc, e) => acc + e.registeredCount, 0)}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Completed with Outcomes</div>
            <div className="text-2xl font-bold text-emerald-700 tabular-nums">
              {filteredEvents.filter(e => e.outcome).length}
            </div>
          </div>
          <div>
            <div className="text-xs text-slate-500">Average Capacity Ratio</div>
            <div className="text-2xl font-bold text-indigo-700 tabular-nums">
              87.4%
            </div>
          </div>
        </div>

        {/* Master Table of Department Events */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse border border-slate-300 text-xs">
            <thead>
              <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                <th className="p-2.5 border-r border-slate-300">Sr.</th>
                <th className="p-2.5 border-r border-slate-300">Event Title</th>
                <th className="p-2.5 border-r border-slate-300">Department</th>
                <th className="p-2.5 border-r border-slate-300">Date</th>
                <th className="p-2.5 border-r border-slate-300">Category</th>
                <th className="p-2.5 border-r border-slate-300 text-center">Registrations</th>
                <th className="p-2.5 border-r border-slate-300 text-center">Status</th>
                <th className="p-2.5 text-center no-print">Official Report</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredEvents.map((evt, idx) => (
                <tr key={evt.id} className="hover:bg-slate-50">
                  <td className="p-2.5 border-r border-slate-300 font-mono text-center">{idx + 1}</td>
                  <td className="p-2.5 border-r border-slate-300 font-semibold text-slate-900">
                    {evt.title}
                  </td>
                  <td className="p-2.5 border-r border-slate-300 text-slate-700">
                    {evt.department.replace('Engineering', 'Engg')}
                  </td>
                  <td className="p-2.5 border-r border-slate-300 font-mono">
                    {evt.startDate}
                  </td>
                  <td className="p-2.5 border-r border-slate-300">
                    {evt.category}
                  </td>
                  <td className="p-2.5 border-r border-slate-300 text-center font-mono font-medium">
                    {evt.registeredCount} / {evt.maxSeats}
                  </td>
                  <td className="p-2.5 border-r border-slate-300 text-center">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      evt.status === 'Outcomes Published'
                        ? 'bg-emerald-50 text-emerald-800'
                        : 'bg-blue-50 text-blue-800'
                    }`}>
                      {evt.status}
                    </span>
                  </td>
                  <td className="p-2.5 text-center no-print">
                    <button
                      onClick={() => setSelectedNaacReportEvent(evt)}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-xs cursor-pointer hover:underline"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Institutional Signoff Section for printed report */}
        <div className="pt-12 grid grid-cols-3 gap-6 text-center text-xs print-break-inside-avoid">
          <div>
            <div className="h-12 flex items-end justify-center font-serif italic text-slate-800">
              Academic Event Convener
            </div>
            <div className="border-t border-slate-400 pt-1 font-semibold text-slate-900">
              Department Event Convener
            </div>
          </div>

          <div>
            <div className="h-12 flex items-end justify-center font-serif italic text-slate-800">
              Head of Department
            </div>
            <div className="border-t border-slate-400 pt-1 font-semibold text-slate-900">
              Head of Department (HOD)
            </div>
          </div>

          <div>
            <div className="h-12 flex items-end justify-center font-serif italic text-slate-800">
              {COLLEGE_INFO.principal}
            </div>
            <div className="border-t border-slate-400 pt-1 font-semibold text-slate-900">
              Principal / Dean Academics
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

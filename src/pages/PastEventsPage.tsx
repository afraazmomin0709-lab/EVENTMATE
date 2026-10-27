import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS, ACADEMIC_YEARS } from '../data/mockData';
import { 
  Award, 
  Trophy, 
  Calendar, 
  FileText, 
  CheckCircle, 
  Users, 
  Search, 
  Filter,
  ArrowRight
} from 'lucide-react';

export const PastEventsPage: React.FC = () => {
  const { events, setSelectedOutcomeEvent, setSelectedNaacReportEvent } = useApp();
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const pastEvents = events.filter(e => e.status === 'Completed' || e.status === 'Outcomes Published');

  const filteredPast = pastEvents.filter(e => {
    const matchesYear = selectedYear === 'All' || e.academicYear === selectedYear;
    const matchesDept = selectedDept === 'All' || e.department === selectedDept;
    const matchesSearch = searchQuery === '' || 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesYear && matchesDept && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <div className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          Permanent College Archive
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Past Events & Published Outcomes
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Institutional documentation of completed department activities, competition results, winner recognitions, and NAAC/NBA Criteria 5 audit reports.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">
              Academic Year Archive
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Academic Years</option>
              {ACADEMIC_YEARS.map(y => (
                <option key={y} value={y}>AY {y}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">
              Department
            </label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Departments</option>
              {DEPARTMENTS.map(d => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">
              Search Archive
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search event name or outcomes..."
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Events List */}
      {filteredPast.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No archived events match your filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the academic year or department filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPast.map((event) => {
            const outcome = event.outcome;
            return (
              <div 
                key={event.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:border-slate-300 transition-all flex flex-col lg:flex-row justify-between gap-6"
              >
                {/* Left side: Main Event Details */}
                <div className="space-y-3 flex-1">
                  {/* Unboxed metadata */}
                  <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 font-medium">
                    <span className="text-blue-700 font-semibold">{event.department}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>AY {event.academicYear}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>{event.category}</span>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <span>Date: {event.startDate}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {event.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
                    {outcome?.summary || event.shortDescription}
                  </p>

                  {/* Winner Pill / Summary if available */}
                  {outcome?.winners && outcome.winners.length > 0 && (
                    <div className="flex items-center flex-wrap gap-3 pt-1 text-xs">
                      <div className="font-semibold text-amber-900 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded flex items-center gap-1.5">
                        <Trophy className="w-3.5 h-3.5 text-amber-600" />
                        <span>Winner: {outcome.winners[0].teamOrStudentName}</span>
                      </div>
                      {outcome.winners[0].projectName && (
                        <span className="text-slate-500 italic">
                          "{outcome.winners[0].projectName}"
                        </span>
                      )}
                    </div>
                  )}

                  {/* PO Attainment tags */}
                  {outcome?.nbaPoAttainment && (
                    <div className="flex items-center flex-wrap gap-2 pt-1 text-xs text-slate-500">
                      <span className="font-medium text-slate-700">NBA POs Attained:</span>
                      {outcome.nbaPoAttainment.slice(0, 3).map((po, i) => (
                        <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                          {po.split(' - ')[0]}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right side: Stats & Action Buttons */}
                <div className="lg:w-64 shrink-0 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-100 pt-4 lg:pt-0 lg:pl-6 space-y-4">
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-slate-500">Attendees</div>
                      <div className="text-base font-bold text-slate-900 tabular-nums">
                        {outcome?.totalAttendees || event.registeredCount} Students
                      </div>
                    </div>
                    {outcome?.feedbackScore && (
                      <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <div className="text-slate-500">Feedback Score</div>
                        <div className="text-base font-bold text-amber-600 tabular-nums">
                          ★ {outcome.feedbackScore} / 5.0
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedOutcomeEvent(event)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-600" />
                      <span>View Outcome & Winners</span>
                    </button>

                    <button
                      onClick={() => setSelectedNaacReportEvent(event)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-blue-600" />
                      <span>Official NAAC Report</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

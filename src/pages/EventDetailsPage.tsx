import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  Award, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Share2,
  AlertCircle
} from 'lucide-react';

export const EventDetailsPage: React.FC = () => {
  const { 
    events, 
    selectedEventId, 
    navigateTo, 
    setEventToRegister, 
    setSelectedOutcomeEvent, 
    setSelectedNaacReportEvent,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'schedule' | 'rules' | 'coordinators'>('overview');

  const event = events.find(e => e.id === selectedEventId) || events[0];

  const isCompleted = event.status === 'Completed' || event.status === 'Outcomes Published';
  const seatsPercentage = Math.round((event.registeredCount / event.maxSeats) * 100);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Event link copied to clipboard!', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Top back navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigateTo('upcoming')}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Events Directory</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Event</span>
        </button>
      </div>

      {/* Main Banner & Header Container */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Banner Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img 
            src={event.bannerUrl} 
            alt={event.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          {/* Floating Department Tag on top of scrim */}
          <div className="absolute top-4 left-4 text-xs font-semibold text-white bg-blue-600/90 backdrop-blur-sm px-3 py-1 rounded-md">
            {event.department}
          </div>

          {/* Title on bottom of banner */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <span>{event.category}</span>
              <span>·</span>
              <span>AY {event.academicYear}</span>
              <span>·</span>
              <span>{event.mode}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {event.title}
            </h1>
          </div>
        </div>

        {/* Action & Info Strip */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-600 flex-1">
            <div>
              <div className="text-slate-400 font-medium">Date & Day</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{event.startDate}</div>
              <div className="text-slate-500">{event.endDate ? `to ${event.endDate}` : 'Single Day'}</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">Time Slot</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">{event.time}</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">Campus Venue</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5 truncate">{event.venue}</div>
            </div>

            <div>
              <div className="text-slate-400 font-medium">Seats Capacity</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5 tabular-nums">
                {event.registeredCount} / {event.maxSeats}
              </div>
              <div className="text-slate-500">{event.maxSeats - event.registeredCount} available</div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="shrink-0 flex items-center gap-3">
            {isCompleted ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedOutcomeEvent(event)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-sm transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4" />
                  <span>View Outcomes & Winners</span>
                </button>
                <button
                  onClick={() => setSelectedNaacReportEvent(event)}
                  className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>NAAC Report</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEventToRegister(event)}
                disabled={!event.isRegistrationOpen || event.registeredCount >= event.maxSeats}
                className={`px-6 py-3 font-bold text-xs rounded-lg shadow-md transition-colors cursor-pointer flex items-center gap-2 ${
                  event.isRegistrationOpen && event.registeredCount < event.maxSeats
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>{event.registeredCount >= event.maxSeats ? 'Event Full' : 'Register for Event'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-slate-200 px-6 flex items-center gap-6 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Overview & Objectives
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'schedule'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Program Schedule
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'rules'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Rules & Eligibility
          </button>
          <button
            onClick={() => setActiveTab('coordinators')}
            className={`py-3.5 border-b-2 cursor-pointer transition-colors ${
              activeTab === 'coordinators'
                ? 'border-blue-600 text-blue-700 font-bold'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Event Coordinators
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 sm:p-8">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  About the Event
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {event.fullDescription}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Learning Objectives & Accreditation PO Mapping
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {event.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">E-Certificate Notice:</span> 100% attendance during the event is mandatory. Registered participants will receive their digital verifiable certificate in the Student Dashboard immediately after the event conclusion.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">
                Detailed Activity Schedule
              </h3>
              
              <div className="relative pl-6 border-l-2 border-slate-200 space-y-6">
                {event.schedule.map((item, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle marker */}
                    <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
                    
                    <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                      <div className="text-xs font-bold text-blue-700 font-mono">
                        {item.time}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 mt-1">
                        {item.activity}
                      </div>
                      {item.speaker && (
                        <div className="text-xs text-slate-600 mt-1">
                          Speaker / Lead: <strong>{item.speaker}</strong>
                        </div>
                      )}
                      {item.venue && (
                        <div className="text-xs text-slate-500 mt-0.5">
                          Location: {item.venue}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Eligibility Criteria
                </h3>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-700">
                  {event.eligibility}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Rules and Code of Conduct
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {event.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                      <span className="font-bold text-blue-600 shrink-0">{idx + 1}.</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'coordinators' && (
            <div className="space-y-6">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2">
                Event Coordination Committee
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Faculty Incharge */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-xs uppercase tracking-wider font-bold text-blue-700">
                    Faculty Coordinator
                  </div>
                  <div className="font-bold text-slate-900 text-base">
                    {event.facultyCoordinator.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {event.facultyCoordinator.designation}
                  </div>
                  <div className="pt-2 text-xs text-slate-600 space-y-1 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.facultyCoordinator.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.facultyCoordinator.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Student Incharge */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                  <div className="text-xs uppercase tracking-wider font-bold text-emerald-700">
                    Student Coordinator
                  </div>
                  <div className="font-bold text-slate-900 text-base">
                    {event.studentCoordinator.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    Class: {event.studentCoordinator.year}
                  </div>
                  <div className="pt-2 text-xs text-slate-600 space-y-1 border-t border-slate-200">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.studentCoordinator.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{event.studentCoordinator.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

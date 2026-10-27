import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trophy, 
  Award, 
  CheckCircle, 
  FileText, 
  Users, 
  Star, 
  Calendar, 
  MapPin,
  ExternalLink
} from 'lucide-react';

export const EventOutcomeModal: React.FC = () => {
  const { 
    selectedOutcomeEvent, 
    setSelectedOutcomeEvent, 
    setSelectedNaacReportEvent 
  } = useApp();

  if (!selectedOutcomeEvent || !selectedOutcomeEvent.outcome) return null;

  const event = selectedOutcomeEvent;
  const outcome = selectedOutcomeEvent.outcome;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <Award className="w-3.5 h-3.5" />
              <span>Official Departmental Event Outcome</span>
            </div>
            <h3 className="text-lg font-bold text-white line-clamp-1 mt-0.5">
              {event.title}
            </h3>
          </div>
          <button
            onClick={() => setSelectedOutcomeEvent(null)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Top metadata stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <div>
              <div className="text-xs text-slate-500 font-medium">Participants</div>
              <div className="text-lg font-bold text-slate-900 tabular-nums">{outcome.totalParticipants}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Attended</div>
              <div className="text-lg font-bold text-emerald-700 tabular-nums">{outcome.totalAttendees}</div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Attendance Rate</div>
              <div className="text-lg font-bold text-blue-700 tabular-nums">
                {Math.round((outcome.totalAttendees / outcome.totalParticipants) * 100)}%
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Feedback Rating</div>
              <div className="text-lg font-bold text-amber-600 flex items-center justify-center gap-1 tabular-nums">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>{outcome.feedbackScore} / 5</span>
              </div>
            </div>
          </div>

          {/* Event Executive Summary */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Event Executive Summary
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-white border border-slate-200 p-3.5 rounded-lg">
              {outcome.summary}
            </p>
          </div>

          {/* Winners & Honors */}
          {outcome.winners && outcome.winners.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Competition Winners & Special Honors</span>
                </h4>
              </div>

              <div className="space-y-2.5">
                {outcome.winners.map((winner, idx) => (
                  <div 
                    key={idx}
                    className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      winner.position.includes('1st')
                        ? 'bg-amber-50/60 border-amber-200'
                        : winner.position.includes('2nd')
                        ? 'bg-slate-50 border-slate-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-amber-700 uppercase tracking-wider">
                        {winner.position}
                      </div>
                      <div className="font-semibold text-slate-900 text-sm mt-0.5">
                        {winner.teamOrStudentName}
                      </div>
                      {winner.projectName && (
                        <div className="text-xs text-slate-600 mt-1 italic">
                          Project: "{winner.projectName}"
                        </div>
                      )}
                      <div className="text-xs text-slate-400 mt-0.5">
                        {winner.prnOrCollege}
                      </div>
                    </div>

                    {winner.prizeAmount && (
                      <div className="text-right shrink-0">
                        <span className="text-xs font-semibold text-slate-800 bg-white border border-slate-200 px-2.5 py-1 rounded">
                          {winner.prizeAmount}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* NBA Program Outcome (PO/PSO) Mapping */}
          {outcome.nbaPoAttainment && outcome.nbaPoAttainment.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                NBA Program Outcome (PO / PSO) Attainment Mapping
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {outcome.nbaPoAttainment.map((po, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700">
                    <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{po}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Deliverables & Outcomes */}
          {outcome.keyOutcomes && outcome.keyOutcomes.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Key Deliverables & Accreditation Notes
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                {outcome.keyOutcomes.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={() => {
              setSelectedOutcomeEvent(null);
              setSelectedNaacReportEvent(event);
            }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors cursor-pointer"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Official NAAC Report</span>
          </button>

          <button
            onClick={() => setSelectedOutcomeEvent(null)}
            className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

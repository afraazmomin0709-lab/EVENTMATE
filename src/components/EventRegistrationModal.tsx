import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  QrCode, 
  Users, 
  UserCheck, 
  AlertCircle,
  Plus,
  Trash2,
  Ticket
} from 'lucide-react';

export const EventRegistrationModal: React.FC = () => {
  const { 
    eventToRegister, 
    setEventToRegister, 
    currentUser, 
    registerForEvent, 
    navigateTo,
    registrations
  } = useApp();

  const [isTeam, setIsTeam] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamMemberInput, setTeamMemberInput] = useState('');
  const [teamMembers, setTeamMembers] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [confirmedPass, setConfirmedPass] = useState<{
    ticketCode: string;
    eventTitle: string;
  } | null>(null);

  if (!eventToRegister) return null;

  const isAlreadyRegistered = currentUser 
    ? registrations.some(r => r.eventId === eventToRegister.id && r.studentId === currentUser.id)
    : false;

  const handleAddMember = () => {
    if (teamMemberInput.trim()) {
      if (teamMembers.length >= 4) {
        setErrorMsg('Maximum 4 members allowed per team.');
        return;
      }
      setTeamMembers([...teamMembers, teamMemberInput.trim()]);
      setTeamMemberInput('');
      setErrorMsg('');
    }
  };

  const handleRemoveMember = (index: number) => {
    setTeamMembers(teamMembers.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!currentUser) {
      setEventToRegister(null);
      navigateTo('login');
      return;
    }

    if (currentUser.role !== 'student') {
      setErrorMsg('Faculty / Admin cannot register for student events. Please switch to a Student profile.');
      return;
    }

    if (isTeam && !teamName.trim()) {
      setErrorMsg('Please enter a Team Name for team registration.');
      return;
    }

    const allMembers = isTeam 
      ? [`${currentUser.name} (Lead - ${currentUser.prn})`, ...teamMembers]
      : undefined;

    const res = registerForEvent(eventToRegister.id, isTeam, teamName.trim(), allMembers);

    if (res.success && res.ticketCode) {
      setConfirmedPass({
        ticketCode: res.ticketCode,
        eventTitle: eventToRegister.title
      });
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              DYPCET Event Registration
            </span>
            <h3 className="text-lg font-bold text-white line-clamp-1 mt-0.5">
              {eventToRegister.title}
            </h3>
          </div>
          <button
            onClick={() => {
              setEventToRegister(null);
              setConfirmedPass(null);
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {confirmedPass ? (
            /* Registration Success Pass */
            <div className="text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900">Registration Confirmed!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Your seat for <strong>{confirmedPass.eventTitle}</strong> is booked.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="bg-slate-50 border border-dashed border-slate-300 rounded-xl p-4 text-left space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <div className="text-[11px] font-semibold text-slate-500 uppercase">E-Pass ID</div>
                    <div className="text-base font-mono font-bold text-blue-700">{confirmedPass.ticketCode}</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-slate-200">
                    <QrCode className="w-9 h-9 text-slate-800" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Student:</span>
                    <p className="font-semibold text-slate-800">{currentUser?.name}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">PRN:</span>
                    <p className="font-semibold text-slate-800">{currentUser?.role === 'student' ? currentUser.prn : ''}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Date:</span>
                    <p className="font-semibold text-slate-800">{eventToRegister.startDate}</p>
                  </div>
                  <div>
                    <span className="text-slate-500">Venue:</span>
                    <p className="font-semibold text-slate-800 truncate">{eventToRegister.venue}</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-200">
                  Present this QR code or Ticket ID at the department venue to mark your physical attendance.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setEventToRegister(null);
                    setConfirmedPass(null);
                    navigateTo('student-dashboard');
                  }}
                  className="flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  View in Student Dashboard
                </button>
                <button
                  onClick={() => {
                    setEventToRegister(null);
                    setConfirmedPass(null);
                  }}
                  className="py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Summary Box */}
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-1.5 text-slate-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-medium text-slate-800">{eventToRegister.startDate}</span>
                  <span className="text-slate-400">({eventToRegister.time})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{eventToRegister.venue}</span>
                </div>
                <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                  Eligibility: {eventToRegister.eligibility}
                </div>
              </div>

              {/* Already Registered Warning */}
              {isAlreadyRegistered && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                  <div>
                    <span className="font-semibold">Notice:</span> You have already registered for this event. You can check your pass in the Student Dashboard.
                  </div>
                </div>
              )}

              {/* Error Box */}
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Current Student Details */}
              {currentUser && currentUser.role === 'student' ? (
                <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-800">{currentUser.name}</span>
                    <span className="text-slate-500 font-mono">PRN: {currentUser.prn}</span>
                  </div>
                  <div className="text-slate-500">
                    {currentUser.department} · {currentUser.year} (Div {currentUser.division}) · {currentUser.email}
                  </div>
                </div>
              ) : (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
                  Please log in with your DYPCET student account to confirm your registration.
                </div>
              )}

              {/* Registration Type: Solo or Team */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-semibold text-slate-700 block">Registration Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setIsTeam(false)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      !isTeam 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Individual Participant
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsTeam(true)}
                    className={`py-2 px-3 text-xs font-medium rounded-lg border text-center transition-colors ${
                      isTeam 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-semibold' 
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    Team / Group Entry
                  </button>
                </div>
              </div>

              {/* Team fields if Team is selected */}
              {isTeam && (
                <div className="space-y-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Team Name *
                    </label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. CyberKnights or AgriSense"
                      className="w-full text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                      required={isTeam}
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Additional Team Members (Name & PRN)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={teamMemberInput}
                        onChange={(e) => setTeamMemberInput(e.target.value)}
                        placeholder="e.g. Rahul Patil (PRN: 2023051234)"
                        className="flex-1 text-xs p-2 rounded border border-slate-300 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddMember();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="px-3 py-2 text-xs bg-slate-800 text-white rounded font-medium hover:bg-slate-700 cursor-pointer"
                      >
                        Add
                      </button>
                    </div>

                    {teamMembers.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {teamMembers.map((member, i) => (
                          <div key={i} className="flex items-center justify-between text-xs bg-white p-1.5 rounded border border-slate-200">
                            <span className="truncate">{member}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveMember(i)}
                              className="text-slate-400 hover:text-rose-600 p-0.5"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEventToRegister(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAlreadyRegistered}
                  className={`px-5 py-2.5 text-xs font-semibold text-white rounded-lg shadow-sm transition-colors cursor-pointer ${
                    isAlreadyRegistered
                      ? 'bg-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isAlreadyRegistered ? 'Already Registered' : 'Confirm Registration'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

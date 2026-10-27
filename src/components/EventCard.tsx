import React from 'react';
import { EventItem } from '../types';
import { useApp } from '../context/AppContext';
import { Calendar, MapPin, Users, Award, ArrowRight } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  featured?: boolean;
}

export const EventCard: React.FC<EventCardProps> = ({ event, featured = false }) => {
  const { navigateTo, setEventToRegister, setSelectedOutcomeEvent } = useApp();

  const isCompleted = event.status === 'Completed' || event.status === 'Outcomes Published';
  const seatsPercentage = Math.round((event.registeredCount / event.maxSeats) * 100);

  return (
    <div 
      className={`group bg-white rounded-xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col ${
        featured ? 'md:col-span-2 md:flex-row' : ''
      }`}
    >
      {/* Visual Image Container with fallback */}
      <div 
        className={`relative overflow-hidden bg-slate-100 shrink-0 ${
          featured ? 'md:w-5/12 h-64 md:h-auto' : 'h-48'
        }`}
      >
        <img 
          src={event.bannerUrl} 
          alt={event.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // CSS Fallback if image fails
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        {/* Subtle Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

        {/* Status text label on top of scrim - clean and unboxed */}
        <div className="absolute bottom-3 left-3 text-white text-xs font-medium drop-shadow-sm flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${
            isCompleted ? 'bg-emerald-400' : event.isRegistrationOpen ? 'bg-blue-400 animate-pulse' : 'bg-amber-400'
          }`} />
          <span>{event.status}</span>
          <span className="text-white/60">·</span>
          <span className="text-slate-200">{event.mode}</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          {/* Metadata strictly unboxed with typographic separators */}
          <div className="flex items-center flex-wrap gap-2 text-xs text-slate-500 mb-2 font-medium">
            <span className="text-blue-700 font-semibold">{event.department}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>{event.category}</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span>AY {event.academicYear}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => navigateTo('details', event.id)}
            className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 cursor-pointer mb-2"
          >
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {event.shortDescription}
          </p>

          {/* Info Details */}
          <div className="space-y-1.5 text-xs text-slate-600 mb-5 border-t border-slate-100 pt-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-medium text-slate-800">{event.startDate}</span>
              <span className="text-slate-400">({event.time})</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </div>
          </div>
        </div>

        {/* Footer / Seat counter and Action button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          {isCompleted ? (
            <div className="text-xs text-slate-500 font-medium">
              <span>{event.outcome ? `${event.outcome.totalAttendees} attended` : 'Event Concluded'}</span>
            </div>
          ) : (
            <div className="text-xs text-slate-600">
              <div className="flex items-center gap-1.5 font-medium tabular-nums">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  <strong className="text-slate-900">{event.registeredCount}</strong> / {event.maxSeats} seats
                </span>
              </div>
              <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1">
                <div 
                  className={`h-full ${seatsPercentage >= 90 ? 'bg-amber-500' : 'bg-blue-600'}`} 
                  style={{ width: `${Math.min(seatsPercentage, 100)}%` }}
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo('details', event.id)}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Details
            </button>

            {isCompleted ? (
              <button
                onClick={() => setSelectedOutcomeEvent(event)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>View Results</span>
              </button>
            ) : (
              <button
                onClick={() => setEventToRegister(event)}
                disabled={!event.isRegistrationOpen || event.registeredCount >= event.maxSeats}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer whitespace-nowrap ${
                  event.isRegistrationOpen && event.registeredCount < event.maxSeats
                    ? 'text-white bg-blue-600 hover:bg-blue-700'
                    : 'text-slate-400 bg-slate-100 cursor-not-allowed border border-slate-200'
                }`}
              >
                <span>{event.registeredCount >= event.maxSeats ? 'Full' : 'Register'}</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

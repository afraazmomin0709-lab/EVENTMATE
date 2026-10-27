import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { DEPARTMENTS, CATEGORIES } from '../data/mockData';
import { EventCard } from '../components/EventCard';
import { Search, Filter, Calendar, RotateCcw } from 'lucide-react';

export const UpcomingEventsPage: React.FC = () => {
  const { events } = useApp();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMode, setSelectedMode] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const upcomingEvents = events.filter(e => e.status === 'Upcoming');

  const filteredEvents = upcomingEvents.filter(e => {
    const matchesDept = selectedDept === 'All' || e.department === selectedDept;
    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    const matchesMode = selectedMode === 'All' || e.mode.includes(selectedMode);
    const matchesSearch = searchQuery === '' ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.venue.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDept && matchesCategory && matchesMode && matchesSearch;
  });

  const resetFilters = () => {
    setSelectedDept('All');
    setSelectedCategory('All');
    setSelectedMode('All');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      
      {/* Page Header */}
      <div>
        <div className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
          DYPCET Event Directory
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
          Upcoming Department Events
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Explore and register for college hackathons, technical workshops, seminars, and guest lectures across all engineering departments.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
        
        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event title, keyword, or venue..."
            className="w-full text-sm pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
          />
        </div>

        {/* Filter controls row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Department dropdown */}
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

          {/* Category dropdown */}
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">
              Event Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Mode dropdown */}
          <div>
            <label className="text-xs font-medium text-slate-600 block mb-1">
              Mode of Conduct
            </label>
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full text-xs p-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="All">All Modes</option>
              <option value="Offline">Offline (Campus)</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>

        </div>

        {/* Filter Results Summary & Reset */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-900">{filteredEvents.length}</strong> of {upcomingEvents.length} events
          </span>

          {(selectedDept !== 'All' || selectedCategory !== 'All' || selectedMode !== 'All' || searchQuery !== '') && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-500">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No upcoming events match your filters</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting the department, category, or search filters above.</p>
          <button
            onClick={resetFilters}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer"
          >
            Show All Upcoming Events
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}

    </div>
  );
};

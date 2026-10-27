import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  EventItem, 
  StudentUser, 
  AdminUser, 
  RegistrationRecord, 
  CurrentUser, 
  EventOutcome,
  Department
} from '../types';
import { 
  INITIAL_EVENTS, 
  INITIAL_STUDENTS, 
  INITIAL_ADMINS, 
  INITIAL_REGISTRATIONS 
} from '../data/mockData';

export type PageView = 
  | 'home' 
  | 'upcoming' 
  | 'past' 
  | 'details' 
  | 'student-dashboard' 
  | 'admin-dashboard' 
  | 'reports' 
  | 'about' 
  | 'login';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  events: EventItem[];
  students: StudentUser[];
  admins: AdminUser[];
  registrations: RegistrationRecord[];
  currentUser: CurrentUser;
  currentPage: PageView;
  selectedEventId: string | null;
  selectedCertificate: RegistrationRecord | null;
  selectedOutcomeEvent: EventItem | null;
  selectedNaacReportEvent: EventItem | null;
  showPhpMysqlModal: boolean;
  eventToRegister: EventItem | null;
  toasts: Toast[];

  // Navigation
  navigateTo: (page: PageView, eventId?: string) => void;
  setSelectedCertificate: (reg: RegistrationRecord | null) => void;
  setSelectedOutcomeEvent: (evt: EventItem | null) => void;
  setSelectedNaacReportEvent: (evt: EventItem | null) => void;
  setShowPhpMysqlModal: (show: boolean) => void;
  setEventToRegister: (evt: EventItem | null) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;

  // Auth
  loginAsStudent: (studentId: string) => void;
  loginAsAdmin: (adminId: string) => void;
  registerNewStudent: (student: Omit<StudentUser, 'id' | 'role'>) => boolean;
  logout: () => void;

  // Event Actions
  registerForEvent: (
    eventId: string, 
    isTeam: boolean, 
    teamName?: string, 
    teamMembers?: string[]
  ) => { success: boolean; message: string; ticketCode?: string };
  
  addEvent: (event: Omit<EventItem, 'id' | 'registeredCount'>) => void;
  updateEvent: (eventId: string, updatedFields: Partial<EventItem>) => void;
  deleteEvent: (eventId: string) => void;
  markAttendance: (registrationId: string, status: 'Attended' | 'Absent' | 'Registered') => void;
  bulkMarkAttendance: (eventId: string, status: 'Attended' | 'Absent') => void;
  publishOutcome: (eventId: string, outcome: EventOutcome) => void;
  resetToDemoData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from LocalStorage or default
  const [events, setEvents] = useState<EventItem[]>(() => {
    try {
      const saved = localStorage.getItem('eventmate_events');
      return saved ? JSON.parse(saved) : INITIAL_EVENTS;
    } catch {
      return INITIAL_EVENTS;
    }
  });

  const [students, setStudents] = useState<StudentUser[]>(() => {
    try {
      const saved = localStorage.getItem('eventmate_students');
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [admins] = useState<AdminUser[]>(INITIAL_ADMINS);

  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('eventmate_registrations');
      return saved ? JSON.parse(saved) : INITIAL_REGISTRATIONS;
    } catch {
      return INITIAL_REGISTRATIONS;
    }
  });

  // Current User: Default to null (Guest) so new visitors arrive with clean sign-in state
  const [currentUser, setCurrentUser] = useState<CurrentUser>(() => {
    try {
      const saved = localStorage.getItem('eventmate_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<RegistrationRecord | null>(null);
  const [selectedOutcomeEvent, setSelectedOutcomeEvent] = useState<EventItem | null>(null);
  const [selectedNaacReportEvent, setSelectedNaacReportEvent] = useState<EventItem | null>(null);
  const [showPhpMysqlModal, setShowPhpMysqlModal] = useState<boolean>(false);
  const [eventToRegister, setEventToRegister] = useState<EventItem | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('eventmate_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('eventmate_registrations', JSON.stringify(registrations));
  }, [registrations]);

  useEffect(() => {
    localStorage.setItem('eventmate_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('eventmate_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('eventmate_current_user');
    }
  }, [currentUser]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const navigateTo = (page: PageView, eventId?: string) => {
    setCurrentPage(page);
    if (eventId) {
      setSelectedEventId(eventId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginAsStudent = (studentId: string) => {
    const target = students.find((s) => s.id === studentId);
    if (target) {
      setCurrentUser(target);
      showToast(`Logged in as student: ${target.name}`, 'success');
      navigateTo('student-dashboard');
    }
  };

  const loginAsAdmin = (adminId: string) => {
    const target = admins.find((a) => a.id === adminId);
    if (target) {
      setCurrentUser(target);
      showToast(`Logged in as Faculty Admin: ${target.name}`, 'info');
      navigateTo('admin-dashboard');
    }
  };

  const registerNewStudent = (studentData: Omit<StudentUser, 'id' | 'role'>): boolean => {
    const exists = students.some((s) => s.prn === studentData.prn || s.email === studentData.email);
    if (exists) {
      showToast('A student with this PRN or Email already exists.', 'error');
      return false;
    }
    const newStudent: StudentUser = {
      ...studentData,
      id: `std-${Date.now()}`,
      role: 'student'
    };
    setStudents((prev) => [...prev, newStudent]);
    setCurrentUser(newStudent);
    showToast(`Welcome ${newStudent.name}! Account created successfully.`, 'success');
    navigateTo('student-dashboard');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('You have been logged out.', 'info');
    navigateTo('home');
  };

  const registerForEvent = (
    eventId: string, 
    isTeam: boolean, 
    teamName?: string, 
    teamMembers?: string[]
  ) => {
    if (!currentUser || currentUser.role !== 'student') {
      showToast('Please log in as a student to register for events.', 'error');
      navigateTo('login');
      return { success: false, message: 'Must be logged in as student' };
    }

    const event = events.find((e) => e.id === eventId);
    if (!event) {
      return { success: false, message: 'Event not found' };
    }

    // Check if already registered
    const alreadyRegistered = registrations.some(
      (r) => r.eventId === eventId && r.studentId === currentUser.id
    );

    if (alreadyRegistered) {
      showToast('You are already registered for this event.', 'info');
      return { success: false, message: 'Already registered' };
    }

    if (event.registeredCount >= event.maxSeats) {
      showToast('Sorry, this event has reached maximum capacity.', 'error');
      return { success: false, message: 'Seats full' };
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ticketCode = `DYP-${event.category.substring(0, 3).toUpperCase()}-${currentUser.prn.slice(-4)}${randomSuffix.toString().slice(-2)}`;

    const newRecord: RegistrationRecord = {
      id: `reg-${Date.now()}`,
      eventId: event.id,
      eventTitle: event.title,
      department: event.department,
      eventDate: event.startDate,
      eventVenue: event.venue,
      studentId: currentUser.id,
      studentName: currentUser.name,
      studentPrn: currentUser.prn,
      studentEmail: currentUser.email,
      studentPhone: currentUser.phone,
      studentYear: currentUser.year,
      studentDept: currentUser.department,
      registrationDate: new Date().toISOString().split('T')[0],
      isTeamRegistration: isTeam,
      teamName: isTeam ? teamName : undefined,
      teamMembers: isTeam ? teamMembers : undefined,
      attendanceStatus: 'Registered',
      certificateIssued: false,
      ticketCode
    };

    setRegistrations((prev) => [newRecord, ...prev]);

    // Increment count
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e
      )
    );

    showToast(`Registered successfully! Pass code: ${ticketCode}`, 'success');
    return { success: true, message: 'Registration confirmed', ticketCode };
  };

  const addEvent = (eventData: Omit<EventItem, 'id' | 'registeredCount'>) => {
    const newEvent: EventItem = {
      ...eventData,
      id: `evt-${Date.now()}`,
      registeredCount: 0
    };
    setEvents((prev) => [newEvent, ...prev]);
    showToast(`Event "${newEvent.title}" published successfully!`, 'success');
  };

  const updateEvent = (eventId: string, updatedFields: Partial<EventItem>) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === eventId ? { ...evt, ...updatedFields } : evt))
    );
    showToast('Event information updated successfully.', 'success');
  };

  const deleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setRegistrations((prev) => prev.filter((r) => r.eventId !== eventId));
    showToast('Event and associated registrations deleted.', 'info');
  };

  const markAttendance = (registrationId: string, status: 'Attended' | 'Absent' | 'Registered') => {
    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.id === registrationId) {
          const certIssued = status === 'Attended';
          const certId = certIssued
            ? reg.certificateId || `DYP-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
            : undefined;
          return {
            ...reg,
            attendanceStatus: status,
            certificateIssued: certIssued,
            certificateId: certId
          };
        }
        return reg;
      })
    );
    showToast(`Attendance marked as ${status}.`, 'success');
  };

  const bulkMarkAttendance = (eventId: string, status: 'Attended' | 'Absent') => {
    setRegistrations((prev) =>
      prev.map((reg) => {
        if (reg.eventId === eventId) {
          const certIssued = status === 'Attended';
          const certId = certIssued
            ? reg.certificateId || `DYP-CERT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
            : undefined;
          return {
            ...reg,
            attendanceStatus: status,
            certificateIssued: certIssued,
            certificateId: certId
          };
        }
        return reg;
      })
    );
    showToast(`Bulk attendance updated to ${status} for all participants.`, 'success');
  };

  const publishOutcome = (eventId: string, outcome: EventOutcome) => {
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          return {
            ...evt,
            status: 'Outcomes Published',
            outcome
          };
        }
        return evt;
      })
    );
    showToast('Event outcome and results published successfully!', 'success');
  };

  const resetToDemoData = () => {
    localStorage.removeItem('eventmate_events');
    localStorage.removeItem('eventmate_registrations');
    localStorage.removeItem('eventmate_students');
    setEvents(INITIAL_EVENTS);
    setRegistrations(INITIAL_REGISTRATIONS);
    setStudents(INITIAL_STUDENTS);
    setCurrentUser(null);
    localStorage.removeItem('eventmate_current_user');
    showToast('Reset all events and registrations to fresh college demo data.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        events,
        students,
        admins,
        registrations,
        currentUser,
        currentPage,
        selectedEventId,
        selectedCertificate,
        selectedOutcomeEvent,
        selectedNaacReportEvent,
        showPhpMysqlModal,
        eventToRegister,
        toasts,
        navigateTo,
        setSelectedCertificate,
        setSelectedOutcomeEvent,
        setSelectedNaacReportEvent,
        setShowPhpMysqlModal,
        setEventToRegister,
        showToast,
        loginAsStudent,
        loginAsAdmin,
        registerNewStudent,
        logout,
        registerForEvent,
        addEvent,
        updateEvent,
        deleteEvent,
        markAttendance,
        bulkMarkAttendance,
        publishOutcome,
        resetToDemoData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

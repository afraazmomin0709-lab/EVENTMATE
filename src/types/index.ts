export type Department = 
  | 'Computer Science & Engineering'
  | 'Artificial Intelligence & Machine Learning'
  | 'Data Science'
  | 'Electronics & Telecommunication'
  | 'Mechanical Engineering'
  | 'Civil Engineering'
  | 'Chemical Engineering'
  | 'First Year Engineering (GSH)';

export type EventCategory = 
  | 'Hackathon'
  | 'Technical Workshop'
  | 'Expert Lecture'
  | 'Project Exhibition'
  | 'Seminar'
  | 'Coding Contest'
  | 'Industry Visit'
  | 'Alumni Connect'
  | 'Cultural & Co-Curricular';

export type EventMode = 'Offline (Campus)' | 'Online' | 'Hybrid';

export type EventStatus = 'Draft' | 'Upcoming' | 'Ongoing' | 'Completed' | 'Outcomes Published';

export interface ScheduleItem {
  time: string;
  activity: string;
  speaker?: string;
  venue?: string;
}

export interface Winner {
  position: '1st Place (Winner)' | '2nd Place (1st Runner Up)' | '3rd Place (2nd Runner Up)' | 'Special Mention';
  teamOrStudentName: string;
  prnOrCollege: string;
  prizeAmount?: string;
  projectName?: string;
}

export interface EventOutcome {
  publishedDate: string;
  summary: string;
  totalParticipants: number;
  totalAttendees: number;
  nbaPoAttainment: string[]; // e.g. ["PO1: Engineering Knowledge", "PO3: Design/Development", "PO5: Modern Tool Usage"]
  winners: Winner[];
  keyOutcomes: string[];
  feedbackScore: number; // e.g. 4.8 out of 5
  galleryImages?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  department: Department;
  category: EventCategory;
  academicYear: string; // e.g. "2026-2027" or "2025-2026"
  startDate: string; // YYYY-MM-DD
  endDate?: string;
  time: string;
  venue: string;
  mode: EventMode;
  status: EventStatus;
  maxSeats: number;
  registeredCount: number;
  registrationDeadline: string;
  isRegistrationOpen: boolean;
  registrationFee: number; // 0 for free
  bannerUrl: string;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  rules: string[];
  schedule: ScheduleItem[];
  facultyCoordinator: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  studentCoordinator: {
    name: string;
    year: string;
    phone: string;
    email: string;
  };
  eligibility: string;
  outcome?: EventOutcome;
}

export interface StudentUser {
  id: string;
  prn: string; // e.g. 2024012938
  name: string;
  email: string;
  department: Department;
  year: 'FE' | 'SE' | 'TE' | 'BE';
  division: string;
  rollNo: string;
  phone: string;
  role: 'student';
}

export interface AdminUser {
  id: string;
  facultyId: string;
  name: string;
  designation: string;
  email: string;
  department: Department | 'All Departments (Dean/Principal)';
  phone: string;
  role: 'admin';
}

export type CurrentUser = StudentUser | AdminUser | null;

export interface RegistrationRecord {
  id: string;
  eventId: string;
  eventTitle: string;
  department: Department;
  eventDate: string;
  eventVenue: string;
  studentId: string;
  studentName: string;
  studentPrn: string;
  studentEmail: string;
  studentPhone: string;
  studentYear: string;
  studentDept: Department;
  registrationDate: string;
  isTeamRegistration: boolean;
  teamName?: string;
  teamMembers?: string[];
  attendanceStatus: 'Registered' | 'Attended' | 'Absent';
  certificateIssued: boolean;
  certificateId?: string;
  ticketCode: string;
}

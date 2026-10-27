import { EventItem, StudentUser, AdminUser, RegistrationRecord } from '../types';

export const DEPARTMENTS = [
  'Computer Science & Engineering',
  'Artificial Intelligence & Machine Learning',
  'Data Science',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'First Year Engineering (GSH)'
] as const;

export const CATEGORIES = [
  'Hackathon',
  'Technical Workshop',
  'Expert Lecture',
  'Project Exhibition',
  'Seminar',
  'Coding Contest',
  'Industry Visit',
  'Alumni Connect',
  'Cultural & Co-Curricular'
] as const;

export const ACADEMIC_YEARS = ['2026-2027', '2025-2026', '2024-2025'] as const;

export const INITIAL_STUDENTS: StudentUser[] = [
  {
    id: 'std-1',
    prn: '2023058001',
    name: 'Afraaz Momin',
    email: 'afraazmomin0709@gmail.com',
    department: 'Computer Science & Engineering',
    year: 'TE',
    division: 'A',
    rollNo: 'TE-CSE-01',
    phone: '+91 98220 12345',
    role: 'student'
  },
  {
    id: 'std-2',
    prn: '2023059104',
    name: 'Ananya Rahul Deshmukh',
    email: 'ananya.deshmukh@dypcet.ac.in',
    department: 'Artificial Intelligence & Machine Learning',
    year: 'TE',
    division: 'B',
    rollNo: 'TE-AIML-18',
    phone: '+91 97654 32190',
    role: 'student'
  },
  {
    id: 'std-3',
    prn: '2024061203',
    name: 'Rohan Vikram Shinde',
    email: 'rohan.shinde@dypcet.ac.in',
    department: 'Electronics & Telecommunication',
    year: 'SE',
    division: 'A',
    rollNo: 'SE-ETC-29',
    phone: '+91 94220 18456',
    role: 'student'
  },
  {
    id: 'std-4',
    prn: '2022045612',
    name: 'Sneha Mahesh Jadhav',
    email: 'sneha.jadhav@dypcet.ac.in',
    department: 'Mechanical Engineering',
    year: 'BE',
    division: 'B',
    rollNo: 'BE-MECH-54',
    phone: '+91 91580 94821',
    role: 'student'
  },
  {
    id: 'std-5',
    prn: '2023057819',
    name: 'Prathamesh Suresh Kulkarni',
    email: 'prathamesh.k@dypcet.ac.in',
    department: 'Data Science',
    year: 'TE',
    division: 'A',
    rollNo: 'TE-DS-33',
    phone: '+91 98811 23456',
    role: 'student'
  }
];

export const INITIAL_ADMINS: AdminUser[] = [
  {
    id: 'adm-1',
    facultyId: 'FAC-CSE-012',
    name: 'Dr. Pravin R. Chougule',
    designation: 'Associate Professor & Event Coordinator',
    email: 'hod.cse@dypcet.ac.in',
    department: 'Computer Science & Engineering',
    phone: '+91 94238 65432',
    role: 'admin'
  },
  {
    id: 'adm-2',
    facultyId: 'FAC-GEN-001',
    name: 'Prof. Smita K. Mane',
    designation: 'Dean Academics & Central Event Convener',
    email: 'dean.events@dypcet.ac.in',
    department: 'All Departments (Dean/Principal)',
    phone: '+91 98901 23456',
    role: 'admin'
  }
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-101',
    title: 'CodeSpark 2026: National 24-Hour Hackathon',
    department: 'Computer Science & Engineering',
    category: 'Hackathon',
    academicYear: '2026-2027',
    startDate: '2026-10-18',
    endDate: '2026-10-19',
    time: '09:00 AM - 05:00 PM (24 Hrs)',
    venue: 'Central Advanced Computing Lab & Seminar Hall 1',
    mode: 'Offline (Campus)',
    status: 'Upcoming',
    maxSeats: 120,
    registeredCount: 84,
    registrationDeadline: '2026-10-16',
    isRegistrationOpen: true,
    registrationFee: 0,
    bannerUrl: '/src/assets/images/event_hackathon_tech_1790870123705.jpg',
    shortDescription: 'Flagship 24-hour non-stop hackathon tackling real-world problem statements in Smart Healthcare, FinTech, and Sustainable Cities.',
    fullDescription: 'CodeSpark 2026 invites innovative student engineers to collaborate, design, and deploy production-grade software solutions in a fast-paced 24-hour environment. Mentored by industry leads from Pune and Bangalore tech firms. Includes continuous mentoring, high-speed WiFi, midnight pizza sprint, and jury evaluations from top tech leaders.',
    objectives: [
      'Encourage rapid prototyping and practical software system development.',
      'Foster collaboration between multi-disciplinary student teams.',
      'Map directly to Program Outcome PO3 (Design and Development of Solutions) and PO5 (Modern Tool Usage).'
    ],
    rules: [
      'Teams must consist of 2 to 4 members from recognized engineering colleges.',
      'All code repositories must be initiated at the hackathon opening ceremony.',
      'Use of open-source libraries and APIs is allowed with proper attribution.',
      'Submissions require working GitHub repository, demo video, and presentation.'
    ],
    schedule: [
      { time: '09:00 AM - 10:00 AM', activity: 'Registration & Team Desk Allotment', venue: 'Lab Complex 3' },
      { time: '10:00 AM - 11:00 AM', activity: 'Inauguration & Problem Statement Release', speaker: 'Principal Dr. A. N. Raykar', venue: 'Auditorium' },
      { time: '11:00 AM', activity: 'Hackathon Commences (Coding Sprint 1)' },
      { time: '04:00 PM - 06:00 PM', activity: 'Mentorship Round 1 (Architecture & Feasibility)' },
      { time: '11:00 PM - 12:00 AM', activity: 'Midnight Coding Evaluation & Review' },
      { time: '09:00 AM (Day 2)', activity: 'Final Code Freeze' },
      { time: '10:30 AM - 01:30 PM', activity: 'Jury Pitch Presentations & Q&A' },
      { time: '03:30 PM - 05:00 PM', activity: 'Valedictory & Prize Distribution' }
    ],
    facultyCoordinator: {
      name: 'Dr. Pravin R. Chougule',
      designation: 'Associate Professor, CSE',
      email: 'pravin.chougule@dypcet.ac.in',
      phone: '+91 94238 65432'
    },
    studentCoordinator: {
      name: 'Afraaz Momin',
      year: 'TE CSE',
      phone: '+91 98220 12345',
      email: 'afraazmomin0709@gmail.com'
    },
    eligibility: 'SE, TE, and BE students of CSE, IT, AIML, DS, and allied departments.'
  },
  {
    id: 'evt-102',
    title: 'RoboTrack 2026: Autonomous Robotics & Embedded Systems Challenge',
    department: 'Electronics & Telecommunication',
    category: 'Project Exhibition',
    academicYear: '2026-2027',
    startDate: '2026-10-24',
    endDate: '2026-10-24',
    time: '10:00 AM - 04:30 PM',
    venue: 'E&TC Robotics Lab & Open Arena',
    mode: 'Offline (Campus)',
    status: 'Upcoming',
    maxSeats: 80,
    registeredCount: 52,
    registrationDeadline: '2026-10-22',
    isRegistrationOpen: true,
    registrationFee: 0,
    bannerUrl: '/src/assets/images/event_robotics_symposium_1790870140193.jpg',
    shortDescription: 'State-level robotics confrontation featuring line-following bots, obstacle avoidance rovers, and IoT-integrated industrial robotic arms.',
    fullDescription: 'Organized by the Department of Electronics & Telecommunication in association with the IETE Student Forum. This technical event provides a premier testbed for students working on microcontroller programming (ESP32, STM32, Arduino), sensor fusion, and mechanical chassis design.',
    objectives: [
      'Demonstrate hardware-software co-design in embedded robotic systems.',
      'Enhance real-time problem-solving under strict arena constraints.',
      'Attain PO1 (Engineering Knowledge) and PO2 (Problem Analysis).'
    ],
    rules: [
      'Robot dimensions must not exceed 25cm x 25cm x 25cm.',
      'Maximum voltage supply allowed on-board is 12V DC.',
      'Autonomous navigation is mandatory for the obstacle grid round.',
      'Decision of the technical referee is final and binding.'
    ],
    schedule: [
      { time: '09:30 AM - 10:30 AM', activity: 'Technical Inspection & Dimension Check', venue: 'E&TC Lab 2' },
      { time: '10:30 AM - 01:00 PM', activity: 'Round 1: Precision Line Tracing with Dynamic Curves' },
      { time: '02:00 PM - 03:30 PM', activity: 'Round 2: Autonomous Obstacle Matrix' },
      { time: '03:45 PM - 04:30 PM', activity: 'Grand Finale & Demonstration by Winners' }
    ],
    facultyCoordinator: {
      name: 'Prof. S. M. Hirikude',
      designation: 'Assistant Professor, E&TC',
      email: 'sm.hirikude@dypcet.ac.in',
      phone: '+91 98224 81920'
    },
    studentCoordinator: {
      name: 'Rohan Shinde',
      year: 'SE E&TC',
      phone: '+91 94220 18456',
      email: 'rohan.shinde@dypcet.ac.in'
    },
    eligibility: 'All Engineering undergraduate students (FE to BE).'
  },
  {
    id: 'evt-103',
    title: 'Generative AI & LLM Systems Hands-On Masterclass',
    department: 'Artificial Intelligence & Machine Learning',
    category: 'Technical Workshop',
    academicYear: '2026-2027',
    startDate: '2026-11-04',
    endDate: '2026-11-05',
    time: '10:00 AM - 04:00 PM',
    venue: 'Seminar Hall 2 & Cloud Computing Centre',
    mode: 'Hybrid',
    status: 'Upcoming',
    maxSeats: 100,
    registeredCount: 78,
    registrationDeadline: '2026-11-02',
    isRegistrationOpen: true,
    registrationFee: 0,
    bannerUrl: '/src/assets/images/hero_campus_dypcet_1790870101738.jpg',
    shortDescription: 'Two-day immersive practical workshop on fine-tuning open weights models, LangChain agent pipelines, and vector database embeddings.',
    fullDescription: 'Comprehensive training session curated by AIML Department in collaboration with leading AI practitioners. Students build full Retrieval-Augmented Generation (RAG) applications using Python, Hugging Face, and local inference engines.',
    objectives: [
      'Bridge the gap between theoretical machine learning and enterprise GenAI application architectures.',
      'Deploy production-ready semantic search pipelines.',
      'Fulfill PO5 (Modern Tool Usage) and PSO2 (AIML Domain Competence).'
    ],
    rules: [
      'Participants must bring their personal laptop with Python 3.10+ installed.',
      'Attendance in both days is mandatory for certificate eligibility.',
      'Hands-on assignment submission required at the end of Day 2.'
    ],
    schedule: [
      { time: '10:00 AM - 12:30 PM (Day 1)', activity: 'Transformer Architectures, Tokenization & Embeddings' },
      { time: '01:30 PM - 04:00 PM (Day 1)', activity: 'Building RAG with Vector Stores (ChromaDB & FAISS)' },
      { time: '10:00 AM - 12:30 PM (Day 2)', activity: 'Agentic Workflows and Function Calling with LangChain' },
      { time: '01:30 PM - 03:30 PM (Day 2)', activity: 'Hands-on Hack sprint: Deploying an Academic Assistant' },
      { time: '03:30 PM - 04:00 PM (Day 2)', activity: 'Evaluation & Certificate Distribution' }
    ],
    facultyCoordinator: {
      name: 'Dr. Vaishali S. Mane',
      designation: 'HOD & Associate Professor, AIML',
      email: 'hod.aiml@dypcet.ac.in',
      phone: '+91 97631 82745'
    },
    studentCoordinator: {
      name: 'Ananya Deshmukh',
      year: 'TE AIML',
      phone: '+91 97654 32190',
      email: 'ananya.deshmukh@dypcet.ac.in'
    },
    eligibility: 'Open to TE & BE students of CSE, AIML, DS, and IT departments.'
  },
  {
    id: 'evt-104',
    title: 'Future of Sustainable Construction: Green Concrete & BIM Workshop',
    department: 'Civil Engineering',
    category: 'Expert Lecture',
    academicYear: '2026-2027',
    startDate: '2026-11-12',
    endDate: '2026-11-12',
    time: '11:00 AM - 01:30 PM',
    venue: 'Civil Engineering CAD Lab & Audi 2',
    mode: 'Offline (Campus)',
    status: 'Upcoming',
    maxSeats: 90,
    registeredCount: 45,
    registrationDeadline: '2026-11-10',
    isRegistrationOpen: true,
    registrationFee: 0,
    bannerUrl: '/src/assets/images/hero_campus_dypcet_1790870101738.jpg',
    shortDescription: 'Industrial expert lecture on Building Information Modeling (BIM) workflows and low-carbon geopolymer concrete developments.',
    fullDescription: 'Conducted in partnership with the Association of Civil Engineers (ACE) and regional structural consultants. Keynote by chief structural consultant detailing real-time infrastructure projects in Western Maharashtra and sustainability compliance.',
    objectives: [
      'Expose civil engineering students to contemporary green building standards.',
      'Demonstrate BIM Level 2 collaboration workflows.',
      'PO7 (Environment and Sustainability) and PO6 (The Engineer and Society).'
    ],
    rules: [
      'Formal academic dress code required.',
      'Attendance will be marked at entrance via EventMate digital registration pass.'
    ],
    schedule: [
      { time: '11:00 AM - 11:15 AM', activity: 'Felicitation of Chief Guest & Welcome Address' },
      { time: '11:15 AM - 12:45 PM', activity: 'Keynote Lecture: Green Concrete Matrix & Geopolymer Mixes' },
      { time: '12:45 PM - 01:15 PM', activity: 'BIM 3D modeling walkthrough & Q&A session' },
      { time: '01:15 PM - 01:30 PM', activity: 'Vote of Thanks' }
    ],
    facultyCoordinator: {
      name: 'Prof. R. G. Banne',
      designation: 'Assistant Professor, Civil Engineering',
      email: 'rg.banne@dypcet.ac.in',
      phone: '+91 94211 48729'
    },
    studentCoordinator: {
      name: 'Kunal Patil',
      year: 'BE Civil',
      phone: '+91 99223 34455',
      email: 'kunal.patil@dypcet.ac.in'
    },
    eligibility: 'SE, TE, and BE Civil Engineering students.'
  },
  // COMPLETED EVENTS WITH PUBLISHED OUTCOMES
  {
    id: 'evt-201',
    title: 'TechnoCraft 2026: Annual State-Level Project Exhibition',
    department: 'Computer Science & Engineering',
    category: 'Project Exhibition',
    academicYear: '2025-2026',
    startDate: '2026-03-20',
    endDate: '2026-03-20',
    time: '09:30 AM - 05:00 PM',
    venue: 'DYPCET Main Central Auditorium & Courtyard',
    mode: 'Offline (Campus)',
    status: 'Outcomes Published',
    maxSeats: 150,
    registeredCount: 142,
    registrationDeadline: '2026-03-18',
    isRegistrationOpen: false,
    registrationFee: 0,
    bannerUrl: '/src/assets/images/event_hackathon_tech_1790870123705.jpg',
    shortDescription: 'Flagship inter-collegiate technical project competition evaluating capstone innovations across web, cloud, IoT, and AI systems.',
    fullDescription: 'TechnoCraft is an annual signature event that showcases final-year and pre-final year engineering projects judged by industry technical architects from TCS, Infosys, and Cognizant. More than 45 teams presented working prototypes.',
    objectives: [
      'Provide an authentic collegiate platform to present engineering prototypes.',
      'Assess projects against industrial commercialization standards.',
      'Directly measure PO3 (Design/Development of Solutions) and PO10 (Communication).'
    ],
    rules: [
      'Each project team must demonstrate working hardware/software.',
      'Technical flex banner of standard 3ft x 4ft size mandatory.'
    ],
    schedule: [
      { time: '09:30 AM - 10:30 AM', activity: 'Inauguration & Keynote by Tech Lead' },
      { time: '10:30 AM - 01:30 PM', activity: 'Round 1: Jury Evaluation of Project Stalls' },
      { time: '02:30 PM - 04:00 PM', activity: 'Top 10 Finalist Presentations' },
      { time: '04:15 PM - 05:00 PM', activity: 'Valedictory & Announcement of Winners' }
    ],
    facultyCoordinator: {
      name: 'Dr. Pravin R. Chougule',
      designation: 'Associate Professor, CSE',
      email: 'pravin.chougule@dypcet.ac.in',
      phone: '+91 94238 65432'
    },
    studentCoordinator: {
      name: 'Afraaz Momin',
      year: 'TE CSE',
      phone: '+91 98220 12345',
      email: 'afraazmomin0709@gmail.com'
    },
    eligibility: 'Final Year and Pre-Final Year students from accredited engineering institutions.',
    outcome: {
      publishedDate: '2026-03-21',
      summary: 'TechnoCraft 2026 concluded with unprecedented collegiate engagement. 45 selected teams presented their innovations to a distinguished panel of 6 industry judges. 3 patents and 8 research paper drafts were initiated.',
      totalParticipants: 142,
      totalAttendees: 136,
      nbaPoAttainment: [
        'PO1: Engineering Knowledge - 88% Attainment',
        'PO3: Design and Development - 92% Attainment',
        'PO5: Modern Tool Usage - 85% Attainment',
        'PO10: Technical Communication - 94% Attainment'
      ],
      winners: [
        {
          position: '1st Place (Winner)',
          teamOrStudentName: 'Team AgriSense (Afraaz Momin, Ananya Deshmukh, Rohan Shinde)',
          prnOrCollege: 'DYPCET Kolhapur',
          prizeAmount: '₹15,000 + Trophy & Certificate of Excellence',
          projectName: 'AI-Powered Crop Disease Detection and Automated Drip Fertigation Drone'
        },
        {
          position: '2nd Place (1st Runner Up)',
          teamOrStudentName: 'Team MedSecure (Sneha Jadhav, Rohit More)',
          prnOrCollege: 'DYPCET Kolhapur',
          prizeAmount: '₹10,000 + Certificate of Excellence',
          projectName: 'Decentralized Patient Health Record Verification using Hyperledger Fabric'
        },
        {
          position: '3rd Place (2nd Runner Up)',
          teamOrStudentName: 'Team EcoFleet (Prathamesh Kulkarni, Vikram Mane)',
          prnOrCollege: 'WCE Sangli (Invited Participant)',
          prizeAmount: '₹5,000 + Certificate of Merit',
          projectName: 'Smart EV Battery Degradation Predictor with CAN-Bus Telemetry'
        }
      ],
      keyOutcomes: [
        '100% of teams presented live functional prototypes.',
        'Industry evaluators shortlisted 4 student teams for direct summer technical internships.',
        'Full documentation archived for NAAC Criteria 5.3 and NBA Criteria 8 accreditation compliance.'
      ],
      feedbackScore: 4.85
    }
  },
  {
    id: 'evt-202',
    title: 'Industry Connect: Cloud Native Microservices with Docker & Kubernetes',
    department: 'Data Science',
    category: 'Technical Workshop',
    academicYear: '2025-2026',
    startDate: '2026-02-14',
    endDate: '2026-02-15',
    time: '10:00 AM - 04:30 PM',
    venue: 'Data Science Lab 1',
    mode: 'Offline (Campus)',
    status: 'Outcomes Published',
    maxSeats: 70,
    registeredCount: 68,
    registrationDeadline: '2026-02-12',
    isRegistrationOpen: false,
    registrationFee: 0,
    bannerUrl: '/src/assets/images/event_hackathon_tech_1790870123705.jpg',
    shortDescription: 'Hands-on technical sprint on containerization, Pod orchestration, and Helm charts for distributed data analytics applications.',
    fullDescription: 'Two-day rigorous skill-development program conducted by Senior DevOps Consultant at Persistent Systems, Pune. Students containerized multi-tier web microservices and deployed Kubernetes clusters.',
    objectives: [
      'Master containerization principles using Dockerfiles and multi-stage builds.',
      'Deploy and scale stateless and stateful services on Kubernetes.',
      'Achieve PO5 (Modern Tool Usage).'
    ],
    rules: [
      'Docker Desktop / Linux environment required.',
      'Pre-requisite: Basic Linux terminal literacy and Git fundamentals.'
    ],
    schedule: [
      { time: '10:00 AM - 01:00 PM (Day 1)', activity: 'Linux Containers, Docker Architecture & Docker-Compose' },
      { time: '02:00 PM - 04:30 PM (Day 1)', activity: 'Multi-service deployment and volume persistent storage' },
      { time: '10:00 AM - 01:00 PM (Day 2)', activity: 'Kubernetes Pods, Services, Deployments & Ingress' },
      { time: '02:00 PM - 04:30 PM (Day 2)', activity: 'Cluster auto-scaling test and certification quiz' }
    ],
    facultyCoordinator: {
      name: 'Dr. A. B. Joshi',
      designation: 'Associate Professor, Data Science',
      email: 'ab.joshi@dypcet.ac.in',
      phone: '+91 94220 76543'
    },
    studentCoordinator: {
      name: 'Prathamesh Kulkarni',
      year: 'TE DS',
      phone: '+91 98811 23456',
      email: 'prathamesh.k@dypcet.ac.in'
    },
    eligibility: 'SE & TE Data Science and CSE students.',
    outcome: {
      publishedDate: '2026-02-16',
      summary: '64 students successfully passed the deployment competency test at the end of Day 2. Verified digital certificates with QR verification were issued to all participants.',
      totalParticipants: 68,
      totalAttendees: 64,
      nbaPoAttainment: [
        'PO5: Modern Tool Usage - 95% Attainment',
        'PO1: Engineering Knowledge - 90% Attainment'
      ],
      winners: [
        {
          position: 'Special Mention',
          teamOrStudentName: 'Prathamesh Suresh Kulkarni',
          prnOrCollege: 'DYPCET Kolhapur',
          projectName: 'High-Throughput Dockerized Kafka Pipeline Deployment'
        }
      ],
      keyOutcomes: [
        '64 students successfully deployed clusters and container pipelines.',
        'Average post-workshop competency score improved from 38% to 89%.'
      ],
      feedbackScore: 4.9
    }
  },
  {
    id: 'evt-203',
    title: 'Alumni Insight: Transitioning from Engineering to Tech Leadership',
    department: 'Mechanical Engineering',
    category: 'Alumni Connect',
    academicYear: '2025-2026',
    startDate: '2026-01-28',
    endDate: '2026-01-28',
    time: '02:00 PM - 04:00 PM',
    venue: 'Mechanical Seminar Hall & Google Meet',
    mode: 'Hybrid',
    status: 'Outcomes Published',
    maxSeats: 120,
    registeredCount: 110,
    registrationDeadline: '2026-01-26',
    isRegistrationOpen: false,
    registrationFee: 0,
    bannerUrl: '/src/assets/images/hero_campus_dypcet_1790870101738.jpg',
    shortDescription: 'Distinguished alumni interaction session with Mr. Sameer Bhosale (Director of Engineering, John Deere, Batch of 2004).',
    fullDescription: 'Insightful leadership dialogue focusing on modern manufacturing paradigms, Industry 4.0 automation, global supply chain resilience, and career advancement strategies for core engineering students.',
    objectives: [
      'Connect undergraduate students with prominent global alumni.',
      'Discuss industry expectations in automotive & automated machinery.',
      'Fulfill PO8 (Ethics) and PO12 (Life-Long Learning).'
    ],
    rules: [
      'Students must prepare one targeted technical question prior to session.'
    ],
    schedule: [
      { time: '02:00 PM - 02:15 PM', activity: 'Welcome address by HOD Mechanical' },
      { time: '02:15 PM - 03:15 PM', activity: 'Alumni Address: 20 Years in Tech Leadership' },
      { time: '03:15 PM - 03:50 PM', activity: 'Interactive Open Mic Q&A with Students' },
      { time: '03:50 PM - 04:00 PM', activity: 'Felicitation and Closing' }
    ],
    facultyCoordinator: {
      name: 'Prof. V. V. Mangave',
      designation: 'Associate Professor, Mechanical',
      email: 'vv.mangave@dypcet.ac.in',
      phone: '+91 98226 77889'
    },
    studentCoordinator: {
      name: 'Sneha Jadhav',
      year: 'BE Mechanical',
      phone: '+91 91580 94821',
      email: 'sneha.jadhav@dypcet.ac.in'
    },
    eligibility: 'All Mechanical Engineering students and alumni.',
    outcome: {
      publishedDate: '2026-01-29',
      summary: 'Over 100 students attended in-person with 40+ alumni joining online. 5 student final year capstone projects received direct industry sponsorship leads from John Deere.',
      totalParticipants: 110,
      totalAttendees: 104,
      nbaPoAttainment: [
        'PO8: Professional Ethics - 91% Attainment',
        'PO12: Life-Long Learning - 96% Attainment'
      ],
      winners: [],
      keyOutcomes: [
        '5 capstone industry project leads established.',
        'Mentorship network of 12 alumni active for TE & BE students.'
      ],
      feedbackScore: 4.92
    }
  }
];

export const INITIAL_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: 'reg-001',
    eventId: 'evt-101',
    eventTitle: 'CodeSpark 2026: National 24-Hour Hackathon',
    department: 'Computer Science & Engineering',
    eventDate: '2026-10-18',
    eventVenue: 'Central Advanced Computing Lab & Seminar Hall 1',
    studentId: 'std-1',
    studentName: 'Afraaz Momin',
    studentPrn: '2023058001',
    studentEmail: 'afraazmomin0709@gmail.com',
    studentPhone: '+91 98220 12345',
    studentYear: 'TE',
    studentDept: 'Computer Science & Engineering',
    registrationDate: '2026-10-01',
    isTeamRegistration: true,
    teamName: 'CyberKnights DYPCET',
    teamMembers: ['Afraaz Momin (Lead)', 'Ananya Deshmukh', 'Rohan Shinde'],
    attendanceStatus: 'Registered',
    certificateIssued: false,
    ticketCode: 'DYP-CSP-8001'
  },
  {
    id: 'reg-002',
    eventId: 'evt-103',
    eventTitle: 'Generative AI & LLM Systems Hands-On Masterclass',
    department: 'Artificial Intelligence & Machine Learning',
    eventDate: '2026-11-04',
    eventVenue: 'Seminar Hall 2 & Cloud Computing Centre',
    studentId: 'std-1',
    studentName: 'Afraaz Momin',
    studentPrn: '2023058001',
    studentEmail: 'afraazmomin0709@gmail.com',
    studentPhone: '+91 98220 12345',
    studentYear: 'TE',
    studentDept: 'Computer Science & Engineering',
    registrationDate: '2026-10-02',
    isTeamRegistration: false,
    attendanceStatus: 'Registered',
    certificateIssued: false,
    ticketCode: 'DYP-GAI-8002'
  },
  {
    id: 'reg-003',
    eventId: 'evt-201',
    eventTitle: 'TechnoCraft 2026: Annual State-Level Project Exhibition',
    department: 'Computer Science & Engineering',
    eventDate: '2026-03-20',
    eventVenue: 'DYPCET Main Central Auditorium & Courtyard',
    studentId: 'std-1',
    studentName: 'Afraaz Momin',
    studentPrn: '2023058001',
    studentEmail: 'afraazmomin0709@gmail.com',
    studentPhone: '+91 98220 12345',
    studentYear: 'TE',
    studentDept: 'Computer Science & Engineering',
    registrationDate: '2026-03-10',
    isTeamRegistration: true,
    teamName: 'Team AgriSense',
    teamMembers: ['Afraaz Momin', 'Ananya Deshmukh', 'Rohan Shinde'],
    attendanceStatus: 'Attended',
    certificateIssued: true,
    certificateId: 'DYP-CERT-TC-2026-001',
    ticketCode: 'DYP-TCR-8001'
  },
  {
    id: 'reg-004',
    eventId: 'evt-202',
    eventTitle: 'Industry Connect: Cloud Native Microservices with Docker & Kubernetes',
    department: 'Data Science',
    eventDate: '2026-02-14',
    eventVenue: 'Data Science Lab 1',
    studentId: 'std-5',
    studentName: 'Prathamesh Suresh Kulkarni',
    studentPrn: '2023057819',
    studentEmail: 'prathamesh.k@dypcet.ac.in',
    studentPhone: '+91 98811 23456',
    studentYear: 'TE',
    studentDept: 'Data Science',
    registrationDate: '2026-02-05',
    isTeamRegistration: false,
    attendanceStatus: 'Attended',
    certificateIssued: true,
    certificateId: 'DYP-CERT-CNM-2026-042',
    ticketCode: 'DYP-CNM-7819'
  },
  {
    id: 'reg-005',
    eventId: 'evt-101',
    eventTitle: 'CodeSpark 2026: National 24-Hour Hackathon',
    department: 'Computer Science & Engineering',
    eventDate: '2026-10-18',
    eventVenue: 'Central Advanced Computing Lab & Seminar Hall 1',
    studentId: 'std-2',
    studentName: 'Ananya Rahul Deshmukh',
    studentPrn: '2023059104',
    studentEmail: 'ananya.deshmukh@dypcet.ac.in',
    studentPhone: '+91 97654 32190',
    studentYear: 'TE',
    studentDept: 'Artificial Intelligence & Machine Learning',
    registrationDate: '2026-10-01',
    isTeamRegistration: true,
    teamName: 'CyberKnights DYPCET',
    teamMembers: ['Aarav Patil (Lead)', 'Ananya Deshmukh', 'Rohan Shinde'],
    attendanceStatus: 'Registered',
    certificateIssued: false,
    ticketCode: 'DYP-CSP-9104'
  },
  {
    id: 'reg-006',
    eventId: 'evt-102',
    eventTitle: 'RoboTrack 2026: Autonomous Robotics & Embedded Systems Challenge',
    department: 'Electronics & Telecommunication',
    eventDate: '2026-10-24',
    eventVenue: 'E&TC Robotics Lab & Open Arena',
    studentId: 'std-3',
    studentName: 'Rohan Vikram Shinde',
    studentPrn: '2024061203',
    studentEmail: 'rohan.shinde@dypcet.ac.in',
    studentPhone: '+91 94220 18456',
    studentYear: 'SE',
    studentDept: 'Electronics & Telecommunication',
    registrationDate: '2026-10-03',
    isTeamRegistration: false,
    attendanceStatus: 'Registered',
    certificateIssued: false,
    ticketCode: 'DYP-ROB-1203'
  },
  {
    id: 'reg-007',
    eventId: 'evt-203',
    eventTitle: 'Alumni Insight: Transitioning from Engineering to Tech Leadership',
    department: 'Mechanical Engineering',
    eventDate: '2026-01-28',
    eventVenue: 'Mechanical Seminar Hall & Google Meet',
    studentId: 'std-4',
    studentName: 'Sneha Mahesh Jadhav',
    studentPrn: '2022045612',
    studentEmail: 'sneha.jadhav@dypcet.ac.in',
    studentPhone: '+91 91580 94821',
    studentYear: 'BE',
    studentDept: 'Mechanical Engineering',
    registrationDate: '2026-01-20',
    isTeamRegistration: false,
    attendanceStatus: 'Attended',
    certificateIssued: true,
    certificateId: 'DYP-CERT-ALU-2026-088',
    ticketCode: 'DYP-ALU-5612'
  }
];

export const COLLEGE_INFO = {
  name: 'D Y Patil College of Engineering and Technology',
  location: 'Kasaba Bawada, Kolhapur - 416006, Maharashtra, India',
  established: 1984,
  accreditation: "NAAC 'A' Grade Accredited | Approved by AICTE, New Delhi | Affiliated to Shivaji University, Kolhapur",
  campusCode: 'EN-6250',
  principal: 'Dr. A. N. Raykar',
  deanAcademics: 'Prof. Smita K. Mane',
  website: 'https://coek.dypgroup.edu.in',
  phone: '+91 231 2601431 / 33',
  email: 'eventmate@dypcet.ac.in'
};

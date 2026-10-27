export const SQL_SCHEMA = `-- =====================================================================
-- EventMate: Centralized Departmental Event Management System
-- College: D Y Patil College of Engineering and Technology, Kolhapur
-- Database: MySQL / MariaDB (XAMPP / phpMyAdmin compatible)
-- =====================================================================

CREATE DATABASE IF NOT EXISTS \`eventmate_dypcet\` 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE \`eventmate_dypcet\`;

-- 1. Departments Table
CREATE TABLE IF NOT EXISTS \`departments\` (
  \`dept_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`dept_code\` VARCHAR(20) NOT NULL UNIQUE,
  \`dept_name\` VARCHAR(150) NOT NULL,
  \`hod_name\` VARCHAR(120),
  \`hod_email\` VARCHAR(120)
) ENGINE=InnoDB;

INSERT INTO \`departments\` (\`dept_code\`, \`dept_name\`, \`hod_name\`, \`hod_email\`) VALUES
('CSE', 'Computer Science & Engineering', 'Dr. Pravin R. Chougule', 'hod.cse@dypcet.ac.in'),
('AIML', 'Artificial Intelligence & Machine Learning', 'Dr. Vaishali S. Mane', 'hod.aiml@dypcet.ac.in'),
('DS', 'Data Science', 'Dr. A. B. Joshi', 'hod.ds@dypcet.ac.in'),
('ETC', 'Electronics & Telecommunication', 'Prof. S. M. Hirikude', 'hod.etc@dypcet.ac.in'),
('MECH', 'Mechanical Engineering', 'Prof. V. V. Mangave', 'hod.mech@dypcet.ac.in'),
('CIVIL', 'Civil Engineering', 'Prof. R. G. Banne', 'hod.civil@dypcet.ac.in'),
('CHEM', 'Chemical Engineering', 'Dr. K. T. Jadhav', 'hod.chem@dypcet.ac.in'),
('FY', 'First Year Engineering (GSH)', 'Dr. S. B. Patil', 'hod.fe@dypcet.ac.in');

-- 2. Students Table
CREATE TABLE IF NOT EXISTS \`students\` (
  \`student_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`prn\` VARCHAR(20) NOT NULL UNIQUE,
  \`full_name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`department_id\` INT NOT NULL,
  \`academic_year_class\` ENUM('FE', 'SE', 'TE', 'BE') NOT NULL,
  \`division\` VARCHAR(10) NOT NULL,
  \`roll_no\` VARCHAR(20) NOT NULL,
  \`phone_number\` VARCHAR(20) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`dept_id\`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 3. Faculty Coordinators & Administrators
CREATE TABLE IF NOT EXISTS \`admin_users\` (
  \`admin_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`faculty_id\` VARCHAR(30) NOT NULL UNIQUE,
  \`full_name\` VARCHAR(150) NOT NULL,
  \`email\` VARCHAR(150) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`designation\` VARCHAR(100) NOT NULL,
  \`department_id\` INT,
  \`role\` ENUM('admin', 'faculty_coordinator', 'hod', 'dean') DEFAULT 'faculty_coordinator',
  \`phone\` VARCHAR(20),
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`dept_id\`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. Events Table
CREATE TABLE IF NOT EXISTS \`events\` (
  \`event_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`department_id\` INT NOT NULL,
  \`category\` VARCHAR(80) NOT NULL,
  \`academic_year\` VARCHAR(20) NOT NULL,
  \`start_date\` DATE NOT NULL,
  \`end_date\` DATE,
  \`time_slot\` VARCHAR(80) NOT NULL,
  \`venue\` VARCHAR(200) NOT NULL,
  \`mode\` ENUM('Offline (Campus)', 'Online', 'Hybrid') DEFAULT 'Offline (Campus)',
  \`status\` ENUM('Draft', 'Upcoming', 'Ongoing', 'Completed', 'Outcomes Published') DEFAULT 'Upcoming',
  \`max_seats\` INT NOT NULL DEFAULT 100,
  \`registered_count\` INT NOT NULL DEFAULT 0,
  \`registration_deadline\` DATE NOT NULL,
  \`is_registration_open\` TINYINT(1) DEFAULT 1,
  \`registration_fee\` DECIMAL(10,2) DEFAULT 0.00,
  \`banner_url\` VARCHAR(255),
  \`short_description\` TEXT,
  \`full_description\` LONGTEXT,
  \`objectives\` JSON,
  \`rules\` JSON,
  \`schedule\` JSON,
  \`faculty_coordinator_name\` VARCHAR(120),
  \`faculty_coordinator_phone\` VARCHAR(30),
  \`student_coordinator_name\` VARCHAR(120),
  \`student_coordinator_phone\` VARCHAR(30),
  \`eligibility\` VARCHAR(255),
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`department_id\`) REFERENCES \`departments\`(\`dept_id\`) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- 5. Registrations Table
CREATE TABLE IF NOT EXISTS \`registrations\` (
  \`reg_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`event_id\` INT NOT NULL,
  \`student_id\` INT NOT NULL,
  \`ticket_code\` VARCHAR(40) NOT NULL UNIQUE,
  \`registration_date\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  \`is_team\` TINYINT(1) DEFAULT 0,
  \`team_name\` VARCHAR(120),
  \`team_members\` JSON,
  \`attendance_status\` ENUM('Registered', 'Attended', 'Absent') DEFAULT 'Registered',
  \`attended_at\` DATETIME NULL,
  \`certificate_issued\` TINYINT(1) DEFAULT 0,
  \`certificate_id\` VARCHAR(80) NULL,
  FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`event_id\`) ON DELETE CASCADE,
  FOREIGN KEY (\`student_id\`) REFERENCES \`students\`(\`student_id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Event Outcomes & Results Table
CREATE TABLE IF NOT EXISTS \`event_outcomes\` (
  \`outcome_id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`event_id\` INT NOT NULL UNIQUE,
  \`published_date\` DATE NOT NULL,
  \`summary\` LONGTEXT NOT NULL,
  \`total_participants\` INT NOT NULL,
  \`total_attendees\` INT NOT NULL,
  \`nba_po_attainment\` JSON,
  \`winners\` JSON,
  \`key_outcomes\` JSON,
  \`feedback_score\` DECIMAL(3,2) DEFAULT 4.50,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`event_id\`) REFERENCES \`events\`(\`event_id\`) ON DELETE CASCADE
) ENGINE=InnoDB;
`;

export const PHP_SAMPLE_CODE = {
  db_config: `<?php
// db_config.php - Central MySQL Database Connection for EventMate
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

$host = 'localhost';
$db   = 'eventmate_dypcet';
$user = 'root';
$pass = ''; // Default XAMPP password is blank
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\\PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
?>`,
  register_event: `<?php
// api/register_event.php - Student Registration for Department Event
require_once '../db_config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['event_id']) || !isset($data['student_id'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Missing required fields']);
    exit;
}

$eventId   = (int)$data['event_id'];
$studentId = (int)$data['student_id'];
$isTeam    = !empty($data['is_team']) ? 1 : 0;
$teamName  = $data['team_name'] ?? null;
$teamJson  = !empty($data['team_members']) ? json_encode($data['team_members']) : null;
$ticketCode = 'DYP-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));

// Check if already registered
$stmt = $pdo->prepare("SELECT reg_id FROM registrations WHERE event_id = ? AND student_id = ?");
$stmt->execute([$eventId, $studentId]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(['status' => 'error', 'message' => 'Student is already registered for this event']);
    exit;
}

// Check seat limit
$stmt = $pdo->prepare("SELECT max_seats, registered_count, is_registration_open FROM events WHERE event_id = ?");
$stmt->execute([$eventId]);
$event = $stmt->fetch();

if (!$event || !$event['is_registration_open'] || $event['registered_count'] >= $event['max_seats']) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Registration is closed or event is fully booked']);
    exit;
}

// Insert registration
$pdo->beginTransaction();
try {
    $ins = $pdo->prepare("INSERT INTO registrations 
        (event_id, student_id, ticket_code, is_team, team_name, team_members, attendance_status) 
        VALUES (?, ?, ?, ?, ?, ?, 'Registered')");
    $ins->execute([$eventId, $studentId, $ticketCode, $isTeam, $teamName, $teamJson]);

    // Update count
    $upd = $pdo->prepare("UPDATE events SET registered_count = registered_count + 1 WHERE event_id = ?");
    $upd->execute([$eventId]);

    $pdo->commit();
    echo json_encode([
        'status' => 'success',
        'message' => 'Registration successful',
        'ticket_code' => $ticketCode
    ]);
} catch (Exception $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
}
?>`,
  mark_attendance: `<?php
// api/mark_attendance.php - Admin Mark Participant Attendance
require_once '../db_config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['reg_id']) || !isset($data['status'])) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid parameters']);
    exit;
}

$regId = (int)$data['reg_id'];
$status = in_array($data['status'], ['Attended', 'Absent', 'Registered']) ? $data['status'] : 'Registered';
$attendedAt = ($status === 'Attended') ? date('Y-m-d H:i:s') : null;
$certificateId = ($status === 'Attended') ? ('DYP-CERT-' . date('Y') . '-' . str_pad($regId, 4, '0', STR_PAD_LEFT)) : null;
$certIssued = ($status === 'Attended') ? 1 : 0;

$stmt = $pdo->prepare("UPDATE registrations 
    SET attendance_status = ?, attended_at = ?, certificate_issued = ?, certificate_id = ? 
    WHERE reg_id = ?");
$stmt->execute([$status, $attendedAt, $certIssued, $certificateId, $regId]);

echo json_encode([
    'status' => 'success',
    'message' => 'Attendance status updated',
    'certificate_id' => $certificateId
]);
?>`
};

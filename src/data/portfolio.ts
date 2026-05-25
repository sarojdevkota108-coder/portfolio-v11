// ─── NAVIGATION ──────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'About',            href: '#about' },
  { label: 'Interior Design',  href: '#design' },
  { label: 'Web Development',  href: '#webdev' },
  { label: 'Networking',       href: '#networking' },
  { label: 'Achievements',     href: '#achievements' },
  { label: 'Certifications',   href: '#certifications' },
  { label: 'Contact',          href: '#contact' },
]

// ─── HERO METRICS ────────────────────────────────────────────────────────────
export const METRICS = [
  { num: '3',  suffix: '',  label: 'Professions' },
  { num: '10', suffix: '+', label: 'Technologies' },
  { num: '5',  suffix: '+', label: 'Projects' },
  { num: '40', suffix: '+', label: 'People Trained' },
]

// ─── SOCIAL LINKS ────────────────────────────────────────────────────────────
export const SOCIALS = {
  github:    'https://github.com/Saroj058',
  linkedin:  'https://www.linkedin.com/in/saroj-devkota/',
  instagram: 'https://www.instagram.com/__saroj_058__/',
  email:     'mailto:Saroj.devkota666@gmail.com',
}

// ─── TECH STACK MARQUEE ──────────────────────────────────────────────────────
export const MARQUEE_ITEMS = [
  'Python', 'Django', 'React', 'Next.js', 'TypeScript', 'JavaScript',
  'TCP/IP', 'Cisco', 'AWS', 'VLANs', 'Docker', 'PostgreSQL',
  'AutoCAD', '3D Viz', 'Git', 'Linux', 'REST API', 'Node.js',
]

// ─── ABOUT SKILLS ────────────────────────────────────────────────────────────
export const SKILL_GROUPS = [
  {
    title: 'Web & Software',
    color: 'cyan',
    tags: ['Python', 'Django', 'JavaScript', 'React', 'HTML/CSS', 'SQL', 'REST APIs'],
  },
  {
    title: 'Networking & Cloud',
    color: 'blue',
    tags: ['TCP/IP', 'VLANs', 'NAT', 'Cisco', 'AWS', 'DNS/DHCP', 'Firewalls'],
  },
  {
    title: 'Interior Design',
    color: 'green',
    tags: ['AutoCAD', '3D Visualization', 'Space Planning', 'Lighting Design', 'Material Selection'],
  },
  {
    title: 'Tools & Platforms',
    color: 'amber',
    tags: ['Git', 'Linux', 'Packet Tracer', 'VS Code', 'Docker', 'AI/ML'],
  },
]

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
export type Project = {
  id: string
  badge: string
  title: string
  description: string
  stack: string[]
  color: string
  featured: boolean
  live?: string
  github?: string
  youtubeId?: string
  posterImage?: string
  metrics: { label: string; value: string }[]
  features: string[]
}

export const PROJECTS: Project[] = [
  {
    id: 'donation-system',
    badge: 'Final Year Project',
    title: 'Donation & Volunteer Management System',
    description:
      'Full-stack Django application streamlining donations, volunteer coordination, and organizational management with role-based access control and real-time dashboards.',
    stack: ['Django', 'Python', 'JavaScript', 'HTML/CSS', 'SQL', 'RBAC'],
    color: 'blue',
    featured: true,
    live: 'https://donvolproject.onrender.com',
    posterImage: '/images/donation-poster.png',
    metrics: [
      { label: 'Users Supported', value: '200+' },
      { label: 'Modules', value: '6' },
      { label: 'System Reliability', value: '99%' },
    ],
    features: [
      'Role-Based Access Control (Admin / Volunteer / Donor)',
      'Real-Time Donation Tracking & Analytics Dashboard',
      'Volunteer Registration & Task Assignment',
      'Secure Authentication with Django Auth',
      'Database-Driven Report Generation',
      'Fully Responsive UI',
    ],
  },
  {
    id: 'iot-obstacle-robot',
    badge: 'IoT · Robotics',
    title: 'IoT Obstacle-Avoiding Robot',
    description:
      'Built an IoT-enabled mobile robot with ultrasonic sensing, obstacle avoidance, and remote monitoring. Watch the live demo below showing autonomous navigation through a testing course.',
    stack: ['Arduino', 'IoT', 'Ultrasonic Sensors', 'C/C++', 'MQTT'],
    color: 'cyan',
    featured: false,
    youtubeId: 'Vpn82UM27Qo',
    metrics: [
      { label: 'Obstacle Avoidance', value: 'Autonomous' },
      { label: 'Sensors', value: 'Ultrasonic + IR' },
      { label: 'Demo', value: 'YouTube' },
    ],
    features: [
      'Autonomous obstacle detection and avoidance',
      'IoT telemetry for remote status monitoring',
      'Real-time sensor fusion with ultrasonic and infrared arrays',
      'Compact Arduino-based mobile robotics platform',
      'YouTube demo of robot navigating a test course',
    ],
  },
  {
    id: 'ai-models',
    badge: 'AI · Machine Learning',
    title: 'AI Image & Text Models',
    description:
      'Developed two machine learning models from scratch: a CNN-based car logo image detection system that classifies brand logos from images, and an RNN-based text conversion model for sequence-to-sequence text processing.',
    stack: ['Python', 'TensorFlow', 'CNN', 'RNN', 'Keras', 'NumPy', 'OpenCV'],
    color: 'violet',
    featured: false,
    posterImage: '/images/neural_network.jpeg',
    metrics: [
      { label: 'CNN Model', value: 'Car Logos' },
      { label: 'RNN Model', value: 'Text Convert' },
      { label: 'Framework', value: 'TensorFlow' },
    ],
    features: [
      'CNN model for car logo image detection & brand classification',
      'RNN model for text sequence conversion and processing',
      'Custom training pipelines with data augmentation',
      'Model evaluation with accuracy & loss metrics',
      'Built using TensorFlow / Keras with Python',
    ],
  },
]

// ─── ACHIEVEMENTS ────────────────────────────────────────────────────────────
export const ACHIEVEMENTS: {
  id: string
  category: string
  color: string
  icon: string
  title: string
  org: string
  year: string
  description: string
  tag: string
}[] = [
  // Placeholder — Saroj will populate these
]

// ─── NETWORKING SKILLS ────────────────────────────────────────────────────────
export const NET_SKILLS = [
  'TCP/IP', 'DHCP', 'DNS', 'NAT', 'VLAN Configuration',
  'Routing & Switching', 'IP Addressing & Subnetting',
  'LAN/WAN Design', 'OSI Model', 'ARP & ICMP Analysis',
  'Cisco Packet Tracer', 'Enterprise Network Architecture',
  'Firewall Simulation', 'Hierarchical Network Design', 'WAN Protocols',
]

// ─── NET TOPOLOGY NODES ───────────────────────────────────────────────────────
export const TOPOLOGY_NODES = {
  tokyo: [
    { id: 'tk-sw',  label: 'L2 Switch',   x: 80,  y: 60,  color: '#8080a0' },
    { id: 'tk-vl',  label: 'L3/VLAN',     x: 80,  y: 100, color: '#8080a0' },
    { id: 'tk-fw',  label: 'Firewall',    x: 80,  y: 140, color: '#ffaa00' },
    { id: 'tk-rt',  label: 'Router',      x: 80,  y: 180, color: '#4f7fff' },
  ],
  nyc: [
    { id: 'ny-sw',  label: 'L2 Switch',   x: 560, y: 60,  color: '#8080a0' },
    { id: 'ny-vl',  label: 'L3/VLAN',     x: 560, y: 100, color: '#8080a0' },
    { id: 'ny-fw',  label: 'Firewall',    x: 560, y: 140, color: '#ffaa00' },
    { id: 'ny-rt',  label: 'Router',      x: 560, y: 180, color: '#4f7fff' },
  ],
}

// ─── INTERIOR DESIGN ─────────────────────────────────────────────────────────
export const INTERIOR_FLOORS = [
  {
    floor: 1,
    label: 'Ground Floor',
    rooms: ['Living Room', 'Kitchen', 'Dining Area', 'Guest Bathroom', 'Utility'],
    description: 'Open-plan social living with integrated kitchen and dining under natural light.',
    palette: ['#C8A882', '#F5F0E8', '#2C2C2C', '#8B7355'],
  },
  {
    floor: 2,
    label: 'First Floor',
    rooms: ['Master Bedroom', 'En-suite', 'Walk-in Wardrobe', 'Study'],
    description: 'Private sanctuary with luxury en-suite and integrated workspace.',
    palette: ['#E8DDD0', '#4A4A4A', '#B8A090', '#D4C4B0'],
  },
  {
    floor: 3,
    label: 'Top Floor',
    rooms: ['Guest Bedroom', 'Family Lounge', 'Terrace', 'Storage'],
    description: 'Light-filled retreat with rooftop terrace and panoramic views.',
    palette: ['#F0EDE8', '#6B8B6B', '#C0B8A8', '#E8E0D0'],
  },
]

// ─── CERTIFICATIONS ──────────────────────────────────────────────────────────
export const CERTIFICATIONS = [
  { name: 'Cloud Practitioner Essentials', issuer: 'Amazon Web Services', year: '2024', status: 'done',     color: 'amber' },
  { name: 'Networking Basics',             issuer: 'Cisco',               year: '2024', status: 'done',     color: 'blue' },
  { name: 'Cisco Packet Tracer',           issuer: 'Cisco',               year: '2024', status: 'done',     color: 'blue' },
  { name: 'Linux Unhatched',               issuer: 'NDG / Cisco',         year: '2024', status: 'done',     color: 'green' },
  { name: 'Django Web Development',        issuer: 'Various',             year: '2024', status: 'done',     color: 'green' },
  { name: 'Microsoft Excel',               issuer: 'Simplilearn',         year: '2024', status: 'done',     color: 'green' },
  { name: 'Solutions Architect (SAA-C03)', issuer: 'Amazon Web Services', year: '2024–25', status: 'prog',  color: 'amber' },
  { name: 'CCNA',                          issuer: 'Cisco',               year: '2024–25', status: 'prog',  color: 'blue' },
  { name: 'Advanced Django & React',       issuer: 'Target 2025',         year: '2025', status: 'upcoming', color: 'violet' },
  { name: 'Cloud Engineering',             issuer: 'Target 2025',         year: '2025', status: 'upcoming', color: 'violet' },
  { name: 'REST API Specialization',       issuer: 'Target 2025',         year: '2025', status: 'upcoming', color: 'cyan' },
]

// ─── VOLUNTEER TIMELINE ───────────────────────────────────────────────────────
export const VOLUNTEER_ITEMS = [
  {
    year: '2023',
    title: 'Cyber Security Awareness Trainer',
    org: 'Technology Education Initiative · Kathmandu',
    description: 'Delivered hands-on cybersecurity training covering digital hygiene, phishing prevention, and safe online practices to local community members.',
    tag: '40+ individuals trained',
    color: 'cyan',
    icon: 'shield',
  },
  {
    year: '2023',
    title: 'Breast Cancer Awareness Volunteer',
    org: 'Healthcare Community Initiative',
    description: 'Participated in awareness campaigns focused on early detection and community education across local neighbourhoods.',
    tag: 'Healthcare',
    color: 'rose',
    icon: 'heart',
  },
  {
    year: '2022–Present',
    title: 'Educational Tutoring Volunteer',
    org: 'Academic Support Programme',
    description: 'Free tutoring in mathematics, computing, and science to students from underserved backgrounds.',
    tag: 'Education · Mentorship',
    color: 'green',
    icon: 'school',
  },
  {
    year: 'Ongoing',
    title: 'Public Speaking & Leadership Development',
    org: 'Community Leadership Programmes',
    description: 'Active participation in workshops and leadership programmes developing communication and organisational skills.',
    tag: 'Leadership',
    color: 'amber',
    icon: 'microphone',
  },
]

// ─── SKILLS MATRIX ────────────────────────────────────────────────────────────
export const SKILLS_MATRIX = [
  {
    category: 'Frontend',
    color: 'cyan',
    items: [
      { name: 'React / Next.js', tag: 'Proficient' },
      { name: 'JavaScript / TypeScript', tag: 'Proficient' },
      { name: 'HTML5 / CSS3', tag: 'Advanced' },
      { name: 'Tailwind CSS', tag: 'Proficient' },
    ],
  },
  {
    category: 'Backend',
    color: 'blue',
    items: [
      { name: 'Python / Django', tag: 'Advanced' },
      { name: 'REST API Design', tag: 'Proficient' },
      { name: 'SQL / PostgreSQL', tag: 'Competent' },
      { name: 'Authentication & Auth', tag: 'Proficient' },
    ],
  },
  {
    category: 'Networking',
    color: 'amber',
    items: [
      { name: 'TCP/IP & Subnetting', tag: 'Proficient' },
      { name: 'Cisco / Packet Tracer', tag: 'Proficient' },
      { name: 'VLANs / Routing', tag: 'Competent' },
      { name: 'Firewalls / Security', tag: 'Competent' },
    ],
  },
  {
    category: 'Interior Design',
    color: 'green',
    items: [
      { name: 'Space Planning', tag: 'Proficient' },
      { name: '3D Visualization', tag: 'Proficient' },
      { name: 'AutoCAD', tag: 'Competent' },
      { name: 'Lighting Design', tag: 'Competent' },
    ],
  },
]

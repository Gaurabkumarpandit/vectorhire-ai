// VectorHire Mock Data

export const studentProfile = {
  name: "Alex Chen",
  role: "Full-Stack Engineer",
  verifiedScore: 94,
  readinessPercent: 87,
  marketDemand: "High",
  futureReadinessIndex: 91,
  salaryRange: { min: 145000, max: 185000, currency: "USD" },
  location: "San Francisco, CA",
  avatar: "AC",
  completedAssessments: 7,
  totalAssessments: 10,
};

export const skillRadarData = [
  { skill: "React / Next.js", score: 96, fullScore: 100 },
  { skill: "Node.js", score: 88, fullScore: 100 },
  { skill: "System Design", score: 82, fullScore: 100 },
  { skill: "TypeScript", score: 94, fullScore: 100 },
  { skill: "Cloud (AWS)", score: 76, fullScore: 100 },
  { skill: "AI/ML Basics", score: 71, fullScore: 100 },
];

export const skillGapData = [
  { skill: "Distributed Systems", current: 62, target: 85, priority: "High" },
  { skill: "Kubernetes", current: 45, target: 80, priority: "Medium" },
  { skill: "LLM Integration", current: 55, target: 90, priority: "High" },
  { skill: "Rust", current: 30, target: 65, priority: "Low" },
  { skill: "Data Engineering", current: 58, target: 78, priority: "Medium" },
];

export const marketDemandTrend = [
  { month: "Sep", demand: 72, salary: 142 },
  { month: "Oct", demand: 76, salary: 148 },
  { month: "Nov", demand: 80, salary: 152 },
  { month: "Dec", demand: 78, salary: 155 },
  { month: "Jan", demand: 85, salary: 160 },
  { month: "Feb", demand: 89, salary: 168 },
  { month: "Mar", demand: 94, salary: 175 },
];

export const learningRoadmap = [
  {
    id: 1,
    title: "Distributed Systems Fundamentals",
    duration: "3 weeks",
    impact: "+12 score",
    status: "in_progress",
    category: "Architecture",
  },
  {
    id: 2,
    title: "LLM API Integration Mastery",
    duration: "2 weeks",
    impact: "+18 score",
    status: "recommended",
    category: "AI/ML",
  },
  {
    id: 3,
    title: "Kubernetes & Container Orchestration",
    duration: "4 weeks",
    impact: "+15 score",
    status: "pending",
    category: "DevOps",
  },
  {
    id: 4,
    title: "Advanced System Design Patterns",
    duration: "5 weeks",
    impact: "+22 score",
    status: "pending",
    category: "Architecture",
  },
];

export const assessmentChallenges = [
  {
    id: 1,
    title: "Build a Real-time Chat API",
    category: "Node.js / WebSockets",
    difficulty: "Advanced",
    duration: "45 min",
    score: 96,
    status: "completed",
    description:
      "Design and implement a scalable WebSocket-based chat API with Redis pub/sub for horizontal scaling.",
  },
  {
    id: 2,
    title: "React State Architecture",
    category: "React / TypeScript",
    difficulty: "Intermediate",
    duration: "30 min",
    score: 91,
    status: "completed",
    description:
      "Refactor a complex stateful React component tree using context, reducers, and proper TypeScript generics.",
  },
  {
    id: 3,
    title: "Database Query Optimization",
    category: "PostgreSQL",
    difficulty: "Advanced",
    duration: "40 min",
    score: null,
    status: "available",
    description:
      "Identify and fix N+1 query issues, add proper indexes, and write optimized CTEs for complex aggregations.",
  },
  {
    id: 4,
    title: "System Design: URL Shortener",
    category: "System Design",
    difficulty: "Expert",
    duration: "60 min",
    score: null,
    status: "locked",
    description:
      "Design a globally distributed URL shortener handling 100M requests/day with analytics.",
  },
];

export const candidates = [
  {
    id: 1,
    name: "Alex Chen",
    role: "Full-Stack Engineer",
    verifiedScore: 94,
    matchScore: 97,
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    readiness: 91,
    location: "San Francisco, CA",
    avatar: "AC",
    status: "Available",
    topSkill: "React / Next.js",
    aiNote: "Exceptional system design thinking. 96th percentile in async problem solving.",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "ML Engineer",
    verifiedScore: 91,
    matchScore: 94,
    skills: ["Python", "PyTorch", "LLMs", "MLOps"],
    readiness: 88,
    location: "New York, NY",
    avatar: "PS",
    status: "Open to offers",
    topSkill: "LLM Integration",
    aiNote: "Strong production ML background. Led 3 model deployments at scale.",
  },
  {
    id: 3,
    name: "Marcus Webb",
    role: "Platform Engineer",
    verifiedScore: 89,
    matchScore: 91,
    skills: ["Kubernetes", "Go", "Terraform", "GCP"],
    readiness: 85,
    location: "Austin, TX",
    avatar: "MW",
    status: "Available",
    topSkill: "Kubernetes",
    aiNote: "Infrastructure expert. Reduced deployment time by 60% in last simulation.",
  },
  {
    id: 4,
    name: "Yuki Tanaka",
    role: "Frontend Engineer",
    verifiedScore: 87,
    matchScore: 88,
    skills: ["React", "Vue", "CSS Architecture", "Performance"],
    readiness: 82,
    location: "Remote",
    avatar: "YT",
    status: "Interviewing",
    topSkill: "UI Performance",
    aiNote: "Precision in UI micro-interactions. Accessibility score 99/100.",
  },
  {
    id: 5,
    name: "Diego Reyes",
    role: "Backend Engineer",
    verifiedScore: 85,
    matchScore: 86,
    skills: ["Rust", "PostgreSQL", "gRPC", "Kafka"],
    readiness: 80,
    location: "Miami, FL",
    avatar: "DR",
    status: "Available",
    topSkill: "Rust Systems",
    aiNote: "Low-level performance specialist. Consistently solves optimization challenges.",
  },
];

export const recruiterStats = {
  totalCandidates: 2847,
  averageMatchScore: 89,
  hiresThisMonth: 12,
  timeToHire: "6.2 days",
  topCategory: "Full-Stack Engineering",
};

export const opportunityMatches = [
  {
    id: 1,
    company: "Stripe",
    role: "Senior Full-Stack Engineer",
    matchPercent: 97,
    salary: "$165K – $195K",
    location: "San Francisco, CA",
    tags: ["High Match", "Fast Response"],
    outreach:
      "Hi Alex, your verified TypeScript and distributed systems scores rank in the 97th percentile for this role. Stripe is specifically looking for engineers who can architect at scale — your simulation performance is exactly what the team needs.",
  },
  {
    id: 2,
    company: "Linear",
    role: "Staff Engineer",
    matchPercent: 93,
    salary: "$175K – $210K",
    location: "Remote",
    tags: ["Top Company", "High Match"],
    outreach:
      "Alex, Linear's engineering team reviewed your AI-verified profile. Your React architecture skills and system design score align with what they need for their upcoming infrastructure project.",
  },
  {
    id: 3,
    company: "Vercel",
    role: "Platform Engineer",
    matchPercent: 89,
    salary: "$155K – $185K",
    location: "Remote",
    tags: ["Remote", "Good Match"],
    outreach:
      "Your Node.js and cloud deployment expertise matches 89% of Vercel's platform team requirements. Edge runtime experience would elevate this to a near-perfect match.",
  },
];

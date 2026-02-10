export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  github?: string;
  demo?: string;
  featured: boolean;
  year: string;
  role: string;
  technologies: string[];
  challenges?: string[];
  outcomes?: string[];
  color: string;
}

export const projects: Project[] = [
  {
    slug: "ai-recipe-generator",
    title: "AI Recipe Generator",
    description: "AI-powered recipe generation platform with personalized meal planning",
    longDescription: "A comprehensive AI-powered recipe generation platform that creates personalized meal plans based on dietary preferences, available ingredients, and nutritional goals. Features include real-time recipe generation, ingredient substitution suggestions, and meal planning calendars.",
    image: "/projects/recipe-generator.jpg",
    tags: ["AI", "Full Stack", "React"],
    github: "https://github.com/yourusername/ai-recipe-generator",
    demo: "https://recipe-generator-demo.vercel.app",
    featured: true,
    year: "2024",
    role: "Full Stack Developer",
    technologies: ["Next.js", "OpenAI API", "Supabase", "Tailwind CSS", "TypeScript"],
    challenges: [
      "Implementing efficient AI prompt engineering for consistent recipe quality",
      "Designing a scalable database schema for recipe storage and user preferences",
      "Optimizing API costs while maintaining fast response times"
    ],
    outcomes: [
      "Generated over 10,000 unique recipes for users",
      "Achieved 95% user satisfaction rate",
      "Reduced average meal planning time by 60%"
    ],
    color: "#eab308" // yellow-500
  },
  {
    slug: "supabase-dashboard",
    title: "Supabase Analytics Dashboard",
    description: "Real-time analytics dashboard for Supabase projects with advanced metrics",
    longDescription: "A powerful analytics dashboard that provides deep insights into Supabase projects. Features real-time monitoring, custom metric tracking, performance analytics, and automated reporting capabilities.",
    image: "/projects/supabase-dashboard.jpg",
    tags: ["Dashboard", "Analytics", "Real-time"],
    github: "https://github.com/yourusername/supabase-dashboard",
    demo: "https://supabase-dashboard-demo.vercel.app",
    featured: true,
    year: "2024",
    role: "Frontend Developer",
    technologies: ["React", "Supabase", "Chart.js", "TanStack Query", "Tailwind CSS"],
    challenges: [
      "Handling real-time data updates without performance degradation",
      "Creating intuitive data visualizations for complex metrics",
      "Implementing efficient caching strategies for large datasets"
    ],
    outcomes: [
      "Reduced dashboard load time by 70%",
      "Enabled real-time monitoring for 500+ projects",
      "Improved decision-making speed for development teams"
    ],
    color: "#22c55e" // green-500
  },
  {
    slug: "lms-platform",
    title: "Learning Management System",
    description: "Modern LMS platform with course creation, student tracking, and assessments",
    longDescription: "A comprehensive Learning Management System designed for modern education. Features include course creation tools, student progress tracking, interactive assessments, video streaming, and collaborative learning spaces.",
    image: "/projects/lms-platform.jpg",
    tags: ["Education", "Full Stack", "SaaS"],
    github: "https://github.com/yourusername/lms-platform",
    featured: true,
    year: "2023",
    role: "Lead Developer",
    technologies: ["Next.js", "PostgreSQL", "Prisma", "Stripe", "AWS S3"],
    challenges: [
      "Building a scalable video streaming infrastructure",
      "Implementing complex role-based access control",
      "Creating an intuitive course builder interface"
    ],
    outcomes: [
      "Onboarded 50+ educational institutions",
      "Facilitated learning for 5,000+ students",
      "Achieved 99.9% uptime over 12 months"
    ],
    color: "#3b82f6" // blue-500
  },
  {
    slug: "mining-dashboard",
    title: "Mining Operations Dashboard",
    description: "Industrial IoT dashboard for real-time mining equipment monitoring",
    longDescription: "An industrial-grade IoT dashboard for monitoring mining equipment and operations in real-time. Provides critical insights into equipment health, production metrics, safety alerts, and predictive maintenance recommendations.",
    image: "/projects/mining-dashboard.jpg",
    tags: ["IoT", "Industrial", "Real-time"],
    featured: false,
    year: "2023",
    role: "Full Stack Developer",
    technologies: ["React", "Node.js", "MQTT", "InfluxDB", "Grafana"],
    challenges: [
      "Processing high-frequency sensor data from 100+ devices",
      "Ensuring system reliability in harsh industrial environments",
      "Creating actionable alerts from complex data patterns"
    ],
    outcomes: [
      "Reduced equipment downtime by 35%",
      "Improved safety incident response time by 50%",
      "Saved $2M annually in maintenance costs"
    ],
    color: "#f97316" // orange-500
  },
  {
    slug: "consent-management",
    title: "Consent Management Platform",
    description: "GDPR-compliant consent management system for enterprise applications",
    longDescription: "A comprehensive consent management platform designed to help enterprises comply with GDPR and other privacy regulations. Features include consent tracking, user preference management, audit logging, and integration APIs.",
    image: "/projects/consent-platform.jpg",
    tags: ["Privacy", "Compliance", "Enterprise"],
    github: "https://github.com/yourusername/consent-platform",
    featured: false,
    year: "2023",
    role: "Backend Developer",
    technologies: ["Node.js", "MongoDB", "Redis", "Docker", "Kubernetes"],
    challenges: [
      "Ensuring 100% audit trail accuracy for compliance",
      "Building a flexible consent model for various regulations",
      "Achieving sub-100ms response times for consent checks"
    ],
    outcomes: [
      "Processed 10M+ consent requests monthly",
      "Achieved full GDPR compliance for 20+ clients",
      "Reduced compliance audit time by 80%"
    ],
    color: "#a855f7" // purple-500
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

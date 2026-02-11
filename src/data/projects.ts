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
  gallery?: string[];
}

export const projects: Project[] = [
  {
    slug: "osfs-formation",
    title: "OSFS Formation Portal",
    description: "International digital learning and resource platform for global religious formation",
    longDescription: "A comprehensive digital formation platform developed for the Oblates of St. Francis de Sales. The portal serves as a global hub for spiritual growth, providing localized resources, curriculum management, and community connection tools. Built with a focus on ease of use and high performance, it supports a diverse international community with varying levels of digital literacy.",
    image: "/projects/osfs-formation.png",
    tags: ["Education", "Global", "Next.js"],
    featured: true,
    year: "2024",
    role: "Full Stack Developer",
    technologies: ["Next.js", "React", "Supabase", "Tailwind CSS", "Vercel", "Turbopack", "TypeScript"],
    challenges: [
      "Managing complex internationalization (i18n) workflows for global resource distribution",
      "Implementing a tiered access system for different formation stages and regions",
      "Optimizing performance for users in regions with limited bandwidth"
    ],
    outcomes: [
      "Successfully launched a unified global resource hub for the OSFS community",
      "Streamlined curriculum distribution across multiple continents",
      "Achieved sub-second page loads globally through edge optimization on Vercel"
    ],
    color: "#3b82f6", // blue-500
    gallery: [
      "/projects/osfs-hero.png",
      "/projects/osfs-documents.png"
    ]
  },
  {
    slug: "ortho-schuh",
    title: "Ortho Dr. Schuh Patient App",
    description: "Secure mobile-wrapped patient portal for pre- and post-operative document sharing",
    longDescription: "A specialized medical application developed for Dr. Schuh to manage pre- and post-operative care for over 600 patients. The platform provides a secure, mobile-wrapped experience where patients can access personalized treatment plans, surgical checklists, and exercise videos. Features include automated document distribution, secure messaging, and a comprehensive admin backend for patient management.",
    image: "/projects/ortho-schuh.png",
    tags: ["Medical", "Django", "PWA"],
    featured: true,
    year: "2024",
    role: "Full Stack Developer",
    technologies: ["Django", "Tailwind CSS", "Python", "PostgreSQL", "Docker"],
    challenges: [
      "Ensuring 100% compliance with German medical data privacy standards while maintaining accessibility",
      "Designing an intuitive mobile interface for a broad patient demographic (age 20-80+)",
      "Automating complex document workflows for different surgical procedures (e.g., Hallux Valgus)"
    ],
    outcomes: [
      "Successfully streamlined care for over 600 active patients",
      "Reduced administrative overhead for document sharing by 75%",
      "Achieved high patient engagement with digital exercise and recovery plans"
    ],
    color: "#0ea5e9", // sky-500
    gallery: [
      "/projects/ortho-schuh-hero.png",
      "/projects/ortho-schuh-mobile-1.png",
      "/projects/ortho-schuh-mobile-2.png",
      "/projects/ortho-schuh-admin.png"
    ]
  },
  {
    slug: "werkzeugkiste",
    title: "Die digitale Werkzeugkiste",
    description: "Advanced LMS for social inclusion with automated PDF certificate generation and progression tracking.",
    longDescription: "A robust digital learning platform developed for 'arbeit plus'. It features automated module certificate creation using PDFKit, granular lesson progression tracking, interactive quizzes, and a comprehensive admin backend for dynamic module management. Built to empower job seekers through digital literacy.",
    image: "/projects/werkzeugkiste-correct.png",
    tags: ["Education", "Next.js", "Supabase"],
    demo: "https://werkzeugkiste.arbeitplus.at/",
    featured: true,
    year: "2024",
    role: "Full Stack Developer",
    technologies: ["Next.js", "Supabase", "PDFKit", "Tailwind CSS", "Docker", "TypeScript"],
    challenges: [
      "Implementing real-time progress tracking across complex learning paths",
      "Automating dynamic PDF generation for student certifications",
      "Building a flexible admin system for modular content creation"
    ],
    outcomes: [
      "171 Active Learners reached",
      "274 Certificates successfully generated",
      "121 Lessons distributed across 28 Courses",
      "Automated assessment system with 28 Quizzes"
    ],
    color: "#e11d48",
    gallery: [
      "/projects/werkzeugkiste-correct.png",
      "/projects/werkzeugkiste-hero.png",
      "/projects/werkzeugkiste-lesson.png",
      "/projects/werkzeugkiste-admin.png"
    ]
  },
  {
    slug: "ai-recipe-generator",
    title: "AI Recipe Generator",
    description: "AI-powered recipe generation platform with personalized meal planning",
    longDescription: "A comprehensive AI-powered recipe generation platform that creates personalized meal plans based on dietary preferences, available ingredients, and nutritional goals. Features include real-time recipe generation, ingredient substitution suggestions, and meal planning calendars.",
    image: "/projects/recipe-generator.png",
    tags: ["AI", "Full Stack", "React"],
    github: "https://github.com/yourusername/ai-recipe-generator",
    demo: "https://recipe-generator-demo.vercel.app",
    featured: false,
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
    slug: "mining-dashboard",
    title: "Mining Operations Dashboard",
    description: "Industrial IoT dashboard for real-time mining equipment monitoring",
    longDescription: "An industrial-grade IoT dashboard for monitoring mining equipment and operations in real-time. Provides critical insights into equipment health, production metrics, safety alerts, and predictive maintenance recommendations.",
    image: "/projects/mining-dashboard.png",
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
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(project => project.featured);
}

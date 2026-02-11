"use client";

import React from "react";
import {
    SiNextdotjs,
    SiSupabase,
    SiTailwindcss,
    SiDocker,
    SiTypescript,
    SiReact,
    SiNodedotjs,
    SiPostgresql,
    SiPrisma,
    SiAmazonaws,
    SiVercel,
    SiFramer,
    SiThreedotjs,
    SiOpenai,
    SiPython,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiAdobe
} from "react-icons/si";
import { FaFilePdf } from "react-icons/fa";
import { LucideIcon, Cpu } from "lucide-react";

interface IconConfig {
    icon: React.ElementType;
    color: string;
}

const iconMap: Record<string, IconConfig> = {
    "Next.js": { icon: SiNextdotjs, color: "currentColor" },
    "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
    "Docker": { icon: SiDocker, color: "#2496ED" },
    "TypeScript": { icon: SiTypescript, color: "#3178C6" },
    "PDFKit": { icon: FaFilePdf, color: "#F40612" },
    "React": { icon: SiReact, color: "#61DAFB" },
    "Node.js": { icon: SiNodedotjs, color: "#339933" },
    "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
    "Prisma": { icon: SiPrisma, color: "#2D3748" },
    "AWS": { icon: SiAmazon, color: "#FF9900" },
    "Vercel": { icon: SiVercel, color: "currentColor" },
    "Framer Motion": { icon: SiFramer, color: "#0055FF" },
    "Three.js": { icon: SiThreedotjs, color: "currentColor" },
    "OpenAI": { icon: SiOpenai, color: "#412991" },
    "Python": { icon: SiPython, color: "#3776AB" },
    "JavaScript": { icon: SiJavascript, color: "#F7DF1E" },
    "HTML5": { icon: SiHtml5, color: "#E34F26" },
    "CSS3": { icon: SiCss3, color: "#1572B6" },
    "Adobe": { icon: SiAdobe, color: "#FF0000" },
};

export function TechIcon({ name, className }: { name: string; className?: string }) {
    const config = iconMap[name];

    if (!config) {
        return <Cpu className={className} />;
    }

    const Icon = config.icon;
    return <Icon className={className} style={{ color: config.color }} />;
}

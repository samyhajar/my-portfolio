"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

interface ProjectNavigationProps {
    nextProject: Project;
}

export function ProjectNavigation({ nextProject }: ProjectNavigationProps) {
    return (
        <section className="py-20 border-t border-neutral-200 dark:border-neutral-800">
            <Link href={`/projects/${nextProject.slug}`} className="group block">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <span className="text-sm font-mono uppercase tracking-widest text-neutral-500">Next Project</span>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-blue-500 transition-all duration-300">
                        {nextProject.title}
                    </h2>
                    <motion.div
                        className="flex items-center gap-2 text-lg font-medium text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors"
                        whileHover={{ x: 10 }}
                    >
                        View Case Study <ArrowRight className="w-5 h-5" />
                    </motion.div>
                </div>
            </Link>
        </section>
    );
}

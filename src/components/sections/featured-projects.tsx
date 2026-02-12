"use client";

import { useState } from "react";
import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HoverRevealImage } from "@/components/ui/hover-reveal-image";

interface FeaturedProjectsProps {
    projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    const [hoveredProject, setHoveredProject] = useState<string | null>(null);

    const activeImage = hoveredProject
        ? projects.find(p => p.slug === hoveredProject)?.image || null
        : null;

    return (
        <section id="projects" className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 min-h-[80vh] flex items-center overflow-hidden">
            {/* WebGL Background Layer (Hidden on mobile for performance) */}
            <div className="absolute inset-0 z-0 hidden md:block">
                {/* Only render if we have an active image to avoid empty canvas issues or keep valid fallback */}
                {activeImage && (
                    <div key={activeImage} className="w-full h-full animate-in fade-in duration-700">
                        <HoverRevealImage activeImage={activeImage} />
                    </div>
                )}
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10">
                {/* Header */}
                <div className="mb-12 sm:mb-16 lg:mb-20 text-center md:text-left">
                    <p className="text-xs sm:text-sm font-bold tracking-widest text-neutral-500 uppercase mb-3 sm:mb-4">Selected Works</p>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tighter text-neutral-900 dark:text-white">
                        Featured <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Projects</span>
                    </h2>
                </div>

                {/* Typographic List */}
                <div className="flex flex-col">
                    {projects.map((project, index) => (
                        <ProjectListItem
                            key={project.slug}
                            project={project}
                            index={index}
                            onHover={() => setHoveredProject(project.slug)}
                            onLeave={() => setHoveredProject(null)}
                        />
                    ))}
                </div>

                {/* View All Projects Link */}
                <div className="flex justify-center md:justify-start pt-12 sm:pt-16">
                    <Link
                        href="/projects"
                        className="group flex items-center gap-2 text-base sm:text-lg font-medium text-neutral-900 dark:text-white hover:opacity-80 transition-opacity"
                    >
                        View All Archives
                        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";

function ProjectListItem({
    project,
    index,
    onHover,
    onLeave
}: {
    project: Project;
    index: number;
    onHover: () => void;
    onLeave: () => void;
}) {
    const ref = useRef(null);
    const isInView = useInView(ref, { amount: 0.5 });

    useEffect(() => {
        if (isInView) {
            onHover();
        }
    }, [isInView, onHover]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -50px 0px" }}
            transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.3), ease: "easeOut" }}
            className="group relative border-t border-neutral-200 dark:border-neutral-800 last:border-b transition-colors hover:bg-white/5 dark:hover:bg-neutral-900/30"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
        >
            <Link href={`/projects/${project.slug}`} className="block py-8 sm:py-10 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-3 sm:gap-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold tracking-tighter text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
                        {project.title}
                    </h3>

                    <div className="flex items-center gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                        <div className="flex flex-col md:items-end">
                            <span className="text-xs sm:text-sm font-mono uppercase tracking-widest text-neutral-500 group-hover:text-neutral-900 dark:group-hover:text-neutral-300 transition-colors">
                                {project.tags[0]}
                            </span>
                            <span className="text-xs text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                {project.year}
                            </span>
                        </div>
                        <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-white transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-300" />
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}

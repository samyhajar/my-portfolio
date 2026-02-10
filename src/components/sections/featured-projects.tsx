"use client";

import { Project } from "@/data/projects";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface FeaturedProjectsProps {
    projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
    return (
        <section id="projects" className="py-20 px-4 bg-white dark:bg-neutral-950 overflow-hidden">
            <div className="max-w-7xl mx-auto space-y-16">
                {/* Header */}
                <div className="text-center space-y-4">
                    <p className="text-sm font-bold tracking-widest text-neutral-500 uppercase">Portfolio</p>
                    <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white">
                        Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Projects</span>
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        A curated selection of projects that made me confident in building software.
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                    ))}
                </div>

                {/* View All Projects Link */}
                <div className="flex justify-center pt-8">
                    <Link
                        href="/projects"
                        className="group flex items-center gap-2 text-lg font-medium text-neutral-900 dark:text-white hover:opacity-80 transition-opacity"
                    >
                        Explore all projects on GitHub
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative flex flex-col gap-6"
        >
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-neutral-400 uppercase">
                <span>0{index + 1}</span>
                <span className="w-8 h-[1px] bg-neutral-200 dark:bg-neutral-800" />
                <span>{project.tags[0]} APP</span>
            </div>

            {/* Title */}
            <h3 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white group-hover:underline decoration-2 underline-offset-4">
                <Link href={`/projects/${project.slug}`}>
                    {project.title}
                </Link>
            </h3>

            {/* Card Container */}
            <Link href={`/projects/${project.slug}`} className="block">
                <div
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden border-[8px] border-neutral-900 dark:border-neutral-800 transition-transform duration-500 group-hover:scale-[1.02] shadow-2xl"
                    style={{ backgroundColor: project.color }}
                >
                    {/* Description Overlay */}
                    <div className="absolute inset-x-0 top-0 p-8 z-10">
                        <p className="text-white/90 text-lg font-medium max-w-[80%] leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* Project Image */}
                    <div className="absolute inset-x-8 bottom-0 top-1/3 rounded-t-xl overflow-hidden shadow-2xl transition-transform duration-500 group-hover:translate-y-2">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
                {project.tags.slice(1).map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-full text-xs font-bold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}

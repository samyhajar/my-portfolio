"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Project } from "@/data/projects";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProjectGallery({ projects }: { projects: Project[] }) {
    // Desktop Scroll Logic
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Transform scrollYProgress (0 -> 1) to x translation (0% -> -X%)
    // Adjust the percentage based on number of items to ensure full scroll
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    return (
        <>
            {/* Desktop View: Horizontal Scroll (Hidden on mobile) */}
            <div className="hidden md:block relative h-[500vh]" ref={targetRef}>
                <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                    <motion.div style={{ x }} className="flex gap-16 px-24">
                        {projects.map((project, i) => (
                            <DesktopProjectCard key={project.slug} project={project} index={i} />
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Mobile View: Vertical Stack (Visible only on mobile) */}
            <div className="md:hidden flex flex-col gap-12 px-6 pb-24 mt-12">
                {projects.map((project, i) => (
                    <MobileProjectCard key={project.slug} project={project} index={i} />
                ))}
            </div>
        </>
    );
}

function DesktopProjectCard({ project, index }: { project: Project; index: number }) {
    const t = useTranslations("Projects");

    return (
        <Link href={`/projects/${project.slug}`} className="group relative w-[800px] h-[500px] flex-shrink-0 block">
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-neutral-200 dark:border-neutral-800">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority={index === 0 || index === 1}
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 p-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl font-bold text-white mb-2">{project.title}</h3>
                    <div className="h-px w-0 group-hover:w-full bg-white/50 transition-all duration-700 ease-out mb-4" />
                    <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <span className="text-sm font-medium uppercase tracking-widest">{t("viewProject")}</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </Link>
    );
}

function MobileProjectCard({ project, index }: { project: Project; index: number }) {
    return (
        <Link href={`/projects/${project.slug}`} className="block">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800"
            >
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                    priority={index === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6">
                    <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                </div>
            </motion.div>
        </Link>
    );
}

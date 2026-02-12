"use client";

import { Project } from "@/data/projects";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface ProjectNavigationProps {
    nextProject: Project;
}

export function ProjectNavigation({ nextProject }: ProjectNavigationProps) {
    const t = useTranslations("ProjectDetail");
    const tProj = useTranslations("Projects");

    return (
        <div className="py-20 border-t border-neutral-200 dark:border-neutral-800">
            <Link
                href={`/projects/${nextProject.slug}`}
                className="group block relative overflow-hidden rounded-3xl aspect-[21/9] md:aspect-[3/1]"
            >
                <Image
                    src={nextProject.image}
                    alt={nextProject.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        <span className="text-sm font-mono uppercase tracking-[0.2em] text-white/60">
                            {t("nextProject")}
                        </span>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter">
                            {nextProject.title}
                        </h2>
                        <p className="text-white/60 max-w-md mx-auto hidden md:block">
                            {tProj(`${nextProject.slug}.description`)}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-white">
                            <span className="font-medium">View Case Study</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </motion.div>
                </div>
            </Link>
        </div>
    );
}

"use client";

import { projects } from "@/data/projects";
import { Project3DGallery } from "@/components/ui/project-3d-gallery";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ProjectsPage() {
    const { scrollY } = useScroll();

    // Fade out based on scroll depth
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const y = useTransform(scrollY, [0, 400], [0, -50]);

    return (
        <main className="relative min-h-[500vh]">
            {/* 3D Gallery Layer */}
            <Project3DGallery projects={projects} />

            {/* Content Overlay */}
            <motion.div
                style={{ opacity, y }}
                className="relative z-10 pointer-events-none"
            >
                <div className="max-w-7xl mx-auto px-4 pt-32 pb-64">
                    <div className="max-w-2xl">
                        <p className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-4">Archive</p>
                        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8">
                            Selected <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pr-2">Chronicles</span>
                        </h1>
                        <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
                            A deep dive into the evolution of my craft. From experimental prototypes to full-scale enterprise solutions.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Extra scroll space provided by min-h-[500vh] */}
        </main>
    );
}

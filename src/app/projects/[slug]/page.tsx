import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import * as motion from "framer-motion/client";
import { ProjectImage3D } from "@/components/ui/project-image-3d";
import { ProjectCarousel } from "@/components/ui/project-carousel";
import { ProjectNavigation } from "@/components/project-navigation";

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    // Determine next project
    const currentIndex = projects.findIndex(p => p.slug === slug);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    return (
        <main className="min-h-screen bg-transparent selection:bg-neutral-900 selection:text-white dark:selection:bg-white dark:selection:text-neutral-900">
            <div className="max-w-[1800px] mx-auto px-4 sm:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pt-32 pb-20">

                    {/* Left Column - Sticky Title & Meta */}
                    <div className="lg:col-span-5 relative z-20">
                        <div className="lg:sticky lg:top-32 space-y-8 lg:space-y-12">
                            {/* Back Link */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Link
                                    href="/#projects"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors group"
                                >
                                    <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                    Back to Projects
                                </Link>
                            </motion.div>

                            {/* Title Section */}
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 }}
                                    className="flex flex-wrap gap-2"
                                >
                                    <span className="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-wider">
                                        {project.year}
                                    </span>
                                    <span className="px-3 py-1 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-mono uppercase tracking-wider">
                                        {project.role}
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-neutral-900 dark:text-white leading-[0.9]"
                                >
                                    {project.title}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 max-w-xl leading-relaxed"
                                >
                                    {project.description}
                                </motion.p>
                            </div>


                        </div>
                    </div>

                    {/* Right Column - Visuals & Content */}
                    <div className="lg:col-span-7 space-y-12 lg:space-y-24 lg:pt-32">
                        {/* Carousel or 3D Image Container */}
                        <div className="w-full">
                            {project.gallery && project.gallery.length > 0 ? (
                                <ProjectCarousel images={project.gallery} alt={project.title} />
                            ) : (
                                <ProjectImage3D src={project.image} alt={project.title} />
                            )}
                        </div>

                        {/* Bento Grid Content */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-32">
                            {/* Overview Card - Spans 2 cols */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="md:col-span-2 p-8 rounded-3xl bg-white/5 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 space-y-4"
                            >
                                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500">Overview</h3>
                                <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-800 dark:text-neutral-200">
                                    {project.longDescription}
                                </p>
                            </motion.div>

                            {/* Tech Stack Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="p-8 rounded-3xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6"
                            >
                                <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1.5 rounded-lg bg-white dark:bg-neutral-800 text-sm font-medium border border-neutral-200 dark:border-neutral-700 shadow-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Metrics/Impact Card */}
                            {project.outcomes && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="p-8 rounded-3xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 space-y-6"
                                >
                                    <h3 className="text-sm font-mono uppercase tracking-wider opacity-70">Impact</h3>
                                    <ul className="space-y-4">
                                        {project.outcomes.map((outcome, idx) => (
                                            <li key={idx} className="flex gap-3 items-start">
                                                <span className="text-xl">⚡</span>
                                                <span className="font-medium leading-tight">{outcome}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}

                            {/* Challenges Card - Spans 2 cols */}
                            {project.challenges && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="md:col-span-2 p-8 rounded-3xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-6"
                                >
                                    <h3 className="text-sm font-mono uppercase tracking-wider text-neutral-500">Challenges & Solutions</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {project.challenges.map((challenge, idx) => (
                                            <div key={idx} className="space-y-2">
                                                <div className="text-xs font-mono text-neutral-400">0{idx + 1}</div>
                                                <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">
                                                    {challenge}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>

                <ProjectNavigation nextProject={nextProject} />
            </div>


            {/* Floating Action Island */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5, type: "spring" }}
                className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 rounded-full bg-white/10 dark:bg-neutral-900/10 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl"
            >
                {project.demo && (
                    <Button asChild size="lg" className="rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            Visit Site <ExternalLink className="ml-2 w-4 h-4" />
                        </a>
                    </Button>
                )}
                {project.github && (
                    <Button asChild variant="ghost" size="lg" className="rounded-full hover:bg-white/10 dark:hover:bg-neutral-900/20">
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="mr-2 w-4 h-4" /> Code
                        </a>
                    </Button>
                )}
            </motion.div>

        </main>
    );
}

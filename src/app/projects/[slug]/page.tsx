import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Github, ExternalLink, Calendar, User } from "lucide-react";
import Link from "next/link";

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

    return (
        <main className="min-h-screen py-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <Button variant="ghost" asChild className="mb-8">
                    <Link href="/projects">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Projects
                    </Link>
                </Button>

                {/* Project Header */}
                <div className="space-y-6 mb-12">
                    <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        {project.title}
                    </h1>

                    <div className="flex flex-wrap gap-6 text-neutral-600 dark:text-neutral-400">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{project.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{project.role}</span>
                        </div>
                    </div>

                    <p className="text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4">
                        {project.github && (
                            <Button asChild>
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="w-4 h-4 mr-2" />
                                    View Code
                                </a>
                            </Button>
                        )}
                        {project.demo && (
                            <Button asChild variant="outline">
                                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4 mr-2" />
                                    Live Demo
                                </a>
                            </Button>
                        )}
                    </div>
                </div>

                {/* Project Image Placeholder */}
                <div className="relative h-96 rounded-lg overflow-hidden bg-neutral-100 dark:bg-neutral-900 mb-12">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-9xl font-bold text-neutral-300 dark:text-neutral-700 opacity-20">
                            {project.title.charAt(0)}
                        </div>
                    </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Overview */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                {project.longDescription}
                            </p>
                        </CardContent>
                    </Card>

                    {/* Technologies */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Technologies Used</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <Badge key={tech} variant="outline">
                                        {tech}
                                    </Badge>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Challenges */}
                {project.challenges && project.challenges.length > 0 && (
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle>Key Challenges</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {project.challenges.map((challenge, index) => (
                                    <li key={index} className="flex gap-3">
                                        <span className="text-neutral-400 dark:text-neutral-600 font-mono text-sm mt-1">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span className="text-neutral-600 dark:text-neutral-400 flex-1">
                                            {challenge}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}

                {/* Outcomes */}
                {project.outcomes && project.outcomes.length > 0 && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Results & Impact</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {project.outcomes.map((outcome, index) => (
                                    <li key={index} className="flex gap-3">
                                        <span className="text-green-500 dark:text-green-400 font-mono text-sm mt-1">
                                            ✓
                                        </span>
                                        <span className="text-neutral-600 dark:text-neutral-400 flex-1">
                                            {outcome}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    );
}

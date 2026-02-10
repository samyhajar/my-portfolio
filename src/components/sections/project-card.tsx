"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-neutral-200 dark:border-neutral-800">
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <div className="absolute inset-0 flex items-center justify-center text-neutral-400">
                    {/* Placeholder - replace with actual images */}
                    <div className="text-6xl font-bold opacity-20">{project.title.charAt(0)}</div>
                </div>

                {/* Hover overlay with links */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                    {project.github && (
                        <Button size="sm" variant="secondary" asChild>
                            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                <Github className="w-4 h-4 mr-2" />
                                Code
                            </a>
                        </Button>
                    )}
                    {project.demo && (
                        <Button size="sm" variant="secondary" asChild>
                            <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Demo
                            </a>
                        </Button>
                    )}
                </div>
            </div>

            <CardHeader>
                <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1">
                        <CardTitle className="text-xl group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                            {project.title}
                        </CardTitle>
                        <CardDescription className="text-sm">
                            {project.year} • {project.role}
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* View Details Link */}
                <Button variant="ghost" className="w-full group/btn" asChild>
                    <Link href={`/projects/${project.slug}`}>
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}

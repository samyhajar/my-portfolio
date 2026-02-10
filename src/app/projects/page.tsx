import { projects } from "@/data/projects";
import { ProjectCard } from "@/components/sections/project-card";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen py-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                        All Projects
                    </h1>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        A comprehensive collection of my work across different domains and technologies
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.slug} project={project} />
                    ))}
                </div>

                {/* Empty State */}
                {projects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-neutral-500 dark:text-neutral-400">
                            No projects found.
                        </p>
                    </div>
                )}
            </div>
        </main>
    );
}

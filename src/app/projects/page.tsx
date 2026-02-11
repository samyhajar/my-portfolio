import { projects } from "@/data/projects";
import { ProjectGallery } from "@/components/ui/project-gallery";

export default function ProjectsPage() {
    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-6 py-24 md:py-32">
                <div className="max-w-4xl">
                    <p className="text-sm font-bold tracking-widest text-neutral-500 uppercase mb-4">Archive</p>
                    <h1 className="text-6xl md:text-9xl font-bold tracking-tighter text-neutral-900 dark:text-white mb-8">
                        Selected <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 pr-2">Chronicles</span>
                    </h1>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed max-w-2xl">
                        A deep dive into the evolution of my craft. From experimental prototypes to full-scale enterprise solutions.
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <ProjectGallery projects={projects} />
        </main>
    );
}

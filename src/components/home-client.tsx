"use client";

import dynamic from "next/dynamic";
import { Project } from "@/data/projects";
import { ContactModal } from "@/components/ui/contact-modal";
import { Button } from "@/components/ui/button";

const HeroDynamic = dynamic(() => import("@/components/sections/hero").then(mod => mod.Hero), { ssr: true });
const FeaturedProjectsDynamic = dynamic(() => import("@/components/sections/featured-projects").then(mod => mod.FeaturedProjects), { ssr: false });
const TechGlobeDynamic = dynamic(() => import("@/components/ui/tech-globe").then(mod => mod.TechGlobe), { ssr: false });

export function HomeClient({ featuredProjects }: { featuredProjects: Project[] }) {
    return (
        <>
            {/* Hero Section */}
            <section id="home">
                <HeroDynamic />
            </section>

            {/* Featured Projects Section */}
            <FeaturedProjectsDynamic projects={featuredProjects} />

            {/* Skills Section - 3D Globe */}
            <TechGlobeDynamic />

            {/* Contact Section */}
            <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        Let's Work Together
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 px-4">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                        <ContactModal>
                            <Button size="lg" className="w-full sm:w-auto">
                                Get In Touch
                            </Button>
                        </ContactModal>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                            <a href="/resume.pdf" download>
                                Download Resume
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}


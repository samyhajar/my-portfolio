"use client";

import dynamic from "next/dynamic";
import { Project } from "@/data/projects";
import { ContactModal } from "@/components/ui/contact-modal";
import { Button } from "@/components/ui/button";
import { useLocale, useTranslations } from "next-intl";

const HeroDynamic = dynamic(() => import("@/components/sections/hero").then(mod => mod.Hero), { ssr: true });
const FeaturedProjectsDynamic = dynamic(() => import("@/components/sections/featured-projects").then(mod => mod.FeaturedProjects), { ssr: false });
const TechGlobeDynamic = dynamic(() => import("@/components/ui/tech-globe").then(mod => mod.TechGlobe), { ssr: false });

export function HomeClient({ featuredProjects }: { featuredProjects: Project[] }) {
    const t = useTranslations("Contact");
    const locale = useLocale();
    const resumePath = `/${locale}/resume`;

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
                        {t("title")}
                    </h2>
                    <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400 px-4">
                        {t("description")}
                    </p>
                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                        <ContactModal>
                            <Button size="lg" className="w-full sm:w-auto">
                                {t("getInTouch")}
                            </Button>
                        </ContactModal>
                        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
                            <a href={resumePath} target="_blank" rel="noopener noreferrer">
                                {t("downloadResume")}
                            </a>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    );
}

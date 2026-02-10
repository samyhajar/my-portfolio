import { Hero } from "@/components/sections/hero";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { TechGlobe } from "@/components/ui/tech-globe";
import { getFeaturedProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section id="home">
        <Hero />
      </section>

      {/* Featured Projects Section */}
      <FeaturedProjects projects={featuredProjects} />

      {/* Skills Section - 3D Globe */}
      <TechGlobe />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let's Work Together
          </h2>
          <p className="text-lg text-neutral-600 dark:text-neutral-400">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg">
              <a href="mailto:samy.hajar@gmail.com">
                Get In Touch
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/resume.pdf" download>
                Download Resume
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

import { HomeClient } from "@/components/home-client";
import { getFeaturedProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <main className="min-h-screen">
      <HomeClient featuredProjects={featuredProjects} />
    </main>
  );
}

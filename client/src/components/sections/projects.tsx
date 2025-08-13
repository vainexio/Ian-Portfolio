import { useState } from "react";
import { Project } from "@shared/schema";
import ProjectCard from "@/components/ui/project-card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Dev" },
    { id: "android", label: "Android" },
    { id: "game", label: "Games" },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects || []
    : (projects || []).filter(project => project.category === activeFilter);

  console.log("PROJECTS DEBUG:", {
    projects: projects,
    projectsLength: projects?.length,
    activeFilter,
    filteredLength: filteredProjects?.length
  });

  return (
    <section id="projects" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h2 className="text-5xl font-bold gradient-text mb-6">Featured Projects</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Showcasing my latest work across web development, mobile apps, and game development.
          </p>
        </div>
        
        {/* Project Filter */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="glass rounded-2xl p-2 inline-flex space-x-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  activeFilter === filter.id
                    ? "bg-coral text-white"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          {!projects || projects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="glass-dark rounded-2xl p-8 max-w-md mx-auto">
                <i className="fas fa-folder-open text-4xl text-coral mb-4"></i>
                <h3 className="text-xl font-bold text-white mb-2">Loading Projects...</h3>
                <p className="text-gray-300">Please wait while we load your projects.</p>
              </div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="glass-dark rounded-2xl p-8 max-w-md mx-auto">
                <i className="fas fa-filter text-4xl text-coral mb-4"></i>
                <h3 className="text-xl font-bold text-white mb-2">No Projects Found</h3>
                <p className="text-gray-300">No projects match the current filter.</p>
              </div>
            </div>
          ) : (
            filteredProjects.map((project, index) => (
              <div 
                key={`project-${project.id}`}
                className="opacity-100 translate-y-0"
                style={{ 
                  display: 'block',
                  visibility: 'visible',
                  height: 'auto'
                }}
              >
                <ProjectCard project={project} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

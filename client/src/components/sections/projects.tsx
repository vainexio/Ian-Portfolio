import { useState } from "react";
import { Project, ProjectCategory } from "@shared/schema";
import ProjectCard from "@/components/ui/project-card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface ProjectsProps {
  projects: Project[];
  projectCategories: ProjectCategory[];
}

export default function Projects({ projects, projectCategories }: ProjectsProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filters = [
    { id: "all", label: "All Projects" },
    ...(projectCategories || []).map(cat => ({ id: cat.id, label: cat.label }))
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
    <section id="projects" ref={ref} className="py-16 md:py-20 lg:py-24 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-4 md:mb-6">Featured Projects</h2>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto px-4">
            Showcasing my latest work across web development, mobile apps, and game development.
          </p>
        </div>
        
        {/* Project Filter */}
        <div className={`flex justify-center mb-8 md:mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <div className="glass rounded-2xl p-1 md:p-2 inline-flex flex-wrap justify-center gap-1 md:gap-2 max-w-full">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 md:px-6 py-1.5 md:py-2 rounded-xl font-medium text-sm md:text-base transition-all duration-300 ${
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 min-h-[400px]">
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
                <ProjectCard project={project} projectCategories={projectCategories} />
              </div>
            ))
          )}
        </div>


      </div>
    </section>
  );
}

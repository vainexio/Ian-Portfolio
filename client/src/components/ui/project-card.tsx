import { Project, ProjectCategory } from "@shared/schema";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  projectCategories: ProjectCategory[];
}

export default function ProjectCard({ project, projectCategories }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getCategoryConfig = (categoryId: string) => {
    return projectCategories?.find(cat => cat.id === categoryId) || {
      id: categoryId,
      label: categoryId,
      color: "cyan",
      colorClass: "bg-cyan/20 text-cyan"
    };
  };

  const categoryConfig = getCategoryConfig(project.category);

  const getActionIcon = () => {
    if (project.playStore) return "fab fa-google-play";
    if (project.roblox) return "fas fa-gamepad";
    if (project.demo) return "fas fa-external-link-alt";
    return "fas fa-info-circle";
  };

  const getActionLink = () => {
    return project.demo || project.playStore || project.roblox;
  };

  const getActionTitle = () => {
    if (project.playStore) return "Download on Google Play";
    if (project.roblox) return "Play on Roblox";
    if (project.demo) return "Live Demo";
    return "Project Details";
  };

  const hasValidLink = () => {
    return !!(project.demo || project.playStore || project.roblox);
  };

  return (
    <div 
      className="group glass-dark rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-700 hover:scale-105 hover:shadow-2xl relative"
      style={{
        boxShadow: isHovered ? `0 25px 50px -12px var(--${categoryConfig.color})30` : '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
      }}
      data-category={project.category}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`project-card-${project.id}`}
    >
      {/* Enhanced Image Section */}
      <div className="relative overflow-hidden">
        {/* Image Loading State */}
        {!imageLoaded && (
          <div className="w-full h-40 md:h-48 bg-gradient-to-br from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
            <i className="fas fa-image text-gray-600 text-2xl"></i>
          </div>
        )}
        
        <img 
          src={project.image} 
          alt={project.title}
          className={`w-full h-40 md:h-48 object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } group-hover:scale-110`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        
        {/* Enhanced Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-gradient-to-r from-amber to-orange-400 text-black px-3 py-1.5 rounded-full text-xs font-bold shadow-lg animate-pulse">
              <span className="flex items-center gap-1">
                <i className="fas fa-star"></i>
                Featured
              </span>
            </div>
          </div>
        )}

        {/* Enhanced Overlay with Project Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-4 left-4 right-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span 
                    key={tech} 
                    className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${categoryConfig.colorClass}`}
            style={{ 
              backgroundColor: `var(--${categoryConfig.color})20`,
              border: `1px solid var(--${categoryConfig.color})40`
            }}
          >
            {categoryConfig.label}
          </span>
        </div>
      </div>
      {/* Enhanced Content Section */}
      <div className="p-4 md:p-6 relative">
        {/* Project Title and Description */}
        <div className="mb-4">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-coral transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 group-hover:text-white transition-colors duration-300">
            {project.description}
          </p>
        </div>
        
        {/* Enhanced Project Stats */}
        {project.stats && Object.keys(project.stats).length > 0 && (
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-2 p-3 bg-gradient-to-r from-white/5 to-white/10 rounded-xl backdrop-blur-sm">
              {Object.entries(project.stats).slice(0, 3).map(([key, value], index) => (
                <div 
                  key={key} 
                  className="text-center transform transition-all duration-300 hover:scale-105"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-sm font-bold text-white mb-1">{value}</div>
                  <div className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Technologies - Hidden on Mobile, Shown on Hover/Desktop */}
        <div className="hidden md:flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span 
              key={index} 
              className="text-xs px-2 py-1 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex justify-between items-center">
          {/* Activity Indicators */}
          <div className="flex space-x-2">
            {[categoryConfig.color, "cyan", "amber"].map((color, index) => (
              <div
                key={index}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-500 group-hover:scale-110`}
                style={{ 
                  backgroundColor: `var(--${color})`,
                  animationDelay: `${index * 0.5}s`,
                  opacity: isHovered ? 1 : 0.6
                }}
              ></div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn btn-3d text-white hover:text-coral transition-all duration-300 p-2 rounded-lg text-sm md:text-base hover:scale-110 hover:shadow-lg"
                title="View Source Code"
                data-testid={`github-link-${project.id}`}
              >
                <i className="fab fa-github group-hover/btn:animate-pulse"></i>
              </a>
            )}
            
            {hasValidLink() ? (
              <a
                href={getActionLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn btn-3d text-white hover:text-coral transition-all duration-300 p-2 rounded-lg text-sm md:text-base hover:scale-110 hover:shadow-lg"
                title={getActionTitle()}
                data-testid={`action-link-${project.id}`}
              >
                <i className={`${getActionIcon()} group-hover/btn:animate-pulse`}></i>
              </a>
            ) : (
              <div
                className="btn-3d text-gray-500 cursor-not-allowed p-2 rounded-lg text-sm md:text-base opacity-50"
                title="No demo available"
                data-testid={`action-disabled-${project.id}`}
              >
                <i className="fas fa-link-slash"></i>
              </div>
            )}
          </div>
        </div>

        {/* Background Decoration */}
        <div 
          className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle, var(--${categoryConfig.color}) 0%, transparent 70%)`,
          }}
        ></div>
      </div>
    </div>
  );
}

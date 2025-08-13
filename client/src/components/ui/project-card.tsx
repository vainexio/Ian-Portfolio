import { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "web": return "coral";
      case "android": return "amber";
      case "game": return "purple";
      default: return "cyan";
    }
  };

  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case "web": return "bg-coral/20 text-coral";
      case "android": return "bg-amber/20 text-amber";
      case "game": return "bg-purple/20 text-purple";
      default: return "bg-cyan/20 text-cyan";
    }
  };

  const getActionIcon = () => {
    if (project.playStore) return "fab fa-google-play";
    if (project.roblox) return "fas fa-gamepad";
    return "fas fa-external-link-alt";
  };

  const getActionLink = () => {
    return project.demo || project.playStore || project.roblox || "#";
  };

  return (
    <div className="glass-dark rounded-2xl md:rounded-3xl overflow-hidden hover:scale-105 transition-all duration-500" data-category={project.category}>
      <div className="relative overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-40 md:h-48 object-cover"
          loading="lazy"
        />
        {project.featured && (
          <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-amber text-black px-2 py-1 rounded-full text-xs font-bold">
            ⭐ Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-4 md:p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg md:text-xl font-bold text-white flex-1 mr-2">{project.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${getCategoryColorClass(project.category)}`}>
            {project.category === "web" ? "Web" : 
             project.category === "android" ? "Android" : "Game"}
          </span>
        </div>
        <p className="text-white mb-4 text-sm leading-relaxed line-clamp-3">{project.description}</p>
        
        {/* Project Stats */}
        {project.stats && (
          <div className="grid grid-cols-3 gap-1 md:gap-2 mb-4 p-2 md:p-3 bg-white/5 rounded-xl">
            {Object.entries(project.stats).slice(0, 3).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-xs md:text-sm font-bold text-white">{value}</div>
                <div className="text-xs text-gray-400 capitalize">{key}</div>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-white/10 rounded-full text-white">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs px-2 py-1 bg-white/10 rounded-full text-gray-400">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 md:space-x-2">
            {[getCategoryColor(project.category), "cyan", "amber"].map((color, index) => (
              <span key={index} className={`w-2 h-2 md:w-3 md:h-3 bg-${color} rounded-full animate-pulse`} style={{ animationDelay: `${index * 0.5}s` }}></span>
            ))}
          </div>
          <div className="flex space-x-1 md:space-x-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d text-white hover:text-coral transition-colors p-1.5 md:p-2 rounded-lg text-sm md:text-base"
                title="View Code"
              >
                <i className="fab fa-github"></i>
              </a>
            )}
            <a
              href={getActionLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d text-white hover:text-coral transition-colors p-1.5 md:p-2 rounded-lg text-sm md:text-base"
              title={project.demo ? "Live Demo" : project.playStore ? "Google Play" : "View Project"}
            >
              <i className={getActionIcon()}></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

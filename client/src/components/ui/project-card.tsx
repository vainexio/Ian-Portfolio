import { useState } from "react";
import { Project, ProjectCategory } from "@shared/schema";
import CodePlayground from "./code-playground";
import InteractiveDemo from "./interactive-demo";
import { getCodeExamplesByProjectId } from "@/data/code-examples";

interface ProjectCardProps {
  project: Project;
  projectCategories: ProjectCategory[];
}

export default function ProjectCard({ project, projectCategories }: ProjectCardProps) {
  const [showInteractive, setShowInteractive] = useState(false);
  const [activeTab, setActiveTab] = useState<"demo" | "code">("demo");
  
  const getCategoryConfig = (categoryId: string) => {
    return projectCategories?.find(cat => cat.id === categoryId) || {
      id: categoryId,
      label: categoryId,
      color: "cyan",
      colorClass: "bg-cyan/20 text-cyan"
    };
  };

  const categoryConfig = getCategoryConfig(project.category);
  const codeExamples = getCodeExamplesByProjectId(project.id);
  const hasInteractiveContent = codeExamples.length > 0;

  const getActionIcon = () => {
    if (project.playStore) return "fab fa-google-play";
    if (project.roblox) return "fas fa-gamepad";
    return "fas fa-external-link-alt";
  };

  const getActionLink = () => {
    return project.demo || project.playStore || project.roblox || "#";
  };

  const getDemoType = (): "discord-bot" | "game-controls" | "mobile-app" | "api-demo" => {
    switch (project.id) {
      case "1": return "discord-bot";
      case "2": return "game-controls"; 
      case "3": return "mobile-app";
      case "4": return "api-demo";
      default: return "discord-bot";
    }
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
          <span className={`px-2 py-1 rounded-full text-xs flex-shrink-0 ${categoryConfig.colorClass}`}>
            {categoryConfig.label}
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
            {[categoryConfig.color, "cyan", "amber"].map((color, index) => (
              <span key={index} className={`w-2 h-2 md:w-3 md:h-3 bg-${color} rounded-full animate-pulse`} style={{ animationDelay: `${index * 0.5}s` }}></span>
            ))}
          </div>
          <div className="flex space-x-1 md:space-x-2">
            {hasInteractiveContent && (
              <button
                onClick={() => setShowInteractive(!showInteractive)}
                className="btn-3d text-white hover:text-amber transition-colors p-1.5 md:p-2 rounded-lg text-sm md:text-base"
                title="Try Interactive Demo"
              >
                <i className={showInteractive ? "fas fa-times" : "fas fa-play"}></i>
              </button>
            )}
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
        
        {/* Interactive Content Section */}
        {showInteractive && hasInteractiveContent && (
          <div className="mt-6 pt-6 border-t border-white/10 interactive-fade-in">
            {/* Tab Navigation */}
            <div className="flex mb-4">
              <button
                onClick={() => setActiveTab("demo")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-l-lg transition-all duration-200 tab-indicator ${
                  activeTab === "demo" ? "active bg-coral text-white" : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                <i className="fas fa-gamepad mr-2"></i>
                Interactive Demo
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`flex-1 px-3 py-2 text-sm font-medium rounded-r-lg transition-all duration-200 tab-indicator ${
                  activeTab === "code" ? "active bg-coral text-white" : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white"
                }`}
              >
                <i className="fas fa-code mr-2"></i>
                Code Example
              </button>
            </div>
            
            {/* Tab Content */}
            {activeTab === "demo" && (
              <InteractiveDemo
                title={`Try ${project.title}`}
                description="Experience the core functionality"
                demoType={getDemoType()}
                className="mb-4"
              />
            )}
            
            {activeTab === "code" && codeExamples.length > 0 && (
              <CodePlayground
                example={codeExamples[0]}
                className="mb-4"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

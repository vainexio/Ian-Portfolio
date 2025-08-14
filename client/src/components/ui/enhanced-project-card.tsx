import { useState } from 'react';
import { Project, ProjectCategory } from '@shared/schema';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';

interface EnhancedProjectCardProps {
  project: Project;
  projectCategories: ProjectCategory[];
  index: number;
}

export default function EnhancedProjectCard({ project, projectCategories, index }: EnhancedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  
  const category = projectCategories.find(cat => cat.id === project.category);
  
  return (
    <div 
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`enhanced-project-card group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`glass-dark rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
        isHovered ? 'shadow-2xl shadow-coral/20' : 'shadow-lg'
      }`}>
        {/* Image Container with Enhanced Hover Effects */}
        <div className="relative overflow-hidden">
          <div className="aspect-video w-full">
            <img 
              src={project.image} 
              alt={project.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110 brightness-110' : 'scale-100'
              }`}
              loading="lazy"
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 transition-all duration-500 ${
            isHovered 
              ? 'bg-gradient-to-t from-navy/90 via-transparent to-transparent' 
              : 'bg-gradient-to-t from-navy/60 via-transparent to-transparent'
          }`}></div>
          
          {/* Category Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category?.colorClass || 'bg-coral/20 text-coral'} backdrop-blur-sm`}>
              {category?.label || project.category}
            </span>
          </div>
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 right-3">
              <div className="bg-amber/20 backdrop-blur-sm rounded-full p-2">
                <i className="fas fa-star text-amber text-sm"></i>
              </div>
            </div>
          )}

          {/* Floating Action Buttons */}
          <div className={`absolute bottom-3 right-3 flex gap-2 transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {project.demo && (
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass rounded-full p-3 text-white hover:bg-coral/20 hover:text-coral transition-all duration-300 hover:scale-110"
              >
                <i className="fas fa-external-link-alt text-sm"></i>
              </a>
            )}
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass rounded-full p-3 text-white hover:bg-coral/20 hover:text-coral transition-all duration-300 hover:scale-110"
              >
                <i className="fab fa-github text-sm"></i>
              </a>
            )}
            {project.roblox && (
              <a 
                href={project.roblox} 
                target="_blank" 
                rel="noopener noreferrer"
                className="glass rounded-full p-3 text-white hover:bg-coral/20 hover:text-coral transition-all duration-300 hover:scale-110"
              >
                <i className="fas fa-gamepad text-sm"></i>
              </a>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-coral transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-gray-300 mb-4 leading-relaxed">
            {project.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies.map((tech, techIndex) => (
              <span 
                key={techIndex}
                className={`text-xs px-3 py-1 rounded-full glass text-gray-300 transition-all duration-300 hover:scale-105 ${
                  isHovered ? 'hover:bg-coral/20 hover:text-coral' : ''
                }`}
                style={{ transitionDelay: `${techIndex * 50}ms` }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Stats */}
          {project.stats && Object.keys(project.stats).length > 0 && (
            <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-white/10">
              {Object.entries(project.stats).slice(0, 4).map(([key, value], statIndex) => (
                <div 
                  key={key}
                  className={`text-center transition-all duration-300 ${
                    isHovered ? 'transform translate-y-0' : 'transform translate-y-1'
                  }`}
                  style={{ transitionDelay: `${statIndex * 100}ms` }}
                >
                  <div className="text-coral font-bold text-sm">{value}</div>
                  <div className="text-gray-400 text-xs capitalize">{key}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Glow Effect */}
        <div className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none ${
          isHovered 
            ? 'bg-gradient-to-br from-coral/5 via-transparent to-purple/5' 
            : 'bg-transparent'
        }`}></div>
      </div>
    </div>
  );
}
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Achievement, Experience, Specialty, InteractiveElements } from "@shared/schema";
import { CreativeQuoteGenerator } from "@/components/ui/creative-interactions";

interface AboutProps {
  specialties: Specialty[];
  achievements: Achievement[];
  experience: Experience[];
  interactiveElements: InteractiveElements;
}

export default function About({ specialties, achievements, experience, interactiveElements }: AboutProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" ref={ref} className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h2 className="text-5xl font-bold gradient-text mb-6">About Me</h2>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Passionate developer with expertise across multiple platforms, creating solutions that bridge creativity and functionality.
          </p>
        </div>

        {/* Development Categories */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {specialties.map((category, index) => (
            <div 
              key={category.title}
              className={`glass-dark rounded-3xl p-8 hover:scale-105 hover:shadow-2xl hover:shadow-${category.color}/20 transition-all duration-700 group ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`text-${category.color} text-5xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <i className={category.icon}></i>
              </div>
              <h3 className={`text-2xl font-bold mb-2 text-${category.color} group-hover:text-white transition-colors duration-300`}>
                {category.title}
              </h3>
              <p className="text-gray-400 text-sm mb-4 italic">{category.tagline}</p>
              <p className="text-white mb-6 leading-relaxed">{category.description}</p>
              <div className="flex flex-wrap gap-2">
                {category.technologies.map((tech, techIndex) => (
                  <span 
                    key={tech} 
                    className={`bg-${category.color}/20 text-${category.color} px-3 py-1 rounded-full text-sm hover:bg-${category.color}/30 hover:scale-105 transition-all duration-300 cursor-default`}
                    style={{ animationDelay: `${(index * 100) + (techIndex * 50)}ms` }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section - Timeline */}
        <div className={`mb-16 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h3 className="text-3xl font-bold gradient-text mb-8 text-center">Professional Experience</h3>
          <div className="relative">
            {/* Timeline Line - placed behind cards */}
            <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-1 h-full bg-gradient-to-b from-coral via-cyan to-purple rounded-full opacity-30 z-0 pointer-events-none"></div>

            <div className="space-y-8 md:space-y-12 relative z-10">
              {experience.map((exp, index) => (
                <div 
                  key={index}
                  className={`group relative transition-all duration-1000 hover:scale-[1.02] ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                  }`}
                  style={{ transitionDelay: `${(index + 3) * 150}ms` }}
                >
                  {/* Enhanced Timeline Structure for Mobile and Desktop */}
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
                    
                    {/* Mobile: Timeline Dot and Icon Side by Side */}
                    <div className="flex md:hidden items-center gap-4 w-full">
                      {/* Timeline Dot */}
                      <div className="w-4 h-4 bg-coral rounded-full animate-pulse flex-shrink-0 relative">
                        <div className="absolute inset-0 bg-coral rounded-full animate-ping opacity-75"></div>
                        <div className="absolute inset-0 bg-coral rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                      </div>
                      
                      {/* Job Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-coral to-purple rounded-full flex items-center justify-center text-white text-lg shadow-lg group-hover:shadow-2xl group-hover:shadow-coral/50 transition-all duration-500 group-hover:rotate-12 flex-shrink-0">
                        <i className="fas fa-briefcase group-hover:scale-110 transition-transform duration-300"></i>
                      </div>
                      
                      {/* Mobile Header */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg font-bold text-coral mb-1 truncate">{exp.position}</h4>
                        <p className="text-cyan font-medium text-sm truncate">{exp.company}</p>
                        <span className="text-amber text-xs">{exp.period}</span>
                      </div>
                    </div>

                    {/* Desktop: Alternating Layout */}
                    <div className={`hidden md:flex items-center w-full ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                      
                      {/* Content Card */}
                      <div className={`glass-dark rounded-2xl p-6 hover:scale-105 transition-all duration-500 flex-1 max-w-md relative z-20 group-hover:shadow-2xl group-hover:shadow-coral/20 ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}>
                        <div className="mb-4">
                          <h4 className="text-xl font-bold text-coral mb-1 group-hover:text-white transition-colors duration-300">{exp.position}</h4>
                          <p className="text-cyan font-medium group-hover:text-amber transition-colors duration-300">{exp.company}</p>
                          <span className="text-amber text-sm group-hover:text-coral transition-colors duration-300">{exp.period}</span>
                        </div>
                        <p className="text-white mb-4 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, techIndex) => (
                            <span 
                              key={tech} 
                              className="bg-purple/20 text-purple px-3 py-1 rounded-full text-sm hover:bg-purple/30 hover:scale-105 transition-all duration-300 group-hover:bg-coral/20 group-hover:text-coral"
                              style={{ animationDelay: `${techIndex * 100}ms` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Centered Job Icon with Focus Ring */}
                      <div className="relative flex items-center justify-center flex-shrink-0">
                        {/* Timeline Dot - Centered */}
                        <div className="absolute w-4 h-4 bg-coral rounded-full animate-pulse z-10">
                          <div className="absolute inset-0 bg-coral rounded-full animate-ping opacity-75"></div>
                          <div className="absolute inset-0 bg-coral rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                        </div>
                        
                        {/* Focus Ring */}
                        <div className="absolute w-20 h-20 border-2 border-coral/30 rounded-full group-hover:border-coral group-hover:scale-110 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                        
                        {/* Job Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-coral to-purple rounded-full flex items-center justify-center text-white text-xl shadow-lg relative z-20 group-hover:shadow-2xl group-hover:shadow-coral/50 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                          <i className="fas fa-briefcase group-hover:scale-110 transition-transform duration-300"></i>
                        </div>
                      </div>
                    </div>

                    {/* Mobile: Content Card (Full Width) */}
                    <div className="md:hidden w-full ml-8 pl-4 border-l-2 border-coral/30">
                      <div className="glass-dark rounded-xl p-4 hover:scale-[1.02] transition-all duration-500 group-hover:shadow-xl group-hover:shadow-coral/20">
                        <p className="text-white text-sm mb-3 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">{exp.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.technologies.map((tech, techIndex) => (
                            <span 
                              key={tech} 
                              className="bg-purple/20 text-purple px-2 py-1 rounded-full text-xs hover:bg-purple/30 hover:scale-105 transition-all duration-300 group-hover:bg-coral/20 group-hover:text-coral"
                              style={{ animationDelay: `${techIndex * 100}ms` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Universe removed */}

        {/* Creative Philosophy */}
        <div className={`mb-16 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h3 className="text-3xl font-bold gradient-text mb-8 text-center">Creative Philosophy</h3>
          <div className="text-center">
            <CreativeQuoteGenerator quotes={interactiveElements.quotes} />
          </div>
        </div>

        {/* Achievements Section */}
        <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          <h3 className="text-3xl font-bold gradient-text mb-8 text-center">Achievements & Certifications</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`glass rounded-2xl p-6 project-card transition-all duration-1000 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                }`}
                style={{ transitionDelay: `${(index + 6) * 150}ms` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-amber/20 p-3 rounded-xl flex-shrink-0">
                    <i className="fas fa-trophy text-amber text-xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1">{achievement.title}</h4>
                    <p className="text-cyan text-sm mb-2">{achievement.organization} • {achievement.date}</p>
                    <p className="text-white text-sm">{achievement.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

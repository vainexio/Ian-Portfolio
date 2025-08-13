import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Achievement, Experience, Specialty } from "@shared/schema";

interface AboutProps {
  specialties: Specialty[];
  achievements: Achievement[];
  experience: Experience[];
}

export default function About({ specialties, achievements, experience }: AboutProps) {
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

            <div className="space-y-12 relative z-10">
              {experience.map((exp, index) => (
                <div 
                  key={index}
                  className={`relative flex items-center transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                  } ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  style={{ transitionDelay: `${(index + 3) * 150}ms` }}
                >
                  {/* Timeline Dot - moved behind by lowering z-index and responsive positioning */}
                  <div className="absolute left-8 md:left-1/2 md:transform md:-translate-x-1/2 w-4 h-4 bg-coral rounded-full z-0 animate-pulse pointer-events-none"></div>

                  {/* Job Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br from-coral to-purple rounded-full flex items-center justify-center text-white text-xl mx-8 shadow-lg relative z-20 ${index % 2 === 0 ? 'order-2' : 'order-1'}`}>
                    <i className="fas fa-briefcase"></i>
                  </div>

                  {/* Content Card */}
                  <div className={`glass-dark rounded-2xl p-6 hover:scale-105 transition-all duration-500 flex-1 max-w-md relative z-20 ${index % 2 === 0 ? 'order-1' : 'order-2'}`}>
                    <div className="mb-4">
                      <h4 className="text-xl font-bold text-coral mb-1">{exp.position}</h4>
                      <p className="text-cyan font-medium">{exp.company}</p>
                      <span className="text-amber text-sm">{exp.period}</span>
                    </div>
                    <p className="text-white mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={tech} 
                          className="bg-purple/20 text-purple px-3 py-1 rounded-full text-sm hover:bg-purple/30 hover:scale-105 transition-all duration-300"
                          style={{ animationDelay: `${techIndex * 100}ms` }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
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

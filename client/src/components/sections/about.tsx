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
              className={`group relative overflow-hidden rounded-3xl transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-10px) rotateX(5deg) rotateY(2deg)';
                target.style.boxShadow = `0 25px 50px -10px var(--${category.color})40`;
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
                target.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
              }}
              data-testid={`specialty-card-${index}`}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl"
                  style={{ backgroundColor: `var(--${category.color})`, opacity: 0.1 }}
                ></div>
                <div 
                  className="absolute bottom-0 left-0 w-24 h-24 rounded-full blur-2xl"
                  style={{ backgroundColor: `var(--${category.color})`, opacity: 0.15 }}
                ></div>
              </div>

              {/* Floating Particles */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 rounded-full animate-pulse"
                    style={{
                      backgroundColor: `var(--${category.color})`,
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${i * 200}ms`,
                      animationDuration: '2s'
                    }}
                  ></div>
                ))}
              </div>

              <div className="relative z-10 p-8">
                {/* Enhanced Icon Section */}
                <div className="relative mb-8">
                  <div 
                    className="absolute inset-0 w-20 h-20 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:animate-pulse"
                    style={{ backgroundColor: `var(--${category.color})` }}
                  ></div>
                  <div 
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
                    style={{ 
                      background: `linear-gradient(135deg, var(--${category.color})30, var(--${category.color})10)`,
                      border: `2px solid var(--${category.color})40`
                    }}
                  >
                    <i 
                      className={`${category.icon} text-3xl transition-all duration-300 group-hover:scale-110`}
                      style={{ color: `var(--${category.color})` }}
                    ></i>
                  </div>
                  
                  {/* Orbit Animation */}
                  <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div 
                      className="absolute w-2 h-2 rounded-full animate-spin"
                      style={{ 
                        backgroundColor: `var(--${category.color})`,
                        animationDuration: '3s',
                        top: '-4px',
                        left: '50%',
                        transformOrigin: '0 44px'
                      }}
                    ></div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="space-y-4">
                  <h3 
                    className="text-2xl font-bold group-hover:text-white transition-all duration-300 transform group-hover:translate-x-1"
                    style={{ color: `var(--${category.color})` }}
                  >
                    {category.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm italic leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {category.tagline}
                  </p>
                  
                  <p className="text-white leading-relaxed text-sm group-hover:text-gray-100 transition-colors duration-300 min-h-[60px]">
                    {category.description}
                  </p>
                  
                  {/* Enhanced Technology Tags */}
                  <div className="pt-2">
                    <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      {category.technologies.map((tech, techIndex) => (
                        <span 
                          key={tech} 
                          className="px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 cursor-default backdrop-blur-sm"
                          style={{ 
                            backgroundColor: `var(--${category.color})20`,
                            color: `var(--${category.color})`,
                            border: `1px solid var(--${category.color})30`,
                            animationDelay: `${techIndex * 100}ms`
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = `var(--${category.color})30`;
                            e.currentTarget.style.borderColor = `var(--${category.color})60`;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = `var(--${category.color})20`;
                            e.currentTarget.style.borderColor = `var(--${category.color})30`;
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div 
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-700 ease-out"
                  style={{ backgroundColor: `var(--${category.color})` }}
                ></div>

                {/* Corner Accent */}
                <div 
                  className="absolute top-4 right-4 w-0 h-0 group-hover:w-6 group-hover:h-6 transition-all duration-500"
                  style={{ 
                    backgroundColor: `var(--${category.color})`,
                    clipPath: 'polygon(100% 0%, 0% 100%, 100% 100%)',
                    opacity: 0.3
                  }}
                ></div>
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

        {/* Achievements Section - Hexagonal Design */}
        <div className={`relative transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
          {/* Cosmic Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-amber/5 to-transparent rounded-full animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-purple/5 to-transparent rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan/3 to-transparent rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>

          {/* Title Section with Trophy Constellation */}
          <div className="relative text-center mb-20">
            <div className="relative inline-block">
              <h3 className="text-5xl md:text-7xl font-black mb-6 relative z-10">
                <span className="bg-gradient-to-r from-amber via-yellow-400 to-amber bg-clip-text text-transparent animate-pulse">
                  ACHIEVEMENTS
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple via-cyan to-purple bg-clip-text text-transparent">
                  & CERTIFICATIONS
                </span>
              </h3>
              
              {/* Floating Trophy Constellation */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute opacity-30 animate-float"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  >
                    <i className="fas fa-trophy text-amber text-xs"></i>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Excellence recognized, milestones conquered, legacy built
              </p>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-amber to-transparent"></div>
            </div>
          </div>
          
          {/* Hexagonal Achievement Grid */}
          <div className="relative max-w-6xl mx-auto">
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <div 
                  key={index}
                  className={`group relative transition-all duration-1000 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
                  }`}
                  style={{ transitionDelay: `${(index + 6) * 200}ms` }}
                  data-testid={`achievement-card-${index}`}
                >
                  {/* Compact Hexagonal Card Container */}
                  <div className="relative">
                    {/* Main Hexagonal Shape - Smaller and Wider */}
                    <div 
                      className="relative overflow-hidden transition-all duration-700 group-hover:scale-102"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.7) 100%)',
                        backdropFilter: 'blur(25px)',
                        border: '2px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        clipPath: 'polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)',
                        height: '140px'
                      }}
                      onMouseEnter={(e) => {
                        const target = e.currentTarget;
                        target.style.background = 'linear-gradient(135deg, rgba(255,193,7,0.08) 0%, rgba(0,0,0,0.85) 50%, rgba(147,51,234,0.08) 100%)';
                        target.style.borderColor = 'rgba(255,193,7,0.3)';
                        target.style.boxShadow = '0 0 40px rgba(255,193,7,0.2), 0 0 60px rgba(147,51,234,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        const target = e.currentTarget;
                        target.style.background = 'linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.7) 100%)';
                        target.style.borderColor = 'rgba(255,255,255,0.1)';
                        target.style.boxShadow = 'none';
                      }}
                    >
                      {/* Geometric Pattern Overlay */}
                      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `
                            radial-gradient(circle at 25% 25%, rgba(255,193,7,0.2) 1px, transparent 1px),
                            radial-gradient(circle at 75% 75%, rgba(147,51,234,0.2) 1px, transparent 1px),
                            linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.03) 50%, transparent 60%)
                          `,
                          backgroundSize: '30px 30px, 30px 30px, 60px 60px'
                        }}></div>
                      </div>

                      {/* Floating Elements */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {[...Array(4)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute animate-ping"
                            style={{
                              top: `${30 + Math.random() * 40}%`,
                              left: `${20 + Math.random() * 60}%`,
                              animationDelay: `${i * 400}ms`,
                              animationDuration: '2s'
                            }}
                          >
                            <div className="w-1.5 h-1.5 bg-amber rounded-full opacity-50"></div>
                          </div>
                        ))}
                      </div>

                      <div className="relative z-10 flex items-center h-full px-8 py-6">
                        {/* Compact Achievement Icon */}
                        <div className="flex-shrink-0 mr-6">
                          <div className="relative">
                            {/* Rotating Ring */}
                            <div className="absolute inset-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                              <div className="w-full h-full border-2 border-amber border-dashed rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
                            </div>
                            
                            {/* Icon Container */}
                            <div 
                              className="relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-6"
                              style={{
                                background: 'conic-gradient(from 0deg, rgba(255,193,7,0.6), rgba(147,51,234,0.6), rgba(34,197,94,0.6), rgba(255,193,7,0.6))',
                                padding: '2px'
                              }}
                            >
                              <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                                <i className="fas fa-trophy text-amber text-xl group-hover:animate-bounce"></i>
                              </div>
                            </div>

                            {/* Orbiting Elements */}
                            <div className="absolute inset-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                              {[0, 180].map((rotation, i) => (
                                <div
                                  key={i}
                                  className="absolute w-2 h-2 bg-gradient-to-r from-amber to-purple rounded-full"
                                  style={{
                                    top: '50%',
                                    left: '50%',
                                    transform: `translate(-50%, -50%) rotate(${rotation}deg) translateY(-12px)`,
                                    animation: `orbit 3s linear infinite`,
                                    animationDelay: `${i * 1.5}s`
                                  }}
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Achievement Content - Horizontal Layout */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xl font-bold text-white group-hover:text-amber transition-colors duration-500 leading-tight mb-2 truncate">
                                {achievement.title}
                              </h4>
                              
                              <div className="flex items-center space-x-4 mb-2">
                                <div className="flex items-center space-x-2 text-cyan group-hover:text-white transition-colors duration-300">
                                  <i className="fas fa-building text-sm"></i>
                                  <span className="font-medium text-sm">{achievement.organization}</span>
                                </div>
                                
                                <div className="flex items-center space-x-1 text-amber">
                                  <i className="fas fa-calendar text-sm"></i>
                                  <span className="font-medium text-sm">{achievement.date}</span>
                                </div>
                              </div>
                              
                              <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm leading-relaxed line-clamp-2">
                                {achievement.description}
                              </p>
                            </div>

                            {/* Achievement Number Badge */}
                            <div className="ml-4 flex-shrink-0">
                              <div className="w-8 h-8 bg-gradient-to-r from-amber to-purple rounded-full flex items-center justify-center text-black text-xs font-bold">
                                {index + 1}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Corner Accent Elements */}
                        <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-4 h-4 border-l border-t border-amber"></div>
                        </div>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-4 h-4 border-r border-t border-purple"></div>
                        </div>
                        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-4 h-4 border-l border-b border-cyan"></div>
                        </div>
                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="w-4 h-4 border-r border-b border-amber"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

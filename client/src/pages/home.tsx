import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Skills from "@/components/sections/skills";
import Projects from "@/components/sections/projects";
import Contact from "@/components/sections/contact";
import FloatingNav from "@/components/ui/floating-nav";
import ParticleBackground from "@/components/ui/particle-background";
import CursorFollower from "@/components/ui/cursor-follower";
import SoundEffects from "@/components/ui/sound-effects";
import MobileMenu from "@/components/ui/mobile-menu";
import { 
  FloatingSkillBubbles, 
  ProjectConstellation, 
  CreativeQuoteGenerator, 
  SkillsRadar 
} from "@/components/ui/creative-interactions";
import { TalentDiscovery, ProjectJourney } from "@/components/ui/curiosity-triggers";

import SectionDivider from "@/components/ui/section-divider";
import { PortfolioData } from "@shared/schema";

export default function Home() {
  const { data: portfolio, isLoading } = useQuery<PortfolioData>({
    queryKey: ["/api/portfolio"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-space flex items-center justify-center px-4">
        <div className="glass rounded-2xl md:rounded-3xl p-6 md:p-8">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-coral mx-auto"></div>
          <p className="text-white mt-4 text-center text-sm md:text-base">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-space flex items-center justify-center">
        <div className="glass rounded-3xl p-8 text-center">
          <i className="fas fa-exclamation-triangle text-coral text-4xl mb-4"></i>
          <p className="text-white text-xl">Portfolio data not found</p>
          <p className="text-gray-300 mt-2">Please check your configuration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced immersive background with particles */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-transparent to-gray-900/50"></div>
        {/* Animated background orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-coral/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-purple/40 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-cyan/30 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-amber/20 rounded-full blur-3xl animate-float" style={{animationDelay: '6s'}}></div>
        <div className="absolute bottom-1/3 right-10 w-56 h-56 bg-green-400/20 rounded-full blur-3xl animate-float" style={{animationDelay: '8s'}}></div>
        
        {/* Interactive particle background */}
        <ParticleBackground 
          className="opacity-80" 
          particleCount={60} 
          mouseInteraction={true} 
        />
      </div>
      
      {/* Interactive cursor follower */}
      <CursorFollower size={24} delay={0.1} />
      
      {/* Optional sound effects */}
      <SoundEffects enabled={false} volume={0.2} />
      
      {/* Creative Interactive Elements removed */}
      
      {/* Content */}
      <div className="relative z-10 text-white">
        <FloatingNav />
        <MobileMenu />
        <Hero personal={portfolio.personal} interactiveElements={portfolio.interactiveElements} />
        <SectionDivider direction="down" color="coral" />
        <About specialties={portfolio.specialties} achievements={portfolio.achievements} experience={portfolio.experience} interactiveElements={portfolio.interactiveElements} />
        <SectionDivider direction="up" color="purple" />
        <Skills skills={portfolio.skills} interactiveElements={portfolio.interactiveElements} />
        <SectionDivider direction="down" color="cyan" />
        <Projects projects={portfolio.projects} projectCategories={portfolio.projectCategories} />
        <SectionDivider direction="up" color="amber" />
        
        {/* Enhanced Explore My World Section */}
        <section className="py-20 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-10 w-32 h-32 bg-coral/10 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-1/3 right-20 w-48 h-48 bg-purple/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-cyan/10 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
          </div>
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-coral to-purple rounded-full mb-6 animate-pulse">
                <i className="fas fa-compass text-white text-2xl"></i>
              </div>
              <h2 className="text-5xl font-bold gradient-text mb-6">Explore My World</h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
                Embark on an interactive journey through my professional universe. 
                Discover hidden talents, explore project timelines, and experience my creative philosophy.
              </p>
            </div>
            
            {/* Enhanced grid layout with staggered animations */}
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8">
                <div className="transform hover:scale-105 transition-all duration-700 animate-slide-in-left">
                  <TalentDiscovery talents={portfolio.interactiveElements.talents} />
                </div>
                
                {/* Additional interactive element */}
                <div className="glass-dark rounded-2xl p-6 backdrop-blur-lg border border-white/10 hover:border-coral/30 transition-all duration-500 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-amber/20 rounded-full mb-4">
                      <i className="fas fa-lightbulb text-amber text-xl"></i>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3">Innovation Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 glass rounded-lg">
                        <div className="text-2xl font-bold text-coral">850+</div>
                        <div className="text-xs text-gray-400">Communities Served</div>
                      </div>
                      <div className="text-center p-3 glass rounded-lg">
                        <div className="text-2xl font-bold text-purple">4K+</div>
                        <div className="text-xs text-gray-400">Active Players</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="transform hover:scale-105 transition-all duration-700 animate-slide-in-right">
                  <ProjectJourney journey={portfolio.interactiveElements.journey} />
                </div>
                
                {/* Technology stack showcase */}
                <div className="glass-dark rounded-2xl p-6 backdrop-blur-lg border border-white/10 hover:border-purple/30 transition-all duration-500 animate-slide-in-right" style={{animationDelay: '0.2s'}}>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan/20 rounded-full mb-4">
                      <i className="fas fa-code text-cyan text-xl"></i>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-3">Tech Arsenal</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {['React', 'Node.js', 'TypeScript', 'Discord.js', 'Luau', 'PostgreSQL'].map((tech, index) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-cyan/20 to-purple/20 rounded-full text-xs text-white border border-white/10 hover:border-cyan/30 transition-all duration-300 hover:scale-110 cursor-default"
                          style={{animationDelay: `${index * 100}ms`}}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to action */}
            <div className="text-center mt-16">
              <div className="inline-flex items-center space-x-2 text-gray-400">
                <span className="animate-pulse">→</span>
                <span className="text-sm">Scroll down to see my technical skills visualization</span>
                <span className="animate-pulse">←</span>
              </div>
            </div>
          </div>
        </section>
        
        <SectionDivider direction="down" color="coral" />
        <Contact contact={portfolio.contact} />
        
        {/* Footer */}
        <footer className="py-12 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-300">© 2024 {portfolio.personal.name}. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href={`https://${portfolio.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-coral transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href={`https://${portfolio.contact.facebook}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-coral transition-colors">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              {portfolio.contact.viber && (
                <a href={`viber://chat?number=${encodeURIComponent(portfolio.contact.viber)}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-coral transition-colors">
                  <i className="fab fa-viber text-xl"></i>
                </a>
              )}
              {portfolio.contact.discord && (
                <a href={`https://${portfolio.contact.discord}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-coral transition-colors">
                  <i className="fab fa-discord text-xl"></i>
                </a>
              )}
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

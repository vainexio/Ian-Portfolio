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
        
        {/* Curiosity & Engagement Section */}
        <section className="py-16 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold gradient-text mb-6">Explore My World</h2>
              <p className="text-xl text-white max-w-2xl mx-auto">
                Discover unique insights, interact with my journey, and uncover hidden talents
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <TalentDiscovery talents={portfolio.interactiveElements.talents} />
              </div>
              <div>
                <ProjectJourney journey={portfolio.interactiveElements.journey} />
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

import { PersonalInfo } from "@shared/schema";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

interface HeroProps {
  personal: PersonalInfo;
}

export default function Hero({ personal }: HeroProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="hero" ref={ref} className="min-h-screen relative overflow-hidden flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="glass rounded-2xl p-2 inline-block">
              <span className="text-coral font-medium px-4 py-2 text-white">👋 Hello, I'm</span>
            </div>
            <h1 className="text-6xl lg:text-8xl font-bold gradient-text leading-tight">
              {personal.name}
            </h1>
            <p className="text-xl lg:text-2xl text-white leading-relaxed">
              {personal.bio}
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                className="btn-3d glass-dark rounded-xl px-8 py-4 font-semibold text-white hover:text-coral group relative overflow-hidden"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10">
                  <i className="fas fa-folder-open mr-2 group-hover:animate-bounce transition-transform duration-300"></i>
                  My Projects
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-coral/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              <button 
                className="btn-3d bg-gradient-to-r from-coral to-purple rounded-xl px-8 py-4 font-semibold text-white hover:from-coral/90 hover:to-purple/90 group relative overflow-hidden"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10">
                  <i className="fas fa-envelope mr-2 group-hover:animate-pulse transition-transform duration-300"></i>
                  Let's Talk
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
          
          <div className={`relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="glass-dark rounded-3xl p-8 transform rotate-3 hover:rotate-1 transition-transform duration-500">
              <img 
                src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                alt="Modern coding workspace setup" 
                className="rounded-2xl w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent rounded-3xl"></div>
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-coral rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-amber rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <div className="w-3 h-3 bg-purple rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                  </div>
                  <span className="text-sm text-gray-300">Currently coding...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

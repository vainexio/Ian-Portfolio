import { useState, useEffect } from "react";
import { PersonalInfo, InteractiveElements } from "@shared/schema";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import InteractivePlayground from "@/components/ui/interactive-playground";

interface HeroProps {
  personal: PersonalInfo;
  interactiveElements: InteractiveElements;
}

export default function Hero({ personal, interactiveElements }: HeroProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [nameLetters, setNameLetters] = useState<string[]>([]);
  const [showLetters, setShowLetters] = useState<boolean[]>([]);

  useEffect(() => {
    if (personal.name) {
      const letters = personal.name.split('');
      setNameLetters(letters);
      setShowLetters(new Array(letters.length).fill(false));
      
      // Animate letters in sequence when visible
      if (isVisible) {
        letters.forEach((_, index) => {
          setTimeout(() => {
            setShowLetters(prev => {
              const newState = [...prev];
              newState[index] = true;
              return newState;
            });
          }, index * 150 + 300); // Stagger each letter by 150ms
        });
      }
    }
  }, [personal.name, isVisible]);

  return (
    <section id="hero" ref={ref} className="min-h-screen relative overflow-hidden flex items-center">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className={`space-y-6 md:space-y-8 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="glass rounded-2xl p-2 inline-block">
              <span className="text-coral font-medium px-3 md:px-4 py-2 text-white text-sm md:text-base">👋 Hello, I'm</span>
            </div>
            {/* Enhanced Immersive Name Display */}
            <div className="relative group">
              {/* Floating Particles Background */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 200}ms`
                    }}
                  >
                    <div 
                      className="w-1 h-1 bg-coral rounded-full animate-pulse"
                      style={{
                        animationDuration: `${2 + Math.random() * 2}s`,
                        boxShadow: '0 0 10px var(--coral)'
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Main Name Container */}
              <h1 className="relative text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black leading-tight tracking-wider">
                {nameLetters.map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block relative transition-all duration-700 transform ${
                      showLetters[index] 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-75'
                    } hover:scale-110 hover:-translate-y-2`}
                    style={{
                      background: letter === ' ' ? 'transparent' : 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #96CEB4 75%, #FFEAA7 100%)',
                      backgroundSize: '300% 300%',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      animation: letter === ' ' ? 'none' : 'shimmer 3s ease-in-out infinite',
                      animationDelay: `${index * 0.1}s`,
                      filter: 'drop-shadow(0 0 10px rgba(255, 107, 107, 0.5)) drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                      textShadow: letter === ' ' ? 'none' : '0 0 20px rgba(255, 107, 107, 0.6), 0 0 40px rgba(78, 205, 196, 0.4)',
                      transitionDelay: `${index * 50}ms`
                    }}
                    onMouseEnter={(e) => {
                      if (letter !== ' ') {
                        e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(255, 107, 107, 0.8)) drop-shadow(0 8px 16px rgba(0,0,0,0.4))';
                        e.currentTarget.style.textShadow = '0 0 30px rgba(255, 107, 107, 0.9), 0 0 60px rgba(78, 205, 196, 0.6)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (letter !== ' ') {
                        e.currentTarget.style.filter = 'drop-shadow(0 0 10px rgba(255, 107, 107, 0.5)) drop-shadow(0 4px 8px rgba(0,0,0,0.3))';
                        e.currentTarget.style.textShadow = '0 0 20px rgba(255, 107, 107, 0.6), 0 0 40px rgba(78, 205, 196, 0.4)';
                      }
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                    
                    {/* Individual Letter Glow */}
                    {letter !== ' ' && (
                      <>
                        <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 bg-gradient-to-r from-coral via-cyan to-purple rounded-lg blur-md opacity-30 scale-110"></div>
                        </div>
                        
                        {/* Sparkle Effect on Hover */}
                        <div className="absolute -top-2 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <i className="fas fa-sparkles text-amber text-xs animate-pulse" style={{ animationDelay: `${index * 100}ms` }}></i>
                        </div>
                      </>
                    )}
                  </span>
                ))}
                
                {/* Typing Cursor Effect */}
                {isVisible && (
                  <span 
                    className="inline-block ml-2 w-1 bg-coral animate-pulse opacity-0"
                    style={{
                      height: '0.8em',
                      animationDelay: `${nameLetters.length * 150 + 500}ms`,
                      animationDuration: '1s',
                      boxShadow: '0 0 10px var(--coral)'
                    }}
                    onAnimationStart={(e) => {
                      if (e.currentTarget) {
                        e.currentTarget.style.opacity = '1';
                        setTimeout(() => {
                          if (e.currentTarget) {
                            e.currentTarget.style.opacity = '0';
                          }
                        }, 2000);
                      }
                    }}
                  ></span>
                )}
              </h1>

              {/* Ambient Glow Layer */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-coral/10 via-cyan/10 to-purple/10 rounded-3xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 scale-150"></div>
              </div>
            </div>
            <p className="text-lg md:text-xl lg:text-2xl text-white leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {personal.bio}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                className="btn-3d glass-dark rounded-xl px-6 md:px-8 py-3 md:py-4 font-semibold text-white hover:text-coral group relative overflow-hidden w-full sm:w-auto"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 text-sm md:text-base">
                  <i className="fas fa-folder-open mr-2 group-hover:animate-bounce transition-transform duration-300"></i>
                  My Projects
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-coral/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              <button 
                className="btn-3d bg-gradient-to-r from-coral to-purple rounded-xl px-6 md:px-8 py-3 md:py-4 font-semibold text-white hover:from-coral/90 hover:to-purple/90 group relative overflow-hidden w-full sm:w-auto"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="relative z-10 text-sm md:text-base">
                  <i className="fas fa-envelope mr-2 group-hover:animate-pulse transition-transform duration-300"></i>
                  Let's Talk
                </span>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
            </div>
          </div>
          
          <div className={`relative mt-8 lg:mt-0 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <InteractivePlayground introData={interactiveElements.introduction} />
          </div>
        </div>
      </div>
    </section>
  );
}

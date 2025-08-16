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
                      className="w-1 h-1 rounded-full animate-pulse"
                      style={{
                        background: 'rgba(180, 200, 255, 0.8)',
                        animationDuration: `${2 + Math.random() * 2}s`,
                        boxShadow: '0 0 10px rgba(180, 200, 255, 0.6)'
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              {/* Creative Name Display with Morphing Letters */}
              <h1 className="relative text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black leading-tight tracking-wider select-none">
                {nameLetters.map((letter, index) => (
                  <span
                    key={index}
                    className={`inline-block relative cursor-pointer transition-all duration-700 transform ${
                      showLetters[index] 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-8 scale-75'
                    } group/letter`}
                    style={{
                      color: letter === ' ' ? 'transparent' : '#ffffff',
                      textShadow: letter === ' ' ? 'none' : '0 0 30px rgba(180, 200, 255, 0.6), 0 0 60px rgba(180, 200, 255, 0.4), 0 0 90px rgba(180, 200, 255, 0.2)',
                      filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))',
                      transitionDelay: `${index * 50}ms`,
                      transformOrigin: 'center bottom'
                    }}
                    onMouseEnter={(e) => {
                      if (letter !== ' ') {
                        e.currentTarget.style.transform = 'translateY(-8px) rotateX(15deg) rotateY(5deg) scale(1.1)';
                        e.currentTarget.style.textShadow = '0 0 20px rgba(120, 180, 255, 0.8), 0 0 40px rgba(120, 180, 255, 0.6), 0 0 80px rgba(120, 180, 255, 0.4), 0 15px 30px rgba(0, 0, 0, 0.4)';
                        e.currentTarget.style.filter = 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5))';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (letter !== ' ') {
                        e.currentTarget.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg) scale(1)';
                        e.currentTarget.style.textShadow = '0 0 30px rgba(180, 200, 255, 0.6), 0 0 60px rgba(180, 200, 255, 0.4), 0 0 90px rgba(180, 200, 255, 0.2)';
                        e.currentTarget.style.filter = 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3))';
                      }
                    }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                    
                    {/* Floating Light Orbs Around Letters */}
                    {letter !== ' ' && (
                      <>
                        <div className="absolute inset-0 opacity-0 group-hover/letter:opacity-100 transition-all duration-500 pointer-events-none">
                          {[...Array(3)].map((_, orbIndex) => (
                            <div
                              key={orbIndex}
                              className="absolute w-2 h-2 rounded-full"
                              style={{
                                background: 'radial-gradient(circle, rgba(180, 200, 255, 0.8) 0%, transparent 70%)',
                                top: `${20 + Math.sin((orbIndex * 120) * Math.PI / 180) * 40}%`,
                                left: `${50 + Math.cos((orbIndex * 120) * Math.PI / 180) * 40}%`,
                                animation: `orbit-${orbIndex} 3s ease-in-out infinite`,
                                animationDelay: `${orbIndex * 0.5}s`,
                                boxShadow: '0 0 15px rgba(180, 200, 255, 0.6)'
                              }}
                            />
                          ))}
                        </div>
                        
                        {/* Energy Wave Effect */}
                        <div className="absolute inset-0 opacity-0 group-hover/letter:opacity-100 transition-all duration-300 pointer-events-none">
                          <div 
                            className="absolute inset-0 rounded-full"
                            style={{
                              background: 'radial-gradient(circle, transparent 30%, rgba(180, 200, 255, 0.1) 50%, transparent 70%)',
                              animation: 'pulse-wave 2s ease-out infinite'
                            }}
                          />
                        </div>
                      </>
                    )}
                  </span>
                ))}
                
                {/* Floating Constellation Effect */}
                {isVisible && (
                  <div className="absolute inset-0 pointer-events-none opacity-70">
                    {[...Array(8)].map((_, starIndex) => (
                      <div
                        key={starIndex}
                        className="absolute w-1 h-1 rounded-full animate-pulse"
                        style={{
                          background: 'rgba(180, 200, 255, 0.8)',
                          top: `${10 + Math.random() * 80}%`,
                          left: `${5 + Math.random() * 90}%`,
                          animationDelay: `${starIndex * 0.3}s`,
                          animationDuration: `${2 + Math.random() * 2}s`,
                          boxShadow: '0 0 8px rgba(180, 200, 255, 0.6)',
                          opacity: 0
                        }}
                        onAnimationIteration={(e) => {
                          e.currentTarget.style.opacity = Math.random() > 0.5 ? '1' : '0.3';
                        }}
                      />
                    ))}
                  </div>
                )}
              </h1>

              {/* Subtle Background Enhancement */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-white/5 to-blue-400/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
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

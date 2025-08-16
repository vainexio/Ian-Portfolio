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
    <section id="hero" ref={ref} className="min-h-screen relative overflow-hidden flex items-center pt-8 md:pt-0">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className={`space-y-6 md:space-y-8 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="glass rounded-2xl p-2 inline-block" data-logo="true">
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

              {/* Matrix-Style Digital Rain Name Display */}
              <div className="relative">
                {/* Matrix Rain Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                  {[...Array(12)].map((_, columnIndex) => (
                    <div
                      key={columnIndex}
                      className="absolute top-0 w-4 h-full"
                      style={{
                        left: `${columnIndex * 8.33}%`,
                        animationDelay: `${columnIndex * 0.2}s`
                      }}
                    >
                      {[...Array(20)].map((_, charIndex) => (
                        <div
                          key={charIndex}
                          className="absolute text-sm font-mono"
                          style={{
                            top: `${charIndex * 5}%`,
                            color: `rgba(255, 255, 255, ${0.1 + Math.random() * 0.3})`,
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
                            animation: `matrix-rain-${columnIndex % 3} ${3 + Math.random() * 2}s linear infinite`,
                            animationDelay: `${charIndex * 0.1}s`,
                            transform: `translateY(-${Math.random() * 100}px)`
                          }}
                        >
                          {String.fromCharCode(65 + Math.floor(Math.random() * 26))}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <h1 className="relative text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-mono font-black leading-tight tracking-wider select-none z-10">
                  {nameLetters.map((letter, index) => (
                    <span
                      key={index}
                      className={`inline-block relative cursor-pointer transition-all duration-700 transform ${
                        showLetters[index] 
                          ? 'opacity-100 translate-y-0 scale-100' 
                          : 'opacity-0 translate-y-8 scale-75'
                      } group/letter`}
                      style={{
                        color: letter === ' ' ? 'transparent' : 'rgba(255, 255, 255, 0.9)',
                        textShadow: letter === ' ' ? 'none' : '0 0 15px rgba(255, 255, 255, 0.4), 0 0 30px rgba(255, 255, 255, 0.2), 0 0 45px rgba(255, 255, 255, 0.1)',
                        filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5))',
                        transitionDelay: `${index * 50}ms`,
                        fontFamily: 'monospace',
                        fontWeight: 'bold'
                      }}
                      onMouseEnter={(e) => {
                        if (letter !== ' ' && e.currentTarget) {
                          // Create witty "decoding" effect
                          e.currentTarget.classList.add('letter-decoding');
                          
                          // Add floating binary code around the letter
                          const letterElement = e.currentTarget;
                          const binaryOverlay = document.createElement('div');
                          binaryOverlay.className = 'absolute inset-0 pointer-events-none letter-binary-overlay';
                          
                          // Generate binary representation of the letter
                          const binaryCode = letter.charCodeAt(0).toString(2).padStart(8, '0');
                          
                          // Create floating binary digits
                          for (let i = 0; i < 8; i++) {
                            const digit = document.createElement('span');
                            digit.textContent = binaryCode[i];
                            digit.className = 'absolute text-xs font-mono animate-bounce';
                            digit.style.cssText = `
                              color: rgba(0, 255, 100, 0.8);
                              text-shadow: 0 0 5px rgba(0, 255, 100, 0.6);
                              top: ${-20 - Math.random() * 20}px;
                              left: ${Math.random() * 100}%;
                              animation-delay: ${i * 0.1}s;
                              animation-duration: ${0.5 + Math.random() * 0.5}s;
                            `;
                            binaryOverlay.appendChild(digit);
                          }
                          
                          letterElement.appendChild(binaryOverlay);
                          
                          // Add ASCII code tooltip
                          const asciiTooltip = document.createElement('div');
                          asciiTooltip.className = 'absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-mono bg-black/80 px-2 py-1 rounded ascii-tooltip';
                          asciiTooltip.textContent = `ASCII: ${letter.charCodeAt(0)}`;
                          asciiTooltip.style.cssText = `
                            color: rgba(0, 255, 100, 0.9);
                            border: 1px solid rgba(0, 255, 100, 0.3);
                            text-shadow: 0 0 5px rgba(0, 255, 100, 0.6);
                            opacity: 0;
                            animation: fade-in-tooltip 0.3s ease-out forwards;
                          `;
                          letterElement.appendChild(asciiTooltip);
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (letter !== ' ' && e.currentTarget) {
                          e.currentTarget.classList.remove('letter-decoding');
                          
                          // Remove all overlay elements
                          const overlays = e.currentTarget.querySelectorAll('.letter-binary-overlay, .ascii-tooltip');
                          overlays.forEach(overlay => overlay.remove());
                        }
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                      
                      {/* Matrix Code Streams */}
                      {letter !== ' ' && (
                        <div className="absolute inset-0 opacity-0 group-hover/letter:opacity-100 transition-all duration-300 pointer-events-none overflow-hidden">
                          {[...Array(5)].map((_, streamIndex) => (
                            <div
                              key={streamIndex}
                              className="absolute text-xs font-mono"
                              style={{
                                top: '-20px',
                                left: `${20 + streamIndex * 15}%`,
                                color: 'rgba(255, 255, 255, 0.5)',
                                textShadow: '0 0 5px rgba(255, 255, 255, 0.4)',
                                animation: `digital-fall ${0.5 + streamIndex * 0.1}s linear infinite`,
                                animationDelay: `${streamIndex * 0.1}s`
                              }}
                            >
                              {String.fromCharCode(48 + Math.floor(Math.random() * 10))}
                            </div>
                          ))}
                        </div>
                      )}
                    </span>
                  ))}
                </h1>

                {/* Matrix-style Digital Readout */}
                {isVisible && (
                  <div className="absolute -bottom-8 left-0 right-0 flex justify-center opacity-60">
                    <div className="text-sm font-mono text-white/60" style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}>
                      {'>'} INITIALIZING_PORTFOLIO.EXE {'<'}
                    </div>
                  </div>
                )}
              </div>

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

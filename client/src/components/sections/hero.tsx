import { PersonalInfo, InteractiveElements } from "@shared/schema";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import InteractivePlayground from "@/components/ui/interactive-playground";
import { useState, useEffect, useRef } from 'react';

interface HeroProps {
  personal: PersonalInfo;
  interactiveElements: InteractiveElements;
}

export default function Hero({ personal, interactiveElements }: HeroProps) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [displayedName, setDisplayedName] = useState('');
  const [isTypingName, setIsTypingName] = useState(false);
  const nameTypewriterRef = useRef<NodeJS.Timeout>();

  // Enhanced human-like typing for name (slower speed)
  const typeWriterName = (text: string, index = 0) => {
    if (index < text.length) {
      const char = text[index];
      let nextDelay = 120 + Math.random() * 180; // Slower base typing speed
      
      // Add longer natural pauses for name
      if (char === ' ') nextDelay += 300;
      if (char === '.') nextDelay += 500;
      
      // Simulate occasional typos (3% chance for name - less frequent)
      if (Math.random() < 0.03 && char.match(/[a-zA-Z]/)) {
        const typoChars = 'abcdefghijklmnopqrstuvwxyz';
        const typo = typoChars[Math.floor(Math.random() * typoChars.length)];
        
        // Type wrong character
        setDisplayedName(text.substring(0, index) + typo);
        
        nameTypewriterRef.current = setTimeout(() => {
          // Backspace and correct
          setDisplayedName(text.substring(0, index));
          
          nameTypewriterRef.current = setTimeout(() => {
            setDisplayedName(text.substring(0, index + 1));
            nameTypewriterRef.current = setTimeout(() => typeWriterName(text, index + 1), nextDelay);
          }, 150);
        }, 400);
      } else {
        setDisplayedName(text.substring(0, index + 1));
        nameTypewriterRef.current = setTimeout(() => typeWriterName(text, index + 1), nextDelay);
      }
    } else {
      setIsTypingName(false);
    }
  };

  // Start typing animation when component becomes visible
  useEffect(() => {
    if (isVisible && !isTypingName && displayedName === '') {
      setIsTypingName(true);
      // Add small delay before starting name typing
      setTimeout(() => {
        typeWriterName(personal.name);
      }, 800);
    }

    return () => {
      if (nameTypewriterRef.current) {
        clearTimeout(nameTypewriterRef.current);
      }
    };
  }, [isVisible, personal.name, isTypingName, displayedName]);

  return (
    <section id="hero" ref={ref} className="min-h-screen relative overflow-hidden flex items-center">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className={`space-y-6 md:space-y-8 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}>
            <div className="glass rounded-2xl p-2 inline-block">
              <span className="text-coral font-medium px-3 md:px-4 py-2 text-white text-sm md:text-base">👋 Hello, I'm</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold gradient-text leading-tight min-h-[1.2em]">
              {displayedName}
              {isTypingName && <span className="animate-pulse text-coral ml-1">|</span>}
            </h1>
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

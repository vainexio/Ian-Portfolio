import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface PersonalIntroData {
  introduction: {
    language: string;
    code: string;
    preview: string;
    color: string;
  };
}

// Default fallback data
const defaultIntro = {
  language: 'javascript',
  code: `// About Ian Iglipa - Full Stack Developer
const developer = {
  name: "Ian Iglipa",
  passion: "Building innovative solutions that bridge creativity and functionality",
  mission: "Transforming ideas into powerful digital experiences",
  
  approach: {
    frontend: "Creating immersive, interactive user experiences",
    backend: "Designing scalable, reliable server architectures", 
    collaboration: "Working closely with teams to exceed expectations"
  },
  
  philosophy: "Every line of code is an opportunity to solve problems and create value",
  
  currentFocus: [
    "Discord bot ecosystems serving 850+ communities",
    "Engaging game experiences with 4K+ active players", 
    "Interactive web applications that inspire and engage"
  ],
  
  getInTouch: () => {
    return "Let's collaborate on your next big idea!";
  }
};

console.log(\`Hello! I'm \${developer.name}\`);
console.log(developer.getInTouch());`,
  preview: '👋 Nice to meet you!',
  color: 'coral'
};

interface InteractivePlaygroundProps {
  introData?: PersonalIntroData['introduction'];
}

export default function InteractivePlayground({ introData }: InteractivePlaygroundProps) {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandHeight, setExpandHeight] = useState(0);
  const typewriterRef = useRef<NodeJS.Timeout>();

  const introduction = introData || defaultIntro;

  // Enhanced human-like typing with typos and corrections
  const typeWriter = (text: string, index = 0) => {
    if (index < text.length) {
      const char = text[index];
      let nextDelay = 10 + Math.random() * 100; // Base typing speed with variation
      
      // Update expanding height based on content
      const currentText = text.substring(0, index + 1);
      const lineCount = currentText.split('\n').length;
      const newHeight = Math.min(lineCount * 20 + 100, 450); // Max height cap
      setExpandHeight(newHeight);
      
      // Add natural pauses
      if (char === '\n') nextDelay += 100;
      if (char === ' ') nextDelay += 10;
      if (char === '.' || char === ',' || char === ';') nextDelay += 100;
      if (char === '{' || char === '}') nextDelay += 50;
      
      // Simulate occasional typos (5% chance)
      if (Math.random() < 0.05 && char.match(/[a-zA-Z]/)) {
        const typoChars = 'abcdefghijklmnopqrstuvwxyz';
        const typo = typoChars[Math.floor(Math.random() * typoChars.length)];
        
        // Type wrong character
        setDisplayedCode(text.substring(0, index) + typo);
        
        typewriterRef.current = setTimeout(() => {
          // Backspace and correct
          setDisplayedCode(text.substring(0, index));
          
          typewriterRef.current = setTimeout(() => {
            setDisplayedCode(text.substring(0, index + 1));
            typewriterRef.current = setTimeout(() => typeWriter(text, index + 1), nextDelay);
          }, 100);
        }, 200);
      } else {
        setDisplayedCode(text.substring(0, index + 1));
        typewriterRef.current = setTimeout(() => typeWriter(text, index + 1), nextDelay);
      }
    } else {
      setIsTyping(false);
      setExpandHeight(450); // Final height
    }
  };

  const restartAnimation = () => {
    setIsTyping(true);
    setDisplayedCode('');
    setExpandHeight(100); // Start small
    
    if (typewriterRef.current) {
      clearTimeout(typewriterRef.current);
    }
    
    setTimeout(() => {
      typeWriter(introduction.code);
    }, 300);
  };

  useEffect(() => {
    setExpandHeight(100); // Start small
    setTimeout(() => {
      typeWriter(introduction.code);
    }, 100);
    return () => {
      if (typewriterRef.current) {
        clearTimeout(typewriterRef.current);
      }
    };
  }, [introduction.code]);

  return (
    <div className="glass-dark rounded-3xl p-6 md:p-8 transform hover:scale-105 transition-all duration-500 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-coral rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-amber rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="w-3 h-3 bg-purple rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="text-xs text-gray-400">
          <i className="fas fa-code mr-1"></i>
          Live Coding Environment
        </div>
      </div>

      {/* Introduction Title */}
      <div className="text-center mb-6">
        <h3 className={`text-lg font-bold text-${introduction.color} mb-2`}>
          Personal Introduction
        </h3>
        <p className="text-xs text-gray-400">Get to know me through code</p>
      </div>

      {/* Code Display */}
      <div className="relative">
        <div 
          className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-lg p-4 mb-4 font-mono text-sm overflow-hidden border border-gray-700 shadow-2xl transition-all duration-300 ease-out"
          style={{ height: `${expandHeight}px` }}
        >
          <div className="flex items-center mb-2">
            <span className={`text-${introduction.color} text-xs font-semibold`}>
              {introduction.language.toUpperCase()}
            </span>
            <div className="ml-auto flex items-center space-x-2">
              <div className={`w-2 h-2 bg-${introduction.color} rounded-full ${isTyping ? 'animate-pulse' : ''}`}></div>
              <span className="text-xs text-gray-400">
                {isTyping ? 'Typing...' : 'Ready'}
              </span>
            </div>
          </div>
          
          <pre className="text-gray-300 whitespace-pre-wrap break-words leading-relaxed">
            {displayedCode}
            {isTyping && <span className="animate-pulse text-coral">|</span>}
          </pre>
        </div>

        {/* Preview Badge */}
        <div className="flex items-center justify-between">
          <div className={`bg-${introduction.color}/20 border border-${introduction.color}/30 rounded-lg px-3 py-2 text-sm`}>
            <span className={`text-${introduction.color} font-medium`}>
              {introduction.preview}
            </span>
          </div>
          <Button 
            onClick={restartAnimation}
            variant="ghost"
            size="sm"
            className="text-xs text-gray-400 hover:text-white"
          >
            <i className="fas fa-redo mr-1"></i>
            Replay
          </Button>
        </div>
      </div>
    </div>
  );
}
import { useState, useEffect, useRef } from 'react';

// Floating Code Symbol that appears randomly
export const FloatingCodeSymbol = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [symbol, setSymbol] = useState('{}');

  useEffect(() => {
    const symbols = ['{}', '<>', '[]', '()', '&&', '||', '=>', '??', '++', '--'];
    
    const showSymbol = () => {
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      setSymbol(randomSymbol);
      setPosition({
        x: Math.random() * (window.innerWidth - 100),
        y: Math.random() * (window.innerHeight - 100)
      });
      setIsVisible(true);
      
      setTimeout(() => setIsVisible(false), 3000);
    };

    const interval = setInterval(showSymbol, Math.random() * 10000 + 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-40 code-symbol select-none"
      style={{
        left: position.x,
        top: position.y,
        fontSize: '2rem',
        color: '#E94560',
        fontFamily: 'JetBrains Mono, monospace',
        fontWeight: 'bold'
      }}
    >
      {symbol}
    </div>
  );
};

// Hidden Developer Console Easter Egg
export const DeveloperConsole = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [commands, setCommands] = useState<string[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        setIsOpen(!isOpen);
        if (!isOpen) {
          setCommands(['Welcome to Ian\'s Portfolio Debug Console!', 'Type "help" for commands']);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const newCommands = [...commands, `> ${cmd}`];
    
    switch (cmd.toLowerCase()) {
      case 'help':
        newCommands.push('Available commands: stats, easter, clear, coffee, matrix');
        break;
      case 'stats':
        newCommands.push('Portfolio loaded successfully!', '3+ years of coding experience', '850+ Discord servers using VALCORE');
        break;
      case 'easter':
        newCommands.push('🥚 You found the hidden console! Try clicking the floating particles.');
        break;
      case 'coffee':
        newCommands.push('☕ Brewing virtual coffee... Done! *caffeine levels increased*');
        break;
      case 'matrix':
        newCommands.push('Wake up, Neo... Just kidding! But this portfolio is pretty cool, right?');
        break;
      case 'clear':
        setCommands([]);
        setCurrentCommand('');
        return;
      default:
        newCommands.push(`Unknown command: ${cmd}`);
    }
    
    setCommands(newCommands);
    setCurrentCommand('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 w-96 h-64 glass-dark rounded-lg p-4 z-50 font-mono text-xs">
      <div className="flex justify-between items-center mb-2">
        <span className="text-coral font-bold">Debug Console</span>
        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">×</button>
      </div>
      
      <div className="h-32 overflow-y-auto mb-2 text-green-400">
        {commands.map((cmd, i) => (
          <div key={i}>{cmd}</div>
        ))}
      </div>
      
      <input
        type="text"
        value={currentCommand}
        onChange={(e) => setCurrentCommand(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleCommand(currentCommand)}
        placeholder="Enter command..."
        className="w-full bg-transparent border-b border-coral text-white outline-none"
        autoFocus
      />
      <div className="text-xs text-gray-400 mt-1">Press Ctrl+Shift+J to toggle</div>
    </div>
  );
};

// Interactive Constellation that connects on hover
export const InteractiveConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stars, setStars] = useState<Array<{x: number, y: number, size: number}>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create random stars
    const newStars = Array.from({ length: 50 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 1
    }));
    setStars(newStars);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      newStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      newStars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        // Draw lines to nearby stars
        const distance = Math.sqrt((mouseX - star.x) ** 2 + (mouseY - star.y) ** 2);
        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(star.x, star.y);
          ctx.strokeStyle = `rgba(233, 69, 96, ${1 - distance / 150})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      style={{ opacity: 0.3 }}
    />
  );
};

// Secret Achievement System
export const AchievementSystem = () => {
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showNotification, setShowNotification] = useState<string | null>(null);

  useEffect(() => {
    const unlockAchievement = (name: string) => {
      if (!achievements.includes(name)) {
        setAchievements(prev => [...prev, name]);
        setShowNotification(name);
        setTimeout(() => setShowNotification(null), 3000);
      }
    };

    // Track various interactions
    const handleScroll = () => {
      if (window.scrollY > 1000) {
        unlockAchievement('Deep Explorer');
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button')) {
        unlockAchievement('Button Masher');
      }
    };

    const handleParticleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.particle-background')) {
        unlockAchievement('Particle Hunter');
      }
    };

    // Easter egg: Konami code
    let konamiCode = '';
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiCode += e.key;
      if (konamiCode.includes('ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba')) {
        unlockAchievement('Konami Master');
        konamiCode = '';
      }
      if (konamiCode.length > 20) konamiCode = konamiCode.slice(-20);
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClick);
    document.addEventListener('click', handleParticleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClick);
      document.removeEventListener('click', handleParticleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [achievements]);

  return (
    <>
      {showNotification && (
        <div className="fixed top-4 right-4 glass rounded-lg p-4 z-50 animate-slide-in">
          <div className="flex items-center gap-3">
            <div className="text-2xl">🏆</div>
            <div>
              <div className="font-bold text-coral">Achievement Unlocked!</div>
              <div className="text-sm text-gray-300">{showNotification}</div>
            </div>
          </div>
        </div>
      )}
      
      {achievements.length > 0 && (
        <div className="fixed bottom-4 left-4 glass rounded-lg p-2 z-40">
          <div className="text-xs text-gray-400 mb-1">Achievements: {achievements.length}/4</div>
          <div className="flex gap-1">
            {achievements.map((achievement, i) => (
              <div key={i} className="text-lg" title={achievement}>🏆</div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// Floating Rubber Duck (classic programmer debugging companion)
export const FloatingRubberDuck = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [quacks, setQuacks] = useState(0);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({ x: e.clientX - 25, y: e.clientY - 25 });
    }
  };

  const handleQuack = () => {
    setQuacks(prev => prev + 1);
    // Sound effect would play here if sound system is enabled
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      className="fixed z-50 cursor-grab active:cursor-grabbing rubber-duck"
      style={{ left: position.x, top: position.y }}
      onMouseDown={handleMouseDown}
      onClick={handleQuack}
      title={`Debug Duck (Quacks: ${quacks}) - Drag me around!`}
    >
      <div className="text-4xl hover:animate-bounce select-none">🦆</div>
      {quacks > 0 && (
        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs bg-coral text-white px-2 py-1 rounded animate-bounce">
          {quacks}
        </div>
      )}
      {quacks >= 5 && (
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-coral font-bold whitespace-nowrap">
          Happy Duck! 🎉
        </div>
      )}
    </div>
  );
};
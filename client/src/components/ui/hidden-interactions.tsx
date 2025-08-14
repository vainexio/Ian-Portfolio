import { useState, useEffect } from 'react';

// Invisible clickable areas that reveal surprises
export const HiddenClickZones = () => {
  const [discoveredZones, setDiscoveredZones] = useState<string[]>([]);
  const [showMessage, setShowMessage] = useState<{text: string, x: number, y: number} | null>(null);

  const zones = [
    { id: 'top-left', x: '5%', y: '20%', message: '🎯 You found the hidden corner!' },
    { id: 'mid-right', x: '90%', y: '50%', message: '👾 Secret portal discovered!' },
    { id: 'bottom-center', x: '50%', y: '85%', message: '🌟 Footer treasure unlocked!' },
  ];

  const handleZoneClick = (zone: typeof zones[0], e: React.MouseEvent) => {
    if (!discoveredZones.includes(zone.id)) {
      setDiscoveredZones(prev => [...prev, zone.id]);
      setShowMessage({
        text: zone.message,
        x: e.clientX,
        y: e.clientY
      });
      
      setTimeout(() => setShowMessage(null), 3000);
    }
  };

  return (
    <>
      {zones.map(zone => (
        <div
          key={zone.id}
          className="fixed w-12 h-12 cursor-pointer z-30 opacity-0 hover:opacity-10 hover:bg-coral rounded-full transition-opacity"
          style={{ left: zone.x, top: zone.y }}
          onClick={(e) => handleZoneClick(zone, e)}
          title="🤔 Something's here..."
        />
      ))}
      
      {showMessage && (
        <div
          className="fixed glass rounded-lg p-3 z-50 animate-slide-in pointer-events-none"
          style={{
            left: showMessage.x - 100,
            top: showMessage.y - 50
          }}
        >
          <div className="text-sm text-white whitespace-nowrap">{showMessage.text}</div>
        </div>
      )}
      
      {discoveredZones.length === zones.length && (
        <div className="fixed bottom-16 left-4 glass rounded-lg p-4 z-40 animate-slide-in">
          <div className="text-coral font-bold">🏆 Zone Master!</div>
          <div className="text-xs text-gray-300">Found all hidden zones</div>
        </div>
      )}
    </>
  );
};

// Matrix-style falling characters easter egg
export const MatrixRain = () => {
  const [isActive, setIsActive] = useState(false);
  const [characters, setCharacters] = useState<Array<{char: string, x: number, y: number, opacity: number}>>([]);

  useEffect(() => {
    const handleKeySequence = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.key === 'm') {
        setIsActive(!isActive);
        
        if (!isActive) {
          // Start matrix effect
          const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
          const newChars = Array.from({ length: 100 }, () => ({
            char: chars[Math.floor(Math.random() * chars.length)],
            x: Math.random() * 100,
            y: Math.random() * 100,
            opacity: Math.random()
          }));
          setCharacters(newChars);
          
          // Auto-disable after 10 seconds
          setTimeout(() => setIsActive(false), 10000);
        }
      }
    };

    document.addEventListener('keydown', handleKeySequence);
    return () => document.removeEventListener('keydown', handleKeySequence);
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      {characters.map((char, i) => (
        <div
          key={i}
          className="absolute text-green-400 font-mono animate-pulse"
          style={{
            left: `${char.x}%`,
            top: `${char.y}%`,
            opacity: char.opacity,
            fontSize: '1rem',
            animation: `fall ${Math.random() * 3 + 2}s linear infinite`
          }}
        >
          {char.char}
        </div>
      ))}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-green-400 font-mono text-sm">
        Press Ctrl+Alt+M to toggle matrix mode
      </div>
    </div>
  );
};

// Random motivational popup
export const MotivationalMessages = () => {
  const [currentMessage, setCurrentMessage] = useState<string | null>(null);
  const [showMessage, setShowMessage] = useState(false);

  const messages = [
    "🚀 Keep exploring! Great developers are curious.",
    "💡 Every bug is a learning opportunity!",
    "⭐ Your next breakthrough is just one commit away.",
    "🔥 Code is poetry in motion.",
    "🎯 Debug with patience, code with passion.",
    "🌟 The best error message is the one that never shows up.",
    "⚡ Clean code is not written by following a set of rules.",
    "🎨 Programming is an art form that fights back."
  ];

  useEffect(() => {
    const showRandomMessage = () => {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
      setShowMessage(true);
      
      setTimeout(() => setShowMessage(false), 4000);
    };

    // Show message randomly every 30-60 seconds
    const interval = setInterval(showRandomMessage, Math.random() * 30000 + 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (!showMessage || !currentMessage) return null;

  return (
    <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-6 z-40 max-w-sm text-center animate-slide-in">
      <div className="text-gray-300">{currentMessage}</div>
      <div className="text-xs text-gray-500 mt-2">— Portfolio Wisdom</div>
    </div>
  );
};
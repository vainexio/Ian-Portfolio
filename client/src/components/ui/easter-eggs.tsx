import { useState, useEffect } from 'react';

// Easter Egg 1: Konami Code
export function KonamiEasterEgg() {
  const [sequence, setSequence] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...sequence, e.code].slice(-10);
      setSequence(newSequence);
      
      if (JSON.stringify(newSequence) === JSON.stringify(konamiCode)) {
        setIsActive(true);
        triggerKonamiEffect();
        setTimeout(() => setIsActive(false), 10000);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sequence]);
  
  const triggerKonamiEffect = () => {
    // Add rainbow background effect
    document.body.style.animation = 'rainbow-bg 2s infinite';
    
    // Show secret message
    const message = document.createElement('div');
    message.innerHTML = '🎮 KONAMI CODE ACTIVATED! 🎮<br/>Welcome to the Matrix, Neo!';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 9999;
      background: linear-gradient(45deg, #ff0000, #00ff00, #0000ff);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      font-family: monospace;
      font-size: 18px;
      font-weight: bold;
      animation: pulse-rainbow 1s infinite;
      box-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      document.body.removeChild(message);
      document.body.style.animation = '';
    }, 5000);
  };
  
  return null;
}

// Easter Egg 2: Secret Developer Console
export function DevConsoleEasterEgg() {
  useEffect(() => {
    const originalLog = console.log;
    console.log = (...args) => {
      if (args[0] === 'unlock dev mode') {
        showDevConsole();
      }
      originalLog.apply(console, args);
    };
    
    return () => {
      console.log = originalLog;
    };
  }, []);
  
  const showDevConsole = () => {
    const devConsole = document.createElement('div');
    devConsole.innerHTML = `
      <div style="background: #000; color: #00ff00; padding: 15px; border-radius: 8px; font-family: monospace; font-size: 12px;">
        <div style="color: #ff6b35; margin-bottom: 10px;">🔓 DEVELOPER MODE UNLOCKED</div>
        <div>System Status: ONLINE</div>
        <div>Projects Loaded: 8</div>
        <div>Easter Eggs Found: 2/5</div>
        <div style="color: #ffa500; margin-top: 10px;">Tip: Try the famous cheat code! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA</div>
        <button onclick="this.parentElement.parentElement.remove()" style="margin-top: 10px; background: #ff6b35; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">Close</button>
      </div>
    `;
    devConsole.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 9999;
      animation: slideInRight 0.5s ease-out;
    `;
    document.body.appendChild(devConsole);
    
    setTimeout(() => {
      if (devConsole.parentElement) {
        devConsole.remove();
      }
    }, 15000);
  };
  
  return null;
}

// Easter Egg 3: Double Click Logo Effect
export function LogoEasterEgg() {
  const [clicks, setClicks] = useState(0);
  
  useEffect(() => {
    const handleLogoDoubleClick = (e: Event) => {
      if ((e.target as HTMLElement).closest('[data-logo="true"]')) {
        setClicks(prev => prev + 1);
        if (clicks >= 1) {
          triggerLogoEffect();
          setClicks(0);
        }
        setTimeout(() => setClicks(0), 500);
      }
    };
    
    document.addEventListener('dblclick', handleLogoDoubleClick);
    return () => document.removeEventListener('dblclick', handleLogoDoubleClick);
  }, [clicks]);
  
  const triggerLogoEffect = () => {
    // Create floating hearts effect
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.innerHTML = ['💖', '⭐', '🚀', '💻', '🎯'][Math.floor(Math.random() * 5)];
      heart.style.cssText = `
        position: fixed;
        font-size: 30px;
        pointer-events: none;
        z-index: 9999;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        animation: float-up-heart 3s ease-out forwards;
      `;
      document.body.appendChild(heart);
      
      setTimeout(() => heart.remove(), 3000);
    }
    
    // Show message
    const message = document.createElement('div');
    message.innerHTML = '💖 Thanks for the love! You found a secret! 💖';
    message.style.cssText = `
      position: fixed;
      top: 30%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background: linear-gradient(45deg, #ff6b9d, #c44569);
      color: white;
      padding: 15px 25px;
      border-radius: 25px;
      font-weight: bold;
      animation: bounce-in 0.5s ease-out;
      text-align: center;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 3000);
  };
  
  return null;
}

// Easter Egg 4: Secret Word Typer
export function SecretWordEasterEgg() {
  const [typedWord, setTypedWord] = useState('');
  const secretWords = ['matrix', 'hacker', 'code', 'javascript', 'react'];
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        const newWord = (typedWord + e.key.toLowerCase()).slice(-10);
        setTypedWord(newWord);
        
        secretWords.forEach(word => {
          if (newWord.includes(word)) {
            triggerSecretWordEffect(word);
            setTypedWord('');
          }
        });
      }
    };
    
    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, [typedWord]);
  
  const triggerSecretWordEffect = (word: string) => {
    const effects = {
      matrix: () => createMatrixRain(),
      hacker: () => createHackerText(),
      code: () => createCodeSnippets(),
      javascript: () => createJSParticles(),
      react: () => createReactLogos()
    };
    
    effects[word as keyof typeof effects]?.();
  };
  
  const createMatrixRain = () => {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 8888;
      overflow: hidden;
    `;
    
    for (let i = 0; i < 50; i++) {
      const char = document.createElement('div');
      char.textContent = String.fromCharCode(33 + Math.floor(Math.random() * 94));
      char.style.cssText = `
        position: absolute;
        color: #00ff00;
        font-family: monospace;
        font-size: ${10 + Math.random() * 10}px;
        left: ${Math.random() * 100}%;
        animation: matrix-fall ${2 + Math.random() * 3}s linear infinite;
      `;
      container.appendChild(char);
    }
    
    document.body.appendChild(container);
    setTimeout(() => container.remove(), 5000);
  };
  
  const createHackerText = () => {
    const messages = ['ACCESS GRANTED', 'SYSTEM BREACH', 'FIREWALL BYPASSED', 'ROOT ACCESS'];
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    const hackerDiv = document.createElement('div');
    hackerDiv.innerHTML = `🔓 ${message} 🔓`;
    hackerDiv.style.cssText = `
      position: fixed;
      top: 20%;
      left: 50%;
      transform: translateX(-50%);
      z-index: 9999;
      background: #000;
      color: #00ff00;
      padding: 20px;
      border: 2px solid #00ff00;
      font-family: monospace;
      font-size: 20px;
      text-align: center;
      animation: glitch-text 0.5s infinite;
    `;
    document.body.appendChild(hackerDiv);
    setTimeout(() => hackerDiv.remove(), 3000);
  };
  
  const createCodeSnippets = () => {
    const snippets = ['console.log("Hello World!");', 'if (awesome) { return true; }', 'const magic = () => "✨";'];
    
    snippets.forEach((snippet, index) => {
      const code = document.createElement('div');
      code.textContent = snippet;
      code.style.cssText = `
        position: fixed;
        left: ${20 + index * 30}%;
        top: ${30 + index * 10}%;
        background: rgba(0, 0, 0, 0.9);
        color: #ffd700;
        padding: 10px;
        border-radius: 5px;
        font-family: monospace;
        font-size: 14px;
        z-index: 9999;
        animation: code-float 3s ease-out forwards;
      `;
      document.body.appendChild(code);
      setTimeout(() => code.remove(), 3000);
    });
  };
  
  const createJSParticles = () => {
    const jsSymbols = ['{}', '[]', '()', '=>', '&&', '||', '??'];
    
    for (let i = 0; i < 15; i++) {
      const symbol = document.createElement('div');
      symbol.textContent = jsSymbols[Math.floor(Math.random() * jsSymbols.length)];
      symbol.style.cssText = `
        position: fixed;
        color: #f7df1e;
        font-size: 24px;
        font-weight: bold;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 9999;
        animation: js-bounce 2s ease-out forwards;
      `;
      document.body.appendChild(symbol);
      setTimeout(() => symbol.remove(), 2000);
    }
  };
  
  const createReactLogos = () => {
    for (let i = 0; i < 8; i++) {
      const logo = document.createElement('div');
      logo.innerHTML = '⚛️';
      logo.style.cssText = `
        position: fixed;
        font-size: 40px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        z-index: 9999;
        animation: react-spin 3s linear infinite;
      `;
      document.body.appendChild(logo);
      setTimeout(() => logo.remove(), 3000);
    }
  };
  
  return null;
}

// Easter Egg 5: Mouse Pattern Recognition
export function MousePatternEasterEgg() {
  const [mousePositions, setMousePositions] = useState<{x: number, y: number}[]>([]);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePositions(prev => [...prev.slice(-20), {x: e.clientX, y: e.clientY}]);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    if (mousePositions.length >= 10) {
      // Check for circular pattern
      const isCircle = checkCircularPattern(mousePositions);
      if (isCircle) {
        triggerCircleEffect();
        setMousePositions([]);
      }
    }
  }, [mousePositions]);
  
  const checkCircularPattern = (positions: {x: number, y: number}[]) => {
    if (positions.length < 10) return false;
    
    const recent = positions.slice(-10);
    const center = {
      x: recent.reduce((sum, p) => sum + p.x, 0) / recent.length,
      y: recent.reduce((sum, p) => sum + p.y, 0) / recent.length
    };
    
    const distances = recent.map(p => 
      Math.sqrt(Math.pow(p.x - center.x, 2) + Math.pow(p.y - center.y, 2))
    );
    
    const avgDistance = distances.reduce((sum, d) => sum + d, 0) / distances.length;
    const variance = distances.reduce((sum, d) => sum + Math.pow(d - avgDistance, 2), 0) / distances.length;
    
    return variance < 1000 && avgDistance > 50; // Circular pattern detected
  };
  
  const triggerCircleEffect = () => {
    const center = {
      x: mousePositions[mousePositions.length - 1].x,
      y: mousePositions[mousePositions.length - 1].y
    };
    
    // Create expanding circle effect
    const circle = document.createElement('div');
    circle.style.cssText = `
      position: fixed;
      left: ${center.x}px;
      top: ${center.y}px;
      width: 10px;
      height: 10px;
      border: 3px solid #ff6b9d;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      animation: expand-circle 2s ease-out forwards;
      transform: translate(-50%, -50%);
    `;
    document.body.appendChild(circle);
    
    // Show message
    const message = document.createElement('div');
    message.innerHTML = '🌟 Nice mouse skills! You drew a circle! 🌟';
    message.style.cssText = `
      position: fixed;
      left: ${center.x}px;
      top: ${center.y - 50}px;
      transform: translateX(-50%);
      background: rgba(255, 107, 157, 0.9);
      color: white;
      padding: 10px 15px;
      border-radius: 20px;
      font-weight: bold;
      z-index: 9999;
      animation: fade-in-message 0.5s ease-out;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      circle.remove();
      message.remove();
    }, 2000);
  };
  
  return null;
}
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



// Easter Egg 3: Double Click Logo Effect
export function LogoEasterEgg() {
  useEffect(() => {
    const handleLogoDoubleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-logo="true"]')) {
        triggerLogoEffect();
      }
    };
    
    document.addEventListener('dblclick', handleLogoDoubleClick);
    return () => document.removeEventListener('dblclick', handleLogoDoubleClick);
  }, []);
  
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


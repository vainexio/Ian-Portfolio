import { useState, useEffect } from 'react';

// Secret menu that appears when user finds hidden spots
export const SecretMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [secretsFound, setSecretsFound] = useState<string[]>([]);

  useEffect(() => {
    // Listen for clicks on specific elements
    const handleSecretClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Secret spots throughout the portfolio
      if (target.closest('.glass') && e.shiftKey) {
        const secretName = 'Glass Detective';
        if (!secretsFound.includes(secretName)) {
          setSecretsFound(prev => [...prev, secretName]);
          showSecretMenu();
        }
      }

      // Triple click on the name
      if (target.textContent?.includes('Ian Iglipa')) {
        let clickCount = parseInt(target.dataset.clicks || '0');
        clickCount++;
        target.dataset.clicks = clickCount.toString();
        
        if (clickCount === 3) {
          const secretName = 'Name Clicker';
          if (!secretsFound.includes(secretName)) {
            setSecretsFound(prev => [...prev, secretName]);
            showSecretMenu();
          }
          target.dataset.clicks = '0';
        }
        
        setTimeout(() => {
          target.dataset.clicks = '0';
        }, 1000);
      }
    };

    const showSecretMenu = () => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    };

    document.addEventListener('click', handleSecretClick);
    return () => document.removeEventListener('click', handleSecretClick);
  }, [secretsFound]);

  if (!isVisible || secretsFound.length === 0) return null;

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass rounded-2xl p-6 z-50 max-w-sm">
      <div className="text-center">
        <div className="text-4xl mb-4">🎊</div>
        <h3 className="text-coral font-bold text-lg mb-2">Secret Discovered!</h3>
        <p className="text-gray-300 text-sm mb-4">
          You found: <span className="text-amber font-semibold">{secretsFound[secretsFound.length - 1]}</span>
        </p>
        <div className="text-xs text-gray-400">
          Secrets found: {secretsFound.length}/5
        </div>
        <div className="flex justify-center gap-1 mt-2">
          {Array.from({ length: 5 }, (_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i < secretsFound.length ? 'bg-coral' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Hidden message that appears on specific scroll positions
export const ScrollSecrets = () => {
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      let newMessage = '';
      
      if (scrollPercent > 25 && scrollPercent < 35) {
        newMessage = '👀 Curious explorer detected...';
      } else if (scrollPercent > 50 && scrollPercent < 60) {
        newMessage = '🚀 Halfway through the journey!';
      } else if (scrollPercent > 75 && scrollPercent < 85) {
        newMessage = '💎 You\'re almost at the treasure!';
      } else if (scrollPercent > 95) {
        newMessage = '🏆 Footer master! You reached the end!';
      }

      if (newMessage && newMessage !== message) {
        setMessage(newMessage);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 3000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [message]);

  if (!showMessage) return null;

  return (
    <div className="fixed top-1/4 right-4 glass rounded-lg p-3 z-40 animate-slide-in max-w-xs">
      <div className="text-sm text-gray-300">{message}</div>
    </div>
  );
};

// Interactive skill orbs that react to clicks
export const InteractiveSkillOrbs = () => {
  const [clickedSkills, setClickedSkills] = useState<string[]>([]);

  useEffect(() => {
    const handleSkillClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const skillElement = target.closest('[data-skill]');
      
      if (skillElement) {
        const skillName = skillElement.getAttribute('data-skill');
        if (skillName && !clickedSkills.includes(skillName)) {
          setClickedSkills(prev => [...prev, skillName]);
          
          // Add special effect
          skillElement.classList.add('animate-pulse');
          setTimeout(() => {
            skillElement.classList.remove('animate-pulse');
          }, 1000);
        }
      }
    };

    document.addEventListener('click', handleSkillClick);
    return () => document.removeEventListener('click', handleSkillClick);
  }, [clickedSkills]);

  return null; // This component only adds interaction, no visual element
};
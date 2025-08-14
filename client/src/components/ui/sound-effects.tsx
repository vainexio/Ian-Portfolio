import { useEffect, useState, useRef } from 'react';

interface SoundEffectsProps {
  enabled?: boolean;
  volume?: number;
}

export default function SoundEffects({ enabled = false, volume = 0.3 }: SoundEffectsProps) {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && isEnabled) {
      // Initialize Web Audio API
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [isEnabled]);

  // Generate simple tones for interactions
  const playTone = (frequency: number, duration: number, type: OscillatorType = 'sine') => {
    if (!isEnabled || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  // Sound effect functions
  const sounds = {
    hover: () => playTone(800, 0.1, 'sine'),
    click: () => playTone(600, 0.15, 'square'),
    success: () => {
      playTone(523, 0.2, 'sine'); // C5
      setTimeout(() => playTone(659, 0.2, 'sine'), 100); // E5
      setTimeout(() => playTone(784, 0.3, 'sine'), 200); // G5
    },
    navigate: () => playTone(1000, 0.1, 'triangle'),
    error: () => playTone(300, 0.5, 'sawtooth')
  };

  useEffect(() => {
    if (!isEnabled) return;

    // Add event listeners for interactive elements
    const handleHover = () => sounds.hover();
    const handleClick = () => sounds.click();
    const handleNavigation = () => sounds.navigate();

    // Attach to buttons and interactive elements
    const buttons = document.querySelectorAll('button, a, .interactive');
    const navLinks = document.querySelectorAll('nav a, [href^="#"]');

    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleHover);
      button.addEventListener('click', handleClick);
    });

    navLinks.forEach(link => {
      link.addEventListener('click', handleNavigation);
    });

    return () => {
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleHover);
        button.removeEventListener('click', handleClick);
      });

      navLinks.forEach(link => {
        link.removeEventListener('click', handleNavigation);
      });
    };
  }, [isEnabled]);

  return (
    <div className="sound-effects-controls fixed bottom-4 left-4 z-50">
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`glass rounded-full p-3 transition-all duration-300 ${
          isEnabled ? 'text-coral bg-coral/20' : 'text-gray-400 bg-gray-600/20'
        } hover:scale-110`}
        title={`Sound effects ${isEnabled ? 'enabled' : 'disabled'}`}
      >
        <i className={`fas ${isEnabled ? 'fa-volume-up' : 'fa-volume-mute'} text-sm`}></i>
      </button>
    </div>
  );
}
import { useEffect, useState } from 'react';

// Custom hook for scroll-based effects
export const useScrollEffects = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollData = () => {
      const currentScrollY = window.pageYOffset;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setScrollY(currentScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', updateScrollData, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollData);
  }, []);

  return { scrollY, scrollDirection };
};

// Section transition wrapper
interface SectionTransitionProps {
  children: React.ReactNode;
  className?: string;
  effect?: 'fade' | 'slide' | 'scale' | 'flip';
  delay?: number;
}

export const SectionTransition = ({ 
  children, 
  className = '',
  effect = 'fade',
  delay = 0
}: SectionTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`section-${Math.random()}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  const getEffectClasses = () => {
    const base = 'transition-all duration-1000 ease-out';
    
    switch (effect) {
      case 'fade':
        return `${base} ${isVisible ? 'opacity-100' : 'opacity-0'}`;
      case 'slide':
        return `${base} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`;
      case 'scale':
        return `${base} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`;
      case 'flip':
        return `${base} ${isVisible ? 'opacity-100 rotate-0' : 'opacity-0 rotate-12'}`;
      default:
        return base;
    }
  };

  return (
    <div 
      id={`section-${Math.random()}`}
      className={`${getEffectClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

// Floating elements that react to scroll
interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  direction?: 'horizontal' | 'vertical' | 'both';
}

export const FloatingElement = ({
  children,
  className = '',
  intensity = 0.5,
  direction = 'vertical'
}: FloatingElementProps) => {
  const { scrollY } = useScrollEffects();

  const getTransform = () => {
    const offset = scrollY * intensity;
    
    switch (direction) {
      case 'horizontal':
        return `translateX(${offset}px)`;
      case 'vertical':
        return `translateY(${offset}px)`;
      case 'both':
        return `translate(${offset * 0.5}px, ${offset}px)`;
      default:
        return `translateY(${offset}px)`;
    }
  };

  return (
    <div
      className={`floating-element ${className}`}
      style={{
        transform: getTransform(),
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};
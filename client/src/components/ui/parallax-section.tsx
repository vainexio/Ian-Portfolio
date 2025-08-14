import { useEffect, useState, ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ParallaxSection({ 
  children, 
  speed = 0.5,
  className = '',
  direction = 'up'
}: ParallaxSectionProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;
      
      setOffset(rate);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  const getTransform = () => {
    switch (direction) {
      case 'up':
        return `translateY(${offset}px)`;
      case 'down':
        return `translateY(${-offset}px)`;
      case 'left':
        return `translateX(${offset}px)`;
      case 'right':
        return `translateX(${-offset}px)`;
      default:
        return `translateY(${offset}px)`;
    }
  };

  return (
    <div
      className={`parallax-section ${className}`}
      style={{
        transform: getTransform(),
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}
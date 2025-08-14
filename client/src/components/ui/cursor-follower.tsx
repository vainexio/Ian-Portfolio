import { useEffect, useState } from 'react';

interface CursorFollowerProps {
  className?: string;
  size?: number;
  delay?: number;
}

export default function CursorFollower({ 
  className = '',
  size = 20,
  delay = 0.1
}: CursorFollowerProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, .interactive, [role="button"]');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const animate = () => {
      currentX += (targetX - currentX) * delay;
      currentY += (targetY - currentY) * delay;
      
      setPosition({ x: currentX, y: currentY });
      requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [delay]);

  // Hide on mobile devices
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div
      className={`cursor-follower ${className}`}
      style={{
        position: 'fixed',
        left: position.x - size / 2,
        top: position.y - size / 2,
        width: size,
        height: size,
        borderRadius: '50%',
        background: isHovering 
          ? 'radial-gradient(circle, rgba(233, 69, 96, 0.6) 0%, rgba(233, 69, 96, 0.2) 70%, transparent 100%)'
          : 'radial-gradient(circle, rgba(155, 89, 182, 0.4) 0%, rgba(155, 89, 182, 0.1) 70%, transparent 100%)',
        border: isHovering ? '2px solid rgba(233, 69, 96, 0.8)' : '1px solid rgba(255, 255, 255, 0.3)',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        transform: `scale(${isHovering ? 1.5 : 1})`,
        transition: 'opacity 0.3s ease, transform 0.2s ease, background 0.2s ease, border 0.2s ease',
        backdropFilter: 'blur(10px)',
        boxShadow: isHovering 
          ? '0 0 20px rgba(233, 69, 96, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.1)'
          : '0 0 15px rgba(155, 89, 182, 0.3), inset 0 0 5px rgba(255, 255, 255, 0.1)'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: isHovering ? '#E94560' : '#9B59B6',
          opacity: 0.8
        }}
      />
    </div>
  );
}
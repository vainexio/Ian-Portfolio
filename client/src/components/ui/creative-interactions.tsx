import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';

// Floating Skill Bubbles
export const FloatingSkillBubbles = () => {
  const [bubbles, setBubbles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    skill: string;
    color: string;
    size: number;
    speedX: number;
    speedY: number;
  }>>([]);

  const skills = [
    { name: 'React', color: 'cyan' },
    { name: 'Node.js', color: 'purple' },
    { name: 'TypeScript', color: 'coral' },
    { name: 'Discord.js', color: 'amber' },
    { name: 'Luau', color: 'cyan' },
    { name: 'PostgreSQL', color: 'purple' }
  ];

  useEffect(() => {
    const initialBubbles = skills.map((skill, index) => ({
      id: index,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      skill: skill.name,
      color: skill.color,
      size: Math.random() * 20 + 30,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3
    }));
    setBubbles(initialBubbles);

    const animateInterval = setInterval(() => {
      setBubbles(prev => prev.map(bubble => {
        let newX = bubble.x + bubble.speedX;
        let newY = bubble.y + bubble.speedY;
        
        // Wrap around edges
        if (newX < 0) newX = window.innerWidth - 100;
        if (newX > window.innerWidth - 100) newX = 0;
        if (newY < 0) newY = window.innerHeight - 100;
        if (newY > window.innerHeight - 100) newY = 0;
        
        return {
          ...bubble,
          x: newX,
          y: newY
        };
      }));
    }, 50);

    return () => clearInterval(animateInterval);
  }, []);

  const handleBubbleClick = (id: number) => {
    setBubbles(prev => prev.map(bubble => 
      bubble.id === id 
        ? { ...bubble, size: bubble.size * 1.2, speedX: bubble.speedX * 1.5, speedY: bubble.speedY * 1.5 }
        : bubble
    ));

    // Reset after animation
    setTimeout(() => {
      setBubbles(prev => prev.map(bubble => 
        bubble.id === id 
          ? { ...bubble, size: Math.random() * 20 + 30, speedX: (Math.random() - 0.5) * 0.3, speedY: (Math.random() - 0.5) * 0.3 }
          : bubble
      ));
    }, 1000);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className={`absolute pointer-events-auto cursor-pointer transition-all duration-300 hover:scale-110`}
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size
          }}
          onClick={() => handleBubbleClick(bubble.id)}
        >
          <div className={`w-full h-full bg-${bubble.color}/20 border-2 border-${bubble.color}/50 rounded-full backdrop-blur-sm flex items-center justify-center`}>
            <span className={`text-${bubble.color} text-xs font-bold text-center px-1`}>
              {bubble.skill}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

// Interactive Project Constellation
export const ProjectConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const projects = [
    { name: 'VALCORE', x: 200, y: 150, color: '#E94560' },
    { name: 'U.N.I.', x: 400, y: 300, color: '#9B59B6' },
    { name: 'Portfolio', x: 600, y: 200, color: '#3498DB' },
    { name: 'Discord Bots', x: 300, y: 400, color: '#F39C12' },
    { name: 'Web Apps', x: 500, y: 100, color: '#1ABC9C' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections between projects
      projects.forEach((project, i) => {
        projects.slice(i + 1).forEach(otherProject => {
          const distance = Math.sqrt(
            Math.pow(project.x - otherProject.x, 2) + 
            Math.pow(project.y - otherProject.y, 2)
          );

          if (distance < 250) {
            ctx.beginPath();
            ctx.moveTo(project.x, project.y);
            ctx.lineTo(otherProject.x, otherProject.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 250)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });

        // Draw connection to mouse if close
        const mouseDistance = Math.sqrt(
          Math.pow(project.x - mousePosition.x, 2) + 
          Math.pow(project.y - mousePosition.y, 2)
        );

        if (mouseDistance < 150) {
          ctx.beginPath();
          ctx.moveTo(project.x, project.y);
          ctx.lineTo(mousePosition.x, mousePosition.y);
          ctx.strokeStyle = `${project.color}${Math.floor((1 - mouseDistance / 150) * 255).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Draw project nodes
        ctx.beginPath();
        ctx.arc(project.x, project.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = project.color;
        ctx.fill();

        // Draw project names
        ctx.font = '12px Inter';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(project.name, project.x, project.y - 15);
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mousePosition]);

  return (
    <div className="relative w-full h-64 glass rounded-2xl p-4 overflow-hidden">
      <div className="absolute top-4 left-4 text-sm text-gray-400">
        <i className="fas fa-project-diagram mr-2"></i>
        Interactive Project Map
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-80"
        style={{ cursor: 'crosshair' }}
      />
      <div className="absolute bottom-4 right-4 text-xs text-gray-500">
        Move your mouse to connect projects
      </div>
    </div>
  );
};

// Creative Quote Generator
interface CreativeQuoteGeneratorProps {
  quotes: Array<{
    text: string;
    author: string;
    color: string;
  }>;
}

export const CreativeQuoteGenerator = ({ quotes }: CreativeQuoteGeneratorProps) => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextQuote = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
      setIsAnimating(false);
    }, 300);
  };

  const quote = quotes[currentQuote];

  return (
    <Card className="glass-dark border-none max-w-md mx-auto cursor-pointer group" onClick={nextQuote}>
      <CardContent className="p-6">
        <div className={`transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
          <div className="mb-4">
            <i className={`fas fa-quote-left text-${quote.color} text-2xl opacity-50`}></i>
          </div>
          <blockquote className={`text-lg text-white italic mb-4 leading-relaxed`}>
            "{quote.text}"
          </blockquote>
          <cite className={`text-sm text-${quote.color} not-italic`}>
            — {quote.author}
          </cite>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-1">
            {quotes.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentQuote ? `bg-${quote.color}` : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-400 group-hover:text-white transition-colors">
            Click for inspiration →
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

// Interactive Skills Radar
interface SkillsRadarProps {
  skills: Array<{
    name: string;
    level: number;
    angle: number;
    color: string;
  }>;
}

export const SkillsRadar = ({ skills }: SkillsRadarProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 400 });
  const animationRef = useRef<number>();

  // Responsive canvas sizing
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const size = Math.min(containerWidth, 400);
        setCanvasSize({ width: size, height: size });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      setAnimationProgress(prev => (prev + 0.01) % (Math.PI * 2));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvasSize.width;
    canvas.height = canvasSize.height;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.35;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create radial gradient background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0.05)');
      gradient.addColorStop(0.5, 'rgba(255, 107, 157, 0.03)');
      gradient.addColorStop(1, 'rgba(155, 89, 182, 0.02)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();

      // Draw animated radar circles with glow effect
      for (let i = 1; i <= 5; i++) {
        const radius = (maxRadius * i) / 5;
        const alpha = 0.15 + Math.sin(animationProgress + i * 0.5) * 0.05;
        
        // Outer glow
        ctx.shadowColor = 'rgba(0, 255, 255, 0.3)';
        ctx.shadowBlur = 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;
        
        // Inner circle with pulse effect
        if (i === 5) {
          const pulseAlpha = 0.1 + Math.sin(animationProgress * 2) * 0.05;
          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 107, 157, ${pulseAlpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Draw animated radar lines
      skills.forEach((skill, index) => {
        const angle = (skill.angle * Math.PI) / 180;
        const lineAlpha = 0.2 + Math.sin(animationProgress + index * 0.8) * 0.1;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle - Math.PI / 2) * maxRadius,
          centerY + Math.sin(angle - Math.PI / 2) * maxRadius
        );
        ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw connecting polygon with glow
      ctx.beginPath();
      skills.forEach((skill, index) => {
        const angle = (skill.angle * Math.PI) / 180;
        const radius = (skill.level / 100) * maxRadius;
        const x = centerX + Math.cos(angle - Math.PI / 2) * radius;
        const y = centerY + Math.sin(angle - Math.PI / 2) * radius;

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(0, 255, 255, 0.1)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw skill points with enhanced effects
      skills.forEach((skill, index) => {
        const angle = (skill.angle * Math.PI) / 180;
        const radius = (skill.level / 100) * maxRadius;
        const x = centerX + Math.cos(angle - Math.PI / 2) * radius;
        const y = centerY + Math.sin(angle - Math.PI / 2) * radius;
        
        const isHovered = hoveredSkill === skill.name;
        const pointSize = isHovered ? 12 : 8;
        const pulseEffect = Math.sin(animationProgress * 3 + index) * 0.3 + 1;

        // Outer glow for skill points
        if (isHovered) {
          ctx.shadowColor = skill.color;
          ctx.shadowBlur = 15;
        }
        
        // Main skill point
        ctx.beginPath();
        ctx.arc(x, y, pointSize * (isHovered ? pulseEffect : 1), 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Inner highlight
        ctx.beginPath();
        ctx.arc(x, y, (pointSize * 0.4) * (isHovered ? pulseEffect : 1), 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();

        // Skill level indicator
        ctx.save();
        ctx.font = `${isHovered ? '10px' : '8px'} Inter`;
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(`${skill.level}%`, x, y + 3);
        ctx.restore();

        // Enhanced skill labels
        ctx.save();
        ctx.font = `${isHovered ? 'bold 14px' : '12px'} Inter`;
        ctx.fillStyle = isHovered ? skill.color : 'white';
        ctx.textAlign = 'center';
        const labelRadius = radius + 25;
        const labelX = centerX + Math.cos(angle - Math.PI / 2) * labelRadius;
        const labelY = centerY + Math.sin(angle - Math.PI / 2) * labelRadius;
        
        // Label background for better readability
        if (isHovered) {
          const textMetrics = ctx.measureText(skill.name);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
          ctx.fillRect(
            labelX - textMetrics.width / 2 - 4,
            labelY - 8,
            textMetrics.width + 8,
            16
          );
          ctx.fillStyle = skill.color;
        }
        
        ctx.fillText(skill.name, labelX, labelY + 4);
        ctx.restore();
      });

      ctx.closePath();
      ctx.strokeStyle = 'rgba(233, 69, 96, 0.5)';
      ctx.fillStyle = 'rgba(233, 69, 96, 0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fill();
    };

    draw();
  }, [skills, hoveredSkill, animationProgress, canvasSize]);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = Math.min(canvas.width, canvas.height) * 0.35;

    let hoveredSkillName: string | null = null;

    skills.forEach(skill => {
      const angle = (skill.angle * Math.PI) / 180;
      const radius = (skill.level / 100) * maxRadius;
      const skillX = centerX + Math.cos(angle - Math.PI / 2) * radius;
      const skillY = centerY + Math.sin(angle - Math.PI / 2) * radius;

      const distance = Math.sqrt((x - skillX) ** 2 + (y - skillY) ** 2);
      if (distance < 20) {
        hoveredSkillName = skill.name;
      }
    });

    setHoveredSkill(hoveredSkillName);
  };

  return (
    <div ref={containerRef} className="glass-dark rounded-2xl p-6 hover:scale-105 transition-all duration-500 group max-w-lg mx-auto backdrop-blur-lg border border-white/10">
      <div className="text-center mb-4">
        <h4 className="text-lg font-bold gradient-text mb-2">Skills Radar</h4>
        <p className="text-xs text-gray-400">Interactive skill visualization</p>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoveredSkill(null)}
          className="cursor-pointer w-full h-auto rounded-lg"
          style={{ maxWidth: '100%' }}
        />
        
        {/* Overlay effects */}
        <div className="absolute inset-0 rounded-lg pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-coral/5 via-transparent to-purple/5 rounded-lg"></div>
        </div>
      </div>
      
      {hoveredSkill && (
        <div className="mt-4 p-3 glass rounded-lg animate-slide-in">
          <div className="text-center">
            <p className="text-sm font-bold text-coral mb-1">{hoveredSkill}</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-coral to-cyan transition-all duration-500"
                  style={{ width: `${skills.find(s => s.name === hoveredSkill)?.level}%` }}
                ></div>
              </div>
              <span className="text-xs text-gray-300 font-mono">
                {skills.find(s => s.name === hoveredSkill)?.level}%
              </span>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">Hover over points to explore skills</p>
      </div>
    </div>
  );
};
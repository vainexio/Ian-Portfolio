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
export const CreativeQuoteGenerator = () => {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const quotes = [
    {
      text: "Code is poetry written in logic.",
      author: "Ian's Dev Philosophy",
      color: "coral"
    },
    {
      text: "Every bug is a feature waiting for the right perspective.",
      author: "Debugging Wisdom",
      color: "purple"
    },
    {
      text: "Building bridges between ideas and reality, one function at a time.",
      author: "Development Mindset",
      color: "cyan"
    },
    {
      text: "In the world of code, creativity meets precision.",
      author: "Tech Philosophy",
      color: "amber"
    }
  ];

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
export const SkillsRadar = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = [
    { name: 'JavaScript', level: 95, angle: 0, color: '#F39C12' },
    { name: 'TypeScript', level: 90, angle: 60, color: '#3498DB' },
    { name: 'React', level: 88, angle: 120, color: '#1ABC9C' },
    { name: 'Node.js', level: 85, angle: 180, color: '#9B59B6' },
    { name: 'Discord.js', level: 92, angle: 240, color: '#E94560' },
    { name: 'Luau/Roblox', level: 80, angle: 300, color: '#E67E22' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 300;
    canvas.height = 300;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const maxRadius = 120;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw radar circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius * i) / 5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Draw radar lines
      skills.forEach(skill => {
        const angle = (skill.angle * Math.PI) / 180;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(angle - Math.PI / 2) * maxRadius,
          centerY + Math.sin(angle - Math.PI / 2) * maxRadius
        );
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.stroke();
      });

      // Draw skill points
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

        // Draw skill point
        ctx.save();
        ctx.beginPath();
        ctx.arc(x, y, hoveredSkill === skill.name ? 8 : 5, 0, Math.PI * 2);
        ctx.fillStyle = skill.color;
        ctx.fill();
        ctx.restore();

        // Draw skill label
        ctx.save();
        ctx.font = '12px Inter';
        ctx.fillStyle = hoveredSkill === skill.name ? skill.color : 'white';
        ctx.textAlign = 'center';
        const labelRadius = radius + 20;
        const labelX = centerX + Math.cos(angle - Math.PI / 2) * labelRadius;
        const labelY = centerY + Math.sin(angle - Math.PI / 2) * labelRadius;
        ctx.fillText(skill.name, labelX, labelY);
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

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      let closestSkill: string | null = null;
      let minDistance = Infinity;

      skills.forEach(skill => {
        const angle = (skill.angle * Math.PI) / 180;
        const radius = (skill.level / 100) * maxRadius;
        const x = centerX + Math.cos(angle - Math.PI / 2) * radius;
        const y = centerY + Math.sin(angle - Math.PI / 2) * radius;

        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (distance < 15 && distance < minDistance) {
          minDistance = distance;
          closestSkill = skill.name;
        }
      });

      setHoveredSkill(closestSkill);
      draw();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', () => {
      setHoveredSkill(null);
      draw();
    });

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hoveredSkill]);

  return (
    <div className="glass rounded-2xl p-6 max-w-sm mx-auto">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-white mb-2">
          <i className="fas fa-radar-alt mr-2 text-coral"></i>
          Skills Radar
        </h3>
        <p className="text-sm text-gray-400">
          Hover over points to explore my expertise
        </p>
      </div>
      <div className="flex justify-center">
        <canvas ref={canvasRef} className="cursor-crosshair" />
      </div>
      {hoveredSkill && (
        <div className="text-center mt-4">
          <p className="text-sm text-coral">
            {skills.find(s => s.name === hoveredSkill)?.level}% proficiency in {hoveredSkill}
          </p>
        </div>
      )}
    </div>
  );
};
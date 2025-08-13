interface SectionDividerProps {
  direction?: 'down' | 'up';
  color?: 'coral' | 'purple' | 'cyan' | 'amber';
}

export default function SectionDivider({ direction = 'down', color = 'coral' }: SectionDividerProps) {
  const getColor = () => {
    switch (color) {
      case 'coral': return '#e94560';
      case 'purple': return '#8b5cf6';
      case 'cyan': return '#06b6d4';
      case 'amber': return '#f59e0b';
      default: return '#e94560';
    }
  };

  return (
    <div className="relative w-full h-16 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d={direction === 'down' 
            ? "M0,0V50Q600,120,1200,50V0Z" 
            : "M0,120V50Q600,0,1200,50V120Z"
          }
          fill="url(#gradient)"
          fillOpacity="0.1"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={getColor()} stopOpacity="0.3" />
            <stop offset="50%" stopColor={getColor()} stopOpacity="0.1" />
            <stop offset="100%" stopColor={getColor()} stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
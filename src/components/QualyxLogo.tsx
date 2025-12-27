export const QualyxLogo = ({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) => {
  const dimensions = {
    small: { width: 28, height: 28 },
    default: { width: 36, height: 36 },
    large: { width: 48, height: 48 },
  };

  const { width, height } = dimensions[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient for the hexagon */}
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(217,91%,60%)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="hsl(190,100%,50%)" stopOpacity="0.9" />
        </linearGradient>
        
        {/* Gradient for the core orb */}
        <radialGradient id="coreGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="hsl(190,100%,60%)" stopOpacity="1" />
          <stop offset="70%" stopColor="hsl(217,91%,50%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(217,91%,40%)" stopOpacity="0.6" />
        </radialGradient>

        {/* Glow filter */}
        <filter id="logoGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Outer hexagon shell - shield outline */}
      <path
        d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
        stroke="url(#hexGradient)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.6"
      />

      {/* Inner hexagon */}
      <path
        d="M24 10L36 17V31L24 38L12 31V17L24 10Z"
        stroke="url(#hexGradient)"
        strokeWidth="1"
        fill="hsl(var(--card))"
        opacity="0.9"
      />

      {/* Pipeline lines flowing inward */}
      <g opacity="0.5" stroke="hsl(190,100%,50%)" strokeWidth="0.75">
        {/* Top line */}
        <line x1="24" y1="4" x2="24" y2="16" />
        {/* Top-left line */}
        <line x1="10" y1="12" x2="18" y2="20" />
        {/* Top-right line */}
        <line x1="38" y1="12" x2="30" y2="20" />
        {/* Bottom-left line */}
        <line x1="10" y1="36" x2="18" y2="28" />
        {/* Bottom-right line */}
        <line x1="38" y1="36" x2="30" y2="28" />
        {/* Bottom line */}
        <line x1="24" y1="44" x2="24" y2="32" />
      </g>

      {/* Central AI core orb */}
      <circle
        cx="24"
        cy="24"
        r="6"
        fill="url(#coreGradient)"
        filter="url(#logoGlow)"
      />

      {/* Inner core highlight */}
      <circle
        cx="24"
        cy="24"
        r="2.5"
        fill="hsl(190,100%,70%)"
        opacity="0.9"
      />
    </svg>
  );
};

// Wordmark component
export const QualyxWordmark = ({ className = "" }: { className?: string }) => {
  return (
    <span className={`font-bold tracking-tight ${className}`}>
      <span className="text-foreground">QUALYX</span>
    </span>
  );
};

// Full logo with symbol + wordmark
export const QualyxFullLogo = ({ 
  className = "", 
  size = "default" 
}: { 
  className?: string; 
  size?: "small" | "default" | "large" 
}) => {
  const textSize = {
    small: "text-base",
    default: "text-lg",
    large: "text-2xl",
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <QualyxLogo size={size} />
      <span className={`font-semibold tracking-tight text-foreground ${textSize[size]}`}>
        QUALYX
      </span>
    </div>
  );
};

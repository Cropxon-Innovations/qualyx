export const QualyxLogo = ({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) => {
  const dimensions = {
    small: { width: 32, height: 32 },
    default: { width: 40, height: 40 },
    large: { width: 56, height: 56 },
  };

  const { width, height } = dimensions[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Primary metallic gradient - dark to light silver */}
        <linearGradient id="metallicMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="30%" stopColor="#B8B8B8" />
          <stop offset="60%" stopColor="#888888" />
          <stop offset="100%" stopColor="#4A4A4A" />
        </linearGradient>
        
        {/* Secondary gradient for depth/shadow */}
        <linearGradient id="metallicShadow" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#707070" />
          <stop offset="50%" stopColor="#505050" />
          <stop offset="100%" stopColor="#303030" />
        </linearGradient>
        
        {/* Highlight gradient */}
        <linearGradient id="metallicHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#CCCCCC" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#888888" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* 3D Hexagonal Q shape */}
      <g transform="translate(8, 6)">
        {/* Back face / shadow layer */}
        <path 
          d="M24 4 L40 14 L40 34 L24 44 L8 34 L8 14 Z" 
          fill="url(#metallicShadow)" 
          transform="translate(2, 2)"
        />
        
        {/* Main hexagon face */}
        <path 
          d="M24 4 L40 14 L40 34 L24 44 L8 34 L8 14 Z" 
          fill="url(#metallicMain)" 
          stroke="url(#metallicHighlight)"
          strokeWidth="0.5"
        />
        
        {/* Inner cutout for hollow Q effect */}
        <path 
          d="M24 12 L33 18 L33 30 L24 36 L15 30 L15 18 Z" 
          fill="none"
          stroke="url(#metallicShadow)"
          strokeWidth="3"
        />
        
        {/* Q tail - diagonal element */}
        <path 
          d="M30 32 L44 48" 
          stroke="url(#metallicMain)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        
        {/* Q tail shadow */}
        <path 
          d="M32 34 L46 50" 
          stroke="url(#metallicShadow)"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.5"
        />
        
        {/* Top highlight edge */}
        <path 
          d="M10 15 L24 6 L38 15" 
          stroke="url(#metallicHighlight)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        
        {/* Left highlight edge */}
        <path 
          d="M10 16 L10 32" 
          stroke="url(#metallicHighlight)"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
      </g>
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

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
        {/* Premium gradient */}
        <linearGradient id="qualyxPrimaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(217, 91%, 60%)" />
          <stop offset="50%" stopColor="hsl(200, 100%, 50%)" />
          <stop offset="100%" stopColor="hsl(180, 100%, 45%)" />
        </linearGradient>
        
        {/* Dark gradient for depth */}
        <linearGradient id="qualyxSecondaryGradient" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="hsl(217, 91%, 50%)" />
          <stop offset="100%" stopColor="hsl(217, 91%, 35%)" />
        </linearGradient>

        {/* Inner glow */}
        <radialGradient id="qualyxCoreGlow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="hsl(190, 100%, 70%)" stopOpacity="1" />
          <stop offset="50%" stopColor="hsl(200, 100%, 55%)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="hsl(217, 91%, 50%)" stopOpacity="0.3" />
        </radialGradient>

        {/* Subtle shadow */}
        <filter id="qualyxShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="hsl(217, 91%, 40%)" floodOpacity="0.3" />
        </filter>

        {/* Inner shadow for depth */}
        <filter id="qualyxInnerGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background circle with premium feel */}
      <circle
        cx="32"
        cy="32"
        r="28"
        fill="url(#qualyxSecondaryGradient)"
        filter="url(#qualyxShadow)"
      />
      
      {/* Inner circle for depth */}
      <circle
        cx="32"
        cy="32"
        r="24"
        fill="url(#qualyxPrimaryGradient)"
        opacity="0.9"
      />

      {/* Q letter - stylized and modern */}
      <g filter="url(#qualyxInnerGlow)">
        {/* Main Q circle */}
        <circle
          cx="32"
          cy="30"
          r="12"
          stroke="white"
          strokeWidth="3.5"
          fill="none"
          opacity="0.95"
        />
        
        {/* Q tail - diagonal slash representing forward momentum */}
        <path
          d="M38 36 L48 48"
          stroke="white"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.95"
        />
        
        {/* Accent dot - represents precision/AI */}
        <circle
          cx="32"
          cy="30"
          r="3"
          fill="url(#qualyxCoreGlow)"
        />
      </g>

      {/* Subtle highlight arc */}
      <path
        d="M18 22 Q24 14 40 16"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.3"
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

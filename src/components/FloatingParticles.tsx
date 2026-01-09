import { useEffect, useState, useRef } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  parallaxFactor: number;
}

interface FloatingParticlesProps {
  count?: number;
  className?: string;
  enableParallax?: boolean;
}

export const FloatingParticles = ({ 
  count = 35, 
  className = "",
  enableParallax = true 
}: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 30 + 35,
      delay: Math.random() * -30,
      opacity: Math.random() * 0.25 + 0.05,
      parallaxFactor: Math.random() * 0.3 + 0.1, // Different parallax speed for each particle
    }));
    setParticles(generated);
  }, [count]);

  // Scroll-based parallax
  useEffect(() => {
    if (!enableParallax) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [enableParallax]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-secondary/50 will-change-transform"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animation: `floatParticle ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
            transform: enableParallax 
              ? `translateY(${scrollY * particle.parallaxFactor}px)` 
              : undefined,
          }}
        />
      ))}
      
      <style>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(5px, -8px);
          }
          50% {
            transform: translate(-3px, -12px);
          }
          75% {
            transform: translate(-8px, -5px);
          }
        }
      `}</style>
    </div>
  );
};

// Parallax background hook for mouse movement
export const useParallax = (intensity: number = 0.02) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX - innerWidth / 2) * intensity;
      const y = (clientY - innerHeight / 2) * intensity;
      
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [intensity]);

  return ref;
};

// Scroll-based parallax hook
export const useScrollParallax = (speed: number = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        setOffset((scrollProgress - 0.5) * 100 * speed);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return { ref, offset };
};


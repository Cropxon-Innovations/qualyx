import { useEffect, useRef, useState, ReactNode } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // Parallax speed multiplier (0.1 - 0.5 recommended)
  direction?: "up" | "down";
}

export const ParallaxSection = ({
  children,
  className = "",
  speed = 0.2,
  direction = "up"
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far into the viewport the element is
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      
      // Only apply parallax when element is in view
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        const parallaxOffset = (scrollProgress - 0.5) * 100 * speed;
        setOffset(direction === "up" ? -parallaxOffset : parallaxOffset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transform: `translateY(${offset}px)` }}
    >
      {children}
    </div>
  );
};

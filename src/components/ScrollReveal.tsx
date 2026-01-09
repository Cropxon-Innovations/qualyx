import { useEffect, useRef, ReactNode, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none" | "scale" | "fade";
  duration?: number;
  stagger?: boolean;
  parallax?: boolean;
  parallaxSpeed?: number;
}

export const ScrollReveal = ({ 
  children, 
  className = "", 
  delay = 0,
  direction = "up",
  duration = 700,
  stagger = false,
  parallax = false,
  parallaxSpeed = 0.1
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("scroll-revealed");
          }, delay);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Parallax effect
  useEffect(() => {
    if (!parallax) return;

    const handleScroll = () => {
      if (!ref.current) return;
      
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = (windowHeight - rect.top) / (windowHeight + rect.height);
      
      if (scrollProgress >= 0 && scrollProgress <= 1) {
        const offset = (scrollProgress - 0.5) * 50 * parallaxSpeed;
        setParallaxOffset(-offset);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [parallax, parallaxSpeed]);

  const getInitialStyles = () => {
    switch (direction) {
      case "up": return "translate-y-12 opacity-0";
      case "down": return "-translate-y-12 opacity-0";
      case "left": return "translate-x-12 opacity-0";
      case "right": return "-translate-x-12 opacity-0";
      case "scale": return "scale-95 opacity-0";
      case "fade": return "opacity-0";
      case "none": return "opacity-0";
      default: return "translate-y-12 opacity-0";
    }
  };

  const parallaxStyle = parallax ? { transform: `translateY(${parallaxOffset}px)` } : {};

  return (
    <div 
      ref={ref}
      className={`
        ${getInitialStyles()}
        transition-all ease-out
        [&.scroll-revealed]:opacity-100 [&.scroll-revealed]:translate-x-0 [&.scroll-revealed]:translate-y-0 [&.scroll-revealed]:scale-100
        ${stagger ? '[&.scroll-revealed]>[*]:animate-stagger' : ''}
        ${className}
      `}
      style={{ 
        transitionDuration: `${duration}ms`,
        ...parallaxStyle
      }}
    >
      {children}
    </div>
  );
};

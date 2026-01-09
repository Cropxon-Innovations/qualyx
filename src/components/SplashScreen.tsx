import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { QualyxLogo } from "./QualyxLogo";

interface SplashScreenProps {
  onComplete?: () => void;
}

export const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Background gradient effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.8,
              }}
              className="relative"
            >
              {/* Glow ring animation */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
                className="absolute inset-0 w-32 h-32 -m-6 rounded-full bg-primary/30 blur-xl"
              />
              <QualyxLogo size="large" className="w-20 h-20" />
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-8 text-center"
            >
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                QUALYX
              </h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="mt-2 text-lg text-primary font-medium"
              >
                Autonomous QA as a Service (QAAS)
              </motion.p>
            </motion.div>

            {/* Powered by */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 text-sm text-muted-foreground"
            >
              Powered by{" "}
              <a
                href="https://cropxon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Cropxon Innovations Pvt. Ltd.
              </a>
            </motion.p>

            {/* Loading indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.4 }}
              className="mt-8 flex items-center gap-1.5"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                  className="w-2 h-2 rounded-full bg-primary"
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

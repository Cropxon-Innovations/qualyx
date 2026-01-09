import { useState, useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { SplashScreen } from "./SplashScreen";

interface SplashWrapperProps {
  children: ReactNode;
}

export const SplashWrapper = ({ children }: SplashWrapperProps) => {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const location = useLocation();

  // Show splash on route change
  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    
    // Show splash on every route change
    setShowSplash(true);
  }, [location.pathname]);

  // Also check for page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.setItem("qualyx_refresh", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Check if this is a refresh
    const isRefresh = sessionStorage.getItem("qualyx_refresh");
    if (isRefresh) {
      sessionStorage.removeItem("qualyx_refresh");
      setShowSplash(true);
    }

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      {children}
    </>
  );
};

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import logo from "@/assets/logo.svg";

const Preloader = () => {
  const logoRef = useRef(null);
  const preloaderRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Spinning animation
    gsap.to(logoRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 2,
      ease: "linear",
    });

    // Fake load simulation (Replace this with real loading state later)
    const timeout = setTimeout(() => {
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => setIsVisible(false),
      });
    }, 2000); // Keep it visible for at least 2s

    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null; // Remove from DOM after fade-out

  return (
    <div
      ref={preloaderRef}
      className="preloader flex items-center justify-center h-screen"
    >
      <div className="rounded-full bg-gray-50">
        <img ref={logoRef} src={logo} alt="MLAB Logo" className="w-50" />
      </div>
    </div>
  );
};

export default Preloader;

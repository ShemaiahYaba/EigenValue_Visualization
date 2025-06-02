import React from "react";
import Hero from "@/pages/Onboarding/Hero";
import FPTSection from "@/pages/Onboarding/FPTSection";
import MadeEasy from "@/pages/Onboarding/MadeEasy";
import GetStarted from "@/components/UiComponents/GetStarted";
import AuthForm from "@/pages/Onboarding/AuthForm";
import CTA from "@/pages/Onboarding/CTA";
import Carousel from "@/pages/Onboarding/Carousel";

const Onboarding: React.FC = () => {
  const [showAuth, setShowAuth] = React.useState(false);

  React.useEffect(() => {
    if (!showAuth) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowAuth(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showAuth]);

  return (
    <div>
      <div className="flex flex-col min-h-screen ">
        <Hero />
        <div>
          {/* Onboarding content */}
          <GetStarted onClick={() => setShowAuth(true)} />

          {/* Modal for AuthForm */}
          {showAuth && (
            <div
              className="fixed inset-0 flex items-center justify-center z-50"
              style={{
                background: "rgba(255,255,255,0.7)", // translucent white overlay
                backdropFilter: "blur(2px)", // optional: adds a blur effect
              }}
              onClick={() => setShowAuth(false)}
            >
              <div
                className="bg-white p-6 rounded shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setShowAuth(false)}
                  className="absolute top-2 right-2 text-blue-500 hover:text-gray-700 text-2xl"
                  aria-label="Close"
                >
                  &times;
                </button>
                <AuthForm />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="carousel ">
        <Carousel>
          <MadeEasy />
          <FPTSection />
        </Carousel>
      </div>

      <CTA />
    </div>
  );
};

export default Onboarding;

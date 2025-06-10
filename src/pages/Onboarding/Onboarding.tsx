import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Hero from "@/pages/Onboarding/Hero";
import CTA from "./CTA";
import Features from "@/pages/Onboarding/Features";
import Playground from "@/pages/Onboarding/Playground";
import AuthModal from "@/components/UiComponents/AuthModal"; // adjust import as needed

const Onboarding: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    if (location.state?.showAuth) {
      setShowAuth(true);
      // Clear the state so it doesn't persist on further navigation
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  return (
    <div>
      <div
        className="flex flex-col min-h-screen flex-grow max-w-6xl 
      mx-auto px-2 py-2"
      >
        <Hero />
        <Features />
        <Playground />
      </div>
      <CTA />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
};

export default Onboarding;

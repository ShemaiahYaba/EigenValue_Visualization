// src/routes/AppRoutes.tsx
import React, { Suspense, useEffect, useState, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preloader from "@/components/UiComponents/Preloader";
import NotFound from "@/components/UiComponents/NotFound";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import { useAuth } from "@/hooks/useAuth";
import AuthModal from "@/components/UiComponents/AuthModal";

const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const wasAuthenticated = useRef(false);

  useEffect(() => {
    if (!loading && isAuthenticated) {
      wasAuthenticated.current = true;
      setShowSessionExpired(false); // Hide modal if user logs in again
    }
    if (
      !loading &&
      !isAuthenticated &&
      wasAuthenticated.current // Only show if user was previously authenticated
    ) {
      setShowSessionExpired(true);
    }
  }, [loading, isAuthenticated]);

  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Routes>
          {/** Public routes like home, onboarding, etc. */}
          {PublicRoutes()}

          {/** Protected routes like PCA, concepts, features, etc. */}
          {ProtectedRoutes()}

          {/** Fallback 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      {showSessionExpired && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <p>Your session has expired. Please log in again.</p>
            {/* Add AuthModal for re-authentication */}
            <AuthModal onClose={() => setShowSessionExpired(false)} />
          </div>
        </div>
      )}
    </Router>
  );
};

export default AppRoutes;

// src/routes/AppRoutes.tsx
import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Preloader from "@/components/UiComponents/Preloader";
import NotFound from "@/components/UiComponents/NotFound";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";

const AppRoutes: React.FC = () => {
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
    </Router>
  );
};

export default AppRoutes;

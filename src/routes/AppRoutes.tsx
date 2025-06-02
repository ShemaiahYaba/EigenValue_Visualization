import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Preloader from "@/components/UiComponents/Preloader";
import Layout from "@/components/UiComponents/Layout";
import FeaturesLayout from "@/layouts/FeaturesLayout";

// Lazy loaded components
const Onboarding = React.lazy(() => import("@/pages/Onboarding/Onboarding"));
const NotFound = React.lazy(() => import("@/components/UiComponents/NotFound"));
const ComingSoon = React.lazy(
  () => import("@/components/UiComponents/ComingSoon")
);
const MadeEasy = React.lazy(() => import("@/pages/Onboarding/MadeEasy"));
const Concepts = React.lazy(() => import("@/pages/Concepts"));
const PCA = React.lazy(() => import("@/pages/PCA"));
const Features = React.lazy(() => import("@/pages/Features"));
const MatrixPlayground = React.lazy(
  () => import("@/pages/Features/MatrixPlayground")
);
const NumericalMethods = React.lazy(
  () => import("@/pages/Features/NumericalMethods")
);

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Routes>
          {/* Main layout with all standard routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Onboarding />} />

            <Route path="home/made-easy" element={<MadeEasy />} />
            <Route path="home/concepts" element={<Concepts />} />
            <Route path="home/pca" element={<PCA />} />

            <Route path="coming-soon" element={<ComingSoon />} />
            <Route path="404" element={<NotFound />} />
          </Route>

          {/* Features layout routes */}
          <Route path="/features" element={<FeaturesLayout />}>
            <Route index element={<Features />} />
            <Route path="numerical-methods" element={<NumericalMethods />} />
            <Route path="matrix-playground" element={<MatrixPlayground />} />
          </Route>

          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;

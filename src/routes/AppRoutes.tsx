import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Preloader from "@/components/UiComponents/Preloader";
import Layout from "@/components/UiComponents/Layout";
import Navbar from "@/layouts/Navbar";
import React, { Suspense } from "react";

const Onboarding = React.lazy(() => import("@/pages/Onboarding"));
const NotFound = React.lazy(() => import("@/components/UiComponents/NotFound"));
const ComingSoon = React.lazy(
  () => import("@/components/UiComponents/ComingSoon")
);
const MadeEasy = React.lazy(() => import("@/pages/MadeEasy"));
const Concepts = React.lazy(() => import("@/pages/Concepts"));
const PCA = React.lazy(() => import("@/pages/PCA"));
const Features = React.lazy(() => import("@/pages/Features"));
const MatrixPlayground = React.lazy(
  () => import("@/pages/Features/MatrixPlayground")
);

function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Preloader />}>
        <Routes>
          {/* Root with Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Onboarding />} />
            <Route path="home">
              <Route path="made-easy" element={<MadeEasy />} />
              <Route path="concepts" element={<Concepts />} />
              <Route path="pca" element={<PCA />} />
              <Route path="coming-soon" element={<ComingSoon />} />
              <Route path="404" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="coming-soon" element={<ComingSoon />} />
            <Route path="404" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Features with Sidebar layout */}
          <Route path="/" element={<Navbar />}>
            <Route path="features" element={<Features />} />
            <Route path="matrix-playground" element={<MatrixPlayground />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default AppRoutes;

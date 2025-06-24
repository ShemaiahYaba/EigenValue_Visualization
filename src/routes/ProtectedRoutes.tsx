// src/routes/ProtectedRoutes.tsx
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "@/layouts/FeaturesNavbar";
import NotFound from "@/components/UiComponents/NotFound";

const Features = React.lazy(() => import("@/pages/Features"));
const Course = React.lazy(() => import("@/pages/Features/CrashCourse"));
const Concepts = React.lazy(() => import("@/pages/Features/ConceptsVisuals"));
const MatrixPlayground = React.lazy(
  () => import("@/pages/Features/MatrixPlayground")
);
const NumericalMethods = React.lazy(
  () => import("@/pages/Features/NumericalMethods")
);
const PCAModule = React.lazy(() => import("@/components/PCA/PCAMain"));
const PCAIntro = React.lazy(() => import("@/pages/Features/PCA"));

const ProtectedRoutes = () => (
  <Route
    path="/features"
    element={
      <ProtectedRoute>
        <Navbar />
      </ProtectedRoute>
    }
  >
    <Route index element={<Features />} />
    <Route path="made-easy" element={<Course />} />
    <Route path="concepts" element={<Concepts />} />
    <Route path="pca-intro" element={<PCAIntro />} />
    <Route path="pca" element={<PCAModule />} />
    <Route path="numerical-methods" element={<NumericalMethods />} />
    <Route path="matrix-playground" element={<MatrixPlayground />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default ProtectedRoutes;

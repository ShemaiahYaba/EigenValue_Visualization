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
const PCAIntro = React.lazy(() => import("@/pages/Features/PCAIntro"));
const LinearTransformation = React.lazy(() => import("@/pages/CustomVisuals/LinearTransformation"));
const IdentityMatrix = React.lazy(() => import("@/pages/CustomVisuals/IdentityMatrix"));
const ScalingMatrix = React.lazy(() => import("@/pages/CustomVisuals/ScalingMatrix"));
const RotationMatrix = React.lazy(() => import("@/pages/CustomVisuals/RotationMatrix"));
const ShearMatrix = React.lazy(() => import("@/pages/CustomVisuals/ShearMatrix"));
const ReflectionMatrix = React.lazy(() => import("@/pages/CustomVisuals/ReflectionMatrix"));  
const OrthogonalMatrix = React.lazy(() => import("@/pages/CustomVisuals/OrthogonalMatrix"));
const ProjectionMatrix = React.lazy(() => import("@/pages/CustomVisuals/ProjectionMatrix"));

const ProtectedRoutes = () => (
  <>
  <Route
    path="/features"
    element={
      <ProtectedRoute>
        <Navbar />
      </ProtectedRoute>
    }
  >
    <Route path="custom-visuals/linear-transformation" element={<LinearTransformation />}  />
    <Route path="custom-visuals/identity-matrix" element={<IdentityMatrix />}  />
    <Route path="custom-visuals/scaling-matrix" element={<ScalingMatrix />}  />
    <Route path="custom-visuals/rotation-matrix" element={<RotationMatrix />}  />
    <Route path="custom-visuals/shear-matrix" element={<ShearMatrix />}  />
    <Route path="custom-visuals/reflection-matrix" element={<ReflectionMatrix />}  />
    <Route path="custom-visuals/orthogonal-matrix" element={<OrthogonalMatrix />}  />
    <Route path="custom-visuals/projection-matrix" element={<ProjectionMatrix />}  />
    <Route index element={<Features />} />
    <Route path="made-easy" element={<Course />} />
    <Route path="concepts" element={<Concepts />} />
    <Route path="pca-intro" element={<PCAIntro />} />
    <Route path="pca" element={<PCAModule />} />
    <Route path="numerical-methods" element={<NumericalMethods />} />
    <Route path="matrix-playground" element={<MatrixPlayground />} />
    <Route path="*" element={<NotFound />} />
  </Route>
 
  </>
);

export default ProtectedRoutes;

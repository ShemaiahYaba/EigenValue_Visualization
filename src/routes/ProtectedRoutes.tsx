// src/routes/ProtectedRoutes.tsx
import React from "react";
import { Route } from "react-router-dom";
import FeaturesLayout from "@/layouts/FeaturesLayout";
import ProtectedRoute from "./ProtectedRoute";

const Features = React.lazy(() => import("@/pages/Features"));
const MatrixPlayground = React.lazy(
  () => import("@/pages/Features/MatrixPlayground")
);
const NumericalMethods = React.lazy(
  () => import("@/pages/Features/NumericalMethods")
);

const ProtectedRoutes = () => (
  <Route
    path="/features"
    element={
      <ProtectedRoute>
        <FeaturesLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Features />} />
    <Route path="numerical-methods" element={<NumericalMethods />} />
    <Route path="matrix-playground" element={<MatrixPlayground />} />
  </Route>
);

export default ProtectedRoutes;

// src/routes/ProtectedRoutes.tsx
import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "@/layouts/FeaturesNavbar";
import NotFound from "@/components/UiComponents/NotFound";

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
        <Navbar />
      </ProtectedRoute>
    }
  >
    <Route index element={<Features />} />
    <Route path="numerical-methods" element={<NumericalMethods />} />
    <Route path="matrix-playground" element={<MatrixPlayground />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default ProtectedRoutes;

import React from "react";
import { Route, Navigate } from "react-router-dom";
import FeaturesLayout from "@/layouts/FeaturesLayout";
import Layout from "@/components/UiComponents/Layout";

const Concepts = React.lazy(() => import("@/pages/Concepts"));
const PCA = React.lazy(() => import("@/pages/PCA"));
const Features = React.lazy(() => import("@/pages/Features"));
const MatrixPlayground = React.lazy(
  () => import("@/pages/Features/MatrixPlayground")
);
const NumericalMethods = React.lazy(
  () => import("@/pages/Features/NumericalMethods")
);

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // Replace this with your actual auth check
  const isAuthenticated = false; // This should come from your auth context/state

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
const ProtectedRoutes = () => {
  return (
    <>
      <Route path="/" element={<Layout />}>
        <Route
          path="home/concepts"
          element={
            <ProtectedRoute>
              <Concepts />
            </ProtectedRoute>
          }
        />
        <Route
          path="home/pca"
          element={
            <ProtectedRoute>
              <PCA />
            </ProtectedRoute>
          }
        />
      </Route>

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
    </>
  );
};
export default ProtectedRoutes;

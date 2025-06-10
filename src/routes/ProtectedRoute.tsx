// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // Adjust the import path as necessary
import Preloader from "@/components/UiComponents/Preloader";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Preloader />; // Or a spinner

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
        state={{ showAuth: true, from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;

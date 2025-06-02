// src/routes/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // or a spinner if needed
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

export default ProtectedRoute;

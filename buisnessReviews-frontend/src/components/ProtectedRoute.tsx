import React, { ReactNode } from "react";
import { useUserContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useUserContext();

  if (user === null) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

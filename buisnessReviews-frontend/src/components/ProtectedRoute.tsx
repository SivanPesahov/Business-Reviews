import { ReactNode } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loggedInUser } = useAuth();

  if (loggedInUser === null) {
    return <Navigate to="/auth/login" />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;

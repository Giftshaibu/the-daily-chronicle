import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  /** Roles allowed to access this route. If empty, any authenticated user can access. */
  allowedRoles?: string[];
  /** Whether the user must have their email verified to access this route. Defaults to true. */
  requireVerification?: boolean;
}

export default function ProtectedRoute({ children, allowedRoles, requireVerification = true }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-body text-muted-foreground text-sm">Loading…</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (requireVerification && user && !user.email_verified_at) {
    return <Navigate to="/verify-email-notice" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

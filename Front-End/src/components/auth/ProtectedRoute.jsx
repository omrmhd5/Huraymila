import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ProtectedRoute = ({
  children,
  requiredUserType = null, // "governor", "agency", or null for any authenticated user
  redirectTo = "/auth",
}) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      // Check if user is authenticated
      if (!user) {
        navigate(redirectTo);
        return;
      }

      // Check if specific user type is required
      if (requiredUserType && user.type !== requiredUserType) {
        // Redirect based on user type
        if (user.type === "governor") {
          navigate("/admin");
        } else if (user.type === "agency") {
          navigate("/agency-dashboard");
        } else {
          navigate(redirectTo);
        }
        return;
      }
    }
  }, [user, loading, navigate, requiredUserType, redirectTo]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Don't render children if not authenticated or wrong user type
  if (!user) {
    return null;
  }

  if (requiredUserType && user.type !== requiredUserType) {
    return null;
  }

  return children;
};

export default ProtectedRoute;

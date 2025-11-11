import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  //  While checking token/user, show loader
  if (loading) {
    return <div>Loading...</div>;
  }

  //  If not logged in, redirect to login
  if (!user) {  
    return <Navigate to="/login" />;
  }

  //  If role doesn't match, redirect to unauthorized
  if (!requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  //  All good
  return children;
};

export default RoleBaseRoutes;
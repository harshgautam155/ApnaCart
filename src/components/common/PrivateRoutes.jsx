import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "./Loader";

function PrivateRoutes({ children }) {
  const { isAuthenticated, checked } = useAuth();
  const location = useLocation();
  if (!checked) {
    return <Loader fullScreen={true} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export default PrivateRoutes;

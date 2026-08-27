import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Loader from "./Loader";

function AdminRoutes({children}) {
    const {isAuthenticated, checked, isAdmin} = useAuth();

    if(!checked) {
        return <Loader fullScreen={true} />
    }
    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }
    if(!isAdmin) {
        return <Navigate to="/" replace />
    }

  return children;
}

export default AdminRoutes;
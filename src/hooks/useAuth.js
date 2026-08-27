import { useSelector, useDispatch } from "react-redux";

export function useAuth() {
  const dispatch = useDispatch();
  const { user, isAuthenticated, status, checked, error } = useSelector(
    (state) => state.auth,
  );

  const normalizedRole = String(user?.role || "").toLowerCase();
  const isAdmin = normalizedRole === "admin" || user?.isAdmin === true;
  const loading = status === "loading";

  return {
    user,
    isAuthenticated,
    isAdmin,
    loading,
    checked,
    error,
    dispatch,
  };
}

import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));

  return loggedInUser ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
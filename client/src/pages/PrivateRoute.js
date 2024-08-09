import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  if (isAuthenticated) {
    // Redirect to home if already authenticated
    return <Navigate to="/" />;
  }

  // Render children (Login component) if not authenticated
  return children;
};

export default PrivateRoute;

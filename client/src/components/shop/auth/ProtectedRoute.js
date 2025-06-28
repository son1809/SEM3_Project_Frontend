import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticate, isAdmin } from "./fetchApi";

const ProtectedRoute = ({ children }) => {
  if (isAuthenticate() && !isAdmin()) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;

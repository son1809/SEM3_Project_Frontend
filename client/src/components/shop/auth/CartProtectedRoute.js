import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticate } from "./fetchApi";

const CartProtectedRoute = ({ children }) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length !== 0 && isAuthenticate()) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};

export default CartProtectedRoute;

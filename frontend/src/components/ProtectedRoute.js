import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => !!localStorage.getItem("token");

export default function ProtectedRoute({ element }) {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
}
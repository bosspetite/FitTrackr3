import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-5 text-center">
      <h2>404 - Not Found</h2>
      <Link to="/">Go Home</Link>
    </div>
  );
}
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateOutlet = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/Login" />;
};

export default PrivateOutlet;

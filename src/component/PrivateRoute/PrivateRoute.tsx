import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../../repositories/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";

const PrivateRoute = () => {

  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;

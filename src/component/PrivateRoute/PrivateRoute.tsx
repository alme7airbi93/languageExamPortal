import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../..//hooks/AuthProvider";
import { auth } from "../../repositories/firebase-config";

const PrivateRoute = () => {
  const user = useAuth();
  const currentUser = auth.currentUser;
  console.log("currentUser",currentUser);
  
  console.log("user",user);
  
  if (!user.token) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoute;
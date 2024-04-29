import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../authentication/services/getToken";

export function ProtectedRoutes() {
  //SI EL TOKEN EXPIRO INDICARLO
  if (!getToken()) {
    return <Navigate to={"/sign-in"} />;
  }
  return <Outlet />;
}

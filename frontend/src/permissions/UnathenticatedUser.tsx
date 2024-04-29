import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "../authentication/services/getToken";

export function UnauthenticatedUser() {
  if (getToken()) {
    return <Navigate to={"/"} />;
  }
  return <Outlet />;
}

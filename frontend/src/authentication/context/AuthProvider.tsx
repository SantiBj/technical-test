import { ReactElement, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TokenBackend } from "../models/types";

const AuthContext = createContext({
  login: (userData: TokenBackend) => {},
});

export function AuthProvider({ children }: { children: ReactElement }) {
  const navigate = useNavigate();

  function login(userData: TokenBackend) {
    localStorage.setItem("token", userData.token);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./products/pages/Home";
import { SignIn } from "./authentication/pages/SignIn";
import { Register } from "./authentication/pages/Register";
import { UnauthenticatedUser } from "./permissions/UnathenticatedUser";
import { AuthProvider } from "./authentication/context/AuthProvider";
import { ProtectedRoutes } from "./permissions/ProtectedRoutes";

function App() {
  return (
    <HashRouter>
      <main>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
          </Route>
          <Route
            element={
              <AuthProvider>
                <UnauthenticatedUser />
              </AuthProvider>
            }
          >
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </main>
    </HashRouter>
  );
}

export default App;

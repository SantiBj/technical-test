import { ChangeEvent, useEffect, useState } from "react";
import { CredentialsType, TokenBackend } from "../models/types";
import { useConsult } from "../../app/hooks/useConsult";
import { useAuth } from "../context/AuthProvider";

type AuthType = "signIn" | "register";

export function useAutentication(authType: AuthType) {
  const auth = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<CredentialsType>({
    email: "",
    password: "",
  });

  const { data, consult, load, mssg, resetAll } = useConsult<TokenBackend>(
    "http.localhost:3000/"
  );

  function login() {
    consult<CredentialsType>(
      authType === "register" ? "auth/register" : "auth/signIn",
      "POST",
      credentials
    );
  }

  useEffect(() => {
    if (data !== null) {
      auth.login(data);
    }
  }, [data]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    const newCredentials = {
      ...credentials!,
      [name]: value,
    };
    setCredentials(newCredentials);

    let hasError = "";
    if (newCredentials.email.length < 5) {
      hasError = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
        newCredentials.email
      )
    ) {
      hasError = "You must provide a valid email.";
    } else if (newCredentials.password.length < 8) {
      hasError = "Password is required.";
    } else if (
      !/^(?=.*[A-Za-záéíóúÁÉÍÓÚüÜñÑ])(?=.*\d)[A-Za-z\dáéíóúÁÉÍÓÚüÜñÑ\s!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]{8,}$/.test(
        newCredentials.password
      ) &&
      authType == "register"
    ) {
      hasError =
        "the password must be at least 8 characters and contain at least one letter and at least one digit.";
    }

    if (hasError == "") {
      setError(null);
    } else {
      setError(hasError);
    }
  }

  return {
    handleChange,
    error,
    credentials,
    login,
    load,
    mssg,
  };
}

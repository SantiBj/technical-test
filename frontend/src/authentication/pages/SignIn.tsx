import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useAutentication } from "../hooks/useAuthentication";
import { Loading } from "../../app/components/Loading";

export function SignIn() {
  const { handleChange, error, credentials, login, load, mssg } =
    useAutentication("signIn");

  return (
    <section className="min-h-screen w-full flex items-center">
      <Loading loading={load} />
      <section className="w-[70%] max-w-[600px] mx-auto flex flex-col space-y-[40px]">
        <h1 className="text-center text-3xl font-bold">MAYNOOTH</h1>
        {(error || mssg) && (
          <div
            className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{error || mssg}</span>
          </div>
        )}
        <Input
          name="email"
          type="text"
          value={credentials.email}
          placeholder="your@email.com"
          onChange={handleChange}
        />
        <Input
          name="password"
          type="password"
          value={credentials.password}
          placeholder="Your password"
          onChange={handleChange}
        />

        <section className="w-full flex justify-between">
          <section className="flex gap-[5px]">
            <input type="checkbox" />
            <p className="font-semibold">Remember me</p>
          </section>
          <section>
            <p className="font-semibold">Forgot password?</p>
          </section>
        </section>

        <section
          className={`w-full ${
            (error ||
              credentials.email === "" ||
              credentials.password === "") &&
            "opacity-75 pointer-events-none"
          }`}
        >
          <Button name="Log in" action={login} style={1} />
        </section>
        <p className="font-semibold my-[10px] text-center">OR</p>
        <Button name="Continue with Google" action={() => {}} style={2} />
        <Button name="Continue with Facebook" action={() => {}} style={2} />
        <p className="text-center">
          Don't have an account?{" "}
          <Link to={"/register"} className="font-semibold">
            Sign up
          </Link>
        </p>
      </section>
    </section>
  );
}

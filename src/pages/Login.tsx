import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    login({ email, password });
  };

  return (
    <div className="flex justify-center min-h-[200px] items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4 w-[350px] rounded-lg"
      >
        <h1 className="heading-1">Login</h1>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="email"
            className="grow"
            placeholder="email@site.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button className="btn btn-primary mt-4" onClick={onLogin}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

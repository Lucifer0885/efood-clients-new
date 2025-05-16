import { useState } from "react";
import axios from "../api/axiosInstance";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const register = () => {
    // if (password !== confirmPassword) {
    //   alert("Passwords do not match!");
    //   return;
    // }
    axios.post('/client/auth/register', {name, email, password})
        .then((res) => {
          console.log(res.data);
        })
  };

  return (
    <div className="flex justify-center min-h-[200px] items-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex flex-col gap-4 w-[350px] rounded-lg"
      >
        <h1 className="text-3xl">Register</h1>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="password"
            className="grow"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        <button className="btn btn-primary mt-4" onClick={register}>Register</button>
      </form>
    </div>
  );
}

export default Register;

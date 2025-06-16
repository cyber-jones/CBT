import { useState } from "react";
import axios from "axios";
import { server_dev_url } from "../utils/SD";
import { toast } from "react-toastify";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const res = await axios.post(`${server_dev_url}${endpoint}`, {
        email,
        password,
        role: isRegister ? role : undefined,
      });
      console.log(res);
      onLogin(res.data.token, res.data.role);
      toast(`${isRegister ? "Registration" : "Login"} successful!`);
    } catch (err) {
      console.log(err);
      toast(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="login-form">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {isRegister && (
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Student">Student</option>
            <option value="Lecturer">Lecturer</option>
            <option value="Admin">Admin</option>
          </select>
        )}
        <button type="submit">{isRegister ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
}

export default Login;

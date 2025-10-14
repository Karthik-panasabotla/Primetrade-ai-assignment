import { useState } from "react";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res.token) {
      localStorage.setItem("jwt", res.token);
      navigate("/dashboard");
    } else if (res.message === "User does not exist") {
      navigate("/signup");
    } else {
      setError(res.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: 400 }}>
        <h3 className="mb-4 text-center">Login</h3>
        <input
          className="form-control mb-3"
          name="email"
          placeholder="Email"
          required
          onChange={handleChange}
        />
        <input
          className="form-control mb-3"
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>
      </form>
      <div className="text-center mt-3">
        <button
          className="btn btn-link"
          onClick={() => navigate("/signup")}
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

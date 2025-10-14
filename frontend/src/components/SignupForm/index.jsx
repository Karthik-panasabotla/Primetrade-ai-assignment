import { useState } from "react";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup(form);
    if (res.token) {
      localStorage.setItem("jwt", res.token);
      navigate("/dashboard");
    } else {
      setError(res.message || "Signup failed");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="card p-4 mx-auto" style={{ maxWidth: 400 }}>
        <h3 className="mb-4 text-center">Sign Up</h3>
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Name"
          required
          onChange={handleChange}
        />
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
        <button className="btn btn-success w-100" type="submit">
          Sign Up
        </button>
      </form>
      <div className="text-center mt-3">
        <button
          className="btn btn-link"
          onClick={() => navigate("/")}
        >
          Already have an account? Login
        </button>
      </div>
    </div>
  );
};

export default SignupForm;

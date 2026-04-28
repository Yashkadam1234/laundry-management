import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

   const submit = async (e) => {
  e.preventDefault();

  try {
    const res = await api.post("/auth/login", form);

    //  IMPORTANT: validate token exists
    if (!res.data?.token) {
      setError("Login failed: No token received");
      return;
    }

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  } catch (err) {
    console.log(err);
    setError("Invalid email or password");
  }
};

  return (
    <div className="auth-wrapper">
      <div className="auth-card">

        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          Login
        </h2>

        <form onSubmit={submit}>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        {/* ERROR MESSAGE */}
        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}

        {/* SWITCH TO REGISTER */}
        <div className="auth-link">
          Don't have an account?{" "}
          <a href="/register">Register</a>
        </div>

      </div>
    </div>
  );
};

export default Login;
import React, { useState } from "react";
import api from "../services/api";

const Login = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await api.login({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <p>Access the police-grade crime analytics system.</p>
      {error ? <div className="error">{error}</div> : null}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
        </label>
        <label>
          Password
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Login;

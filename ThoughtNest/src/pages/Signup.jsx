import React, { useState } from "react";
import api from "../services/api";

const Signup = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "OFFICER",
    police_station_id: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      await api.signup({
        ...form,
        police_station_id: form.police_station_id ? Number(form.police_station_id) : null,
      });
      setMessage("Account created. You can login now.");
      onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-card">
      <h2>Signup</h2>
      <p>Create officer or admin credentials.</p>
      {error ? <div className="error">{error}</div> : null}
      {message ? <div className="success">{message}</div> : null}
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" value={form.email} onChange={handleChange} type="email" required />
        </label>
        <label>
          Password
          <input name="password" value={form.password} onChange={handleChange} type="password" required />
        </label>
        <label>
          Role
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="OFFICER">Police Officer</option>
            <option value="ADMIN">Admin</option>
          </select>
        </label>
        <label>
          Police Station ID
          <input name="police_station_id" value={form.police_station_id} onChange={handleChange} />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Signup;

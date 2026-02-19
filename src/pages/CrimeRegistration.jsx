import React, { useState } from "react";
import api from "../services/api";

const CrimeRegistration = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    crime_type_id: "",
    location_id: "",
    status: "OPEN",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await api.createCrime({
        ...form,
        crime_type_id: Number(form.crime_type_id),
        location_id: Number(form.location_id),
      });
      setMessage("Crime registered successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="panel">
      <h2>Crime Registration</h2>
      <p>Capture a new crime report with location and category.</p>
      {message ? <div className="success">{message}</div> : null}
      {error ? <div className="error">{error}</div> : null}
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} required />
        </label>
        <label>
          Crime Type ID
          <input name="crime_type_id" value={form.crime_type_id} onChange={handleChange} required />
        </label>
        <label>
          Location ID
          <input name="location_id" value={form.location_id} onChange={handleChange} required />
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="OPEN">OPEN</option>
            <option value="UNDER_INVESTIGATION">UNDER_INVESTIGATION</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </label>
        <label className="full">
          Description
          <textarea name="description" value={form.description} onChange={handleChange} />
        </label>
        <button type="submit">Register Crime</button>
      </form>
    </section>
  );
};

export default CrimeRegistration;

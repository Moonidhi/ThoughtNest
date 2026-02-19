import React, { useEffect, useState } from "react";
import api from "../services/api";

const FIRManagement = () => {
  const [firs, setFirs] = useState([]);
  const [form, setForm] = useState({
    crime_id: "",
    fir_number: "",
    description: "",
    status: "OPEN",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadFirs = async () => {
    try {
      const data = await api.getFIRs();
      setFirs(data);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadFirs();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await api.createFIR({
        ...form,
        crime_id: Number(form.crime_id),
      });
      setMessage("FIR created successfully.");
      setForm({ crime_id: "", fir_number: "", description: "", status: "OPEN" });
      loadFirs();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="panel">
      <h2>FIR Management</h2>
      <div className="grid">
        <div className="card">
          <h3>Create FIR</h3>
          {message ? <div className="success">{message}</div> : null}
          {error ? <div className="error">{error}</div> : null}
          <form className="form-grid" onSubmit={handleSubmit}>
            <label>
              Crime ID
              <input name="crime_id" value={form.crime_id} onChange={handleChange} required />
            </label>
            <label>
              FIR Number
              <input name="fir_number" value={form.fir_number} onChange={handleChange} required />
            </label>
            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </label>
            <label className="full">
              Description
              <textarea name="description" value={form.description} onChange={handleChange} />
            </label>
            <button type="submit">Create FIR</button>
          </form>
        </div>
        <div className="card">
          <h3>Existing FIRs</h3>
          <ul>
            {firs.map((fir) => (
              <li key={fir.id}>
                {fir.fir_number} - {fir.status} - {fir.crime_title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default FIRManagement;

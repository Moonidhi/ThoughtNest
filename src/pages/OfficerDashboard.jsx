import React, { useEffect, useState } from "react";
import api from "../services/api";

const OfficerDashboard = () => {
  const [crimes, setCrimes] = useState([]);
  const [firs, setFirs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const [crimeData, firData] = await Promise.all([api.getCrimes(), api.getFIRs()]);
        setCrimes(crimeData.slice(0, 5));
        setFirs(firData.slice(0, 5));
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, []);

  return (
    <section className="panel">
      <h2>Officer Dashboard</h2>
      <p>Recent crimes and FIR activity.</p>
      {error ? <div className="error">{error}</div> : null}
      <div className="grid">
        <div className="card">
          <h3>Recent Crimes</h3>
          <ul>
            {crimes.map((crime) => (
              <li key={crime.id}>
                {crime.title} - {crime.status}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Recent FIRs</h3>
          <ul>
            {firs.map((fir) => (
              <li key={fir.id}>
                {fir.fir_number} - {fir.status}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default OfficerDashboard;

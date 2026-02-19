import React, { useEffect, useState } from "react";
import api from "../services/api";

const AdminDashboard = () => {
  const [frequentAreas, setFrequentAreas] = useState([]);
  const [repeatOffenders, setRepeatOffenders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const areas = await api.getAnalytics("frequent-areas?limit=5");
        const offenders = await api.getAnalytics("repeat-offenders?min=2");
        setFrequentAreas(areas);
        setRepeatOffenders(offenders);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, []);

  return (
    <section className="panel">
      <h2>Admin Dashboard</h2>
      <p>System-wide visibility and repeat offender detection.</p>
      {error ? <div className="error">{error}</div> : null}
      <div className="grid">
        <div className="card">
          <h3>Top Crime Areas</h3>
          <ul>
            {frequentAreas.map((item) => (
              <li key={`${item.city}-${item.address}`}>
                {item.address}, {item.city} ({item.crime_count})
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Repeat Offenders</h3>
          <ul>
            {repeatOffenders.map((item) => (
              <li key={item.id}>
                {item.first_name} {item.last_name} - {item.crime_count} crimes
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;

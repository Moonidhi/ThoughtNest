import React, { useEffect, useState } from "react";
import api from "../services/api";

const CriminalSearch = () => {
  const [criminals, setCriminals] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await api.getCriminals();
        setCriminals(data);
      } catch (err) {
        setError(err.message);
      }
    };
    load();
  }, []);

  const filtered = criminals.filter((c) =>
    `${c.first_name} ${c.last_name}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="panel">
      <h2>Criminal Record Search</h2>
      <p>Search by name. Use SQL filters on the backend for advanced search.</p>
      {error ? <div className="error">{error}</div> : null}
      <input
        className="search"
        placeholder="Search by name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="card">
        <ul>
          {filtered.map((c) => (
            <li key={c.id}>
              {c.first_name} {c.last_name} - {c.national_id || "No ID"}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default CriminalSearch;

import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import api from "../services/api";

const AnalyticsDashboard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [interval, setInterval] = useState("month");
  const [areas, setAreas] = useState([]);
  const [error, setError] = useState("");

  const loadTrends = async (selectedInterval) => {
    try {
      const data = await api.getAnalytics(`trends?interval=${selectedInterval}`);
      const labels = data.map((item) => new Date(item.period).toLocaleDateString());
      const values = data.map((item) => Number(item.total));
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: "line",
        data: {
          labels,
          datasets: [
            {
              label: "Reported Crimes",
              data: values,
              borderColor: "#ff7a59",
              backgroundColor: "rgba(255, 122, 89, 0.2)",
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const loadAreas = async () => {
      try {
        const data = await api.getAnalytics("frequent-areas?limit=6");
        setAreas(data);
      } catch (err) {
        setError(err.message);
      }
    };
    loadAreas();
  }, []);

  useEffect(() => {
    loadTrends(interval);
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [interval]);

  return (
    <section className="panel">
      <h2>Crime Analytics Dashboard</h2>
      <p>Patterns by time, location, and crime type.</p>
      {error ? <div className="error">{error}</div> : null}
      <div className="grid">
        <div className="card">
          <div className="chart-header">
            <h3>Crime Trends</h3>
            <select value={interval} onChange={(e) => setInterval(e.target.value)}>
              <option value="day">Daily</option>
              <option value="week">Weekly</option>
              <option value="month">Monthly</option>
            </select>
          </div>
          <div className="chart">
            <canvas ref={chartRef} />
          </div>
        </div>
        <div className="card">
          <h3>Frequent Crime Areas</h3>
          <ul>
            {areas.map((area) => (
              <li key={`${area.address}-${area.city}`}>
                {area.address}, {area.city} - {area.crime_count}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;

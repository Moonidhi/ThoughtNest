const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

const request = async (path, options = {}) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return res.json();
};

export const api = {
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  signup: (data) => request("/auth/signup", { method: "POST", body: JSON.stringify(data) }),
  getCrimes: () => request("/crimes"),
  createCrime: (data) => request("/crimes", { method: "POST", body: JSON.stringify(data) }),
  getFIRs: () => request("/firs"),
  createFIR: (data) => request("/firs", { method: "POST", body: JSON.stringify(data) }),
  getCriminals: () => request("/criminals"),
  getAnalytics: (path) => request(`/analytics/${path}`),
};

export default api;

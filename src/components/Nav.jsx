import React from "react";

const Nav = ({ active, onChange, onLogout, user }) => {
  return (
    <header className="nav">
      <div className="brand">
        Crime Record & Pattern Analysis
      </div>
      <nav className="nav-links">
        {[
          "Admin Dashboard",
          "Officer Dashboard",
          "Crime Registration",
          "FIR Management",
          "Criminal Search",
          "Analytics",
        ].map((item) => (
          <button
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => onChange(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="nav-right">
        {user ? <span className="user-pill">{user.name} ({user.role})</span> : null}
        <button className="logout" onClick={onLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Nav;

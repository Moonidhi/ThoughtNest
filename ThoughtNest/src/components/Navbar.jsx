import React from "react";
import { NavLink } from "react-router-dom";
import ReadingCounter from "./ReadingCounter";

const Navbar = ({ totalSeconds }) => {
  return (
    <header className="sticky top-0 z-30 w-full border-b border-line-muted bg-[rgba(21,19,18,0.88)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <div className="font-serif text-lg tracking-[0.2em] text-parchment">ThoughtNest</div>
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-muted">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-parchment" : "transition-colors duration-300 hover:text-parchment"
              }
            >
              Read
            </NavLink>
            <NavLink
              to="/saved"
              className={({ isActive }) =>
                isActive ? "text-parchment" : "transition-colors duration-300 hover:text-parchment"
              }
            >
              Saved
            </NavLink>
          </nav>
          <ReadingCounter totalSeconds={totalSeconds} />
          <button
            type="button"
            className="rounded-full border border-line-muted px-3 py-2 text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-parchment"
          >
            Theme
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

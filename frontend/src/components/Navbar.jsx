import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const navClass = ({ isActive }) =>
  `transition ${isActive ? 'text-paper' : 'text-slate-300 hover:text-paper'}`;

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-mist/70 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="font-display text-3xl font-semibold text-paper">
          ThoughtNest
        </Link>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <NavLink to="/discover" className={navClass}>
            Discover
          </NavLink>
          {user && (
            <>
              <NavLink to="/write" className={navClass}>
                Write
              </NavLink>
              <NavLink to="/drafts" className={navClass}>
                Drafts
              </NavLink>
              <NavLink to="/saved" className={navClass}>
                Saved
              </NavLink>
              <NavLink to="/profile" className={navClass}>
                Profile
              </NavLink>
            </>
          )}
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={navClass}>
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          {user ? (
            <>
              <span className="hidden text-slate-300 sm:inline">{user.name}</span>
              <button
                onClick={logout}
                className="rounded-full border border-mist px-3 py-1.5 text-slate-200 transition hover:border-gold hover:text-paper"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="rounded-full border border-mist px-3 py-1.5 text-slate-200 transition hover:border-gold hover:text-paper"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

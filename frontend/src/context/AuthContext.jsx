import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('thoughtnest_token'));
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('thoughtnest_user');
    return raw ? JSON.parse(raw) : null;
  });

  const saveSession = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('thoughtnest_token', nextToken);
    localStorage.setItem('thoughtnest_user', JSON.stringify(nextUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('thoughtnest_token');
    localStorage.removeItem('thoughtnest_user');
  };

  const refreshProfile = async () => {
    if (!token) return;
    const { data } = await api.get('/users/me');
    setUser(data.user);
    localStorage.setItem('thoughtnest_user', JSON.stringify(data.user));
  };

  useEffect(() => {
    if (!token) return;
    refreshProfile().catch(() => logout());
  }, [token]);

  const value = useMemo(() => ({ token, user, saveSession, logout, refreshProfile }), [token, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

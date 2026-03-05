import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { saveSession } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/signup';
      const payload = isLogin ? { email: form.email, password: form.password } : form;
      const { data } = await api.post(endpoint, payload);
      saveSession(data.token, data.user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-mist bg-slate/80 p-8">
      <h1 className="font-display text-5xl text-paper">{isLogin ? 'Welcome Back' : 'Join ThoughtNest'}</h1>
      <p className="mt-2 text-slate-300">Read deeply. Write honestly.</p>

      <form className="mt-6 space-y-4" onSubmit={submit}>
        {!isLogin && (
          <input
            className="input-dark"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
          />
        )}
        <input
          className="input-dark"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
        />
        <input
          className="input-dark"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          required
        />
        {error && <p className="text-sm text-rose-300">{error}</p>}

        <button className="w-full rounded-xl bg-gold px-4 py-3 font-semibold text-ink">
          {isLogin ? 'Login' : 'Create account'}
        </button>
      </form>

      <button className="mt-4 text-sm text-slate-300 underline" onClick={() => setIsLogin((v) => !v)}>
        {isLogin ? 'Need an account? Sign up' : 'Already registered? Login'}
      </button>
    </div>
  );
}

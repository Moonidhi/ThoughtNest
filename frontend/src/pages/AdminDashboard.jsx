import { useEffect, useState } from 'react';
import api from '../api/client';

export default function AdminDashboard() {
  const [pending, setPending] = useState([]);
  const [reports, setReports] = useState([]);
  const [highlights, setHighlights] = useState({ thoughtOfDay: '', poemOfDay: '', weeklyChallenge: '' });
  const [featureWriterId, setFeatureWriterId] = useState('');

  const load = async () => {
    const [pendingRes, reportsRes, homeRes] = await Promise.all([
      api.get('/admin/pending-posts'),
      api.get('/admin/reports'),
      api.get('/posts/home')
    ]);
    setPending(pendingRes.data);
    setReports(reportsRes.data);
    setHighlights({
      thoughtOfDay: homeRes.data.thoughtOfDay,
      poemOfDay: homeRes.data.poemOfDay,
      weeklyChallenge: homeRes.data.weeklyChallenge
    });
  };

  useEffect(() => {
    load();
  }, []);

  const moderate = async (id, action) => {
    if (action === 'approve') await api.post(`/admin/posts/${id}/approve`);
    if (action === 'reject') await api.post(`/admin/posts/${id}/reject`, { reason: 'Needs revision' });
    if (action === 'delete') await api.delete(`/admin/posts/${id}`);
    if (action === 'feature') await api.post(`/admin/posts/${id}/feature`, { featured: true });
    await load();
  };

  return (
    <div className="space-y-8">
      <h1 className="font-display text-5xl text-paper">Admin Dashboard</h1>

      <section className="rounded-2xl border border-mist bg-slate/70 p-6">
        <h2 className="font-display text-4xl text-paper">Pending Review</h2>
        <div className="mt-4 space-y-3">
          {pending.map((post) => (
            <div key={post._id} className="rounded-xl border border-mist p-3">
              <p className="font-serif text-2xl text-slate-100">{post.title}</p>
              <p className="text-sm text-slate-300">By {post.author.name} ({post.type})</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => moderate(post._id, 'approve')} className="rounded-full bg-sage px-4 py-1.5 text-sm text-ink">Approve</button>
                <button onClick={() => moderate(post._id, 'reject')} className="rounded-full bg-amber-600 px-4 py-1.5 text-sm text-ink">Reject</button>
                <button onClick={() => moderate(post._id, 'delete')} className="rounded-full bg-rose-700 px-4 py-1.5 text-sm text-white">Delete</button>
                <button onClick={() => moderate(post._id, 'feature')} className="rounded-full border border-mist px-4 py-1.5 text-sm text-slate-200">Feature Article</button>
              </div>
            </div>
          ))}
          {!pending.length && <p className="text-slate-400">No pending submissions.</p>}
        </div>
      </section>

      <section className="rounded-2xl border border-mist bg-slate/70 p-6">
        <h2 className="font-display text-4xl text-paper">Reported Content</h2>
        <div className="mt-4 space-y-3">
          {reports.map((report) => (
            <div key={report._id} className="rounded-xl border border-mist p-3">
              <p className="text-slate-100">{report.post?.title}</p>
              <p className="text-sm text-slate-300">Reason: {report.reason}</p>
              <button onClick={() => api.post(`/admin/reports/${report._id}/reviewed`).then(load)} className="mt-2 rounded-full border border-mist px-4 py-1.5 text-sm text-slate-200">
                Mark reviewed
              </button>
            </div>
          ))}
          {!reports.length && <p className="text-slate-400">No open reports.</p>}
        </div>
      </section>

      <section className="rounded-2xl border border-mist bg-slate/70 p-6">
        <h2 className="font-display text-4xl text-paper">Home Highlights</h2>
        <div className="mt-4 space-y-3">
          <textarea className="input-dark min-h-16" value={highlights.thoughtOfDay} onChange={(e) => setHighlights((h) => ({ ...h, thoughtOfDay: e.target.value }))} />
          <textarea className="input-dark min-h-20" value={highlights.poemOfDay} onChange={(e) => setHighlights((h) => ({ ...h, poemOfDay: e.target.value }))} />
          <textarea className="input-dark min-h-16" value={highlights.weeklyChallenge} onChange={(e) => setHighlights((h) => ({ ...h, weeklyChallenge: e.target.value }))} />
          <button onClick={() => api.put('/admin/highlights', highlights)} className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink">
            Update highlights
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-mist bg-slate/70 p-6">
        <h2 className="font-display text-4xl text-paper">Feature Writer</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <input className="input-dark max-w-md" placeholder="Writer user ID" value={featureWriterId} onChange={(e) => setFeatureWriterId(e.target.value)} />
          <button onClick={() => api.post('/admin/featured-writer', { userId: featureWriterId })} className="rounded-full bg-gold px-4 py-2 text-sm font-semibold text-ink">
            Set Featured Writer
          </button>
        </div>
      </section>
    </div>
  );
}

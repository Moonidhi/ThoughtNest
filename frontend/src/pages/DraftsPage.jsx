import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/client';

export default function DraftsPage() {
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    api.get('/posts/me/drafts').then(({ data }) => setDrafts(data));
  }, []);

  return (
    <div>
      <h1 className="mb-6 font-display text-5xl text-paper">Drafts & Pending Posts</h1>
      <div className="space-y-3">
        {drafts.map((draft) => (
          <div key={draft._id} className="rounded-2xl border border-mist bg-slate/70 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-serif text-2xl text-slate-100">{draft.title}</p>
                <p className="text-sm text-slate-400">
                  {draft.type} • {draft.status}
                  {draft.rejectionReason ? ` • ${draft.rejectionReason}` : ''}
                </p>
              </div>
              <Link to={`/write?edit=${draft._id}`} className="rounded-full border border-mist px-4 py-1.5 text-sm text-slate-200 hover:border-gold">
                Edit
              </Link>
            </div>
          </div>
        ))}
        {!drafts.length && <p className="text-slate-400">No drafts yet.</p>}
      </div>
    </div>
  );
}

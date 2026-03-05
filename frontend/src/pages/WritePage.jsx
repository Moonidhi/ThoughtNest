import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/client';

const categories = ['Technology', 'Life', 'Philosophy', 'Poetry', 'Personal Stories'];

const emptyForm = {
  title: '',
  content: '',
  type: 'article',
  category: 'Life',
  tags: ''
};

export default function WritePage() {
  const [form, setForm] = useState(emptyForm);
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');
  const navigate = useNavigate();

  useEffect(() => {
    if (!editId) return;
    api.get(`/posts/${editId}`).then(({ data }) => {
      setForm({
        title: data.title,
        content: data.content,
        type: data.type,
        category: data.category,
        tags: (data.tags || []).join(', ')
      });
    });
  }, [editId]);

  const payload = {
    ...form,
    tags: form.tags
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)
  };

  const saveDraft = async () => {
    if (editId) await api.put(`/posts/${editId}`, { ...payload, status: 'draft' });
    else await api.post('/posts', { ...payload, saveAsDraft: true });
    navigate('/drafts');
  };

  const submitForReview = async () => {
    if (editId) {
      await api.put(`/posts/${editId}`, payload);
      await api.post(`/posts/${editId}/submit`);
    } else {
      await api.post('/posts', { ...payload, saveAsDraft: false });
    }
    navigate('/drafts');
  };

  return (
    <div className="space-y-6">
      <h1 className="font-display text-5xl text-paper">Write in ThoughtNest</h1>

      <section className="paper-card paper-texture p-6 text-slate-900">
        <div className="space-y-4">
          <input
            className="w-full border-none bg-transparent font-display text-5xl text-stone-800 outline-none"
            placeholder="Give your piece a title"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          />

          <div className="grid gap-3 md:grid-cols-3">
            <select className="rounded-xl border border-stone-300 bg-white/80 px-3 py-2" value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}>
              <option value="article">Article</option>
              <option value="substack">Substack-style Post</option>
              <option value="poem">Poem</option>
            </select>
            <select className="rounded-xl border border-stone-300 bg-white/80 px-3 py-2" value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <input
              className="rounded-xl border border-stone-300 bg-white/80 px-3 py-2"
              placeholder="tags: writing, life"
              value={form.tags}
              onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            />
          </div>

          <textarea
            className="min-h-[420px] w-full rounded-xl border border-stone-300 bg-white/75 p-4 font-serif text-lg leading-8 outline-none"
            placeholder="Start writing your story..."
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
          />
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <button onClick={saveDraft} className="rounded-full border border-mist px-5 py-2 text-slate-200 hover:border-gold hover:text-paper">
          Save Draft
        </button>
        <button onClick={submitForReview} className="rounded-full bg-gold px-5 py-2 font-semibold text-ink">
          Submit for Review
        </button>
      </div>
    </div>
  );
}

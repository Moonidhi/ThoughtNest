import { useEffect, useState } from 'react';
import api from '../api/client';
import PostCard from '../components/PostCard';

const categories = ['Technology', 'Life', 'Philosophy', 'Poetry', 'Personal Stories'];

export default function DiscoverPage() {
  const [filters, setFilters] = useState({ q: '', category: '', tag: '' });
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const params = Object.fromEntries(Object.entries(filters).filter(([, v]) => v));
    const { data } = await api.get('/posts', { params });
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="font-display text-5xl text-paper">Search & Discovery</h1>

      <div className="grid gap-3 rounded-2xl border border-mist bg-slate/70 p-4 md:grid-cols-4">
        <input
          className="input-dark md:col-span-2"
          placeholder="Search by title, author, tags"
          value={filters.q}
          onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
        />
        <select
          className="input-dark"
          value={filters.category}
          onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <input
          className="input-dark"
          placeholder="Tag"
          value={filters.tag}
          onChange={(e) => setFilters((f) => ({ ...f, tag: e.target.value }))}
        />
      </div>

      <button
        onClick={fetchPosts}
        className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink transition hover:brightness-110"
      >
        Search
      </button>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

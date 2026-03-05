import { useEffect, useState } from 'react';
import api from '../api/client';
import PostCard from '../components/PostCard';

export default function HomePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/posts/home').then((res) => setData(res.data));
  }, []);

  if (!data) return <p className="text-slate-300">Loading home feed...</p>;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-mist bg-slate/70 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Thought of the Day</p>
          <p className="mt-3 font-serif text-2xl text-paper">{data.thoughtOfDay}</p>
        </div>
        <div className="rounded-2xl border border-mist bg-slate/70 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Poem of the Day</p>
          <p className="mt-3 whitespace-pre-wrap font-serif text-2xl text-paper">{data.poemOfDay}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-mist bg-slate/70 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Weekly Writing Challenge</p>
        <p className="mt-2 font-serif text-xl text-slate-100">{data.weeklyChallenge}</p>
      </section>

      {data.featuredWriter && (
        <section className="rounded-2xl border border-mist bg-slate/70 p-6">
          <p className="text-xs uppercase tracking-[0.22em] text-gold">Featured Writer of the Week</p>
          <div className="mt-3 flex items-center gap-4">
            <img src={data.featuredWriter.profilePicture} alt={data.featuredWriter.name} className="h-14 w-14 rounded-full object-cover" />
            <div>
              <p className="font-display text-3xl text-paper">{data.featuredWriter.name}</p>
              <p className="text-slate-300">{data.featuredWriter.bio || 'A storyteller shaping thoughtful conversations.'}</p>
            </div>
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 font-display text-4xl text-paper">Trending Articles</h2>
        <div className="grid gap-4 md:grid-cols-2">{data.trending.map((p) => <PostCard key={p._id} post={p} />)}</div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-4xl text-paper">Latest Posts</h2>
        <div className="grid gap-4 md:grid-cols-2">{data.latest.map((p) => <PostCard key={p._id} post={p} />)}</div>
      </section>

      <section className="rounded-2xl border border-mist bg-slate/70 p-6">
        <p className="text-xs uppercase tracking-[0.22em] text-gold">Categories</p>
        <div className="mt-3 flex flex-wrap gap-3">
          {data.categories.map((cat) => (
            <span key={cat} className="tag-pill">
              {cat}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

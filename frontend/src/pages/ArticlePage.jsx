import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/client';
import { useAuth } from '../context/AuthContext';

const reactionLabels = {
  insightful: 'Insightful',
  loved_it: 'Loved it',
  powerful: 'Powerful'
};

export default function ArticlePage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [reportReason, setReportReason] = useState('spam');

  const load = async () => {
    const { data } = await api.get(`/posts/${id}`);
    setPost(data);
  };

  useEffect(() => {
    load();
  }, [id]);

  const action = async (path, body = {}) => {
    const { data } = await api.post(path, body);
    if (data._id || data.likeCount !== undefined) setPost(data);
  };

  if (!post) return <p className="text-slate-300">Loading post...</p>;

  return (
    <article className="space-y-6">
      <header className="paper-card paper-texture p-8 text-slate-900">
        <p className="text-xs uppercase tracking-[0.2em] text-stone-600">{post.category}</p>
        <h1 className="mt-2 font-display text-6xl leading-tight text-stone-800">{post.title}</h1>
        <p className="mt-3 text-stone-700">
          By {post.author.name} • {post.readingTime} min read
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags?.map((tag) => (
            <span key={tag} className="rounded-full bg-stone-900/5 px-2.5 py-1 text-xs text-stone-700">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <section className="paper-card paper-texture p-8 font-serif text-lg leading-8 text-stone-800 whitespace-pre-wrap">
        {post.content}
      </section>

      <section className="rounded-2xl border border-mist bg-slate/70 p-6">
        <div className="flex flex-wrap gap-3">
          <button
            disabled={!user}
            onClick={() => action(`/posts/${id}/like`)}
            className="rounded-full border border-mist px-4 py-2 text-sm text-slate-200 enabled:hover:border-gold"
          >
            {post.isLiked ? 'Unlike' : 'Like'} ({post.likeCount})
          </button>
          <button
            disabled={!user}
            onClick={() => action(`/posts/${id}/save`)}
            className="rounded-full border border-mist px-4 py-2 text-sm text-slate-200 enabled:hover:border-gold"
          >
            {post.isSaved ? 'Unsave' : 'Save'} ({post.saveCount})
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {Object.entries(reactionLabels).map(([type, label]) => (
            <button
              key={type}
              disabled={!user}
              onClick={() => action(`/posts/${id}/reaction`, { type })}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                post.userReaction === type ? 'bg-gold text-ink' : 'border border-mist text-slate-200 hover:border-gold'
              }`}
            >
              {label} ({post.reactionStats?.[type] || 0})
            </button>
          ))}
        </div>

        {user && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <select className="input-dark max-w-44" value={reportReason} onChange={(e) => setReportReason(e.target.value)}>
              <option value="spam">Spam</option>
              <option value="plagiarism">Plagiarism</option>
              <option value="offensive">Offensive content</option>
            </select>
            <button
              onClick={() => action(`/posts/${id}/report`, { reason: reportReason })}
              className="rounded-full border border-rose-300/30 px-4 py-2 text-sm text-rose-200 hover:border-rose-300"
            >
              Report post
            </button>
          </div>
        )}
      </section>
    </article>
  );
}

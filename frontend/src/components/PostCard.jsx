import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <article className="paper-card paper-texture group p-5 text-slate-900 transition duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <p className="mb-2 text-xs uppercase tracking-[0.2em] text-stone-600">{post.type}</p>
      <Link to={`/posts/${post._id}`} className="font-display text-3xl leading-tight text-stone-800">
        {post.title}
      </Link>
      <p className="mt-2 text-sm text-stone-700">
        By {post.author?.name} • {post.readingTime} min read
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(post.tags || []).slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-stone-900/5 px-2.5 py-1 text-xs text-stone-700">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}

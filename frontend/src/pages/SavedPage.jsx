import { useEffect, useState } from 'react';
import api from '../api/client';
import PostCard from '../components/PostCard';

export default function SavedPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get('/posts/me/saved').then(({ data }) => setPosts(data));
  }, []);

  return (
    <div>
      <h1 className="mb-6 font-display text-5xl text-paper">Saved Posts</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
        {!posts.length && <p className="text-slate-400">No saved posts yet.</p>}
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import api from '../api/client';
import PostCard from '../components/PostCard';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({ name: '', bio: '', profilePicture: '' });

  const load = async () => {
    const { data } = await api.get('/users/me');
    setProfile(data);
    setForm({
      name: data.user.name,
      bio: data.user.bio || '',
      profilePicture: data.user.profilePicture || ''
    });
  };

  useEffect(() => {
    load();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await api.put('/users/me', form);
    await load();
  };

  if (!profile) return <p className="text-slate-300">Loading profile...</p>;

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-mist bg-slate/70 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <img src={profile.user.profilePicture} alt={profile.user.name} className="h-20 w-20 rounded-full object-cover" />
          <div>
            <h1 className="font-display text-5xl text-paper">{profile.user.name}</h1>
            <p className="text-slate-300">{profile.user.email}</p>
            <p className="mt-1 text-sm text-slate-400">
              {profile.stats.publishedCount} published • {profile.stats.draftCount} drafts
            </p>
          </div>
        </div>
      </section>

      <form className="rounded-2xl border border-mist bg-slate/70 p-6" onSubmit={save}>
        <h2 className="font-display text-4xl text-paper">Edit Profile</h2>
        <div className="mt-4 space-y-3">
          <input className="input-dark" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
          <input
            className="input-dark"
            value={form.profilePicture}
            placeholder="Profile image URL"
            onChange={(e) => setForm((f) => ({ ...f, profilePicture: e.target.value }))}
          />
          <textarea className="input-dark min-h-28" value={form.bio} onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))} />
          <button className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-ink">Save changes</button>
        </div>
      </form>

      <section>
        <h2 className="mb-4 font-display text-4xl text-paper">Saved Posts</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {(profile.user.savedPosts || []).map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

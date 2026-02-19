import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAbstracts } from "../data/abstracts";
import { loadSavedIds, toggleSavedId } from "../utils/storage";

const Saved = () => {
  const [savedIds, setSavedIds] = useState(loadSavedIds());
  const navigate = useNavigate();

  const savedAbstracts = useMemo(() => {
    const all = getAllAbstracts();
    return all.filter((item) => savedIds.includes(item.id));
  }, [savedIds]);

  const handleOpen = (id) => {
    navigate(`/read/${id}`);
  };

  const handleRemove = (id, event) => {
    event.stopPropagation();
    const next = toggleSavedId(id);
    setSavedIds(next);
  };

  return (
    <section className="min-h-[calc(100vh-72px)] bg-ink px-6 py-12 text-parchment">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">Library</p>
            <h1 className="mt-3 font-serif text-4xl">Saved Abstracts</h1>
          </div>
          <span className="text-sm uppercase tracking-[0.2em] text-muted">
            {savedAbstracts.length} items
          </span>
        </div>

        {savedAbstracts.length === 0 ? (
          <div className="glass-panel rounded-3xl p-10 text-center text-muted">
            Your saved shelf is empty. Double tap an abstract to begin.
          </div>
        ) : (
          <div className="grid gap-6">
            {savedAbstracts.map((abstract) => (
              <article
                key={abstract.id}
                className="glass-panel cursor-pointer rounded-3xl p-8 transition-transform duration-300 hover:-translate-y-1"
                onClick={() => handleOpen(abstract.id)}
              >
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-muted">
                  <span className="rounded-full border border-[rgba(232,230,227,0.2)] px-3 py-1">
                    {abstract.category}
                  </span>
                  <span>{abstract.readingTime} min read</span>
                </div>
                <h2 className="mb-3 font-serif text-2xl text-parchment">
                  {abstract.title}
                </h2>
                <p className="mb-6 text-sm text-muted">
                  {abstract.content.slice(0, 180)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted">
                    {abstract.author}
                  </span>
                  <button
                    type="button"
                    onClick={(event) => handleRemove(abstract.id, event)}
                    className="text-xs uppercase tracking-[0.2em] text-muted transition-colors duration-300 hover:text-parchment"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Saved;

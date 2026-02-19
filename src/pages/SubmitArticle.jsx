import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SparkLayer from "../components/SparkLayer";
import { addUserArticle } from "../utils/storage";

const categories = [
  "Philosophy",
  "Literature",
  "Culture",
  "Essays",
  "Rhetoric",
  "Craft",
  "Longform"
];

const estimateReadingTime = (text) => {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

const SubmitArticle = () => {
  const navigate = useNavigate();
  const [sparks, setSparks] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: categories[0],
    content: ""
  });

  const readingTime = useMemo(
    () => estimateReadingTime(form.content || ""),
    [form.content]
  );

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const triggerSpark = () => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const burst = Array.from({ length: 5 }).map(() => ({
      id: `${Date.now()}-${Math.random()}`,
      x: centerX + (Math.random() * 24 - 12),
      y: centerY + (Math.random() * 24 - 12)
    }));
    setSparks(burst);
    window.setTimeout(() => setSparks([]), 800);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.title.trim() || !form.content.trim()) return;

    const newArticle = {
      id: `user-${Date.now()}`,
      title: form.title.trim(),
      content: form.content.trim(),
      author: "You",
      category: form.category,
      readingTime
    };

    addUserArticle(newArticle);
    triggerSpark();
    window.setTimeout(() => {
      navigate("/", { state: { refresh: Date.now() } });
    }, 260);
  };

  return (
    <section className="relative min-h-[calc(100vh-72px)] bg-ink px-6 py-12 text-parchment">
      <SparkLayer sparks={sparks} />
      <div className="mx-auto w-full max-w-3xl">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-muted">Submit</p>
          <h1 className="mt-3 font-serif text-4xl">Submit Article</h1>
        </div>

        <form
          className="glass-panel grid gap-6 rounded-3xl p-8 sm:p-10"
          onSubmit={handleSubmit}
        >
          <label className="text-xs uppercase tracking-[0.2em] text-muted">
            Title
            <input
              value={form.title}
              onChange={handleChange("title")}
              placeholder="A title that feels like a book spine"
              className="mt-3 w-full rounded-2xl border border-line-muted bg-panel px-4 py-3 text-sm text-parchment"
            />
          </label>

          <label className="text-xs uppercase tracking-[0.2em] text-muted">
            Category
            <select
              value={form.category}
              onChange={handleChange("category")}
              className="mt-3 w-full rounded-2xl border border-line-muted bg-panel px-4 py-3 text-sm text-parchment"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="text-xs uppercase tracking-[0.2em] text-muted">
            Content
            <textarea
              value={form.content}
              onChange={handleChange("content")}
              placeholder="Write as if the reader is under a warm desk lamp."
              className="mt-3 min-h-[220px] w-full rounded-2xl border border-line-muted bg-panel px-4 py-3 text-sm text-parchment"
            />
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.3em] text-muted">
            <span>{readingTime} min read</span>
            <button
              type="submit"
              className="rounded-full border border-line-muted bg-[rgba(184,156,93,0.15)] px-6 py-3 text-xs uppercase tracking-[0.3em] text-parchment transition-colors duration-300 hover:bg-[rgba(184,156,93,0.25)]"
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SubmitArticle;

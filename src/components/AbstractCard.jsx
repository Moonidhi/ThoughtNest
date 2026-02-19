import React from "react";

const AbstractCard = ({ abstract, isActive, onDoubleTap }) => {
  return (
    <article
      className={`relative mx-auto flex min-h-[100vh] w-full snap-center flex-col items-center justify-center px-6 py-16 transition-opacity duration-500 sm:px-12 lg:px-24 ${
        isActive ? "opacity-100" : "opacity-70"
      }`}
      onDoubleClick={onDoubleTap}
    >
      <div className="glass-panel soft-gradient fade-in w-full max-w-3xl rounded-[32px] p-10 text-left shadow-soft sm:p-14 lg:-translate-x-6">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
          <span className="rounded-full border border-line-muted px-4 py-1 text-gold">
            {abstract.category}
          </span>
          <span className="text-muted">{abstract.readingTime} min read</span>
        </div>
        <h2 className="book-text mb-6 font-serif text-3xl font-semibold leading-tight text-parchment sm:text-4xl">
          {abstract.title}
        </h2>
        <p className="book-text font-serif text-xl leading-relaxed text-parchment sm:text-2xl">
          {abstract.content}
        </p>
        <p className="mt-8 text-sm uppercase tracking-[0.2em] text-muted">
          {abstract.author}
        </p>
      </div>
    </article>
  );
};

export default AbstractCard;

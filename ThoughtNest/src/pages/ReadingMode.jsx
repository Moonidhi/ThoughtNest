import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AbstractCard from "../components/AbstractCard";
import HeartButton from "../components/HeartButton";
import abstracts from "../data/abstracts";
import { loadSavedIds, toggleSavedId } from "../utils/storage";

const ReadingMode = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState(loadSavedIds());
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const targetIndex = useMemo(
    () => Math.max(0, abstracts.findIndex((item) => item.id === id)),
    [id]
  );

  useEffect(() => {
    setActiveIndex(targetIndex);
  }, [targetIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    window.setTimeout(() => {
      container.scrollTo({ top: targetIndex * window.innerHeight, behavior: "smooth" });
    }, 120);
  }, [targetIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const nextIndex = Math.round(container.scrollTop / window.innerHeight);
        setActiveIndex(Math.min(abstracts.length - 1, Math.max(0, nextIndex)));
        ticking = false;
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = (targetId) => {
    const next = toggleSavedId(targetId);
    setSavedIds(next);
  };

  return (
    <section className="relative h-screen overflow-hidden bg-ink text-parchment">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="absolute left-6 top-6 z-20 text-xs uppercase tracking-[0.3em] text-muted"
      >
        Back
      </button>
      <div
        ref={containerRef}
        className="relative h-full overflow-y-scroll scroll-smooth snap-y-mandatory"
      >
        {abstracts.map((abstract, index) => (
          <div key={abstract.id} className="relative">
            <AbstractCard
              abstract={abstract}
              isActive={index === activeIndex}
              onDoubleTap={() => handleToggle(abstract.id)}
            />
            <div className="pointer-events-none absolute bottom-10 right-10">
              <div className="pointer-events-auto">
                <HeartButton
                  isActive={savedIds.includes(abstract.id)}
                  onToggle={() => handleToggle(abstract.id)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReadingMode;

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import AbstractCard from "../components/AbstractCard";
import HeartButton from "../components/HeartButton";
import { getAllAbstracts } from "../data/abstracts";
import SparkLayer from "../components/SparkLayer";
import { loadSavedIds, toggleSavedId } from "../utils/storage";
import { createReadingTracker } from "../utils/readingTracker";

const gradients = [
  "radial-gradient(circle at 20% 20%, rgba(58, 31, 43, 0.32), transparent 55%), radial-gradient(circle at 75% 25%, rgba(27, 36, 48, 0.4), transparent 60%), #161412",
  "radial-gradient(circle at 80% 15%, rgba(28, 42, 36, 0.32), transparent 55%), radial-gradient(circle at 25% 80%, rgba(58, 31, 43, 0.28), transparent 60%), #161412",
  "radial-gradient(circle at 30% 30%, rgba(27, 36, 48, 0.4), transparent 60%), radial-gradient(circle at 70% 80%, rgba(28, 42, 36, 0.28), transparent 65%), #161412",
  "radial-gradient(circle at 15% 70%, rgba(58, 31, 43, 0.28), transparent 60%), radial-gradient(circle at 85% 30%, rgba(27, 36, 48, 0.38), transparent 60%), #161412"
];

const Home = ({ onTotalSecondsChange }) => {
  const [savedIds, setSavedIds] = useState(loadSavedIds());
  const [abstracts, setAbstracts] = useState(getAllAbstracts());
  const [activeIndex, setActiveIndex] = useState(0);
  const [sparks, setSparks] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);
  const trackerRef = useRef(null);

  const handleToggle = (id) => {
    const next = toggleSavedId(id);
    setSavedIds(next);
  };

  const createSparkAt = (x, y) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const safeX = Math.max(0, Math.min(rect.width, x));
    const safeY = Math.max(0, Math.min(rect.height, y));
    const burst = Array.from({ length: 5 }).map(() => ({
      id: `${Date.now()}-${Math.random()}`,
      x: safeX + (Math.random() * 24 - 12),
      y: safeY + (Math.random() * 24 - 12)
    }));
    const ids = burst.map((spark) => spark.id);
    setSparks((prev) => [...prev, ...burst]);
    window.setTimeout(() => {
      setSparks((prev) => prev.filter((spark) => !ids.includes(spark.id)));
    }, 800);
  };

  const handleSpark = (event) => {
    if (!containerRef.current || !event) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    createSparkAt(x, y);
  };

  const handleOpen = (id) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      createSparkAt(rect.width / 2, rect.height / 2);
    }
    window.setTimeout(() => navigate(`/read/${id}`), 120);
  };

  const handleDoubleTap = (id) => (event) => {
    handleToggle(id);
    handleSpark(event);
  };

  useEffect(() => {
    trackerRef.current = createReadingTracker({
      onTick: (seconds) => onTotalSecondsChange(seconds)
    });
    trackerRef.current.sync();
    trackerRef.current.start();

    const handleVisibility = () => {
      if (document.hidden) {
        trackerRef.current.stop();
      } else {
        trackerRef.current.start();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      trackerRef.current?.stop();
    };
  }, [onTotalSecondsChange]);

  useEffect(() => {
    setAbstracts(getAllAbstracts());
  }, [location.state?.refresh]);

  useEffect(() => {
    const id = searchParams.get("id");
    if (!id) return;
    const index = abstracts.findIndex((item) => item.id === id);
    if (index === -1) return;
    const container = containerRef.current;
    if (!container) return;
    window.setTimeout(() => {
      container.scrollTo({ top: index * window.innerHeight, behavior: "smooth" });
    }, 120);
  }, [searchParams]);

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

  const backgroundStyle = useMemo(() => {
    const gradient = gradients[activeIndex % gradients.length];
    return { background: gradient, transition: "background 0.8s ease" };
  }, [activeIndex]);

  return (
    <section className="relative h-[calc(100vh-72px)] overflow-hidden" style={backgroundStyle}>
      <div
        ref={containerRef}
        className="relative h-full overflow-y-scroll scroll-smooth snap-y-mandatory"
      >
        <SparkLayer sparks={sparks} />

        {abstracts.map((abstract, index) => (
          <div key={abstract.id} className="relative">
            <div onClick={() => handleOpen(abstract.id)}>
              <AbstractCard
                abstract={abstract}
                isActive={index === activeIndex}
                onDoubleTap={handleDoubleTap(abstract.id)}
              />
            </div>
            <div className="pointer-events-none absolute bottom-10 right-10">
              <div className="pointer-events-auto">
                <HeartButton
                  isActive={savedIds.includes(abstract.id)}
                  onToggle={() => handleToggle(abstract.id)}
                  onSpark={handleSpark}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;

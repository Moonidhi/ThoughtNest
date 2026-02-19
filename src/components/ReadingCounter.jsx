import React, { useEffect, useRef, useState } from "react";

const ReadingCounter = ({ totalSeconds }) => {
  const [displayMinutes, setDisplayMinutes] = useState(0);
  const previousMinutes = useRef(0);

  useEffect(() => {
    const targetMinutes = Math.floor(totalSeconds / 60);
    const startMinutes = previousMinutes.current;
    const diff = targetMinutes - startMinutes;
    if (diff === 0) return;

    const start = performance.now();
    const duration = 500;

    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const nextValue = Math.round(startMinutes + diff * progress);
      setDisplayMinutes(nextValue);
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        previousMinutes.current = targetMinutes;
      }
    };

    requestAnimationFrame(step);
  }, [totalSeconds]);

  useEffect(() => {
    setDisplayMinutes(Math.floor(totalSeconds / 60));
    previousMinutes.current = Math.floor(totalSeconds / 60);
  }, []);

  return (
    <div className="rounded-full border border-[rgba(232,230,227,0.15)] bg-[rgba(18,18,18,0.7)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-parchment">
      {displayMinutes} min read
    </div>
  );
};

export default ReadingCounter;

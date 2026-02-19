import { loadReadSeconds, saveReadSeconds } from "./storage";

export const createReadingTracker = ({ onTick }) => {
  let totalSeconds = loadReadSeconds();
  let intervalId = null;
  let lastTick = Date.now();

  const notify = () => {
    if (onTick) {
      onTick(totalSeconds);
    }
  };

  const start = () => {
    if (intervalId) return;
    lastTick = Date.now();
    intervalId = window.setInterval(() => {
      const now = Date.now();
      const deltaSeconds = Math.max(0, Math.round((now - lastTick) / 1000));
      lastTick = now;
      totalSeconds += deltaSeconds;
      saveReadSeconds(totalSeconds);
      notify();
    }, 1000);
  };

  const stop = () => {
    if (!intervalId) return;
    window.clearInterval(intervalId);
    intervalId = null;
    lastTick = Date.now();
  };

  const getTotalSeconds = () => totalSeconds;

  const sync = () => {
    totalSeconds = loadReadSeconds();
    notify();
  };

  return { start, stop, getTotalSeconds, sync };
};

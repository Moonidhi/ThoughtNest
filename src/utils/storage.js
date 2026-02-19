const SAVED_KEY = "thoughtnest_saved";
const READ_KEY = "thoughtnest_read_seconds";
const ARTICLE_KEY = "thoughtnest_user_articles";

export const loadSavedIds = () => {
  try {
    const raw = localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

export const saveSavedIds = (ids) => {
  localStorage.setItem(SAVED_KEY, JSON.stringify(ids));
};

export const toggleSavedId = (id) => {
  const current = new Set(loadSavedIds());
  if (current.has(id)) {
    current.delete(id);
  } else {
    current.add(id);
  }
  const next = Array.from(current);
  saveSavedIds(next);
  return next;
};

export const loadReadSeconds = () => {
  const raw = localStorage.getItem(READ_KEY);
  const parsed = raw ? Number(raw) : 0;
  return Number.isFinite(parsed) ? parsed : 0;
};

export const saveReadSeconds = (seconds) => {
  localStorage.setItem(READ_KEY, String(seconds));
};

export const loadUserArticles = () => {
  try {
    const raw = localStorage.getItem(ARTICLE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    return [];
  }
};

export const saveUserArticles = (articles) => {
  localStorage.setItem(ARTICLE_KEY, JSON.stringify(articles));
};

export const addUserArticle = (article) => {
  const current = loadUserArticles();
  const next = [article, ...current];
  saveUserArticles(next);
  return next;
};

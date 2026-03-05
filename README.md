# ThoughtNest

ThoughtNest is a modern full-stack community writing platform for articles, Substack-style posts, and poems with an admin-first moderation workflow.

## Stack

- Frontend: React + Tailwind CSS + React Router + Axios
- Backend: Node.js + Express + MongoDB + JWT
- Auth: JWT-based login/signup

## Project Structure

- `backend/` Express API with MongoDB models and moderation logic
- `frontend/` React app with dark paper-like reading UI

## Features Implemented

- Dark aesthetic journal-style UI with paper reading cards
- Home page: thought/poem of the day, weekly challenge, trending, featured writer, latest posts, categories
- Auth: signup/login
- Profile: bio + profile picture + stats + saved posts
- Writing system: article/substack/poem editor, tags, category, save draft, submit for review
- Draft system: edit drafts/pending/rejected posts
- Publishing flow: user submit -> admin approve/reject
- Reading page: reading time, tags, like, save/bookmark, reactions
- Save system: saved posts listing
- Search/discovery: title/author/tags/categories
- Admin dashboard: pending review, approve/reject/delete, feature article, feature writer, update highlights, reports moderation
- Report system: spam/plagiarism/offensive reports to admin

## Backend Setup

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

API runs by default at `http://localhost:5000`.

## Frontend Setup

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend runs by default at `http://localhost:5173`.

## Seed/Admin Note

Initial users are created with role `user`. To test admin pages, promote a user in MongoDB:

```js
// in mongo shell
use thoughtnest
db.users.updateOne({ email: "admin@example.com" }, { $set: { role: "admin" } })
```

Or use the script:

```bash
cd backend
npm run admin:promote -- admin@example.com
```

## Production Checklist

1. Backend environment:
   - Copy `backend/.env.production.example` to your platform env settings.
   - Set `CLIENT_URL` to your frontend domain (or comma-separated domains).
2. Frontend environment:
   - Set `VITE_API_URL` from `frontend/.env.production.example`.
3. Validate backend env:

```bash
cd backend
npm run check:env
```

4. Validate frontend env:

```bash
cd frontend
npm run check:env
```

5. Promote an admin user:

```bash
cd backend
npm run admin:promote -- <your-admin-email>
```

6. Smoke test after deploy:
   - Signup/Login
   - Create draft
   - Submit for review
   - Admin approve
   - Read published post
   - Like/Save/React/Report

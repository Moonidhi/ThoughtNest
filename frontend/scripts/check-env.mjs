import fs from 'node:fs';
import path from 'node:path';

const envPath = path.resolve('.env');
if (!fs.existsSync(envPath)) {
  console.error('frontend/.env not found. Create it from .env.example or platform env settings.');
  process.exit(1);
}

const content = fs.readFileSync(envPath, 'utf8');
const hasApi = content
  .split(/\r?\n/)
  .some((line) => line.trim().startsWith('VITE_API_URL=') && line.trim().length > 'VITE_API_URL='.length);

if (!hasApi) {
  console.error('Missing VITE_API_URL in frontend/.env');
  process.exit(1);
}

console.log('Frontend environment check passed.');

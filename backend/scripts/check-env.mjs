import 'dotenv/config';

const required = ['MONGO_URI', 'JWT_SECRET', 'JWT_EXPIRES_IN', 'CLIENT_URL', 'PORT'];

const missing = required.filter((key) => {
  const value = process.env[key];
  return !value || String(value).trim() === '';
});

if (missing.length > 0) {
  console.error('Missing required backend environment variables:');
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

console.log('Backend environment check passed.');

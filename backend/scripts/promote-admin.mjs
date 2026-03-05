import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/User.js';

const email = process.argv[2];

if (!email) {
  console.error('Usage: npm run admin:promote -- <email>');
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error('MONGO_URI is required in backend/.env');
  process.exit(1);
}

await mongoose.connect(process.env.MONGO_URI);

const user = await User.findOneAndUpdate(
  { email: email.toLowerCase() },
  { $set: { role: 'admin' } },
  { new: true }
);

if (!user) {
  console.error(`User not found for email: ${email}`);
  await mongoose.disconnect();
  process.exit(1);
}

console.log(`Promoted ${user.email} to admin.`);
await mongoose.disconnect();

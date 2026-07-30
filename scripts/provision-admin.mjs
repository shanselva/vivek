import nextEnv from '@next/env';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME = 'Site Administrator' } = process.env;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is required.');
}

if (!ADMIN_EMAIL || !/^\S+@\S+\.\S+$/.test(ADMIN_EMAIL)) {
  throw new Error('ADMIN_EMAIL must be a valid email address.');
}

if (
  !ADMIN_PASSWORD ||
  ADMIN_PASSWORD.length < 12 ||
  !/[a-z]/.test(ADMIN_PASSWORD) ||
  !/[A-Z]/.test(ADMIN_PASSWORD) ||
  !/\d/.test(ADMIN_PASSWORD) ||
  !/[^A-Za-z0-9]/.test(ADMIN_PASSWORD)
) {
  throw new Error(
    'ADMIN_PASSWORD must be at least 12 characters and contain uppercase, lowercase, number, and symbol.',
  );
}

const adminUserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', adminUserSchema);

try {
  await mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
    serverSelectionTimeoutMS: 5000,
  });

  const password = await bcrypt.hash(ADMIN_PASSWORD, 12);
  const email = ADMIN_EMAIL.trim().toLowerCase();
  const result = await AdminUser.updateOne(
    { email },
    { $set: { name: ADMIN_NAME.trim(), email, password, role: 'admin' } },
    { upsert: true },
  );

  console.log(result.upsertedCount === 1 ? 'Admin account created.' : 'Admin account updated.');
} finally {
  await mongoose.disconnect();
}

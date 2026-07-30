import nextEnv from '@next/env';
import bcrypt from 'bcryptjs';
import { randomBytes, randomUUID } from 'crypto';
import mongoose from 'mongoose';

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3001';
const email = `security-test-${randomUUID()}@example.invalid`;
const password = `T3st!${randomBytes(18).toString('base64url')}`;

const schema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
});
const AdminUser = mongoose.models.AdminUser || mongoose.model('AdminUser', schema);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

try {
  await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
  await AdminUser.create({
    name: 'Temporary Security Test',
    email,
    password: await bcrypt.hash(password, 12),
    role: 'admin',
  });

  const login = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const loginBody = await login.json();
  const setCookie = login.headers.get('set-cookie') || '';
  const sessionCookie = setCookie.split(';')[0];

  assert(login.status === 200, `Login returned ${login.status}.`);
  assert(!loginBody?.data?.token, 'Login response exposed the session token.');
  assert(sessionCookie.startsWith('vvc_admin_session='), 'Session cookie was not created.');
  assert(/HttpOnly/i.test(setCookie), 'Session cookie is not HTTP-only.');
  assert(/SameSite=Strict/i.test(setCookie), 'Session cookie is not SameSite=Strict.');

  const authorized = await fetch(`${baseUrl}/api/stats`, {
    headers: { Cookie: sessionCookie },
  });
  assert(authorized.status === 200, `Authenticated request returned ${authorized.status}.`);

  const logout = await fetch(`${baseUrl}/api/auth/logout`, {
    method: 'POST',
    headers: { Cookie: sessionCookie },
  });
  const logoutCookie = logout.headers.get('set-cookie') || '';
  assert(logout.status === 200, `Logout returned ${logout.status}.`);
  assert(/Max-Age=0/i.test(logoutCookie), 'Logout did not expire the session cookie.');

  console.log('PASS cookie authentication integration');
} finally {
  if (mongoose.connection.readyState !== 0) {
    await AdminUser.deleteOne({ email });
    await mongoose.disconnect();
  }
}

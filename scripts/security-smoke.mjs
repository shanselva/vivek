const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3001';

const checks = [
  ['removed admin bootstrap route', '/api/create-admin', { method: 'GET' }, 404],
  ['removed destructive seed route', '/api/seed-db', { method: 'GET' }, 404],
  ['career mutation requires auth', '/api/careers', { method: 'POST' }, 401],
  ['settings mutation requires auth', '/api/settings', { method: 'PUT' }, 401],
  ['team mutation requires auth', '/api/team', { method: 'POST' }, 401],
  ['testimonial mutation requires auth', '/api/testimonials', { method: 'POST' }, 401],
  ['content mutation requires auth', '/api/content', { method: 'PUT' }, 401],
  ['gallery deletion requires auth', '/api/gallery/000000000000000000000000', { method: 'DELETE' }, 401],
  ['dashboard stats require auth', '/api/stats', { method: 'GET' }, 401],
  [
    'login payload is validated',
    '/api/auth/login',
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' },
    400,
  ],
  [
    'public enquiry payload is validated',
    '/api/enquiries',
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' },
    400,
  ],
];

let failures = 0;

for (const [name, path, init, expectedStatus] of checks) {
  try {
    const response = await fetch(`${baseUrl}${path}`, init);
    if (response.status !== expectedStatus) {
      failures += 1;
      console.error(`FAIL ${name}: expected ${expectedStatus}, received ${response.status}`);
    } else {
      console.log(`PASS ${name}`);
    }
  } catch (error) {
    failures += 1;
    console.error(`FAIL ${name}: ${error instanceof Error ? error.message : 'request failed'}`);
  }
}

if (failures > 0) process.exitCode = 1;

# Security and administration

## Required configuration

Copy `.env.example` to `.env.local` for local development and replace every placeholder. Environment files are ignored by Git. The application refuses to start database or authentication operations when `MONGODB_URI` or a sufficiently strong `JWT_SECRET` is missing.

The normal application connection must use a MongoDB account limited to `readWrite` on the `construction` database. Do not run the website with a MongoDB `root` account.

## Provisioning an administrator

Administrator creation is intentionally unavailable over HTTP. Run the local CLI from a trusted shell with one-time environment variables:

```powershell
$env:ADMIN_EMAIL = "your-admin-email"
$env:ADMIN_PASSWORD = "your-unique-strong-password"
$env:ADMIN_NAME = "Site Administrator"
npm run admin:provision
Remove-Item Env:ADMIN_EMAIL, Env:ADMIN_PASSWORD, Env:ADMIN_NAME
```

The password must be at least 12 characters and include uppercase, lowercase, numeric, and symbol characters. The command is idempotent: it creates the account or rotates the matching account's password.

## Removed dangerous operations

Database seeding and administrator creation are not exposed as web routes. Any future destructive maintenance script must require an explicit confirmation flag, run outside the web server, and be backed up before execution.

## Sessions and APIs

The admin session is stored in an HTTP-only, `SameSite=Strict` cookie and expires after 24 hours. Authorization is verified again in protected API route handlers. Public submission endpoints are validated and rate-limited; administrative uploads are decoded, size-limited, dimension-limited, and assigned server-generated filenames.

## Deployment checklist

1. Use TLS and set `NODE_ENV=production` so session cookies are marked `Secure`.
2. Use unique production values for `MONGODB_URI` and `JWT_SECRET`.
3. Configure all three Cloudinary variables together or leave all three unset.
4. Provision the first administrator through the CLI, then clear the one-time shell variables.
5. Confirm `/api/create-admin` and `/api/seed-db` return `404`.
6. Run `npm run build` and the focused API security checks before deployment.

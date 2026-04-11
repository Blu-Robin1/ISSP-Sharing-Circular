# SCIS Setup Guide

This guide covers environment setup, verification steps, and admin provisioning for the SCIS (Sharing & Circular Innovation Society) initiative module.

---

## Required environment variables

Add these to `.env` or `.env.local` (see [Supabase docs](./supabase.md) for local setup):

| Variable | Description |
|----------|-------------|
| `SUPABASE_API_URL` | Supabase project API URL (e.g. `http://127.0.0.1:54321` for local) |
| `SUPABASE_KEY` | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (used for some admin operations) |
| `TENANT_ID` | Tenant identifier (e.g. `precious-plastic`, `scis`). Must match `profiles.tenant_id` and initiative data. |

For production, also configure `RESEND_API_KEY` if using email notifications.

---

## Supabase requirements

1. **Run migrations** – Ensure `initiatives`, `initiative_supports`, `initiative_contributions` exist (e.g. migration `20260315100000_initiatives.sql`).
2. **Profile types** – A row with `name = 'member'` must exist for your tenant. If sign-up fails with "No profile_type with name 'member' found", run `supabase/scripts/fix-sign-up-issues.sql`.
3. **RLS** – Initiative tables use RLS with tenant isolation via `x-tenant-id`. Ensure `createSupabaseServerClient` sets this header.

See [Schema alignment](../supabase/SCHEMA_ALIGNMENT.md) for table and column mappings.

---

## Tenant requirements

- `TENANT_ID` in the app must match:
  - `profiles.tenant_id` for new sign-ups
  - `initiatives.tenant_id` for initiatives
- For local dev, `TENANT_ID=precious-plastic` is common; change in scripts if using another tenant.

---

## How to run locally

1. Install dependencies: `yarn install`
2. Start Supabase: `supabase start` (from project root)
3. Apply schema: `yarn db:seed` or `supabase db push`
4. Create `.env.local` with `SUPABASE_API_URL`, `SUPABASE_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `TENANT_ID`
5. Start the app: `yarn start`
6. For local sign-up, get email confirmation links at http://localhost:54324/monitor

---

## How to verify initiative submission works

1. Sign in as any user.
2. Go to the **Map** page.
3. Enable "place initiative" mode (if your build supports it) or submit via a test API call.
4. Use the map submission form: pick a location, enter title, description, project type, then submit.
5. Check:
   - The new initiative appears in Admin (`/admin/initiatives`).
   - It has status `pending` initially.
   - It appears on the map (pending initiatives may show limited options).

---

## How to verify support/contribution flows work

1. Approve an initiative in Admin.
2. Open the initiative from the map (click its pin).
3. In the drawer:
   - **Stage 1**: Submit "Add your name" with name, email, postal code. Count should increment after submit.
   - **Stage 2+**: Submit volunteer skills, membership pledge, champion, or donation. Counts should update.
4. Verify:
   - Counts refresh without leaving the page (drawer calls `refreshInitiatives`).
   - In Admin, expand "View supporters & contributors" and confirm the new entries appear.

---

## How to verify stage changes persist

1. In Admin, change the **Stage override** for an initiative (e.g. to Stage 3).
2. Refresh the page or re-open Admin. The override should still be applied.
3. Open the initiative drawer on the map. The effective stage should match.
4. For Stage 3, edit milestones (budget, plan URL, insurance, etc.). Save and verify persistence on refresh.

---

## How to verify admin protection works

1. **As non-admin** – Visit `/admin/initiatives` directly. You should be redirected to `/forbidden`.
2. **Admin link** – As non-admin, the Admin link should not appear in the header or settings.
3. **API** – As non-admin, `GET /api/initiatives?status=all` should return 403.
4. **As admin** – Admin users can access the page and API. Promote a user first (see below).

---

## Promote a user to admin

1. The user must have signed up and confirmed their email (profile must exist with `auth_id`).
2. Open Supabase Dashboard → SQL Editor.
3. Use `supabase/scripts/add-admin-by-email.sql`:
   - Replace the email placeholder with the actual user email.
   - Ensure `TENANT_ID` in the script matches your environment (or adjust the script).
4. Run the script.
5. The user logs in again; the Admin link appears and `/admin/initiatives` is accessible.

---

## Related Supabase scripts

| Script | Purpose | Safety |
|--------|---------|--------|
| `add-admin-by-email.sql` | Add `admin` role to a profile by email | Always replace the email placeholder. Run once per user. |
| `fix-sign-up-issues.sql` | Fix missing `member` profile type, get_projects country | Change tenant if needed. Safe to run once. |

Run scripts only in the appropriate environment (local vs. production). Do not hardcode production emails in committed files.

---

## Role-based entry (Contributor, Organizer, Admin)

The app uses a single sign-in flow. Role-based differences:

- **Admin**: `profiles.roles` includes `'admin'`. After sign-in, admins are redirected to `/admin/initiatives`. Admin link appears in header and settings. Only admins can access `/admin/initiatives` and admin API endpoints.
- **Organizer**: (future) `profiles.roles` may include `'organizer'`. Organizer-specific dashboards or routes can be added later.
- **Contributor**: Default role (e.g. `profile_type = member`). Standard access to map, initiatives, library, etc. No admin features.

Post-login routing: Admins are redirected to `/admin/initiatives` when signing in. Other users are redirected to their requested return path or home. No separate "Contributor Login" or "Organizer Login" pages—all use the same sign-in form.

---

## Provisioning team accounts

To create user accounts for team members from a list of emails (e.g. team charter):

1. Copy `supabase/scripts/team-emails.example.txt` to `supabase/scripts/team-emails.txt`.
2. Add one email per line (lines starting with `#` are ignored). Do not commit `team-emails.txt`.
3. Ensure env vars are set: `SUPABASE_API_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TENANT_ID`.
4. Run from project root:
   ```bash
   npx tsx supabase/scripts/provision-team.ts supabase/scripts/team-emails.txt
   ```
5. New users receive auth records and profile rows with `auth_id`, `tenant_id`, and `profile_type`. Temp passwords are written to `team-credentials-TIMESTAMP.txt`. Share securely; users should change password on first login.
6. To make someone an admin, run `add-admin-by-email.sql` after provisioning.

See `supabase/scripts/README.md` for more details.

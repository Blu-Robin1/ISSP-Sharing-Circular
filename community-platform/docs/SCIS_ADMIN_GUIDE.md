# SCIS Admin Guide

## What is SCIS in this app?

**SCIS** (Sharing & Circular Innovation Society) is a community-infrastructure module within the OneArmy Community Platform. It enables:

- **Residents** to propose shared-infrastructure initiatives (tool libraries, repair cafés, skill shares, etc.)
- **Community members** to support initiatives at multiple levels (name/email, membership pledges, volunteer skills, donations, champion roles)
- **SCIS staff** to moderate initiatives, track progress through development stages, and manage readiness for implementation

SCIS initiatives use the `projects` table with additional fields for stage progression and supporter tracking. They are **not** the same as legacy content but share the same table structure as Library projects.

---

## Who can access `/admin/projects`?

Only users whose `profiles.roles` array includes `'admin'` can access the admin initiatives page.

- Non-admin users who visit `/admin/projects` directly are redirected to `/forbidden`.
- The Admin link in the header and settings page is hidden for non-admins.
- API endpoints that return all initiatives or allow edits are protected and return 403 for non-admins.

---

## Required role format in profiles.roles

The admin check expects `profiles.roles` to be a PostgreSQL text array containing the string `'admin'`:

- Correct: `roles = ARRAY['admin']::text[]` or `roles = '{admin}'`
- The value is case-sensitive; use lowercase `'admin'`.
- Other roles (e.g. `'contributor'`, `'organizer'`) may exist alongside `'admin'`.

To promote a user to admin, see [SCIS Setup](./SCIS_SETUP.md#promote-a-user-to-admin).

---

## How admins approve or reject initiatives

1. Go to **Admin** → **SCIS Projects** (`/admin/projects`).
2. Each initiative card shows its **status badge**: Pending approval, Approved, or Rejected.
3. Use the **Approve** or **Reject** button in the Moderation section.
4. Approved initiatives appear on the map for public users. Pending initiatives show limited options. Rejected initiatives are marked but remain visible to admins.

Changes are saved immediately to the database.

---

## How admins edit initiative details

1. On an initiative card, click **Edit**.
2. Update **Title**, **Description**, or **Project type** as needed.
3. Click **Save**.
4. Click **Refresh** to reload the list and confirm changes.

Edits are stored in the `initiatives` table.

---

## How admins change stage / stage override

1. In the Moderation section, use the **Stage override** dropdown.
2. Options: **Auto** (use computed stage from support counts), **Stage 1**, **Stage 2**, **Stage 3**, **Stage 4**.
3. Selecting a value saves immediately.
4. **Auto** uses server counts and progression rules; override forces a specific display stage regardless of counts.

The effective stage shown on the map and in the drawer uses: override if set, otherwise computed stage from supporters, members, and champions.

---

## How supporter and contribution data is viewed

1. On an initiative card, click **View supporters & contributors**.
2. The panel shows:
   - **Supporters**: name, email, postal code (Stage 1 “Add your name”)
   - **Contributions**: volunteer skills, membership pledges, champions, donations, with payload details
3. Counts (supporters, members, champions, volunteers, donations) are displayed in the card summary and refresh when you expand details.

---

## How Stage 1, 2, 3, and 4 are interpreted

| Stage | Meaning | Community participation |
|-------|---------|-------------------------|
| **Stage 1** | Early Interest | 50 residents (name + email + postal code) needed to progress |
| **Stage 2** | Community Formation | 300 supporters, 100 members, 5 champions needed |
| **Stage 3** | Project Readiness | Admin milestones (budget, plan, insurance, renovation scope, launch date, fundraising launched) |
| **Stage 4** | Fundraising | Community bond / fundraising campaign active |

Progression from Stage 1→2 and 2→3 is driven by support counts. Stage 3→4 is controlled by the admin setting “Fundraising campaign launched” in the Stage 3 milestones.

---

## What to do if an admin cannot access the page

1. **Confirm the user is logged in** – The admin page requires an authenticated session.
2. **Check `profiles.roles`** – Ensure the profile has `'admin'` in the `roles` array:
   ```sql
   SELECT id, username, auth_id, roles FROM profiles WHERE auth_id = '<user-auth-uuid>';
   ```
3. **Run the add-admin script** – Use `supabase/scripts/add-admin-by-email.sql` with the correct email and tenant. See [SCIS Setup](./SCIS_SETUP.md#promote-a-user-to-admin).
4. **Verify tenant** – `TENANT_ID` in the environment must match `profiles.tenant_id`.
5. **Clear cache / re-login** – Profile data may be cached; try logging out and back in.

---

## Role-based entry

The app uses a single sign-in form. After login:
- **Admins** are redirected to `/admin/initiatives`.
- **Other users** go to their requested page or home.

Contributor and Organizer roles are supported via `profiles.roles` and `profile_type`; they use the same login flow and see different features based on their roles.

---

## Notes about tenant setup

- SCIS initiatives are tenant-scoped. `TENANT_ID` must be set and match the Supabase `x-tenant-id` header.
- Profile types (e.g. `member`) must exist for your tenant. Use `fix-sign-up-issues.sql` if sign-up fails.
- RLS policies on `initiatives`, `initiative_supports`, and `initiative_contributions` enforce tenant isolation via `x-tenant-id`.

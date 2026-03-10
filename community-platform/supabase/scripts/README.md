# Supabase scripts

## Provision team accounts from email list

Create user accounts for team members from a list of emails (e.g. team charter).

1. Copy `team-emails.example.txt` to `team-emails.txt` in the same folder.
2. Add one email per line (lines starting with `#` are ignored).
3. Ensure env vars are set: `SUPABASE_API_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TENANT_ID`.
4. Run from project root:
   ```bash
   npx tsx supabase/scripts/provision-team.ts supabase/scripts/team-emails.txt
   ```
5. New users are created with temp passwords. Credentials are written to `team-credentials-TIMESTAMP.txt` in the same folder. Share securely; users should change password on first login.
6. To make someone an admin, run `add-admin-by-email.sql` after provisioning.

**Security:** Run only in environments you control. Do not commit `team-emails.txt` or credential files.

## Fix sign-up errors (prof.country / profile_type member)

If sign-up fails with:
- `column prof.country does not exist`
- `No profile_type with name "member" found`

1. Open **Supabase Dashboard** → **SQL Editor**
2. Open `fix-sign-up-issues.sql`
3. Change `'precious-plastic'` to your `TENANT_ID` if needed
4. **Run** the script
5. Try sign-up again

## Make a user an admin

1. **Sign up** once through the app (Sign up page) so a profile exists.
2. Open **Supabase Dashboard** → your project → **SQL Editor**.
3. Open `add-admin-by-email.sql` and replace `'your-email@example.com'` with that user’s email.
4. **Run** the script.
5. **Log in** at `/sign-in` with that email and password. You’ll be redirected to **Admin** (`/admin/initiatives`), and the **Admin** link will appear in the header.

To make another user an admin later, run the same script with their email.

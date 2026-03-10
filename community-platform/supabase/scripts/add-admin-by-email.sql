-- Make a user an admin. Run in Supabase SQL Editor.
-- Replace the values below with your user's email or username.

-- OPTION 1: By email (profile must have auth_id set, linking to auth.users)
UPDATE public.profiles
SET roles = ARRAY['admin']::text[]
WHERE auth_id = (
  SELECT id FROM auth.users WHERE email = 'yagayya.vig.dev@gmail.com' LIMIT 1
);

-- OPTION 2: If Option 1 updates 0 rows, try by username
-- (Replace 'yourusername' with the username from your sign-up)
-- UPDATE public.profiles
-- SET roles = ARRAY['admin']::text[]
-- WHERE username = 'yourusername';

-- OPTION 3: Make the most recently created profile an admin (use carefully)
-- UPDATE public.profiles
-- SET roles = ARRAY['admin']::text[]
-- WHERE id = (SELECT id FROM public.profiles ORDER BY created_at DESC LIMIT 1);

-- DIAGNOSTIC: Run these to see what exists (uncomment to run)
-- SELECT id, email, created_at FROM auth.users WHERE email = 'yagayyavig@gmail.com';
-- SELECT id, username, auth_id, tenant_id, roles FROM public.profiles ORDER BY created_at DESC LIMIT 5;

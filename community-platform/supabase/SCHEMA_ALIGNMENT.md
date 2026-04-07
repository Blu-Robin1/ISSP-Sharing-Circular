# Schema alignment

This doc maps app behavior to Supabase tables so updates go to the correct place.

## Tables used by the app

| Feature | Table(s) | App writes to |
|---------|----------|---------------|
| **Initiatives** | `initiatives`, `initiative_supports`, `initiative_contributions` | `initiativesService.server.ts` → `.from('initiatives')`, etc. |
| **Profiles / Admin** | `profiles` (column `roles`) | Sign-up → `profiles`; admin check uses `profiles.roles` |
| **Auth** | `auth.users` (Supabase Auth) | Sign-up/sign-in via Supabase Auth; `profiles.auth_id` links to `auth.users.id` |
| **Profile types** | `profile_types` | Sign-up needs a row with `name = 'member'` |

## Table ↔ schema mapping

| Database table | Schema / migration |
|----------------|--------------------|
| initiatives | `schemas/initiatives.sql`, `migrations/20260315100000_initiatives.sql` |
| initiative_supports | same |
| initiative_contributions | same |
| profiles | `schemas/profiles.sql`, `migrations/41125140428_profiles_and_comments.sql` |
| profile_types | `schemas/profiles.sql` |
| projects, project_steps | `schemas/projects.sql` |
| map_pins, map_settings | `schemas/map.sql` |
| (others) | See `schemas/*.sql` and `migrations/*.sql` |

## Required for initiatives

- `initiatives`: `tenant_id`, `title`, `description`, `location_lat`, `location_lng`, `status`, `stage`, …
- `initiative_supports`: `initiative_id`, `email`, `name`, `postal_code`
- `initiative_contributions`: `initiative_id`, `type`, `payload`

## Required for sign-up and admin

- `profiles`: `auth_id` (links to `auth.users.id`), `username`, `display_name`, `tenant_id`, `profile_type`, `roles`
- `profile_types`: at least one row with `name = 'member'` per tenant (see migration `20260309120000_fix_prof_country_and_seed_member.sql`)
- `TENANT_ID` env var must match `profiles.tenant_id`
- SCIS roles: `admin`, `contributor`, `organizer` (stored in `profiles.roles` text[])

## PostgREST / RLS

- All initiative-related RLS policies use `x-tenant-id` header (set by `createSupabaseServerClient`).
- Ensure `TENANT_ID` is set and matches your tenant's data.

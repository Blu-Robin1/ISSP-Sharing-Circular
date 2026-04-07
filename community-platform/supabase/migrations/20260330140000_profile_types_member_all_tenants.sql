-- Ensure profile_type 'member' exists for every tenant already present in the database.
-- Fixes MEMBER_TYPE_MISSING when TENANT_ID matches a tenant that was not in the static seed list.

INSERT INTO public.profile_types (name, display_name, "order", description, map_pin_name, is_space, tenant_id)
SELECT 'member', 'Member', 1, 'Community member', '', false, x.tenant_id
FROM (
  SELECT DISTINCT tenant_id FROM public.profiles WHERE tenant_id IS NOT NULL
  UNION
  SELECT DISTINCT tenant_id FROM public.profile_types WHERE tenant_id IS NOT NULL
) x
WHERE NOT EXISTS (
  SELECT 1 FROM public.profile_types pt
  WHERE pt.name = 'member' AND pt.tenant_id = x.tenant_id
);

-- Fallback for fresh installs: seed common tenant IDs before any profile rows exist.
INSERT INTO public.profile_types (name, display_name, "order", description, map_pin_name, is_space, tenant_id)
SELECT 'member', 'Member', 1, 'Community member', '', false, tenant_id
FROM (VALUES
  ('precious-plastic'),
  ('project-kamp'),
  ('community-platform'),
  ('fixing-fashion'),
  ('scis')
) AS v(tenant_id)
WHERE NOT EXISTS (
  SELECT 1 FROM public.profile_types pt WHERE pt.name = 'member' AND pt.tenant_id = v.tenant_id
);

INSERT INTO profile_types (
  id,
  name,
  display_name,
  "order",
  description,
  is_space
)
VALUES
(
  gen_random_uuid(),
  'member',
  'Member',
  1,
  'Default member type',
  false
),
(
  gen_random_uuid(),
  'organizer',
  'Organizer',
  2,
  'Organizer profile type',
  false
);
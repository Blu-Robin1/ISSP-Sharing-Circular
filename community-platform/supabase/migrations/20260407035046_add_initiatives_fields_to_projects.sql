-- Add initiatives fields to projects table
ALTER TABLE projects ADD COLUMN stage integer DEFAULT 1;
ALTER TABLE projects ADD COLUMN stage_override integer;
ALTER TABLE projects ADD COLUMN supporter_count integer DEFAULT 0;
ALTER TABLE projects ADD COLUMN member_count integer DEFAULT 0;
ALTER TABLE projects ADD COLUMN champion_count integer DEFAULT 0;
ALTER TABLE projects ADD COLUMN volunteer_count integer DEFAULT 0;
ALTER TABLE projects ADD COLUMN donate_count integer DEFAULT 0;
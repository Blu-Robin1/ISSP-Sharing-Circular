-- Add location columns to projects table
ALTER TABLE projects ADD COLUMN lat numeric;
ALTER TABLE projects ADD COLUMN lng numeric;
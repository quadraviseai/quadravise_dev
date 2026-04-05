ALTER TABLE portfolio_projects
ADD COLUMN IF NOT EXISTS frontend_technologies TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS backend_technologies TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS database_technologies TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS project_start_date DATE,
ADD COLUMN IF NOT EXISTS project_end_date DATE,
ADD COLUMN IF NOT EXISTS project_launch_date DATE,
ADD COLUMN IF NOT EXISTS project_duration VARCHAR(120);

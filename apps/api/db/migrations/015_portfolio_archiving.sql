ALTER TABLE portfolio_projects
ADD COLUMN IF NOT EXISTS is_archived BOOLEAN NOT NULL DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_archived ON portfolio_projects(is_archived);

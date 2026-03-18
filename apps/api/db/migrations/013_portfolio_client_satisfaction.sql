ALTER TABLE portfolio_projects
ADD COLUMN IF NOT EXISTS client_satisfaction VARCHAR(120);

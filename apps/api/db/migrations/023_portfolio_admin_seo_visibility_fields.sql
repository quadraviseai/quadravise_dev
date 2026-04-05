ALTER TABLE portfolio_projects
ADD COLUMN IF NOT EXISTS meta_title VARCHAR(70),
ADD COLUMN IF NOT EXISTS meta_description VARCHAR(160),
ADD COLUMN IF NOT EXISTS og_image TEXT,
ADD COLUMN IF NOT EXISTS seo_keywords TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS noindex BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS show_on_homepage BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS sort_order INTEGER NOT NULL DEFAULT 9999,
ADD COLUMN IF NOT EXISTS project_badge VARCHAR(80),
ADD COLUMN IF NOT EXISTS visibility VARCHAR(20) NOT NULL DEFAULT 'public',
ADD COLUMN IF NOT EXISTS created_by_user_id UUID,
ADD COLUMN IF NOT EXISTS last_modified_by_user_id UUID,
ADD COLUMN IF NOT EXISTS view_count INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS link_click_count INTEGER NOT NULL DEFAULT 0;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'portfolio_projects_visibility_check'
  ) THEN
    ALTER TABLE portfolio_projects
    ADD CONSTRAINT portfolio_projects_visibility_check
    CHECK (visibility IN ('public', 'private', 'hidden'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_sort_order
ON portfolio_projects(sort_order);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_visibility
ON portfolio_projects(visibility);

CREATE INDEX IF NOT EXISTS idx_portfolio_projects_homepage
ON portfolio_projects(show_on_homepage);

CREATE TABLE IF NOT EXISTS portfolio_link_click_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_project_id UUID NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  link_type VARCHAR(30) NOT NULL,
  target_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_link_click_events_project_id
ON portfolio_link_click_events(portfolio_project_id);

CREATE INDEX IF NOT EXISTS idx_portfolio_link_click_events_created_at
ON portfolio_link_click_events(created_at);

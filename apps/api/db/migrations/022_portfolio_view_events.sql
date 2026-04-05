CREATE TABLE IF NOT EXISTS portfolio_view_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_project_id UUID NOT NULL REFERENCES portfolio_projects(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_portfolio_view_events_project_id
ON portfolio_view_events(portfolio_project_id);

CREATE INDEX IF NOT EXISTS idx_portfolio_view_events_created_at
ON portfolio_view_events(created_at);

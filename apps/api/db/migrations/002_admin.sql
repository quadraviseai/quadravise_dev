CREATE TABLE IF NOT EXISTS site_settings (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  address VARCHAR(255) NOT NULL DEFAULT 'Kolkata, India',
  email VARCHAR(255) NOT NULL DEFAULT 'support@quadravise.com',
  linkedin VARCHAR(255) NOT NULL DEFAULT 'https://linkedin.com/company/quadravise',
  working_hours VARCHAR(255) NOT NULL DEFAULT 'Mon - Sat, 10:00 AM to 7:00 PM',
  projects_delivered VARCHAR(40) NOT NULL DEFAULT '50+',
  mvp_kickoff_speed VARCHAR(40) NOT NULL DEFAULT '7 Days',
  reliability_focus VARCHAR(40) NOT NULL DEFAULT '99.9%',
  performance_build VARCHAR(40) NOT NULL DEFAULT 'SEO+',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO site_settings (id)
VALUES (1)
ON CONFLICT (id) DO NOTHING;

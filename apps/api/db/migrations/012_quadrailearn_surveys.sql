CREATE TABLE IF NOT EXISTS quadrailearn_surveys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255),
  role VARCHAR(120),
  recommended_features TEXT[] NOT NULL DEFAULT '{}',
  helpful_classes_or_exams VARCHAR(255),
  needs_multilingual_support BOOLEAN NOT NULL DEFAULT FALSE,
  specific_requirements TEXT,
  feedback TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_quadrailearn_surveys_created_at
  ON quadrailearn_surveys(created_at DESC);

ALTER TABLE quadrailearn_surveys
ALTER COLUMN name DROP NOT NULL;

ALTER TABLE quadrailearn_surveys
ADD COLUMN IF NOT EXISTS respondent_type VARCHAR(50),
ADD COLUMN IF NOT EXISTS tracking_methods TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS tracking_methods_other VARCHAR(255),
ADD COLUMN IF NOT EXISTS concept_confidence VARCHAR(50),
ADD COLUMN IF NOT EXISTS learning_challenges TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS content_over_understanding VARCHAR(20),
ADD COLUMN IF NOT EXISTS study_routine VARCHAR(30),
ADD COLUMN IF NOT EXISTS learning_health_score SMALLINT,
ADD COLUMN IF NOT EXISTS valuable_features TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS motivation_with_streaks VARCHAR(30),
ADD COLUMN IF NOT EXISTS willingness_to_pay VARCHAR(20),
ADD COLUMN IF NOT EXISTS monthly_price_range VARCHAR(30);

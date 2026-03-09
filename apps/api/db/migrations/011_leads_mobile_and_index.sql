ALTER TABLE leads
ADD COLUMN IF NOT EXISTS mobile_number VARCHAR(30);

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);

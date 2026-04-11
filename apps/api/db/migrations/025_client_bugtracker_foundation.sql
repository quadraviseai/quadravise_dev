CREATE TABLE IF NOT EXISTS client_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(160) NOT NULL,
  slug VARCHAR(180) UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status VARCHAR(30) NOT NULL DEFAULT 'active',
  developer_note_public TEXT NOT NULL DEFAULT '',
  note_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS client_project_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_user_id UUID NOT NULL REFERENCES client_users(id) ON DELETE CASCADE,
  client_project_id UUID NOT NULL REFERENCES client_projects(id) ON DELETE CASCADE,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (client_user_id, client_project_id)
);

CREATE INDEX IF NOT EXISTS idx_client_project_memberships_user ON client_project_memberships(client_user_id);
CREATE INDEX IF NOT EXISTS idx_client_project_memberships_project ON client_project_memberships(client_project_id);

CREATE TABLE IF NOT EXISTS bug_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_number BIGSERIAL UNIQUE,
  client_project_id UUID NOT NULL REFERENCES client_projects(id) ON DELETE CASCADE,
  title VARCHAR(150) NOT NULL,
  description TEXT NOT NULL,
  page_url TEXT,
  severity VARCHAR(20) NOT NULL,
  category VARCHAR(80) NOT NULL,
  status VARCHAR(30) NOT NULL DEFAULT 'new',
  eta_at TIMESTAMPTZ,
  created_by_client_user_id UUID REFERENCES client_users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  is_archived BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT chk_bug_tickets_severity CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  CONSTRAINT chk_bug_tickets_status CHECK (status IN ('new', 'in_progress', 'need_clarification', 'resolved', 'closed', 'reopened'))
);

CREATE INDEX IF NOT EXISTS idx_bug_tickets_project ON bug_tickets(client_project_id);
CREATE INDEX IF NOT EXISTS idx_bug_tickets_status ON bug_tickets(status);

CREATE TABLE IF NOT EXISTS bug_ticket_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bug_ticket_id UUID NOT NULL REFERENCES bug_tickets(id) ON DELETE CASCADE,
  author_type VARCHAR(20) NOT NULL,
  author_label VARCHAR(120) NOT NULL,
  body TEXT NOT NULL,
  is_internal BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_bug_ticket_comments_author_type CHECK (author_type IN ('client', 'developer', 'admin', 'system'))
);

CREATE TABLE IF NOT EXISTS bug_ticket_attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bug_ticket_id UUID NOT NULL REFERENCES bug_tickets(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  storage_path TEXT NOT NULL,
  mime_type VARCHAR(120) NOT NULL,
  file_size_bytes BIGINT NOT NULL DEFAULT 0,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  attachment_kind VARCHAR(30) NOT NULL DEFAULT 'attachment',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_bug_ticket_attachments_kind CHECK (attachment_kind IN ('attachment', 'evidence'))
);

CREATE TABLE IF NOT EXISTS bug_ticket_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bug_ticket_id UUID NOT NULL REFERENCES bug_tickets(id) ON DELETE CASCADE,
  previous_status VARCHAR(30),
  next_status VARCHAR(30) NOT NULL,
  note TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_bug_ticket_status_history_next CHECK (next_status IN ('new', 'in_progress', 'need_clarification', 'resolved', 'closed', 'reopened'))
);


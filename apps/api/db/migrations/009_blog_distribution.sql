CREATE TABLE IF NOT EXISTS social_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform VARCHAR(30) NOT NULL,
  account_name VARCHAR(160) NOT NULL,
  account_type VARCHAR(60),
  platform_account_id VARCHAR(160),
  access_token_encrypted TEXT,
  refresh_token_encrypted TEXT,
  token_expires_at TIMESTAMPTZ,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_social_publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  platform VARCHAR(30) NOT NULL,
  social_account_id UUID REFERENCES social_accounts(id) ON DELETE SET NULL,
  publish_mode VARCHAR(20) NOT NULL DEFAULT 'instant',
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  platform_post_id VARCHAR(180),
  platform_post_url TEXT,
  caption TEXT,
  image_url TEXT,
  error_message TEXT,
  retry_count INT NOT NULL DEFAULT 0,
  auto_share_after_website_publish BOOLEAN NOT NULL DEFAULT TRUE,
  use_featured_image BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (blog_post_id, platform)
);

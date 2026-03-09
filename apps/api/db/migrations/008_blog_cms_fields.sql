ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS tags TEXT[] NOT NULL DEFAULT '{}',
ADD COLUMN IF NOT EXISTS reading_time VARCHAR(40),
ADD COLUMN IF NOT EXISTS cover_image TEXT,
ADD COLUMN IF NOT EXISTS thumbnail_image TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS og_title VARCHAR(120),
ADD COLUMN IF NOT EXISTS og_description VARCHAR(220),
ADD COLUMN IF NOT EXISTS og_image TEXT,
ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'published',
ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE;

UPDATE blog_posts
SET
  cover_image = COALESCE(cover_image, featured_image),
  status = CASE
    WHEN is_published = TRUE THEN 'published'
    ELSE 'draft'
  END
WHERE cover_image IS NULL OR status IS NULL;

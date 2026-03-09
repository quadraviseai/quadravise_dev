ALTER TABLE blog_posts
ADD COLUMN IF NOT EXISTS import_source VARCHAR(20) NOT NULL DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS image_status VARCHAR(20) NOT NULL DEFAULT 'missing';

UPDATE blog_posts
SET import_source = COALESCE(import_source, 'manual'),
    image_status = CASE
      WHEN COALESCE(cover_image, featured_image, thumbnail_image) IS NOT NULL THEN 'uploaded'
      ELSE 'missing'
    END;

ALTER TABLE blog_posts
DROP CONSTRAINT IF EXISTS blog_posts_import_source_check;

ALTER TABLE blog_posts
ADD CONSTRAINT blog_posts_import_source_check
CHECK (import_source IN ('manual', 'json'));

ALTER TABLE blog_posts
DROP CONSTRAINT IF EXISTS blog_posts_image_status_check;

ALTER TABLE blog_posts
ADD CONSTRAINT blog_posts_image_status_check
CHECK (image_status IN ('missing', 'uploaded'));

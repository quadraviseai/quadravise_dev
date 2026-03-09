import { query } from "../../config/db.js";

export const blogsRepository = {
  async findAll() {
    return query(
      `
        SELECT
          bp.id::text,
          bp.title,
          bp.slug,
          bp.excerpt,
          bp.content,
          bp.tags,
          bp.reading_time AS "readingTime",
          bp.meta_title AS "metaTitle",
          bp.meta_description AS "metaDescription",
          bp.cover_image AS "coverImage",
          bp.thumbnail_image AS "thumbnailImage",
          COALESCE(bp.cover_image, bp.featured_image) AS "featuredImage",
          bp.canonical_url AS "canonicalUrl",
          bp.og_title AS "ogTitle",
          bp.og_description AS "ogDescription",
          bp.og_image AS "ogImage",
          COALESCE(bc.name, 'General') AS category,
          bp.author,
          bp.published_at AS "publishedAt",
          bp.status,
          bp.is_featured AS "isFeatured",
          bp.import_source AS "importSource",
          bp.image_status AS "imageStatus"
        FROM blog_posts bp
        LEFT JOIN blog_categories bc ON bp.category_id = bc.id
        WHERE bp.status = 'published'
        ORDER BY bp.published_at DESC
      `
    );
  },
  async findFeatured(limit = 3) {
    return query(
      `
        SELECT
          bp.id::text,
          bp.title,
          bp.slug,
          bp.excerpt,
          bp.content,
          bp.tags,
          bp.reading_time AS "readingTime",
          bp.meta_title AS "metaTitle",
          bp.meta_description AS "metaDescription",
          bp.cover_image AS "coverImage",
          bp.thumbnail_image AS "thumbnailImage",
          COALESCE(bp.cover_image, bp.featured_image) AS "featuredImage",
          bp.canonical_url AS "canonicalUrl",
          bp.og_title AS "ogTitle",
          bp.og_description AS "ogDescription",
          bp.og_image AS "ogImage",
          COALESCE(bc.name, 'General') AS category,
          bp.author,
          bp.published_at AS "publishedAt",
          bp.status,
          bp.is_featured AS "isFeatured",
          bp.import_source AS "importSource",
          bp.image_status AS "imageStatus"
        FROM blog_posts bp
        LEFT JOIN blog_categories bc ON bp.category_id = bc.id
        WHERE bp.status = 'published'
        ORDER BY bp.published_at DESC
        LIMIT $1
      `,
      [limit]
    );
  },
  async findBySlug(slug) {
    const rows = await query(
      `
        SELECT
          bp.id::text,
          bp.title,
          bp.slug,
          bp.excerpt,
          bp.content,
          bp.tags,
          bp.reading_time AS "readingTime",
          bp.meta_title AS "metaTitle",
          bp.meta_description AS "metaDescription",
          bp.cover_image AS "coverImage",
          bp.thumbnail_image AS "thumbnailImage",
          COALESCE(bp.cover_image, bp.featured_image) AS "featuredImage",
          bp.canonical_url AS "canonicalUrl",
          bp.og_title AS "ogTitle",
          bp.og_description AS "ogDescription",
          bp.og_image AS "ogImage",
          COALESCE(bc.name, 'General') AS category,
          bp.author,
          bp.published_at AS "publishedAt",
          bp.status,
          bp.is_featured AS "isFeatured",
          bp.import_source AS "importSource",
          bp.image_status AS "imageStatus"
        FROM blog_posts bp
        LEFT JOIN blog_categories bc ON bp.category_id = bc.id
        WHERE bp.slug = $1 AND bp.status = 'published'
        LIMIT 1
      `,
      [slug]
    );

    return rows[0] || null;
  },
  async findBySlugAdmin(slug) {
    const rows = await query(
      `
        SELECT
          bp.id::text,
          bp.title,
          bp.slug,
          bp.excerpt,
          bp.content,
          bp.tags,
          bp.reading_time AS "readingTime",
          bp.meta_title AS "metaTitle",
          bp.meta_description AS "metaDescription",
          bp.cover_image AS "coverImage",
          bp.thumbnail_image AS "thumbnailImage",
          COALESCE(bp.cover_image, bp.featured_image) AS "featuredImage",
          bp.canonical_url AS "canonicalUrl",
          bp.og_title AS "ogTitle",
          bp.og_description AS "ogDescription",
          bp.og_image AS "ogImage",
          COALESCE(bc.name, 'General') AS category,
          bp.author,
          bp.published_at AS "publishedAt",
          bp.status,
          bp.is_featured AS "isFeatured",
          bp.import_source AS "importSource",
          bp.image_status AS "imageStatus"
        FROM blog_posts bp
        LEFT JOIN blog_categories bc ON bp.category_id = bc.id
        WHERE bp.slug = $1
        LIMIT 1
      `,
      [slug]
    );

    return rows[0] || null;
  },
  async findByIdAdmin(id) {
    const rows = await query(
      `
        SELECT
          bp.id::text,
          bp.title,
          bp.slug,
          bp.excerpt,
          bp.content,
          bp.tags,
          bp.reading_time AS "readingTime",
          bp.meta_title AS "metaTitle",
          bp.meta_description AS "metaDescription",
          bp.cover_image AS "coverImage",
          bp.thumbnail_image AS "thumbnailImage",
          COALESCE(bp.cover_image, bp.featured_image) AS "featuredImage",
          bp.canonical_url AS "canonicalUrl",
          bp.og_title AS "ogTitle",
          bp.og_description AS "ogDescription",
          bp.og_image AS "ogImage",
          COALESCE(bc.name, 'General') AS category,
          bp.author,
          bp.published_at AS "publishedAt",
          bp.status,
          bp.is_featured AS "isFeatured",
          bp.import_source AS "importSource",
          bp.image_status AS "imageStatus"
        FROM blog_posts bp
        LEFT JOIN blog_categories bc ON bp.category_id = bc.id
        WHERE bp.id = $1::uuid
        LIMIT 1
      `,
      [id]
    );

    return rows[0] || null;
  },
  async findAllAdmin() {
    return query(
      `
        SELECT
          bp.id::text,
          bp.title,
          bp.slug,
          bp.excerpt,
          bp.content,
          bp.tags,
          bp.reading_time AS "readingTime",
          bp.meta_title AS "metaTitle",
          bp.meta_description AS "metaDescription",
          bp.cover_image AS "coverImage",
          bp.thumbnail_image AS "thumbnailImage",
          COALESCE(bp.cover_image, bp.featured_image) AS "featuredImage",
          bp.canonical_url AS "canonicalUrl",
          bp.og_title AS "ogTitle",
          bp.og_description AS "ogDescription",
          bp.og_image AS "ogImage",
          COALESCE(bc.name, 'General') AS category,
          bp.author,
          bp.published_at AS "publishedAt",
          bp.status,
          bp.is_featured AS "isFeatured",
          bp.import_source AS "importSource",
          bp.image_status AS "imageStatus"
        FROM blog_posts bp
        LEFT JOIN blog_categories bc ON bp.category_id = bc.id
        ORDER BY bp.updated_at DESC
      `
    );
  },
  async findAllAdminPaged({ page = 1, pageSize = 10, search = "" }) {
    const offset = (page - 1) * pageSize;
    const whereSql = search
      ? `
        WHERE (
          bp.title ILIKE $1 OR
          bp.excerpt ILIKE $1 OR
          bp.content ILIKE $1 OR
          COALESCE(bc.name, 'General') ILIKE $1 OR
          bp.author ILIKE $1 OR
          array_to_string(bp.tags, ', ') ILIKE $1 OR
          bp.import_source ILIKE $1 OR
          bp.image_status ILIKE $1
        )
      `
      : "";

    const params = [];
    if (search) {
      params.push(`%${search}%`);
    }
    params.push(pageSize, offset);

    const dataRows = await query(
      `
        SELECT
          bp.id::text,
          bp.title,
          bp.slug,
          bp.excerpt,
          bp.content,
          bp.tags,
          bp.reading_time AS "readingTime",
          bp.meta_title AS "metaTitle",
          bp.meta_description AS "metaDescription",
          bp.cover_image AS "coverImage",
          bp.thumbnail_image AS "thumbnailImage",
          COALESCE(bp.cover_image, bp.featured_image) AS "featuredImage",
          bp.canonical_url AS "canonicalUrl",
          bp.og_title AS "ogTitle",
          bp.og_description AS "ogDescription",
          bp.og_image AS "ogImage",
          COALESCE(bc.name, 'General') AS category,
          bp.author,
          bp.published_at AS "publishedAt",
          bp.status,
          bp.is_featured AS "isFeatured",
          bp.import_source AS "importSource",
          bp.image_status AS "imageStatus"
        FROM blog_posts bp
        LEFT JOIN blog_categories bc ON bp.category_id = bc.id
        ${whereSql}
        ORDER BY bp.updated_at DESC
        LIMIT $${search ? 2 : 1}
        OFFSET $${search ? 3 : 2}
      `,
      params
    );

    const countRows = await query(
      `
        SELECT COUNT(*)::int AS total
        FROM blog_posts bp
        LEFT JOIN blog_categories bc ON bp.category_id = bc.id
        ${whereSql}
      `,
      search ? [`%${search}%`] : []
    );

    return { items: dataRows, total: countRows[0]?.total || 0 };
  },
  async create(payload) {
    const rows = await query(
      `
        WITH category_row AS (
          INSERT INTO blog_categories(name)
          VALUES ($1)
          ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
          RETURNING id
        )
        INSERT INTO blog_posts (
          title,
          slug,
          excerpt,
          content,
          tags,
          reading_time,
          meta_title,
          meta_description,
          author,
          category_id,
          featured_image,
          cover_image,
          thumbnail_image,
          canonical_url,
          og_title,
          og_description,
          og_image,
          import_source,
          image_status,
          published_at,
          is_published,
          status,
          is_featured
        )
        VALUES (
          $2,
          $3,
          $4,
          $5,
          $6,
          $7,
          $8,
          $9,
          $10,
          (SELECT id FROM category_row),
          $11,
          $11,
          $12,
          $13,
          $14,
          $15,
          $16,
          $17,
          $18,
          CASE WHEN $19::varchar = 'published' THEN COALESCE($20::timestamptz, NOW()) ELSE $20::timestamptz END,
          $19::varchar = 'published',
          $19,
          $21
        )
        RETURNING id::text
      `,
      [
        payload.category,
        payload.title,
        payload.slug,
        payload.excerpt,
        payload.content,
        payload.tags || [],
        payload.readingTime || null,
        payload.metaTitle || null,
        payload.metaDescription || null,
        payload.author,
        payload.coverImage || payload.featuredImage || null,
        payload.thumbnailImage || null,
        payload.canonicalUrl || null,
        payload.ogTitle || null,
        payload.ogDescription || null,
        payload.ogImage || null,
        payload.importSource || "manual",
        payload.imageStatus || "missing",
        payload.status,
        payload.publishedAt || null,
        Boolean(payload.isFeatured)
      ]
    );

    return rows[0] || null;
  },
  async updateById(id, payload) {
    await query(
      `
        WITH category_row AS (
          INSERT INTO blog_categories(name)
          VALUES ($1)
          ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
          RETURNING id
        )
        UPDATE blog_posts
        SET
          title = $2,
          slug = $3,
          excerpt = $4,
          content = $5,
          tags = $6,
          reading_time = $7,
          meta_title = $8,
          meta_description = $9,
          author = $10,
          category_id = (SELECT id FROM category_row),
          featured_image = $11,
          cover_image = $11,
          thumbnail_image = $12,
          canonical_url = $13,
          og_title = $14,
          og_description = $15,
          og_image = $16,
          import_source = $17,
          image_status = $18,
          is_published = $19::varchar = 'published',
          published_at = CASE
            WHEN $19::varchar = 'published' THEN COALESCE($20::timestamptz, published_at, NOW())
            WHEN $19::varchar = 'scheduled' THEN $20::timestamptz
            ELSE NULL
          END,
          status = $19,
          is_featured = $21,
          updated_at = NOW()
        WHERE id = $22::uuid
      `,
      [
        payload.category,
        payload.title,
        payload.slug,
        payload.excerpt,
        payload.content,
        payload.tags || [],
        payload.readingTime || null,
        payload.metaTitle || null,
        payload.metaDescription || null,
        payload.author,
        payload.coverImage || payload.featuredImage || null,
        payload.thumbnailImage || null,
        payload.canonicalUrl || null,
        payload.ogTitle || null,
        payload.ogDescription || null,
        payload.ogImage || null,
        payload.importSource || "manual",
        payload.imageStatus || "missing",
        payload.status,
        payload.publishedAt || null,
        Boolean(payload.isFeatured),
        id
      ]
    );
  },
  async updateImageById(id, imageUrl) {
    await query(
      `
        UPDATE blog_posts
        SET
          featured_image = $1,
          cover_image = $1,
          image_status = 'uploaded',
          updated_at = NOW()
        WHERE id = $2::uuid
      `,
      [imageUrl, id]
    );
  },
  async publishById(id) {
    await query(
      `
        UPDATE blog_posts
        SET
          status = 'published',
          is_published = TRUE,
          published_at = COALESCE(published_at, NOW()),
          updated_at = NOW()
        WHERE id = $1::uuid
      `,
      [id]
    );
  },
  async findCategories() {
    return query(
      `
        SELECT name
        FROM blog_categories
        ORDER BY name ASC
      `
    );
  },
  async findSocialPublicationsByBlogId(blogId) {
    return query(
      `
        SELECT
          platform,
          social_account_id::text AS "socialAccountId",
          publish_mode AS "publishMode",
          scheduled_at AS "scheduledAt",
          status,
          platform_post_url AS "platformPostUrl",
          caption,
          image_url AS "imageUrl",
          error_message AS "errorMessage",
          auto_share_after_website_publish AS "autoShareAfterWebsitePublish",
          use_featured_image AS "useFeaturedImage"
        FROM blog_social_publications
        WHERE blog_post_id = $1::uuid
      `,
      [blogId]
    );
  },
  async replaceSocialPublications(blogId, distribution = {}) {
    await query(`DELETE FROM blog_social_publications WHERE blog_post_id = $1::uuid`, [blogId]);

    const socialPublishAt = distribution.socialPublishAt || null;
    const publishMode = socialPublishAt ? "scheduled" : "instant";
    const commonImage = distribution.useFeaturedImageForSocial ? null : distribution.socialImageUrl || null;

    if (distribution.shareToLinkedin) {
      await query(
        `
          INSERT INTO blog_social_publications (
            blog_post_id,
            platform,
            social_account_id,
            publish_mode,
            scheduled_at,
            status,
            caption,
            image_url,
            auto_share_after_website_publish,
            use_featured_image
          )
          VALUES ($1::uuid, 'linkedin', NULLIF($2, '')::uuid, $3, $4::timestamptz, 'pending', $5, $6, $7, $8)
        `,
        [
          blogId,
          distribution.linkedinAccountId || "",
          publishMode,
          socialPublishAt,
          distribution.linkedinCaption || "",
          commonImage,
          Boolean(distribution.autoShareAfterWebsitePublish),
          Boolean(distribution.useFeaturedImageForSocial)
        ]
      );
    }

    if (distribution.shareToFacebook) {
      await query(
        `
          INSERT INTO blog_social_publications (
            blog_post_id,
            platform,
            social_account_id,
            publish_mode,
            scheduled_at,
            status,
            caption,
            image_url,
            auto_share_after_website_publish,
            use_featured_image
          )
          VALUES ($1::uuid, 'facebook', NULLIF($2, '')::uuid, $3, $4::timestamptz, 'pending', $5, $6, $7, $8)
        `,
        [
          blogId,
          distribution.facebookAccountId || "",
          publishMode,
          socialPublishAt,
          distribution.facebookCaption || "",
          commonImage,
          Boolean(distribution.autoShareAfterWebsitePublish),
          Boolean(distribution.useFeaturedImageForSocial)
        ]
      );
    }
  },
  async deleteById(id) {
    const rows = await query(
      `
        DELETE FROM blog_posts
        WHERE id = $1::uuid
        RETURNING id::text
      `,
      [id]
    );
    return rows[0] || null;
  }
};

import { query } from "../../config/db.js";

export const portfolioRepository = {
  async findAll() {
    return query(
      `
        SELECT
          id::text,
          title,
          slug,
          short_summary AS "shortSummary",
          description,
          detailed_description AS "detailedDescription",
          category,
          timeline,
          project_start_date::text AS "projectStartDate",
          project_end_date::text AS "projectEndDate",
          project_launch_date::text AS "projectLaunchDate",
          project_duration AS "projectDuration",
          client_satisfaction AS "clientSatisfaction",
          featured_image AS "featuredImage",
          featured_image_alt AS "featuredImageAlt",
          featured_image AS "coverImage",
          gallery_images AS "galleryImages",
          video_url AS "videoUrl",
          demo_url AS "demoUrl",
          live_url AS "liveUrl",
          design_url AS "designUrl",
          document_attachments AS "documentAttachments",
          testimonial_content AS "testimonialContent",
          testimonial_author_name AS "testimonialAuthorName",
          testimonial_author_designation AS "testimonialAuthorDesignation",
          testimonial_author_image AS "testimonialAuthorImage",
          testimonial_rating AS "testimonialRating",
          show_testimonial AS "showTestimonial",
          meta_title AS "metaTitle",
          meta_description AS "metaDescription",
          og_image AS "ogImage",
          seo_keywords AS "seoKeywords",
          canonical_url AS "canonicalUrl",
          noindex AS "noindex",
          show_on_homepage AS "showOnHomepage",
          sort_order AS "sortOrder",
          project_badge AS "projectBadge",
          visibility,
          created_by_user_id::text AS "createdByUserId",
          last_modified_by_user_id::text AS "lastModifiedByUserId",
          view_count AS "viewCount",
          link_click_count AS "linkClickCount",
          tech_stack AS "techStack",
          frontend_technologies AS "frontendTechnologies",
          backend_technologies AS "backendTechnologies",
          database_technologies AS "databaseTechnologies",
          outcome,
          project_type AS "projectType",
          CASE WHEN is_confidential OR NOT show_client_name THEN NULL ELSE client_name END AS "clientName",
          CASE WHEN is_confidential THEN NULL ELSE client_industry END AS "clientIndustry",
          CASE WHEN is_confidential THEN NULL ELSE client_location END AS "clientLocation",
          CASE WHEN is_confidential THEN NULL ELSE client_website END AS "clientWebsite",
          services_provided AS "servicesProvided",
          engagement_type AS "engagementType",
          team_size AS "teamSize",
          project_role AS "projectRole",
          business_problem AS "businessProblem",
          technical_challenges AS "technicalChallenges",
          project_goals AS "projectGoals",
          solution_summary AS "solutionSummary",
          features_delivered AS "featuresDelivered",
          modules_implemented AS "modulesImplemented",
          integrations_used AS "integrationsUsed",
          architecture_overview AS "architectureOverview",
          kpi_metrics AS "kpiMetrics",
          before_value AS "beforeValue",
          after_value AS "afterValue",
          impact_summary AS "impactSummary",
          outcome_description AS "outcomeDescription",
          show_client_name AS "showClientName",
          is_featured AS "isFeatured",
          is_confidential AS "isConfidential"
        FROM portfolio_projects
        WHERE is_published = true
          AND is_archived = false
          AND visibility = 'public'
        ORDER BY sort_order ASC, is_featured DESC, updated_at DESC
      `
    );
  },
  async findHomepageProjects() {
    return query(
      `
        SELECT
          id::text,
          title,
          slug,
          category,
          short_summary AS "shortSummary",
          description,
          tech_stack AS "techStack",
          outcome,
          project_badge AS "projectBadge",
          is_featured AS "isFeatured",
          sort_order AS "sortOrder"
        FROM portfolio_projects
        WHERE is_published = true
          AND is_archived = false
          AND visibility = 'public'
          AND show_on_homepage = true
        ORDER BY sort_order ASC, is_featured DESC, updated_at DESC
      `
    );
  },
  async findBySlug(slug) {
    const rows = await query(
      `
        SELECT
          id::text,
          title,
          slug,
          short_summary AS "shortSummary",
          description,
          detailed_description AS "detailedDescription",
          category,
          timeline,
          project_start_date::text AS "projectStartDate",
          project_end_date::text AS "projectEndDate",
          project_launch_date::text AS "projectLaunchDate",
          project_duration AS "projectDuration",
          client_satisfaction AS "clientSatisfaction",
          featured_image AS "featuredImage",
          featured_image_alt AS "featuredImageAlt",
          featured_image AS "coverImage",
          gallery_images AS "galleryImages",
          video_url AS "videoUrl",
          demo_url AS "demoUrl",
          live_url AS "liveUrl",
          design_url AS "designUrl",
          document_attachments AS "documentAttachments",
          testimonial_content AS "testimonialContent",
          testimonial_author_name AS "testimonialAuthorName",
          testimonial_author_designation AS "testimonialAuthorDesignation",
          testimonial_author_image AS "testimonialAuthorImage",
          testimonial_rating AS "testimonialRating",
          show_testimonial AS "showTestimonial",
          meta_title AS "metaTitle",
          meta_description AS "metaDescription",
          og_image AS "ogImage",
          seo_keywords AS "seoKeywords",
          canonical_url AS "canonicalUrl",
          noindex AS "noindex",
          show_on_homepage AS "showOnHomepage",
          sort_order AS "sortOrder",
          project_badge AS "projectBadge",
          visibility,
          created_by_user_id::text AS "createdByUserId",
          last_modified_by_user_id::text AS "lastModifiedByUserId",
          view_count AS "viewCount",
          link_click_count AS "linkClickCount",
          tech_stack AS "techStack",
          frontend_technologies AS "frontendTechnologies",
          backend_technologies AS "backendTechnologies",
          database_technologies AS "databaseTechnologies",
          outcome,
          project_type AS "projectType",
          CASE WHEN is_confidential OR NOT show_client_name THEN NULL ELSE client_name END AS "clientName",
          CASE WHEN is_confidential THEN NULL ELSE client_industry END AS "clientIndustry",
          CASE WHEN is_confidential THEN NULL ELSE client_location END AS "clientLocation",
          CASE WHEN is_confidential THEN NULL ELSE client_website END AS "clientWebsite",
          services_provided AS "servicesProvided",
          engagement_type AS "engagementType",
          team_size AS "teamSize",
          project_role AS "projectRole",
          business_problem AS "businessProblem",
          technical_challenges AS "technicalChallenges",
          project_goals AS "projectGoals",
          solution_summary AS "solutionSummary",
          features_delivered AS "featuresDelivered",
          modules_implemented AS "modulesImplemented",
          integrations_used AS "integrationsUsed",
          architecture_overview AS "architectureOverview",
          kpi_metrics AS "kpiMetrics",
          before_value AS "beforeValue",
          after_value AS "afterValue",
          impact_summary AS "impactSummary",
          outcome_description AS "outcomeDescription",
          show_client_name AS "showClientName",
          is_featured AS "isFeatured",
          is_confidential AS "isConfidential"
        FROM portfolio_projects
        WHERE slug = $1
          AND is_published = true
          AND is_archived = false
          AND visibility = 'public'
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
          id::text,
          title,
          slug,
          category,
          short_summary AS "shortSummary",
          description,
          detailed_description AS "detailedDescription",
          timeline,
          project_start_date::text AS "projectStartDate",
          project_end_date::text AS "projectEndDate",
          project_launch_date::text AS "projectLaunchDate",
          project_duration AS "projectDuration",
          client_satisfaction AS "clientSatisfaction",
          featured_image AS "featuredImage",
          featured_image_alt AS "featuredImageAlt",
          featured_image AS "coverImage",
          gallery_images AS "galleryImages",
          video_url AS "videoUrl",
          demo_url AS "demoUrl",
          live_url AS "liveUrl",
          design_url AS "designUrl",
          document_attachments AS "documentAttachments",
          testimonial_content AS "testimonialContent",
          testimonial_author_name AS "testimonialAuthorName",
          testimonial_author_designation AS "testimonialAuthorDesignation",
          testimonial_author_image AS "testimonialAuthorImage",
          testimonial_rating AS "testimonialRating",
          show_testimonial AS "showTestimonial",
          meta_title AS "metaTitle",
          meta_description AS "metaDescription",
          og_image AS "ogImage",
          seo_keywords AS "seoKeywords",
          canonical_url AS "canonicalUrl",
          noindex AS "noindex",
          show_on_homepage AS "showOnHomepage",
          sort_order AS "sortOrder",
          project_badge AS "projectBadge",
          visibility,
          created_by_user_id::text AS "createdByUserId",
          last_modified_by_user_id::text AS "lastModifiedByUserId",
          view_count AS "viewCount",
          link_click_count AS "linkClickCount",
          tech_stack AS "techStack",
          frontend_technologies AS "frontendTechnologies",
          backend_technologies AS "backendTechnologies",
          database_technologies AS "databaseTechnologies",
          outcome,
          project_type AS "projectType",
          client_name AS "clientName",
          client_industry AS "clientIndustry",
          client_location AS "clientLocation",
          client_website AS "clientWebsite",
          services_provided AS "servicesProvided",
          engagement_type AS "engagementType",
          team_size AS "teamSize",
          project_role AS "projectRole",
          business_problem AS "businessProblem",
          technical_challenges AS "technicalChallenges",
          project_goals AS "projectGoals",
          solution_summary AS "solutionSummary",
          features_delivered AS "featuresDelivered",
          modules_implemented AS "modulesImplemented",
          integrations_used AS "integrationsUsed",
          architecture_overview AS "architectureOverview",
          kpi_metrics AS "kpiMetrics",
          before_value AS "beforeValue",
          after_value AS "afterValue",
          impact_summary AS "impactSummary",
          outcome_description AS "outcomeDescription",
          show_client_name AS "showClientName",
          is_featured AS "isFeatured",
          is_confidential AS "isConfidential",
          is_published AS "isPublished",
          is_archived AS "isArchived",
          updated_at AS "updatedAt"
        FROM portfolio_projects
        WHERE id = $1::uuid
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
          id::text,
          title,
          slug,
          category,
          short_summary AS "shortSummary",
          description,
          detailed_description AS "detailedDescription",
          timeline,
          project_start_date::text AS "projectStartDate",
          project_end_date::text AS "projectEndDate",
          project_launch_date::text AS "projectLaunchDate",
          project_duration AS "projectDuration",
          client_satisfaction AS "clientSatisfaction",
          featured_image AS "featuredImage",
          featured_image_alt AS "featuredImageAlt",
          featured_image AS "coverImage",
          gallery_images AS "galleryImages",
          video_url AS "videoUrl",
          demo_url AS "demoUrl",
          live_url AS "liveUrl",
          design_url AS "designUrl",
          document_attachments AS "documentAttachments",
          testimonial_content AS "testimonialContent",
          testimonial_author_name AS "testimonialAuthorName",
          testimonial_author_designation AS "testimonialAuthorDesignation",
          testimonial_author_image AS "testimonialAuthorImage",
          testimonial_rating AS "testimonialRating",
          show_testimonial AS "showTestimonial",
          meta_title AS "metaTitle",
          meta_description AS "metaDescription",
          og_image AS "ogImage",
          seo_keywords AS "seoKeywords",
          canonical_url AS "canonicalUrl",
          noindex AS "noindex",
          show_on_homepage AS "showOnHomepage",
          sort_order AS "sortOrder",
          project_badge AS "projectBadge",
          visibility,
          created_by_user_id::text AS "createdByUserId",
          last_modified_by_user_id::text AS "lastModifiedByUserId",
          view_count AS "viewCount",
          link_click_count AS "linkClickCount",
          tech_stack AS "techStack",
          frontend_technologies AS "frontendTechnologies",
          backend_technologies AS "backendTechnologies",
          database_technologies AS "databaseTechnologies",
          outcome,
          project_type AS "projectType",
          client_name AS "clientName",
          client_industry AS "clientIndustry",
          client_location AS "clientLocation",
          client_website AS "clientWebsite",
          services_provided AS "servicesProvided",
          engagement_type AS "engagementType",
          team_size AS "teamSize",
          project_role AS "projectRole",
          business_problem AS "businessProblem",
          technical_challenges AS "technicalChallenges",
          project_goals AS "projectGoals",
          solution_summary AS "solutionSummary",
          features_delivered AS "featuresDelivered",
          modules_implemented AS "modulesImplemented",
          integrations_used AS "integrationsUsed",
          architecture_overview AS "architectureOverview",
          kpi_metrics AS "kpiMetrics",
          before_value AS "beforeValue",
          after_value AS "afterValue",
          impact_summary AS "impactSummary",
          outcome_description AS "outcomeDescription",
          show_client_name AS "showClientName",
          is_featured AS "isFeatured",
          is_confidential AS "isConfidential",
          is_published AS "isPublished",
          is_archived AS "isArchived",
          updated_at AS "updatedAt"
        FROM portfolio_projects
        ORDER BY is_featured DESC, updated_at DESC
      `
    );
  },
  async findAllAdminPaged({ page = 1, pageSize = 10, search = "", category = "", status = "active" }) {
    const offset = (page - 1) * pageSize;
    const params = [];
    const filters = [];

    if (search) {
      params.push(`%${search}%`);
      filters.push(`(
        title ILIKE $${params.length} OR
        COALESCE(category, 'General') ILIKE $${params.length} OR
        COALESCE(short_summary, '') ILIKE $${params.length} OR
        description ILIKE $${params.length} OR
        COALESCE(detailed_description, '') ILIKE $${params.length} OR
        COALESCE(timeline, '') ILIKE $${params.length} OR
        COALESCE(project_duration, '') ILIKE $${params.length} OR
        COALESCE(featured_image_alt, '') ILIKE $${params.length} OR
        COALESCE(video_url, '') ILIKE $${params.length} OR
        COALESCE(demo_url, '') ILIKE $${params.length} OR
        COALESCE(live_url, '') ILIKE $${params.length} OR
        COALESCE(design_url, '') ILIKE $${params.length} OR
        COALESCE(testimonial_author_name, '') ILIKE $${params.length} OR
        COALESCE(testimonial_author_designation, '') ILIKE $${params.length} OR
        COALESCE(meta_title, '') ILIKE $${params.length} OR
        COALESCE(meta_description, '') ILIKE $${params.length} OR
        COALESCE(canonical_url, '') ILIKE $${params.length} OR
        COALESCE(project_badge, '') ILIKE $${params.length} OR
        visibility ILIKE $${params.length} OR
        COALESCE(client_satisfaction, '') ILIKE $${params.length} OR
        COALESCE(project_type, '') ILIKE $${params.length} OR
        COALESCE(client_name, '') ILIKE $${params.length} OR
        COALESCE(client_industry, '') ILIKE $${params.length} OR
        COALESCE(client_location, '') ILIKE $${params.length} OR
        COALESCE(client_website, '') ILIKE $${params.length} OR
        COALESCE(engagement_type, '') ILIKE $${params.length} OR
        COALESCE(project_role, '') ILIKE $${params.length} OR
        COALESCE(business_problem, '') ILIKE $${params.length} OR
        COALESCE(technical_challenges, '') ILIKE $${params.length} OR
        COALESCE(project_goals, '') ILIKE $${params.length} OR
        COALESCE(solution_summary, '') ILIKE $${params.length} OR
        COALESCE(architecture_overview, '') ILIKE $${params.length} OR
        COALESCE(before_value, '') ILIKE $${params.length} OR
        COALESCE(after_value, '') ILIKE $${params.length} OR
        COALESCE(impact_summary, '') ILIKE $${params.length} OR
        COALESCE(outcome_description, '') ILIKE $${params.length} OR
        outcome ILIKE $${params.length} OR
        array_to_string(services_provided, ', ') ILIKE $${params.length} OR
        array_to_string(features_delivered, ', ') ILIKE $${params.length} OR
        array_to_string(modules_implemented, ', ') ILIKE $${params.length} OR
        array_to_string(integrations_used, ', ') ILIKE $${params.length} OR
        array_to_string(frontend_technologies, ', ') ILIKE $${params.length} OR
        array_to_string(backend_technologies, ', ') ILIKE $${params.length} OR
        array_to_string(database_technologies, ', ') ILIKE $${params.length} OR
        array_to_string(tech_stack, ', ') ILIKE $${params.length}
      )`);
    }

    if (category) {
      params.push(category);
      filters.push(`COALESCE(category, 'General') = $${params.length}`);
    }

    if (status === "published") {
      filters.push("is_archived = false AND is_published = true");
    } else if (status === "draft") {
      filters.push("is_archived = false AND is_published = false");
    } else if (status === "archived") {
      filters.push("is_archived = true");
    } else if (status === "all") {
      // no status filter
    } else {
      filters.push("is_archived = false");
    }

    const whereSql = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    params.push(pageSize, offset);

    const dataRows = await query(
      `
        SELECT
          id::text,
          title,
          slug,
          category,
          short_summary AS "shortSummary",
          description,
          detailed_description AS "detailedDescription",
          timeline,
          project_start_date::text AS "projectStartDate",
          project_end_date::text AS "projectEndDate",
          project_launch_date::text AS "projectLaunchDate",
          project_duration AS "projectDuration",
          client_satisfaction AS "clientSatisfaction",
          featured_image AS "featuredImage",
          featured_image_alt AS "featuredImageAlt",
          featured_image AS "coverImage",
          gallery_images AS "galleryImages",
          video_url AS "videoUrl",
          demo_url AS "demoUrl",
          live_url AS "liveUrl",
          design_url AS "designUrl",
          document_attachments AS "documentAttachments",
          testimonial_content AS "testimonialContent",
          testimonial_author_name AS "testimonialAuthorName",
          testimonial_author_designation AS "testimonialAuthorDesignation",
          testimonial_author_image AS "testimonialAuthorImage",
          testimonial_rating AS "testimonialRating",
          show_testimonial AS "showTestimonial",
          meta_title AS "metaTitle",
          meta_description AS "metaDescription",
          og_image AS "ogImage",
          seo_keywords AS "seoKeywords",
          canonical_url AS "canonicalUrl",
          noindex AS "noindex",
          show_on_homepage AS "showOnHomepage",
          sort_order AS "sortOrder",
          project_badge AS "projectBadge",
          visibility,
          created_by_user_id::text AS "createdByUserId",
          last_modified_by_user_id::text AS "lastModifiedByUserId",
          view_count AS "viewCount",
          link_click_count AS "linkClickCount",
          tech_stack AS "techStack",
          frontend_technologies AS "frontendTechnologies",
          backend_technologies AS "backendTechnologies",
          database_technologies AS "databaseTechnologies",
          outcome,
          project_type AS "projectType",
          client_name AS "clientName",
          client_industry AS "clientIndustry",
          client_location AS "clientLocation",
          client_website AS "clientWebsite",
          services_provided AS "servicesProvided",
          engagement_type AS "engagementType",
          team_size AS "teamSize",
          project_role AS "projectRole",
          business_problem AS "businessProblem",
          technical_challenges AS "technicalChallenges",
          project_goals AS "projectGoals",
          solution_summary AS "solutionSummary",
          features_delivered AS "featuresDelivered",
          modules_implemented AS "modulesImplemented",
          integrations_used AS "integrationsUsed",
          architecture_overview AS "architectureOverview",
          kpi_metrics AS "kpiMetrics",
          before_value AS "beforeValue",
          after_value AS "afterValue",
          impact_summary AS "impactSummary",
          outcome_description AS "outcomeDescription",
          show_client_name AS "showClientName",
          is_featured AS "isFeatured",
          is_confidential AS "isConfidential",
          is_published AS "isPublished",
          is_archived AS "isArchived",
          updated_at AS "updatedAt"
        FROM portfolio_projects
        ${whereSql}
        ORDER BY sort_order ASC, is_featured DESC, updated_at DESC
        LIMIT $${params.length - 1}
        OFFSET $${params.length}
      `,
      params
    );

    const countParams = params.slice(0, -2);
    const countRows = await query(
      `
        SELECT COUNT(*)::int AS total
        FROM portfolio_projects
        ${whereSql}
      `,
      countParams
    );

    return { items: dataRows, total: countRows[0]?.total || 0 };
  },
  async findBySlugAny(slug) {
    const rows = await query(
      `
        SELECT id::text
        FROM portfolio_projects
        WHERE slug = $1
        LIMIT 1
      `,
      [slug]
    );

    return rows[0] || null;
  },
  async create(payload) {
    const rows = await query(
      `
        INSERT INTO portfolio_projects (
          title,
          slug,
          category,
          short_summary,
          description,
          detailed_description,
          timeline,
          project_start_date,
          project_end_date,
          project_launch_date,
          project_duration,
          client_satisfaction,
          tech_stack,
          featured_image_alt,
          gallery_images,
          video_url,
          demo_url,
          live_url,
          design_url,
          document_attachments,
          testimonial_content,
          testimonial_author_name,
          testimonial_author_designation,
          testimonial_author_image,
          testimonial_rating,
          show_testimonial,
          meta_title,
          meta_description,
          og_image,
          seo_keywords,
          canonical_url,
          noindex,
          show_on_homepage,
          sort_order,
          project_badge,
          visibility,
          created_by_user_id,
          last_modified_by_user_id,
          view_count,
          link_click_count,
          frontend_technologies,
          backend_technologies,
          database_technologies,
          outcome,
          project_type,
          client_name,
          client_industry,
          client_location,
          client_website,
          show_client_name,
          services_provided,
          engagement_type,
          team_size,
          project_role,
          business_problem,
          technical_challenges,
          project_goals,
          solution_summary,
          features_delivered,
          modules_implemented,
          integrations_used,
          architecture_overview,
          kpi_metrics,
          before_value,
          after_value,
          impact_summary,
          outcome_description,
          featured_image,
          is_featured,
          is_confidential,
          is_published,
          is_archived
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15::jsonb, $16, $17, $18, $19, $20::jsonb, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30::text[], $31, $32, $33, $34, $35, $36, $37::uuid, $38::uuid, $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, $61, $62, $63::jsonb, $64, $65, $66, $67, $68, $69, $70, $71, $72)
        RETURNING id::text
      `,
      [
        payload.title,
        payload.slug,
        payload.category,
        payload.shortSummary || null,
        payload.description,
        payload.detailedDescription || null,
        payload.timeline || null,
        payload.projectStartDate || null,
        payload.projectEndDate || null,
        payload.projectLaunchDate || null,
        payload.projectDuration || null,
        payload.clientSatisfaction || null,
        payload.techStack,
        payload.featuredImageAlt || null,
        JSON.stringify(payload.galleryImages || []),
        payload.videoUrl || null,
        payload.demoUrl || null,
        payload.liveUrl || null,
        payload.designUrl || null,
        JSON.stringify(payload.documentAttachments || []),
        payload.testimonialContent || null,
        payload.testimonialAuthorName || null,
        payload.testimonialAuthorDesignation || null,
        payload.testimonialAuthorImage || null,
        payload.testimonialRating || null,
        Boolean(payload.showTestimonial),
        payload.metaTitle || null,
        payload.metaDescription || null,
        payload.ogImage || null,
        payload.seoKeywords || [],
        payload.canonicalUrl || null,
        Boolean(payload.noindex),
        Boolean(payload.showOnHomepage),
        payload.sortOrder ?? 9999,
        payload.projectBadge || null,
        payload.visibility || "public",
        payload.createdByUserId || null,
        payload.lastModifiedByUserId || null,
        payload.viewCount || 0,
        payload.linkClickCount || 0,
        payload.frontendTechnologies || [],
        payload.backendTechnologies || [],
        payload.databaseTechnologies || [],
        payload.outcome || null,
        payload.projectType || null,
        payload.clientName || null,
        payload.clientIndustry || null,
        payload.clientLocation || null,
        payload.clientWebsite || null,
        Boolean(payload.showClientName),
        payload.servicesProvided || [],
        payload.engagementType || null,
        payload.teamSize || null,
        payload.projectRole || null,
        payload.businessProblem || null,
        payload.technicalChallenges || null,
        payload.projectGoals || null,
        payload.solutionSummary || null,
        payload.featuresDelivered || [],
        payload.modulesImplemented || [],
        payload.integrationsUsed || [],
        payload.architectureOverview || null,
        JSON.stringify(payload.kpiMetrics || []),
        payload.beforeValue || null,
        payload.afterValue || null,
        payload.impactSummary || null,
        payload.outcomeDescription || null,
        payload.featuredImage || null,
        Boolean(payload.isFeatured),
        Boolean(payload.isConfidential),
        payload.isPublished,
        Boolean(payload.isArchived)
      ]
    );

    return rows[0] || null;
  },
  async updateById(id, payload) {
    const rows = await query(
      `
        UPDATE portfolio_projects
        SET
          title = $1,
          slug = $2,
          category = $3,
          short_summary = $4,
          description = $5,
          detailed_description = $6,
          timeline = $7,
          project_start_date = $8,
          project_end_date = $9,
          project_launch_date = $10,
          project_duration = $11,
          client_satisfaction = $12,
          tech_stack = $13,
          featured_image_alt = $14,
          gallery_images = $15::jsonb,
          video_url = $16,
          demo_url = $17,
          live_url = $18,
          design_url = $19,
          document_attachments = $20::jsonb,
          testimonial_content = $21,
          testimonial_author_name = $22,
          testimonial_author_designation = $23,
          testimonial_author_image = $24,
          testimonial_rating = $25,
          show_testimonial = $26,
          meta_title = $27,
          meta_description = $28,
          og_image = $29,
          seo_keywords = $30::text[],
          canonical_url = $31,
          noindex = $32,
          show_on_homepage = $33,
          sort_order = $34,
          project_badge = $35,
          visibility = $36,
          last_modified_by_user_id = $37::uuid,
          frontend_technologies = $38,
          backend_technologies = $39,
          database_technologies = $40,
          outcome = $41,
          project_type = $42,
          client_name = $43,
          client_industry = $44,
          client_location = $45,
          client_website = $46,
          show_client_name = $47,
          services_provided = $48,
          engagement_type = $49,
          team_size = $50,
          project_role = $51,
          business_problem = $52,
          technical_challenges = $53,
          project_goals = $54,
          solution_summary = $55,
          features_delivered = $56,
          modules_implemented = $57,
          integrations_used = $58,
          architecture_overview = $59,
          kpi_metrics = $60::jsonb,
          before_value = $61,
          after_value = $62,
          impact_summary = $63,
          outcome_description = $64,
          featured_image = $65,
          is_featured = $66,
          is_confidential = $67,
          is_published = $68,
          is_archived = $69,
          updated_at = NOW()
        WHERE id = $70::uuid
        RETURNING id::text
      `,
      [
        payload.title,
        payload.slug,
        payload.category,
        payload.shortSummary || null,
        payload.description,
        payload.detailedDescription || null,
        payload.timeline || null,
        payload.projectStartDate || null,
        payload.projectEndDate || null,
        payload.projectLaunchDate || null,
        payload.projectDuration || null,
        payload.clientSatisfaction || null,
        payload.techStack,
        payload.featuredImageAlt || null,
        JSON.stringify(payload.galleryImages || []),
        payload.videoUrl || null,
        payload.demoUrl || null,
        payload.liveUrl || null,
        payload.designUrl || null,
        JSON.stringify(payload.documentAttachments || []),
        payload.testimonialContent || null,
        payload.testimonialAuthorName || null,
        payload.testimonialAuthorDesignation || null,
        payload.testimonialAuthorImage || null,
        payload.testimonialRating || null,
        Boolean(payload.showTestimonial),
        payload.metaTitle || null,
        payload.metaDescription || null,
        payload.ogImage || null,
        payload.seoKeywords || [],
        payload.canonicalUrl || null,
        Boolean(payload.noindex),
        Boolean(payload.showOnHomepage),
        payload.sortOrder ?? 9999,
        payload.projectBadge || null,
        payload.visibility || "public",
        payload.lastModifiedByUserId || null,
        payload.frontendTechnologies || [],
        payload.backendTechnologies || [],
        payload.databaseTechnologies || [],
        payload.outcome || null,
        payload.projectType || null,
        payload.clientName || null,
        payload.clientIndustry || null,
        payload.clientLocation || null,
        payload.clientWebsite || null,
        Boolean(payload.showClientName),
        payload.servicesProvided || [],
        payload.engagementType || null,
        payload.teamSize || null,
        payload.projectRole || null,
        payload.businessProblem || null,
        payload.technicalChallenges || null,
        payload.projectGoals || null,
        payload.solutionSummary || null,
        payload.featuresDelivered || [],
        payload.modulesImplemented || [],
        payload.integrationsUsed || [],
        payload.architectureOverview || null,
        JSON.stringify(payload.kpiMetrics || []),
        payload.beforeValue || null,
        payload.afterValue || null,
        payload.impactSummary || null,
        payload.outcomeDescription || null,
        payload.featuredImage || null,
        Boolean(payload.isFeatured),
        Boolean(payload.isConfidential),
        payload.isPublished,
        Boolean(payload.isArchived),
        id
      ]
    );

    return rows[0] || null;
  },
  async updateImageById(id, imageUrl) {
    const rows = await query(
      `
        UPDATE portfolio_projects
        SET
          featured_image = $1,
          updated_at = NOW()
        WHERE id = $2::uuid
        RETURNING id::text
      `,
      [imageUrl, id]
    );

    return rows[0] || null;
  },
  async deleteById(id) {
    const rows = await query(
      `
        DELETE FROM portfolio_projects
        WHERE id = $1::uuid
        RETURNING id::text
      `,
      [id]
    );

    return rows[0] || null;
  },
  async setArchiveById(id, isArchived) {
    const rows = await query(
      `
        UPDATE portfolio_projects
        SET
          is_archived = $1,
          updated_at = NOW()
        WHERE id = $2::uuid
        RETURNING id::text
      `,
      [isArchived, id]
    );

    return rows[0] || null;
  },
  async setPublishByIds(ids = [], isPublished) {
    if (!ids.length) return [];

    return query(
      `
        UPDATE portfolio_projects
        SET
          is_published = $1,
          updated_at = NOW()
        WHERE id = ANY($2::uuid[])
        RETURNING id::text
      `,
      [isPublished, ids]
    );
  },
  async incrementViewCountBySlug(slug) {
    await query(
      `
        UPDATE portfolio_projects
        SET view_count = view_count + 1
        WHERE slug = $1
      `,
      [slug]
    );
  },
  async insertViewEventBySlug(slug) {
    await query(
      `
        INSERT INTO portfolio_view_events (portfolio_project_id)
        SELECT id
        FROM portfolio_projects
        WHERE slug = $1
          AND is_published = true
          AND is_archived = false
          AND visibility = 'public'
        LIMIT 1
      `,
      [slug]
    );
  },
  async incrementLinkClickCountById(id) {
    await query(
      `
        UPDATE portfolio_projects
        SET link_click_count = link_click_count + 1
        WHERE id = $1::uuid
      `,
      [id]
    );
  },
  async insertLinkClickEvent(projectId, payload) {
    await query(
      `
        INSERT INTO portfolio_link_click_events (portfolio_project_id, link_type, target_url)
        VALUES ($1::uuid, $2, $3)
      `,
      [projectId, payload.linkType, payload.targetUrl]
    );
  },
  async getPerformanceMetrics({ from = "", to = "" }) {
    const params = [];
    const filters = [];

    if (from) {
      params.push(`${from}T00:00:00Z`);
      filters.push(`created_at >= $${params.length}::timestamptz`);
    }

    if (to) {
      params.push(`${to}T23:59:59Z`);
      filters.push(`created_at <= $${params.length}::timestamptz`);
    }

    const whereSql = filters.length ? `WHERE ${filters.join(" AND ")}` : "";

    const clickRows = await query(
      `
        SELECT COUNT(*)::int AS total
        FROM portfolio_link_click_events
        ${whereSql}
      `,
      params
    );

    const viewRows =
      filters.length > 0
        ? await query(
            `
              SELECT COUNT(*)::int AS total
              FROM portfolio_view_events
              ${whereSql}
            `,
            params
          )
        : await query(
            `
              SELECT
                COALESCE(
                  NULLIF((SELECT COUNT(*)::int FROM portfolio_view_events), 0),
                  (SELECT COALESCE(SUM(view_count), 0)::int FROM portfolio_projects)
                ) AS total
            `
          );

    const topProjects =
      filters.length > 0
        ? await query(
            `
              WITH view_totals AS (
                SELECT
                  portfolio_project_id,
                  COUNT(*)::int AS view_count
                FROM portfolio_view_events
                ${whereSql}
                GROUP BY portfolio_project_id
              ),
              click_totals AS (
                SELECT
                  portfolio_project_id,
                  COUNT(*)::int AS link_click_count
                FROM portfolio_link_click_events
                ${whereSql}
                GROUP BY portfolio_project_id
              )
              SELECT
                p.id::text,
                p.title,
                p.slug,
                COALESCE(v.view_count, 0) AS "viewCount",
                COALESCE(c.link_click_count, 0) AS "linkClickCount"
              FROM portfolio_projects p
              LEFT JOIN view_totals v ON v.portfolio_project_id = p.id
              LEFT JOIN click_totals c ON c.portfolio_project_id = p.id
              WHERE COALESCE(v.view_count, 0) > 0 OR COALESCE(c.link_click_count, 0) > 0
              ORDER BY COALESCE(v.view_count, 0) DESC, COALESCE(c.link_click_count, 0) DESC, p.updated_at DESC
              LIMIT 10
            `,
            params
          )
        : await query(
            `
              SELECT
                id::text,
                title,
                slug,
                view_count AS "viewCount",
                link_click_count AS "linkClickCount"
              FROM portfolio_projects
              ORDER BY view_count DESC, link_click_count DESC, updated_at DESC
              LIMIT 10
            `
          );

    return {
      totalViews: viewRows[0]?.total || 0,
      totalLinkClicks: clickRows[0]?.total || 0,
      topProjects
    };
  },
  async deleteByIds(ids = []) {
    if (!ids.length) return [];

    return query(
      `
        DELETE FROM portfolio_projects
        WHERE id = ANY($1::uuid[])
        RETURNING id::text
      `,
      [ids]
    );
  }
};

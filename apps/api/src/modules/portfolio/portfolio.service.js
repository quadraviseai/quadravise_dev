import { slugify } from "../../utils/slugify.js";

import { portfolioRepository } from "./portfolio.repository.js";

export const portfolioService = {
  calculateProjectDuration(startDate, endDate) {
    if (!startDate || !endDate) return "";

    const start = new Date(`${startDate}T00:00:00Z`);
    const end = new Date(`${endDate}T00:00:00Z`);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
      return "";
    }

    const dayDiff = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (dayDiff >= 90) {
      const months = Math.round(dayDiff / 30);
      return `${months} month${months === 1 ? "" : "s"}`;
    }

    if (dayDiff >= 7) {
      const weeks = Math.round(dayDiff / 7);
      return `${weeks} week${weeks === 1 ? "" : "s"}`;
    }

    return `${dayDiff} day${dayDiff === 1 ? "" : "s"}`;
  },
  normalizeStringArray(value) {
    const source = Array.isArray(value)
      ? value
      : String(value || "")
          .split(",");

    const seen = new Set();

    return source
      .map((item) => String(item || "").trim())
      .filter(Boolean)
      .filter((item) => {
        const key = item.toLowerCase();
        if (seen.has(key)) {
          return false;
        }
        seen.add(key);
        return true;
      });
  },
  buildCombinedTechStack(payload = {}) {
    return this.normalizeStringArray([
      ...(payload.techStack || []),
      ...(payload.frontendTechnologies || []),
      ...(payload.backendTechnologies || []),
      ...(payload.databaseTechnologies || [])
    ]);
  },
  createMediaId(prefix) {
    return `${prefix}-${Date.now()}-${Math.round(Math.random() * 1e6)}`;
  },
  async resolveSlug({ slug = "", title = "", slugManuallyEdited = false, excludeId = null } = {}) {
    const baseSlug = slugify(String(slug || title || "").trim());

    if (!baseSlug) {
      return "";
    }

    if (slugManuallyEdited) {
      const existing = await portfolioRepository.findBySlugAny(baseSlug);
      if (existing && existing.id !== excludeId) {
        const error = new Error("Slug already exists");
        error.code = "23505";
        error.constraint = "portfolio_projects_slug_key";
        throw error;
      }
      return baseSlug;
    }

    let candidate = baseSlug;
    let index = 2;

    while (true) {
      const existing = await portfolioRepository.findBySlugAny(candidate);
      if (!existing || existing.id === excludeId) {
        return candidate;
      }
      candidate = `${baseSlug}-${index}`;
      index += 1;
    }
  },
  normalizeProjectPayload(payload = {}) {
    const normalizedPayload = {
      title: String(payload.title || "").trim(),
      slug: String(payload.slug || "").trim(),
      slugManuallyEdited: Boolean(payload.slugManuallyEdited),
      category: String(payload.category || "General").trim() || "General",
      shortSummary: String(payload.shortSummary || payload.short_summary || "").trim(),
      description: String(payload.description || "").trim(),
      detailedDescription: String(payload.detailedDescription || payload.detailed_description || "").trim(),
      techStack: this.normalizeStringArray(payload.techStack ?? payload.tech_stack),
      frontendTechnologies: this.normalizeStringArray(payload.frontendTechnologies ?? payload.frontend_technologies),
      backendTechnologies: this.normalizeStringArray(payload.backendTechnologies ?? payload.backend_technologies),
      databaseTechnologies: this.normalizeStringArray(payload.databaseTechnologies ?? payload.database_technologies),
      timeline: String(payload.timeline || "").trim(),
      projectStartDate: String(payload.projectStartDate || payload.project_start_date || "").trim(),
      projectEndDate: String(payload.projectEndDate || payload.project_end_date || "").trim(),
      projectLaunchDate: String(payload.projectLaunchDate || payload.project_launch_date || "").trim(),
      projectDuration: "",
      clientSatisfaction: String(payload.clientSatisfaction || payload.client_satisfaction || "").trim(),
      outcome: String(payload.outcome || "").trim(),
      featuredImageAlt: String(payload.featuredImageAlt || payload.featured_image_alt || "").trim(),
      galleryImages: Array.isArray(payload.galleryImages || payload.gallery_images)
        ? (payload.galleryImages || payload.gallery_images)
            .map((item) => ({
              id: String(item?.id || this.createMediaId("gallery")).trim(),
              url: String(item?.url || "").trim(),
              relativeUrl: String(item?.relativeUrl || item?.relative_url || "").trim(),
              altText: String(item?.altText || item?.alt_text || "").trim()
            }))
            .filter((item) => item.url)
        : [],
      videoUrl: String(payload.videoUrl || payload.video_url || "").trim(),
      demoUrl: String(payload.demoUrl || payload.demo_url || "").trim(),
      liveUrl: String(payload.liveUrl || payload.live_url || "").trim(),
      designUrl: String(payload.designUrl || payload.design_url || "").trim(),
      documentAttachments: Array.isArray(payload.documentAttachments || payload.document_attachments)
        ? (payload.documentAttachments || payload.document_attachments)
            .map((item) => ({
              id: String(item?.id || this.createMediaId("document")).trim(),
              title: String(item?.title || item?.fileName || item?.file_name || "").trim(),
              url: String(item?.url || "").trim(),
              relativeUrl: String(item?.relativeUrl || item?.relative_url || "").trim(),
              fileName: String(item?.fileName || item?.file_name || "").trim()
            }))
            .filter((item) => item.title && item.url)
        : [],
      testimonialContent: String(payload.testimonialContent || payload.testimonial_content || "").trim(),
      testimonialAuthorName: String(payload.testimonialAuthorName || payload.testimonial_author_name || "").trim(),
      testimonialAuthorDesignation: String(payload.testimonialAuthorDesignation || payload.testimonial_author_designation || "").trim(),
      testimonialAuthorImage: String(payload.testimonialAuthorImage || payload.testimonial_author_image || "").trim(),
      testimonialRating:
        payload.testimonialRating == null || payload.testimonialRating === ""
          ? null
          : Number.parseInt(String(payload.testimonialRating), 10),
      showTestimonial: Boolean(payload.showTestimonial ?? payload.show_testimonial ?? false),
      metaTitle: String(payload.metaTitle || payload.meta_title || "").trim(),
      metaDescription: String(payload.metaDescription || payload.meta_description || "").trim(),
      ogImage: String(payload.ogImage || payload.og_image || "").trim(),
      seoKeywords: this.normalizeStringArray(payload.seoKeywords ?? payload.seo_keywords),
      canonicalUrl: String(payload.canonicalUrl || payload.canonical_url || "").trim(),
      noindex: Boolean(payload.noindex ?? false),
      showOnHomepage: Boolean(payload.showOnHomepage ?? payload.show_on_homepage ?? false),
      sortOrder:
        payload.sortOrder == null || payload.sortOrder === ""
          ? 9999
          : Number.parseInt(String(payload.sortOrder), 10),
      projectBadge: String(payload.projectBadge || payload.project_badge || "").trim(),
      visibility: String(payload.visibility || "public").trim().toLowerCase() || "public",
      projectType: String(payload.projectType || payload.project_type || "").trim(),
      clientName: String(payload.clientName || payload.client_name || "").trim(),
      clientIndustry: String(payload.clientIndustry || payload.client_industry || "").trim(),
      clientLocation: String(payload.clientLocation || payload.client_location || "").trim(),
      clientWebsite: String(payload.clientWebsite || payload.client_website || "").trim(),
      showClientName: Boolean(payload.showClientName ?? payload.show_client_name ?? true),
      servicesProvided: this.normalizeStringArray(payload.servicesProvided ?? payload.services_provided),
      engagementType: String(payload.engagementType || payload.engagement_type || "").trim(),
      teamSize:
        payload.teamSize == null || payload.teamSize === ""
          ? null
          : Number.parseInt(String(payload.teamSize), 10),
      projectRole: String(payload.projectRole || payload.project_role || "").trim(),
      businessProblem: String(payload.businessProblem || payload.business_problem || "").trim(),
      technicalChallenges: String(payload.technicalChallenges || payload.technical_challenges || "").trim(),
      projectGoals: String(payload.projectGoals || payload.project_goals || "").trim(),
      solutionSummary: String(payload.solutionSummary || payload.solution_summary || "").trim(),
      featuresDelivered: this.normalizeStringArray(payload.featuresDelivered ?? payload.features_delivered),
      modulesImplemented: this.normalizeStringArray(payload.modulesImplemented ?? payload.modules_implemented),
      integrationsUsed: this.normalizeStringArray(payload.integrationsUsed ?? payload.integrations_used),
      architectureOverview: String(payload.architectureOverview || payload.architecture_overview || "").trim(),
      kpiMetrics: Array.isArray(payload.kpiMetrics || payload.kpi_metrics)
        ? (payload.kpiMetrics || payload.kpi_metrics)
            .map((item) => ({
              label: String(item?.label || "").trim(),
              value: String(item?.value || "").trim()
            }))
            .filter((item) => item.label && item.value)
        : [],
      beforeValue: String(payload.beforeValue || payload.before_value || "").trim(),
      afterValue: String(payload.afterValue || payload.after_value || "").trim(),
      impactSummary: String(payload.impactSummary || payload.impact_summary || "").trim(),
      outcomeDescription: String(payload.outcomeDescription || payload.outcome_description || "").trim(),
      featuredImage: String(payload.featuredImage || payload.featured_image || payload.coverImage || "").trim(),
      createdByUserId: String(payload.createdByUserId || payload.created_by_user_id || "").trim(),
      lastModifiedByUserId: String(payload.lastModifiedByUserId || payload.last_modified_by_user_id || "").trim(),
      viewCount:
        payload.viewCount == null || payload.viewCount === ""
          ? 0
          : Number.parseInt(String(payload.viewCount), 10),
      linkClickCount:
        payload.linkClickCount == null || payload.linkClickCount === ""
          ? 0
          : Number.parseInt(String(payload.linkClickCount), 10),
      isFeatured: Boolean(payload.isFeatured ?? payload.is_featured ?? false),
      isConfidential: Boolean(payload.isConfidential ?? payload.is_confidential ?? false),
      isPublished: Boolean(payload.isPublished ?? payload.is_published ?? false),
      isArchived: Boolean(payload.isArchived ?? payload.is_archived ?? false)
    };

    normalizedPayload.projectDuration = this.calculateProjectDuration(
      normalizedPayload.projectStartDate,
      normalizedPayload.projectEndDate
    );

    normalizedPayload.techStack = this.buildCombinedTechStack(normalizedPayload);

    return normalizedPayload;
  },
  async getProjects() {
    return portfolioRepository.findAll();
  },
  async getHomepageProjects() {
    return portfolioRepository.findHomepageProjects();
  },
  async getProjectBySlug(slug) {
    return portfolioRepository.findBySlug(slug);
  },
  async getProjectsAdmin() {
    return portfolioRepository.findAllAdmin();
  },
  async getProjectByIdAdmin(id) {
    return portfolioRepository.findByIdAdmin(id);
  },
  async getProjectsAdminPaged({ page, pageSize, search, category, status }) {
    return portfolioRepository.findAllAdminPaged({ page, pageSize, search, category, status });
  },
  async createProject(payload, actor = {}) {
    const normalizedPayload = this.normalizeProjectPayload(payload);
    const slug = await this.resolveSlug(normalizedPayload);
    const created = await portfolioRepository.create({
      ...normalizedPayload,
      slug,
      createdByUserId: actor.managedUserId || null,
      lastModifiedByUserId: actor.managedUserId || null
    });
    return created ? portfolioRepository.findByIdAdmin(created.id) : null;
  },
  async updateProject(id, payload, actor = {}) {
    const normalizedPayload = this.normalizeProjectPayload(payload);
    const slug = await this.resolveSlug({ ...normalizedPayload, excludeId: id });
    const updated = await portfolioRepository.updateById(id, {
      ...normalizedPayload,
      slug,
      lastModifiedByUserId: actor.managedUserId || null
    });
    return updated ? portfolioRepository.findByIdAdmin(id) : null;
  },
  async importProjectJson(payload, actor = {}) {
    return this.createProject(payload, actor);
  },
  async duplicateProject(id) {
    const project = await portfolioRepository.findByIdAdmin(id);
    if (!project) return null;

    const normalizedPayload = this.normalizeProjectPayload({
      ...project,
      title: `${project.title} (Copy)`,
      slug: "",
      slugManuallyEdited: false,
      isPublished: false,
      isArchived: false
    });
    const slug = await this.resolveSlug(normalizedPayload);
    const created = await portfolioRepository.create({ ...normalizedPayload, slug });
    return created ? portfolioRepository.findByIdAdmin(created.id) : null;
  },
  async uploadProjectImage(id, imageUrl) {
    const updated = await portfolioRepository.updateImageById(id, imageUrl);
    return updated ? portfolioRepository.findByIdAdmin(id) : null;
  },
  async incrementProjectView(slug) {
    await portfolioRepository.incrementViewCountBySlug(slug);
    await portfolioRepository.insertViewEventBySlug(slug);
  },
  async trackLinkClick(slug, payload) {
    const project = await portfolioRepository.findBySlug(slug);
    if (!project) return null;

    await portfolioRepository.insertLinkClickEvent(project.id, payload);
    await portfolioRepository.incrementLinkClickCountById(project.id);
    return { success: true };
  },
  async getPerformanceMetrics({ from, to }) {
    return portfolioRepository.getPerformanceMetrics({ from, to });
  },
  async setArchiveState(id, isArchived) {
    const updated = await portfolioRepository.setArchiveById(id, isArchived);
    return updated ? portfolioRepository.findByIdAdmin(id) : null;
  },
  async bulkDelete(ids) {
    return portfolioRepository.deleteByIds(ids);
  },
  async bulkSetPublishState(ids, isPublished) {
    return portfolioRepository.setPublishByIds(ids, isPublished);
  },
  async deleteProject(id) {
    return portfolioRepository.deleteById(id);
  }
};

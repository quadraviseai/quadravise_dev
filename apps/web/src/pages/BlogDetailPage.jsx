import { Card, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";

import BlogArticleCTA from "../components/blog/BlogArticleCTA";
import ErrorState from "../components/common/ErrorState";
import SEOHead from "../components/seo/SEOHead";
import { seoKeywords, siteUrl } from "../constants/seo";
import { useBlogBySlug } from "../hooks/useBlogs";

function escapeRegExp(value = "") {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getRenderedBlogContent(blog) {
  const content = blog?.content || "<p>No content available.</p>";
  const title = String(blog?.title || "").trim();
  if (!title) return content;

  const titlePattern = escapeRegExp(title);
  return content.replace(
    new RegExp(
      `^\\s*<h1[^>]*>\\s*(?:<strong>)?\\s*${titlePattern}\\s*(?:<\\/strong>)?\\s*<\\/h1>\\s*`,
      "i"
    ),
    ""
  );
}

function formatPublishedDate(value) {
  if (!value) return "New article";
  return new Date(value).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function BlogDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError, refetch } = useBlogBySlug(slug);
  const blog = data?.data;
  const canonical = blog?.canonicalUrl || (slug ? `${siteUrl}/blog/${slug}` : undefined);
  const coverImage = blog?.coverImage || blog?.featuredImage;

  return (
    <>
      <SEOHead
        title={blog?.metaTitle || (blog ? `Quadravise | ${blog.title}` : "Quadravise | Blog Detail")}
        description={blog?.metaDescription || blog?.excerpt}
        keywords={seoKeywords.blogDetail}
        canonical={canonical}
        ogTitle={blog?.ogTitle || blog?.metaTitle || blog?.title}
        ogDescription={blog?.ogDescription || blog?.metaDescription || blog?.excerpt}
        ogImage={blog?.ogImage || blog?.coverImage || blog?.featuredImage}
      />
      <section className="section blog-detail-hero-section">
        <div className="section-inner">
          <div className="blog-detail-hero-shell">
            <div className="blog-detail-hero-copy">
              <div className="blog-detail-meta-row">
                {blog?.category ? <span className="blog-detail-meta-pill">{blog.category}</span> : null}
                <span className="blog-detail-meta-text">{formatPublishedDate(blog?.publishedAt)}</span>
                <span className="blog-detail-meta-separator">&bull;</span>
                <span className="blog-detail-meta-text">{blog?.readingTime || "5 min read"}</span>
              </div>
              <Typography.Title className="blog-detail-hero-title">{blog?.title || "Blog Detail"}</Typography.Title>
              <Typography.Paragraph className="blog-detail-hero-description">
                {blog?.excerpt || "Article details"}
              </Typography.Paragraph>
            </div>
            <div className="blog-detail-hero-panel">
              <div className="blog-detail-hero-panel-label">Article Focus</div>
              <div className="blog-detail-hero-panel-grid">
                <div>
                  <strong>{blog?.category || "Insights"}</strong>
                  <span>Primary Topic</span>
                </div>
                <div>
                  <strong>{blog?.readingTime || "5 min"}</strong>
                  <span>Reading Time</span>
                </div>
                <div>
                  <strong>Practical</strong>
                  <span>Execution Style</span>
                </div>
                <div>
                  <strong>Structured</strong>
                  <span>Context Flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section blog-detail-content-section">
        <div className="section-inner">
          {isLoading ? <Spin /> : null}
          {isError ? <ErrorState onRetry={refetch} /> : null}
          {blog ? (
            <div className="blog-detail-layout">
              <Card className="blog-detail-card">
                {coverImage ? (
                  <div className="blog-detail-cover-wrap">
                    <img src={coverImage} alt={blog.title} className="blog-detail-cover-image" />
                  </div>
                ) : null}
                <div
                  className="blog-detail-rich-content prose"
                  dangerouslySetInnerHTML={{ __html: getRenderedBlogContent(blog) }}
                />
                <BlogArticleCTA />
              </Card>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default BlogDetailPage;

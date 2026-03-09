import { Alert, Card, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorState from "../components/common/ErrorState";
import SEOHead from "../components/seo/SEOHead";
import { adminService } from "../services/adminService";

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

function BlogPreviewPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function loadPreview() {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getBlogPreviewBySlug(slug);
      setBlog(response.data || null);
    } catch (err) {
      setError(err);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (slug) {
      loadPreview();
    }
  }, [slug]);

  return (
    <>
      <SEOHead
        title={blog?.title ? `Quadravise | Draft Preview | ${blog.title}` : "Quadravise | Draft Preview"}
        description={blog?.excerpt || "Draft preview"}
      />
      <section className="section blog-detail-hero-section">
        <div className="section-inner">
          <Alert
            className="blog-preview-banner"
            type="warning"
            showIcon
            message="Draft Preview Mode"
            description="This blog is not published yet. Preview is visible only to the authenticated admin session."
          />
          <Typography.Title className="blog-detail-hero-title">{blog?.title || "Draft Preview"}</Typography.Title>
          <Typography.Paragraph className="blog-detail-hero-description">
            {blog?.excerpt || "Review the blog before it goes live."}
          </Typography.Paragraph>
        </div>
      </section>
      <section className="section blog-detail-content-section">
        <div className="section-inner">
          {loading ? <Spin /> : null}
          {!loading && error ? <ErrorState onRetry={loadPreview} /> : null}
          {blog ? (
            <Card className="blog-detail-card">
              {blog.coverImage || blog.featuredImage ? (
                <img
                  src={blog.coverImage || blog.featuredImage}
                  alt={blog.title}
                  style={{ width: "100%", maxHeight: 380, objectFit: "cover", borderRadius: 16, marginBottom: 20 }}
                />
              ) : null}
              <div
                className="blog-detail-rich-content prose"
                dangerouslySetInnerHTML={{ __html: getRenderedBlogContent(blog) }}
              />
            </Card>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default BlogPreviewPage;

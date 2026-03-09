import { Card, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";

import ErrorState from "../components/common/ErrorState";
import SEOHead from "../components/seo/SEOHead";
import { seoDefaults, seoKeywords } from "../constants/seo";
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

function BlogDetailPage() {
  const { slug } = useParams();
  const { data, isLoading, isError, refetch } = useBlogBySlug(slug);
  const blog = data?.data;
  const canonical = blog?.canonicalUrl || (slug ? `${seoDefaults.canonical}/blog/${slug}` : undefined);

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
          <Typography.Title className="blog-detail-hero-title">{blog?.title || "Blog Detail"}</Typography.Title>
          <Typography.Paragraph className="blog-detail-hero-description">
            {blog?.excerpt || "Article details"}
          </Typography.Paragraph>
        </div>
      </section>
      <section className="section blog-detail-content-section">
        <div className="section-inner">
          {isLoading ? <Spin /> : null}
          {isError ? <ErrorState onRetry={refetch} /> : null}
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

export default BlogDetailPage;

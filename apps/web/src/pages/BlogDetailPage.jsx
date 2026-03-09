import { Card, Spin, Typography } from "antd";
import { useParams } from "react-router-dom";

import ErrorState from "../components/common/ErrorState";
import SEOHead from "../components/seo/SEOHead";
import { seoDefaults } from "../constants/seo";
import { useBlogBySlug } from "../hooks/useBlogs";

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
                dangerouslySetInnerHTML={{ __html: blog.content || "<p>No content available.</p>" }}
              />
            </Card>
          ) : null}
        </div>
      </section>
    </>
  );
}

export default BlogDetailPage;

import { Card, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

function getFallbackCover(category = "Engineering") {
  const map = {
    Engineering: ["#2f7bb3", "#245c90"],
    SaaS: ["#2f73aa", "#225581"],
    Startup: ["#2f7e9e", "#225f78"],
    Architecture: ["#2f6ea4", "#234f78"]
  };
  const [c1, c2] = map[category] || ["#2f7bb3", "#245c90"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="700"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="${c1}" offset="0"/><stop stop-color="${c2}" offset="1"/></linearGradient></defs><rect fill="url(#g)" width="1200" height="700"/><circle cx="980" cy="90" r="180" fill="rgba(255,255,255,0.14)"/><rect x="120" y="210" width="360" height="20" rx="10" fill="rgba(255,255,255,0.25)"/><rect x="120" y="250" width="540" height="16" rx="8" fill="rgba(255,255,255,0.2)"/><rect x="120" y="282" width="470" height="16" rx="8" fill="rgba(255,255,255,0.16)"/></svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function stripHtml(html = "") {
  return String(html).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function formatBlogMeta(blog) {
  const date = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "New article";
  const words = stripHtml(blog.content).split(/\s+/).filter(Boolean).length;
  const readTime = blog.readingTime || `${words ? Math.max(1, Math.round(words / 220)) : 3} min read`;
  return `${date} • ${readTime}`;
}

function BlogCard({ blog }) {
  const cover = blog.thumbnailImage || blog.coverImage || blog.featuredImage || blog.image || getFallbackCover(blog.category);
  const meta = formatBlogMeta(blog);

  return (
    <Card className="blog-page-card">
      <Link to={`${ROUTES.BLOG}/${blog.slug}`} className="blog-page-card-cover-link" aria-label={blog.title}>
        <img className="blog-page-card-cover" src={cover} alt={blog.title} loading="lazy" />
      </Link>
      <div className="blog-page-card-meta">
        <Tag className="blog-page-card-category">{blog.category || "Insights"}</Tag>
      </div>
      <Link to={`${ROUTES.BLOG}/${blog.slug}`} className="blog-page-card-title-link">
        <Typography.Title level={4} className="blog-page-card-title">
          {blog.title}
        </Typography.Title>
      </Link>
      <Typography.Paragraph className="blog-page-card-excerpt">{blog.excerpt}</Typography.Paragraph>
      <div className="blog-page-card-footer">
        <span className="blog-page-card-date">{meta}</span>
      </div>
      <Link className="blog-page-card-link" to={`${ROUTES.BLOG}/${blog.slug}`}>
        Read Article
      </Link>
    </Card>
  );
}

export default BlogCard;

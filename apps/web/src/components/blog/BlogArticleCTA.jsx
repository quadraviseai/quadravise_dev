import { ArrowRightOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

function BlogArticleCTA() {
  return (
    <aside className="blog-article-cta" aria-label="How Quadravise can help">
      <span className="blog-article-cta-eyebrow">How Quadravise Can Help</span>
      <h3>Turn the ideas from this article into a working product.</h3>
      <p>
        Quadravise helps startups and growing teams plan, design, and build websites, mobile apps, and SaaS products
        that are ready to scale.
      </p>
      <div className="blog-article-cta-points">
        <span>Product scoping and MVP planning</span>
        <span>Website, app, and SaaS development</span>
        <span>Clear timelines, cost, and delivery guidance</span>
      </div>
      <Space size={12} wrap className="blog-article-cta-actions">
        <Button type="primary" className="hero-btn hero-btn-primary" icon={<MessageOutlined />}>
          <Link to={ROUTES.CONTACT}>Talk to Quadravise</Link>
        </Button>
        <Button className="hero-btn blog-article-cta-secondary" icon={<ArrowRightOutlined />}>
          <Link to={ROUTES.SERVICES}>Explore Services</Link>
        </Button>
      </Space>
    </aside>
  );
}

export default BlogArticleCTA;

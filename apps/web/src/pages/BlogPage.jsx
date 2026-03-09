import { useMemo, useState } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import { Button, Col, Input, Row, Space, Spin, Tabs, Typography } from "antd";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import BlogCard from "../components/blog/BlogCard";
import SEOHead from "../components/seo/SEOHead";
import { useBlogs } from "../hooks/useBlogs";
import { ROUTES } from "../constants/routes";
import { pageSeo } from "../constants/seo";

function BlogPage() {
  const [category, setCategory] = useState("All");
  const { data, isLoading, isError, refetch } = useBlogs();
  const blogs = data?.data || [];
  const categories = useMemo(() => [...new Set(blogs.map((blog) => blog.category).filter(Boolean))], [blogs]);
  const tabItems = useMemo(
    () => [{ key: "All", label: "All" }, ...categories.map((item) => ({ key: item, label: item }))],
    [categories]
  );
  const filtered = category && category !== "All" ? blogs.filter((blog) => blog.category === category) : blogs;
  const trustItems = ["Engineering Insights", "Startup Product Strategy", "Scalable Architecture Guides"];
  const heroChips = [
    `${blogs.length || 12}+ Articles`,
    `${categories.length || 4} Core Categories`,
    "Architecture-first Insights",
    "Practical Startup Guides"
  ];

  return (
    <>
      <SEOHead title={pageSeo.blog.title} description={pageSeo.blog.description} canonical={pageSeo.blog.canonical} />
      <section className="section blog-page-hero-section">
        <div className="section-inner">
          <Row gutter={[32, 32]} align="middle" className="page-hero-layout">
            <Col xs={24} lg={13}>
              <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Typography.Title className="blog-page-hero-title">
                  Insights on Product,
                  <br />
                  Engineering, and Growth
                </Typography.Title>
                <Typography.Paragraph className="blog-page-hero-description">
                  Practical guides on SaaS, startup engineering, website performance, mobile app development, and product
                  delivery strategy.
                </Typography.Paragraph>
                <div className="page-hero-points">
                  {trustItems.map((item) => (
                    <span key={item}>
                      <CheckCircleFilled />
                      {item}
                    </span>
                  ))}
                </div>
                <Space size={14} wrap style={{ marginTop: 20 }}>
                  <Button type="primary" className="hero-btn hero-btn-primary" href="#blog-latest">
                    Explore Articles
                  </Button>
                  <Button className="hero-btn hero-btn-secondary">
                    <Link to={ROUTES.CONTACT}>Talk to Team</Link>
                  </Button>
                </Space>
              </motion.div>
            </Col>
            <Col xs={24} lg={11}>
              <motion.div
                className="page-hero-preview-panel"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: 0.12 }}
              >
                <div className="page-hero-preview-head">
                  <strong>Blog Snapshot</strong>
                </div>
                <div className="page-hero-preview-metrics">
                  <div>
                    <strong>{blogs.length || "12+"}</strong>
                    <span>Published Articles</span>
                  </div>
                  <div>
                    <strong>{categories.length || "4"}</strong>
                    <span>Core Categories</span>
                  </div>
                  <div>
                    <strong>SaaS</strong>
                    <span>Architecture + Product</span>
                  </div>
                  <div>
                    <strong>Weekly</strong>
                    <span>Practical Insights</span>
                  </div>
                </div>
                <div className="blog-page-trust-row">
                  {heroChips.map((item) => (
                    <span key={item} className="blog-page-trust-chip">
                      <CheckCircleFilled />
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            </Col>
          </Row>
        </div>
      </section>
      <section className="section blog-page-grid-section">
        <div className="section-inner">
          <motion.div
            className="blog-page-tools"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <Typography.Title level={3} className="blog-page-featured-heading">
              All Articles
            </Typography.Title>
            <Tabs className="blog-page-tabs" activeKey={category} onChange={setCategory} items={tabItems} />
          </motion.div>
          {isLoading ? <Spin /> : null}
          {isError ? <ErrorState onRetry={refetch} /> : null}
          {!isLoading && !isError && !filtered.length ? <EmptyState message="No blogs available." /> : null}

          <section className="blog-page-latest-section" id="blog-latest">
            <Row gutter={[20, 20]}>
              {filtered.map((blog, index) => (
                <Col key={blog.slug} xs={24} md={12} lg={8}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                  >
                    <BlogCard blog={blog} />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </section>

          <section className="blog-page-newsletter-section">
            <div className="blog-page-newsletter-card">
              <Typography.Title level={3}>Get Product Engineering Insights</Typography.Title>
              <Typography.Paragraph>
                Join founders and developers learning how to build scalable products.
              </Typography.Paragraph>
              <Space.Compact block>
                <Input placeholder="Enter your email" className="blog-page-newsletter-input" />
                <Button type="primary" className="hero-btn hero-btn-primary">
                  Subscribe
                </Button>
              </Space.Compact>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default BlogPage;

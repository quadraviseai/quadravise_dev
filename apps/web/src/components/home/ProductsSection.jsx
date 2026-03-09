import { CheckCircleFilled, PlayCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Tag } from "antd";
import { Link } from "react-router-dom";

import { useSiteSettings } from "../../hooks/useSiteSettings";
import SectionHeader from "../common/SectionHeader";
import { ROUTES } from "../../constants/routes";

function ProductsSection() {
  const { data } = useSiteSettings();
  const settings = data?.data || {};
  const features = [
    "Structured learning modules",
    "Practice tests",
    "AI-powered learning tools",
    "Performance analytics"
  ];

  return (
    <section className="section products-highlight-section">
      <div className="section-inner">
        <SectionHeader title="Products Built by Quadravise" />
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} lg={13}>
            <Card className="products-highlight-card">
              <Tag color="gold">EdTech Product</Tag>
              <h3 className="product-spotlight-title">QuadraiLearn</h3>
              <p className="product-spotlight-description">
                Modern AI-powered learning platform designed to help students master concepts faster.
              </p>
              <div className="product-feature-list">
                {features.map((item) => (
                  <span key={item} className="product-feature-item">
                    <CheckCircleFilled />
                    {item}
                  </span>
                ))}
              </div>
              <div className="product-spotlight-action">
                <Button type="primary" className="hero-btn hero-btn-primary">
                  <Link to={ROUTES.QUADRA_ILEARN}>Explore QuadraiLearn</Link>
                </Button>
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={11}>
            <div className="product-preview-panel">
              <div className="product-preview-head">
                <strong>QuadraiLearn Preview</strong>
                <PlayCircleOutlined />
              </div>
              <div className="product-preview-metrics">
                <div>
                  <strong>{settings.quadrailearnTracks || "12+"}</strong>
                  <span>Learning Tracks</span>
                </div>
                <div>
                  <strong>AI</strong>
                  <span>Adaptive Suggestions</span>
                </div>
                <div>
                  <strong>Live</strong>
                  <span>Progress Dashboard</span>
                </div>
                <div>
                  <strong>Tests</strong>
                  <span>Practice Assessments</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default ProductsSection;

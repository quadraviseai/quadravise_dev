import { Button, Card, Space, Typography } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "../constants/routes";

function NotFoundPage() {
  return (
    <section className="section notfound-page-section">
      <div className="section-inner">
        <Card className="notfound-page-card">
          <Typography.Title className="notfound-page-code">404</Typography.Title>
          <Typography.Title level={2}>Page Not Found</Typography.Title>
          <Typography.Paragraph>
            The page you requested does not exist or may have been moved.
          </Typography.Paragraph>
          <Space size={14}>
            <Button type="primary" className="hero-btn hero-btn-primary">
              <Link to={ROUTES.HOME}>Back Home</Link>
            </Button>
            <Button className="hero-btn hero-btn-secondary">
              <Link to={ROUTES.CONTACT}>Contact Support</Link>
            </Button>
          </Space>
        </Card>
      </div>
    </section>
  );
}

export default NotFoundPage;

import { ArrowRightOutlined, CheckCircleFilled } from "@ant-design/icons";
import { Card, Space, Tag, Typography } from "antd";
import { Link } from "react-router-dom";

function ServiceDetailCard({
  title,
  description,
  features = [],
  chips = [],
  icon: Icon,
  slug,
  tone = "blue"
}) {
  return (
    <Card className={`service-page-card service-page-card-${tone}`}>
      <Space direction="vertical" size={14} className="service-card-content">
        <div className="service-card-top">
          {Icon ? <Icon className="service-card-icon" /> : null}
        </div>
        <Typography.Title level={4} className="service-card-title">
          {title}
        </Typography.Title>
        <Typography.Paragraph className="service-card-description">{description}</Typography.Paragraph>
        <div className="service-feature-list">
          {features.slice(0, 4).map((feature) => (
            <span key={feature}>
              <CheckCircleFilled />
              {feature}
            </span>
          ))}
        </div>
        <div className="service-chip-row">
          {chips.map((chip) => (
            <Tag key={chip}>{chip}</Tag>
          ))}
        </div>
        <Link className="service-learn-link" to={`/services/${slug}`}>
          Learn More <ArrowRightOutlined />
        </Link>
      </Space>
    </Card>
  );
}

export default ServiceDetailCard;

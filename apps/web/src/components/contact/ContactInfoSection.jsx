import { ClockCircleOutlined, EnvironmentOutlined, LinkedinOutlined, MailOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { useSiteSettings } from "../../hooks/useSiteSettings";

function ContactInfoSection() {
  const { data } = useSiteSettings();
  const settings = data?.data || {};
  const cards = [];

  if (settings.showEmail !== false) {
    cards.push({
      key: "email",
      icon: <MailOutlined />,
      title: "Email",
      content: (
        <a href={`mailto:${settings.email || "support@quadravise.com"}`}>
          {settings.email || "support@quadravise.com"}
        </a>
      )
    });
  }

  if (settings.showLinkedin !== false) {
    const linkedin = settings.linkedin || "https://linkedin.com/company/quadravise";
    cards.push({
      key: "linkedin",
      icon: <LinkedinOutlined />,
      title: "LinkedIn",
      content: (
        <a href={linkedin} target="_blank" rel="noreferrer">
          {linkedin.replace(/^https?:\/\//, "")}
        </a>
      )
    });
  }

  cards.push({
    key: "location",
    icon: <EnvironmentOutlined />,
    title: "Location",
    content: (
      <>
        <Typography.Paragraph>{settings.address || "Kolkata, India"}</Typography.Paragraph>
        <span className="contact-info-time">
          <ClockCircleOutlined />
          {settings.workingHours || "Mon - Sat, 10:00 AM to 7:00 PM"}
        </span>
      </>
    )
  });

  return (
    <section className="section contact-info-section">
      <div className="section-inner">
        <Row gutter={[20, 20]}>
          {cards.map((card) => (
            <Col key={card.key} xs={24} md={24 / cards.length}>
              <Card className="contact-info-card">
                <span className="contact-info-icon">{card.icon}</span>
                <Typography.Title level={4}>{card.title}</Typography.Title>
                {card.content}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default ContactInfoSection;

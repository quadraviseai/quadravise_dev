import { Breadcrumb, Typography } from "antd";

const { Title, Paragraph } = Typography;

function PageBanner({ title, description, breadcrumb = [] }) {
  return (
    <section className="section">
      <div className="section-inner">
        {breadcrumb.length ? <Breadcrumb items={breadcrumb} style={{ marginBottom: 16 }} /> : null}
        <Title>{title}</Title>
        <Paragraph>{description}</Paragraph>
      </div>
    </section>
  );
}

export default PageBanner;

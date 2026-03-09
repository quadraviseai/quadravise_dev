import { LaptopOutlined, RocketOutlined } from "@ant-design/icons";
import { Card, Col, Row, Typography } from "antd";
import { motion } from "motion/react";

import SectionHeader from "../common/SectionHeader";

const products = [
  {
    title: "QuadraiLearn",
    flagship: true,
    icon: <LaptopOutlined />,
    description:
      "AI-powered exam preparation platform designed to help students prepare for competitive and board examinations."
  },
  {
    title: "Custom SaaS Platforms",
    icon: <LaptopOutlined />,
    description: "We design and build scalable SaaS platforms for startups and growing businesses."
  },
  {
    title: "Startup MVP Systems",
    icon: <RocketOutlined />,
    description: "Rapid MVP development to help founders validate product ideas quickly."
  }
];

function AboutProductsSection() {
  return (
    <section className="section about-products-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader title="Products Built by Quadravise" />
        </motion.div>
        <Row gutter={[20, 20]}>
          {products.map((product, index) => (
            <Col key={product.title} xs={24} md={12} lg={8}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className={`about-products-card${product.flagship ? " about-products-card-flagship" : ""}`}>
                  <span className="about-products-icon">{product.icon}</span>
                  <Typography.Title level={4}>{product.title}</Typography.Title>
                  <Typography.Paragraph>{product.description}</Typography.Paragraph>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default AboutProductsSection;

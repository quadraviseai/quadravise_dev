import { Card, Col, Row, Tag, Typography } from "antd";
import { motion } from "motion/react";

import SectionHeader from "../common/SectionHeader";

const stack = [
  {
    title: "Frontend",
    tone: "frontend",
    items: [
      { name: "React", logo: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", logo: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
      { name: "TypeScript", logo: "https://cdn.simpleicons.org/typescript/3178C6" }
    ]
  },
  {
    title: "Backend",
    tone: "backend",
    items: [
      { name: "Node.js", logo: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Django", logo: "https://cdn.simpleicons.org/django/FFFFFF" },
      { name: "FastAPI", logo: "https://cdn.simpleicons.org/fastapi/009688" }
    ]
  },
  {
    title: "Database",
    tone: "database",
    items: [
      { name: "PostgreSQL", logo: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "Redis", logo: "https://cdn.simpleicons.org/redis/DC382D" }
    ]
  },
  {
    title: "Infrastructure",
    tone: "infra",
    items: [
      { name: "Docker", logo: "https://cdn.simpleicons.org/docker/2496ED" },
      { name: "Linux", logo: "https://cdn.simpleicons.org/linux/FCC624" },
      { name: "Nginx", logo: "https://cdn.simpleicons.org/nginx/009639" },
      { name: "Cloud VPS", logo: "https://cdn.simpleicons.org/cloudflare/F38020" }
    ]
  }
];

function AboutTechStackSection() {
  return (
    <section className="section about-tech-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader title="Technology Stack We Use" />
        </motion.div>
        <Row gutter={[20, 20]}>
          {stack.map((group, index) => (
            <Col key={group.title} xs={24} md={12}>
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className={`about-tech-card about-tech-card-${group.tone}`}>
                  <Typography.Title level={4}>{group.title}</Typography.Title>
                  <div className="about-tech-tags">
                    {group.items.map((item) => (
                      <Tag key={item.name}>
                        <img src={item.logo} alt={`${item.name} logo`} loading="lazy" />
                        {item.name}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default AboutTechStackSection;

import { Card, Col, Row } from "antd";
import { motion } from "motion/react";

import SectionHeader from "../common/SectionHeader";

const benefits = [
  "Improve long-term knowledge retention through structured repetition",
  "Enable better progress visibility for learners and mentors",
  "Support hybrid learning across web and mobile environments"
];

function ProductBenefitsSection() {
  return (
    <section className="section quadrailearn-benefits-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader title="Benefits" />
        </motion.div>
        <Row gutter={[16, 16]}>
          {benefits.map((benefit, index) => (
            <Col key={benefit} xs={24} md={8}>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="quadrailearn-benefit-card">{benefit}</Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      </div>
    </section>
  );
}

export default ProductBenefitsSection;

import { Typography } from "antd";
import { motion } from "motion/react";

function AboutPositioningSection() {
  return (
    <section className="section about-positioning-section">
      <div className="section-inner">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
        >
          <Typography.Paragraph className="about-positioning-text">
            Quadravise is a product engineering company focused on building reliable software platforms for startups and
            growing businesses worldwide.
          </Typography.Paragraph>
        </motion.div>
      </div>
    </section>
  );
}

export default AboutPositioningSection;

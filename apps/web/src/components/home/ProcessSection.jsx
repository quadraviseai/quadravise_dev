import {
  DeploymentUnitOutlined,
  FundProjectionScreenOutlined,
  SearchOutlined,
  ToolOutlined,
  VerifiedOutlined
} from "@ant-design/icons";
import { motion } from "motion/react";

import SectionHeader from "../common/SectionHeader";

const processSteps = [
  {
    title: "Discovery",
    icon: <SearchOutlined />,
    description: "Understand business goals and project scope."
  },
  {
    title: "Planning",
    icon: <FundProjectionScreenOutlined />,
    description: "Define roadmap, architecture, and delivery milestones."
  },
  {
    title: "Development",
    icon: <ToolOutlined />,
    description: "Build scalable product modules with clean engineering."
  },
  {
    title: "Testing",
    icon: <VerifiedOutlined />,
    description: "Validate quality, performance, and reliability."
  },
  {
    title: "Launch",
    icon: <DeploymentUnitOutlined />,
    description: "Deploy confidently and support post-release growth."
  }
];

function ProcessSection() {
  return (
    <section className="section process-section">
      <div className="section-inner">
        <SectionHeader title="Our Proven Development Process" />
        <div className="process-flow-wrap">
          <div className="process-connector-line" />
          <div className="process-cards-grid">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.title}
                className="process-step-card"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              >
                <span className="process-step-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="process-step-icon">{step.icon}</span>
                <h3 className="process-step-title">{step.title}</h3>
                <p className="process-step-description">{step.description}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;

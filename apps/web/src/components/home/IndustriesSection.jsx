import { Tag } from "antd";

import SectionHeader from "../common/SectionHeader";

const industries = ["Startups", "Education", "E-commerce", "Healthcare", "Fintech", "Business Services"];

function IndustriesSection() {
  return (
    <section className="section section-muted">
      <div className="section-inner">
        <SectionHeader title="Industries We Serve" />
        {industries.map((industry) => (
          <Tag key={industry} style={{ marginBottom: 8 }} color="blue">
            {industry}
          </Tag>
        ))}
      </div>
    </section>
  );
}

export default IndustriesSection;

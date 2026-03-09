import { Card, Tag } from "antd";

function PortfolioCard({ project }) {
  return (
    <Card className="portfolio-page-card" title={project.title}>
      <p className="portfolio-page-card-description">{project.description}</p>
      <div className="portfolio-page-card-stack">
        {project.techStack?.map((tech) => (
          <Tag key={tech} className="portfolio-tech-tag">
            {tech}
          </Tag>
        ))}
      </div>
      <div className="portfolio-page-card-outcome">
        <strong>Outcome:</strong> {project.outcome}
      </div>
    </Card>
  );
}

export default PortfolioCard;

import { ArrowRightOutlined } from "@ant-design/icons";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

function PortfolioCard({ project }) {
  const targetRoute = project.route || (project.slug ? `${ROUTES.PORTFOLIO}/${project.slug}` : null);

  return (
    <Card className="portfolio-page-card" title={project.title}>
      <div className="portfolio-page-card-meta">
        {project.isFeatured ? <Tag color="gold">Featured</Tag> : null}
        {project.projectBadge ? <Tag color="blue">{project.projectBadge}</Tag> : null}
        {project.projectType ? <Tag>{project.projectType}</Tag> : null}
      </div>
      <p className="portfolio-page-card-description">{project.shortSummary || project.description}</p>
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
      {targetRoute ? (
        <Link className="portfolio-page-card-link" to={targetRoute}>
          View Project <ArrowRightOutlined />
        </Link>
      ) : null}
    </Card>
  );
}

export default PortfolioCard;

import { Button, Card, Tag } from "antd";
import { Link } from "react-router-dom";

function ProductCard({ productName, description, features = [], slug, buttonText = "Explore Product" }) {
  return (
    <Card title={productName}>
      <p>{description}</p>
      <div style={{ marginBottom: 12 }}>{features.map((f) => <Tag key={f}>{f}</Tag>)}</div>
      <Button type="primary"><Link to={slug}>{buttonText}</Link></Button>
    </Card>
  );
}

export default ProductCard;

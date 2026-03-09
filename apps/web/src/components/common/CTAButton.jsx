import { Button } from "antd";
import { Link } from "react-router-dom";

function CTAButton({ text, href, type = "primary", loading = false }) {
  if (href) {
    return (
      <Button type={type} loading={loading}>
        <Link to={href}>{text}</Link>
      </Button>
    );
  }

  return (
    <Button type={type} loading={loading}>
      {text}
    </Button>
  );
}

export default CTAButton;

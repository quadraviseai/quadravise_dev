import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";

import SEOHead from "../components/seo/SEOHead";
import { ROUTES } from "../constants/routes";
import { clientService } from "../services/clientService";

function ClientNoProjectsPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead title="Quadravise | No Active Project" robots="noindex, nofollow" />
      <section className="section">
        <div className="section-inner" style={{ maxWidth: 720 }}>
          <Card>
            <Typography.Title level={2}>No active project is currently assigned</Typography.Title>
            <Typography.Paragraph>
              Your account is authenticated, but there is no active client project mapped to this workspace yet.
            </Typography.Paragraph>
            <Typography.Paragraph type="secondary">
              Contact the Quadravise team if you expected project access.
            </Typography.Paragraph>
            <Button
              onClick={async () => {
                await clientService.logout();
                navigate(ROUTES.CLIENT_LOGIN, { replace: true });
              }}
            >
              Logout
            </Button>
          </Card>
        </div>
      </section>
    </>
  );
}

export default ClientNoProjectsPage;


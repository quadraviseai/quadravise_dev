import { Col, Row } from "antd";

import ProcessSection from "../components/home/ProcessSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import SectionHeader from "../components/common/SectionHeader";
import ServicesHeroSection from "../components/services/ServicesHeroSection";
import ServiceDetailCard from "../components/services/ServiceDetailCard";
import ServicesCTASection from "../components/services/ServicesCTASection";
import ServicesPortfolioTeaserSection from "../components/services/ServicesPortfolioTeaserSection";
import SEOHead from "../components/seo/SEOHead";
import { pageSeo, seoKeywords } from "../constants/seo";
import { servicesData } from "../constants/services";

function ServicesPage() {
  return (
    <>
      <SEOHead
        title={pageSeo.services.title}
        description={pageSeo.services.description}
        keywords={seoKeywords.services}
        canonical={pageSeo.services.canonical}
      />
      <ServicesHeroSection />
      <section className="section services-grid-section">
        <div className="section-inner">
          <SectionHeader
            title="Software Development Services"
            subtitle="Flexible delivery models across websites, mobile products, SaaS platforms, and custom systems."
          />
          <Row gutter={[20, 20]}>
            {servicesData.map((service) => (
              <Col key={service.title} xs={24} md={12} lg={8}>
                <ServiceDetailCard {...service} />
              </Col>
            ))}
          </Row>
        </div>
      </section>
      <ServicesPortfolioTeaserSection />
      <WhyChooseUsSection />
      <ProcessSection />
      <ServicesCTASection />
    </>
  );
}

export default ServicesPage;

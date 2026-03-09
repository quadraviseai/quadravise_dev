import SEOHead from "../components/seo/SEOHead";
import HeroSection from "../components/home/HeroSection";
import WhatWeDoSection from "../components/home/WhatWeDoSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ProductsSection from "../components/home/ProductsSection";
import ProcessSection from "../components/home/ProcessSection";
import PortfolioPreviewSection from "../components/home/PortfolioPreviewSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FinalCTASection from "../components/home/FinalCTASection";
import { organizationSchema, pageSeo } from "../constants/seo";

function HomePage() {
  return (
    <>
      <SEOHead
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        keywords="software development company, web development company, mobile app development, custom software development, quadravise"
        canonical={pageSeo.home.canonical}
        ogTitle="Quadravise Software Development Company"
        ogDescription="Build scalable software products with Quadravise. Web development, mobile app development and custom software solutions."
        twitterTitle="Quadravise Software Development Company"
        twitterDescription="Web development, mobile apps and custom software development."
        schema={organizationSchema}
      />
      <HeroSection />
      <WhatWeDoSection />
      <WhyChooseUsSection />
      <ProductsSection />
      <ProcessSection />
      <PortfolioPreviewSection />
      <TestimonialsSection />
      <FinalCTASection />
    </>
  );
}

export default HomePage;

import SEOHead from "../components/seo/SEOHead";
import HeroSection from "../components/home/HeroSection";
import WhatWeDoSection from "../components/home/WhatWeDoSection";
import WhyChooseUsSection from "../components/home/WhyChooseUsSection";
import ProductsSection from "../components/home/ProductsSection";
import ProcessSection from "../components/home/ProcessSection";
import PortfolioPreviewSection from "../components/home/PortfolioPreviewSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FinalCTASection from "../components/home/FinalCTASection";
import { pageSeo } from "../constants/seo";

function HomePage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Quadravise",
    url: pageSeo.home.canonical,
    sameAs: ["https://www.linkedin.com/company/quadravise"]
  };

  return (
    <>
      <SEOHead
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        canonical={pageSeo.home.canonical}
        schema={schema}
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

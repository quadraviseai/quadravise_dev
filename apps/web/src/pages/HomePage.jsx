import { Suspense, lazy, startTransition, useEffect, useState } from "react";

import SEOHead from "../components/seo/SEOHead";
import HeroSection from "../components/home/HeroSection";
import { organizationSchema, pageSeo, seoKeywords } from "../constants/seo";

const WhatWeDoSection = lazy(() => import("../components/home/WhatWeDoSection"));
const WhyChooseUsSection = lazy(() => import("../components/home/WhyChooseUsSection"));
const ProductsSection = lazy(() => import("../components/home/ProductsSection"));
const ProcessSection = lazy(() => import("../components/home/ProcessSection"));
const PortfolioPreviewSection = lazy(() => import("../components/home/PortfolioPreviewSection"));
const TestimonialsSection = lazy(() => import("../components/home/TestimonialsSection"));
const FinalCTASection = lazy(() => import("../components/home/FinalCTASection"));

function HomePage() {
  const [showDeferredSections, setShowDeferredSections] = useState(false);

  useEffect(() => {
    const run = () => {
      startTransition(() => {
        setShowDeferredSections(true);
      });
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(run, { timeout: 1200 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(run, 200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <SEOHead
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        keywords={seoKeywords.home}
        canonical={pageSeo.home.canonical}
        ogTitle="Quadravise Software Development Company"
        ogDescription="Build scalable software products with Quadravise. Web development, mobile app development and custom software solutions."
        twitterTitle="Quadravise Software Development Company"
        twitterDescription="Web development, mobile apps and custom software development."
        schema={organizationSchema}
      />
      <HeroSection />
      {showDeferredSections ? (
        <Suspense fallback={null}>
          <WhatWeDoSection />
          <WhyChooseUsSection />
          <ProductsSection />
          <ProcessSection />
          <PortfolioPreviewSection />
          <TestimonialsSection />
          <FinalCTASection />
        </Suspense>
      ) : null}
    </>
  );
}

export default HomePage;

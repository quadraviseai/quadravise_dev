import SEOHead from "../components/seo/SEOHead";
import AboutHeroSection from "../components/about/AboutHeroSection";
import MissionVisionSection from "../components/about/MissionVisionSection";
import AboutProcessSection from "../components/about/AboutProcessSection";
import AboutProductsSection from "../components/about/AboutProductsSection";
import AboutTechStackSection from "../components/about/AboutTechStackSection";
import AboutWhyChooseSection from "../components/about/AboutWhyChooseSection";
import AboutCTASection from "../components/about/AboutCTASection";
import AboutPositioningSection from "../components/about/AboutPositioningSection";
import { pageSeo, seoKeywords } from "../constants/seo";

function AboutPage() {
  return (
    <>
      <SEOHead
        title={pageSeo.about.title}
        description={pageSeo.about.description}
        keywords={seoKeywords.about}
        canonical={pageSeo.about.canonical}
      />
      <AboutHeroSection />
      <MissionVisionSection />
      <AboutProcessSection />
      <AboutProductsSection />
      <AboutTechStackSection />
      <AboutWhyChooseSection />
      <AboutCTASection />
      <AboutPositioningSection />
    </>
  );
}

export default AboutPage;

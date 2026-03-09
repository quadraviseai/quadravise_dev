import SEOHead from "../components/seo/SEOHead";
import ProductHeroSection from "../components/quadrailearn/ProductHeroSection";
import ProductFeaturesSection from "../components/quadrailearn/ProductFeaturesSection";
import ProductBenefitsSection from "../components/quadrailearn/ProductBenefitsSection";
import ProductCTASection from "../components/quadrailearn/ProductCTASection";
import { pageSeo, seoKeywords } from "../constants/seo";

function QuadraILearnPage() {
  return (
    <>
      <SEOHead
        title={pageSeo.quadraILearn.title}
        description={pageSeo.quadraILearn.description}
        keywords={seoKeywords.quadraILearn}
        canonical={pageSeo.quadraILearn.canonical}
      />
      <ProductHeroSection />
      <ProductFeaturesSection />
      <ProductBenefitsSection />
      <ProductCTASection />
    </>
  );
}

export default QuadraILearnPage;

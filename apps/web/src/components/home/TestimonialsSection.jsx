import { Card, Typography } from "antd";

import irfLogo from "../../assets/img/irf-logo.png";
import nexabRustLogo from "../../assets/img/nexabrust-logo.png";
import phoenixInnerBalanceLogo from "../../assets/img/phoenixinnerbalance-logo.png";
import protactorLogo from "../../assets/img/protactor-logo.png";
import vtrustLogo from "../../assets/img/vtrust-logo.png";

import SectionHeader from "../common/SectionHeader";

const testimonials = [
  {
    name: "IRF Geometry",
    role: "Engineering Business Website",
    logo: irfLogo,
    cardClassName: "testimonial-card-irf",
    quote:
      "Quadravise gave our company website a cleaner structure and a more credible presentation. The delivery was practical, fast, and aligned with how we wanted to present our technical expertise."
  },
  {
    name: "NexaBurst",
    role: "Digital Growth Agency",
    logo: nexabRustLogo,
    quote:
      "The team understood how to position a growth-focused brand online. They delivered a polished website that communicates our services clearly and supports stronger client conversations."
  },
  {
    name: "Phoenix Inner Balance",
    role: "Wellness Practice Website",
    logo: phoenixInnerBalanceLogo,
    cardClassName: "testimonial-card-phoenix",
    quote:
      "Quadravise translated a sensitive wellness brand into a calm, professional digital experience. The final site feels trustworthy, easy to navigate, and true to our practice."
  },
  {
    name: "Protactor",
    role: "Professional Service Brand",
    logo: protactorLogo,
    cardClassName: "testimonial-card-protactor",
    quote:
      "We needed a business-facing web presence that looked dependable and ready for clients. Quadravise handled the execution with clarity and delivered a strong brand-first result."
  },
  {
    name: "VTrustCarz",
    role: "Automotive Marketplace",
    logo: vtrustLogo,
    cardClassName: "testimonial-card-vtrust",
    quote:
      "Quadravise helped shape a clearer customer-facing platform for our vehicle marketplace. The outcome improved how we communicate trust, transparency, and service reliability online."
  }
];

function TestimonialsSection() {
  const marqueeTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="section proof-section">
      <div className="section-inner">
        <SectionHeader title="Trust, Proof, and Delivery Confidence" subtitle="Trusted for scalable digital builds" />
        <div className="testimonial-marquee">
          <div className="testimonial-scroll-row">
            {marqueeTestimonials.map((testimonial, index) => (
              <div key={`${testimonial.name}-${index}`} className="testimonial-scroll-slide" aria-hidden={index >= testimonials.length}>
                <Card className={`proof-quote-card testimonial-logo-card ${testimonial.cardClassName || ""}`.trim()}>
                  <div className="testimonial-floating-logo">
                    <img src={testimonial.logo} alt={`${testimonial.name} logo`} className="testimonial-logo-image" />
                  </div>
                  <div className="testimonial-copy-block">
                    <Typography.Paragraph>{testimonial.quote}</Typography.Paragraph>
                  </div>
                  <div className="testimonial-footer">
                    <Typography.Text strong>{testimonial.name}</Typography.Text>
                    <Typography.Text className="testimonial-role">{testimonial.role}</Typography.Text>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

# QUADRAVISE BRAND DESIGN SYSTEM

Version: 1.0  
Company: Quadravise  
Purpose: Define the visual identity and UI design standards for all Quadravise products.

Products covered:

• Quadravise Website  
• QuadraiLearn  
• QuadraCRM  

---

# 1. Brand Philosophy

Quadravise represents:

• technology  
• innovation  
• reliability  
• growth  

The design system should communicate:

- modern technology
- clean interfaces
- professional trust
- scalable digital products

Design direction:

Modern SaaS UI

---

# 2. Logo

Primary Logo

Quadravise "QV" logo with gradient ring.

Usage rules:

• maintain aspect ratio  
• avoid distortion  
• keep adequate whitespace around logo  
• do not recolor logo arbitrarily  

Recommended minimum spacing:

Logo padding = height of "Q".

---

# 3. Brand Color Palette

Derived from the official Quadravise logo.

## Primary Brand Color

Tech Blue

`#165596`

Usage:

- navigation bar
- headings
- primary UI elements
- icons

Represents:

trust, technology, reliability

---

## Secondary Brand Color

Bright Blue

`#1E86BB`

Usage:

- links
- hover states
- highlights
- secondary UI actions

---

## Primary CTA Color

Action Orange

`#EC5B16`

Usage:

- primary buttons
- call-to-action sections
- important highlights

Reason:

Improves conversion visibility.

---

## Accent Color

Golden Yellow

`#F8B23B`

Usage:

- feature highlights
- badges
- tags

---

## Growth Color

Soft Green

`#9FBC4F`

Usage:

- success indicators
- progress bars
- learning features (QuadraiLearn)

---

# 4. Neutral Colors

## Background

Light Gray

`#F8FAFC`

Used for page backgrounds.

---

## Card Background

White

`#FFFFFF`

Used for cards and containers.

---

## Border Color

Light Border

`#E5E7EB`

Used for:

- card borders
- input borders
- dividers

---

## Text Color

Dark Text

`#1F2937`

Used for body text.

---

# 5. Typography

Primary Font

Inter

Reason:

• modern
• readable
• widely used in SaaS

---

## Heading Styles

H1

Font Size: 48px  
Weight: 700

---

H2

Font Size: 36px  
Weight: 600

---

H3

Font Size: 28px  
Weight: 600

---

H4

Font Size: 22px  
Weight: 600

---

## Body Text

Font Size: 16px  
Weight: 400

Line Height: 1.6

---

# 6. UI Spacing System

Use an 8px grid system.

Spacing scale:

4px  
8px  
16px  
24px  
32px  
48px  
64px

---

Example section spacing:

Hero section padding

80px top  
80px bottom

---

# 7. Button Design

Primary Button

Background

`#EC5B16`

Text

White

Hover

`#D94F0F`

---

Secondary Button

Background

`#165596`

Text

White

Hover

`#124A80`

---

Button Border Radius

8px

---

# 8. Card Design

Card Background

White

Shadow

Subtle shadow

Example


box-shadow: 0 6px 18px rgba(0,0,0,0.08)


---

Card Border Radius

12px

---

Card Padding

24px

---

# 9. Layout System

Use responsive grid layout.

Desktop

12 column grid

Tablet

8 column grid

Mobile

4 column grid

---

Recommended max content width

1200px

---

# 10. Icon Style

Icons should be:

- simple
- modern
- outline style preferred

Recommended icon libraries:

Ant Design Icons  
Lucide Icons

---

# 11. Ant Design Theme Configuration

For React + Vite + Ant Design.

Example configuration:


const theme = {
token: {
colorPrimary: "#165596",
colorSuccess: "#9FBC4F",
colorWarning: "#F8B23B",
colorError: "#EC5B16",
colorLink: "#1E86BB",
borderRadius: 10
}
}


---

# 12. Form Design

Input height

40px

Border radius

8px

Focus color

`#1E86BB`

Error color

`#EC5B16`

---

# 13. Section Design Pattern

Each page should follow:

Hero Section  
Content Section  
Feature Section  
Trust Section  
CTA Section

---

# 14. Image Style

Images should:

• use soft shadows  
• maintain consistent aspect ratio  
• use rounded corners

Recommended radius

12px

---

# 15. CTA Section Design

Background

`#165596`

Text

White

Button

Orange CTA

---

Example CTA

Ready to Build Your Digital Product?

Button

Start Your Project

---

# 16. Animation Style

Keep animations minimal.

Recommended libraries:

Framer Motion  
GSAP (optional)

Use animations for:

- section reveal
- hover effects
- CTA emphasis

---

# 17. Responsive Design Rules

Breakpoints

Mobile

< 768px

Tablet

768px – 1024px

Desktop

> 1024px

---

# 18. Accessibility Guidelines

Ensure:

- sufficient color contrast
- readable font sizes
- accessible form labels
- keyboard navigation

---

# 19. Brand Voice

Tone

Professional  
Confident  
Clear  

Messaging style

Avoid jargon.

Focus on:

• problem solving  
• innovation  
• business outcomes  

---

# 20. Future Brand Expansion

This design system will apply to:

Quadravise Website  
QuadraiLearn Platform  
QuadraCRM SaaS  

Ensuring a consistent visual identity across the entire ecosystem.

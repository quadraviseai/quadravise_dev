# QUADRAVISE_REACT_VITE_ANTD_COMPONENT_MAP.md

Version: 1.0  
Frontend Stack: React + Vite + Ant Design  
Backend Stack: Node.js  
Database: PostgreSQL  
Deployment: VPS + Nginx

Purpose:  
Map the entire Quadravise website into reusable React components, page structures, layout hierarchy, and API integration points so developers can build quickly with minimal ambiguity.

---

# 1. Frontend Stack

## Core Frontend

- React
- Vite
- Ant Design
- React Router DOM
- Axios
- React Query or TanStack Query
- CSS Modules / SCSS / Styled Components (choose one consistently)

## Backend

- Node.js
- Express.js

## Database

- PostgreSQL

---

# 2. Recommended Frontend Folder Structure

```txt
src/
 ├── assets/
 │    ├── images/
 │    ├── icons/
 │    └── logos/
 │
 ├── components/
 │    ├── common/
 │    ├── layout/
 │    ├── home/
 │    ├── services/
 │    ├── products/
 │    ├── quadrailearn/
 │    ├── portfolio/
 │    ├── blog/
 │    ├── about/
 │    ├── contact/
 │    └── seo/
 │
 ├── pages/
 │    ├── HomePage.jsx
 │    ├── ServicesPage.jsx
 │    ├── ProductsPage.jsx
 │    ├── QuadraILearnPage.jsx
 │    ├── PortfolioPage.jsx
 │    ├── BlogPage.jsx
 │    ├── BlogDetailPage.jsx
 │    ├── AboutPage.jsx
 │    ├── ContactPage.jsx
 │    └── NotFoundPage.jsx
 │
 ├── layouts/
 │    └── MainLayout.jsx
 │
 ├── routes/
 │    └── AppRoutes.jsx
 │
 ├── services/
 │    ├── apiClient.js
 │    ├── leadService.js
 │    ├── blogService.js
 │    └── portfolioService.js
 │
 ├── hooks/
 │    ├── useLeads.js
 │    ├── useBlogs.js
 │    └── usePortfolio.js
 │
 ├── utils/
 │    ├── constants.js
 │    ├── validators.js
 │    ├── seo.js
 │    └── helpers.js
 │
 ├── contexts/
 │
 ├── styles/
 │    ├── global.css
 │    ├── theme.js
 │    └── variables.css
 │
 ├── App.jsx
 ├── main.jsx
 └── vite.config.js
3. Ant Design Usage Strategy

Use Ant Design for:

Layout

Menu / Navigation

Buttons

Cards

Forms

Inputs

Selects

Typography

Collapse / FAQ

Carousel if needed

Grid system

Drawer for mobile menu

Modal if needed

Result / Empty / Spin / Alert

Recommended core AntD components:

Layout

Row

Col

Typography

Button

Card

Form

Input

Select

Menu

Drawer

Collapse

Carousel

Space

Tag

Divider

Breadcrumb

Empty

Spin

Result

Alert

4. Global Layout Components
MainLayout.jsx

Purpose:
Wrap all public pages with consistent header, footer, and content container.

Structure:

SiteHeader

MainContent

SiteFooter

SiteHeader.jsx

Purpose:
Global navigation bar.

Contents:

Quadravise logo

Main navigation links

CTA button: Book Free Consultation

Mobile drawer menu

Navigation Items:

Home

Services

Products

QuadraiLearn

Portfolio

Blog

About

Contact

AntD Components:

Layout.Header

Menu

Button

Drawer

SiteFooter.jsx

Purpose:
Global footer for branding and navigation.

Contents:

company short description

footer navigation links

contact info

social / LinkedIn

copyright

AntD Components:

Layout.Footer

Row

Col

Typography

Space

5. Route Map
/                     -> HomePage
/services             -> ServicesPage
/products             -> ProductsPage
/products/quadra-ilearn -> QuadraILearnPage
/portfolio            -> PortfolioPage
/blog                 -> BlogPage
/blog/:slug           -> BlogDetailPage
/about                -> AboutPage
/contact              -> ContactPage
/*                    -> NotFoundPage
6. Home Page Component Map
HomePage.jsx

Page Composition:

HeroSection

WhatWeDoSection

WhyChooseUsSection

ProductsSection

ProcessSection

IndustriesSection

TestimonialsSection

FinalCTASection

HeroSection.jsx

Content:

Headline
Build Powerful Websites, Mobile Apps, and SaaS Products with Quadravise

Subheadline
We help startups and businesses transform ideas into scalable digital products through expert website development, mobile app development, and custom software solutions.

CTA Buttons:

Book Free Consultation

View Our Work

Trust Indicators:

Modern Technology Stack

Startup Friendly Development

Scalable Architecture

Reliable Delivery

AntD Components:

Row

Col

Typography.Title

Typography.Paragraph

Button

Space

Card or Tag for trust indicators

WhatWeDoSection.jsx

Contents:

Title
Digital Solutions That Drive Business Growth

Description
Quadravise delivers modern software solutions that help businesses launch faster, scale efficiently, and stay competitive in the digital world.

Service Cards:

Website Development

Mobile App Development

Custom Web Applications

SaaS Development

Startup MVP Development

CTA:
Explore Services

AntD Components:

Typography

Row

Col

Card

Button

WhyChooseUsSection.jsx

Content Blocks:

Expert Development Team

Startup Friendly Approach

Reliable Project Delivery

Scalable Architecture

Collaborative Development

AntD Components:

Typography

Row

Col

Card

Space

ProductsSection.jsx

Content:

Title
Products Built by Quadravise

Featured Product:
QuadraiLearn

Features:

Interactive learning modules

Practice tests

AI learning tools

Performance tracking

CTA:
Explore QuadraiLearn

AntD Components:

Card

Button

Row

Col

Typography

Tag

ProcessSection.jsx

Steps:

Discovery

Planning

Development

Testing

Launch

AntD Components:

Steps

Typography

IndustriesSection.jsx

Industry Tags or Cards:

Startups

Education

E-commerce

Healthcare

Fintech

Business Services

AntD Components:

Tag / Card / Col / Row

TestimonialsSection.jsx

Contents:

section heading

testimonial cards

client quote blocks

AntD Components:

Carousel or Card grid

Typography

FinalCTASection.jsx

Contents:

Headline
Ready to Build Your Digital Product?

Description
Partner with Quadravise to transform your idea into a powerful digital solution.

CTA
Start Your Project

AntD Components:

Card

Button

Typography

7. Services Page Component Map
ServicesPage.jsx

Composition:

ServicesHeroSection

WebsiteDevelopmentSection

MobileAppDevelopmentSection

CustomSoftwareSection

SaaSDevelopmentSection

MVPDevelopmentSection

ServicesCTASection

ServicesHeroSection.jsx

Headline
Software Development Services

Subtext
Quadravise provides modern software development solutions to help businesses grow digitally.

ServiceDetailCard.jsx

Reusable component for each service block.

Props:

title

description

features[]

icon

ctaText

ctaLink

Used for:

Website Development

Mobile App Development

Custom Software Development

SaaS Development

Startup MVP Development

AntD Components:

Card

List

Button

Typography

ServicesCTASection.jsx

CTA:
Book Free Development Consultation

8. Products Page Component Map
ProductsPage.jsx

Composition:

ProductsHeroSection

ProductListSection

ProductCTASection

ProductCard.jsx

Reusable component for products.

Props:

productName

description

features[]

slug

buttonText

Initially used for:

QuadraiLearn

Future scalable for:

QuadraCRM

AntD Components:

Card

Button

Tag

Typography

9. QuadraiLearn Page Component Map
QuadraILearnPage.jsx

Composition:

ProductHeroSection

ProductFeaturesSection

ProductBenefitsSection

ProductCTASection

Sections:

Headline
QuadraiLearn — Smarter Digital Learning

Features:

Interactive learning content

AI-powered learning tools

Practice tests

Performance tracking

Benefits:

Improve knowledge retention

Track progress easily

Access learning anywhere

CTA:
Start Learning with QuadraiLearn

10. Portfolio Page Component Map
PortfolioPage.jsx

Composition:

PortfolioHeroSection

PortfolioGridSection

PortfolioCTASection

PortfolioCard.jsx

Props:

title

category

description

techStack[]

outcome

image

slug

Project types:

Startup SaaS platform

Business website

Mobile application

Educational platform

AntD Components:

Card

Tag

Button

Typography

11. Blog Page Component Map
BlogPage.jsx

Composition:

BlogHeroSection

FeaturedBlogSection

BlogListSection

BlogCategoryFilter

BlogCTASection

BlogCard.jsx

Props:

title

slug

excerpt

category

featuredImage

publishedAt

author

AntD Components:

Card

Typography

Tag

Button

BlogCategoryFilter.jsx

Purpose:
Allow filtering blogs by category.

Categories:

Website Development

Mobile App Development

Startup Technology

AI Technology

SaaS Development

AntD Components:

Select / Tabs / Menu

BlogDetailPage.jsx

Composition:

ArticleHeader

ArticleContent

RelatedArticlesSection

ArticleCTASection

12. About Page Component Map
AboutPage.jsx

Composition:

AboutHeroSection

CompanyOverviewSection

MissionVisionSection

WhyQuadraviseSection

AboutCTASection

Contents:

About Quadravise

Mission

Vision

company description

13. Contact Page Component Map
ContactPage.jsx

Composition:

ContactHeroSection

ContactFormSection

ContactInfoSection

ContactCTASection

ContactFormSection.jsx

Purpose:
Capture consultation leads.

Fields:

Name

Email

Company

Project Type

Budget

Project Description

AntD Components:

Form

Input

Input.TextArea

Select

Button

Alert

Validation:

required name

required email

valid email format

required project type

description min length if provided

Submission States:

idle

loading

success

error

14. Reusable Common Components
SectionHeader.jsx

Props:

title

subtitle

align

maxWidth

CTAButton.jsx

Props:

text

onClick

type

loading

href

Wraps AntD Button with consistent style.

FeatureList.jsx

Props:

items[]

Can render bulleted or icon list.

PageBanner.jsx

Reusable page hero/banner for internal pages.

Props:

title

description

breadcrumb

EmptyState.jsx

For blog/portfolio empty states.

Uses AntD Empty component.

ErrorState.jsx

For failed API calls.

Uses AntD Result or Alert.

15. SEO Implementation in React + Vite

Since Vite is being used and not Next.js, SEO metadata should be handled using:

react-helmet-async

Create reusable component:

SEOHead.jsx

Props:

title

description

keywords

canonical

ogTitle

ogDescription

ogImage

Usage:
Each page imports SEOHead and sets page metadata.

Note:
For stronger SEO, configure pre-rendering or SSR alternatives if needed later.
At current stage, React + Vite is acceptable for service website development if metadata, sitemap, and crawlability are properly managed.

16. API Integration Map
leadService.js

Methods:

createLead(data)

Endpoint:

POST /api/leads

blogService.js

Methods:

getBlogs()

getBlogBySlug(slug)

getFeaturedBlogs()

Endpoints:

GET /api/blogs

GET /api/blogs/:slug

GET /api/blogs/featured

portfolioService.js

Methods:

getProjects()

getProjectBySlug(slug)

Endpoints:

GET /api/portfolio

GET /api/portfolio/:slug

17. Backend Node.js Module Suggestion
server/
 ├── src/
 │    ├── controllers/
 │    ├── routes/
 │    ├── services/
 │    ├── models/
 │    ├── middleware/
 │    ├── validators/
 │    ├── config/
 │    ├── utils/
 │    └── app.js
 ├── package.json
 └── server.js

Core backend modules:

lead module

blog module

portfolio module

contact notification module

18. UI State Definitions
Button States

default

hover

loading

success

disabled

Page States

loading

success

empty

error

Form States

untouched

dirty

validating

submitting

success

failed

19. Validation Rules
Contact Form

Name:

required

min 2 chars

max 100 chars

Email:

required

valid email

Company:

optional

max 150 chars

Project Type:

required

Budget:

optional but structured selection preferred

Project Description:

optional

min 20 chars if entered

max 2000 chars



20. Performance Considerations

lazy load blog images

compress assets

use route-based code splitting

optimize hero images

debounce form submission

avoid oversized AntD imports by using optimized bundling

21. Final Delivery Outcome

This component map enables developers to:

build the Quadravise website in React + Vite

use Ant Design consistently

integrate Node.js APIs cleanly

maintain reusable, scalable components

reduce ambiguity during implementation

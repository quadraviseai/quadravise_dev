# FRONTEND_ARCHITECTURE

Version: 1.0  
Project: Quadravise Website  
Frontend Stack: React + Vite + Ant Design  
Purpose: Define the frontend architecture, module boundaries, component strategy, state handling, routing, SEO handling, and scalability model for the Quadravise website.

---

# 1. Architecture Goals

The frontend architecture must be:

- modular
- reusable
- SEO-conscious
- scalable for future products
- easy to maintain
- consistent with Ant Design

Primary objectives:

- build a high-converting public website
- support service pages, product pages, blog, portfolio, and contact flows
- integrate cleanly with Node.js APIs
- allow future expansion for QuadraiLearn and QuadraCRM

---

# 2. Technology Stack

Core stack:

- React
- Vite
- Ant Design
- React Router DOM
- Axios
- react-helmet-async
- TanStack Query (recommended)

Optional utilities:

- dayjs
- clsx
- react-hook-form or AntD Form only
- zod or yup for advanced validation if needed

---

# 3. Architectural Principles

## 3.1 Component-Driven Architecture

The UI must be composed using reusable components rather than page-specific duplicated markup.

Examples:

- `SectionHeader`
- `CTAButton`
- `ServiceDetailCard`
- `PortfolioCard`
- `BlogCard`
- `PageBanner`

---

## 3.2 Page Composition Pattern

Each page should be assembled from:

- layout components
- section components
- common shared components

Example:

`HomePage.jsx` should not contain all markup inline.  
It should compose:

- `HeroSection`
- `WhatWeDoSection`
- `WhyChooseUsSection`
- `ProductsSection`
- `ProcessSection`
- `IndustriesSection`
- `TestimonialsSection`
- `FinalCTASection`

---

## 3.3 Clear Separation of Concerns

Keep responsibilities separated:

- components → UI rendering
- pages → page composition
- services → API calls
- hooks → data fetching and business-facing frontend logic
- utils → helper functions
- constants → static config and route metadata

---

# 4. Frontend Directory Structure

```text
apps/web/src/
├── assets/
├── components/
├── pages/
├── layouts/
├── routes/
├── services/
├── hooks/
├── constants/
├── utils/
├── theme/
├── styles/
├── App.jsx
└── main.jsx
5. Folder Responsibilities
5.1 assets/

Stores:

logos

icons

static images

illustrations

Suggested structure:

assets/
├── images/
├── icons/
└── logos/
5.2 components/

Reusable UI components grouped by domain.

Suggested structure:

components/
├── common/
├── layout/
├── home/
├── services/
├── products/
├── quadrailearn/
├── portfolio/
├── blog/
├── about/
├── contact/
└── seo/
5.3 pages/

High-level route pages.

Examples:

HomePage.jsx

ServicesPage.jsx

ProductsPage.jsx

QuadraILearnPage.jsx

PortfolioPage.jsx

BlogPage.jsx

BlogDetailPage.jsx

AboutPage.jsx

ContactPage.jsx

Pages should focus on composition, not implementation detail.

5.4 layouts/

Global layout wrappers.

Example:

MainLayout.jsx

Responsibilities:

header

footer

main content wrapper

optional page container structure

5.5 routes/

Central route configuration.

Example:

AppRoutes.jsx

Responsibilities:

define application paths

map pages to routes

support future lazy loading

5.6 services/

All API integration logic.

Examples:

apiClient.js

leadService.js

blogService.js

portfolioService.js

Do not call Axios directly from components.

5.7 hooks/

Reusable frontend logic, especially async data fetching.

Examples:

useBlogs.js

usePortfolio.js

useLeads.js

These hooks should wrap services and expose clean data structures.

5.8 constants/

Centralized static values.

Examples:

route constants

SEO metadata defaults

product names

navigation items

CTA labels

5.9 utils/

Pure helper functions.

Examples:

validation helpers

formatters

slug helpers

string cleanup functions

5.10 theme/

Ant Design theme configuration.

Examples:

antdTheme.js

tokens.js

This should contain Quadravise brand color tokens and theme overrides.

5.11 styles/

Global CSS, utility classes, and design tokens if needed.

Examples:

global.css

variables.css

utilities.css

6. Routing Architecture

Recommended public route structure:

/                        -> HomePage
/services                -> ServicesPage
/products                -> ProductsPage
/products/quadra-ilearn  -> QuadraILearnPage
/portfolio               -> PortfolioPage
/blog                    -> BlogPage
/blog/:slug              -> BlogDetailPage
/about                   -> AboutPage
/contact                 -> ContactPage
/*                       -> NotFoundPage

Routing library:

React Router DOM

Recommended route strategy:

static public routes now

prepare for lazy loading later

7. Layout Architecture
Main Layout

The MainLayout should wrap all public pages and include:

SiteHeader

page content

SiteFooter

Benefits:

consistent navigation

consistent footer

shared page shell

reduced duplication

Header Architecture

SiteHeader.jsx should include:

logo

main navigation

primary CTA button

mobile drawer menu

Navigation items:

Home

Services

Products

QuadraiLearn

Portfolio

Blog

About

Contact

Footer Architecture

SiteFooter.jsx should include:

short company description

navigation links

contact details

LinkedIn link

copyright

8. Component Architecture
8.1 Common Reusable Components

Must-have reusable components:

SectionHeader

CTAButton

PageBanner

FeatureList

EmptyState

ErrorState

SEOHead

These reduce duplication and improve consistency.

8.2 Section Components

Each page section should be a dedicated component.

Examples:

Homepage:

HeroSection

WhatWeDoSection

WhyChooseUsSection

ProductsSection

ProcessSection

IndustriesSection

TestimonialsSection

FinalCTASection

Services page:

ServicesHeroSection

ServiceDetailCard

ServicesCTASection

Blog:

BlogHeroSection

BlogListSection

BlogCategoryFilter

8.3 Domain Components

Examples by domain:

Home

HeroSection.jsx

WhatWeDoSection.jsx

WhyChooseUsSection.jsx

Services

ServiceDetailCard.jsx

ServicesCTASection.jsx

Products

ProductCard.jsx

Portfolio

PortfolioCard.jsx

Blog

BlogCard.jsx

BlogCategoryFilter.jsx

Contact

ContactFormSection.jsx

ContactInfoSection.jsx

9. Data Flow Architecture

Recommended flow:

UI Component
→ Hook
→ Service
→ API Client
→ Backend API

Example:

BlogPage
→ useBlogs
→ blogService.getBlogs()
→ apiClient.get('/api/blogs')

Benefits:

easy testing

reusable fetching logic

simpler components

clean API abstraction

10. State Management Strategy

For current scope, use:

local component state for UI-only interactions

TanStack Query for server data

AntD Form state for form handling

Do not introduce Redux unless complexity grows significantly.

10.1 Local State Use Cases

Use useState for:

drawer open/close

accordion expansion

filter selection

hover or toggle UI behavior

10.2 Server State Use Cases

Use TanStack Query for:

blog listing data

blog detail data

portfolio data

product content fetched from API

future testimonials or dynamic SEO pages

10.3 Form State

Use Ant Design Form for:

contact form

lead submission

future newsletter forms

Validation should be declarative and centralized.

11. SEO Architecture for React + Vite

Since the frontend uses React + Vite, SEO must be handled intentionally.

11.1 Metadata Handling

Use:

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

Every route page should render its own SEO metadata.

11.2 Sitemap and Robots

These should be generated or maintained via deployment/build process.

Required:

public/robots.txt

public/sitemap.xml

11.3 SEO Caveat

React + Vite is acceptable for the current marketing website if:

metadata is well managed

pages are crawlable

performance is strong

blog content is accessible

If SEO scale becomes a major requirement later, SSR or prerendering can be introduced selectively.

12. UI Architecture with Ant Design

Ant Design should be used consistently for:

layout

forms

buttons

cards

menus

grid

typography

loading and error states

Recommended core components:

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

Tag

Space

Divider

Empty

Spin

Alert

Result

Steps

Avoid mixing too many competing UI libraries.

13. Theming Architecture

Theme must align with the Quadravise logo-derived palette.

Recommended theme tokens:

colorPrimary = #165596

colorLink = #1E86BB

colorSuccess = #9FBC4F

colorWarning = #F8B23B

colorError = #EC5B16

Theme file:

theme/antdTheme.js

This ensures consistent branding across all components.

14. Responsive Architecture

Breakpoints:

Mobile: < 768px

Tablet: 768px - 1024px

Desktop: > 1024px

Responsive requirements:

header must collapse into drawer on mobile

cards should stack vertically on smaller screens

forms must remain readable and touch-friendly

CTA buttons must remain visible and accessible

Use AntD grid and layout utilities consistently.

15. API Integration Strategy

All HTTP requests must go through apiClient.js.

Example:

import axios from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

Service examples:

leadService.createLead(data)

blogService.getBlogs()

blogService.getBlogBySlug(slug)

portfolioService.getProjects()

Do not scatter raw endpoint strings across components.

16. Error Handling Strategy

Handle errors at three layers:

16.1 UI Layer

Show:

inline validation messages

alerts

retry UI

empty states

16.2 Service Layer

Normalize API errors into predictable structures.

16.3 Query Layer

Use TanStack Query error states to show:

loading

failure

retry action

17. Form Architecture

Primary public form:

Contact / Consultation form

Fields:

Name

Email

Company

Project Type

Budget

Project Description

Validation rules:

Name required

Email required and valid

Project Type required

Description optional but minimum length if provided

Submission states:

idle

validating

loading

success

error

18. Performance Architecture

Frontend must be optimized for:

fast first load

small bundle size

SEO-friendly performance

good mobile performance

Recommended actions:

route-based code splitting

lazy load images

compress static assets

optimize logo and hero assets

avoid heavy third-party packages

keep AntD imports efficient

Targets:

page load under 2 seconds

Lighthouse performance target 85+

19. Accessibility Architecture

Requirements:

semantic headings

accessible labels on forms

keyboard navigable menu and drawer

sufficient color contrast

visible focus states

alt text for all informative images

This is especially important for trust and usability.

20. Testing Strategy

Recommended frontend test categories:

component rendering tests

route rendering tests

form validation tests

API integration mocks

error state tests

Possible tools:

Vitest

React Testing Library

Suggested locations:

src/__tests__/
src/components/**/__tests__/
21. Build and Deployment Architecture

Build command:

npm run build

Vite output:

dist/

Deployment model:

Browser
→ Nginx
→ React static files

API requests:

Frontend
→ /api/*
→ Nginx reverse proxy
→ Node.js backend

This keeps deployment simple on VPS.

22. Future Scalability

The frontend architecture should later support:


shared component library

admin dashboard

reusable SEO page templates



Later shared packages:

packages/
├── ui/
├── theme/
└── utils/
23. Frontend Architecture Summary

The Quadravise frontend should follow:

component-first design

page composition structure

clear API abstraction

Ant Design consistency

React + Vite performance best practices

scalable route and folder organization

future-ready expansion for product ecosystem

This architecture is intentionally lightweight, maintainable, and production-ready for the current project stage.

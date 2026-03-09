# QUADRAVISE_REPOSITORY_STRUCTURE

Version: 1.0  
Frontend Stack: React + Vite + Ant Design  
Backend Stack: Node.js + Express.js  
Database: PostgreSQL  
Infrastructure: VPS + Nginx  
Purpose: Define the recommended repository structure for the Quadravise ecosystem to support scalable development, clean separation of concerns, and faster delivery.

---

# 1. Repository Strategy

For the current stage, the recommended approach is:

## Option A — Monorepo (Recommended)

Use a single repository for:

- website frontend
- backend API
- shared documentation
- deployment configuration

This is the best option for your current scale because it gives:

- easier coordination
- simpler deployment
- shared versioning
- centralized docs
- faster development

Recommended repo name:

`quadravise-platform`

---

## Option B — Multi-Repo (Future)

Separate repositories for:

- quadravise-frontend
- quadravise-backend
- quadravise-devops
- quadravise-docs

This is better only when team size and deployment complexity increase significantly.

For now, **monorepo is the correct choice**.

---

# 2. Recommended Root Structure

```text
quadravise-platform/
├── apps/
├── docs/
├── infra/
├── scripts/
├── .github/
├── .env.example
├── .gitignore
├── README.md
└── package.json
3. Apps Directory

The apps/ folder contains all runnable applications.

apps/
├── web/
└── api/
4. Frontend Structure (apps/web)
apps/web/
├── public/
├── src/
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── README.md
4.1 Frontend src/ Structure
apps/web/src/
├── assets/
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── components/
│   ├── common/
│   ├── layout/
│   ├── home/
│   ├── services/
│   ├── products/
│   ├── quadrailearn/
│   ├── portfolio/
│   ├── blog/
│   ├── about/
│   ├── contact/
│   └── seo/
│
├── pages/
│   ├── HomePage.jsx
│   ├── ServicesPage.jsx
│   ├── ProductsPage.jsx
│   ├── QuadraILearnPage.jsx
│   ├── PortfolioPage.jsx
│   ├── BlogPage.jsx
│   ├── BlogDetailPage.jsx
│   ├── AboutPage.jsx
│   ├── ContactPage.jsx
│   └── NotFoundPage.jsx
│
├── layouts/
│   └── MainLayout.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── services/
│   ├── apiClient.js
│   ├── leadService.js
│   ├── blogService.js
│   └── portfolioService.js
│
├── hooks/
│   ├── useLeads.js
│   ├── useBlogs.js
│   └── usePortfolio.js
│
├── constants/
│   ├── routes.js
│   ├── seo.js
│   └── appConfig.js
│
├── utils/
│   ├── validators.js
│   ├── helpers.js
│   └── formatters.js
│
├── theme/
│   ├── antdTheme.js
│   └── tokens.js
│
├── styles/
│   ├── global.css
│   ├── variables.css
│   └── utilities.css
│
├── App.jsx
└── main.jsx
4.2 Frontend Responsibility

The frontend should handle:

public website rendering

route navigation

page composition

UI state management

form submission

SEO metadata via react-helmet-async

API integration with backend

5. Backend Structure (apps/api)
apps/api/
├── src/
├── tests/
├── prisma/ or db/
├── .env.example
├── package.json
├── README.md
└── server.js
5.1 Backend src/ Structure
apps/api/src/
├── config/
│   ├── env.js
│   ├── db.js
│   └── logger.js
│
├── modules/
│   ├── leads/
│   ├── blogs/
│   ├── portfolio/
│   ├── contact/
│   └── health/
│
├── middleware/
│   ├── errorHandler.js
│   ├── notFound.js
│   ├── requestLogger.js
│   ├── rateLimiter.js
│   └── validateRequest.js
│
├── utils/
│   ├── response.js
│   ├── slugify.js
│   └── emailTemplates.js
│
├── app.js
└── routes.js
5.2 Module-Level Backend Structure

Example for leads module:

apps/api/src/modules/leads/
├── leads.controller.js
├── leads.service.js
├── leads.repository.js
├── leads.validator.js
├── leads.routes.js
└── leads.model.js

Recommended module pattern:

controller → handles request/response

service → business logic

repository → DB access

validator → input validation

routes → route definitions

model → schema mapping

This pattern keeps the backend clean and scalable.

6. Database Structure

If using raw SQL + query builder:

apps/api/db/
├── migrations/
├── seeds/
└── queries/

If using Prisma:

apps/api/prisma/
├── schema.prisma
├── migrations/
└── seed.js

Recommended current entities:

leads

blog_posts

blog_categories

portfolio_projects

portfolio_technologies

contact_messages

seo_pages

7. Documentation Structure
docs/
├── product/
├── brand/
├── engineering/
├── api/
└── deployment/
7.1 Product Docs
docs/product/
├── quadravise-website-user-stories.md
├── QUADRAVISE_SEO_STRATEGY.md
├── QUADRAVISE_CONTENT_PLAN_100_ARTICLES.md
├── QUADRAVISE_SITE_ARCHITECTURE.md
├── QUADRAVISE_CONVERSION_FUNNEL.md
├── QUADRAVISE_LANDING_PAGE_COPY.md
└── QUADRAVISE_REACT_VITE_ANTD_COMPONENT_MAP.md
7.2 Brand Docs
docs/brand/
└── QUADRAVISE_BRAND_DESIGN_SYSTEM.md
7.3 Engineering Docs
docs/engineering/
├── QUADRAVISE_REPOSITORY_STRUCTURE.md
├── FRONTEND_ARCHITECTURE.md
├── BACKEND_ARCHITECTURE.md
├── CODING_STANDARDS.md
└── ENVIRONMENT_SETUP.md
7.4 API Docs
docs/api/
├── leads-api.md
├── blogs-api.md
└── portfolio-api.md
7.5 Deployment Docs
docs/deployment/
├── VPS_SETUP.md
├── NGINX_CONFIGURATION.md
├── SSL_SETUP.md
├── CI_CD_PIPELINE.md
└── RELEASE_CHECKLIST.md
8. Infrastructure Directory
infra/
├── nginx/
├── systemd/
├── ssl/
└── github-actions/
8.1 Nginx Configs
infra/nginx/
├── quadravise.conf
└── api.quadravise.conf
8.2 Systemd Services
infra/systemd/
├── quadravise-web.service
└── quadravise-api.service
8.3 GitHub Actions
infra/github-actions/
├── deploy-web.yml
└── deploy-api.yml

These can later be mirrored into .github/workflows/.

9. Scripts Directory
scripts/
├── setup.sh
├── deploy-web.sh
├── deploy-api.sh
├── backup-db.sh
└── restore-db.sh

Purpose:

local setup automation

deployment commands

backup/restore support

10. GitHub Workflow Directory
.github/
└── workflows/
    ├── web-ci.yml
    ├── api-ci.yml
    └── deploy.yml

Recommended workflows:

frontend lint + build

backend lint + test

deploy to VPS on main branch

11. Environment File Strategy

Root-level example:

.env.example

Per app:

apps/web/.env.example
apps/api/.env.example
11.1 Frontend Environment Variables
VITE_API_BASE_URL=
VITE_SITE_URL=
VITE_GA_ID=
11.2 Backend Environment Variables
PORT=
NODE_ENV=
DATABASE_URL=
JWT_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER_EMAIL=
CORS_ORIGIN=

Never commit real .env files.

12. Root Package Strategy

If using workspace tooling, root package.json can manage both apps.

Example scripts:

{
  "name": "quadravise-platform",
  "private": true,
  "workspaces": [
    "apps/web",
    "apps/api"
  ],
  "scripts": {
    "dev:web": "npm --workspace apps/web run dev",
    "dev:api": "npm --workspace apps/api run dev",
    "build:web": "npm --workspace apps/web run build",
    "start:api": "npm --workspace apps/api run start"
  }
}

This simplifies development.

13. Recommended Frontend Route Mapping
/                      -> HomePage
/services              -> ServicesPage
/products              -> ProductsPage
/products/quadra-ilearn -> QuadraILearnPage
/portfolio             -> PortfolioPage
/blog                  -> BlogPage
/blog/:slug            -> BlogDetailPage
/about                 -> AboutPage
/contact               -> ContactPage
14. Recommended Backend API Mapping
GET    /api/health
POST   /api/leads
GET    /api/blogs
GET    /api/blogs/:slug
GET    /api/portfolio
GET    /api/portfolio/:slug

Future endpoints:

POST   /api/contact
GET    /api/seo/pages
POST   /api/admin/blogs
PUT    /api/admin/blogs/:id
DELETE /api/admin/blogs/:id
15. Branching Strategy

Recommended branches:

main → production-ready

develop → active integration

feature/<feature-name> → isolated development

hotfix/<issue-name> → production fixes

Examples:

feature/homepage-ui

feature/contact-form-api

feature/blog-listing-page

16. Commit Naming Standard

Recommended commit format:

feat: add homepage hero section
fix: resolve contact form validation issue
docs: add SEO strategy document
refactor: simplify lead service logic
chore: update nginx deployment script

This improves readability and release management.

17. Coding Standards
Frontend

keep components small and reusable

avoid large page files

separate UI from API logic

centralize constants and routes

use consistent naming

Naming examples:

components → HeroSection.jsx

hooks → useBlogs.js

services → leadService.js

Backend

keep controllers thin

move business logic to services

validate all inputs

centralize error handling

avoid direct DB logic inside routes

18. Testing Structure

Frontend tests:

apps/web/src/__tests__/

Backend tests:

apps/api/tests/

Recommended test categories:

unit tests

API integration tests

form validation tests

route tests

19. Deployment Model
Web App

Build Vite app:

npm run build

Deploy generated dist/ through Nginx.

API

Run Node API using:

PM2 or systemd

reverse proxy through Nginx

Recommended production flow:

Browser
→ Nginx
→ React static build
→ API reverse proxy
→ Node.js app
→ PostgreSQL

20. VPS Structure Recommendation
/var/www/quadravise/web
/var/www/quadravise/api
/var/www/quadravise/backups
/etc/nginx/sites-available/
/etc/nginx/sites-enabled/
/etc/systemd/system/

Suggested app deployment directories:

frontend build → /var/www/quadravise/web

backend app → /var/www/quadravise/api

21. Scalability Preparation

The repository should later support:

QuadraiLearn frontend

QuadraCRM frontend

shared UI library

shared backend services

admin dashboard

Future monorepo expansion:

apps/
├── web/
├── api/
├── quadrailearn/
├── quadracrm/
└── admin/

Shared packages later:

packages/
├── ui/
├── config/
├── utils/
└── eslint-config/
22. Recommended Final Repository Blueprint
quadravise-platform/
├── apps/
│   ├── web/
│   └── api/
│
├── docs/
│   ├── product/
│   ├── brand/
│   ├── engineering/
│   ├── api/
│   └── deployment/
│
├── infra/
│   ├── nginx/
│   ├── systemd/
│   ├── ssl/
│   └── github-actions/
│
├── scripts/
│   ├── setup.sh
│   ├── deploy-web.sh
│   ├── deploy-api.sh
│   ├── backup-db.sh
│   └── restore-db.sh
│
├── .github/
│   └── workflows/
│
├── .env.example
├── .gitignore
├── package.json
└── README.md
23. Final Recommendation

For Quadravise, the best current setup is:

monorepo

React + Vite + AntD frontend

Node.js + Express backend

PostgreSQL database

VPS + Nginx deployment

docs-first structure

modular backend

scalable path for QuadraiLearn and QuadraCRM

This structure is clean enough for current development and strong enough for future expansion.

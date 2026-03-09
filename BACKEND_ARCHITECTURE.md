---

# `BACKEND_ARCHITECTURE.md`

```markdown
# BACKEND_ARCHITECTURE

Version: 1.0  
Project: Quadravise Website  
Backend Stack: Node.js + Express.js  
Database: PostgreSQL  
Purpose: Define the backend architecture, module boundaries, API structure, validation model, database responsibilities, deployment model, and scalability path for the Quadravise platform.

---

# 1. Architecture Goals

The backend architecture must be:

- modular
- secure
- easy to extend
- consistent across modules
- production-friendly
- compatible with VPS deployment
- ready for future expansion into QuadraiLearn and QuadraCRM

Primary responsibilities:

- lead capture
- blog data delivery
- portfolio data delivery
- contact workflows
- SEO-related content APIs
- future admin and CMS extensions

---

# 2. Technology Stack

Core stack:

- Node.js
- Express.js
- PostgreSQL

Recommended supporting libraries:

- dotenv
- pg or Prisma
- zod / joi / express-validator
- cors
- helmet
- morgan or pino
- rate-limiter middleware
- nodemailer
- bcrypt (future auth)
- jsonwebtoken (future auth)

---

# 3. Architectural Principles

## 3.1 Modular Feature-Based Design

The backend must be organized by modules, not by file type alone.

Recommended feature modules:

- leads
- blogs
- portfolio
- contact
- health
- seo_pages (future)
- admin (future)

Each module should encapsulate its own:

- routes
- controller
- service
- repository
- validator
- model mapping

---

## 3.2 Thin Controllers

Controllers should only:

- receive request
- call validation result if needed
- invoke service
- return standardized response

Do not place business logic in controllers.

---

## 3.3 Service-Centric Business Logic

Services should contain:

- business rules
- workflow logic
- cross-module orchestration
- notification triggers
- transformation logic

---

## 3.4 Repository-Based Database Access

Repositories should isolate data access from services.

Benefits:

- easier testing
- cleaner SQL or ORM usage
- better future migration flexibility

---

# 4. Recommended Backend Structure

```text
apps/api/
├── src/
│   ├── config/
│   ├── modules/
│   ├── middleware/
│   ├── utils/
│   ├── app.js
│   └── routes.js
├── tests/
├── prisma/ or db/
├── .env.example
├── package.json
└── server.js
5. src/ Folder Responsibilities
5.1 config/

Contains system configuration.

Examples:

env.js

db.js

logger.js

Responsibilities:

load environment variables

initialize database

configure logging

centralize app-level config

5.2 modules/

Contains business modules.

Suggested structure:

modules/
├── leads/
├── blogs/
├── portfolio/
├── contact/
└── health/

Each module owns its feature logic.

5.3 middleware/

Contains shared request middleware.

Examples:

errorHandler.js

notFound.js

requestLogger.js

rateLimiter.js

validateRequest.js

5.4 utils/

Shared helper logic.

Examples:

standardized API response builder

slug generation

email templates

async wrapper helpers

6. Module Architecture Pattern

Each module should follow this structure:

modules/<module-name>/
├── <module>.routes.js
├── <module>.controller.js
├── <module>.service.js
├── <module>.repository.js
├── <module>.validator.js
└── <module>.model.js
6.1 Controller Responsibilities

parse request inputs

invoke service

send response

pass errors to middleware

6.2 Service Responsibilities

apply business logic

call repositories

trigger notifications

transform DB results into response DTOs

6.3 Repository Responsibilities

execute SQL or ORM queries

return normalized DB results

isolate persistence logic

6.4 Validator Responsibilities

validate request body

validate query params

validate route params

6.5 Model Responsibilities

If using raw SQL, this may be minimal.
If using ORM/Prisma, model/schema definitions live here or under prisma/.

7. Core Modules
7.1 Health Module

Purpose:

verify API uptime

support monitoring

support deployment checks

Endpoint:

GET /api/health

Response example:

{
  "status": "ok",
  "service": "quadravise-api"
}
7.2 Leads Module

Purpose:

capture consultation requests

validate lead data

persist leads

trigger email notification

Endpoints:

POST /api/leads

Core fields:

name

email

company

project_type

budget

description

7.3 Blogs Module

Purpose:

provide blog listing

provide blog detail by slug

support featured posts

support SEO content rendering

Endpoints:

GET /api/blogs

GET /api/blogs/:slug

GET /api/blogs/featured (optional)

7.4 Portfolio Module

Purpose:

expose portfolio projects

expose single project detail

support trust-building on website

Endpoints:

GET /api/portfolio

GET /api/portfolio/:slug

7.5 Contact Module

Purpose:

support future general contact submissions

support additional inquiry flows

separate consultation lead capture from generic contact messages if needed

8. API Routing Structure

Top-level route map:

/api/health
/api/leads
/api/blogs
/api/portfolio

Recommended central routing:

app.use("/api/health", healthRoutes);
app.use("/api/leads", leadsRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/portfolio", portfolioRoutes);
9. Standard API Response Shape

Use consistent response patterns.

Success Example
{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "lead_id": "123"
  }
}
Error Example
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}

Consistent responses improve frontend simplicity.

10. Validation Architecture

All incoming data must be validated before service logic executes.

Recommended categories:

body validation

params validation

query validation

Example lead validation rules:

name required, min 2 chars

email required, valid format

project_type required

company optional

budget optional

description optional but minimum length if present

Validation errors must return 400 Bad Request.

11. Error Handling Architecture

Centralized error handling is mandatory.

Flow:

Route
→ Controller
→ Service
→ throw error
→ errorHandler.js

Error types:

validation error

not found

database error

external service error

unexpected internal error

Benefits:

consistent error responses

less duplicated try/catch

cleaner controller code

12. Middleware Architecture

Recommended middleware stack:

helmet() for secure headers

cors() for allowed frontend origin

express.json()

request logger

rate limiter

route handlers

not found handler

error handler

Suggested order:

security middleware

parsers

logging

rate limiting

routes

not found

error handler

13. Security Architecture

Minimum security requirements:

CORS restricted to known frontend origin

helmet enabled

rate limiting on public endpoints

validation on all inputs

SQL injection-safe query handling

XSS-safe output practices

hidden internal error details in production

For contact/lead forms, add:

spam protection

optional CAPTCHA

submission throttling

14. Database Architecture

Database: PostgreSQL

Recommended current entities:

leads

blog_posts

blog_categories

portfolio_projects

portfolio_technologies

contact_messages

seo_pages (future)

14.1 Leads Table

Suggested fields:

id

name

email

company

project_type

budget

description

created_at

14.2 Blog Posts Table

Suggested fields:

id

title

slug

excerpt

content

meta_title

meta_description

author

category_id

featured_image

published_at

is_published

created_at

updated_at

14.3 Portfolio Projects Table

Suggested fields:

id

title

slug

category

description

tech_stack

outcome

featured_image

is_published

created_at

updated_at

15. ORM / Query Strategy

Two valid approaches:

Option A — Prisma

Recommended if you want:

schema clarity

migrations

better developer experience

typed query ergonomics later

Option B — pg + SQL

Recommended if you want:

lean runtime

direct SQL control

simpler dependency footprint

For current scale, either is fine.
If the project will expand into multiple products, Prisma is attractive for long-term maintainability.

16. Service Layer Workflow Examples
16.1 Create Lead Workflow

Request
→ validate payload
→ persist lead
→ send email notification
→ return success response

16.2 Get Blogs Workflow

Request
→ validate query params
→ fetch published blogs
→ map output DTO
→ return list

16.3 Get Portfolio Workflow

Request
→ fetch published portfolio items
→ transform tech stack fields
→ return response

17. Notification Architecture

When a lead is created, backend should trigger notification workflow.

Options:

send email immediately

persist first, send asynchronously if needed later

Recommended initial flow:

create lead in DB

send email to business inbox

log failure if email fails

do not lose lead if email sending fails

This is important: lead persistence must not depend entirely on email success.

18. Logging Architecture

Use structured logging.

Recommended logs:

incoming request

validation failure

database failure

email notification failure

deployment health startup

unhandled exceptions

Do not log sensitive secrets.

Environment-based logging:

verbose in development

controlled in production

19. Configuration Architecture

All configuration must come from environment variables.

Examples:

PORT=
NODE_ENV=
DATABASE_URL=
CORS_ORIGIN=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER_EMAIL=

Do not hardcode environment-specific settings in application logic.

20. Testing Architecture

Recommended backend test categories:

route tests

controller tests

service tests

repository tests

validation tests

Suggested tools:

Vitest or Jest

Supertest for API testing

Suggested test locations:

tests/
├── integration/
├── unit/
└── fixtures/

Key scenarios:

create lead success

create lead validation failure

blog list retrieval

blog detail not found

portfolio fetch success

health endpoint success

21. Deployment Architecture

Deployment environment:

Ubuntu VPS

Nginx reverse proxy

Node.js process via systemd or PM2

PostgreSQL database

Production flow:

Browser
→ Nginx
→ /api/* reverse proxy
→ Express app
→ PostgreSQL

21.1 Process Management

Recommended:

systemd for service lifecycle
or

PM2 for process supervision

If the server already uses systemd heavily, remain consistent with systemd.

21.2 Nginx Reverse Proxy

Typical flow:

frontend static build served by Nginx

API proxied to Node server on internal port

Example pattern:

website domain → frontend build

/api → Node backend

22. Performance Architecture

Performance targets:

health endpoint < 100ms

most read endpoints < 200ms

efficient DB queries

proper indexing on slug and published fields

Performance recommendations:

paginate blog data later

index slugs

index published_at

keep payloads minimal

avoid returning unnecessary fields

23. Scalability Architecture

The backend must be ready to evolve into a multi-product platform.

Future expansion:

QuadraiLearn APIs

QuadraCRM APIs

admin CMS

authentication and authorization

media management

SEO page management

Future structure may expand to:

modules/
├── leads/
├── blogs/
├── portfolio/
├── contact/
├── users/
├── auth/
├── cms/
├── quadrailearn/
└── quadracrm/

This module pattern supports scale without rewrite.

24. Admin Readiness

Even if admin is not built initially, architecture should anticipate it.

Future admin use cases:

create/edit blog posts

manage portfolio items

manage SEO pages

export leads

review contact submissions

Prepare for:

protected admin routes

admin service modules

role-based authorization later

25. Recommended Initial Endpoint Set
GET    /api/health
POST   /api/leads
GET    /api/blogs
GET    /api/blogs/:slug
GET    /api/portfolio
GET    /api/portfolio/:slug

Future endpoints:

POST   /api/contact
GET    /api/seo/pages/:slug
POST   /api/admin/blogs
PUT    /api/admin/blogs/:id
DELETE /api/admin/blogs/:id
26. Backend Architecture Summary

The Quadravise backend should follow:

modular feature-based design

thin controllers

service-first business logic

repository-based persistence

centralized validation

centralized error handling

PostgreSQL-backed APIs

secure public endpoint practices

VPS-friendly deployment

future-ready expansion into QuadraiLearn and QuadraCRM

This architecture is lean enough for immediate execution and structured enough for long-term growth.

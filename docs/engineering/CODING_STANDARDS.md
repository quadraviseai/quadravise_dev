# CODING_STANDARDS

Version: 1.0  
Project: Quadravise Platform  
Frontend Stack: React + Vite + Ant Design  
Backend Stack: Node.js + Express.js  
Database: PostgreSQL  
Purpose: Define the coding standards, naming conventions, structure rules, quality expectations, and review guidelines for the Quadravise codebase.

---

# 1. Objective

These coding standards exist to ensure the Quadravise platform codebase remains:

- readable
- maintainable
- scalable
- predictable
- secure
- easy for multiple developers or AI coding tools to extend

All contributors must follow these standards across:

- frontend
- backend
- database
- scripts
- documentation

---

# 2. Core Engineering Principles

Every code contribution must prioritize:

- clarity over cleverness
- consistency over personal style
- modularity over duplication
- explicitness over ambiguity
- maintainability over short-term speed

Preferred mindset:

- write code that another developer can understand quickly
- keep side effects obvious
- avoid hidden business rules
- structure code for future scaling

---

# 3. General Rules

## 3.1 Keep Files Focused

Each file should have a single clear responsibility.

Bad example:

- one file handles routes, validation, DB queries, and email logic

Good example:

- controller handles request/response
- service handles business logic
- repository handles database access
- validator handles request validation

---

## 3.2 Prefer Explicit Names

Use names that explain purpose.

Bad:

```js
const data = ...
const temp = ...
function handle() {}

Good:

const portfolioProjects = ...
const validatedLeadPayload = ...
function createLeadSubmission() {}
3.3 Avoid Magic Values

Move repeated literals into named constants.

Bad:

if (description.length > 2000) { ... }

Good:

const MAX_PROJECT_DESCRIPTION_LENGTH = 2000;

if (description.length > MAX_PROJECT_DESCRIPTION_LENGTH) { ... }
3.4 Minimize Nesting

Prefer guard clauses and smaller functions over deeply nested logic.

Bad:

if (user) {
  if (user.email) {
    if (user.isActive) {
      // logic
    }
  }
}

Good:

if (!user) return;
if (!user.email) return;
if (!user.isActive) return;

// logic
4. Naming Conventions
4.1 General Naming Rules

Use:

descriptive names

domain-specific terminology

consistent casing by context

Avoid:

unclear abbreviations

single-letter variables except loop indexes in trivial cases

inconsistent pluralization

4.2 File Naming
Frontend Components

Use PascalCase.

Examples:

HeroSection.jsx
SiteHeader.jsx
PortfolioCard.jsx
ContactFormSection.jsx
Hooks

Use camelCase prefixed with use.

Examples:

useBlogs.js
usePortfolio.js
useLeads.js
Services

Use camelCase with domain + Service.

Examples:

leadService.js
blogService.js
portfolioService.js
Utility Files

Use camelCase.

Examples:

validators.js
formatters.js
slugify.js
Backend Files

Use domain-based consistent module naming.

Examples:

leads.controller.js
leads.service.js
leads.repository.js
leads.validator.js
leads.routes.js
4.3 Variable Naming

Use camelCase.

Examples:

const blogPosts = [];
const leadPayload = {};
const selectedProjectType = "";

Use plural names for arrays:

const featuredBlogs = [];
const portfolioProjects = [];

Use boolean prefixes:

const isLoading = false;
const hasError = false;
const canSubmit = true;
4.4 Function Naming

Functions should describe action.

Good:

createLead
fetchPublishedBlogs
formatProjectTypeLabel
validateContactForm
mapPortfolioResponse

Avoid vague names:

doStuff
handleData
runTask
processThing
5. Frontend Coding Standards
5.1 Component Design

Each component should have one clear purpose.

Bad:

one massive component rendering a full page with all logic inline

Good:

page component composes multiple smaller section components

5.2 Prefer Reusable Components

If the same UI pattern appears more than once, extract it.

Examples for reuse:

section header

CTA button

card layout

page banner

empty state

error state

5.3 Keep JSX Clean

Move complex logic outside JSX.

Bad:

return (
  <div>
    {blogs && blogs.length > 0
      ? blogs.filter((blog) => blog.isPublished && blog.category !== "Hidden").map(...)
      : null}
  </div>
);

Good:

const visibleBlogs = blogs.filter(
  (blog) => blog.isPublished && blog.category !== "Hidden"
);

return <div>{visibleBlogs.map(...)}</div>;
5.4 Do Not Call APIs Directly in Presentational Components

API interaction must go through:

service layer

hooks layer

Bad:

useEffect(() => {
  axios.get("/api/blogs").then(...);
}, []);

Good:

const { blogs, isLoading, error } = useBlogs();
5.5 Component Props Must Be Clear

Prefer explicit props over overloaded object blobs unless the object is a real domain entity.

Good:

<CTAButton text="Book Free Consultation" href="/contact" />

Reasonable:

<PortfolioCard project={project} />

Avoid:

<MyComponent data={data} />

when data is ambiguous.

5.6 Form Handling

Use Ant Design Form consistently for public forms.

Rules:

validate on submit and relevant blur/change events

display user-friendly validation messages

disable submit while submitting

show success or failure feedback clearly

5.7 Styling Standards

Preferred order:

Ant Design props and layout system

local component CSS or scoped styling approach

shared utility classes

global styles only when necessary

Avoid large unstructured CSS files.

5.8 Avoid Hardcoding Repeated Content in Multiple Places

Centralize repeated labels and navigation items in constants where appropriate.

Examples:

navigation items

CTA labels

route paths

SEO defaults

6. React Standards
6.1 Hooks Rules

only call hooks at top level

never call hooks conditionally

keep custom hooks focused

custom hooks should encapsulate reusable logic, not page-specific hacks

6.2 useEffect Rules

Use useEffect only when necessary.

Do not use it for logic that can be derived directly during render.

Bad:

useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

Good:

const fullName = `${firstName} ${lastName}`;
6.3 State Rules

Use state only for truly changeable UI data.

Do not store derived values in state unless there is a real reason.

6.4 Keys in Lists

Always use stable unique keys.

Bad:

{blogs.map((blog, index) => (
  <BlogCard key={index} blog={blog} />
))}

Good:

{blogs.map((blog) => (
  <BlogCard key={blog.id} blog={blog} />
))}
7. Backend Coding Standards
7.1 Module Structure

Every backend module should follow:

module/
├── module.routes.js
├── module.controller.js
├── module.service.js
├── module.repository.js
├── module.validator.js
└── module.model.js

Do not merge these concerns into one file unless the feature is extremely trivial.

7.2 Controllers Must Stay Thin

Controller responsibilities:

parse request

call service

return response

pass errors to middleware

Controllers must not:

contain SQL

contain email delivery logic

contain large conditional workflows

7.3 Services Hold Business Logic

Services should contain:

workflow logic

orchestration

rule enforcement

transformations

notification triggers

7.4 Repositories Handle Persistence

Repositories should be the only layer directly talking to the database.

Benefits:

easier unit testing

easier DB refactoring

better separation of concerns

7.5 Validate All External Input

Every public route must validate:

request body

route params

query params

Never trust client input.

7.6 Use Consistent Response Shapes

Success example:

{
  "success": true,
  "message": "Lead created successfully",
  "data": {
    "leadId": "123"
  }
}

Error example:

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
8. Database Standards
8.1 Naming Conventions

Use snake_case for database tables and columns.

Good:

blog_posts

portfolio_projects

project_type

created_at

Avoid mixed styles like:

blogPosts

createdAt

8.2 Primary Keys

Use a consistent ID strategy across all tables.

Recommended:

UUID or big integer IDs

Choose one and remain consistent.

8.3 Timestamps

Every major table should include:

created_at

updated_at

For publishable content:

published_at

8.4 Soft Delete Strategy

Only use soft deletes where necessary.

For many public website entities, is_published is often better than deleting content.

9. API Standards
9.1 REST Naming

Use resource-based endpoint names.

Good:

GET /api/blogs
GET /api/blogs/:slug
POST /api/leads
GET /api/portfolio

Avoid verb-heavy routes:

POST /api/createLead
GET /api/getAllBlogs
9.2 HTTP Method Semantics

Use methods properly:

GET for read

POST for create

PUT for full update

PATCH for partial update

DELETE for delete

9.3 Status Codes

Use consistent status codes.

Examples:

200 OK

201 Created

400 Bad Request

401 Unauthorized

403 Forbidden

404 Not Found

409 Conflict

500 Internal Server Error

10. Error Handling Standards
10.1 Never Swallow Errors Silently

Bad:

try {
  await sendEmail();
} catch (error) {}

Good:

try {
  await sendEmail();
} catch (error) {
  logger.error("Failed to send lead notification email", { error });
}
10.2 User-Facing Errors Must Be Safe

Do not expose stack traces or internal DB details to clients.

Bad:

{
  "message": "PrismaClientKnownRequestError..."
}

Good:

{
  "message": "An unexpected error occurred"
}
11. Logging Standards
11.1 Log Important Events

Log:

server startup

request failures

validation failures

email failures

database failures

deployment health checks

Do not log:

passwords

secrets

tokens

sensitive personal data unnecessarily

11.2 Use Structured Logs

Prefer structured metadata over random console text.

Good:

logger.error("Lead creation failed", {
  route: "/api/leads",
  email: payload.email,
  error: error.message,
});
12. Security Standards
12.1 Never Trust Client Data

All client inputs must be validated and sanitized.

12.2 Protect Secrets

Never hardcode:

database URLs

JWT secrets

SMTP credentials

API keys

All secrets must live in environment variables.

12.3 Prevent Injection Risks

Use parameterized queries or safe ORM patterns.

Never concatenate raw SQL from user input.

Bad:

const query = `SELECT * FROM blog_posts WHERE slug = '${slug}'`;

Good:

Use parameterized query or ORM safe filters.

12.4 Public Forms Must Be Rate Limited

Protect lead/contact endpoints against spam and abuse.

13. Documentation Standards
13.1 Document Public Modules

Every major module should have at least minimal documentation for:

purpose

routes

inputs

outputs

dependencies

13.2 Keep README Files Useful

Each app-level README should include:

setup steps

run commands

environment variables

deployment notes

13.3 Code Comments

Write comments only when they add value.

Good uses of comments:

explain non-obvious decisions

explain business rules

explain complex edge-case handling

Do not comment obvious code.

Bad:

// increment i
i++;
14. Formatting Standards
14.1 Use Automated Formatting

Use consistent tooling such as:

Prettier

ESLint

All contributors should format code before commit.

14.2 Line Length

Prefer readable line lengths.
Do not compress logic into single long lines.

14.3 Import Order

Recommended order:

external libraries

internal absolute/shared modules

relative modules

styles

Example:

import React from "react";
import { Button } from "antd";

import { createLead } from "@/services/leadService";
import { validateEmail } from "@/utils/validators";

import "./ContactFormSection.css";
15. Testing Standards
15.1 Test Critical Business Flows

At minimum, cover:

lead creation success

lead validation failure

blog list fetch

blog detail not found

portfolio fetch

contact form validation

15.2 Test Names Should Be Descriptive

Bad:

it("works", () => {})

Good:

it("should create a lead when valid payload is submitted", () => {})
15.3 Tests Must Be Deterministic

Do not write flaky tests depending on random timing or environment side effects.

16. Git Standards
16.1 Branch Names

Use:

feature/...

fix/...

hotfix/...

docs/...

refactor/...

Examples:

feature/homepage-hero

feature/contact-form-api

docs/seo-strategy-update

16.2 Commit Message Format

Use conventional, readable commits.

Examples:

feat: add services page hero section
fix: correct lead form email validation
docs: add backend architecture specification
refactor: simplify portfolio repository mapping
chore: update deployment script
17. Pull Request Standards

Every PR should:

have a clear title

explain what changed

explain why it changed

list affected modules

mention testing performed

remain reasonably scoped

Avoid giant multi-purpose PRs when possible.

18. Code Review Standards

Review for:

correctness

readability

naming quality

modularity

validation/security

error handling

duplication

performance implications

Reject code if it is:

ambiguous

tightly coupled

overly complex

inconsistent with module structure

19. AI-Assisted Development Standards

Since AI coding tools may be used, generated code must still meet the same standards.

Rules:

never paste AI-generated code blindly

refactor generated code to match project conventions

validate naming, structure, and error handling

ensure generated code aligns with architecture documents

remove dead or redundant code introduced by generation

AI is an accelerator, not a quality substitute.

20. Frontend Checklist Before Merge

component names are clear

no raw API calls in UI components

UI states handled

loading and error states handled

responsive behavior checked

SEO metadata handled where required

no duplicated large blocks unnecessarily

21. Backend Checklist Before Merge

inputs validated

controller thin

service logic isolated

repository access clean

errors handled centrally

logs added where meaningful

response shape consistent

secrets not exposed

22. Definition of Done

A task is considered done only when:

implementation follows architecture

code is readable and modular

validation exists

error handling exists

tests or verification are completed

documentation is updated if required

formatting/linting passes

23. Final Standard

Quadravise code should feel:

clean

predictable

modular

professional

easy to extend

The goal is not just working code.
The goal is production-ready code that scales with the business and team.
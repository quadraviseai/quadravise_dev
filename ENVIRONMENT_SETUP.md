# ENVIRONMENT_SETUP

Version: 1.0  
Project: Quadravise Platform  
Frontend Stack: React + Vite + Ant Design  
Backend Stack: Node.js + Express.js  
Database: PostgreSQL  
Infrastructure: VPS + Nginx  
Purpose: Define the complete local development, staging, and production environment setup process for the Quadravise platform.

---

# 1. Objective

This document ensures every developer can set up the Quadravise platform consistently across environments.

It covers:

- local development setup
- frontend environment setup
- backend environment setup
- database setup
- VPS deployment preparation
- required tools
- environment variables
- verification steps

The goal is to reduce setup ambiguity and make onboarding faster.

---

# 2. Environment Types

The Quadravise platform should support the following environments:

## Local

Used for developer machine setup.

Purpose:

- development
- debugging
- testing

---

## Staging

Used for pre-production testing.

Purpose:

- QA validation
- release checks
- stakeholder review

---

## Production

Used for live application deployment.

Purpose:

- public website
- live lead capture
- SEO indexing
- portfolio/blog delivery

---

# 3. Required Tooling

Install the following tools before starting.

## Core Tools

- Git
- Node.js LTS
- npm
- PostgreSQL
- VS Code or equivalent IDE

---

## Recommended Versions

- Node.js: 20.x LTS
- npm: 10.x or compatible
- PostgreSQL: 14+ recommended
- Git: latest stable

---

## Optional but Recommended Tools

- Postman or Insomnia
- pgAdmin
- DBeaver
- curl
- PM2 (optional for non-systemd local testing)
- Docker (optional, not mandatory for initial setup)

---

# 4. Repository Structure Assumption

This setup assumes the following monorepo structure:

```text
quadravise-platform/
├── apps/
│   ├── web/
│   └── api/
├── docs/
├── infra/
├── scripts/
├── .github/
├── .env.example
├── package.json
└── README.md
5. Clone Repository
git clone <your-repository-url>
cd quadravise-platform
6. Root Setup

If using npm workspaces, install root dependencies:

npm install

If workspaces are not yet configured, install dependencies separately in each app.

7. Frontend Environment Setup

Frontend location:

apps/web
7.1 Install Frontend Dependencies
cd apps/web
npm install
7.2 Frontend Environment File

Create:

apps/web/.env

Example:

VITE_API_BASE_URL=http://localhost:5000
VITE_SITE_URL=http://localhost:5173
VITE_GA_ID=
7.3 Frontend Environment Variables
VITE_API_BASE_URL

Purpose:
Base URL for backend API.

Local example:

VITE_API_BASE_URL=http://localhost:5000

Production example:

VITE_API_BASE_URL=https://quadravise.com

If API is served under /api, frontend requests should resolve correctly through Nginx.

VITE_SITE_URL

Purpose:
Frontend site base URL.

Local:

VITE_SITE_URL=http://localhost:5173

Production:

VITE_SITE_URL=https://quadravise.com
VITE_GA_ID

Purpose:
Google Analytics measurement ID.

Optional for local development.

7.4 Start Frontend Development Server
npm run dev

Expected default local URL:

http://localhost:5173
7.5 Frontend Verification Checklist

Verify:

app starts without build errors

routes load correctly

Ant Design components render correctly

API calls target expected backend URL

logo and assets load correctly

8. Backend Environment Setup

Backend location:

apps/api
8.1 Install Backend Dependencies
cd apps/api
npm install
8.2 Backend Environment File

Create:

apps/api/.env

Example:

PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/quadravise_db
CORS_ORIGIN=http://localhost:5173
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER_EMAIL=
8.3 Backend Environment Variables
PORT

Purpose:
Node API server port.

Example:

PORT=5000
NODE_ENV

Values:

development

staging

production

Local example:

NODE_ENV=development
DATABASE_URL

Purpose:
PostgreSQL connection string.

Format:

postgresql://<username>:<password>@<host>:<port>/<database_name>

Example:

DATABASE_URL=postgresql://postgres:password@localhost:5432/quadravise_db
CORS_ORIGIN

Purpose:
Allowed frontend origin for API requests.

Local example:

CORS_ORIGIN=http://localhost:5173

Production example:

CORS_ORIGIN=https://quadravise.com
SMTP Variables

Used for lead notification emails.

SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER_EMAIL=

These may remain blank during early local development if email sending is disabled or mocked.

8.4 Start Backend Server
npm run dev

Expected default local URL:

http://localhost:5000
8.5 Backend Verification Checklist

Verify:

server starts without crash

/api/health returns success

DB connection initializes successfully

validation middleware works

logs appear correctly in console

9. PostgreSQL Setup
9.1 Create Database

Open PostgreSQL shell or use pgAdmin/DBeaver.

Example SQL:

CREATE DATABASE quadravise_db;
9.2 Create Database User (Optional but Recommended)
CREATE USER quadravise_user WITH PASSWORD 'strong_password';
GRANT ALL PRIVILEGES ON DATABASE quadravise_db TO quadravise_user;

If using a dedicated app user, update DATABASE_URL accordingly.

9.3 Verify Database Connection

Use:

psql -U postgres -d quadravise_db

or:

psql postgresql://postgres:password@localhost:5432/quadravise_db
10. Database Migration Strategy

There are two possible approaches.

Option A — Prisma

If using Prisma:

npx prisma generate
npx prisma migrate dev

Seed data if needed:

node prisma/seed.js
Option B — SQL Migration Scripts

If using SQL migration files, run them in order using:

psql

migration script runner

custom scripts

Example:

psql -U postgres -d quadravise_db -f db/migrations/001_init.sql
11. Local Run Sequence

Recommended startup order:

PostgreSQL

Backend API

Frontend app

Example Sequence
Terminal 1 — Database

Ensure PostgreSQL service is running.

Linux example:

sudo systemctl start postgresql
Terminal 2 — Backend
cd apps/api
npm run dev
Terminal 3 — Frontend
cd apps/web
npm run dev
12. Local Health Check

After both apps are running, verify the following:

Frontend

Open:

http://localhost:5173

Expected:

homepage renders

no console errors

navigation works

Backend

Open:

http://localhost:5000/api/health

Expected response example:

{
  "status": "ok",
  "service": "quadravise-api"
}
API Integration

Submit a test contact or lead form and verify:

request reaches backend

validation works

DB insert occurs

success response returns

13. Recommended .env.example Files
Root .env.example

Optional root-level shared reference:

# Shared environment reference only
NODE_ENV=development
Frontend .env.example

Path:

apps/web/.env.example

Content:

VITE_API_BASE_URL=http://localhost:5000
VITE_SITE_URL=http://localhost:5173
VITE_GA_ID=
Backend .env.example

Path:

apps/api/.env.example

Content:

PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://postgres:password@localhost:5432/quadravise_db
CORS_ORIGIN=http://localhost:5173
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
CONTACT_RECEIVER_EMAIL=
14. Build Commands
Frontend Build
cd apps/web
npm run build

Expected output:

apps/web/dist/
Backend Production Start
cd apps/api
npm run start

or if using a production server file:

node server.js
15. VPS Deployment Preparation

Production target stack:

Ubuntu VPS

Nginx

Node.js

PostgreSQL

systemd or PM2

Certbot SSL

15.1 Required VPS Packages

Install on Ubuntu:

sudo apt update
sudo apt install -y nginx postgresql postgresql-contrib curl git

Install Node.js LTS separately using NodeSource or preferred method.

15.2 Recommended Directory Structure on VPS
/var/www/quadravise/web
/var/www/quadravise/api
/var/www/quadravise/backups
15.3 Frontend Deployment Flow

Build Vite frontend

Copy dist/ contents to:

/var/www/quadravise/web

Configure Nginx to serve static assets

15.4 Backend Deployment Flow

Deploy backend source to:

/var/www/quadravise/api

Install dependencies

Configure .env

Run with systemd or PM2

Reverse proxy /api via Nginx

16. Nginx Environment Expectations

Nginx should:

serve frontend static files

proxy /api/ requests to backend

support HTTPS

handle SPA route fallback

Example production flow:

Browser
→ Nginx
→ static React build
→ /api/* reverse proxy
→ Node.js app

17. SPA Routing Configuration

Since the frontend uses React Router, Nginx must route unknown frontend URLs back to index.html.

This prevents direct URL refresh failures for routes like:

/services

/portfolio

/blog/my-article

18. systemd Service Setup (Recommended)

If using systemd for backend process management, service file location:

/etc/systemd/system/quadravise-api.service

Typical flow:

sudo systemctl daemon-reload
sudo systemctl enable quadravise-api
sudo systemctl start quadravise-api
sudo systemctl status quadravise-api

Use consistent naming aligned with deployment docs.

19. Production Environment Variables

Production backend .env example:

PORT=5000
NODE_ENV=production
DATABASE_URL=postgresql://quadravise_user:strong_password@localhost:5432/quadravise_db
CORS_ORIGIN=https://quadravise.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_user
SMTP_PASS=your_password
CONTACT_RECEIVER_EMAIL=hello@quadravise.com

Production frontend .env example:

VITE_API_BASE_URL=https://quadravise.com
VITE_SITE_URL=https://quadravise.com
VITE_GA_ID=G-XXXXXXXXXX
20. Security Setup Notes

Environment setup must follow these security rules:

never commit .env files

commit only .env.example

keep secrets out of source code

use strong database passwords

restrict CORS in production

enable HTTPS in production

rotate secrets if exposed

21. Common Setup Issues
Frontend cannot reach backend

Possible causes:

incorrect VITE_API_BASE_URL

backend not running

CORS misconfiguration

wrong proxy path

Backend cannot connect to PostgreSQL

Possible causes:

incorrect DATABASE_URL

PostgreSQL service not running

wrong username/password

database not created

API works locally but fails behind Nginx

Possible causes:

bad reverse proxy config

wrong upstream port

missing /api proxy rule

CORS mismatch

React routes fail on refresh in production

Possible cause:

Nginx not configured for SPA fallback to index.html

22. Developer Onboarding Checklist

A developer is considered successfully onboarded when they can:

clone the repo

install dependencies

create .env files

start PostgreSQL

run backend locally

run frontend locally

access homepage

hit /api/health

submit a lead successfully

23. Pre-Deployment Checklist

Before staging or production deployment, verify:

.env values are correct

database exists

migrations are applied

frontend builds successfully

backend starts successfully

API health check passes

Nginx config is valid

SSL setup is ready

domain DNS is pointed correctly

24. Recommended Setup Commands Summary
Frontend
cd apps/web
npm install
npm run dev
Backend
cd apps/api
npm install
npm run dev
Database
sudo systemctl start postgresql

Create DB if required:

CREATE DATABASE quadravise_db;
25. Final Outcome

This environment setup ensures the Quadravise platform can be run consistently across:

developer machines

staging servers

production VPS environments

It creates a repeatable, low-ambiguity setup process and supports faster onboarding, safer deployment, and more reliable development.
# Quadravise Platform

Monorepo for the Quadravise marketing website and API.

## Stack
- Frontend: React + Vite + Ant Design
- Backend: Node.js + Express
- Database: PostgreSQL

## Apps
- `apps/web` public website
- `apps/api` backend API

## Quick start
1. `npm install`
2. Create `apps/web/.env` and `apps/api/.env` from their `.env.example` files.
3. Run API database setup in `apps/api`:
   `npm run db:migrate`
   `npm run db:seed`
4. Run `npm run dev:api`
5. Run `npm run dev:web`

## Core routes
- Web: `/`, `/services`, `/products`, `/products/quadra-ilearn`, `/portfolio`, `/blog`, `/blog/:slug`, `/about`, `/contact`
- API: `GET /api/health`, `POST /api/leads`, `GET /api/blogs`, `GET /api/blogs/:slug`, `GET /api/portfolio`, `GET /api/portfolio/:slug`

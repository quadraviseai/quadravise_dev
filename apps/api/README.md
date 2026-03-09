# Quadravise API

Express API with PostgreSQL-ready configuration.

## Run
- `npm install`
- Create `.env` from `.env.example`
- `npm run db:migrate`
- `npm run db:seed`
- `npm run dev`

## Routes
- `GET /api/health`
- `POST /api/leads`
- `GET /api/blogs`
- `GET /api/blogs/:slug`
- `GET /api/portfolio`
- `GET /api/portfolio/:slug`

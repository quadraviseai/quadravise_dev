#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/Quadravise}"
BRANCH="${BRANCH:-main}"

cd "$APP_ROOT"

git fetch origin "$BRANCH"
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

npm install
npm run build:web

cd apps/api
npm run db:migrate
npm run db:seed

sudo systemctl restart quadravise-api
sudo nginx -t
sudo systemctl reload nginx

curl -fsS http://127.0.0.1:5000/api/health

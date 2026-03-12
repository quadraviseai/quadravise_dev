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

for _ in 1 2 3 4 5 6 7 8 9 10; do
  if curl -fsS http://127.0.0.1:5000/api/health; then
    exit 0
  fi
  sleep 2
done

echo "API health check failed after restart" >&2
exit 1

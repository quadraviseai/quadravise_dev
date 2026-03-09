#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/Quadravise}"

cd "$APP_ROOT"
npm install

cd apps/api
npm run db:migrate
npm run db:seed

sudo systemctl restart quadravise-api
sudo systemctl status quadravise-api --no-pager --full

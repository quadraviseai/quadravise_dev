#!/usr/bin/env bash
set -euo pipefail

APP_ROOT="${APP_ROOT:-/var/www/Quadravise}"

cd "$APP_ROOT"
npm install
npm run build:web

sudo systemctl reload nginx

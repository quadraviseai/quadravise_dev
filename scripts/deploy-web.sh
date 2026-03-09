#!/usr/bin/env bash
set -e
cd apps/web
npm run build
rsync -av dist/ /var/www/quadravise/web/

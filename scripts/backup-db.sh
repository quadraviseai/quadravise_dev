#!/usr/bin/env bash
set -e
pg_dump "$DATABASE_URL" > /var/www/quadravise/backups/quadravise_$(date +%Y%m%d_%H%M%S).sql

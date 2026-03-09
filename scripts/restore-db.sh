#!/usr/bin/env bash
set -e
psql "$DATABASE_URL" < "$1"

#!/usr/bin/env bash
set -e
cd apps/api
npm install --omit=dev
sudo systemctl restart quadravise-api

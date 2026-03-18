# Deployment Docs

VPS, Nginx, SSL, CI/CD and release checklists.

## GitHub Actions deploy

The repository includes a deploy workflow at `.github/workflows/deploy.yml`.
It deploys automatically on every push to `main` and can also be started manually with `workflow_dispatch`.

Required GitHub repository secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_PASSWORD`

The workflow SSHes into the VPS and runs `scripts/deploy-vps.sh` inside `/var/www/Quadravise`.
Deployments run in a single concurrency group so a newer push to `main` cancels any older in-progress production rollout.

## VPS deploy scripts

Available scripts:

- `scripts/deploy-vps.sh`: pull latest `main`, install dependencies, build web, run API migrations/seed, restart API, reload Nginx
- `scripts/deploy-api.sh`: install dependencies, run API migrations/seed, restart API
- `scripts/deploy-web.sh`: install dependencies, build frontend, reload Nginx

Default app root is `/var/www/Quadravise`. Override with `APP_ROOT=/custom/path` if needed.

## SMTP configuration

Production API mail settings live in `apps/api/.env` on the VPS.

Required values to enable email sending:

- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_SECURE`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`
- `CONTACT_RECEIVER_EMAIL`

Without `SMTP_HOST`, `SMTP_USER`, and `SMTP_PASS`, the API will accept requests but skip sending emails.

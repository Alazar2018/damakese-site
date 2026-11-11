#!/usr/bin/env bash
# Deploy Damakese site. Run from the site repo root on the VPS:
#   bash /opt/damakese-site/scripts/deploy/deploy.sh
set -euo pipefail

APP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$APP_ROOT"

echo "==> Damakese site deploy @ $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "==> App root: $APP_ROOT"

if [[ -d "$APP_ROOT/.git" ]]; then
  git fetch origin main
  git checkout main
  git pull --ff-only origin main
elif [[ -d "$APP_ROOT/../.git" && -d "$APP_ROOT/../api" ]]; then
  MONO="$(cd "$APP_ROOT/.." && pwd)"
  echo "==> Workspace pull: $MONO"
  cd "$MONO"
  git fetch origin main
  git checkout main
  git pull --ff-only origin main
  cd "$APP_ROOT"
fi

if [[ ! -f .env.production && ! -f .env.local && ! -f .env ]]; then
  echo "ERROR: env missing. cp .env.production.example .env.production"
  exit 1
fi

echo "==> npm ci, build"
npm ci
npm run build

ECOSYSTEM="$APP_ROOT/scripts/deploy/ecosystem.config.cjs"
if pm2 describe damakese-site >/dev/null 2>&1; then
  pm2 reload "$ECOSYSTEM" --update-env
else
  pm2 start "$ECOSYSTEM"
fi
pm2 save

sleep 2
curl -sf "http://127.0.0.1:3456" >/dev/null && echo "Site OK" || echo "WARN: site check failed"
echo "==> Site deploy finished"

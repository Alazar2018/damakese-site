#!/usr/bin/env bash
# One-time VPS setup (Ubuntu). Run as root:
#   sudo bash scripts/deploy/vps-bootstrap.sh
# Optional:
#   DEPLOY_API_REPO=https://github.com/Alazar2018/damakese-api.git
#   DEPLOY_SITE_REPO=https://github.com/Alazar2018/damakese-site.git
set -euo pipefail

if [[ "${EUID:-0}" -ne 0 ]]; then
  echo "Run as root: sudo bash $0"
  exit 1
fi

DEPLOY_USER="${DEPLOY_USER:-deploy}"
API_DIR="${API_DIR:-/opt/damakese-api}"
SITE_DIR="${SITE_DIR:-/opt/damakese-site}"
API_REPO="${DEPLOY_API_REPO:-}"
SITE_REPO="${DEPLOY_SITE_REPO:-}"

apt update && apt upgrade -y
apt install -y git curl ufw ca-certificates gnupg debian-keyring debian-archive-keyring apt-transport-https

if ! id "$DEPLOY_USER" &>/dev/null; then
  adduser --disabled-password --gecos "" "$DEPLOY_USER"
fi
mkdir -p "/home/$DEPLOY_USER/.ssh"
chmod 700 "/home/$DEPLOY_USER/.ssh"
touch "/home/$DEPLOY_USER/.ssh/authorized_keys"
chmod 600 "/home/$DEPLOY_USER/.ssh/authorized_keys"
chown -R "$DEPLOY_USER:$DEPLOY_USER" "/home/$DEPLOY_USER/.ssh"

if ! command -v node &>/dev/null || [[ "$(node -v)" != v22* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt install -y nodejs
fi
npm install -g pm2

curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install -y caddy

ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

mkdir -p "$API_DIR" "$SITE_DIR"
chown "$DEPLOY_USER:$DEPLOY_USER" "$API_DIR" "$SITE_DIR"

if [[ -n "$API_REPO" ]]; then
  sudo -u "$DEPLOY_USER" git clone "$API_REPO" "$API_DIR" || true
fi
if [[ -n "$SITE_REPO" ]]; then
  sudo -u "$DEPLOY_USER" git clone "$SITE_REPO" "$SITE_DIR" || true
fi

echo "==> Bootstrap done."
echo "Add the GitHub Actions public key to /home/$DEPLOY_USER/.ssh/authorized_keys"
echo "API path:  $API_DIR"
echo "Site path: $SITE_DIR"

#!/usr/bin/env bash
# =============================================================
# TREMPLIN (Next.js) — deploy from a workstation to the AWS host.
# Syncs the source to /opt/tremplin-next and builds the stack on the host.
# It does NOT touch the legacy /opt/tremplin-web stack.
#
# Usage (from tremplin-next/):  bash deploy/deploy.sh
# =============================================================
set -euo pipefail

HOST="${HOST:-13.63.126.175}"
USER="${SSH_USER:-ubuntu}"
REMOTE_DIR="${REMOTE_DIR:-/opt/tremplin-next}"
LOCAL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SSH_KEY="${SSH_KEY:-/home/chilas456/projects/codel-open-contrib/projects/.credentials/pim2.pem}"
SSH_OPTS=(-i "$SSH_KEY" -o StrictHostKeyChecking=accept-new -o ServerAliveInterval=20)

say() { printf '\n\033[1;33m[deploy]\033[0m %s\n' "$*"; }

say "Local:  $LOCAL_DIR"
say "Remote: ${USER}@${HOST}:${REMOTE_DIR}"

say "Checking SSH access ..."
ssh "${SSH_OPTS[@]}" "${USER}@${HOST}" 'echo "[remote] reachable: $(uname -srm)"'

say "Syncing source (excluding node_modules, .next, .env) ..."
rsync -az --delete \
  -e "ssh ${SSH_OPTS[*]}" \
  --exclude '.git' \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.env' \
  --exclude '.env.*.local' \
  --rsync-path 'sudo rsync' \
  "${LOCAL_DIR}/" "${USER}@${HOST}:${REMOTE_DIR}/"

say "Building & starting the stack on the host ..."
ssh "${SSH_OPTS[@]}" "${USER}@${HOST}" "
  set -e
  cd '${REMOTE_DIR}'
  if [ ! -f .env ]; then
    echo 'ERROR: ${REMOTE_DIR}/.env is missing.'
    echo 'Copy .env.production.example to .env and fill in the secrets, then re-run.'
    exit 1
  fi
  sudo docker compose -f docker-compose.prod.yml up -d --build
  echo '--- status ---'
  sudo docker compose -f docker-compose.prod.yml ps
"

say "Done. Site should be live at https://tremplin.stonebase.tech/  (admin at /admin)"
say "NOTE: if the legacy stack still owns ports 80/443, stop it first (see README — Cutover)."

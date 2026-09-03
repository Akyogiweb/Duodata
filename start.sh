#!/usr/bin/env bash
# Start the Duo Data website on THIS machine.
# Usage: from the repo root, run:  ./start.sh
set -euo pipefail
cd "$(dirname "$0")"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install Node 18+ from https://nodejs.org/ then run ./start.sh again."
  exit 1
fi

if ! command -v yarn >/dev/null 2>&1; then
  echo "Enabling Yarn via Corepack..."
  corepack enable
  corepack prepare yarn@1.22.22 --activate
fi

mkdir -p frontend
if [ ! -f frontend/.env ]; then
  cp frontend/env.example frontend/.env
  echo "Created frontend/.env"
fi

cd frontend
yarn install
echo ""
echo "Opening http://localhost:3000"
echo "Leave this terminal open. Press Ctrl+C to stop."
echo ""
yarn start

#!/bin/bash
set -Eeuo pipefail

COZE_WORKSPACE_PATH="${COZE_WORKSPACE_PATH:-$(pwd)}"

cd "${COZE_WORKSPACE_PATH}"

echo "Installing dependencies..."
bash "$COZE_WORKSPACE_PATH/scripts/prepare-node-modules.sh" --prefer-frozen-lockfile --prefer-offline --loglevel debug --reporter=append-only

echo "Building the Next.js project..."
pnpm next build --webpack

echo "Bundling server with tsup..."
pnpm tsup src/server.ts --format cjs --platform node --target node20 --outDir dist --no-splitting --no-minify

# Next.js standalone: copy static & public into the standalone output so the
# standalone server (`.next/standalone/server.js`) is fully self-contained.
if [ -d ".next/standalone" ]; then
  mkdir -p .next/standalone/.next
  if [ -d ".next/static" ]; then
    cp -r .next/static .next/standalone/.next/static
  fi
  if [ -d "public" ]; then
    cp -r public .next/standalone/public
  fi
  echo "Copied .next/static and public into .next/standalone"
fi

echo "Build completed successfully!"

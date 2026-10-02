#!/bin/sh
set -e

echo "[entrypoint] Preparing database..."

# Ensure DATABASE_URL is available; Prisma commands require it.
if [ -z "${DATABASE_URL:-}" ]; then
  echo "[entrypoint] WARNING: DATABASE_URL is not set; skipping prisma db push."
else
  # Push the Prisma schema to the database (create/update tables) on boot.
  # The Prisma CLI is a devDependency and is NOT traced into the standalone build,
  # so we run it via `npx prisma@6.19.3`: this installs the CLI into an isolated
  # npx cache and never modifies the app's pnpm-backed node_modules (which is what
  # caused the earlier `npm install prisma` isDescendantOf failure).
  # --skip-generate avoids a second codegen (client already generated at build);
  # --accept-data-loss allows recreating enum/table changes on boot.
  if [ -f ./prisma/schema.prisma ]; then
    npx --yes prisma@6.19.3 db push --skip-generate --accept-data-loss --schema ./prisma/schema.prisma
  else
    echo "[entrypoint] WARNING: ./prisma/schema.prisma not found; skipping db push."
  fi
fi

echo "[entrypoint] Starting server..."
exec node server.js
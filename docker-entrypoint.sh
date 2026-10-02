#!/bin/sh
set -e

echo "[entrypoint] Preparing database..."

# Ensure DATABASE_URL is available; Prisma commands require it.
if [ -z "${DATABASE_URL:-}" ]; then
  echo "[entrypoint] WARNING: DATABASE_URL is not set; skipping prisma db push."
else
  # Push the Prisma schema to the database (create/update tables) on boot.
  # --accept-data-loss allows recreating e.g. enum/table changes; --skip-generate
  # avoids a second codegen since the client was generated during the image build.
  if [ -f ./prisma/schema.prisma ]; then
    npx prisma db push --skip-generate --accept-data-loss
  else
    echo "[entrypoint] WARNING: ./prisma/schema.prisma not found; skipping db push."
  fi
fi

echo "[entrypoint] Starting server..."
exec node server.js

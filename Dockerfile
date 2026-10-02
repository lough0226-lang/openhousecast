# ---- deps stage ----
FROM node:22-bookworm-slim AS deps
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# pnpm 8/9 both produce lock v9; install frozen from lockfile
RUN pnpm install --frozen-lockfile || pnpm install --no-frozen-lockfile

# ---- build stage ----
FROM node:22-bookworm-slim AS builder
RUN corepack enable
# Debian slim ships glibc + openssl(3) — required by Prisma query engines
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate Prisma Client BEFORE the Next.js build so @prisma/client is initialized
RUN npx prisma generate
RUN pnpm next build --webpack

# ---- runtime stage ----
FROM node:22-bookworm-slim AS runner
# Debian slim includes glibc + openssl 3 that Prisma query engines need at runtime
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
# runtime port (Zeabur injects PORT)
ENV PORT=8080
# standalone server + traced node_modules
COPY --from=builder /app/.next/standalone ./
# static assets
COPY --from=builder /app/.next/static ./.next/static
# public assets
COPY --from=builder /app/public ./public
# Prisma schema (needed by `prisma db push` at startup)
COPY --from=builder /app/prisma ./prisma
# Container entrypoint: runs `prisma db push` then starts the server.
# The Prisma CLI is a devDependency (not traced into standalone), so we run it
# via `npx prisma@6.19.3` which installs into an isolated cache dir and never
# touches the pnpm-backed node_modules (avoids pnpm/npm symlink conflicts).
COPY --from=builder /app/docker-entrypoint.sh ./docker-entrypoint.sh
RUN chmod +x ./docker-entrypoint.sh
EXPOSE 8080
ENTRYPOINT ["./docker-entrypoint.sh"]
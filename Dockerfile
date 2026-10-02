# ---- deps stage ----
FROM node:20-alpine AS deps
RUN corepack enable
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# pnpm 8/9 both produce lock v9; install frozen from lockfile
RUN pnpm install --frozen-lockfile || pnpm install --no-frozen-lockfile

# ---- build stage ----
FROM node:20-alpine AS builder
RUN corepack enable
# Prisma query engines require openssl on Alpine
RUN apk add --no-cache openssl
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Generate Prisma Client BEFORE the Next.js build so @prisma/client is initialized
RUN npx prisma generate
RUN pnpm next build --webpack

# ---- runtime stage ----
FROM node:20-alpine AS runner
# Prisma query engines require openssl at runtime on Alpine
RUN apk add --no-cache openssl
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
EXPOSE 8080
CMD ["node", "server.js"]
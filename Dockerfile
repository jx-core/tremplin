# syntax=docker/dockerfile:1

# ---------- deps: install all deps (dev needed to build) ----------
FROM node:22-alpine AS deps
WORKDIR /app
# libc compat for some native-ish modules
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
# Generous network settings — npm registry can be slow.
RUN npm install --no-audit --no-fund --fetch-timeout=600000 --fetch-retries=5

# ---------- builder: produce the standalone server ----------
FROM node:22-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- runner: minimal production image ----------
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Standalone output: server + traced node_modules only.
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]

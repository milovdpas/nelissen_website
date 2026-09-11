# Next.js standalone image for the VPS (see DEPLOYMENT.md).
# Both stages are alpine on purpose: sharp is traced into the standalone output
# with its platform binary, so the build and runtime libc must match (musl).

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# NEXT_PUBLIC_* are compile-time constants: they are inlined into the bundle and
# into the prerendered pages, so they are build args — setting them at runtime
# does nothing. Changing the domain means rebuilding the image.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_NOINDEX
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_GA_ID=$NEXT_PUBLIC_GA_ID \
    NEXT_PUBLIC_NOINDEX=$NEXT_PUBLIC_NOINDEX
RUN npm run build

FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=80 \
    HOSTNAME=0.0.0.0

# Run the server as an unprivileged user rather than root. Binding :80 as
# non-root still works because docker-compose.prod.yml sets
# net.ipv4.ip_unprivileged_port_start=0 inside this container's network
# namespace — keeping the port means the hand-maintained nginx conf on the VPS
# needs no change. The image's stock `node` user (uid 1000) is deliberately not
# reused: a dedicated uid makes the ownership below unambiguous.
RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

# Standalone ships server.js plus a traced node_modules, but excludes static and
# public — without these two COPYs every asset 404s.
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=build --chown=nextjs:nodejs /app/public ./public

# next/image writes optimized variants here at runtime. As root this directory
# was created on demand; an unprivileged server needs it to exist and be owned
# up front, or image optimization fails on the first request.
RUN mkdir -p .next/cache/images && chown -R nextjs:nodejs .next

USER nextjs
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://127.0.0.1/health || exit 1
CMD ["node", "server.js"]

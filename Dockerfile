# Dockerfile

# Base image for consistent environment
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
RUN apk add --no-cache gcompat

# Builder stage: Build the Next.js application
FROM base AS builder
WORKDIR /app

# Set GOOGLE_API_KEY to a dummy value for build-time if not provided
ARG GOOGLE_API_KEY_ARG
ENV GOOGLE_API_KEY=${GOOGLE_API_KEY_ARG:-"dummy_build_time_key"}

COPY package.json package-lock.json* ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

# Prune development dependencies
RUN npm prune --production

# Runner stage: Create a minimal image to run the application
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy only the necessary artifacts from the builder stage
# This includes the .next/standalone directory which contains the server and minimal dependencies.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# The .next/standalone output should include the public and .next/static directories if they exist and are needed.
# The following lines are removed as they are redundant with `COPY /app/.next/standalone ./`
# and the /app/public copy was causing an error because the public directory might not exist in the source project.
# COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

# The server.js file is created by `output: 'standalone'`
CMD ["node", "server.js"]

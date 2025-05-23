# Stage 1: Install dependencies
FROM node:20-alpine AS deps
# Install libc6-compat for compatibility, required by Next.js for some native modules.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package.json package-lock.json* ./

# Install production dependencies if using standalone output and copying node_modules later,
# or install all dependencies if building everything in one go.
# For Next.js standalone, it's better to build with all devDependencies.
RUN npm install

# Stage 2: Build the Next.js application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy node_modules from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code
COPY . .

# Disable Next.js telemetry during the build
ENV NEXT_TELEMETRY_DISABLED 1

# Build the Next.js application
RUN npm run build

# Stage 3: Production image
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
# Disable Next.js telemetry during runtime
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public assets
COPY --from=builder /app/public ./public

# Copy the standalone Next.js server files
# The standalone output includes a minimal server and necessary node_modules.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy static assets
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to the non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set the default port for the Next.js server
ENV PORT 3000

# Start the Next.js application
# The standalone output creates a server.js file to run the app.
CMD ["node", "server.js"]

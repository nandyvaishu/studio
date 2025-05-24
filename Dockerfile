# Stage 1: Build the Next.js application
FROM node:18-alpine AS builder
WORKDIR /app

# Set a default dummy API key for the build process if not overridden by a build argument.
# This helps if libraries check for the key's presence during build-time initialization.
ARG GOOGLE_API_KEY_ARG="DUMMY_KEY_FOR_BUILD_PROCESS_ONLY"
ENV GOOGLE_API_KEY=$GOOGLE_API_KEY_ARG

# Copy package.json and package-lock.json (or yarn.lock if you use Yarn)
COPY package*.json ./

# Install dependencies
# Using --legacy-peer-deps if there are peer dependency conflicts, otherwise remove it.
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine AS runner
WORKDIR /app

# Create a non-root user and group
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy built assets from the builder stage with correct ownership
# Copy the standalone Next.js server output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy the public directory
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# Copy the static assets (if any not handled by standalone, often needed)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set user to non-root for security
USER nextjs

ENV NODE_ENV=production
# EXPOSE 3000 # The server.js in standalone output handles this.
ENV PORT=3000

# Ensure server.js is executable (though typically Node doesn't require +x for the script itself)
# RUN chmod +x server.js

# Start the Next.js application
CMD ["node", "server.js"]

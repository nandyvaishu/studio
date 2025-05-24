# Stage 1: Install dependencies and build the Next.js application
FROM node:20-alpine AS builder

# Set the working directory
WORKDIR /app

# Set GOOGLE_API_KEY to a dummy value for build time if not provided
ARG GOOGLE_API_KEY
ENV GOOGLE_API_KEY=${GOOGLE_API_KEY:-dummy_key_for_build}
ENV NEXT_TELEMETRY_DISABLED 1

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
# Use --legacy-peer-deps if you encounter peer dependency issues
RUN npm install --legacy-peer-deps

# Copy the rest of the application source code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Create the production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user and group
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy the standalone Next.js server output from the builder stage
# This includes the .next/static, .next/server and public directories (if they exist)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# The standalone output might place the server.js file in the root of the standalone folder
# or within a .next/server/app directory depending on the Next.js version and config.
# The following lines are adjusted to ensure all necessary files from standalone are copied.

# Change ownership of the app directory to the non-root user
RUN chown -R nextjs:nodejs /app

# Switch to the non-root user
USER nextjs

EXPOSE 3000

ENV PORT 3000

# Start the Next.js application
# The server.js file is expected to be in the root of the standalone output directory
CMD ["node", "server.js"]

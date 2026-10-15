# ==========================================
# Stage 1: Build the React + Vite Application
# ==========================================
FROM node:20-alpine AS build-stage

WORKDIR /app

# Install dependencies first (leverages Docker cache)
COPY package*.json ./
RUN npm ci

# Copy application source code
COPY . .

# Build production bundle into /app/dist
RUN npm run build

# ==========================================
# Stage 2: Serve with lightweight Nginx Alpine
# ==========================================
FROM nginx:alpine AS production-stage

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built static files from build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose HTTP port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost/ || exit 1

# Start Nginx in foreground
CMD ["nginx", "-g", "daemon off;"]

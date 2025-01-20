# frontend/Dockerfile

# --- Stage 1: Builder ---
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Angular application
RUN npm run build --prod

# --- Stage 2: Production ---
FROM nginx:alpine

# Copy built Angular app from builder stage
COPY --from=builder /app/dist/quick-track /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

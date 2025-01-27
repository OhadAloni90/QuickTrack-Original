# backend/Dockerfile

# --- Stage 1: Builder ---
FROM node:16 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# If there is a build step, run it here
# RUN npm run build

# --- Stage 2: Production ---
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy built artifacts and package files from builder stage
COPY --from=builder /app .

# Install only production dependencies
RUN npm install --only=prod

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "server.js"]
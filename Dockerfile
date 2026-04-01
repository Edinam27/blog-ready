FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the Vite frontend app
RUN npm run build

# Stage 2: Production environment
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy built frontend assets
COPY --from=builder /app/dist ./dist

# Copy backend source code
COPY --from=builder /app/server ./server

# Copy public folder for uploads and other static assets
COPY --from=builder /app/public ./public

# Ensure uploads directory exists
RUN mkdir -p ./public/uploads

# Expose the API port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production
ENV API_PORT=3001

# Start the backend server which serves the API and the static files
CMD ["node", "server/index.js"]

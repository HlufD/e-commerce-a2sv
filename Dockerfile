# 1. Build stage
FROM node:20-alpine AS e-commerce
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files first (lockfile too)
COPY package.json pnpm-lock.yaml ./

# Install dependencies in container
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app
RUN pnpm run build

# 2. Production stage
FROM node:20-alpine
WORKDIR /app

# Install pnpm globally (needed for node_modules)
RUN npm install -g pnpm

# Copy dependencies + build output from e-commerce
COPY --from=e-commerce /app/node_modules ./node_modules
COPY --from=e-commerce /app/dist ./dist
COPY --from=e-commerce /app/prisma ./prisma

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main.js"]

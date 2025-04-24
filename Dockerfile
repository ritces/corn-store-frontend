ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS development

# Set the working directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy dependency definition files
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies (including devDependencies)
RUN pnpm install --frozen-lockfile

# Copy tsconfig files (needed by Vite/TS)
COPY tsconfig*.json ./

# Copy Vite config
COPY vite.config.ts ./

# Copy the rest of the application source code
COPY ./src ./src/
COPY ./public ./public/
COPY index.html ./

# Expose the port defined in vite.config.ts
EXPOSE 5173

CMD [ "pnpm", "run", "dev" ] 
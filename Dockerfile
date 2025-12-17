# Base (deps)
FROM node:20-alpine AS base
WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm ci --legacy-peer-deps

COPY frontend .

# Dev
FROM base AS dev
CMD ["npm", "run", "dev"]

# Build
FROM base AS builder
RUN npm run build

# Prod
FROM nginx:alpine
COPY --from=builder /frontend/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
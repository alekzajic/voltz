# Base stage
FROM node:lts as base
COPY ./frontend /frontend
RUN rm -rf /frontend/node_modules
WORKDIR /frontend
RUN npm ci --legacy-peer-deps

# Development Stage
FROM base as dev
COPY frontend/ .
CMD ["npm", "run", "dev"]

# Builder Stage (Production)
FROM base as builder
COPY frontend/ .
RUN npm run build

# Production Serve Stage
FROM nginx:alpine
COPY --from=builder /frontend/dist /usr/share/nginx/html
RUN echo 'server { \
    listen 80; \
    location / { \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    try_files $uri $uri/ /index.html; \
    } \
    }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


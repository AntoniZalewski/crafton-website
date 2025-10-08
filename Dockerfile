# --- build stage ---
FROM node:20-alpine AS build
WORKDIR /app/frontend

# tylko pliki zależności, by lepiej korzystać z cache
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@10.18.1 --activate
RUN pnpm install --frozen-lockfile

# reszta źródeł i build
COPY frontend ./
RUN pnpm run build

# --- runtime stage ---
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

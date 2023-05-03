# Stage 1: Build Angular application
FROM node:18 AS build

WORKDIR /app

COPY TodoApp.Client/package.json TodoApp.Client/package-lock.json ./
RUN npm ci

COPY TodoApp.Client/ ./
RUN npm run build -- --configuration=production

# Stage 2: Deploy to production with Nginx
FROM nginx:1.23

COPY --from=build /app/dist//todo-app.client /usr/share/nginx/html

# Copy custom Nginx configuration (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

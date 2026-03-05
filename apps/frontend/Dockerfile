# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# Serve stage (Nginx para SPA)
FROM nginx:alpine

# Creamos una plantilla de configuración de Nginx que use la variable $PORT que inyecta Railway
RUN mkdir -p /etc/nginx/templates && \
    echo $'server { \n\
    listen ${PORT}; \n\
    location / { \n\
        root /usr/share/nginx/html; \n\
        index index.html index.htm; \n\
        try_files $uri $uri/ /index.html; \n\
    } \n\
}' > /etc/nginx/templates/default.conf.template

# Definimos un puerto por defecto por si se corre localmente sin la variable PORT
ENV PORT=80

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE ${PORT}
CMD ["nginx", "-g", "daemon off;"]

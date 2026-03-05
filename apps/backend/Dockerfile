# --- 1. Etapa de Construcción (Builder) ---
FROM node:18-slim AS builder

# Instalar OpenSSL para Prisma
RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Copiar configuración e instalar TODAS las dependencias (incluye DevDependencies para tsc)
COPY package*.json ./
COPY prisma ./prisma/
RUN npm install

# Copiar el código fuente
COPY . .

# Generar Prisma Client y Compilar TypeScript a JS puro
RUN npx prisma generate
RUN npm run build

# --- 2. Etapa de Producción ---
FROM node:18-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

# Solo copiar configuraciones de node y esquema de prisma
COPY package*.json ./
COPY prisma ./prisma/

# Instalar SÓLO dependencias de producción para reducir peso
RUN npm install --omit=dev

# Copiar build de la etapa anterior (El javascript ya compilado)
COPY --from=builder /app/dist ./dist

# Generar motor de Prisma con las dependencias instaladas localmente
RUN npx prisma generate

EXPOSE 3000

# Pushear base de datos e iniciar la app compilada
CMD ["sh", "-c", "npx prisma db push --accept-data-loss && npm run start"]

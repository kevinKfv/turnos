FROM node:20-alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
RUN pnpm --global add turbo
COPY . .
RUN turbo prune backend --docker

FROM base AS installer
WORKDIR /app

# First install dependencies
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm install

# Build the project and generate Prisma Client
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN pnpm --filter @repo/database exec prisma generate
RUN pnpm turbo run build --filter=backend

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs
USER nestjs

COPY --from=installer /app/apps/backend/dist ./apps/backend/dist
COPY --from=installer /app/apps/backend/package.json ./apps/backend/package.json
COPY --from=installer /app/node_modules ./node_modules
COPY --from=installer /app/packages/database ./packages/database

EXPOSE 3001
ENV PORT 3001

CMD ["node", "apps/backend/dist/src/main.js"]

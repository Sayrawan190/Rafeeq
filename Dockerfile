FROM node:22-bookworm-slim AS dependencies

WORKDIR /workspace
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-bookworm-slim AS builder

WORKDIR /workspace
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=dependencies /workspace/node_modules ./node_modules
COPY . .
RUN npm run build
RUN test -n "$(find .next/static/css -type f -name '*.css' -print -quit)"

FROM node:22-bookworm-slim AS runner

WORKDIR /workspace
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY --from=builder /workspace/package.json ./package.json
COPY --from=builder /workspace/next.config.ts ./next.config.ts
COPY --from=builder /workspace/public ./public
COPY --from=builder /workspace/.next ./.next
COPY --from=dependencies /workspace/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "run", "start", "--", "-p", "3000"]

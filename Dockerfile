
FROM node:18-slim AS builder

WORKDIR /builder

RUN npm install -g pnpm
COPY pnpm-lock.yaml package.json .
RUN pnpm install --frozen-lockfile

COPY . .
ENV BUILD_TYPE standalone
RUN pnpm build

FROM node:18-slim

ENV NODE_ENV production
WORKDIR /app

COPY --from=builder --chown=node:node /builder/public ./public
COPY --from=builder --chown=node:node /builder/.next/standalone ./
COPY --from=builder --chown=node:node /builder/.next/static ./.next/static

USER node
EXPOSE 3000
CMD ["node", "server.js"]

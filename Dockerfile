FROM node:19.4.0-bullseye-slim as build
WORKDIR /app
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci
COPY --chown=node:node . .
RUN npm run build
 
FROM node:19.4.0-bullseye-slim
ARG PORT_ARG
ENV PORT $PORT_ARG
RUN apt-get update && apt-get install curl -y
WORKDIR /app
COPY --chown=node:node --from=build /app/package.json /app/package-lock.json ./
COPY --chown=node:node --from=build /app/node_modules ./node_modules
COPY --chown=node:node --from=build /app/dist ./dist
RUN npm prune --production
USER node
EXPOSE $PORT_ARG
HEALTHCHECK --interval=15s --timeout=3s --start-period=15s CMD curl -f http://localhost:${PORT_ARG}/api/health
CMD ["node",  "dist/main"]
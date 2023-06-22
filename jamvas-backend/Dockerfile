# Follows recommendations from Snyk: https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/
FROM node:16.18.0 AS build
RUN apt-get update && apt-get install -y --no-install-recommends dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app/
RUN npm ci  && \
    npm run build

FROM node:16.18.0-bullseye-slim
ENV NODE_ENV production
COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
EXPOSE 3000
CMD ["dumb-init", "node", "dist/main.js"]

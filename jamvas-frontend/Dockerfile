# Follows recommendations from Snyk:
# https://snyk.io/blog/10-best-practices-to-containerize-nodejs-web-applications-with-docker/

# ########################################################################
# Build image
# ########################################################################
FROM node:16.18.0 AS build
USER node
WORKDIR /usr/src/app
COPY --chown=node:node . /usr/src/app/
RUN npm ci  && \
    npm run build:dev

# ########################################################################
# Production image
# ########################################################################
FROM node:16.18.0-bullseye-slim
RUN npm install -g serve && \
    chown -R node:node /usr/local/lib/node_modules/serve
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node --from=build /usr/src/app/dist /usr/src/app/dist
EXPOSE 3000
CMD ["serve", "-s", "dist"]

FROM node:lts-alpine AS base

ARG BACKEND_URL
ARG DEVELOP_API_TOKEN
ARG PRODUCTION_API_TOKEN

ENV BACKEND_URL=$BACKEND_URL
ENV DEVELOP_API_TOKEN=$DEVELOP_API_TOKEN
ENV PRODUCTION_API_TOKEN=$PRODUCTION_API_TOKEN
ENV PATH /app/node_modules/.bin:$PATH
RUN echo $BACKEND_URL
WORKDIR /app
COPY package.json package-lock.json ./

FROM base AS prod-deps
RUN npm install --production

FROM base AS build-deps
RUN npm install --production=false

FROM build-deps AS build
COPY . .
RUN npm run build

FROM base AS runtime
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs

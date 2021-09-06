FROM node:14-alpine AS build
WORKDIR /server
COPY app/ app
COPY config/ config
COPY typings/ typings
COPY package.json .
COPY yarn.lock .
COPY tsconfig.json .
RUN yarn install --frozen-lockfile && \
npm run tsc

FROM node:14-alpine
WORKDIR /server
COPY --from=build /server/app app
COPY --from=build /server/config config
COPY package.json .
COPY yarn.lock .
RUN yarn install --frozen-lockfile --production
ENV MONGO_URL "mongodb://127.0.0.1:27017"
EXPOSE 7001
# CMD ["yarn", "run", "start"]
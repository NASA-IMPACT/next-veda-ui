FROM node:18-alpine
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add --no-cache build-base gcc autoconf automake zlib-dev libpng-dev nasm bash vips-dev git
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/
COPY package.json ./
COPY src/admin/vite.config.ts ./vite.config.ts
RUN yarn global add node-gyp
RUN yarn config set network-timeout 600000 && yarn
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ['yarn']
RUN ["yarn", "build"]
EXPOSE 1337
CMD ["yarn", "develop"]
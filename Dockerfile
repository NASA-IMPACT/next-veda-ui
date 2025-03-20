FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /veda

# Copy package.json and package-lock.json
COPY ./package.json ./next.config.js  ./
COPY . .
RUN "yarn"
EXPOSE 3000

# Build the Next.js app
# RUN ["yarn", "next", "dev"]
CMD ["yarn", "dev"]

FROM node:16-alpine

RUN npm i -g pnpm

RUN mkdir /app
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN apk add --no-cache --upgrade bash
RUN pnpm install

COPY . .

RUN pnpm exec prisma generate

EXPOSE 3000

CMD bash ./wait-for-it.sh db:3306 -- ./push-and-run.sh

FROM node:20-alpine

# RUN apk add --no-cache libc6-compat openssl

WORKDIR /app

COPY link-shorter/package*.json ./

RUN npm install

COPY link-shorter/ .

ENV DATABASE_URL="file:/tmp/build-mock.db"
ENV NEXT_TELEMETRY_DISABLED 1

RUN npx prisma generate

RUN npm run build

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

RUN mkdir -p /app/db

CMD ["/bin/sh", "-c", "npx prisma migrate deploy && npm run start"]
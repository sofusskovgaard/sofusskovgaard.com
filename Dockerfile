FROM node:14.17-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

###

FROM node:14.17-alpine AS builder

WORKDIR /app

ARG PRISMIC_URL
ARG GOOGLE_ANALYTICS_KEY

ENV PRISMIC_URL=$PRISMIC_URL
ENV GOOGLE_ANALYTICS_KEY=$GOOGLE_ANALYTICS_KEY

COPY . .

COPY --from=deps /app/node_modules ./node_modules

RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

###

FROM node:14.17-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

CMD ["yarn", "start"]

FROM node:18.18.0-alpine AS builder
RUN mkdir /metricas
WORKDIR /metricas
COPY . .
RUN npm install
RUN npm run build

FROM node:18.18.0-alpine
RUN mkdir -p /metricas
WORKDIR /metricas
COPY --from=builder /metricas/dist .
COPY --from=builder /metricas/node_modules ./node_modules
COPY ./docker-entrypoint.sh .

ENTRYPOINT ["/bin/sh", "./docker-entrypoint.sh"]




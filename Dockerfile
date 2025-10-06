# Etapa de build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY public ./public
COPY src ./src
RUN npm run build

# Etapa de producción
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
RUN npm install -g serve
EXPOSE 3000
ENV HOST=0.0.0.0
ENV PORT=3000
CMD ["serve", "-s", "build"]
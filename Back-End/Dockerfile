FROM node:20-bookworm-slim

RUN apt-get update \
  && apt-get install -y --no-install-recommends mongodb-database-tools \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

CMD ["node", "app.js"]

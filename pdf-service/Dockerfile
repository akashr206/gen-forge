FROM ghcr.io/puppeteer/puppeteer:22.12.1

USER root

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN chown -R pptruser:pptruser /usr/src/app

USER pptruser

EXPOSE 3001

CMD ["npm", "start"]

FROM node:14.15.5

COPY package.json .
RUN npm install \
    && npm install typescript -g
COPY . .
RUN tsc index.ts
EXPOSE 8081
CMD ["node", "index.js"]
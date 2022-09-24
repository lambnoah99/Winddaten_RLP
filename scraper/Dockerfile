FROM node:14.15.5

COPY package.json .
RUN npm install
RUN tsc index.ts
COPY . .
CMD ["node", "index.js"]
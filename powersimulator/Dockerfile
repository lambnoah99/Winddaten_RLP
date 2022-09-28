FROM node:14.15.5

COPY package.json .
COPY index.ts .
RUN npm install \
    && npm install typescript -g
COPY . .
RUN tsc index.ts
CMD ["node", "index.js"]
FROM node:14-alpine

WORKDIR /prisma

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm",  "start" ]
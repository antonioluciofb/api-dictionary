FROM node:16.17.1 

WORKDIR /usr/app

COPY . .

RUN yarn

RUN yarn build

EXPOSE 3001

CMD [ "node", "./dist/index.js" ]
FROM docker.io/node:13.12.0-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 


FROM docker.io/node:13.12.0-alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["npm", "start"]
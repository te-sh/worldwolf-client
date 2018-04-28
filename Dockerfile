FROM node:8.11.1-alpine

ENV APP=/app
RUN mkdir $APP
WORKDIR $APP

COPY package.json package-lock.json ./
RUN npm install --no-progress
ENV PATH=$PATH:$APP/node_modules/.bin

ENTRYPOINT ["npm", "run", "start-dev"]

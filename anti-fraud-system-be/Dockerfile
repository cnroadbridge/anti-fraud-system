FROM node:14.8.0
MAINTAINER ataola <zjt613@gmail.com>

WORKDIR /app

COPY package.json ./

RUN npm install --registry=https://registry.npm.taobao.org --production

COPY app ./app
COPY config ./config
COPY .eslintrc .eslintignore .prettierrc .autod.conf.js .editorconfig app.js jsconfig.json ./

VOLUME /app

EXPOSE 7001

CMD ["npm", "run", "docker"]

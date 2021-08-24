# build stage
FROM node:14.8.0 as build-stage
MAINTAINER ataola <zjt613@gmail.com>

WORKDIR /app

COPY package.json ./
COPY nginx ./nginx/
COPY public ./public/
COPY .editorconfig .env.* .eslintrc.js .eslintignore .prettierrc jsconfig.json *.config.js ./
COPY src ./src/
COPY build ./build/

RUN npm install --registry=https://registry.npm.taobao.org cnpm -g \
    && SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ cnpm install --registry=https://registry.npm.taobao.org \
    && npm rebuild node-sass \
    && npm run build:prod

# production stage
FROM nginx:1.17.2-alpine-perl as production-stage

COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY --from=build-stage /app/nginx /etc/nginx/

VOLUME /app

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

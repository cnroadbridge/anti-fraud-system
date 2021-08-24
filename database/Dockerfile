FROM mysql:8.0.16
MAINTAINER ataola<zjt613@gmail.com>

ENV MYSQL_DATABASE anti-fraud
ENV MYSQL_ROOT_PASSWORD ataola
ENV MYSQL_ROOT_HOST '%'

ENV AUTO_RUN_DIR ./docker-entrypoint-initdb.d

ENV INIT_SQL anti-fraud.sql

COPY ./$INIT_SQL $AUTO_RUN_DIR/

RUN chmod a+x $AUTO_RUN_DIR/$INIT_SQL

VOLUME /app

EXPOSE 3306


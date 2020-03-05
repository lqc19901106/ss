FROM nginx:1.17.3-alpine

ENV RUN_USER nginx
ENV RUN_GROUP nginx
ENV DATA_DIR /opt/app/
ENV LOG_DIR /data/log/nginx
ENV API_HOST=localhost
ENV API_PORT=9696
RUN echo "https://mirror.tuna.tsinghua.edu.cn/alpine/v3.4/main/" > /etc/apk/repositories
RUN apk update \
  && apk upgrade \
  && apk add --no-cache bash \
  bash-doc \
  bash-completion \
  && rm -rf /var/cache/apk/* \
  && /bin/bash

WORKDIR /opt/app

COPY ./dist/* /opt/work/

COPY ./dist/ $DATA_DIR
RUN mkdir $LOG_DIR -p
RUN chown nginx.nginx -R $LOG_DIR
ADD dist $DATA_DIR
ADD ./nginx.tpl /etc/nginx/conf.d/static.tpl

EXPOSE 2333
ENTRYPOINT [ "/bin/bash", "-c" ]
CMD ["envsubst '$$API_HOST $$API_PORT' < /etc/nginx/conf.d/static.tpl > /etc/nginx/conf.d/static.conf && exec nginx -g 'daemon off;'"]

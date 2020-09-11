FROM nginx:alpine

LABEL maintainer="xudian.cn@gmail.com"
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
COPY default.conf.template /etc/nginx/templates/
RUN mkdir /usr/share/nginx/web
ADD ./dist /usr/share/nginx/web

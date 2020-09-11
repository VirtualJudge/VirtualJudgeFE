FROM nginx

LABEL maintainer="xudian.cn@gmail.com"
ENV TZ=Asia/Shanghai
RUN echo ${HTTP_PROXY}
RUN echo ${HTTPS_PROXY}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
RUN apt-get update && apt-get install curl unzip -y
RUN mkdir /config
RUN curl https://api.github.com/repos/4ddl/ddlf/releases/latest -o /config/web-version.info
RUN cat /config/web-version.info
RUN curl -L $(cat /config/web-version.info | grep browser_download_url| cut -d '"' -f 4) -o dist.zip && mkdir /web && unzip dist.zip -d /usr/share/nginx/web && rm dist.zip
COPY default.conf.template /etc/nginx/templates/
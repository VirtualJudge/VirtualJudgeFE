FROM node

RUN apt-get update

RUN apt-get install nginx git -y


ADD . /app

WORKDIR /app


EXPOSE 80
RUN yarn install
RUN yarn run build || exit 1

CMD ["/bin/bash", "/app/deploy/run.sh"]

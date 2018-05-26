FROM node

RUN apt-get update

RUN apt-get install nginx git -y


ADD . /app

WORKDIR /app


EXPOSE 80

CMD ["/bin/bash", "/app/deploy/run.sh"]

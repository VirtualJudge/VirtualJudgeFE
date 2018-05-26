#!/usr/bin/env bash
yarn run build

if [ $? -ne 0 ]; then
    echo "Build error, please check node version and package.json"
    exit 1
fi

exec nginx -c /app/deploy/nginx.conf

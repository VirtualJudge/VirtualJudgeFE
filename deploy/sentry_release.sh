#!/bin/bash

DATE=`date +%Y%m%d`
COMMIT=`git rev-parse HEAD`
VERSION="VJ-$DATE-${COMMIT:0:5}"

echo "Current version is $VERSION"

if [ ! -z $USE_SENTRY ] && [ $USE_SENTRY == '1' ]; then

# create new release according to `VERSION`
docker run --rm -it -v $(pwd):/work getsentry/sentry-cli \
   sentry-cli --auth-token $SENTRY_AUTH_TOKEN releases -o virtualjudge -p frontend new $VERSION
fi

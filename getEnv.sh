dir=$(dirname "$0")
APP_NAME=$(npm pkg get name | jq -r)
APP_VERSION=$(npm pkg get version | jq -r)
TAG=$APP_NAME:v$APP_VERSION-dev
ENTRYPOINT=$(npm pkg get bin | jq -r)

export TAG
export APP_NAME
export APP_VERSION
export ENTRYPOINT
echo "ENTRYPOINT=$ENTRYPOINT"
echo "APP_NAME=$APP_NAME"
echo "APP_VERSION=$APP_VERSION"
echo "TAG=$TAG"
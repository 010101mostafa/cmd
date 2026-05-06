dir=$(dirname "$0")
name=$(basename $(ls *.csproj) .csproj)
APP_NAME=$(echo "$name" | tr '[:upper:]' '[:lower:]' | tr '.' '_')
APP_VERSION=$(uuidgen | tr '[:upper:]' '[:lower:]' | cut -c1-8)
TAG="$APP_NAME:v$APP_VERSION-dev"
ENTRYPOINT="dotnet $name.dll"
export TAG
export APP_NAME
export APP_VERSION
export ENTRYPOINT
echo "ENTRYPOINT=$ENTRYPOINT"
echo "APP_NAME=$APP_NAME"
echo "APP_VERSION=$APP_VERSION"
echo "TAG=$TAG"
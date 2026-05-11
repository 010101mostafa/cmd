dir=$(dirname "$0")
APP_NAME=$(git remote get-url origin | sed 's/.*\///' | sed 's/\.git//')
APP_VERSION=$(git describe --tags --dirty=-d --always)
TAG="$APP_NAME:$APP_VERSION"
APP_TYPE="unknown" #node|dotnet|angular
if false ; then
  echo "No application type detected."
elif [ -f "*.csproj" ]; then
  APP_TYPE="dotnet"
elif [ -f "angular.json" ]; then
  APP_TYPE="angular"
elif [ -f "package.json" ]; then
  APP_TYPE="node"
fi
export dir
export TAG
export APP_NAME
export APP_VERSION
export APP_TYPE
echo "=============================================================="
echo "  dir : $dir"
echo "  APP_NAME : $APP_NAME"
echo "  APP_VERSION : $APP_VERSION"
echo "  TAG : $TAG"
echo "  APP_TYPE : $APP_TYPE"
echo "=============================================================="
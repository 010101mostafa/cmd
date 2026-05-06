#!/bin/bash
dotnet publish -c Release -o ./dist
cd ui
# npm i
npm run build -- --output-path=../dist/wwwroot --configuration=development
cd ..
mv ./dist/wwwroot/browser/* ./dist/wwwroot
echo "dotnet run" > ./dist/run.sh
chmod 777 ./dist/run.sh
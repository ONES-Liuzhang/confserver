#!/bin/sh
HOST=remote
MONGO_URL="mongodb://127.0.0.1:27017"
SERVER_NAME=confserver
DIR_ROOT="/root/confserver"

npm run tsc

echo ""
echo "📁 rsync files to server ..."
rsync -avzp -e "ssh" --exclude="*.ts" --include="*" ./app $HOST:$DIR_ROOT

rsync -avzp -e "ssh" --exclude="*.ts" --include="*" ./config $HOST:$DIR_ROOT

rsync -avzp -e "ssh" --include="package.json" --include="yarn.lock" --exclude="*" . $HOST:$DIR_ROOT

echo ""
echo "⌛️ production dependencies downloading ..."
ssh $HOST "cd ${DIR_ROOT} && npm install --production"

echo ""
echo "⌛️ waiting for ${SERVER_NAME} starting"
ssh $HOST "cd ${DIR_ROOT} && npm run stop && MONGO_URL=${MONGO_URL} npm run start"

echo "🚀 deploy success"
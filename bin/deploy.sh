#!/bin/sh
HOST=remote
MONGO_URL="mongodb://127.0.0.1:27017"
SERVER_NAME=confserver

npm run tsc

echo "📁 copy files to server ..."
rsync -avzp -e "ssh" --exclude="*.ts" --include="*" ./app $HOST:/root/confserver

rsync -avzp -e "ssh" --exclude="*.ts" --include="*" ./config $HOST:/root/confserver

rsync -avzp -e "ssh" --include="package.json" --include="yarn.lock" --exclude="*" . $HOST:/root/confserver

echo "⌛️ production dependencies downloading ..."
ssh $HOST "cd /root/confserver && npm install --production"

if ["$PID" eq ""]; then
  echo first start confserver $SERVER_NAME
  ssh $HOST "cd /root/confserver && MONGO_URL=${MONGO_URL} npm run start"
else
  echo restart $SERVER_NAME
  ssh $HOST "cd /root/confserver && npm run stop && MONGO_URL=${MONGO_URL} npm run start"
fi

echo "🚀 deploy success"
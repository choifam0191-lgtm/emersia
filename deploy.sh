#!/bin/bash
set -e

SERVER="ubuntu@134.185.120.245"
KEY="/c/Users/USER/.ssh/oracle.pem"
REMOTE_DIR="~/emersia"
APP="emersia"
SSH_OPTS="-i $KEY -o StrictHostKeyChecking=accept-new"

echo "[1/4] 소스 파일 압축 및 업로드 중..."
tar czf /tmp/emersia_deploy.tar.gz \
  --exclude='./.git' \
  --exclude='./node_modules' \
  --exclude='./.next' \
  --exclude='./.env.local' \
  --exclude='./.claude' \
  --exclude='./.mcp.json' \
  --exclude='./tsconfig.tsbuildinfo' \
  --exclude='./deploy.sh' \
  .

scp $SSH_OPTS /tmp/emersia_deploy.tar.gz $SERVER:/tmp/emersia_deploy.tar.gz
ssh $SSH_OPTS $SERVER "mkdir -p $REMOTE_DIR && tar xzf /tmp/emersia_deploy.tar.gz -C $REMOTE_DIR && rm /tmp/emersia_deploy.tar.gz"
rm /tmp/emersia_deploy.tar.gz

echo "[2/4] .env.local 업로드 중..."
scp $SSH_OPTS .env.local $SERVER:$REMOTE_DIR/.env.local

echo "[3/4] 서버에서 의존성 설치 및 빌드 중..."
ssh $SSH_OPTS $SERVER "cd $REMOTE_DIR && npm ci && npm run build"

echo "[4/4] PM2 재시작 중..."
ssh $SSH_OPTS $SERVER \
  "cd $REMOTE_DIR && pm2 restart $APP 2>/dev/null || pm2 start npm --name $APP -- start"

echo ""
echo "배포 완료! → http://134.185.120.245:3000"

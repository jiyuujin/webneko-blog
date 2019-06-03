# docker build -t webneko-blog .
# docker tag webneko-blog:latest 972799352477.dkr.ecr.ap-northeast-1.amazonaws.com/webneko-blog:latest
# docker push 972799352477.dkr.ecr.ap-northeast-1.amazonaws.com/webneko-blog:latest

# Nodeイメージを取得する
FROM node:10.14.2-alpine

# ワーキングディレクトリを指定する
WORKDIR /app

# パッケージをコピーする
COPY package*.json ./

# npm モジュールをインストールする
RUN yarn install --quiet

# その他のファイルをコピーする
COPY . .

# ビルドする
RUN yarn run build

# なくても良いけど
ENV HOST 0.0.0.0

# なくても良いけど
EXPOSE 3000

# 起動する
CMD ["yarn", "run", "start"]

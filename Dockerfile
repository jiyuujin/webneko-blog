# Nodeイメージを取得する
FROM node:12.20.0-alpine

# ワーキングディレクトリを指定する
WORKDIR /app

# パッケージをコピーする
COPY package*.json ./

# npm モジュールをインストールする
RUN yarn install --quiet

# その他のファイルをコピーする
COPY . .

# ビルドする
RUN yarn run build:front

# なくても良いけど
ENV HOST 0.0.0.0

# なくても良いけど
EXPOSE 3000

# 起動する
CMD ["yarn", "run", "start"]
